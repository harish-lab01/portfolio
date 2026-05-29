import React from 'react';

export default function Ticker() {
  const text = "Currently building with React.js ✦ Available for new projects ✦ Based in Chennai, India ✦ 4+ Production apps shipped ✦ Open to frontend roles ✦";
  
  return (
    <div className="w-full px-6 pt-24 pb-4 overflow-hidden z-10 relative">
      <div className="glass rounded-full py-2.5 px-4 overflow-hidden border border-border-glow/50 bg-white/20 backdrop-blur-sm shadow-sm max-w-7xl mx-auto flex items-center">
        {/* Marquee track */}
        <div className="flex gap-4 whitespace-nowrap animate-marquee font-code text-xs font-bold text-primary-glow-from tracking-wide select-none uppercase">
          <span>{text} &nbsp; {text}</span>
          <span>{text} &nbsp; {text}</span>
        </div>
      </div>
    </div>
  );
}
