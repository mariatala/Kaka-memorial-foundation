import { Gowun_Dodum } from 'next/font/google';
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

const gowun = Gowun_Dodum({ weight: '400', subsets: ['latin'] });

type EventsCardProps = {
	event: {
		title: string;
		subtitle: string;
		description: string;
		date?: string | number | Date;
		location?: string;
	};
	imageUrl?: string;
	background?: string;
	joinLink?: string;
};

export default function EventsCard({
	event,
	imageUrl,
	background = 'bg-white',
	joinLink = '#',
}: EventsCardProps) {
	const displayDate = event.date
		? new Date(event.date).toLocaleDateString()
		: 'No planned event at the moment';
	const displayLocation = event.location || 'To be announced';

	return (
		<div
			className={`${background} w-full shadow-sm px-4 py-8 lg:p-16 mb-12 flex flex-col gap-8 lg:flex-row items-center rounded-lg`}
		>
			{/* Image */}
			<Image
				width={400}
				height={300}
				loading="lazy"
				src={imageUrl || 'https://via.placeholder.com/400x300'}
				alt={event.title}
				className="w-full md:w-1/2 lg:w-1/3 object-cover rounded-lg max-h-72"
			/>

			{/* Content */}
			<div className="w-full md:w-1/2 lg:w-2/3">
				<div className="w-full flex flex-col justify-center items-start gap-2">
					<h3
						className={`text-2xl md:text-3xl xl:text-4xl tracking-widest uppercase text-light ${gowun.className}`}
					>
						{event.title}
					</h3>
					<div className="w-16 h-1 bg-light/60 rounded-full" />
					<h4 className="text-lg text-light/90 font-semibold tracking-wide mt-1">
						{event.subtitle}
					</h4>
				</div>
				<p className="text-light/90 tracking-wide leading-8 my-6">
					{event.description}
				</p>
				<p className="text-light/70 text-sm mb-1">Date: {displayDate}</p>
				<p className="text-light/70 text-sm mb-4">Location: {displayLocation}</p>
				<Link
					href={joinLink}
					className="inline-block px-8 py-2 mt-2 border-2 border-light text-light rounded-sm font-medium hover:bg-light hover:text-primary transition-all duration-300 ease-in-out"
				>
					Join Us
				</Link>
			</div>
		</div>
	);
}
