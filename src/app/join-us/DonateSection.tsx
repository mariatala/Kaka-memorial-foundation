'use client';

import React, { useState } from 'react';
import { PayPalScriptProvider } from '@paypal/react-paypal-js';
import PayPalPayment from '@/components/PayPalPaymet';
import { Inter, Gowun_Dodum } from 'next/font/google';
import { X } from 'lucide-react';

const inter = Inter({
	weight: ['200', '300', '400', '500', '600', '700', '800'],
	subsets: ['latin'],
});
const gowun = Gowun_Dodum({ weight: '400', subsets: ['latin'] });

const CLIENT_ID = process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID ?? '';

export default function DonateSection() {
	const [frequency, setFrequency] = useState<'One time' | 'Monthly'>('Monthly');
	const [amount, setAmount] = useState<number | 'Other'>(10);
	const [customAmount, setCustomAmount] = useState<number>(0);
	const [showModal, setShowModal] = useState(false);
	const [donorName, setDonorName] = useState('');

	const handleFrequency = (value: 'One time' | 'Monthly') => setFrequency(value);
	const handleAmount = (value: number | 'Other') => setAmount(value);

	const effectiveAmount = amount === 'Other' ? customAmount : (amount as number);

	function handlePayPalSuccess({ name }: { name: string; email: string; transactionId: string }) {
		setDonorName(name);
		setShowModal(true);
	}

	function closeModal() {
		setShowModal(false);
		setDonorName('');
	}

	return (
		<PayPalScriptProvider options={{ clientId: CLIENT_ID }}>
			<section
				id="donate"
				className="w-full bg-primary text-light flex flex-col lg:flex-row scroll-mt-24"
			>
				{/* Left: Donation Form */}
				<div className="w-full lg:w-2/3 px-8 md:px-12 py-10 space-y-6">
					<h2 className="text-2xl font-semibold">
						<span className={`block text-light text-4xl md:text-5xl ${gowun.className}`}>
							Donate Online:
						</span>
						<span
							className={`text-base italic text-accent-three font-medium ${inter.className}`}
						>
							Donate Today. Change a Life Forever
						</span>
					</h2>

					<p
						className={`text-light/80 text-sm font-light max-w-2xl tracking-wider leading-8 ${inter.className}`}
					>
						Your gift helps us provide clean water, education, healthcare, and
						hope to vulnerable communities. Every amount makes a difference, no
						act of kindness is too small.
					</p>

					{/* Frequency */}
					<div>
						<p className={`mb-3 font-medium text-sm uppercase tracking-wider text-accent-three ${inter.className}`}>
							Frequency:
						</p>
						<div className="flex gap-4">
							{(['One time', 'Monthly'] as const).map((type) => (
								<button
									type="button"
									key={type}
									onClick={() => handleFrequency(type)}
									className={`px-5 py-2 rounded-sm text-sm font-semibold transition-all duration-200 ${
										frequency === type
											? 'bg-secondary text-white ring-2 ring-secondary ring-offset-2 ring-offset-primary'
											: 'bg-light text-primary hover:bg-secondary/20 hover:text-light'
									}`}
								>
									{type}
								</button>
							))}
						</div>
					</div>

					{/* Amount */}
					<div>
						<p className={`mb-3 font-medium text-sm uppercase tracking-wider text-accent-three ${inter.className}`}>
							Amount:
						</p>
						<div className="grid grid-cols-3 gap-3 max-w-md">
							{([10, 50, 100, 200, 'Other'] as const).map((val) => (
								<button
									type="button"
									key={val}
									onClick={() => handleAmount(val)}
									className={`px-4 py-2 rounded-sm text-sm font-semibold transition-all duration-200 ${
										amount === val
											? 'bg-secondary text-white ring-2 ring-secondary ring-offset-2 ring-offset-primary'
											: 'bg-light text-primary hover:bg-secondary/20 hover:text-light'
									}`}
								>
									{typeof val === 'number' ? `$${val}` : val}
								</button>
							))}
						</div>
						{amount === 'Other' && (
							<input
								type="number"
								min={1}
								className="mt-4 px-4 py-2 rounded-sm bg-light text-primary border-2 border-secondary focus:outline-none focus:ring-2 focus:ring-secondary w-40"
								placeholder="Enter amount"
								onChange={(e) => setCustomAmount(Number(e.target.value))}
							/>
						)}
					</div>

					{/* PayPal Buttons */}
					<div className="w-full max-w-md space-y-4">
						{CLIENT_ID ? (
							<PayPalPayment
								amount={effectiveAmount > 0 ? effectiveAmount : 10}
								frequency={frequency}
								onSuccess={handlePayPalSuccess}
							/>
						) : (
							<p className={`text-accent-three/60 text-xs ${inter.className}`}>
								Online payment is currently unavailable. Please donate in person or by phone.
							</p>
						)}
					</div>
				</div>

				{/* Right: Contact Info */}
				<div className="w-full lg:w-1/3 flex flex-col justify-evenly items-center text-center bg-accent-three text-primary px-8 py-10 gap-10">
					<div className="space-y-2">
						<h3 className="text-lg font-semibold uppercase tracking-wider mb-2">In Person</h3>
						<div className="w-10 h-0.5 bg-primary/30 rounded-full mx-auto" />
						<p className="text-sm leading-8">
							No. 20 Alh Inuwa Gani Shopping Complex,<br />
							Along ABUJA-LOKOJA Express Road,<br />
							Abaji-Abuja
						</p>
						<a
							href="mailto:kakamemorialfoundation@gmail.com"
							className="text-sm text-primary hover:text-secondary transition-colors underline underline-offset-2 break-all"
						>
							kakamemorialfoundation@gmail.com
						</a>
					</div>

					<div className="space-y-2">
						<h3 className="text-lg font-semibold uppercase tracking-wider mb-2">
							Over the Phone
						</h3>
						<div className="w-10 h-0.5 bg-primary/30 rounded-full mx-auto" />
						<p className="text-sm leading-8">
							It is easy to donate offline too.
						</p>
						<a
							href="tel:+2348069521144"
							className="text-sm font-medium hover:text-secondary transition-colors underline underline-offset-2"
						>
							+234 806 952 1144
						</a>
					</div>
				</div>

				{/* Thank You Modal — shown after successful PayPal payment */}
				{showModal && (
					<div
						className="fixed inset-0 flex items-center justify-center bg-black/60 z-50 px-4"
						onClick={closeModal}
					>
						<div
							className="relative bg-white text-primary p-8 rounded-lg shadow-xl max-w-sm w-full text-center space-y-4"
							onClick={(e) => e.stopPropagation()}
						>
							<button
								onClick={closeModal}
								className="absolute top-4 right-4 text-primary/40 hover:text-primary transition-colors"
								aria-label="Close"
							>
								<X size={20} />
							</button>
							<div className="p-4 bg-secondary/10 rounded-full border-2 border-secondary w-fit mx-auto">
								<svg className="w-10 h-10 text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
								</svg>
							</div>
							<h3 className={`text-xl font-bold text-primary ${gowun.className}`}>
								Thank you{donorName ? `, ${donorName.split(' ')[0]}` : ''}!
							</h3>
							<p className={`text-primary/70 text-sm ${inter.className}`}>
								Your donation of <strong>${effectiveAmount > 0 ? effectiveAmount : 10}</strong> has been received.
								Your support makes a real difference in the lives of those we serve.
							</p>
							<button
								className="mt-2 px-6 py-2.5 bg-secondary text-white font-semibold rounded-sm hover:bg-secondary-dark transition-colors duration-300"
								onClick={closeModal}
							>
								Close
							</button>
						</div>
					</div>
				)}
			</section>
		</PayPalScriptProvider>
	);
}
