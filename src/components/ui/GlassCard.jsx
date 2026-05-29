import React from 'react';

export default function GlassCard({ children, className = '', hoverGlow = false, dark = false, onClick, ...props }) {
  const baseClass = dark ? 'glass-dark' : 'glass';
  const glowClass = hoverGlow ? 'border-gradient-glow' : '';
  
  return (
    <div
      onClick={onClick}
      className={`rounded-3xl p-6 transition-all duration-300 ${baseClass} ${glowClass} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}
