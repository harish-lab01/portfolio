import React, { useRef } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export default function MagneticButton({
  children,
  as: Component = 'button',
  className = '',
  maxOffset = 12,
  ...props
}) {
  const ref = useRef(null);

  // Position motion values
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Spring animations for position
  const springConfig = { stiffness: 150, damping: 15, mass: 0.1 };
  const springX = useSpring(x, springConfig);
  const springY = useSpring(y, springConfig);

  const handleMouseMove = (e) => {
    // Disable magnetic hover on touch/coarse devices
    if (window.matchMedia('(pointer: coarse)').matches) return;

    const el = ref.current;
    if (!el) return;

    const rect = el.getBoundingClientRect();
    
    // Mouse distance from the center of the element
    const clientX = e.clientX - rect.left - rect.width / 2;
    const clientY = e.clientY - rect.top - rect.height / 2;

    x.set(clientX * (maxOffset / (rect.width / 2)));
    y.set(clientY * (maxOffset / (rect.height / 2)));
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  const MotionComponent = typeof Component === 'string' ? motion[Component] : motion.create(Component);

  return (
    <MotionComponent
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ x: springX, y: springY }}
      className={`magnetic-btn cursor-pointer inline-flex items-center justify-center select-none ${className}`}
      {...props}
    >
      {children}
    </MotionComponent>
  );
}
