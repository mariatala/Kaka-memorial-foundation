'use client';

import { Suspense, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { signUp } from '@/lib/auth-client';
import Link from 'next/link';
import Image from 'next/image';
import { Inter, Gowun_Dodum } from 'next/font/google';
import { Eye, EyeOff, UserPlus } from 'lucide-react';

const inter = Inter({
	weight: ['300', '400', '500', '600', '700'],
	subsets: ['latin'],
});
const gowun = Gowun_Dodum({ weight: '400', subsets: ['latin'] });

function SignUpForm() {
	const router = useRouter();
	const searchParams = useSearchParams();
	const rawCallback = searchParams.get('callbackUrl');
	const callbackUrl = rawCallback?.startsWith('/') ? rawCallback : '/';

	const [error, setError] = useState<string | null>(null);
	const [pending, setPending] = useState(false);
	const [showPassword, setShowPassword] = useState(false);

	async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault();
		setError(null);
		setPending(true);

		const formData = new FormData(e.currentTarget);
		const res = await signUp.email({
			name: formData.get('name') as string,
			email: formData.get('email') as string,
			password: formData.get('password') as string,
		});

		if (res.error) {
			setError(res.error.message || 'Something went wrong. Please try again.');
			setPending(false);
		} else {
			router.push(callbackUrl);
		}
	}

	return (
		<div className="w-full max-w-md">
			<div className="mb-8 space-y-1">
				<h1 className={`text-3xl md:text-4xl font-bold text-primary tracking-wide uppercase ${gowun.className}`}>
					Create Account
				</h1>
				<div className="w-10 h-0.5 bg-secondary rounded-full" />
				<p className={`text-primary/60 text-sm mt-2 ${inter.className}`}>
					Set up your account to register for events and more.
				</p>
			</div>

			{error && (
				<div className="mb-6 px-4 py-3 bg-red-50 border-l-4 border-red-500 rounded-sm" role="alert">
					<p className="text-red-700 text-sm font-medium">{error}</p>
				</div>
			)}

			<form onSubmit={handleSubmit} className="space-y-6" noValidate>
				<div className="flex flex-col gap-1.5">
					<label htmlFor="name" className="text-sm font-medium text-primary/80">
						Full Name
					</label>
					<input
						id="name"
						name="name"
						type="text"
						autoComplete="name"
						required
						placeholder="Zainab Inuwa Gani"
						className="w-full border-b-2 border-primary/20 bg-transparent py-2.5 px-1 text-primary placeholder:text-primary/30 focus:outline-none focus:border-secondary transition-colors duration-200"
					/>
				</div>

				<div className="flex flex-col gap-1.5">
					<label htmlFor="email" className="text-sm font-medium text-primary/80">
						Email Address
					</label>
					<input
						id="email"
						name="email"
						type="email"
						autoComplete="email"
						required
						placeholder="you@example.com"
						className="w-full border-b-2 border-primary/20 bg-transparent py-2.5 px-1 text-primary placeholder:text-primary/30 focus:outline-none focus:border-secondary transition-colors duration-200"
					/>
				</div>

				<div className="flex flex-col gap-1.5">
					<label htmlFor="password" className="text-sm font-medium text-primary/80">
						Password
					</label>
					<div className="relative">
						<input
							id="password"
							name="password"
							type={showPassword ? 'text' : 'password'}
							autoComplete="new-password"
							required
							minLength={8}
							placeholder="Minimum 8 characters"
							className="w-full border-b-2 border-primary/20 bg-transparent py-2.5 px-1 pr-10 text-primary placeholder:text-primary/30 focus:outline-none focus:border-secondary transition-colors duration-200"
						/>
						<button
							type="button"
							onClick={() => setShowPassword((v) => !v)}
							aria-label={showPassword ? 'Hide password' : 'Show password'}
							className="absolute right-1 top-1/2 -translate-y-1/2 text-primary/40 hover:text-primary/70 transition-colors"
						>
							{showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
						</button>
					</div>
					<p className="text-xs text-primary/40 mt-0.5">Must be at least 8 characters.</p>
				</div>

				<button
					type="submit"
					disabled={pending}
					className="w-full flex items-center justify-center gap-2 bg-secondary hover:bg-secondary-dark disabled:opacity-60 disabled:cursor-not-allowed text-white font-semibold py-3 rounded-sm transition-colors duration-300"
				>
					{pending ? (
						<span className="flex items-center gap-2">
							<svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
								<circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
								<path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
							</svg>
							Creating account…
						</span>
					) : (
						<>
							<UserPlus size={18} />
							Create Account
						</>
					)}
				</button>
			</form>

			<p className={`mt-8 text-center text-sm text-primary/60 ${inter.className}`}>
				Already have an account?{' '}
				<Link
					href={`/sign-in${callbackUrl !== '/admin' ? `?callbackUrl=${encodeURIComponent(callbackUrl)}` : ''}`}
					className="text-secondary font-semibold hover:underline underline-offset-4 transition-colors"
				>
					Sign in
				</Link>
			</p>

			<div className="mt-6 text-center">
				<Link
					href="/"
					className="text-xs text-primary/40 hover:text-primary/70 transition-colors"
				>
					← Back to website
				</Link>
			</div>
		</div>
	);
}

export default function SignUpPage() {
	return (
		<div className={`min-h-screen bg-accent-three-light flex flex-col lg:flex-row ${inter.className}`}>

			{/* ── Left: brand panel ── */}
			<div className="hidden lg:flex lg:w-1/2 bg-primary-dark relative overflow-hidden flex-col justify-between p-16">
				<div
					className="absolute inset-0 bg-cover bg-center opacity-10"
					style={{ backgroundImage: "url('/cover_image.jpeg')" }}
				/>
				<div className="relative z-10 flex flex-col h-full justify-center gap-12">
					<div className="space-y-6">
						<h2 className={`text-4xl xl:text-5xl text-light tracking-widest uppercase leading-snug ${gowun.className}`}>
							Be Part of<br />the Change
						</h2>
						<div className="w-16 h-1 bg-secondary rounded-full" />
						<p className="text-accent-three text-base leading-8 tracking-wide max-w-sm">
							Join the foundation and help us uplift rural communities through education, clean water, and human rights advocacy.
						</p>
					</div>
					<p className="text-light/30 text-xs">
						Kaka Memorial Foundation · Registered Charity 193031
					</p>
				</div>
			</div>

			{/* ── Right: form ── */}
			<div className="flex-1 flex flex-col items-center justify-center px-6 py-16 pt-28 lg:pt-16">
				{/* Mobile logo */}
				<div className="lg:hidden mb-8 flex flex-col items-center gap-3">
					<Link href="/">
						<Image src="/Logo.png" alt="Kaka Memorial Foundation" width={80} height={80} className="w-20 h-auto" />
					</Link>
					<p className={`text-primary/50 text-xs tracking-widest uppercase ${inter.className}`}>
						Kaka Memorial Foundation
					</p>
				</div>

				<Suspense fallback={
					<div className="w-full max-w-md space-y-6 animate-pulse">
						<div className="h-10 bg-primary/10 rounded" />
						<div className="h-12 bg-primary/10 rounded" />
						<div className="h-12 bg-primary/10 rounded" />
						<div className="h-12 bg-primary/10 rounded" />
						<div className="h-12 bg-primary/10 rounded" />
					</div>
				}>
					<SignUpForm />
				</Suspense>
			</div>
		</div>
	);
}
