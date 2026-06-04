import { NextRequest } from 'next/server';
import { revalidatePath } from 'next/cache';
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
    order: number; createdAt: Date; updatedAt: Date;
}) {
    return {
        ...e,
        date: e.date?.toISOString() ?? null,
        createdAt: e.createdAt.toISOString(),
        updatedAt: e.updatedAt.toISOString(),
    };
}

export async function PATCH(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    if (!await requireAdmin(request)) {
        return Response.json({ message: 'Unauthorized.' }, { status: 401 });
    }
    const { id: rawId } = await params;
    const id = parseInt(rawId, 10);
    if (isNaN(id)) return Response.json({ message: 'Invalid ID.' }, { status: 400 });

    const body = await request.json();
    const { title, subtitle, about, date, location, imageUrl, background, order } = body;

    if (!title?.trim()) {
        return Response.json({ message: 'Title is required.' }, { status: 400 });
    }

    const event = await prisma.eventCategory.update({
        where: { id },
        data: {
            title: title.trim(),
            subtitle: subtitle?.trim() ?? '',
            about: about?.trim() ?? '',
            date: date ? new Date(date) : null,
            location: location?.trim() ?? '',
            imageUrl: imageUrl?.trim() ?? '',
            background: background || 'bg-secondary',
            order: typeof order === 'number' ? order : 0,
        },
    });
    revalidatePath('/events');
    return Response.json(serialize(event));
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

    await prisma.eventCategory.delete({ where: { id } });
    revalidatePath('/events');
    return Response.json({ message: 'Deleted.' });
}
