import React from 'react';

export default function SectionDots({ activeSection, sectionIds, sectionLabels }) {
  const handleClick = (e, id) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="fixed left-6 top-1/2 -translate-y-1/2 z-40 hidden lg:flex flex-col gap-4">
      {sectionIds.map((id, index) => {
        const isActive = activeSection === index;
        const isPast = index < activeSection;
        
        return (
          <a
            key={id}
            href={`#${id}`}
            onClick={(e) => handleClick(e, id)}
            className="group flex items-center gap-3 relative py-1"
            aria-label={`Scroll to ${sectionLabels[index]}`}
          >
            {/* Dot visual */}
            <span
              className={`
                w-2.5 h-2.5 rounded-full border transition-all duration-500
                ${
                  isActive
                    ? 'bg-primary-glow-from border-primary-glow-from scale-125 shadow-[0_0_8px_#6C63FF]'
                    : isPast
                    ? 'bg-text-muted/40 border-text-muted/20 scale-90'
                    : 'bg-transparent border-text-muted/30 hover:border-primary-glow-from'
                }
              `}
            />
            
            {/* Label tooltip */}
            <span className="absolute left-6 font-code text-[10px] font-bold tracking-widest uppercase text-text-muted opacity-0 translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 pointer-events-none bg-white/80 border border-border-glow/50 px-2 py-0.5 rounded shadow-sm">
              {sectionLabels[index]}
            </span>
          </a>
        );
      })}
    </div>
  );
}
