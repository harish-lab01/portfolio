import React from 'react';

// Tech stack items with SVG icons (inline, no extra deps)
const techItems = [
  {
    name: 'React',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5">
        <circle cx="12" cy="12" r="2.5" fill="#61DAFB" />
        <ellipse cx="12" cy="12" rx="10" ry="4" stroke="#61DAFB" strokeWidth="1.2" fill="none" />
        <ellipse cx="12" cy="12" rx="10" ry="4" stroke="#61DAFB" strokeWidth="1.2" fill="none" transform="rotate(60 12 12)" />
        <ellipse cx="12" cy="12" rx="10" ry="4" stroke="#61DAFB" strokeWidth="1.2" fill="none" transform="rotate(120 12 12)" />
      </svg>
    ),
    color: '#61DAFB',
  },
  {
    name: 'JavaScript',
    icon: (
      <svg viewBox="0 0 24 24" className="w-5 h-5">
        <rect width="24" height="24" rx="3" fill="#F7DF1E" />
        <path d="M7 17.5c.4.7 1 1.2 2 1.2 1.1 0 1.7-.5 1.7-1.3 0-.9-.7-1.2-1.8-1.7l-.6-.3C6.8 14.8 6 14 6 12.5c0-1.4 1-2.4 2.7-2.4 1.2 0 2 .4 2.6 1.4l-1.4.9c-.3-.5-.6-.7-1.2-.7-.6 0-.9.3-.9.7 0 .5.3.7 1.3 1.1l.6.3c1.7.7 2.5 1.5 2.5 3.1 0 1.8-1.4 2.8-3.3 2.8-1.8 0-3-.9-3.6-2.1L7 17.5zm7.5.2c.5.8 1.1 1.4 2.3 1.4 1 0 1.6-.5 1.6-1.1 0-.8-.6-1.1-1.7-1.5l-.6-.3c-1.7-.7-2.8-1.6-2.8-3.4 0-1.7 1.3-3 3.3-3 1.4 0 2.4.5 3.1 1.8l-1.7 1.1c-.4-.7-.8-1-1.4-1-.6 0-1 .3-1 .9 0 .6.4.9 1.3 1.3l.6.3c2 .8 3 1.7 3 3.5 0 2-1.6 3.1-3.7 3.1-2.1 0-3.4-1-4-2.4l1.7-1.2z" fill="#000" />
      </svg>
    ),
    color: '#F7DF1E',
  },
  {
    name: 'Tailwind',
    icon: (
      <svg viewBox="0 0 24 24" className="w-5 h-5">
        <path d="M12 6C9.6 6 8.1 7.2 7.5 9.6c.9-1.2 1.95-1.65 3.15-1.35.685.171 1.174.668 1.715 1.219C13.24 10.39 14.177 11.4 16.5 11.4c2.4 0 3.9-1.2 4.5-3.6-.9 1.2-1.95 1.65-3.15 1.35-.685-.171-1.174-.668-1.715-1.219C15.26 7.01 14.323 6 12 6zM7.5 11.4C5.1 11.4 3.6 12.6 3 15c.9-1.2 1.95-1.65 3.15-1.35.685.171 1.174.668 1.715 1.219C8.74 15.79 9.677 16.8 12 16.8c2.4 0 3.9-1.2 4.5-3.6-.9 1.2-1.95 1.65-3.15 1.35-.685-.171-1.174-.668-1.715-1.219C10.76 12.41 9.823 11.4 7.5 11.4z" fill="#38BDF8" />
      </svg>
    ),
    color: '#38BDF8',
  },
  {
    name: '.NET',
    icon: (
      <svg viewBox="0 0 24 24" className="w-5 h-5">
        <path d="M3.5 12a8.5 8.5 0 1 1 17 0 8.5 8.5 0 0 1-17 0z" fill="#512BD4" />
        <text x="4.5" y="15.5" fontSize="7" fontWeight="bold" fill="white" fontFamily="Arial">.NET</text>
      </svg>
    ),
    color: '#512BD4',
  },
  {
    name: 'Firebase',
    icon: (
      <svg viewBox="0 0 24 24" className="w-5 h-5">
        <path d="M5.5 19.5L8.5 4.5l4 7-3 3.5z" fill="#FFA000" />
        <path d="M8.5 4.5l7.5 10-10.5 5z" fill="#FFCA28" />
        <path d="M14 9l1.5 5.5-10 5z" fill="#FF6F00" />
      </svg>
    ),
    color: '#FFCA28',
  },
  {
    name: 'Git',
    icon: (
      <svg viewBox="0 0 24 24" className="w-5 h-5">
        <path d="M21.8 11.2l-9-9a1.3 1.3 0 0 0-1.8 0l-1.8 1.8 2.3 2.3a1.5 1.5 0 0 1 1.9 1.9l2.2 2.2a1.5 1.5 0 1 1-.9.9L13 9v5.3a1.5 1.5 0 1 1-1.2 0V8.9a1.5 1.5 0 0 1-.8-2L8.8 4.7 2.2 11.2a1.3 1.3 0 0 0 0 1.8l9 9a1.3 1.3 0 0 0 1.8 0l8.8-8.8a1.3 1.3 0 0 0 0-1.8z" fill="#F05032" />
      </svg>
    ),
    color: '#F05032',
  },
  {
    name: 'Python',
    icon: (
      <svg viewBox="0 0 24 24" className="w-5 h-5">
        <path d="M12 2C9.2 2 7 3.1 7 4.5V7h5v1H5.5C4.1 8 3 9.8 3 12s1.1 4 2.5 4H7v-2.5C7 12.1 9.2 11 12 11s5 1.1 5 2.5V17h1.5c1.4 0 2.5-1.8 2.5-4s-1.1-4-2.5-4H17V7h-5V6h5V4.5C17 3.1 14.8 2 12 2zm-1.5 1.5a.75.75 0 1 1 0 1.5.75.75 0 0 1 0-1.5z" fill="#3776AB" />
        <path d="M12 13c-2.8 0-5 1.1-5 2.5V18h5v1H7v1.5C7 21.9 9.2 23 12 23s5-1.1 5-2.5V17h-1.5c-1.4 0-2.5-1.8-2.5-4zm1.5 7.5a.75.75 0 1 1 0 1.5.75.75 0 0 1 0-1.5z" fill="#FFD43B" />
      </svg>
    ),
    color: '#3776AB',
  },
  {
    name: 'Node.js',
    icon: (
      <svg viewBox="0 0 24 24" className="w-5 h-5">
        <path d="M12 2L3 7v10l9 5 9-5V7L12 2zm0 2.3l6.5 3.6v7.2L12 18.7l-6.5-3.6V7.9L12 4.3z" fill="#339933" />
        <path d="M12 7l-4 2.2v4.6L12 16l4-2.2V9.2L12 7z" fill="#339933" opacity=".5" />
      </svg>
    ),
    color: '#339933',
  },
];

