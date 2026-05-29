import React, { useState, useEffect, useRef } from 'react';

export default function StatCounter({ value, suffix = '', label, duration = 1500 }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const hasStarted = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasStarted.current) {
          hasStarted.current = true;
          let startTime = null;
          
          const animate = (timestamp) => {
            if (!startTime) startTime = timestamp;
            const progress = timestamp - startTime;
            const percentage = Math.min(progress / duration, 1);
            
            // Ease out quad
            const easeProgress = percentage * (2 - percentage);
            setCount(Math.floor(easeProgress * value));

            if (progress < duration) {
              requestAnimationFrame(animate);
            } else {
              setCount(value);
            }
          };
          requestAnimationFrame(animate);
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [value, duration]);

  return (
    <div ref={ref} className="text-center py-2 flex flex-col items-center">
      <div className="font-accent text-5xl md:text-6xl font-bold bg-gradient-to-r from-primary-glow-from to-aurora-pink bg-clip-text text-transparent select-none leading-none animate-[float_4s_ease-in-out_infinite]">
        {count}
        {suffix}
      </div>
      <div className="font-code text-[10px] md:text-xs text-text-muted uppercase tracking-wider mt-1 select-none">
        {label}
      </div>
    </div>
  );
}
