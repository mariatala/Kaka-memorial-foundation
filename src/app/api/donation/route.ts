import { NextRequest } from 'next/server';
import prisma from '@/lib/prisma';

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { name, email, amount, currency, transactionId, frequency } = body;

        if (!transactionId?.trim() || !amount || !currency?.trim() || !frequency?.trim()) {
            return Response.json(
                { message: 'Missing required fields: amount, currency, transactionId, frequency.' },
                { status: 400 }
            );
        }

        const parsedAmount = Number(amount);
        if (isNaN(parsedAmount) || parsedAmount <= 0) {
            return Response.json({ message: 'Amount must be a positive number.' }, { status: 400 });
        }

        // Idempotency check — prevent duplicate recordings for the same PayPal order
        const existing = await prisma.donation.findFirst({
            where: { transactionId: transactionId.trim() },
        });
        if (existing) {
            return Response.json({ message: 'Donation already recorded.' }, { status: 409 });
        }

        await prisma.donation.create({
            data: {
                name: name?.trim() || null,
                email: email?.trim()?.toLowerCase() || null,
                amount: parsedAmount,
                currency: currency.trim().toUpperCase(),
                transactionId: transactionId.trim(),
                frequency: frequency.trim(),
            },
        });

        return Response.json({ message: 'Donation recorded.' }, { status: 201 });
    } catch (error) {
        // DB-level unique constraint violation — race condition fallback
        if (
            typeof error === 'object' && error !== null &&
            'code' in error && (error as { code: string }).code === 'P2002'
        ) {
            return Response.json({ message: 'Donation already recorded.' }, { status: 409 });
        }
        console.error('Donation recording error:', error);
        return Response.json({ message: 'Something went wrong. Please try again.' }, { status: 500 });
    }
}