/**
 * TechOrbit — rotating orbital ring with tech icons around a central HM badge.
 * Icons orbit the ring; each icon counter-rotates so it stays upright.
 */
export default function TechOrbit() {
  const count = techItems.length;
  // Radius of the orbit ring in px (matches the SVG viewBox)
  const R = 130;
  const CENTER = 160; // SVG center (viewBox is 320x320)

  return (
    <div className="relative flex items-center justify-center select-none" aria-label="Tech stack orbit">
      {/* Outer glow halo */}
      <div className="absolute w-72 h-72 rounded-full bg-gradient-to-tr from-primary-glow-from/10 via-aurora-pink/5 to-aurora-teal/10 blur-2xl pointer-events-none" />

      {/* SVG orbit ring + icons */}
      <div
        className="relative w-80 h-80"
        style={{ animation: 'orbit-spin 18s linear infinite' }}
      >
        <svg
          viewBox="0 0 320 320"
          className="absolute inset-0 w-full h-full"
          aria-hidden="true"
        >
          {/* Dashed orbit ring */}
          <circle
            cx={CENTER}
            cy={CENTER}
            r={R}
            fill="none"
            stroke="rgba(108,99,255,0.18)"
            strokeWidth="1"
            strokeDasharray="4 6"
          />
          {/* Inner subtle ring */}
          <circle
            cx={CENTER}
            cy={CENTER}
            r={R * 0.55}
            fill="none"
            stroke="rgba(108,99,255,0.07)"
            strokeWidth="1"
          />
        </svg>

        {/* Tech icon nodes — positioned absolutely around the ring */}
        {techItems.map((tech, i) => {
          const angle = (i / count) * 360; // degrees
          const rad = (angle * Math.PI) / 180;
          // Position as % of the 320px container
          const x = CENTER + R * Math.cos(rad - Math.PI / 2); // start from top
          const y = CENTER + R * Math.sin(rad - Math.PI / 2);
          const leftPct = (x / 320) * 100;
          const topPct = (y / 320) * 100;

          return (
            <div
              key={tech.name}
              className="absolute flex items-center justify-center"
              style={{
                left: `${leftPct}%`,
                top: `${topPct}%`,
                transform: 'translate(-50%, -50%)',
              }}
            >
              {/* Counter-rotate so icon stays upright while ring spins */}
              <div
                className="w-10 h-10 rounded-full bg-white/90 border border-border-glow shadow-md flex items-center justify-center"
                style={{
                  animation: 'orbit-counter 18s linear infinite',
                  boxShadow: `0 0 10px ${tech.color}30`,
                }}
                title={tech.name}
              >
                {tech.icon}
              </div>
            </div>
          );
        })}
      </div>

      {/* Central HM badge — sits on top, does NOT rotate */}
      <div className="absolute flex items-center justify-center">
        <div
          className="w-20 h-20 rounded-full flex items-center justify-center shadow-xl"
          style={{
            background: 'linear-gradient(135deg, #6C63FF 0%, #A78BFA 50%, #45E5C8 100%)',
            boxShadow: '0 0 32px rgba(108,99,255,0.45), 0 0 64px rgba(108,99,255,0.15)',
          }}
        >
          <span
            className="text-white font-display font-bold text-xl tracking-widest"
            style={{ letterSpacing: '0.15em' }}
          >
            HM
          </span>
        </div>
      </div>
    </div>
  );
}
