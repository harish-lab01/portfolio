import { useEffect, useRef } from 'react';

const KONAMI_CODE = [
  'ArrowUp', 'ArrowUp',
  'ArrowDown', 'ArrowDown',
  'ArrowLeft', 'ArrowRight',
  'ArrowLeft', 'ArrowRight',
  'b', 'a'
];

export default function useKonamiCode(callback) {
  const inputRef = useRef([]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      inputRef.current.push(e.key);
      // Keep only the last length of the Konami code
      if (inputRef.current.length > KONAMI_CODE.length) {
        inputRef.current.shift();
      }

      if (JSON.stringify(inputRef.current) === JSON.stringify(KONAMI_CODE)) {
        callback();
        inputRef.current = []; // Reset after trigger
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [callback]);
}
