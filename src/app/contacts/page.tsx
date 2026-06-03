'use client';

import React, { useState } from 'react';
import {
	MessageCircleHeart,
	Mail,
	Phone,
	HeartHandshake,
	Users,
	Handshake,
	HandHeart,
} from 'lucide-react';
import { Inter, Gowun_Dodum } from 'next/font/google';
import Link from 'next/link';
import AnimateIn from '@/components/ui/AnimateIn';

const inter = Inter({
	weight: ['200', '300', '400', '500', '600', '700', '800'],
	subsets: ['latin'],
});
const gowun = Gowun_Dodum({ weight: '400', subsets: ['latin'] });

const ContactPage: React.FC = () => {
	const [form, setForm] = useState({
		name: '',
		email: '',
		subject: '',
		message: '',
	});
	const [submitted, setSubmitted] = useState(false);
	const [pending, setPending] = useState(false);
	const [error, setError] = useState<string | null>(null);

	const handleChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
	) => {
		const { name, value } = e.target;
		setForm((prev) => ({ ...prev, [name]: value }));
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setError(null);
		if (!form.name || !form.email || !form.message) {
			setError('Please fill in all required fields.');
			return;
		}

		setPending(true);
		try {
			const res = await fetch('/api/contact', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(form),
			});
			if (res.ok) {
				setSubmitted(true);
			} else {
				setError('Failed to send message. Please try again later.');
			}
		} catch (err: unknown) {
			console.error('Contact form error:', err);
			setError('Something went wrong. Please try again.');
		} finally {
			setPending(false);
		}
	};

	return (
		<div className="w-full flex flex-col items-center justify-start min-h-screen bg-light text-primary">

			{/* Hero — above fold, CSS animation only */}
			<section className="w-full px-4 md:px-8 py-20 mt-24 text-center space-y-6">
				<div className="max-w-3xl mx-auto space-y-4 animate-fade-in-up">
					<h2 className={`text-3xl md:text-5xl uppercase text-primary ${gowun.className}`}>
						Get In Touch
					</h2>
					<div className="w-16 h-1 mx-auto bg-secondary rounded-full" />
					<p
						className={`text-lg md:text-xl text-secondary font-semibold ${inter.className}`}
					>
						Let&apos;s Connect &amp; Create Change
					</p>
					<p className={`text-base md:text-lg text-primary/80 ${inter.className}`}>
						Have a question, an idea, or just want to say hi? Whether you&apos;re a
						changemaker, donor, partner, or volunteer, this is your space to
						reach out.
					</p>
				</div>
			</section>

			{/* Info Cards */}
			<AnimateIn className="w-full">
				<section className="w-full px-4 md:px-16 py-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 text-center">
					<ActionCard
						icon={<Users className="w-10 h-10 mx-auto text-secondary" />}
						title="Join Our Community"
						description="Be part of a movement making impact across Abuja, Nigeria."
						link={{ href: '/join-us', label: 'Click to Join' }}
					/>
					<ActionCard
						icon={<Handshake className="w-10 h-10 mx-auto text-secondary" />}
						title="Partner With Us"
						description="Align your brand with purpose and sustainable growth."
						link={{ href: '/join-us#partner', label: 'Click to Partner' }}
					/>
					<ActionCard
						icon={<HeartHandshake className="w-10 h-10 mx-auto text-secondary" />}
						title="Volunteer Today"
						description="Use your skills and time to directly impact lives."
						link={{ href: '/join-us#volunteer', label: 'Click to Volunteer' }}
					/>
				</section>
			</AnimateIn>

			{/* Contact Form & Info */}
			<AnimateIn className="w-full max-w-7xl">
			<section className="w-full max-w-7xl px-4 md:px-8 py-12 flex flex-col lg:flex-row gap-12">
				{/* Form */}
				<div className="w-full lg:w-2/3 bg-white shadow-md rounded-lg px-6 py-10 space-y-6">
					<h2 className={`text-2xl font-bold text-primary ${gowun.className}`}>
						Send Us a Message
					</h2>
					<p className={`text-sm text-primary/60 ${inter.className}`}>
						Let us know what is on your mind — we will get back to you as soon as
						possible.
					</p>

					{submitted ? (
						<div className="flex flex-col items-center gap-4 py-8 text-center">
							<div className="p-4 bg-secondary/10 rounded-full border-2 border-secondary">
								<HeartHandshake className="w-10 h-10 text-secondary" />
							</div>
							<p className="text-secondary font-semibold text-lg">
								Thank you! Your message has been received.
							</p>
							<p className={`text-primary/70 text-sm ${inter.className}`}>
								We&apos;ll get back to you within 24 hours.
							</p>
							<button
								onClick={() => { setSubmitted(false); setForm({ name: '', email: '', subject: '', message: '' }); }}
								className="text-sm text-primary hover:text-secondary underline underline-offset-4 transition-colors mt-2"
							>
								Send another message
							</button>
						</div>
					) : (
						<form
							onSubmit={handleSubmit}
							className="grid grid-cols-1 md:grid-cols-2 gap-6"
							noValidate
						>
							<div className="col-span-2 md:col-span-1 flex flex-col gap-1">
								<label htmlFor="contact-name" className="text-xs font-medium text-primary/60 uppercase tracking-wider">
									Name <span className="text-red-500" aria-hidden="true">*</span>
								</label>
								<input
									id="contact-name"
									type="text"
									name="name"
									required
									placeholder="Your name"
									value={form.name}
									onChange={handleChange}
									className="border-b border-primary/30 bg-transparent p-2 focus:outline-none focus:border-b-2 focus:border-secondary transition-colors placeholder:text-primary/30"
								/>
							</div>
							<div className="col-span-2 md:col-span-1 flex flex-col gap-1">
								<label htmlFor="contact-email" className="text-xs font-medium text-primary/60 uppercase tracking-wider">
									Email <span className="text-red-500" aria-hidden="true">*</span>
								</label>
								<input
									id="contact-email"
									type="email"
									name="email"
									required
									placeholder="you@example.com"
									value={form.email}
									onChange={handleChange}
									className="border-b border-primary/30 bg-transparent p-2 focus:outline-none focus:border-b-2 focus:border-secondary transition-colors placeholder:text-primary/30"
								/>
							</div>
							<div className="col-span-2 flex flex-col gap-1">
								<label htmlFor="contact-subject" className="text-xs font-medium text-primary/60 uppercase tracking-wider">
									Subject
								</label>
								<input
									id="contact-subject"
									type="text"
									name="subject"
									placeholder="What is this regarding?"
									value={form.subject}
									onChange={handleChange}
									className="border-b border-primary/30 bg-transparent p-2 focus:outline-none focus:border-b-2 focus:border-secondary transition-colors placeholder:text-primary/30"
								/>
							</div>
							<div className="col-span-2 flex flex-col gap-1">
								<label htmlFor="contact-message" className="text-xs font-medium text-primary/60 uppercase tracking-wider">
									Message <span className="text-red-500" aria-hidden="true">*</span>
								</label>
								<textarea
									id="contact-message"
									name="message"
									required
									rows={5}
									placeholder="Tell us what's on your mind…"
									value={form.message}
									onChange={handleChange}
									className="border-b border-primary/30 bg-transparent p-2 focus:outline-none focus:border-b-2 focus:border-secondary transition-colors resize-none placeholder:text-primary/30"
								/>
							</div>
							{error && (
								<p className="col-span-2 text-sm text-red-600" role="alert">{error}</p>
							)}
							<div className="col-span-2">
								<button
									type="submit"
									disabled={pending}
									className="w-full bg-primary hover:bg-primary-dark disabled:opacity-60 disabled:cursor-not-allowed text-white font-semibold py-3 rounded-sm transition-colors duration-300"
								>
									{pending ? 'Sending…' : 'Send Message'}
								</button>
							</div>
						</form>
					)}
				</div>

				{/* Contact Info */}
				<div className="w-full lg:w-1/3 bg-primary text-white px-6 py-10 rounded-lg space-y-6">
					<ContactInfo
						icon={<Mail className="shrink-0" size={20} />}
						title="Email Us"
						link={{
							href: 'mailto:kakamemorialfoundation@gmail.com',
							label: 'kakamemorialfoundation@gmail.com',
						}}
						content="We respond within 24 hours on business days."
					/>
						<ContactInfo
						icon={<Phone className="shrink-0" size={20} />}
						title="Call Us"
						link={{
							href: 'tel:+2348068287964',
							label: '+234 8068287964',
						}}
						content="Available Monday to Friday, 9 AM – 5 PM WAT"
					/>

					
					<ContactInfo
						icon={<Phone className="shrink-0" size={20} />}
						title="Call Us"
						link={{
							href: 'tel:+2349028123427',
							label: '+234 9028123427',
						}}
						
						
						content="Available Monday to Friday, 9 AM – 5 PM WAT"
					/>
					<ContactInfo
						icon={<MessageCircleHeart className="shrink-0" size={20} />}
						title="WhatsApp Us"
						link={{
							href: 'https://wa.me/2348067094933',
							label: '+234  806 828 7964',
						}}
						content="Quick responses for urgent inquiries."
					/>
					<ContactInfo
						icon={<Users className="shrink-0" size={20} />}
						title="Visit Us"
						content="Coming soon"
					/>
				</div>
			</section>
			</AnimateIn>

			{/* Bottom CTA */}
			<AnimateIn className="w-full">
			<section className="w-full mt-24 bg-secondary text-light text-center px-6 py-12 space-y-6">
				<HandHeart
					className="w-16 h-16 mx-auto text-light animate-pulse-slow"
					strokeWidth={1}
				/>
				<h2 className={`text-3xl md:text-4xl font-bold ${gowun.className}`}>
					Let&apos;s Build the Future Together
				</h2>
				<p
					className={`max-w-2xl mx-auto text-base font-light tracking-wide ${inter.className}`}
				>
					We believe in people-powered change. Whether it&apos;s a question, a
					connection, or a contribution — this is your moment to start something
					meaningful.
				</p>
			</section>
			</AnimateIn>
		</div>
	);
};

