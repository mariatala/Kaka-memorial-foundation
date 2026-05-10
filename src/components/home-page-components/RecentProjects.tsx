import prisma from '@/lib/prisma';
import { Gowun_Dodum, Inter } from 'next/font/google';
import EventsCarousel from '@/components/home-page-components/RecentEventsCarausel';
import type { CarouselItemData } from '@/components/home-page-components/RecentEventsCarausel';

const gowun = Gowun_Dodum({ weight: '400', subsets: ['latin'] });
const inter = Inter({ weight: ['400', '500'], subsets: ['latin'] });

const FALLBACK_ITEMS: CarouselItemData[] = [
    {
        id: -1,
        title: 'X-Space Public Engagement',
        description: 'Had a dialogue featuring Canadian Indigenous and Brazilian-Canadian human rights and social justice advocates, as we unpacked the ongoing LEA strike in Abuja and its impact on Education.',
        imageSrc: '/xtalk.jpg',
        imageAlt: 'X-Space public engagement session',
        link: null,
    },
    {
        id: -2,
        title: 'Water Access Advocacy, Shapi Community, Kwali Area Council',
        description: 'Through direct engagement with the Area Council Chairman, Kaka Memorial Foundation successfully advocated for improved water access for residents of Shapi community.',
        imageSrc: '/water.jpg',
        imageAlt: 'Water access advocacy in Shapi community',
        link: null,
    },
    {
        id: -3,
        title: 'Youth Innovation Summit',
        description: 'Discussed innovative solutions with youth leaders across Africa on sustainable development, education, and digital transformation.',
        imageSrc: '/about.jpg',
        imageAlt: 'Youth Innovation Summit',
        link: null,
    },
];

const RecentProjects = async () => {
    let rows: CarouselItemData[] = [];
    try {
        rows = await prisma.carouselItem.findMany({ orderBy: { order: 'asc' } });
    } catch {
        // DB unavailable — fall through to fallback
    }

    const items = rows.length > 0 ? rows : FALLBACK_ITEMS;

    return (
        <section className="w-full bg-accent-three-light py-12 md:py-16 flex flex-col items-center gap-8">
            {/* Section header */}
            <div className="w-full max-w-5xl px-6 md:px-16 flex flex-col items-center gap-3 text-center">
                <p className={`text-secondary text-xs font-semibold uppercase tracking-widest ${inter.className}`}>
                    Impact &amp; Outreach
                </p>
                <h2 className={`text-3xl md:text-4xl text-primary tracking-widest uppercase ${gowun.className}`}>
                    Recent Advocacy / Projects
                </h2>
                <div className="w-16 h-1 bg-secondary rounded-full" />
                <p className={`text-base text-primary/60 font-medium tracking-wide mt-1 ${inter.className}`}>
                    Take a stand; support ethical, people-first development
                </p>
            </div>

            {/* Carousel */}
            <div className="w-full max-w-7xl md:px-16">
                <EventsCarousel items={items} />
            </div>
        </section>
    );
};

export default RecentProjects;
