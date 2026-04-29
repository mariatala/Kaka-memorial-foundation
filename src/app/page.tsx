"use client";

import Hero from '@/components/home-page-components/Hero'
import AboutSection from '@/components/home-page-components/AboutSection'
import CtaHome from '@/components/home-page-components/CtaHome'
import StatsSection from '@/components/home-page-components/StatsSection'
import SectionDivider from '@/components/home-page-components/SectionDivider'
import RecentProjects from '@/components/home-page-components/StatsSection'
import JoinUsSection from '@/components/JoinUsCta';


import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
    return (
      <section className="min-h-screen flex flex-col  items-center sm:items-start  bg-light text-primary">
      <Hero />
			<SectionDivider />
			<AboutSection />
			<StatsSection />
			<CtaHome />
			<RecentProjects />
			{/* Join Us Section */}
			<JoinUsSection
				title="Join Us in Making a Difference"
				description="Join us in our mission to uplift communities and create a better future for all. Whether through volunteering, donating, or spreading the word, your support makes a difference."
				bgColor="bg-white"
				animateIcon={true}
			/>
      <div className="flex items-center justify-center h-screen bg-neutral-950 text-white"> </ div>
      <div className="flex gap-4">
        <button
          onClick={() => router.push("/sign-up")}
          className="bg-white text-black font-medium px-6 py-2 rounded-md hover:bg-gray-200"
        >
          Sign Up
        </button>
        <button
          onClick={() => router.push("/sign-in")}
          className="border border-white text-white font-medium px-6 py-2 rounded-md hover:bg-neutral-800"
        >
          Sign In
        </button>
      </div>
    </section>
    );
  }
  