export default ContactPage;

// Action Card Component
const ActionCard = ({
	icon,
	title,
	description,
	link,
}: {
	icon: React.ReactNode;
	title: string;
	description: string;
	link?: { href: string; label: string };
}) => (
	<div className="bg-white shadow-md hover:shadow-lg hover:-translate-y-1 transition-all duration-300 rounded-lg px-6 py-8 space-y-4">
		{icon}
		<h3 className="text-lg font-semibold text-primary">{title}</h3>
		<p className="text-sm text-primary/70">{description}</p>

		{link && (
			<Link
				href={link.href}
				className="inline-block mt-4 text-sm text-secondary font-semibold hover:underline underline-offset-4 transition-colors"
			>
				{link.label}
			</Link>
		)}
	</div>
);

// Contact Info Row
const ContactInfo = ({
	icon,
	title,
	content,
	link,
}: {
	icon: React.ReactNode;
	title: string;
	content: string;
	link?: { href: string; label: string };
}) => (
	<div className="space-y-1">
		<div className="flex items-center gap-2 font-semibold text-base text-secondary">
			{icon}
			<span>{title}</span>
		</div>
		<p className="text-sm text-white/80 leading-6">{content}</p>
		{link && (
			<Link
				href={link.href}
				className="text-sm text-accent-three hover:text-secondary transition-colors hover:underline underline-offset-2 break-all"
			>
				{link.label}
			</Link>
		)}
	</div>
);
