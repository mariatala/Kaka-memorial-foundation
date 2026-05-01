function Bone({ className = '' }: { className?: string }) {
    return <div className={`bg-primary/10 rounded animate-skeleton ${className}`} />;
}

export default function EventsSkeleton() {
    return (
        <section
            className="w-full px-2 pb-12 sm:px-8 md:px-16 lg:px-32"
            aria-label="Loading events"
            aria-busy="true"
        >
            {/* intro paragraph */}
            <div className="w-full xl:w-5/6 my-8 space-y-2 mx-auto lg:px-8">
                <Bone className="h-4 w-full" />
                <Bone className="h-4 w-11/12" />
                <Bone className="h-4 w-5/6" />
                <Bone className="h-4 w-4/5" />
            </div>

            {/* section heading */}
            <div className="flex flex-col items-center gap-3 my-16">
                <Bone className="h-10 w-40" />
                <div className="w-16 h-1 bg-primary/10 rounded-full" />
                <Bone className="h-5 w-56" />
            </div>

            {/* event card placeholders */}
            {[0, 1, 2].map((i) => (
                <div
                    key={i}
                    className="w-full bg-primary/5 rounded-lg px-4 py-8 lg:p-16 mb-12 flex flex-col lg:flex-row gap-8 items-center"
                >
                    <Bone className="w-full lg:w-1/3 h-64 rounded-lg shrink-0" />
                    <div className="w-full lg:w-2/3 space-y-4">
                        <Bone className="h-8 w-2/3" />
                        <div className="w-16 h-1 bg-primary/10 rounded-full" />
                        <Bone className="h-5 w-1/2" />
                        <div className="space-y-2 pt-2">
                            <Bone className="h-4 w-full" />
                            <Bone className="h-4 w-5/6" />
                            <Bone className="h-4 w-4/5" />
                        </div>
                        <Bone className="h-4 w-36" />
                        <Bone className="h-4 w-44" />
                        <Bone className="h-10 w-28 rounded-sm" />
                    </div>
                </div>
            ))}
        </section>
    );
}
