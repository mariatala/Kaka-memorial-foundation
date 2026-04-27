'use client';

import React from 'react';
import Image from 'next/image';
import TeamMemberCard from '@/app/about/TeamMemberCard';
import { Gowun_Dodum } from 'next/font/google';

const gowun = Gowun_Dodum({ weight: '400', subsets: ['latin'] });

interface TeamSectionProps {
	gowunFontClass: string;
	niconneFontClass: string;
	titleFontClass?: string;
}

const TeamSection: React.FC<TeamSectionProps> = ({
	gowunFontClass,
	niconneFontClass,
}) => {
	return (
		<section className="our-team w-full bg-gradient-to-b from-accent-three-light to-white  py-12 md:py-24">
			<div className="w-[90%] max-w-7xl mx-auto flex flex-col justify-center items-center gap-20 overflow-hidden">
				{/* Heading */}
				<div className="flex items-center flex-col md:items-center-safe w-full gap-2">
					<h3
						className={`text-3xl md:text-5xl  text-center tracking-widest uppercase text-primary ${gowun.className}`}
					>
						Our Team
					</h3>
					<div className="w-16 h-1 bg-secondary rounded-full" />
					<h4 className="text-xl text-secondary font-semibold tracking-wide mt-2 text-center">
						Meet the People Behind Kaka Foundation
					</h4>
				</div>

				{/* Founder Block */}
				<div className="w-full bg-white shadow-xl border-t-[6px] border-b-[6px] border-primary rounded-xl p-6 md:p-12 flex flex-col md:flex-row items-center gap-10 transition duration-300">
					<Image
						className="rounded-xl w-full md:w-1/3 h-auto object-cover shadow-md"
						width={400}
						height={480}
						src="/team/Zainab.jpg"
						alt="Team member - Founder"
					/>
					<div className="w-full md:w-2/3 flex flex-col gap-4 text-indigo-900">
						<p className={`${gowunFontClass} leading-8 tracking-wide`}>
							"The Kaka Memorial Foundation was born from a deep desire to honor
							my mother’s legacy of compassion and her belief in equal
							opportunity for all. Inspired by her values and my own experience
							working with communities, I saw the urgent need to build
							structures that create real, lasting impact — especially for those
							in rural areas. Our goal is to uplift lives by promoting dignity,
							access, and sustainable growth through kindness."
						</p>
						<h5 className={`${niconneFontClass} text-3xl text-primary`}>
							Mrs. Zainab Inuwa Gani Esq.
						</h5>
						<p className="text-lime-500 text-sm md:text-base font-semibold uppercase tracking-wider">
							Founder & Director
						</p>
					</div>
				</div>

				{/* Other Team Members */}
				<div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
					<TeamMemberCard
						imageSrc="/team/Inuwa_Suleiman_Gani.jpeg"
						altText="Team member - Secretary"
						description="Supports board and governance functions. Prepares meeting agendas and minutes, ensures legal compliance, manages records, and facilitates communication between leadership and stakeholders."
						name="Inuwa Suleiman Gani"
						role="Secretary"
						gowunFontClass={gowunFontClass}
						niconneFontClass={niconneFontClass}
					/>
					<TeamMemberCard
						imageSrc="/team/Musa_Yahawa_Soje.jpeg"
						altText="Team member - Project Coordinator "
						description="Oversees the planning and execution of community-driven initiatives, working closely with local and other stakeholders to implement sustainable projects in education, access to clean water, and partnerships. Continues to drive the foundation’s mission of promoting social justice and inclusive growth in rural communities."
						name="Musa Yahawa Soje"
						role="Project Coordinator "
						gowunFontClass={gowunFontClass}
						niconneFontClass={niconneFontClass}
					/>
					<TeamMemberCard
						imageSrc="/team/Umar_Fatima_Gani.jpeg"
						altText="Team member - Desk Officer"
						description="Acts as the first point of contact for the foundation. Manages daily operations, responds to inquiries, supports program logistics, and coordinates internal communications and reports"
						name="Umar Fatima Gani"
						role="Desk Officer"
						gowunFontClass={gowunFontClass}
						niconneFontClass={niconneFontClass}
					/>
					<TeamMemberCard
						imageSrc="/team/Mukhtar_Adams.jpeg"
						altText="Team member - Creative Media Officer"
						description="Designs compelling visual and multimedia content to communicate the foundation’s mission and impact. Supports campaigns with graphics, videos, and storytelling aligned with our work in marginalized communities"
						name="Mukhtar Adams"
						role="Creative Media Officer"
						gowunFontClass={gowunFontClass}
						niconneFontClass={niconneFontClass}
					/>
					<TeamMemberCard
						imageSrc="/team/Maimuna_Abubakar.jpeg"
						altText="Team member - Outreach Lead"
						description="Drives the foundation’s digital presence and leverages technology to amplify rural development initiatives. Builds and nurtures relationships with grassroots communities and key stakeholders to ensure inclusive engagement and visibility"
						name="Maimunah Abubakar Ibrahim"
						role="Digital Innovation and Outreach Lead"
						gowunFontClass={gowunFontClass}
						niconneFontClass={niconneFontClass}
					/>
					<TeamMemberCard
						imageSrc="/team/Mubarakatu_Yakubu.jpeg"
						altText="Team member - Finance Officer"
						description="Manages financial records, tracks incoming and outgoing funds, and ensures transparent reporting. Supports fundraising efforts and mobilization of resources to sustain community-driven projects"
						name="Mubarakatu Yakubu"
						role="Finance and Resource Mobilization Officer"
						gowunFontClass={gowunFontClass}
						niconneFontClass={niconneFontClass}
					/>
					<TeamMemberCard
						imageSrc="/team/Abdulbaki_Ibrahim_Gani.jpeg"
						altText="Team member - Finance Officer"
						description="I  support the day-to-day field activities of the Kaka Memorial Foundation by ensuring smooth delivery of materials, coordination of transport, and on-site assistance during outreach programs. This role requires flexibility, reliability, and a strong commitment to community service"
						name="Abdulbaki Ibrahim Gani"
						role="Ground Operations and Logistics Assistant"
						gowunFontClass={gowunFontClass}
						niconneFontClass={niconneFontClass}
					/>
				</div>
			</div>
		</section>
	);
};

export default TeamSection;
