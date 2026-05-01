'use client';

import { useRouter } from 'next/navigation';
import { useSession } from '@/lib/auth-client';
import { useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Inter, Gowun_Dodum } from 'next/font/google';
import {
	Users,
	Mail,
	LayoutDashboard,
	HeartHandshake,
	CalendarDays,
	MessageSquare,
} from 'lucide-react';

const inter = Inter({
	weight: ['300', '400', '500', '600', '700'],
	subsets: ['latin'],
});
const gowun = Gowun_Dodum({ weight: '400', subsets: ['latin'] });

const quickLinks = [
	{
		href: '/admin/registrations',
		icon: Users,
		label: 'Registrations',
		description: 'View volunteer & partner submissions',
		accent: 'bg-secondary/10 text-secondary border-secondary/20',
	},
	{
		href: '/admin/events',
		icon: CalendarDays,
		label: 'Events',
		description: 'Manage event categories, dates & locations',
		accent: 'bg-primary/10 text-primary border-primary/20',
	},
	{
		href: '/admin/donations',
		icon: HeartHandshake,
		label: 'Donations',
		description: 'View all recorded PayPal transactions',
		accent: 'bg-accent-two/10 text-accent-two border-accent-two/20',
	},
	{
		href: '/admin/messages',
		icon: MessageSquare,
		label: 'Messages',
		description: 'View contact form submissions',
		accent: 'bg-accent-one/10 text-accent-one border-accent-one/20',
	},
];

export default function AdminPage() {
	const router = useRouter();
	const { data: session, isPending } = useSession();

	useEffect(() => {
		if (!isPending && !session?.user) {
			router.push('/sign-in');
		}
		if (!isPending && session?.user && session.user.role !== 'admin') {
			router.push('/');
		}
	}, [isPending, session, router]);

	if (isPending) {
		return (
			<div className="min-h-screen bg-light flex items-center justify-center">
				<div className="flex flex-col items-center gap-4">
					<svg className="animate-spin h-8 w-8 text-secondary" viewBox="0 0 24 24" fill="none">
						<circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
						<path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
					</svg>
					<p className={`text-primary/60 text-sm ${inter.className}`}>Loading…</p>
				</div>
			</div>
		);
	}

	if (!session?.user || session.user.role !== 'admin') {
		return (
			<div className="min-h-screen bg-light flex items-center justify-center">
				<p className={`text-primary/60 text-sm ${inter.className}`}>Redirecting…</p>
			</div>
		);
	}

	const { user } = session;
	const initials = (user.name || user.email)
		.split(' ')
		.map((w: string) => w[0])
		.slice(0, 2)
		.join('')
		.toUpperCase();

	return (
		<div className={`min-h-screen bg-light ${inter.className}`}>

			{/* ── Hero banner ── */}
			<div className="w-full bg-primary pt-32 pb-16 px-6 md:px-16">
				<div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-start sm:items-center gap-6">
					{/* Avatar */}
					<div className="w-16 h-16 rounded-full bg-secondary flex items-center justify-center shrink-0 shadow-lg">
						<span className={`text-white text-xl font-bold ${inter.className}`}>{initials}</span>
					</div>

					<div className="flex-1">
						<div className="flex items-center gap-2 mb-1">
							<LayoutDashboard size={16} className="text-secondary" />
							<span className="text-secondary text-xs font-semibold uppercase tracking-widest">
								Admin Panel
							</span>
						</div>
						<h1 className={`text-2xl md:text-3xl text-light font-bold tracking-wide ${gowun.className}`}>
							Welcome back, {user.name?.split(' ')[0] || 'Admin'}
						</h1>
						<p className={`text-accent-three text-sm mt-1 flex items-center gap-1.5 ${inter.className}`}>
							<Mail size={13} />
							{user.email}
						</p>
					</div>

				</div>
			</div>

			{/* ── Content ── */}
			<div className="max-w-5xl mx-auto px-6 md:px-16 py-12 space-y-12">

				{/* Quick links */}
				<div>
					<div className="mb-6 space-y-1">
						<h2 className={`text-xl font-semibold text-primary ${gowun.className}`}>
							Quick Actions
						</h2>
						<div className="w-10 h-0.5 bg-secondary rounded-full" />
					</div>
					<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
						{quickLinks.map(({ href, icon: Icon, label, description, accent }) => (
							<Link
								key={href}
								href={href}
								className="group bg-white rounded-lg border border-primary/10 px-6 py-5 flex flex-col gap-3 hover:shadow-md hover:-translate-y-0.5 transition-all duration-200"
							>
								<div className={`w-10 h-10 rounded-lg border flex items-center justify-center ${accent}`}>
									<Icon size={20} />
								</div>
								<div>
									<p className="font-semibold text-primary group-hover:text-secondary transition-colors">
										{label}
									</p>
									<p className="text-xs text-primary/50 mt-0.5 leading-relaxed">
										{description}
									</p>
								</div>
							</Link>
						))}
					</div>
				</div>

				{/* Account details */}
				<div>
					<div className="mb-6 space-y-1">
						<h2 className={`text-xl font-semibold text-primary ${gowun.className}`}>
							Account Details
						</h2>
						<div className="w-10 h-0.5 bg-secondary rounded-full" />
					</div>
					<div className="bg-white rounded-lg border border-primary/10 divide-y divide-primary/8">
						<div className="flex items-center justify-between px-6 py-4">
							<span className="text-sm text-primary/50 font-medium">Name</span>
							<span className="text-sm text-primary font-semibold">{user.name || '—'}</span>
						</div>
						<div className="flex items-center justify-between px-6 py-4">
							<span className="text-sm text-primary/50 font-medium">Email</span>
							<span className="text-sm text-primary font-semibold">{user.email}</span>
						</div>
						<div className="flex items-center justify-between px-6 py-4">
							<span className="text-sm text-primary/50 font-medium">Role</span>
							<span className="text-xs font-semibold uppercase tracking-wider text-secondary bg-secondary/10 px-2.5 py-1 rounded-full">
								{user.role || 'Admin'}
							</span>
						</div>
					</div>
				</div>

				{/* Foundation branding footer */}
				<div className="flex items-center gap-4 pt-4 border-t border-primary/10">
					<Image
						src="/Logo.png"
						alt="Kaka Memorial Foundation"
						width={40}
						height={40}
						className="w-10 h-auto opacity-60"
					/>
					<div>
						<p className="text-xs font-semibold text-primary/40 tracking-wide">
							Kaka Memorial Foundation
						</p>
						<p className="text-xs text-primary/30">
							Impacting Humanity With Kindness
						</p>
					</div>
				</div>
			</div>
		</div>
	);
}
