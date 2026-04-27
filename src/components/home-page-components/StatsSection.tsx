import StatCard from '@/components/home-page-components/StatsCard'; // adjust the path as needed

const StatsSection = () => {
	return (
		<div className="w-full px-8 py-10 md:py-4 bg-accent-three inline-flex flex-col justify-evenly items-center overflow-hidden">
			<div className="w-full py-10 md:py-4 inline-flex flex-col md:flex-row justify-center items-center gap-8 md:gap-4">
				<StatCard amount="$100" description="Raised Through Grants" />
				<StatCard amount="₦147,740" description="Raised Through Donations" />
				<StatCard
					amount="500+"
					description="People Served by Kaka Foundation"
				/>
				<StatCard amount="7" description="Programs Initiated Since 2022" />
				<StatCard amount="9" description="Volunteers Across Abuja" />
			</div>
		</div>
	);
};

export default StatsSection;
