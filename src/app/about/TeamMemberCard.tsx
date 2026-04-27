'use client';
import React from 'react';
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

const TeamMemberCard: React.FC<TeamMemberCardProps> = ({
	imageSrc,
	altText,
	description,
	name,
	role,
	gowunFontClass = '',
	niconneFontClass = '',
}) => {
	return (
		<div className="w-full md:w-4/6 lg:w-full mx-auto py-8 px-4 xl:px-12 gap-8 bg-slate-50 border-t-4 border-b-4 border-secondary inline-flex justify-between items-start flex-col md:flex-row">
			<Image
				className="w-full md:w-2/5"
				width={400}
				height={480}
				src={imageSrc}
				alt={altText}
			/>
			<div className="w-full md:w-3/5 inline-flex flex-col">
				<p
					className={`${gowunFontClass} self-stretch text-indigo-900 tracking-wider leading-8 mb-4`}
				>
					{description}
				</p>

				<h5 className={`${niconneFontClass} text-3xl`}>{name}</h5>
				<p className="font-medium text-lime-500 text-base font-['Inter'] uppercase">
					{role}
				</p>
			</div>
		</div>
	);
};

export default TeamMemberCard;
