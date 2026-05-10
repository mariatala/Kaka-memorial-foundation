'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Mail, PhoneCall, MapPin, MessageCircleHeart } from 'lucide-react';
import { FaFacebook, FaInstagram } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';

const Footer: React.FC = () => {
	const [email,   setEmail]   = useState('');
	const [pending, setPending] = useState(false);
	const [success, setSuccess] = useState(false);
	const [error,   setError]   = useState<string | null>(null);

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setError(null);
		const trimmed = email.trim();
		if (!trimmed) { setError('Please enter your email.'); return; }
		if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed)) { setError('Please enter a valid email address.'); return; }

		setPending(true);
		setSuccess(false);
		try {
			const res  = await fetch('/api/membership', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ email: trimmed }) });
			const data = await res.json();
			if (res.ok && data.success) { setSuccess(true); setEmail(''); }
			else { setError(data.message || 'Subscription failed. Please try again.'); }
		} catch { setError('Something went wrong. Please try again.'); }
		finally { setPending(false); }
	};

	return (
		<footer>
			<div className="w-full flex flex-col lg:flex-row">
				{/* ── Left: contact info ── */}
				<div className="bg-primary w-full lg:w-2/3">
					<div className="flex flex-col text-light p-8 md:p-12 lg:p-16 h-full gap-8">

						{/* Logo */}
						<div className="flex items-center gap-4">
							<Image src="/Logo.png" alt="Kaka Memorial Foundation Logo" width={64} height={64} className="w-14 h-auto" />
							<div>
								<p className="text-base font-semibold font-reading tracking-wide text-light">Kaka Memorial Foundation</p>
								<p className="text-xs text-accent-three tracking-wider">Impacting Humanity With Kindness</p>
							</div>
						</div>

						{/* Heading */}
						<div className="flex flex-col gap-2">
							<h2 className="text-3xl md:text-5xl tracking-widest uppercase text-light font-reading">Contact Us</h2>
							<div className="w-16 h-1 bg-secondary rounded-full" />
							<h3 className="text-xl text-secondary font-semibold tracking-wide mt-1">Let&#39;s talk, your voice matters</h3>
						</div>

						<p className="tracking-wider text-accent-three text-sm leading-7 font-reading max-w-lg">
							Have questions, ideas, or want to get involved? Whether you&#39;re looking to volunteer, partner, or simply learn more; reach out!
						</p>

						{/* Contact details */}
						<address className="not-italic flex flex-col gap-4 text-sm font-light">
							<p className="text-base font-semibold text-secondary tracking-wide">Get in Touch:</p>

							<p className="flex items-center gap-3">
								<Mail className="shrink-0 text-secondary" size={18} aria-hidden="true" />
								{/* FIX: unified email — was kakafoundation@gmail.com in old footer */}
								<Link href="mailto:kakamemorialfoundation@gmail.com" className="hover:text-secondary transition-colors break-all">
									kakamemorialfoundation@gmail.com
								</Link>
							</p>

							<p className="flex items-center gap-3">
								<PhoneCall className="shrink-0 text-secondary" size={18} aria-hidden="true" />
								<Link href="tel:+2348069521144" className="hover:text-secondary transition-colors">+234 806 952 1144</Link>
							</p>

							<p className="flex items-start gap-3">
								<MapPin className="shrink-0 mt-0.5 text-secondary" size={18} aria-hidden="true" />
								<span>No. 20 Alh Inuwa Gani Shopping Complex, Along ABUJA-LOKOJA Express Road, Abaji-Abuja</span>
							</p>

							{/* FIX: WhatsApp link — was MessageCircleHeart without proper href */}
							<p className="flex items-center gap-3">
								<MessageCircleHeart className="shrink-0 text-secondary" size={18} aria-hidden="true" />
								<a href="https://wa.me/2348067094933" target="_blank" rel="noopener noreferrer" className="hover:text-secondary transition-colors">
									+234 806 709 4933 (WhatsApp)
								</a>
							</p>

							<p className="text-accent-three/70">Registered Charity: 193031</p>
						</address>

						{/* Social icons */}
						<div className="flex items-center gap-5" aria-label="Social media links">
							<Link href="https://www.facebook.com/profile.php?id=100088330151858" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="text-accent-three hover:text-secondary transition-colors"><FaFacebook size={20} /></Link>
							<Link href="https://www.instagram.com/kakamfoundation/" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="text-accent-three hover:text-secondary transition-colors"><FaInstagram size={20} /></Link>
							<Link href="https://x.com/KakaMFoundation" target="_blank" rel="noopener noreferrer" aria-label="X / Twitter" className="text-accent-three hover:text-secondary transition-colors"><FaXTwitter size={20} /></Link>
						</div>

						<Link href="/sign-in?callbackUrl=/admin" className="text-white/30 text-xs hover:text-white/60 transition-colors w-fit mt-auto">Admin Login</Link>
					</div>
				</div>

				{/* ── Right: newsletter ── */}
				<div className="bg-accent-three w-full lg:w-1/3 text-primary-dark">
					<div className="flex flex-col p-8 md:p-12 lg:p-16 h-full gap-6">
						<div>
							<h2 className="text-2xl md:text-3xl tracking-widest font-semibold uppercase font-reading">Stay Informed</h2>
							<div className="w-12 h-0.5 bg-primary rounded-full mt-3" />
						</div>
						<h3 className="tracking-wide text-lg font-medium">Be the first to know</h3>
						<p className="tracking-wider text-sm leading-7 font-reading">
							Subscribe to receive updates, inspiring stories, and opportunities to get involved with Kaka Memorial Foundation.
						</p>

						<form onSubmit={handleSubmit} className="flex flex-col gap-4" noValidate>
							<div>
								<label htmlFor="footer-email" className="block mb-1 text-sm font-medium">Email Address</label>
								<input
									id="footer-email"
									type="email"
									value={email}
									onChange={(e) => setEmail(e.target.value)}
									className="w-full px-2 py-2 border-b-2 border-primary focus:border-secondary focus:outline-none bg-transparent placeholder:text-primary/40 transition-colors"
									placeholder="your@email.com"
									required
									maxLength={254}
									aria-invalid={error ? 'true' : 'false'}
									aria-describedby="newsletter-status"
								/>
							</div>
							<button type="submit" disabled={pending} className="bg-primary text-white py-2.5 px-4 rounded-sm hover:bg-primary-dark disabled:opacity-60 disabled:cursor-not-allowed transition-colors duration-300">
								{pending ? 'Subscribing…' : 'Subscribe'}
							</button>
							<p id="newsletter-status" className="text-sm min-h-5" aria-live="polite" role="status">
								{success ? <span className="text-green-800 font-medium">✓ Subscribed successfully!</span>
								 : error  ? <span className="text-red-700">{error}</span>
								 : null}
							</p>
						</form>

						{/* Quick links */}
						<nav aria-label="Footer quick links" className="mt-auto pt-4 border-t border-primary/20">
							<p className="text-xs font-semibold uppercase tracking-wider text-primary/50 mb-3">Quick Links</p>
							<ul className="flex flex-wrap gap-x-4 gap-y-2 text-sm">
								{[['/', 'Home'], ['/about', 'About'], ['/causes', 'Causes'], ['/events', 'Events'], ['/join-us', 'Join Us'], ['/contacts', 'Contact']].map(([href, label]) => (
									<li key={href}><Link href={href} className="text-primary/60 hover:text-primary-dark hover:underline underline-offset-2 transition-colors">{label}</Link></li>
								))}
							</ul>
						</nav>
					</div>
				</div>
			</div>

			{/* Bottom bar */}
			<div className="bg-primary-dark text-light py-5 flex flex-col sm:flex-row items-center justify-between gap-2 px-8 md:px-16">
				<p className="text-sm">&copy; {new Date().getFullYear()} Kaka Memorial Foundation. All rights reserved.</p>
				<p className="text-xs text-accent-three">Made with ❤️ for the communities we serve.</p>
			</div>
		</footer>
	);
};

export default Footer;
