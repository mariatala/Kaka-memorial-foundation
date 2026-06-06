'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from '@/lib/auth-client';
import { Gowun_Dodum, Inter } from 'next/font/google';
import { CalendarDays, CheckCircle, LogIn } from 'lucide-react';
import Link from 'next/link';

const inter = Inter({
	weight: ['200', '300', '400', '500', '600', '700', '800'],
	subsets: ['latin'],
});
const gowun = Gowun_Dodum({ weight: '400', subsets: ['latin'] });

interface EventCategory {
	id: number;
	title: string;
	date: string | null;
	location: string;
}

export default function EventRegistrationForm() {
	const router = useRouter();
	const { data: session, isPending } = useSession();

	const [formData, setFormData] = useState({
		name: '',
		email: '',
		phone: '',
		eventCategoryId: '',
		message: '',
	});
	const [eventCategories, setEventCategories] = useState<EventCategory[]>([]);
	const [categoriesLoading, setCategoriesLoading] = useState(true);
	const [submitted, setSubmitted] = useState(false);
	const [submitting, setSubmitting] = useState(false);
	const [submitError, setSubmitError] = useState<string | null>(null);
	const [selectedEventTitle, setSelectedEventTitle] = useState('');

	// Pre-fill name and email from session once it loads
	useEffect(() => {
		if (session?.user) {
			setFormData((prev) => ({
				...prev,
				name: prev.name || session.user.name || '',
				email: prev.email || session.user.email || '',
			}));
		}
	}, [session]);

	// Fetch event categories for the dropdown
	useEffect(() => {
		fetch('/api/event-categories')
			.then((r) => r.json())
			.then((data: EventCategory[]) => setEventCategories(data))
			.catch(() => setEventCategories([]))
			.finally(() => setCategoriesLoading(false));
	}, []);

	// Redirect unauthenticated users (secondary guard after middleware)
	useEffect(() => {
		if (!isPending && !session?.user) {
			router.push('/sign-in?callbackUrl=/events/event-registration');
		}
	}, [isPending, session, router]);

	const handleChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
	) => {
		const { name, value } = e.target;
		setFormData((prev) => ({ ...prev, [name]: value }));
		if (name === 'eventCategoryId') {
			const cat = eventCategories.find((c) => String(c.id) === value);
			setSelectedEventTitle(cat?.title ?? '');
		}
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setSubmitError(null);
		setSubmitting(true);
		try {
			const res = await fetch('/api/event-registration', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({
					...formData,
					eventCategoryId: Number(formData.eventCategoryId),
				}),
			});
			const data = await res.json();
			if (!res.ok) {
				setSubmitError(data.message || 'Registration failed. Please try again.');
			} else {
				setSubmitted(true);
			}
		} catch {
			setSubmitError('Something went wrong. Please try again.');
		} finally {
			setSubmitting(false);
		}
	};

	// ── Loading state ──
	if (isPending) {
		return (
			<div className="min-h-screen bg-light flex items-center justify-center pt-20">
				<div className="flex flex-col items-center gap-4">
					<svg className="animate-spin h-8 w-8 text-secondary" viewBox="0 0 24 24" fill="none">
						<circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
						<path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
					</svg>
					<p className={`text-primary/60 text-sm ${inter.className}`}>Checking your session…</p>
				</div>
			</div>
		);
	}

	// ── Unauthenticated fallback ──
	if (!session?.user) {
		return (
			<div className="min-h-screen bg-light flex items-center justify-center px-4 pt-20">
				<div className="text-center space-y-4 max-w-sm">
					<div className="p-4 bg-primary/5 rounded-full w-fit mx-auto border border-primary/10">
						<LogIn className="w-10 h-10 text-primary" strokeWidth={1.5} />
					</div>
					<h2 className={`text-2xl font-bold text-primary uppercase tracking-wide ${gowun.className}`}>
						Sign In Required
					</h2>
					<p className={`text-primary/60 text-sm leading-relaxed ${inter.className}`}>
						You need to be signed in to register for events.
					</p>
					<Link
						href="/sign-in?callbackUrl=/events/event-registration"
						className="inline-flex items-center gap-2 bg-primary text-light px-6 py-3 rounded-sm font-semibold hover:bg-primary-dark transition-colors duration-300"
					>
						<LogIn size={18} />
						Sign In to Continue
					</Link>
				</div>
			</div>
		);
	}

	// ── Success state ──
	if (submitted) {
		return (
			<div className="min-h-screen bg-light flex items-center justify-center px-4 pt-20">
				<div className="text-center space-y-5 max-w-sm">
					<div className="p-4 bg-secondary/10 rounded-full w-fit mx-auto border-2 border-secondary">
						<CheckCircle className="w-12 h-12 text-secondary" strokeWidth={1.5} />
					</div>
					<h2 className={`text-2xl font-bold text-primary uppercase tracking-wide ${gowun.className}`}>
						You&apos;re Registered!
					</h2>
					<p className={`text-primary/70 text-sm leading-relaxed ${inter.className}`}>
						Thank you, <strong>{formData.name}</strong>! We&apos;ve received your registration for{' '}
						<strong>{selectedEventTitle}</strong>. We&apos;ll be in touch with more details.
					</p>
					<div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
						<button
							onClick={() => {
								setSubmitted(false);
								setFormData({
									name: session.user.name || '',
									email: session.user.email || '',
									phone: '',
									eventCategoryId: '',
									message: '',
								});
								setSelectedEventTitle('');
							}}
							className="px-5 py-2.5 border-2 border-primary text-primary font-semibold rounded-sm hover:bg-primary hover:text-light transition-all duration-300 text-sm"
						>
							Register for Another
						</button>
						<Link
							href="/events"
							className="px-5 py-2.5 bg-secondary text-white font-semibold rounded-sm hover:bg-secondary-dark transition-colors duration-300 text-sm"
						>
							Back to Events
						</Link>
					</div>
				</div>
			</div>
		);
	}

	// ── Form ──
	return (
		<section className="w-full min-h-screen bg-light text-primary pt-28 pb-16">
			<div className="max-w-3xl mx-auto px-4">

				{/* Header */}
				<div className="text-center mb-10 space-y-2">
					<div className="flex items-center justify-center gap-2 text-secondary mb-3">
						<CalendarDays size={20} strokeWidth={1.5} />
						<span className={`text-sm font-semibold uppercase tracking-widest ${inter.className}`}>
							Event Registration
						</span>
					</div>
					<h2 className={`text-3xl md:text-4xl font-bold text-primary uppercase tracking-wide ${gowun.className}`}>
						Register for an Event
					</h2>
					<div className="w-12 h-1 bg-secondary rounded-full mx-auto" />
					<p className={`text-primary/60 text-sm mt-2 ${inter.className}`}>
						Fill in your details below to register for an upcoming event.
					</p>
				</div>

				{/* Signed-in notice */}
				<div className="mb-6 flex items-center gap-3 bg-secondary/5 border border-secondary/20 rounded-sm px-4 py-3">
					<div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center shrink-0">
						<span className={`text-white text-xs font-bold ${inter.className}`}>
							{(session.user.name || session.user.email)[0].toUpperCase()}
						</span>
					</div>
					<p className={`text-sm text-primary/70 ${inter.className}`}>
						Registering as{' '}
						<span className="font-semibold text-primary">{session.user.name || session.user.email}</span>
					</p>
				</div>

				<form
					onSubmit={handleSubmit}
					className="bg-white shadow-md rounded-lg p-6 md:p-10 space-y-6 border border-primary/10"
				>
					<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
						<div className="flex flex-col gap-1.5">
							<label htmlFor="reg-name" className={`text-sm font-medium text-primary/80 ${inter.className}`}>
								Full Name <span className="text-red-500">*</span>
							</label>
							<input
								id="reg-name"
								type="text"
								name="name"
								value={formData.name}
								onChange={handleChange}
								required
								className="border-b-2 border-primary/20 bg-transparent py-2.5 px-1 text-primary placeholder:text-primary/30 focus:outline-none focus:border-secondary transition-colors duration-200"
							/>
						</div>

						<div className="flex flex-col gap-1.5">
							<label htmlFor="reg-email" className={`text-sm font-medium text-primary/80 ${inter.className}`}>
								Email Address <span className="text-red-500">*</span>
							</label>
							<input
								id="reg-email"
								type="email"
								name="email"
								value={formData.email}
								onChange={handleChange}
								required
								className="border-b-2 border-primary/20 bg-transparent py-2.5 px-1 text-primary placeholder:text-primary/30 focus:outline-none focus:border-secondary transition-colors duration-200"
							/>
						</div>

						<div className="flex flex-col gap-1.5">
							<label htmlFor="reg-phone" className={`text-sm font-medium text-primary/80 ${inter.className}`}>
								Phone Number <span className="text-red-500">*</span>
							</label>
							<input
								id="reg-phone"
								type="tel"
								name="phone"
								value={formData.phone}
								onChange={handleChange}
								required
								placeholder="+234 000 000 0000"
								className="border-b-2 border-primary/20 bg-transparent py-2.5 px-1 text-primary placeholder:text-primary/30 focus:outline-none focus:border-secondary transition-colors duration-200"
							/>
						</div>

						<div className="flex flex-col gap-1.5">
							<label htmlFor="reg-event" className={`text-sm font-medium text-primary/80 ${inter.className}`}>
								Select Event <span className="text-red-500">*</span>
							</label>
							<select
								id="reg-event"
								name="eventCategoryId"
								value={formData.eventCategoryId}
								onChange={handleChange}
								required
								disabled={categoriesLoading}
								className="border-b-2 border-primary/20 bg-transparent py-2.5 px-1 text-primary focus:outline-none focus:border-secondary transition-colors duration-200 cursor-pointer disabled:opacity-50"
							>
								<option value="">
									{categoriesLoading ? 'Loading events…' : '— Choose an Event —'}
								</option>
								{eventCategories.map((cat) => (
									<option key={cat.id} value={cat.id}>
										{cat.title}
										{cat.date
											? ` — ${new Date(cat.date).toLocaleDateString('en-GB', {
													day: 'numeric',
													month: 'short',
													year: 'numeric',
											  })}`
											: ''}
									</option>
								))}
							</select>
							{!categoriesLoading && eventCategories.length === 0 && (
								<p className={`text-xs text-primary/40 mt-1 ${inter.className}`}>
									No upcoming events available at this time.
								</p>
							)}
						</div>
					</div>

					<div className="flex flex-col gap-1.5">
						<label htmlFor="reg-message" className={`text-sm font-medium text-primary/80 ${inter.className}`}>
							Message <span className="text-primary/40 font-normal">(optional)</span>
						</label>
						<textarea
							id="reg-message"
							name="message"
							value={formData.message}
							onChange={handleChange}
							rows={4}
							placeholder="Any additional information or questions you have…"
							className="border-b-2 border-primary/20 bg-transparent py-2.5 px-1 text-primary placeholder:text-primary/30 focus:outline-none focus:border-secondary transition-colors duration-200 resize-none"
						/>
					</div>

					{submitError && (
						<div className="px-4 py-3 bg-red-50 border-l-4 border-red-500 rounded-sm" role="alert">
							<p className={`text-red-700 text-sm font-medium ${inter.className}`}>{submitError}</p>
						</div>
					)}

					<button
						type="submit"
						disabled={submitting || categoriesLoading}
						className="w-full flex items-center justify-center gap-2 bg-primary hover:bg-primary-dark disabled:opacity-60 disabled:cursor-not-allowed text-white font-semibold py-3 rounded-sm transition-colors duration-300"
					>
						{submitting ? (
							<span className="flex items-center gap-2">
								<svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
									<circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
									<path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
								</svg>
								Submitting…
							</span>
						) : (
							<>
								<CalendarDays size={18} />
								Register Now
							</>
						)}
					</button>
				</form>
			</div>
		</section>
	);
}
