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
		<div className="w-full px-4 py-6 md:py-4 bg-accent-three">
			<div className="w-full py-4 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 md:gap-4">
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
