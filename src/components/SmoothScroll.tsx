'use client';

import { useEffect } from 'react';
import Lenis from 'lenis';

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.5,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1.1,
    });

    let rafId: number;

    function raf(time: number) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }

    rafId = requestAnimationFrame(raf);

    // Make lenis instance available globally for scroll event bindings in other components
    (window as any).lenisInstance = lenis;

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
      if ((window as any).lenisInstance === lenis) {
        (window as any).lenisInstance = null;
      }
    };
  }, []);

  return <>{children}</>;
}
