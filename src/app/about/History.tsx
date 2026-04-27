'use client';

import Link from 'next/link';
import { Gowun_Dodum } from 'next/font/google';

const gowun = Gowun_Dodum({ weight: '400', subsets: ['latin'] });

const HistorySection = () => {
	return (
		<section className="relative w-full py-12 md:py-24 px-4 md:px-12 lg:px-24">
			<div className=" mx-auto flex flex-col md:flex-row items-start gap-8 lg:gap-12">
				{/* Title Block */}
				<div className="w-full md:w-1/4 xl:w-1/3 space-y-2">
					<h3
						className={`text-3xl md:text-4xl lg:text-5xl  tracking-widest uppercase text-primary ${gowun.className}`}
					>
						Our History
					</h3>
					<div className="w-16 h-1 bg-secondary rounded-full" />
					<h4 className="text-xl text-secondary font-semibold tracking-wide mt-2">
						And Who We Are
					</h4>
				</div>

				{/* Content Block */}
				<div
					className={`text-primary w-full md:w-3/4 xl:w-2/3 md:text-lg text-base font-medium  leading-10 tracking-wide ${gowun.className}`}
				>
					<p>
						Kaka Memorial Foundation is a non-profit organization founded in
						loving memory of Hajiya Rukayyah Suleiman Kaka, whose life was
						defined by compassion, a passion for education, and a deep
						commitment to equity and progress.
					</p>
					<p>
						Established to carry forward her legacy, the foundation works to
						uplift rural and underserved communities in Nigeria by providing
						access to clean water,  education, electricity,
						and economic opportunities.
					</p>
					<p>
						Our mission is rooted in the belief that kindness expressed through
						empathy, generosity, and action has the power to transform lives.
						Through advocacy, outreach, and sustainable development projects, we
						aim to bridge gaps, uphold human rights, and empower communities to
						thrive.
					</p>
					<p>
						Guided by the motto{' '}
						<span className="italic font-semibold text-primary">
							“Impacting humanity through kindness”
						</span>
						, we are building a future where every individual, regardless of
						background, has the opportunity to live with dignity and purpose.
					</p>

					{/* Call to Action */}
					<div className="flex flex-wrap gap-6 pt-6">
						<Link href="/causes">
							<button className="border-2 border-secondary text-secondary hover:bg-secondary hover:text-white text-sm px-6 py-2 rounded-sm transition-all duration-500 ease-in-out w-full sm:w-auto">
								WHAT WE DO
							</button>
						</Link>
						<Link href="/join_us#donate">
							<button className="border-2 border-secondary text-secondary hover:bg-secondary hover:text-white  text-sm px-6 py-2 rounded-sm transition-all ease-in-out sm:w-auto">
								DONATE NOW
							</button>
						</Link>
					</div>
				</div>
			</div>
		</section>
	);
};

export default HistorySection;
