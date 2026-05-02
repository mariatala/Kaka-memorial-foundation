import { NextRequest } from 'next/server';
import { auth } from '@/lib/auth';
import prisma from '@/lib/prisma';

async function requireAdmin(request: NextRequest) {
    const session = await auth.api.getSession({ headers: request.headers });
    if (!session?.user || session.user.role !== 'admin') return null;
    return session;
}

export async function GET(request: NextRequest) {
    if (!await requireAdmin(request)) {
        return Response.json({ message: 'Unauthorized.' }, { status: 401 });
    }
    const memberships = await prisma.membership.findMany({
        orderBy: { createdAt: 'desc' },
    });
    return Response.json(
        memberships.map(m => ({ ...m, createdAt: m.createdAt.toISOString() }))
    );
}
