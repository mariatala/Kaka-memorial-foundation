'use client';

import { useEffect, useRef, useState } from 'react';

type Variant = 'fade-up' | 'fade-in';

interface AnimateInProps {
    children: React.ReactNode;
    variant?: Variant;
    /** Milliseconds to delay the animation after the element enters the viewport */
    delay?: number;
    className?: string;
}

const animationClass: Record<Variant, string> = {
    'fade-up': 'animate-fade-in-up',
    'fade-in': 'animate-fade-in',
};

/**
 * Wrapper that plays a CSS entrance animation when the element scrolls into view.
 * Passes `prefers-reduced-motion` handling to the global CSS rule so no JS check
 * is needed here — the animation simply runs at near-zero duration in that case.
 */
export default function AnimateIn({
    children,
    variant = 'fade-up',
    delay = 0,
    className = '',
}: AnimateInProps) {
    const ref = useRef<HTMLDivElement>(null);
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const el = ref.current;
        if (!el) return;
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setVisible(true);
                    observer.disconnect();
                }
            },
            { threshold: 0.08 },
        );
        observer.observe(el);
        return () => observer.disconnect();
    }, []);

    return (
        <div
            ref={ref}
            className={visible ? `${animationClass[variant]} ${className}` : `opacity-0 ${className}`}
            style={{ animationDelay: visible && delay ? `${delay}ms` : undefined }}
        >
            {children}
        </div>
    );
}
