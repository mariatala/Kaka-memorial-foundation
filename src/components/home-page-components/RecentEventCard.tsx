'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Inter } from 'next/font/google';
import { ArrowRight } from 'lucide-react';

const inter = Inter({ weight: ['400', '500', '600', '700'], subsets: ['latin'] });

type EventCardProps = {
    imageSrc: string;
    imageAlt?: string;
    title: string;
    description: string;
    link?: string | null;
};

const EventCard = ({
    imageSrc,
    imageAlt = 'Project image',
    title,
    description,
    link,
}: EventCardProps) => {
    return (
        <div
            className={`group flex flex-col bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 h-full ${inter.className}`}
        >
            {/* Image */}
            <div className="relative aspect-[16/9] overflow-hidden shrink-0">
                <Image
                    src={imageSrc}
                    alt={imageAlt}
                    fill
                    className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
                {/* Subtle gradient so the white content area blends in */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent pointer-events-none" />
            </div>

            {/* Content */}
            <div className="flex flex-col flex-1 p-4 border-l-4 border-secondary">
                <h3 className="text-sm font-bold text-primary leading-snug mb-2 line-clamp-2">
                    {title}
                </h3>
                <p className="text-sm text-primary/65 leading-relaxed line-clamp-3 flex-1">
                    {description}
                </p>
                {link && (
                    <Link
                        href={link}
                        target={link.startsWith('http') ? '_blank' : undefined}
                        rel={link.startsWith('http') ? 'noopener noreferrer' : undefined}
                        className="inline-flex items-center gap-1 mt-4 text-xs font-semibold text-secondary hover:text-secondary-dark transition-colors self-start"
                    >
                        View Project
                        <ArrowRight size={12} className="transition-transform duration-200 group-hover:translate-x-0.5" />
                    </Link>
                )}
            </div>
        </div>
    );
};

export default EventCard;
