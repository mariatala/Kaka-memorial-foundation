'use client';

import React from 'react';
import { HandHeart } from 'lucide-react';
import Link from 'next/link';
import clsx from 'clsx';
import { Gowun_Dodum, Inter } from 'next/font/google';

const gowun = Gowun_Dodum({ weight: '400', subsets: ['latin'] });
const inter = Inter({ weight: '400', subsets: ['latin'] });

type JoinUsProps = {
	title: string;
	description: string;
	bgColor?: string;
	animateIcon?: boolean;
};

const JoinUsSection: React.FC<JoinUsProps> = ({
	title,
	description,
	bgColor = 'bg-light',
	animateIcon = true,
}) => {
	return (
		<section className={`w-full ${bgColor} py-12 sm:py-20 px-6 md:px-20`}>
			<div className="w-full sm:w-5/6 mx-auto flex flex-col lg:flex-row items-center gap-12">
				{/* Text & CTAs */}
				<div className=" flex flex-col justify-center items-center gap-6 text-center lg:text-left">
					<h2
						className={`text-3xl md:text-4xl font-bold text-primary tracking-wider uppercase ${gowun.className}`}
					>
						{title}
					</h2>
					<p
						className={`text-sm sm:text-base text-primary leading-relaxed text-center  ${inter.className}`}
					>
						{description}
					</p>
					{/* Icon & Badge */}
					<div className="relative w-fit">
						<div className="p-6 bg-secondary/10 rounded-full border-2 border-secondary shadow-md">
							<HandHeart
								className={clsx(
									'w-12 h-12 text-secondary',
									animateIcon && 'animate-bounce'
								)}
							/>
						</div>
					</div>
					<div className="flex flex-col sm:flex-row justify-center lg:justify-start gap-4 mt-4">
						<Link
							href="/join_us#volunteer"
							className="bg-secondary text-white text-base px-6 py-3 rounded-sm font-semibold shadow hover:scale-x-105 transition-all duration-300"
						>
							Become a Volunteer
						</Link>
						<Link
							href="/join_us#donate"
							className="bg-primary text-white text-base px-6 py-3 rounded-sm font-semibold shadow hover:scale-x-105  flex items-center gap-2 transition-all duration-300"
						>
							Donate Now
						</Link>
					</div>
				</div>
			</div>
		</section>
	);
};

export default JoinUsSection;
