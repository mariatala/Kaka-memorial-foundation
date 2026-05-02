import { NextRequest } from 'next/server';
import prisma from '@/lib/prisma';

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { email } = body;

        if (!email?.trim()) {
            return Response.json({ message: 'Email is required.' }, { status: 400 });
        }

        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
            return Response.json(
                { message: 'Please enter a valid email address.' },
                { status: 400 }
            );
        }

        const normalized = email.trim().toLowerCase();

        // Upsert is atomic — avoids the race condition of findFirst then create
        await prisma.membership.upsert({
            where:  { email: normalized },
            update: {},
            create: { email: normalized },
        });

        return Response.json({ success: true, message: 'Subscribed successfully.' });
    } catch (error) {
        console.error('Membership subscription error:', error);
        return Response.json(
            { message: 'Something went wrong. Please try again.' },
            { status: 500 }
        );
    }
}
