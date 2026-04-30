import { NextRequest } from 'next/server';
import { auth } from '@/lib/auth';
import prisma from '@/lib/prisma';

async function requireAdmin(request: NextRequest) {
    const session = await auth.api.getSession({ headers: request.headers });
    if (!session?.user || session.user.role !== 'admin') return null;
    return session;
}

function serialize(e: {
    id: number; title: string; subtitle: string; about: string;
    date: Date | null; location: string; imageUrl: string; background: string;
    createdAt: Date; updatedAt: Date;
}) {
    return {
        ...e,
        date: e.date?.toISOString() ?? null,
        createdAt: e.createdAt.toISOString(),
        updatedAt: e.updatedAt.toISOString(),
    };
}

export async function GET(request: NextRequest) {
    if (!await requireAdmin(request)) {
        return Response.json({ message: 'Unauthorized.' }, { status: 401 });
    }
    const events = await prisma.eventCategory.findMany({ orderBy: { id: 'asc' } });
    return Response.json(events.map(serialize));
}

export async function POST(request: NextRequest) {
    if (!await requireAdmin(request)) {
        return Response.json({ message: 'Unauthorized.' }, { status: 401 });
    }
    const body = await request.json();
    const { title, subtitle, about, date, location, imageUrl, background } = body;

    if (!title?.trim()) {
        return Response.json({ message: 'Title is required.' }, { status: 400 });
    }

    const event = await prisma.eventCategory.create({
        data: {
            title: title.trim(),
            subtitle: subtitle?.trim() ?? '',
            about: about?.trim() ?? '',
            date: date ? new Date(date) : null,
            location: location?.trim() ?? '',
            imageUrl: imageUrl?.trim() ?? '',
            background: background || 'bg-secondary',
        },
    });
    return Response.json(serialize(event), { status: 201 });
}
