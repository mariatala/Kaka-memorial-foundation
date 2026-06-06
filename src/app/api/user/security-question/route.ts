import { NextRequest } from 'next/server';
import { auth } from '@/lib/auth';
import prisma from '@/lib/prisma';
import { hashPassword, verifyPassword } from 'better-auth/crypto';
import { SECURITY_QUESTIONS } from '@/lib/security-questions';

export async function GET(request: NextRequest) {
    const session = await auth.api.getSession({ headers: request.headers });
    if (!session?.user) {
        return Response.json({ error: 'Unauthorized.' }, { status: 401 });
    }

    const user = await prisma.user.findUnique({ where: { id: session.user.id } });
    return Response.json({
        question: user?.securityQuestion ?? null,
        isSet: !!(user?.securityQuestion && user?.securityAnswerHash),
    });
}

export async function POST(request: NextRequest) {
    const session = await auth.api.getSession({ headers: request.headers });
    if (!session?.user) {
        return Response.json({ error: 'Unauthorized.' }, { status: 401 });
    }

    let body: { currentPassword?: string; question?: string; answer?: string };
    try {
        body = await request.json();
    } catch {
        return Response.json({ error: 'Invalid request body.' }, { status: 400 });
    }

    const { currentPassword, question, answer } = body;

    if (!question || !answer) {
        return Response.json({ error: 'Security question and answer are required.' }, { status: 400 });
    }

    if (answer.trim().length < 2) {
        return Response.json({ error: 'Answer must be at least 2 characters.' }, { status: 400 });
    }

    // Reject free-form questions — only the predefined list is allowed
    if (!(SECURITY_QUESTIONS as readonly string[]).includes(question.trim())) {
        return Response.json({ error: 'Invalid security question.' }, { status: 400 });
    }

    // Check whether this is a first-time setup or an update to an existing question
    const existingUser = await prisma.user.findUnique({ where: { id: session.user.id } });
    const isFirstSetup = !existingUser?.securityAnswerHash;

    if (!isFirstSetup) {
        // For updates, require current password to confirm identity
        if (!currentPassword) {
            return Response.json(
                { error: 'Current password is required to update the security question.' },
                { status: 400 },
            );
        }

        const account = await prisma.account.findFirst({
            where: { userId: session.user.id, providerId: 'credential' },
        });

        if (!account?.password) {
            return Response.json({ error: 'No password-based account found.' }, { status: 400 });
        }

        const passwordValid = await verifyPassword({ hash: account.password, password: currentPassword });
        if (!passwordValid) {
            return Response.json({ error: 'Current password is incorrect.' }, { status: 401 });
        }
    }

    const answerHash = await hashPassword(answer.trim().toLowerCase());

    await prisma.user.update({
        where: { id: session.user.id },
        data: {
            securityQuestion: question.trim(),
            securityAnswerHash: answerHash,
            updatedAt: new Date(),
        },
    });

    return Response.json({ success: true });
}
