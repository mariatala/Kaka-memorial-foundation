'use client';

import React from 'react';
import { Inter } from 'next/font/google';
import { useCountUp } from '@/hooks/useCountUp';

const inter = Inter({
	weight: ['200', '300', '400', '500', '600', '700', '800'],
	subsets: ['latin'],
});

type StatCardProps = {
	amount: string;
	description: string;
};

/**
 * Parses strings like "$100", "₦147,740", "500+", "7" into their
 * constituent parts so the numeric portion can be animated independently.
 */
function parseAmount(raw: string): { prefix: string; numeric: number; suffix: string } {
	// Match: optional non-digit prefix, digits with optional commas, optional non-digit suffix
	const match = raw.match(/^([^\d]*)(\d[\d,]*)([^\d]*)$/);
	if (!match) return { prefix: '', numeric: 0, suffix: raw };

	const prefix = match[1];
	const numeric = parseInt(match[2].replace(/,/g, ''), 10);
	const suffix = match[3];
	return { prefix, numeric, suffix };
}

function formatNumber(n: number, originalHadCommas: boolean): string {
	if (originalHadCommas || n >= 10000) {
		return n.toLocaleString();
	}
	return String(n);
}

const StatsCard: React.FC<StatCardProps> = ({ amount, description }) => {
	const { prefix, numeric, suffix } = parseAmount(amount);
	const originalHadCommas = amount.includes(',');

	const { value, ref } = useCountUp<HTMLDivElement>({
		end: numeric,
		duration: 1800,
	});

	return (
		<div
			ref={ref}
			className="w-full py-5 sm:py-6 lg:py-10 px-3 bg-accent-three-light flex flex-col justify-center items-center gap-1"
		>
			<div
				className={`w-full text-center text-secondary text-2xl sm:text-3xl lg:text-4xl font-bold tabular-nums ${inter.className}`}
				aria-label={amount}
			>
				{prefix}{formatNumber(value, originalHadCommas)}{suffix}
			</div>
			<div
				className={`w-full text-center text-primary text-xs sm:text-sm lg:text-base font-normal tracking-wide leading-snug ${inter.className}`}
			>
				{description}
			</div>
		</div>
	);
};

export default StatsCard;
