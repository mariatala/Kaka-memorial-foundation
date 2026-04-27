import React from 'react';
import { Inter } from 'next/font/google';
const inter = Inter({
	weight: ['200', '300', '400', '500', '600', '700', '800'],
	subsets: ['latin'],
});

type StatCardProps = {
	amount: string;
	description: string;
};

const StatsCard: React.FC<StatCardProps> = ({ amount, description }) => {
	return (
		<div className="flex-1 py-4 md:py-8 md:gap-2 px-2 w-full md:w-fit bg-accent-three-light inline-flex flex-col justify-center items-center">
			<div
				className={`self-stretch text-center text-secondary text-3xl font-bold ${inter.className}`}
			>
				{amount}
			</div>
			<div
				className={`self-stretch text-center justify-start text-primary font-normal tracking-wide  ${inter.className}`}
			>
				{description}
			</div>
		</div>
	);
};

export default StatsCard;
