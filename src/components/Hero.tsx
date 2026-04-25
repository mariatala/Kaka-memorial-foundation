'use client';

import Link from 'next/link';
import { FaFacebook } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';
import { FaInstagram } from 'react-icons/fa';
import { Inter } from 'next/font/google';
const inter = Inter({
	weight: ['200', '300', '400', '500', '600', '700', '800'],
	subsets: ['latin'],
});

export default function HeroSection() {
	return (
		<section
			className="relative w-full h-screen bg-cover bg-center"
			style={{ backgroundImage: "url('/cover_image.jpeg')" }}
		>
			{/* Gradient Overlay */}
			<div className="absolute inset-0 bg-gradient-to-b from-primary-dark/40 to-primary-dark/100 z-0" />

			{/* Hero Content */}
			<div className="relative z-10  h-full flex flex-col-reverse gap-8 md:flex-row items-center mt-16 justify-center  md:justify-between text-justify py-32">
				{/* Social Icons */}
				<div className="social-icons p-3 md:bg-secondary mx-4 rounded-sm flex flex-row md:flex-col items-center justify-center gap-6">
					<Link
						href="https://www.facebook.com/profile.php?id=100088330151858"
						target="_blank"
						className=" text-secondary md:text-white hover:text-accent-three md:hover:text-primary transition-colors duration-300 ease-in-out"
					>
						<FaFacebook className="size-6" />
					</Link>
					<Link
						href="https://www.instagram.com/kakamfoundation/"
						target="_blank"
						className="text-secondary md:text-white hover:text-accent-three md:hover:text-primary transition-colors duration-300 ease-in-out"
					>
						<FaInstagram className="size-6" />
					</Link>
					{/* <Link
						href="https://www.linkedin.com/company/kaka-memorial-foundation/"
						target="_blank"
						className="text-secondary md:text-white hover:text-accent-three md:hover:text-primary transition-colors duration-300 ease-in-out"
					>
						<FaLinkedin className="size-6" />
					</Link> */}
					<Link
						href="https://x.com/KakaMFoundation"
						target="_blank"
						className="text-secondary md:text-white hover:text-accent-three md:hover:text-primary transition-colors duration-300 ease-in-out"
					>
						<FaXTwitter className="size-6" />
					</Link>
				</div>

				{/* Hero Text Content */}
				<div className="flex flex-col justify-center items-center md:items-start  gap-2 text-white  w-5/6 xl:w-2/3 bg-secondary px-3 md:px-6 lg:px-12 py-6 rounded-sm md:rounded-none">
					<h3
						className={`text-3xl lg:text-4xl xl:text-5xl text-center md:text-start tracking-widest uppercase text-primary ${inter.className}`}
					>
						Connecting Communities
					</h3>

					<h4
						className={` text-lg sm:text-xl text-light  tracking-wide mt-2  ${inter.className}`}
					>
						Engaging Stakeholders For Real Impact
					</h4>
				</div>
			</div>
		</section>
	);
};


