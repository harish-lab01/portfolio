import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Loader({ onComplete }) {
  const [isVisible, setIsVisible] = useState(true);
  const text = "HARISH.DEV";
  const letters = text.split("");

  useEffect(() => {
    // Total duration ~1.8 seconds.
    // Text builds in 800ms, stays for 400ms, then starts transition at 1200ms.
    // Transition finishes at 2000ms.
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 1200);

    const completeTimer = setTimeout(() => {
      onComplete();
    }, 2000);

    return () => {
      clearTimeout(timer);
      clearTimeout(completeTimer);
    };
  }, [onComplete]);

  const containerVariants = {
    hidden: { opacity: 1 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.1,
      }
    }
  };

  const letterVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5, ease: [0.25, 1, 0.5, 1] }
    }
  };

  const overlayVariants = {
    visible: {
      clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)"
    },
    exit: {
      clipPath: "polygon(100% 0%, 100% 0%, 100% 100%, 100% 100%)",
      transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] }
    }
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          variants={overlayVariants}
          initial="visible"
          animate="visible"
          exit="exit"
          className="fixed inset-0 z-[100] flex items-center justify-center bg-bg-ivory select-none"
        >
          {/* Subtle noise grid or ambient blob in loader for premium look */}
          <div className="absolute inset-0 bg-[radial-gradient(#6c63ff/3%,transparent_60%)] pointer-events-none" />
          
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="flex items-center overflow-hidden py-4"
          >
            {letters.map((char, index) => (
              <motion.span
                key={index}
                variants={letterVariants}
                className={`font-display text-4xl md:text-6xl font-bold tracking-widest ${
                  char === '.'
                    ? 'bg-gradient-to-r from-primary-glow-from to-primary-glow-to bg-clip-text text-transparent'
                    : 'text-text-primary'
                }`}
              >
                {char}
              </motion.span>
            ))}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
