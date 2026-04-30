import { NextRequest } from 'next/server';
import { auth } from '@/lib/auth';
import prisma from '@/lib/prisma';

export async function GET(request: NextRequest) {
    const session = await auth.api.getSession({ headers: request.headers });

    if (!session?.user || session.user.role !== 'admin') {
        return Response.json({ message: 'Unauthorized.' }, { status: 401 });
    }

    const registrations = await prisma.registration.findMany({
        orderBy: { createdAt: 'desc' },
    });

    return Response.json(registrations);
}
