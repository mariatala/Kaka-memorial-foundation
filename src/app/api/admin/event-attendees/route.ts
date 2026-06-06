import { NextRequest } from 'next/server';
import { auth } from '@/lib/auth';
import prisma from '@/lib/prisma';

export async function GET(request: NextRequest) {
    const session = await auth.api.getSession({ headers: request.headers });
    if (!session?.user || session.user.role !== 'admin') {
        return Response.json({ message: 'Unauthorized.' }, { status: 401 });
    }

    const registrations = await prisma.event.findMany({
        orderBy: { createdAt: 'desc' },
        include: { eventCategory: { select: { id: true, title: true, date: true, location: true } } },
    });

    const serialized = registrations.map((r) => ({
        id: r.id,
        name: r.name,
        email: r.email,
        phone: r.phone,
        comments: r.comments ?? '',
        createdAt: r.createdAt.toISOString(),
        eventCategoryId: r.eventCategoryId,
        eventTitle: r.eventCategory?.title ?? r.organization ?? 'Unknown Event',
        eventDate: r.eventCategory?.date?.toISOString() ?? null,
        eventLocation: r.eventCategory?.location ?? '',
    }));

    return Response.json(serialized);
}
