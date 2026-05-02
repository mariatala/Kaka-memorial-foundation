'use client';

import React, { useRef, useState, useCallback, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import EventCard from '@/components/home-page-components/RecentEventCard';

export type CarouselItemData = {
    id: number;
    imageSrc: string;
    imageAlt: string;
    title: string;
    description: string;
    link?: string | null;
};

const GAP = 16; // px — matches gap-4

function calcCardWidth(containerPx: number): number {
    const count = containerPx >= 700 ? 3 : containerPx >= 440 ? 2 : 1;
    // For a single card leave a ~16 % peek so the next card is hinted
    if (count === 1) return Math.round(containerPx * 0.84);
    return Math.round((containerPx - GAP * (count - 1)) / count);
}

type Props = { items: CarouselItemData[] };

export default function EventsCarousel({ items }: Props) {
    const containerRef = useRef<HTMLDivElement>(null);
    const [cardWidth, setCardWidth] = useState<number | null>(null);
    const [canScrollLeft, setCanScrollLeft] = useState(false);
    const [canScrollRight, setCanScrollRight] = useState(false);
    const [activeIndex, setActiveIndex] = useState(0);

    const measure = useCallback(() => {
        const el = containerRef.current;
        if (!el) return;
        setCardWidth(calcCardWidth(el.clientWidth));
    }, []);

    const syncScroll = useCallback(() => {
        const el = containerRef.current;
        if (!el) return;
        const left = el.scrollLeft;
        const maxScroll = el.scrollWidth - el.clientWidth;
        setCanScrollLeft(left > 2);
        setCanScrollRight(left < maxScroll - 2);
        const cards = Array.from(el.children) as HTMLElement[];
        let closest = 0, minDist = Infinity;
        cards.forEach((card, i) => {
            const dist = Math.abs(card.offsetLeft - left);
            if (dist < minDist) { minDist = dist; closest = i; }
        });
        setActiveIndex(closest);
    }, []);

    useEffect(() => {
        const el = containerRef.current;
        if (!el) return;
        measure();
        el.addEventListener('scroll', syncScroll, { passive: true });
        window.addEventListener('resize', measure);
        return () => {
            el.removeEventListener('scroll', syncScroll);
            window.removeEventListener('resize', measure);
        };
    }, [measure, syncScroll]);

    // Re-check scroll bounds after card widths settle
    useEffect(() => {
        const t = setTimeout(syncScroll, 60);
        return () => clearTimeout(t);
    }, [cardWidth, syncScroll]);

    const scroll = useCallback((dir: 'left' | 'right') => {
        const el = containerRef.current;
        if (!el) return;
        const step = (cardWidth ?? el.clientWidth) + GAP;
        el.scrollBy({ left: dir === 'right' ? step : -step, behavior: 'smooth' });
    }, [cardWidth]);

    const scrollToIndex = useCallback((i: number) => {
        const el = containerRef.current;
        const card = el?.children[i] as HTMLElement | undefined;
        if (!card || !el) return;
        el.scrollTo({ left: card.offsetLeft, behavior: 'smooth' });
    }, []);

    if (items.length === 0) return null;

    const NavButton = ({ dir, className = '' }: { dir: 'left' | 'right'; className?: string }) => (
        <button
            onClick={() => scroll(dir)}
            disabled={dir === 'left' ? !canScrollLeft : !canScrollRight}
            aria-label={dir === 'left' ? 'Previous slide' : 'Next slide'}
            className={`shrink-0 w-10 h-10 rounded-full flex items-center justify-center
                bg-white border border-primary/15 shadow-sm text-primary
                hover:bg-primary hover:text-white hover:border-primary hover:shadow-md
                disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:bg-white
                disabled:hover:text-primary disabled:hover:border-primary/15 disabled:hover:shadow-sm
                transition-all duration-200 ${className}`}
        >
            {dir === 'left' ? <ChevronLeft size={18} /> : <ChevronRight size={18} />}
        </button>
    );

    return (
        <div className="w-full">
            {/* Desktop: arrows flank the scroll track */}
            <div className="flex items-center gap-3 px-4 md:px-0">
                <NavButton dir="left" className="hidden md:flex" />

                <div
                    ref={containerRef}
                    className="flex-1 flex gap-12 overflow-x-auto scroll-smooth snap-x snap-mandatory no-scrollbar touch-pan-x"
                >
                    {items.map(item => (
                        <div
                            key={item.id}
                            className="snap-start shrink-0"
                            style={cardWidth != null
                                ? { width: cardWidth, minWidth: cardWidth }
                                : { minWidth: '84%' }}
                        >
                            <EventCard
                                imageSrc={item.imageSrc}
                                imageAlt={item.imageAlt}
                                title={item.title}
                                description={item.description}
                                link={item.link}
                            />
                        </div>
                    ))}
                </div>

                <NavButton dir="right" className="hidden md:flex" />
            </div>

            {/* Mobile arrows + dot indicators */}
            <div className="flex items-center justify-center gap-4 mt-5">
                <NavButton dir="left" className="md:hidden" />

                {items.length > 1 && (
                    <div className="flex items-center gap-2" role="tablist" aria-label="Carousel navigation">
                        {items.map((item, i) => (
                            <button
                                key={item.id}
                                role="tab"
                                aria-selected={i === activeIndex}
                                aria-label={`Go to slide ${i + 1}`}
                                onClick={() => scrollToIndex(i)}
                                className={`rounded-full transition-all duration-300 ${
                                    i === activeIndex
                                        ? 'w-6 h-2.5 bg-secondary'
                                        : 'w-2.5 h-2.5 bg-primary/25 hover:bg-primary/50'
                                }`}
                            />
                        ))}
                    </div>
                )}

                <NavButton dir="right" className="md:hidden" />
            </div>
        </div>
    );
}
