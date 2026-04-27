'use client';

import React, { useState } from 'react';
import { Gowun_Dodum, Inter } from 'next/font/google';
const inter = Inter({
	weight: ['200', '300', '400', '500', '600', '700', '800'],
	subsets: ['latin'],
});
const gowun = Gowun_Dodum({ weight: '400', subsets: ['latin'] });
const EventRegistrationForm = () => {
	const [formData, setFormData] = useState({
		name: '',
		email: '',
		phone: '',
		event: '',
		message: '',
	});

	const [submitted, setSubmitted] = useState(false);

	const handleChange = (
		e: React.ChangeEvent<
			HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
		>
	) => {
		const { name, value } = e.target;
		setFormData((prev) => ({ ...prev, [name]: value }));
	};

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		console.log('Submitted:', formData);
		setSubmitted(true);
	};

	return (
		<section>
		
			{/* // Main section for the event registration form */}
			<section className="w-full max-w-3xl mx-auto px-4 py-16 my-32">
				<h2
					className={`text-3xl md:text-4xl font-bold text-primary text-center mb-6 uppercase tracking-wide ${gowun.className}`}
				>
					Event Registration
				</h2>
				<p className={`text-center text-accent-one mb-8 ${inter.className}`}>
					Fill in your details to register for an upcoming event.
				</p>

				<form
					onSubmit={handleSubmit}
					className="space-y-6 bg-white p-8 shadow-lg rounded-lg"
				>
					<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
						<div>
							<label className={`block  text-primary ${inter.className}`}>
								Full Name
							</label>
							<input
								type="text"
								name="name"
								value={formData.name}
								onChange={handleChange}
								required
								className="mt-1 py-2 block w-full rounded-sm border-gray-300 shadow-sm focus:outline-2 focus:outline-primary"
							/>
						</div>

						<div>
							<label
								className={`block  text-primary ${inter.className}`}
							>
								Email
							</label>
							<input
								type="email"
								name="email"
								value={formData.email}
								onChange={handleChange}
								required
								className="mt-1 block w-full  py-2 rounded-sm border-gray-300 shadow-sm focus:outline-2 focus:outline-primary"
							/>
						</div>

						<div>
							<label className={`block  text-primary ${inter.className}`}>
								Phone Number
							</label>
							<input
								type="tel"
								name="phone"
								value={formData.phone}
								onChange={handleChange}
								required
								className="mt-1 block w-full py-2 rounded-sm border-gray-300 shadow-sm focus:outline-2 focus:outline-primary"
							/>
						</div>

						<div>
							<label className={`block  text-primary ${inter.className}`}>
								Select Event
							</label>
							<select
								name="event"
								value={formData.event}
								onChange={handleChange}
								required
								className="mt-1 block w-full py-2 rounded-sm border-gray-300 shadow-sm focus:outline-2 focus:outline-primary"
							>
								<option value="">-- Choose an Event --</option>
								<option value="Community Outreach">Community Outreach</option>
								<option value="Advocacy Campaign">
									Advocacy & Awareness Campaign
								</option>
								<option value="Fundraising">Fundraising & Partnership</option>
							</select>
						</div>
					</div>

					<div>
						<label className={`block  text-primary ${inter.className}`}>
							Message (optional)
						</label>
						<textarea
							name="message"
							value={formData.message}
							onChange={handleChange}
							rows={4}
							className="mt-1 block w-full p-2 rounded-sm border-gray-300 shadow-sm cursor-pointer hover:shadow-lg hover:border-primary focus:outline-2 focus:outline-primary"
							placeholder="Any additional information or questions you have..."
						/>
					</div>

					<button
						type="submit"
						className="w-full bg-primary text-white font-semibold py-3 rounded-sm hover:bg-secondary transition duration-300"
					>
						Register
					</button>

					{submitted && (
						<p className="text-green-600 font-medium text-center mt-4">
							Thank you for registering! We'll get in touch with more details.
						</p>
					)}
				</form>
			</section>
		</section>
	);
};

export default EventRegistrationForm;
