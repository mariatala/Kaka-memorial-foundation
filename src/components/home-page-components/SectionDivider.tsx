import React from 'react';
import Link from 'next/link';
import { Inter } from 'next/font/google';
const inter = Inter({
	weight: ['200', '300', '400', '500', '600', '700', '800'],
	subsets: ['latin'],
});

const SectionDivider = () => {
	return (
		<div className="w-full flex flex-col md:flex-row items-stretch justify-between">
			{/* Mission */}
			<Link
				href="/join_us#mission-vision"
				className="group w-full md:flex-1 h-full px-10 md:px-16  py-8 bg-secondary transition-all duration-300  hover:shadow-xl hover:scale-[1.07] text-white text-center flex flex-col items-center justify-center"
			>
				<h3
					className={`text-xl md:text-2xl font-medium ${inter.className} tracking-wide group-hover:underline underline-offset-4`}
				>
					Our Mission
				</h3>
				<p
					className={`mt-2 text-sm md:text-base  font-light ${inter.className} tracking-wider`}
				>
					Our Goal, Vision and Commitment
				</p>
			</Link>

			{/* Events */}
			<Link
				href="/events"
				className="group w-full md:flex-1 h-full px-10 md:px-16 py-8 bg-primary transition-all duration-300 hover:shadow-xl hover:scale-[1.07] text-white text-center flex flex-col items-center justify-center"
			>
				<h3
					className={`text-xl md:text-2xl font-medium ${inter.className} tracking-wide group-hover:underline underline-offset-4`}
				>
					Our Events
				</h3>
				<p
					className={`mt-2 text-sm md:text-base  font-light ${inter.className} tracking-wider`}
				>
					Register and Help Make Change
				</p>
			</Link>

			{/* Get Involved */}
			<Link
				href="/join_us"
				className="group w-full md:flex-1 h-full px-10 md:px-16  py-8 bg-accent-two  transition-all duration-300 hover:shadow-xl hover:scale-[1.07] text-white text-center flex flex-col items-center justify-center"
			>
				<h3
					className={`text-xl md:text-2xl font-medium ${inter.className} tracking-wide group-hover:underline underline-offset-4`}
				>
					Get Involved
				</h3>
				<p
					className={`mt-2 text-sm md:text-base  font-light ${inter.className} tracking-wider`}
				>
					Volunteer, Participate and Donate
				</p>
			</Link>
		</div>
	);
};
export default SectionDivider;
