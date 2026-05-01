'use client';

import { PayPalButtons } from '@paypal/react-paypal-js';

export interface PayPalSuccessDetails {
    name: string;
    email: string;
    transactionId: string;
}

interface PayPalPaymentProps {
    amount: number;
    frequency: string;
    onSuccess: (details: PayPalSuccessDetails) => void;
}

export default function PayPalPayment({ amount, frequency, onSuccess }: PayPalPaymentProps) {
    return (
        <PayPalButtons
            // Re-mount buttons whenever amount or frequency changes so createOrder always
            // captures the current values rather than a stale closure.
            key={`${amount}-${frequency}`}
            style={{ layout: 'vertical', color: 'blue', shape: 'rect', label: 'paypal' }}
            createOrder={(_data, actions) =>
                actions.order.create({
                    intent: 'CAPTURE',
                    purchase_units: [{
                        amount: { currency_code: 'USD', value: amount.toFixed(2) },
                    }],
                })
            }
            onApprove={async (data, actions) => {
                if (!actions.order) return;

                const details = await actions.order.capture();

                const name = [
                    details.payer?.name?.given_name,
                    details.payer?.name?.surname,
                ].filter(Boolean).join(' ');
                const email = details.payer?.email_address ?? '';
                const transactionId = details.id ?? data.orderID;

                // Record the donation — fire-and-forget; a failure must not block the thank-you UX
                fetch('/api/donation', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ name, email, amount, currency: 'USD', transactionId, frequency }),
                }).catch(() => {/* silent — payment already completed */});

                onSuccess({ name, email, transactionId });
            }}
        />
    );
}
