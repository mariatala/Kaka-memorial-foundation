'use client';

import React from 'react';
import { Eye, Target } from 'lucide-react';

interface MissionVisionSectionProps {
	titleFontClass?: string;
	bodyFontClass?: string;
}

const MissionVisionSection: React.FC<MissionVisionSectionProps> = ({
	titleFontClass = '',
	bodyFontClass = '',
}) => {
	return (
		<section id='Mission-Vision' className="w-full bg-light py-20 px-6 md:px-16">
			<div className="w-full max-w-7xl mx-auto flex flex-col gap-16">
				{/* Section Title */}
				<div className="text-center flex flex-col items-center gap-2">
					<h2
						className={`text-3xl md:text-5xl text-primary font-bold uppercase tracking-widest ${titleFontClass}`}
					>
						Our Mission & Vision
					</h2>
					<div className="w-16 h-1 bg-secondary rounded-full" />
					<p className="text-secondary text-xl tracking-wide font-semibold mt-2">
						Driving impact through purpose and clarity
					</p>
				</div>

				{/* Cards */}
				<div className="grid grid-cols-1 md:grid-cols-2 gap-16">
					{/* Mission */}
					<div className="bg-white shadow-lg rounded-xl  px-4 md:px-10 py-10 border-l-8 border-secondary hover:scale-[1.01] transition-all duration-300">
						<div className="flex items-center gap-4 mb-6">
							<Target className="text-secondary w-8 h-8" />
							<h3
								className={`text-2xl font-semibold text-primary ${titleFontClass}`}
							>
								Our Mission
							</h3>
						</div>
						<p
							className={`text-slate-700 leading-8 tracking-wide ${bodyFontClass}`}
						>
							To create sustainable development opportunities by empowering
							underprivileged communities focusing on education, access to
							basic needs, and promoting dignity, resilience, and innovation
							through strategic grassroots engagement.
						</p>
					</div>

					{/* Vision */}
					<div className="bg-white shadow-lg rounded-xl px-4 md:px-10 py-10 border-l-8 border-brightTwo hover:scale-[1.01] transition-all duration-300">
						<div className="flex items-center gap-4 mb-6">
							<Eye className="text-brightTwo w-8 h-8" />
							<h3
								className={`text-2xl font-semibold text-primary ${titleFontClass}`}
							>
								Our Vision
							</h3>
						</div>
						<p
							className={`text-slate-700 leading-8 tracking-wide ${bodyFontClass}`}
						>
							To be a beacon of hope and transformation for marginalized
							populations, fostering a world where every individual has the
							opportunity to thrive regardless of their background, gender, or
							location.
						</p>
					</div>
				</div>
			</div>
		</section>
	);
};

export default MissionVisionSection;
