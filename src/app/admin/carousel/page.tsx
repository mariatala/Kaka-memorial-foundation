import { auth } from '@/lib/auth';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';
import prisma from '@/lib/prisma';
import Link from 'next/link';
import Image from 'next/image';
import { Inter, Gowun_Dodum } from 'next/font/google';
import { ArrowLeft, Layers } from 'lucide-react';
import CarouselEditor from './CarouselEditor';

const inter = Inter({ weight: ['300', '400', '500', '600', '700'], subsets: ['latin'] });
const gowun = Gowun_Dodum({ weight: '400', subsets: ['latin'] });

export default async function AdminCarouselPage() {
    const session = await auth.api.getSession({ headers: await headers() });

    if (!session?.user || session.user.role !== 'admin') {
        redirect('/sign-in?callbackUrl=/admin/carousel');
    }

    const items = await prisma.carouselItem.findMany({ orderBy: { order: 'asc' } });
    const serialized = items.map(item => ({
        ...item,
        createdAt: item.createdAt.toISOString(),
        updatedAt: item.updatedAt.toISOString(),
    }));

    return (
        <div className={`min-h-screen bg-light ${inter.className}`}>

            {/* Hero banner */}
            <div className="w-full bg-primary pt-24 pb-16 px-6 md:px-16">
                <div className="max-w-5xl mx-auto">
                    <Link
                        href="/admin"
                        className="inline-flex items-center gap-1.5 text-light/50 hover:text-light text-xs font-medium transition-colors mb-6"
                    >
                        <ArrowLeft size={13} />
                        Back to Dashboard
                    </Link>
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-secondary/20 flex items-center justify-center shrink-0">
                            <Layers size={20} className="text-secondary" />
                        </div>
                        <div>
                            <p className="text-secondary text-xs font-semibold uppercase tracking-widest">Admin Panel</p>
                            <h1 className={`text-2xl md:text-3xl text-light font-bold tracking-wide ${gowun.className}`}>
                                Carousel
                            </h1>
                        </div>
                    </div>
                    <p className="text-accent-three text-sm mt-3">
                        {items.length} item{items.length !== 1 ? 's' : ''} — manage the Recent Advocacy / Projects section on the homepage
                    </p>
                </div>
            </div>

            {/* Content */}
            <div className="max-w-5xl mx-auto px-6 md:px-16 py-12">
                <CarouselEditor items={serialized} />
            </div>

            {/* Footer branding */}
            <div className="max-w-5xl mx-auto px-6 md:px-16 pb-12">
                <div className="flex items-center gap-4 pt-4 border-t border-primary/10">
                    <Image
                        src="/Logo.png"
                        alt="Kaka Memorial Foundation"
                        width={40}
                        height={40}
                        className="w-10 h-auto opacity-60"
                    />
                    <div>
                        <p className="text-xs font-semibold text-primary/40 tracking-wide">Kaka Memorial Foundation</p>
                        <p className="text-xs text-primary/30">Impacting Humanity With Kindness</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
