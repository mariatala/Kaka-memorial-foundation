import Hero from '@/components/home-page-components/Hero'
import AboutSection from '@/components/home-page-components/AboutSection'
import CtaHome from '@/components/home-page-components/CtaHome'
import StatsSection from '@/components/home-page-components/StatsSection'
import SectionDivider from '@/components/home-page-components/SectionDivider'
import RecentProjects from '@/components/home-page-components/RecentProjects'
import JoinUsSection from '@/components/JoinUsCta';

export default function Home() {
  return (
    <section className="min-h-screen flex flex-col items-center sm:items-start bg-light text-primary">
      <Hero />
      <SectionDivider />
      <AboutSection />
      <StatsSection />
      <CtaHome />
      <RecentProjects />
      <JoinUsSection
        title="Join Us in Making a Difference"
        description="Join us in our mission to uplift communities and create a better future for all. Whether through volunteering, donating, or spreading the word, your support makes a difference."
        bgColor="bg-white"
        animateIcon={true}
      />
    </section>
  );
}
  