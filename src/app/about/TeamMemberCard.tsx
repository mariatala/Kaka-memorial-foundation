'use client';

import Image from 'next/image';

interface TeamMemberCardProps {
	imageSrc: string;
	altText: string;
	description: string;
	name: string;
	role: string;
	gowunFontClass?: string;
	niconneFontClass?: string;
}


export default function TeamMemberCard({
	imageSrc,
	altText,
	description,
	name,
	role,
	gowunFontClass = '',
	niconneFontClass = '',
}: TeamMemberCardProps) {
	return (
		<div className="w-full md:w-4/6 lg:w-full mx-auto py-8 px-4 xl:px-12 gap-8 bg-slate-100 border-t-4 border-b-4 border-secondary inline-flex justify-between items-start flex-col md:flex-row rounded-b-md">
			<Image
				className="w-full md:w-2/5 rounded-lg object-cover"
				width={400}
				height={480}
				src={imageSrc}
				alt={altText}
			/>
			<div className="w-full md:w-3/5 inline-flex flex-col">
				<p
					className={`${gowunFontClass} self-stretch text-primary tracking-wider leading-8 mb-4`}
				>
					{description}
				</p>

				<h5 className={`${niconneFontClass} text-3xl text-primary`}>{name}</h5>
				<p className="font-semibold text-secondary text-sm uppercase tracking-wider mt-1">
					{role}
				</p>
			</div>
		</div>
	);
}
