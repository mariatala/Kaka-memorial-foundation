'use client';

import Image from 'next/image';
import { Inter } from 'next/font/google';
const inter = Inter({
	weight: ['200', '300', '400', '500', '600', '700', '800'],
	subsets: ['latin'],
});

type XSpaceCardProps = {
	imageSrc: string;
	imageAlt?: string;
	title: string;
	description: string;
};

const EventCard = ({
	imageSrc,
	imageAlt = 'Event image',
	title,
	description,
}: XSpaceCardProps) => {
	return (
		<div className="relative w-full max-w-sm md:max-w-md group h-[22rem] p-4 sm:p-6 md:p-8 flex flex-col justify-start items-start gap-6 overflow-hidden">
			{/* Background Image */}
			<Image
				className="absolute top-0 left-0 w-full h-full object-cover"
				src={imageSrc}
				alt={imageAlt}
				fill
				sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
			/>

			{/* Sliding Overlay Content */}
			<div className="absolute top-0 bottom-0 right-0 p-4 sm:p-5 bg-accent-three-light/90 w-[90%] flex flex-col justify-start items-start gap-4 border-t-4 border-b-4 border-primary transform transition-transform duration-500 ease-in-out group-hover:translate-x-full group-active:translate-x-full group-focus-within:translate-x-full">
				<div
					className={`text-primary text-base sm:text-lg  font-semibold tracking-wide ${inter.className}`}
				>
					{title}
				</div>
				<div
					className={`text-primary text-sm  leading-7 tracking-wide ${inter.className}`}
				>
					{description}
				</div>
			</div>
		</div>
	);
};

export default EventCard;
