'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {LucideIcon } from 'lucide-react';
import { Gowun_Dodum, Inter } from 'next/font/google';

const gowun = Gowun_Dodum({ weight: '400', subsets: ['latin'] });
const inter = Inter({
	weight: ['200', '300', '400', '500', '600', '700', '800'],
	subsets: ['latin'],
});

interface Card {
	title: string;
	description: string;
	icon: LucideIcon;
}

interface EducationSectionProps {
	imageSrc: string;
	imageAlt?: string;
	heading: string;
	subheading: string;
	description: string;
	cards: Card[];
}

export default function EducationSection ({
	imageSrc,
	imageAlt = 'Illustration',
	heading,
	subheading,
	description,
	cards,
}:EducationSectionProps) {
	return (
		<div className="w-full mx-auto px-4 md:px-10 lg:px-16 py-10 md:py-14 lg:py-16 bg-accent-three-light rounded-sm mt-8 flex flex-col gap-10 md:gap-14 lg:gap-16">
			{/* Top Section */}
			<div className="flex flex-col sm:flex-row gap-6 md:gap-8 items-start">
				<Image
					className="w-full sm:w-48 md:w-56 lg:w-64 object-cover rounded-lg shrink-0"
					src={imageSrc}
					alt={imageAlt}
					width={260}
					height={295}
				/>
				<div className="flex-1 flex flex-col gap-4 md:gap-6 text-center sm:text-left">
					<div className="space-y-2">
						<h2
							className={`text-2xl md:text-3xl uppercase text-primary ${gowun.className}`}
						>
							{heading}
						</h2>
						<h3
							className={`text-lg md:text-xl text-secondary font-bold tracking-wide ${inter.className}`}
						>
							{subheading}
						</h3>
						<div className="w-20 h-1 bg-primary mt-2 mx-auto sm:mx-0" />
					</div>
					<p
						className={`text-primary text-base leading-7 md:leading-8 ${gowun.className}`}
					>
						{description}
					</p>
				</div>
			</div>

			{/* CTA Cards */}
			<div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
				{cards.map((card, index) => (
					<div
						key={index}
						className="bg-white border border-primary/10 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden flex flex-col"
					>
						{/* Card Content */}
						<div className="p-6 flex flex-col gap-4">
							<div className="flex flex-row items-start sm:items-center gap-3">
								<card.icon className="w-5 h-5 md:w-6 md:h-6 text-secondary shrink-0" />
								<h4 className="text-primary text-base md:text-lg font-semibold text-balance tracking-wide">
									{card.title}
								</h4>
							</div>
							<p className="text-primary text-sm leading-relaxed">
								{card.description}
							</p>
							<Link
								className="self-start text-sm font-medium text-secondary hover:underline transition
								duration-500 ease-in-out scroll-mt-24 "
								href="/join-us#donate"
							>
								Donate Now →
							</Link>
						</div>
					</div>
				))}
			</div>
		</div>
	);
};
