import React from 'react';

export default function AuroraBlob({ color, size = 'w-96 h-96', className = '', opacity = 'opacity-20', animationIndex = 1 }) {
  const colorMap = {
    violet: 'bg-primary-glow-from',
    pink: 'bg-[#FF6B9D]',
    teal: 'bg-[#45E5C8]',
    amber: 'bg-[#FFB347]'
  };

  const colorClass = colorMap[color] || 'bg-[#6C63FF]';
  const animClass = `animate-aurora-${animationIndex}`;

  return (
    <div
      className={`
        absolute rounded-full filter blur-[120px] pointer-events-none select-none -z-10
        ${colorClass} ${size} ${opacity} ${animClass} ${className}
      `}
    />
  );
}
