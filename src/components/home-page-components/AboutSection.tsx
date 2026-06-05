'use client';
import Link from 'next/link';
import Image from 'next/image';
import { Inter, Gowun_Dodum } from 'next/font/google';

const inter = Inter({
	weight: ['200', '300', '400', '500', '600', '700', '800'],
	subsets: ['latin'],
});
const gowun = Gowun_Dodum({ weight: '400', subsets: ['latin'] });

const AboutSection = () => {
	return (
		<div className="w-full px-6 sm:px-8 md:px-12 lg:px-16 py-8 md:py-12 lg:py-16 inline-flex flex-col lg:flex-row justify-between items-center gap-8 md:gap-14 lg:gap-24 xl:gap-32 my-8 md:my-12 lg:my-16">
			<div className="flex-1 inline-flex flex-col justify-start items-start gap-8 ">
				<div className="w-full flex flex-col justify-center items-start gap-2">
					<h3
						className={`text-3xl md:text-4xl lg:text-5xl tracking-widest uppercase text-primary ${gowun.className}`}
					>
						About
					</h3>
					<div className="w-16 h-1 bg-secondary rounded-full" />
					<h4 className="text-xl text-secondary font-semibold tracking-wide mt-2">
						Our Organization
					</h4>
				</div>

				<div className="self-stretch justify-start">
					<span
						className={`text-primary  text-base xl:text-lg font-medium leading-[1.85] tracking-wide ${gowun.className}`}
					>
						Kaka Memorial Foundation works to improve rural communities in
						Nigeria by advancing education, clean water access, and strong
						partnerships. Our efforts align with the United Nations Sustainable
						Development Goals (SDGs), adopted globally and by Nigeria, focusing
						on quality education (SDG 4), clean water and sanitation (SDG 6),
						and partnerships for development (SDG 17). We believe that education
						breaks the cycle of poverty, and clean water promotes health and
						well-being.
						<br />
					</span>

					<span
						className={`block text-secondary text-lg mt-4 font-semibold ${inter.className} leading-8 tracking-wide hover:underline decoration-secondary underline-offset-4 transition-colors duration-200`}
					>
						<Link href="/about">Read More</Link>
					</span>
				</div>
			</div>

			<div className="relative group w-full lg:max-w-md h-64 sm:h-80 lg:h-96 mx-auto rounded-md overflow-hidden shadow-xl border-[6px] border-secondary bg-white">
				{/* Image */}
				<Image
					src="/about.jpg"
					alt="About Us"
					width={494.76}
					height={384}
					loading="lazy"
					className="w-full h-full object-cover transition-transform duration-700 ease-in-out group-hover:scale-105"
				/>

				{/* Overlay */}
				<div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition duration-500 mix-blend-multiply pointer-events-none" />
			</div>
		</div>
	);
};

export default AboutSection;
