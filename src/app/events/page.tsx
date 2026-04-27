import React from 'react';
import Image from 'next/image';
import EventsSection from '@/app/events/EventsSection';
import { Heart } from 'lucide-react';
import { Inter, Gowun_Dodum } from 'next/font/google';
import Link from 'next/link';
const inter = Inter({
	weight: ['200', '300', '400', '500', '600', '700', '800'],
	subsets: ['latin'],
});
const gowun = Gowun_Dodum({ weight: '400', subsets: ['latin'] });
export default function EventsPage(){
	return (
		<div className="w-full h-full flex flex-col bg-light text-primary">
			<section className="w-full flex min-h-128 md:min-h-120 justify-start items-center py-8 md:py-0">
				

				<div className="w-full flex flex-col-reverse  md:flex-row mt-16 justify-end items-center">
					<div className="w-full flex flex-col justify-center items-start">
						<div className="w-full flex flex-col-reverse  md:flex-row items-center">
							<Image
								src="/joinUs.jpg"
								alt="Kaka Memorial Foundation Logo"
								width={500}
								height={500}
								className="md:border-l-12 w-4/5 md:w-1/4 border-secondary h-auto transition-all duration-300"
							/>
							<div className="w-full h-fit text-left bg-accent-three-light py-8 px-10">
								<h2
									className={`text-3xl md:text-5xl uppercase text-primary ${gowun.className}`}
								>
									Get Involved
								</h2>
								<p
									className={` text-lg md:text-xl my-4 text-secondary font-semibold tracking-wide ${inter.className}`}
								>
									Join us, because kindness in action builds the future we all
									deserve.
								</p>
								<div className="grid grid-cols-2 md:grid-cols-3 items-center gap-4 mt-6 max-w-fit">
									<Link
										href="/join_us"
										className={`bg-primary text-light flex items-center gap-2 px-2 sm:px-4 py-2 rounded-sm shadow-md text-sm  ${inter.className} tracking-wide hover:bg-secondary hover:text-primary transition-all duration-300`}
									>
										Join Us
										<Heart className=" h-5 w-5 ml-1 text-accent-three-light" />
									</Link>
									<Link
										href="/join_us#donate"
										className={`bg-secondary text-light flex items-center gap-2 px-4 py-2 rounded-sm shadow-md text-sm  ${inter.className} tracking-wide hover:bg-primary hover:text-secondary transition-all duration-300`}
									>
										Donate
										<Heart className=" h-5 w-5 ml-1 text-accent-three-light" />
									</Link>
									<Link
										href="/join_us#volunteer"
										className={`bg-accent-three-light text-primary border border-primary flex items-center gap-2 px-4 py-2 rounded-sm shadow-md text-sm  ${inter.className} tracking-wide hover:bg-primary hover:text-light transition-all duration-300`}
									>
										Volunteer
										<Heart className=" h-5 w-5 ml-1 text-primary" />
									</Link>
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>

			{/*Events Section*/}
			< EventsSection />
			{/*Footer Section*/}
		</div>
	);
};