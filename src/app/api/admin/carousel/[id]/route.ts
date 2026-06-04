import { NextRequest } from 'next/server';
import { revalidatePath } from 'next/cache';
import { auth } from '@/lib/auth';
import prisma from '@/lib/prisma';

async function requireAdmin(request: NextRequest) {
    const session = await auth.api.getSession({ headers: request.headers });
    if (!session?.user || session.user.role !== 'admin') return null;
    return session;
}

function serialize(item: {
    id: number; title: string; description: string; imageSrc: string;
    imageAlt: string; link: string | null; order: number;
    createdAt: Date; updatedAt: Date;
}) {
    return {
        ...item,
        createdAt: item.createdAt.toISOString(),
        updatedAt: item.updatedAt.toISOString(),
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
    const { title, description, imageSrc, imageAlt, link, order } = body;

    if (!title?.trim()) return Response.json({ message: 'Title is required.' }, { status: 400 });
    if (!description?.trim()) return Response.json({ message: 'Description is required.' }, { status: 400 });
    if (!imageSrc?.trim()) return Response.json({ message: 'Image is required.' }, { status: 400 });

    const item = await prisma.carouselItem.update({
        where: { id },
        data: {
            title: title.trim(),
            description: description.trim(),
            imageSrc: imageSrc.trim(),
            imageAlt: imageAlt?.trim() ?? '',
            link: link?.trim() || null,
            order: typeof order === 'number' ? order : 0,
        },
    });
    revalidatePath('/');
    return Response.json(serialize(item));
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

    await prisma.carouselItem.delete({ where: { id } });
    revalidatePath('/');
    return Response.json({ message: 'Deleted.' });
}
