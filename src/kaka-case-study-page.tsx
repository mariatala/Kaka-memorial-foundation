import Link from 'next/link';
import Image from 'next/image';
import type { Metadata } from 'next';

export const metadata: Metadata = {
	title: 'Kaka Memorial Foundation — Case Study',
	description:
		'How I helped a Nigerian nonprofit build their digital presence from scratch — requirements gathering, design, and Next.js development.',
};

const stats = [
	{ value: 'Zero', label: 'Prior online presence' },
	{ value: '1', label: 'Client — delivered from scratch' },
	{ value: 'Next.js', label: 'Core technology' },
	{ value: 'Live', label: 'Status on Vercel' },
];

const timeline = [
	{
		phase: '01 — Discovery',
		title: 'Understanding the foundation',
		body: 'Before writing a single line of code, I sat down with the Kaka Memorial Foundation team to understand who they were and what they needed. Through structured interviews I gathered everything: their mission, the people they wanted to reach, the story behind the foundation, and what a successful website would mean for them. This wasn\'t a brief you could receive by email — it required listening carefully to a community that wanted to honour someone\'s memory with dignity.',
		tags: ['Stakeholder Interviews', 'Requirements Gathering', 'Scope Definition'],
	},
	{
		phase: '02 — Research',
		title: 'Benchmarking the nonprofit landscape',
		body: 'With the requirements documented, I researched how comparable nonprofit foundations present themselves online. I looked at how credible organisations communicate their mission to donors, how they structure their calls to action, and what visual and structural decisions build trust with first-time visitors. This gave me an informed baseline — and a clear sense of where I could do better for Kaka specifically.',
		tags: ['Competitive Research', 'UX Benchmarking', 'Information Architecture'],
	},
	{
		phase: '03 — Design Decisions',
		title: 'Translating mission into visual language',
		body: 'Working from the brief and research, I made the key design decisions independently: the visual tone had to be warm but dignified, the information hierarchy had to lead with mission before anything else, and every page had to make a first-time donor feel confident about who they were supporting. I presented concepts to the client and iterated through several rounds of revisions — each round tightening the alignment between what they wanted and what the site communicated.',
		tags: ['UI Design', 'Visual Hierarchy', 'Client Revisions', 'Iterative Design'],
	},
	{
		phase: '04 — Development',
		title: 'Building in Next.js and deploying on Vercel',
		body: 'I built the site using Next.js and TypeScript — chosen for performance, SEO readiness, and ease of future content updates. Every page was built mobile-first, with responsive layouts tested across device sizes. I implemented proper metadata, Open Graph tags for social sharing, and semantic HTML throughout — so when a donor shares the foundation\'s link, the preview looks professional and trustworthy. The site was deployed on Vercel and the foundation received a handover with guidance on what they now owned.',
		tags: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Vercel', 'SEO', 'Responsive Design'],
	},
];

