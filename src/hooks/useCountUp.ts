'use client';

import { useEffect, useRef, useState } from 'react';

interface UseCountUpOptions {
	end: number;
	duration?: number;
	start?: number;
	/** Viewport fraction that must be visible before the animation fires. Default 0.25 */
	threshold?: number;
}

/**
 * Animates a number from `start` to `end` once the attached element enters
 * the viewport. The animation fires exactly once — subsequent scroll events
 * are ignored because the IntersectionObserver disconnects after the first
 * trigger.
 *
 * Uses requestAnimationFrame + easeOutQuart for a smooth, decelerating feel.
 */
export function useCountUp<T extends Element = HTMLDivElement>({
	end,
	duration = 1800,
	start = 0,
	threshold = 0.25,
}: UseCountUpOptions) {
	const [value, setValue] = useState(start);
	const ref = useRef<T>(null);
	const hasAnimated = useRef(false);

	useEffect(() => {
		const el = ref.current;
		if (!el || end === 0) return;

		const observer = new IntersectionObserver(
			([entry]) => {
				if (!entry.isIntersecting || hasAnimated.current) return;

				hasAnimated.current = true;
				observer.disconnect();

				const startTime = performance.now();
				const range = end - start;

				const tick = (now: number) => {
					const elapsed = now - startTime;
					const progress = Math.min(elapsed / duration, 1);
					// easeOutQuart: fast start, smooth deceleration
					const eased = 1 - Math.pow(1 - progress, 4);
					setValue(Math.round(start + range * eased));
					if (progress < 1) {
						requestAnimationFrame(tick);
					} else {
						setValue(end);
					}
				};

				requestAnimationFrame(tick);
			},
			{ threshold }
		);

		observer.observe(el);
		return () => observer.disconnect();
	}, [end, duration, start, threshold]);

	return { value, ref };
}
