import { NextRequest } from 'next/server';
import { auth } from '@/lib/auth';
import prisma from '@/lib/prisma';

async function requireAdmin(request: NextRequest) {
    const session = await auth.api.getSession({ headers: request.headers });
    if (!session?.user || session.user.role !== 'admin') return null;
    return session;
}

export async function DELETE(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    if (!await requireAdmin(request)) {
        return Response.json({ message: 'Unauthorized.' }, { status: 401 });
    }
    const { id: rawId } = await params;
    const id = parseInt(rawId, 10);
    if (isNaN(id)) return Response.json({ message: 'Invalid ID.' }, { status: 400 });

    await prisma.membership.delete({ where: { id } });
    return Response.json({ message: 'Unsubscribed.' });
}
