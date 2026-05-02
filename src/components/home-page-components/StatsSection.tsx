import prisma from '@/lib/prisma';
import StatCard from '@/components/home-page-components/StatsCard';

const FALLBACK_STATS = [
	{ id: -1, prefix: '$', value: '100', suffix: '', description: 'Raised Through Grants' },
	{ id: -2, prefix: '₦', value: '147740', suffix: '', description: 'Raised Through Donations' },
	{ id: -3, prefix: '', value: '500', suffix: '+', description: 'People Served by Kaka Foundation' },
	{ id: -4, prefix: '', value: '7', suffix: '', description: 'Programs Initiated Since 2022' },
	{ id: -5, prefix: '', value: '9', suffix: '', description: 'Volunteers Across Abuja' },
];

const StatsSection = async () => {
	let rows: { id: number; prefix: string; value: string; suffix: string; description: string }[] = [];
	try {
		rows = await prisma.statistic.findMany({ orderBy: { order: 'asc' } });
	} catch {
		// DB unavailable — fall through to fallback
	}

	const stats = rows.length > 0 ? rows : FALLBACK_STATS;

	return (
		<div className="w-full px-8 py-10 md:py-4 bg-accent-three inline-flex flex-col justify-evenly items-center overflow-hidden">
			<div className="w-full py-10 md:py-4 inline-flex flex-col md:flex-row justify-center items-center gap-8 md:gap-4">
				{stats.map(stat => (
					<StatCard
						key={stat.id}
						amount={`${stat.prefix}${stat.value}${stat.suffix}`}
						description={stat.description}
					/>
				))}
			</div>
		</div>
	);
};

export default StatsSection;
