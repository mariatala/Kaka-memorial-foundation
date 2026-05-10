import Link from 'next/link';
import { Heart, HandHeart } from 'lucide-react';
import { Inter, Gowun_Dodum } from 'next/font/google';

const inter = Inter({
	weight: ['200', '300', '400', '500', '600', '700', '800'],
	subsets: ['latin'],
});

const gowun = Gowun_Dodum({ weight: '400', subsets: ['latin'] });

const CtaHome = () => {
	return (
		<div className="w-full inline-flex flex-col justify-start items-center px-2 my-8 sm:p-8 md:px-16">
			<div className="w-full flex flex-col justify-center items-center gap-2 md:mb-0 mb-12">
				<h3
					className={`text-3xl lg:text-4xl tracking-widest uppercase text-primary ${gowun.className}`}
				>
					Get Involved
				</h3>
				<div className="w-16 h-1 bg-secondary rounded-full" />
				<h4 className="text-xl text-center text-secondary font-semibold tracking-wide">
					Every act of kindness counts. Be part of the change.
				</h4>
			</div>

			<div className="w-full min-w-48 inline-flex flex-col md:flex-row justify-evenly items-start gap-8">
				{/* Donate Section */}
				<div className="w-full h-full md:w-1/2 xl:w-1/3 px-2 py-4 sm:py-8 inline-flex flex-col justify-start items-center gap-6">
					<div className="flex flex-col justify-start items-center gap-3">
						<div className="p-4 bg-primary/5 rounded-full border border-primary/20">
							<Heart className="w-8 h-8 text-primary" strokeWidth={1.5} />
						</div>
						<div
							className={`text-center text-primary text-xl md:text-3xl font-medium tracking-wider ${inter.className}`}
						>
							Donate
						</div>
						<div
							className={`text-primary text-sm md:text-base text-center leading-8 tracking-wide ${inter.className}`}
						>
							Every donation you make helps provide clean water, education, and
							hope to underserved rural communities.
						</div>
					</div>
					<Link
						href="/join-us#donate"
						className={`px-8 py-2.5 bg-primary text-light font-semibold rounded-sm hover:bg-secondary transition-colors duration-300 ease-in-out tracking-wider text-sm  uppercase ${inter.className}`}
					>
						Support the Mission
					</Link>
				</div>

				{/* Volunteer Section */}
				<div className="w-full h-full md:w-1/2 xl:w-1/3 py-4 sm:py-8 inline-flex flex-col justify-start items-center gap-6">
					<div className="flex flex-col px-2 justify-start items-center gap-3">
						<div className="p-4 bg-secondary/10 rounded-full border border-secondary/30">
							<HandHeart className="w-8 h-8 text-secondary" strokeWidth={1.5} />
						</div>
						<div
							className={`text-center text-primary text-xl md:text-3xl font-medium tracking-wider ${inter.className}`}
						>
						 Join the Mission
						</div>
						<div
							className={`text-primary text-sm md:text-base text-center leading-8 tracking-wide ${inter.className}`}
						>
							By volunteering your time and skills, you can help bring clean
							water, quality education, and human rights advocacy to communities
							in need.
						</div>
					</div>
					<Link
						href="/join-us#volunteer"
						className={`px-8 py-2.5 border-2 border-primary text-primary font-semibold rounded-sm hover:bg-primary hover:text-light transition-all duration-300 tracking-wider text-sm ${inter.className}`}
					>
						VOLUNTEER
					</Link>
				</div>
			</div>
		</div>
	);
};

export default CtaHome;
