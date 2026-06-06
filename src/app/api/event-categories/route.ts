import prisma from '@/lib/prisma';

export async function GET() {
    const categories = await prisma.eventCategory.findMany({
        select: { id: true, title: true, date: true, location: true },
        orderBy: { order: 'asc' },
    });

    const serialized = categories.map((c) => ({
        id: c.id,
        title: c.title,
        date: c.date?.toISOString() ?? null,
        location: c.location,
    }));

    return Response.json(serialized);
}
