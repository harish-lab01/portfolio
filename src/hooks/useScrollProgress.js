import { useState, useEffect, useRef } from 'react';

export default function useScrollProgress(sectionIds) {
  const [activeSection, setActiveSection] = useState(0);
  const rafRef = useRef(null);
  const lastScrollY = useRef(-1);

  useEffect(() => {
    const handleScroll = () => {
      // Throttle via rAF — only run once per frame
      if (rafRef.current) return;
      rafRef.current = requestAnimationFrame(() => {
        rafRef.current = null;
        const scrollY = window.scrollY;
        if (Math.abs(scrollY - lastScrollY.current) < 2) return; // skip tiny movements
        lastScrollY.current = scrollY;

        const scrollPosition = scrollY + window.innerHeight / 3;
        for (let i = sectionIds.length - 1; i >= 0; i--) {
          const el = document.getElementById(sectionIds[i]);
          if (el) {
            const absoluteTop = el.offsetTop;
            if (scrollPosition >= absoluteTop) {
              setActiveSection(prev => prev !== i ? i : prev);
              break;
            }
          }
        }
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [sectionIds]);

  return { activeSection };
}
