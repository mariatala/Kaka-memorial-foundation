import React from 'react';
import EventsCarousel from '@/components/home-page-components/RecentEventsCarausel';
import { Gowun_Dodum } from 'next/font/google';

const gowun = Gowun_Dodum({ weight: '400', subsets: ['latin'] });

const RecentProjects = () => {
	return (
		<div className="w-full inline-flex flex-col justify-start items-center gap-24  bg-accent-three-light py-8 md:pt-16 md:pb-32">
			<div className="w-full  flex flex-col justify-center items-center gap-2">
				<h3
					className={`text-3xl md:text-4xl text-center tracking-widest uppercase text-primary ${gowun.className}`}
				>
					Recent Advocacy / Projects
				</h3>
				<div className="w-16 h-1 bg-secondary rounded-full" />
				<h4 className="text-xl text-secondary font-semibold tracking-wide text-center mt-2">
					Take a stand — support ethical, people-first development
				</h4>
			</div>

			{/* Carousel inserted here */}
			<EventsCarousel />
		</div>
	);
};

export default RecentProjects;
