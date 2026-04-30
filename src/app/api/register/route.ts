import { NextRequest } from 'next/server';
import prisma from '@/lib/prisma';

function normalizePhone(raw: string): string {
    const digits = raw.replace(/\D/g, '');
    // Nigerian local format: 11 digits starting with 0 → E.164 digits (234...)
    if (digits.length === 11 && digits.startsWith('0')) {
        return '234' + digits.slice(1);
    }
    return digits;
}

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { name, phone, email, address, message, formType } = body;

        if (!name?.trim() || !phone?.trim()) {
            return Response.json(
                { message: 'Name and phone number are required.' },
                { status: 400 }
            );
        }

        if (!['partner', 'volunteer'].includes(formType)) {
            return Response.json(
                { message: 'Invalid registration type.' },
                { status: 400 }
            );
        }

        const normalizedPhone = normalizePhone(phone.trim());

        if (!normalizedPhone) {
            return Response.json(
                { message: 'Please enter a valid phone number.' },
                { status: 400 }
            );
        }

        const existing = await prisma.registration.findFirst({
            where: { phone: normalizedPhone },
        });

        if (existing) {
            const type = existing.registrationType === formType
                ? `a ${existing.registrationType}`
                : `a ${existing.registrationType}`;
            return Response.json(
                {
                    message: `This phone number is already registered as ${type}. Each phone number can only be used once.`,
                },
                { status: 409 }
            );
        }

        await prisma.registration.create({
            data: {
                registrationType: formType as string,
                name: name.trim(),
                phone: normalizedPhone,
                email: email?.trim() ?? '',
                address: address?.trim() ?? '',
                message: message?.trim() ?? '',
            },
        });

        return Response.json(
            { message: 'Registration submitted successfully.' },
            { status: 201 }
        );
    } catch (error) {
        // Unique constraint violation (race condition fallback)
        if (
            typeof error === 'object' &&
            error !== null &&
            'code' in error &&
            (error as { code: string }).code === 'P2002'
        ) {
            return Response.json(
                { message: 'This phone number is already registered. Each phone number can only be used once.' },
                { status: 409 }
            );
        }
        console.error('Registration error:', error);
        return Response.json(
            { message: 'Something went wrong. Please try again.' },
            { status: 500 }
        );
    }
}