export default function KakaCaseStudy() {
	return (
		<main className="min-h-screen bg-[var(--bg)] text-[var(--fg)]">

			{/* Back nav */}
			<div className="mx-4 md:mx-16 pt-8">
				<Link
					href="/#projects"
					className="inline-flex items-center gap-2 text-sm text-[var(--muted-fg)] hover:text-teal-500 transition-colors"
				>
					← Back to projects
				</Link>
			</div>

			{/* Hero */}
			<section className="mx-4 md:mx-16 mt-12 pb-16 border-b border-[var(--border)]">
				<div className="flex items-center gap-3 mb-6">
					<div className="w-5 h-0.5 bg-teal-500"></div>
					<span className="text-xs font-medium text-teal-500 uppercase tracking-widest">
						Case Study · Nonprofit · Web Development
					</span>
				</div>

				<h1 className="text-5xl md:text-7xl font-light text-[var(--primary)] font-[family-name:var(--font-quicksand)] leading-tight mb-6">
					Kaka Memorial<br />Foundation
				</h1>

				<p className="max-w-2xl text-sm text-[var(--muted-fg)] leading-loose mb-10">
					A Nigerian nonprofit needed to go from zero digital presence to a
					credible, donor-ready website — built from scratch, delivered end to
					end. This is the story of how I approached it.
				</p>

				{/* Stats */}
				<div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
					{stats.map((s) => (
						<div key={s.label} className="border border-[var(--border)] rounded-xl p-5 bg-[var(--card)]">
							<div className="text-2xl font-light text-teal-500 font-[family-name:var(--font-quicksand)] mb-1">
								{s.value}
							</div>
							<div className="text-xs text-[var(--muted-fg)] uppercase tracking-wide">
								{s.label}
							</div>
						</div>
					))}
				</div>

				{/* Hero image */}
				<div className="relative w-full aspect-[16/7] rounded-2xl overflow-hidden border border-[var(--border)]">
					<Image
						src="/kaka_foundation.png"
						alt="Kaka Memorial Foundation website"
						fill
						className="object-cover"
						priority
					/>
				</div>
			</section>

			{/* The challenge */}
			<section className="mx-4 md:mx-16 py-16 border-b border-[var(--border)]">
				<div className="grid grid-cols-1 md:grid-cols-3 gap-12">
					<div>
						<p className="text-xs font-medium text-teal-500 uppercase tracking-widest mb-3">
							The Challenge
						</p>
						<h2 className="text-3xl font-light font-[family-name:var(--font-quicksand)] text-[var(--fg)]">
							Starting from nothing
						</h2>
					</div>
					<div className="md:col-span-2 space-y-4 text-sm text-[var(--muted-fg)] leading-loose">
						<p>
							The Kaka Memorial Foundation came to me through a personal
							connection with a clear but significant need: they had no online
							presence whatsoever. No website, no way for potential donors and
							supporters to find them, and no digital representation of the
							mission they cared deeply about.
						</p>
						<p>
							For a nonprofit, invisibility online is more than an inconvenience
							— it's a credibility problem. Donors research before they give.
							Partners verify before they collaborate. Without a web presence,
							the foundation was invisible to the very people it needed to reach.
						</p>
						<p>
							The brief was open-ended by necessity: they knew what they stood
							for, but they didn't know what a website should look like, feel
							like, or contain. That made my first job not design or development
							— it was listening.
						</p>
					</div>
				</div>
			</section>

			{/* Process timeline */}
			<section className="mx-4 md:mx-16 py-16 border-b border-[var(--border)]">
				<p className="text-xs font-medium text-teal-500 uppercase tracking-widest mb-3">
					The Process
				</p>
				<h2 className="text-3xl font-light font-[family-name:var(--font-quicksand)] text-[var(--fg)] mb-12">
					How I approached it
				</h2>

				<div className="space-y-0">
					{timeline.map((item, i) => (
						<div
							key={item.phase}
							className="grid grid-cols-1 md:grid-cols-3 gap-6 py-10 border-t border-[var(--border)] first:border-t-0"
						>
							<div>
								<p className="text-xs text-[var(--muted-fg)] uppercase tracking-widest mb-2">
									{item.phase}
								</p>
								<h3 className="text-lg font-medium text-[var(--fg)] leading-snug">
									{item.title}
								</h3>
								<div className="mt-4 flex flex-wrap gap-2">
									{item.tags.map((tag) => (
										<span
											key={tag}
											className="text-xs border border-teal-500/30 text-teal-600 dark:text-teal-400 px-2.5 py-1 rounded-full"
										>
											{tag}
										</span>
									))}
								</div>
							</div>
							<div className="md:col-span-2 text-sm text-[var(--muted-fg)] leading-loose">
								{item.body}
							</div>
						</div>
					))}
				</div>
			</section>

			{/* Outcome */}
			<section className="mx-4 md:mx-16 py-16 border-b border-[var(--border)]">
				<div className="grid grid-cols-1 md:grid-cols-3 gap-12">
					<div>
						<p className="text-xs font-medium text-teal-500 uppercase tracking-widest mb-3">
							The Outcome
						</p>
						<h2 className="text-3xl font-light font-[family-name:var(--font-quicksand)] text-[var(--fg)]">
							From invisible to credible
						</h2>
					</div>
					<div className="md:col-span-2 space-y-4 text-sm text-[var(--muted-fg)] leading-loose">
						<p>
							The Kaka Memorial Foundation launched with a live, fully
							responsive website that represents their mission clearly and
							professionally. They now have a digital home that donors and
							partners can find, trust, and return to.
						</p>
						<p>
							The client expressed genuine satisfaction with the final result —
							noting specific elements of the design and experience that
							resonated with them. More importantly, the site gives the
							foundation the credibility infrastructure they need to grow: a
							real web address, a professional first impression, and a platform
							they can build on.
						</p>
						<p>
							For me, this project was proof that the most important skill in
							a client engagement isn't the technology — it's the ability to
							translate what someone cares about into something the world can
							see and trust. That's the Business Analyst's job as much as it
							is the developer's.
						</p>
					</div>
				</div>
			</section>

			{/* Reflection */}
			<section className="mx-4 md:mx-16 py-16 border-b border-[var(--border)]">
				<div className="grid grid-cols-1 md:grid-cols-3 gap-12">
					<div>
						<p className="text-xs font-medium text-teal-500 uppercase tracking-widest mb-3">
							Reflection
						</p>
						<h2 className="text-3xl font-light font-[family-name:var(--font-quicksand)] text-[var(--fg)]">
							What I'd do differently
						</h2>
					</div>
					<div className="md:col-span-2 space-y-4 text-sm text-[var(--muted-fg)] leading-loose">
						<p>
							With more time, I would have formalised the requirements process
							earlier — documenting a structured brief before moving into design,
							rather than letting discovery and design overlap. For a client
							without a prior digital presence, that ambiguity is natural; but
							a written scope document would have reduced revision cycles and
							given the client a clearer sense of what was being built and why.
						</p>
						<p>
							I'd also build in a content strategy phase — helping the
							foundation develop the language for their mission, team pages, and
							donor calls to action before design begins. Content shapes
							structure, and structure shapes everything else. Getting that
							order right is something I now prioritise from day one.
						</p>
					</div>
				</div>
			</section>

			{/* Footer CTA */}
			<section className="mx-4 md:mx-16 py-16">
				<div className="flex flex-col md:flex-row md:items-center justify-between gap-8">
					<div>
						<h2 className="text-3xl font-light font-[family-name:var(--font-quicksand)] text-[var(--fg)] mb-2">
							Have a project in mind?
						</h2>
						<p className="text-sm text-[var(--muted-fg)]">
							I'd love to hear about it.
						</p>
					</div>
					<div className="flex gap-4 flex-wrap">
						<a
							href="https://kaka-memorial-foundation.vercel.app"
							target="_blank"
							rel="noopener noreferrer"
							className="border border-teal-500 text-[var(--fg)] hover:bg-teal-500 hover:text-white transition-colors duration-300 py-2 px-6 rounded-sm text-sm tracking-wide"
						>
							View Live Site →
						</a>
						<Link
							href="/#contact"
							className="border border-[var(--muted-fg)] text-[var(--muted-fg)] hover:border-teal-500 hover:text-teal-500 transition-colors duration-300 py-2 px-6 rounded-sm text-sm tracking-wide"
						>
							Let's Talk
						</Link>
					</div>
				</div>
			</section>

		</main>
	);
}
