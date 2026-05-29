import React, { useState, useEffect } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export default function Cursor({ activeSectionColor = '#6C63FF' }) {
  const [isHovered, setIsHovered] = useState(false);
  const [cursorText, setCursorText] = useState('');
  const [isVisible, setIsVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(true);

  // Position values for exact dot
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Spring lag physics for outer ring
  const ringX = useSpring(mouseX, { stiffness: 120, damping: 18, mass: 0.1 });
  const ringY = useSpring(mouseY, { stiffness: 120, damping: 18, mass: 0.1 });

  useEffect(() => {
    // Check if device supports hover (desktop)
    const mediaQuery = window.matchMedia('(pointer: coarse)');
    setIsMobile(mediaQuery.matches);

    if (mediaQuery.matches) return;

    const handleMouseMove = (e) => {
      mouseX.set(e.clientX - 4);
      mouseY.set(e.clientY - 4);
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseOver = (e) => {
      // Find closest interactive parent
      const target = e.target;
      const interactiveEl = target.closest('a, button, [data-cursor], .cursor-pointer');
      
      if (interactiveEl) {
        setIsHovered(true);
        const dataCursor = interactiveEl.getAttribute('data-cursor');
        
        if (dataCursor === 'explore') {
          setCursorText('EXPLORE →');
        } else if (interactiveEl.tagName === 'A' || interactiveEl.href) {
          setCursorText('OPEN');
        } else {
          setCursorText('VIEW');
        }
      } else {
        setIsHovered(false);
        setCursorText('');
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseover', handleMouseOver);
    document.body.style.cursor = 'none'; // hide default cursor

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseover', handleMouseOver);
      document.body.style.cursor = 'auto';
    };
  }, [mouseX, mouseY, isVisible]);

  if (isMobile || !isVisible) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-[9999]">
      {/* Inner Dot */}
      {!isHovered && (
        <motion.div
          className="w-2 h-2 rounded-full absolute"
          style={{
            x: mouseX,
            y: mouseY,
            backgroundColor: activeSectionColor,
          }}
        />
      )}

      {/* Outer Ring */}
      <motion.div
        className="rounded-full border absolute flex items-center justify-center font-code font-bold tracking-wider select-none text-[8px] text-center"
        style={{
          x: ringX,
          y: ringY,
          width: isHovered ? 64 : 32,
          height: isHovered ? 64 : 32,
          left: isHovered ? -28 : -12,
          top: isHovered ? -28 : -12,
          borderColor: activeSectionColor,
          backgroundColor: isHovered ? `${activeSectionColor}15` : 'transparent',
          color: '#0D0D0D',
          transition: 'width 0.3s, height 0.3s, left 0.3s, top 0.3s, background-color 0.3s',
        }}
      >
        {isHovered && <span className="animate-fade-in text-[7px] uppercase font-bold">{cursorText}</span>}
      </motion.div>
    </div>
  );
}
