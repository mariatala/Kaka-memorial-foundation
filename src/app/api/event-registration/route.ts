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
        const { name, email, phone, event, message } = body;

        if (!name?.trim() || !email?.trim() || !phone?.trim() || !event?.trim()) {
            return Response.json(
                { message: 'Name, email, phone, and event are required.' },
                { status: 400 }
            );
        }

        await prisma.event.create({
            data: {
                name: name.trim(),
                email: email.trim().toLowerCase(),
                phone: phone.trim(),
                organization: event.trim(),
                comments: message?.trim() ?? '',
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
