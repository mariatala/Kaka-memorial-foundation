import EventsCard from '@/app/events/EventsCard';
import { Gowun_Dodum, Inter } from 'next/font/google';

const gowun = Gowun_Dodum({ weight: '400', subsets: ['latin'] });
const inter = Inter({ weight: '400', subsets: ['latin'] });

const events = [
	{
		title: 'Community Outreach Events',
		subtitle: 'Join hands to uplift communities.',
		description:
			'These events focus on providing direct support to underserved areas through educational drives, clean water projects, and humanitarian relief. Be part of real impact where its needed most.',
		date: '',
		location: '',
		imageUrl: '/school.png',
		background: 'bg-secondary',
		joinLink: '/events/event_registration',
	},
	{
		title: 'Advocacy & Awareness Campaigns',
		subtitle: 'Lend your voice to justice and human dignity',
		description:
			'Help raise awareness on key issues like human rights, education, gender equality, and rural development. From rallies to school talks, your presence and voice make a difference.',
		date: '',
		location: '',
		imageUrl: '/xtalk.jpg',
		background: 'bg-accent-one',
		joinLink: '/events/event_registration',
	},
	{
		title: 'Fundraising & Partnership Events',
		subtitle: 'Support the mission. Expand the impact.',
		description:
			'These events bring together well-wishers, donors, and organizations to raise resources and build strategic partnerships that fuel our life-changing programs across communities.',
		date: '',
		location: '',
		imageUrl: '/education2.jpeg',
		background: 'bg-accent-two',
		joinLink: '/events/event_registration',
	},
];

const EventsSection = () => {
	return (
		<section className=" w-full events-section px-2 pb-12 sm:px-8 md:px-16 lg:px-32">
			<div className="w-full inline-flex justify-center md:my-0 ">
				<p
					className={`${gowun.className} text-lg leading-10 tracking-wide text-justify md:text-center w-full  xl:w-5/6 lg:px-8 my-8 md:mt-0 text-primary`}
				>
					At Kaka Memorial Foundation, every event is more than just a
					gathering, it is a movement for change. Whether it is through vibrant
					community outreach programs, powerful advocacy and awareness
					campaigns, or collaborative fundraising and partnership events, each
					initiative is a step toward transforming lives and upholding human
					dignity. We invite passionate individuals, organizations, and allies
					of justice to walk with us in these impactful journeys. Your presence,
					voice, and support can amplify our mission to bring basic amenities,
					promote human rights, and foster sustainable development in
					underserved communities.
				</p>
			</div>
			<div className="w-full  flex flex-col justify-center items-center space-y-2 my-16">
				<h2
					className={`text-3xl md:text-5xl uppercase text-primary ${gowun.className}`}
				>
					Events
				</h2>
				<div className="w-16 h-1 bg-secondary rounded-full" />
				<p
					className={` text-lg md:text-xl mt-2 text-secondary font-semibold tracking-wide ${inter.className}`}
				>
					Stay tuned for upcoming events!
				</p>
			</div>

			{events.map((event, idx) => (
				<EventsCard
					key={idx}
					event={event}
					imageUrl={event.imageUrl}
					background={event.background}
					joinLink={event.joinLink}
				/>
			))}
		</section>
	);
};

export default EventsSection;
