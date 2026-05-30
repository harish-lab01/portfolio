import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export default function Cursor({ activeSectionColor = '#6C63FF' }) {
  const [isHovered, setIsHovered] = useState(false);
  const [cursorText, setCursorText] = useState('');
  const [isVisible, setIsVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(true);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const rafRef = useRef(null);
  const pendingX = useRef(0);
  const pendingY = useRef(0);

  const ringX = useSpring(mouseX, { stiffness: 120, damping: 18, mass: 0.1 });
  const ringY = useSpring(mouseY, { stiffness: 120, damping: 18, mass: 0.1 });

  useEffect(() => {
    const mq = window.matchMedia('(pointer: coarse)');
    if (mq.matches) return;
    setIsMobile(false);

    const flushPosition = () => {
      rafRef.current = null;
      mouseX.set(pendingX.current - 4);
      mouseY.set(pendingY.current - 4);
    };

    const handleMouseMove = (e) => {
      pendingX.current = e.clientX;
      pendingY.current = e.clientY;
      if (!isVisible) setIsVisible(true);
      if (!rafRef.current) {
        rafRef.current = requestAnimationFrame(flushPosition);
      }
    };

    // Use event delegation on document — one listener instead of per-element
    const handleMouseOver = (e) => {
      const interactiveEl = e.target.closest('a, button, [data-cursor], .cursor-pointer');
      if (interactiveEl) {
        setIsHovered(true);
        const dataCursor = interactiveEl.getAttribute('data-cursor');
        if (dataCursor === 'explore') setCursorText('EXPLORE →');
        else if (interactiveEl.tagName === 'A') setCursorText('OPEN');
        else setCursorText('VIEW');
      } else {
        setIsHovered(false);
        setCursorText('');
      }
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('mouseover', handleMouseOver, { passive: true });
    document.body.style.cursor = 'none';

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseover', handleMouseOver);
      document.body.style.cursor = 'auto';
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []); // eslint-disable-line

  if (isMobile || !isVisible) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-[9999]">
      {!isHovered && (
        <motion.div
          className="w-2 h-2 rounded-full absolute"
          style={{ x: mouseX, y: mouseY, backgroundColor: activeSectionColor }}
        />
      )}
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
