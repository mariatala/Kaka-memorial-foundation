import EventsCard from '@/app/events/EventsCard';
import { Gowun_Dodum, Inter } from 'next/font/google';
import prisma from '@/lib/prisma';

const gowun = Gowun_Dodum({ weight: '400', subsets: ['latin'] });
const inter = Inter({ weight: '400', subsets: ['latin'] });

export default async function EventsSection() {
    let events: {
        id: number;
        title: string;
        subtitle: string;
        about: string;
        date: Date | null;
        location: string;
        imageUrl: string;
        background: string;
    }[] = [];

    try {
        events = await prisma.eventCategory.findMany({ orderBy: { order: 'asc' } });
    } catch {
        // DB unavailable — render empty state rather than crash
    }

    return (
        <section className="w-full events-section px-2 pb-12 sm:px-8 md:px-16 lg:px-32">
            <div className="w-full inline-flex justify-center md:my-0">
                <p
                    className={`${gowun.className} text-lg leading-10 tracking-wide text-justify md:text-center w-full xl:w-5/6 lg:px-8 my-8 md:mt-0 text-primary`}
                >
                   At Kaka Memorial Foundation, every event is more than just a gathering; it is a movement for change. Whether through vibrant community outreach programs, impactful advocacy and awareness campaigns, scholarship sponsorship initiatives that empower children through education, or collaborative fundraising and partnership events, each initiative represents a meaningful step toward transforming lives and upholding human dignity.

                    We invite passionate individuals, organizations, and advocates for justice to join us on these impactful journeys. Your presence, voice, and support can amplify our mission to expand educational opportunities, provide access to basic amenities, promote human rights, and foster sustainable development in underserved communities. Together, we can create lasting change and brighter futures for generations to come.

                </p>
            </div>

            <div className="w-full flex flex-col justify-center items-center space-y-2 my-16">
                <h2 className={`text-3xl md:text-5xl uppercase text-primary ${gowun.className}`}>
                    Events
                </h2>
                <div className="w-16 h-1 bg-secondary rounded-full" />
                <p className={`text-lg md:text-xl mt-2 text-secondary font-semibold tracking-wide ${inter.className}`}>
                    Stay tuned for upcoming events!
                </p>
            </div>

            {events.length === 0 ? (
                <p className={`text-center text-primary/50 text-sm py-12 ${inter.className}`}>
                    No events available at the moment. Check back soon.
                </p>
            ) : (
                events.map((event) => (
                    <EventsCard
                        key={event.id}
                        event={{
                            title: event.title,
                            subtitle: event.subtitle,
                            description: event.about,
                            date: event.date ?? undefined,
                            location: event.location,
                        }}
                        imageUrl={event.imageUrl || undefined}
                        background={event.background}
                        joinLink="/events/event-registration"
                    />
                ))
            )}
        </section>
    );
}
