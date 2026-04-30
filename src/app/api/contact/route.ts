import { NextRequest } from 'next/server';
import prisma from '@/lib/prisma';

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { name, email, subject, message } = body;

        if (!name?.trim() || !email?.trim() || !message?.trim()) {
            return Response.json(
                { message: 'Name, email, and message are required.' },
                { status: 400 }
            );
        }

        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
            return Response.json(
                { message: 'Please enter a valid email address.' },
                { status: 400 }
            );
        }

        await prisma.contact.create({
            data: {
                name: name.trim(),
                email: email.trim().toLowerCase(),
                subject: subject?.trim() ?? '',
                message: message.trim(),
            },
        });

        return Response.json({ message: 'Message sent successfully.' }, { status: 201 });
    } catch (error) {
        console.error('Contact form error:', error);
        return Response.json(
            { message: 'Something went wrong. Please try again.' },
            { status: 500 }
        );
    }
}
