import { NextRequest } from 'next/server';
import { revalidatePath } from 'next/cache';
import { auth } from '@/lib/auth';
import prisma from '@/lib/prisma';

async function requireAdmin(request: NextRequest) {
    const session = await auth.api.getSession({ headers: request.headers });
    if (!session?.user || session.user.role !== 'admin') return null;
    return session;
}

function serialize(s: {
    id: number; prefix: string; value: string; suffix: string;
    description: string; order: number; createdAt: Date; updatedAt: Date;
}) {
    return {
        ...s,
        createdAt: s.createdAt.toISOString(),
        updatedAt: s.updatedAt.toISOString(),
    };
}

export async function GET(request: NextRequest) {
    if (!await requireAdmin(request)) {
        return Response.json({ message: 'Unauthorized.' }, { status: 401 });
    }
    const stats = await prisma.statistic.findMany({ orderBy: { order: 'asc' } });
    return Response.json(stats.map(serialize));
}

export async function POST(request: NextRequest) {
    if (!await requireAdmin(request)) {
        return Response.json({ message: 'Unauthorized.' }, { status: 401 });
    }
    const body = await request.json();
    const { prefix, value, suffix, description, order } = body;

    if (!description?.trim()) {
        return Response.json({ message: 'Description is required.' }, { status: 400 });
    }
    if (!value?.trim() || !/^\d+$/.test(value.trim())) {
        return Response.json({ message: 'Value must be a non-negative integer.' }, { status: 400 });
    }

    const stat = await prisma.statistic.create({
        data: {
            prefix: prefix?.trim() ?? '',
            value: value.trim(),
            suffix: suffix?.trim() ?? '',
            description: description.trim(),
            order: typeof order === 'number' ? order : 0,
        },
    });
    revalidatePath('/');
    return Response.json(serialize(stat), { status: 201 });
}
