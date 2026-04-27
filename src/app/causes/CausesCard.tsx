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

const EducationSection: React.FC<EducationSectionProps> = ({
	imageSrc,
	imageAlt = 'Illustration',
	heading,
	subheading,
	description,
	cards,
}) => {
	return (
		<div className="w-full  mx-auto px-6 md:px-16 py-16 bg-accent-three-light rounded-sm  mt-8 flex flex-col gap-16">
			{/* Top Section */}
			<div className="flex flex-col md:flex-row gap-8 items-start">
				<Image
					className="w-full max-w-xs object-cover rounded-lg"
					src={imageSrc}
					alt={imageAlt}
					width={260}
					height={295}
				/>
				<div className="flex-1 flex flex-col gap-6 text-center md:text-left">
					<div className="space-y-2">
						<h2
							className={`text-2xl md:text-3xl uppercase text-primary ${gowun.className}`}
						>
							{heading}
						</h2>
						<h3
							className={`text-xl text-secondary font-bold tracking-wide ${inter.className}`}
						>
							{subheading}
						</h3>
						<div className="w-20 h-1 bg-primary mt-2 mx-auto lg:mx-0" />
					</div>
					<p
						className={`text-primary text-base md:text-lg leading-8  ${gowun.className}`}
					>
						{description}
					</p>
				</div>
			</div>

			{/* CTA Cards */}
			<div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
				{cards.map((card, index) => (
					<div
						key={index}
						className="bg-white border border-gray-200 rounded-xl shadow-xs hover:shadow-md hover:shadow-primary transition-shadow duration-300 overflow-hidden flex flex-col"
					>
						{/* Card Content */}
						<div className="p-6 flex flex-col gap-4">
							<div className="flex items-center gap-3">
								<card.icon className="w-6 h-6 text-secondary" />
								<h4 className="text-primary text-lg md:text-xl font-semibold tracking-wide">
									{card.title}
								</h4>
							</div>
							<p className="text-primary text-sm leading-relaxed">
								{card.description}
							</p>
							<Link
								className="self-start text-sm font-medium text-secondary hover:underline transition
								duration-500 ease-in-out scroll-mt-24 "
								href="/join_us#donate"
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

export default EducationSection;
