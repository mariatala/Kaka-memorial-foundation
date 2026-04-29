'use client';

import React, { useState } from 'react';
import PayPalPayment from '@/components/PayPalPaymet';
import { Inter, Gowun_Dodum } from 'next/font/google';
const inter = Inter({
	weight: ['200', '300', '400', '500', '600', '700', '800'],

	subsets: ['latin'],
});
const gowun = Gowun_Dodum({ weight: '400', subsets: ['latin'] });

export default function DonateSection(){
	const [frequency, setFrequency] = useState<'One time' | 'Monthly'>('Monthly');
	const [amount, setAmount] = useState<number | 'Other'>(10);

	const handleFrequency = (value: 'One time' | 'Monthly') =>
		setFrequency(value);
	const handleAmount = (value: number | 'Other') => setAmount(value);

	const [showModal, setShowModal] = useState(false);

	return (
		<section
			id="donate"
			className="w-full bg-primary text-light flex flex-col pl-8 lg:flex-row scroll-mt-24"
		>
			{/* Left: Donation Form */}
			<div className="w-full lg:w-2/3 px-6 py-10 space-y-6">
				<h2 className="text-2xl font-semibold">
					<span className={`block text-light text-5xl ${gowun.className}`}>
						Donate Online:
					</span>
					<span
						className={`text-base italic text-accent-three  font-medium ${inter.className}`}
					>
						Donate Today. Change a Life Forever
					</span>
				</h2>

				<p
					className={`text-light text-sm font-light max-w-2xl tracking-wider leading-8 ${inter.className}`}
				>
					Your gift helps us provide clean water, education, healthcare, and
					hope to vulnerable communities. Every amount makes a difference — no
					act of kindness is too small.
				</p>

				{/* Frequency */}
				<div className="mt-8">
					<p className="mb-2 font-medium">Frequency:</p>
					<div className="flex gap-4">
						{['One time', 'Monthly'].map((type) => (
							<button
								type="button"
								key={type}
								onClick={() => handleFrequency(type as 'One time' | 'Monthly')}
								className={`px-4 py-2 rounded-xs bg-light text-primary font-semibold ${
									frequency === type ? 'ring-2 ring-secondary' : ''
								}`}
							>
								{type}
							</button>
						))}
					</div>
				</div>

				{/* Amount */}
				<div>
					<p className="mb-2 font-medium">Amount:</p>
					<div className="grid grid-cols-3 gap-4 max-w-md">
						{[10, 50, 100, 200, 'Other'].map((val) => (
							<button
								type="button"
								key={val}
								onClick={() => handleAmount(val as number | 'Other')}
								className={`px-4 py-2 rounded-xs bg-light text-primary font-semibold ${
									amount === val ? 'ring-2 ring-secondary' : ''
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
							className="mt-4 px-4 py-2 rounded-xs bg-light text-primary border border-secondary w-40"
							placeholder="Enter amount"
							onChange={(e) => setAmount(Number(e.target.value))}
						/>
					)}
				</div>

				{/* Submit */}
				<div>
					<form
						className="w-full max-w-md"
						onSubmit={(e) => {
							e.preventDefault();
							// Replace this with your payment integration or API call
							setShowModal(true);
						}}
					>
						<button
							type="submit"
							className="w-full bg-secondary hover:bg-secondary transition text-primary font-bold py-3 rounded-xs"
							disabled={
								amount === 'Other' ||
								(typeof amount === 'number' && amount <= 0)
							}
						>
							Donate {typeof amount === 'number' ? `$${amount}` : 'Now'}{' '}
							{frequency}
						</button>
						<div className="mt-4">
							<PayPalPayment
								amount={typeof amount === 'number' ? amount : 10}
							/>
						</div>
					</form>
				</div>
			</div>


			{/* Right: Contact Info */}
			<div className="w-full lg:w-1/3 flex flex-col justify-evenly items-center text-center bg-accent-three text-primary px-6 py-10 space-y-12">
				<div>
					<h3 className="text-lg font-semibold uppercase mb-2">In Person</h3>
					<p className="text leading-8">
						Address: 2345 Lagos, Nigeria
						<br />
						Email:{' '}
						<a
							href="mailto:kakamemorialfoundation@gmail.com"
							className="underline"
						>
							kakamemorialfoundation@gmail.com
						</a>
					</p>
				</div>

				<div>
					<h3 className="text-lg font-semibold uppercase mb-2">
						Over the Phone
					</h3>
					<p className="text leading-8">
						It is easy to donate offline too.
						<br />
						Call:{' '}
						<a href="tel:+2349028123427" className="underline font-medium">
							+234 9028123427
						</a>
					</p>
				</div>
			</div>
			{/* Modal for Thank You Message */}

			{showModal && (
				<div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
					<div className="bg-white text-primary p-8 rounded shadow-lg max-w-sm w-full text-center">
						<h3 className="text-xl font-bold mb-4">
							Thank you for your donation!
						</h3>
						<p>Your support makes a difference.</p>
						<button
							className="mt-6 px-4 py-2 bg-secondary text-light rounded"
							onClick={() => setShowModal(false)}
						>
							Close
						</button>
					</div>
				</div>
			)}
		</section>
	);
};
