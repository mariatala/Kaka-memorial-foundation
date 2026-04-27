'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import { signIn, signUp, signOut, useSession  } from '@/lib/auth-client'; // your Better Auth client
import { HeartHandshake, Menu, X } from 'lucide-react';
import { Inter } from 'next/font/google';

const inter = Inter({
	weight: ['200', '300', '400', '500', '600', '700', '800'],
	subsets: ['latin'],
});

interface StyleVariant {
	bgColor: string;
	textColor: string;
	scrolledBgColor: string;
	scrolledTextColor: string;
}

const variants: Record<'default' | 'alt', StyleVariant> = {
	default: {
		bgColor: 'bg-transparent',
		textColor: 'text-light',
		scrolledBgColor: 'bg-primary',
		scrolledTextColor: 'text-light',
	},
	alt: {
		bgColor: 'bg-light',
		textColor: 'text-primary-dark',
		scrolledBgColor: 'bg-primary',
		scrolledTextColor: 'text-light',
	},
};

export default function Header() {
	// --- Better Auth replaces useSession/signOut from next-auth/react ---
	const { data: session } = useSession();
	const router = useRouter();
	// --------------------------------------------------------------------

	const pathname = usePathname();
	const [isOpen, setIsOpen] = useState(false);
	const [scrolled, setScrolled] = useState(false);

	const altPaths = [
		'causes',
		'events',
		'join_us',
		'contact',
		'login',
		'registrations',
	] as const;
	const segment = pathname.split('/')[1];
	const variantKey = altPaths.includes(segment as (typeof altPaths)[number])
		? 'alt'
		: 'default';
	const { bgColor, textColor, scrolledBgColor, scrolledTextColor } =
		variants[variantKey];

	useEffect(() => {
		const onScroll = () => setScrolled(window.scrollY > 60);
		window.addEventListener('scroll', onScroll);
		return () => window.removeEventListener('scroll', onScroll);
	}, []);

	const navTextColor = scrolled ? scrolledTextColor : textColor;
	const toggleMenu = () => setIsOpen((o) => !o);

	// --- Better Auth sign-out: use fetchOptions.onSuccess for the redirect ---
	const handleSignOut = async () => {
		await signOut({
			fetchOptions: {
				onSuccess: () => router.push('/'),
			},
		});
	};
	// -------------------------------------------------------------------------

	const links = [
		{ href: '/', label: 'Home' },
		{ href: '/about', label: 'About' },
		{ href: '/causes', label: 'Causes' },
		{ href: '/events', label: 'Events' },
		{ href: '/join_us', label: 'Join Us' },
		{ href: '/contacts', label: 'Contact Us' },
	];

	// Better Auth session has the user nested under session?.user
	if (session?.user) {
		links.push({ href: '/registrations', label: 'Admin' });
	}

	return (
		<header
			className={`
        w-full fixed top-0 left-0 z-50
        transition-all duration-300
        px-2 md:px-8 lg:px-16
        ${scrolled ? `${scrolledBgColor} py-2 shadow-md` : `${bgColor} py-4`}
      `}
		>
			<div className="flex justify-between items-center w-full transition-all duration-300">
				<Link href="/" className="flex items-center">
					<Image
						src="/Logo.png"
						priority={false}
						alt="Logo"
						width={100}
						height={100}
						className={`h-auto transition-all duration-300 ${
							scrolled ? 'w-20' : 'w-28'
						}`}
					/>
				</Link>

				<nav
					className={`hidden text-sm font-semibold md:flex items-center gap-10 tracking-widest uppercase ${inter.className} ${navTextColor}`}
				>
					{links.map(({ href, label }) => (
						<Link key={href} href={href} className="hover:text-secondary">
							{label}
						</Link>
					))}
					{session?.user && (
						<button
							onClick={handleSignOut}
							className="ml-4 text-sm px-4 py-2 uppercase rounded border hover:bg-secondary hover:text-light transition"
						>
							Sign Out
						</button>
					)}
				</nav>

				<Link
					href="/join_us#donate"
					className="hidden md:flex items-center gap-1 text-lg text-secondary md:px-1 lg:px-4 py-1 rounded-sm border-2 border-secondary hover:bg-secondary hover:text-light transition-colors duration-300"
				>
					Donate <HeartHandshake size={20} />
				</Link>

				<button onClick={toggleMenu} className={`md:hidden ${navTextColor}`}>
					{isOpen ? <X size={28} /> : <Menu size={28} />}
				</button>
			</div>

			{isOpen && (
				<div
					className={`md:hidden mt-4 flex flex-col gap-4 ${scrolledBgColor} px-4 py-4 rounded ${scrolledTextColor}`}
				>
					{links.map(({ href, label }) => (
						<Link
							key={href}
							href={href}
							onClick={toggleMenu}
							className="hover:text-secondary"
						>
							{label}
						</Link>
					))}
					{session?.user && (
						<button
							onClick={() => {
								toggleMenu();
								handleSignOut();
							}}
							className="w-fit px-3 py-1 rounded-sm hover:bg-secondary hover:text-light text-lg transition"
						>
							Sign Out
						</button>
					)}
					<Link
						href="/join_us"
						onClick={toggleMenu}
						className="w-fit flex items-center gap-2 bg-secondary px-3 py-1 rounded-sm hover:bg-primary-dark hover:text-light text-lg transition"
					>
						Donate <HeartHandshake size={20} />
					</Link>
				</div>
			)}
		</header>
	);
}
