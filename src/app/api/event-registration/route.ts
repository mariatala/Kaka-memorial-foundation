import { NextRequest } from 'next/server';
import { auth } from '@/lib/auth';
import { headers } from 'next/headers';
import prisma from '@/lib/prisma';

export async function POST(request: NextRequest) {
    try {
        const session = await auth.api.getSession({ headers: await headers() });
        if (!session?.user) {
            return Response.json({ message: 'Authentication required.' }, { status: 401 });
        }

        const body = await request.json();
        const { name, email, phone, eventCategoryId, message } = body;

        if (!name?.trim() || !email?.trim() || !phone?.trim() || !eventCategoryId) {
            return Response.json(
                { message: 'Name, email, phone, and event are required.' },
                { status: 400 }
            );
        }

        const categoryId = Number(eventCategoryId);
        if (!Number.isInteger(categoryId) || categoryId < 1) {
            return Response.json({ message: 'Invalid event selected.' }, { status: 400 });
        }

        const category = await prisma.eventCategory.findUnique({ where: { id: categoryId } });
        if (!category) {
            return Response.json({ message: 'Selected event does not exist.' }, { status: 400 });
        }

        const normalizedEmail = email.trim().toLowerCase();

        const existing = await prisma.event.findUnique({
            where: { eventCategoryId_email: { eventCategoryId: categoryId, email: normalizedEmail } },
        });
        if (existing) {
            return Response.json(
                { message: 'You are already registered for this event.' },
                { status: 409 }
            );
        }

        await prisma.event.create({
            data: {
                name: name.trim(),
                email: normalizedEmail,
                phone: phone.trim(),
                organization: category.title,
                comments: message?.trim() ?? '',
                eventCategoryId: categoryId,
            },
        });

        return Response.json({ message: 'Registration submitted successfully.' }, { status: 201 });
    } catch (error) {
        console.error('Event registration error:', error);
        return Response.json(
            { message: 'Something went wrong. Please try again.' },
            { status: 500 }
        );
    }
}
