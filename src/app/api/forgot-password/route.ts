import { NextRequest } from 'next/server';
import crypto from 'crypto';
import prisma from '@/lib/prisma';
import { hashPassword, verifyPassword } from 'better-auth/crypto';

const WINDOW_MS = 15 * 60 * 1000;
const REQUEST_LIMIT = 10;
const VERIFY_LIMIT = 5;
const TOKEN_TTL_MS = 15 * 60 * 1000;

function passwordError(pw: string): string | null {
    if (pw.length < 8) return 'Password must be at least 8 characters.';
    if (!/[A-Z]/.test(pw)) return 'Password must contain at least one uppercase letter.';
    if (!/[a-z]/.test(pw)) return 'Password must contain at least one lowercase letter.';
    if (!/[0-9]/.test(pw)) return 'Password must contain at least one number.';
    if (!/[^A-Za-z0-9]/.test(pw)) return 'Password must contain at least one special character (!@#$%^&* etc.).';
    return null;
}

async function isRateLimited(key: string, max: number): Promise<boolean> {
    const now = new Date();
    await prisma.verification.deleteMany({ where: { identifier: key, expiresAt: { lt: now } } });
    const count = await prisma.verification.count({ where: { identifier: key } });
    if (count >= max) return true;
    await prisma.verification.create({
        data: {
            id: crypto.randomUUID(),
            identifier: key,
            value: '1',
            expiresAt: new Date(now.getTime() + WINDOW_MS),
            createdAt: now,
            updatedAt: now,
        },
    });
    return false;
}

export async function POST(request: NextRequest) {
    let body: Record<string, string>;
    try {
        body = await request.json();
    } catch {
        return Response.json({ error: 'Invalid request body.' }, { status: 400 });
    }

    const { step } = body;

    // ── Step 1: Verify email and retrieve security question ──────────────────
    if (step === 'request') {
        const email = (body.email ?? '').trim().toLowerCase();
        if (!email) return Response.json({ error: 'Email is required.' }, { status: 400 });

        if (await isRateLimited(`fp-req:${email}`, REQUEST_LIMIT)) {
            return Response.json({ error: 'Too many attempts. Please try again in 15 minutes.' }, { status: 429 });
        }

        const user = await prisma.user.findUnique({ where: { email } });

        if (!user?.securityQuestion) {
            await new Promise((r) => setTimeout(r, 200));
            return Response.json(
                { error: 'No security question is set for this account. Please contact an administrator to reset your password.' },
                { status: 404 },
            );
        }

        return Response.json({ question: user.securityQuestion });
    }

    // ── Step 2: Verify security answer, issue one-time token ─────────────────
    if (step === 'verify') {
        const email = (body.email ?? '').trim().toLowerCase();
        const answer = (body.answer ?? '').trim().toLowerCase();

        if (!email || !answer) {
            return Response.json({ error: 'Email and answer are required.' }, { status: 400 });
        }

        const verifyKey = `fp-verify:${email}`;
        if (await isRateLimited(verifyKey, VERIFY_LIMIT)) {
            return Response.json(
                { error: 'Too many failed attempts. Please try again in 15 minutes.' },
                { status: 429 },
            );
        }

        const user = await prisma.user.findUnique({ where: { email } });
        if (!user?.securityAnswerHash) {
            await new Promise((r) => setTimeout(r, 200));
            return Response.json({ error: 'Invalid request.' }, { status: 400 });
        }

        const correct = await verifyPassword({ hash: user.securityAnswerHash, password: answer });
        if (!correct) {
            return Response.json({ error: 'Incorrect answer. Please try again.' }, { status: 401 });
        }

        // Clear verify rate-limit on success so they're not locked on the next step
        await prisma.verification.deleteMany({ where: { identifier: verifyKey } });

        // Generate and store a short-lived one-time reset token
        const token = crypto.randomBytes(32).toString('hex');
        const tokenHash = crypto.createHash('sha256').update(token).digest('hex');
        const now = new Date();

        await prisma.verification.deleteMany({ where: { identifier: `fp-token:${email}` } });
        await prisma.verification.create({
            data: {
                id: crypto.randomUUID(),
                identifier: `fp-token:${email}`,
                value: tokenHash,
                expiresAt: new Date(now.getTime() + TOKEN_TTL_MS),
                createdAt: now,
                updatedAt: now,
            },
        });

        return Response.json({ token });
    }

    // ── Step 3: Reset password using the one-time token ──────────────────────
    if (step === 'reset') {
        const email = (body.email ?? '').trim().toLowerCase();
        const { token, newPassword } = body;

        if (!email || !token || !newPassword) {
            return Response.json({ error: 'All fields are required.' }, { status: 400 });
        }

        const pwErr = passwordError(newPassword);
        if (pwErr) return Response.json({ error: pwErr }, { status: 400 });

        const now = new Date();
        const record = await prisma.verification.findFirst({
            where: { identifier: `fp-token:${email}`, expiresAt: { gt: now } },
        });

        if (!record) {
            return Response.json({ error: 'Reset session has expired. Please start again.' }, { status: 400 });
        }

        const providedHash = crypto.createHash('sha256').update(token).digest('hex');
        const storedHash = Buffer.from(record.value, 'hex');
        const givenHash = Buffer.from(providedHash, 'hex');

        if (
            storedHash.length !== givenHash.length ||
            !crypto.timingSafeEqual(storedHash, givenHash)
        ) {
            return Response.json({ error: 'Invalid or expired reset token.' }, { status: 400 });
        }

        const user = await prisma.user.findUnique({ where: { email } });
        if (!user) return Response.json({ error: 'Account not found.' }, { status: 400 });

        const hashedPw = await hashPassword(newPassword);

        await prisma.account.updateMany({
            where: { userId: user.id, providerId: 'credential' },
            data: { password: hashedPw, updatedAt: new Date() },
        });

        // Revoke all sessions so the old password can no longer be used
        await prisma.session.deleteMany({ where: { userId: user.id } });

        // Delete the used token and any leftover rate-limit records
        await prisma.verification.deleteMany({ where: { identifier: `fp-token:${email}` } });
        await prisma.verification.deleteMany({ where: { identifier: `fp-req:${email}` } });

        return Response.json({ success: true });
    }

    return Response.json({ error: 'Invalid step.' }, { status: 400 });
}
