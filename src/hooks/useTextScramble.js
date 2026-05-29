import { useState, useEffect, useRef } from 'react';

const CHARACTERS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&*<>/\\~`';

export default function useTextScramble(originalText, duration = 600, triggerOnScroll = true) {
  const [text, setText] = useState(originalText);
  const [isScrambling, setIsScrambling] = useState(false);
  const ref = useRef(null);
  const hasTriggered = useRef(false);

  const startScramble = () => {
    if (isScrambling) return;
    setIsScrambling(true);

    let start = null;
    const animate = (timestamp) => {
      if (!start) start = timestamp;
      const progress = timestamp - start;
      
      if (progress < duration) {
        const percentage = progress / duration;
        const scrambled = originalText
          .split('')
          .map((char, index) => {
            if (char === ' ') return ' ';
            if (index / originalText.length < percentage) {
              return originalText[index];
            }
            return CHARACTERS[Math.floor(Math.random() * CHARACTERS.length)];
          })
          .join('');
        setText(scrambled);
        requestAnimationFrame(animate);
      } else {
        setText(originalText);
        setIsScrambling(false);
      }
    };
    requestAnimationFrame(animate);
  };

  useEffect(() => {
    if (!triggerOnScroll) {
      startScramble();
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasTriggered.current) {
          hasTriggered.current = true;
          startScramble();
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
  }, [originalText, duration, triggerOnScroll]);

  return { ref, text };
}
