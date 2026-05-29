import React, { useRef } from 'react';
import { experience } from '../../data/portfolioData';
import GlassCard from '../ui/GlassCard';
import useTextScramble from '../../hooks/useTextScramble';
import { FaBriefcase, FaGraduationCap, FaCertificate } from 'react-icons/fa';

const TYPE_CONFIG = {
  work: {
    icon: FaBriefcase,
    color: '#6C63FF',
    label: 'Work',
    border: 'border-[#6C63FF]/40',
    bg: 'bg-[#6C63FF]/10',
    text: 'text-[#6C63FF]',
  },
  education: {
    icon: FaGraduationCap,
    color: '#45E5C8',
    label: 'Education',
    border: 'border-[#45E5C8]/40',
    bg: 'bg-[#45E5C8]/10',
    text: 'text-[#45E5C8]',
  },
  certification: {
    icon: FaCertificate,
    color: '#FFB347',
    label: 'Certification',
    border: 'border-[#FFB347]/40',
    bg: 'bg-[#FFB347]/10',
    text: 'text-[#FFB347]',
  },
};

export default function Experience() {
  const scramble = useTextScramble('Experience', 600, true);

  return (
    <section
      id="experience"
      className="relative py-24 w-full bg-bg-ivory flex flex-col items-center justify-center overflow-hidden border-t border-border-glow/50"
    >
      <div className="w-full max-w-7xl mx-auto px-6 z-10">

        {/* Section Heading */}
        <div className="mb-12 text-left">
          <h2
            ref={scramble.ref}
            className="font-display text-4xl md:text-5xl font-bold text-text-primary tracking-tight"
          >
            {scramble.text}
          </h2>
          <div className="w-12 h-1 bg-gradient-to-r from-primary-glow-from to-primary-glow-to mt-2 rounded-full" />
        </div>

        {/* Timeline */}
        <div className="relative flex flex-col gap-0">
          {/* Vertical line */}
          <div className="absolute left-[19px] md:left-1/2 top-0 bottom-0 w-px bg-border-glow/50 -translate-x-1/2 hidden sm:block" />

          {experience.map((item, i) => {
            const cfg = TYPE_CONFIG[item.type] || TYPE_CONFIG.work;
            const Icon = cfg.icon;
            const isRight = i % 2 === 0;

            return (
              <div
                key={i}
                className={`relative flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-10 ${
                  isRight ? 'sm:flex-row' : 'sm:flex-row-reverse'
                }`}
              >
                {/* Content card — takes up ~45% on each side */}
                <div className={`w-full sm:w-[45%] ${isRight ? 'sm:text-right' : 'sm:text-left'}`}>
                  <GlassCard
                    className={`p-5 border ${cfg.border} hover:shadow-lg transition-all duration-300 group`}
                    hoverGlow
                  >
                    {/* Type badge */}
                    <span
                      className={`inline-flex items-center gap-1.5 text-[10px] font-code font-bold tracking-widest uppercase px-2 py-0.5 rounded-md ${cfg.bg} ${cfg.text} mb-3`}
                    >
                      <Icon size={10} />
                      {cfg.label}
                    </span>

                    <h3 className="font-display font-bold text-text-primary text-base leading-snug mb-0.5">
                      {item.title}
                    </h3>
                    <p className="text-xs font-code text-text-muted mb-1">{item.company}</p>
                    {item.location && (
                      <p className="text-[10px] font-code text-text-muted/70 mb-2">
                        📍 {item.location}
                      </p>
                    )}
                    {item.description && (
                      <p className="text-xs text-text-muted leading-relaxed font-body mt-2 border-t border-border-glow/40 pt-2">
                        {item.description}
                      </p>
                    )}
                  </GlassCard>
                </div>

                {/* Center dot + year */}
                <div className="hidden sm:flex flex-col items-center w-[10%] shrink-0 z-10">
                  <div
                    className="w-9 h-9 rounded-full border-2 flex items-center justify-center shadow-md bg-bg-ivory"
                    style={{ borderColor: cfg.color, boxShadow: `0 0 12px ${cfg.color}33` }}
                  >
                    <Icon size={14} style={{ color: cfg.color }} />
                  </div>
                  <span
                    className="font-accent text-xs mt-1.5 font-bold"
                    style={{ color: cfg.color }}
                  >
                    {item.year}
                  </span>
                </div>

                {/* Spacer for the other side */}
                <div className="hidden sm:block w-[45%]" />

                {/* Mobile: year badge */}
                <div className="sm:hidden flex items-center gap-2 -mt-2 ml-1">
                  <div
                    className="w-7 h-7 rounded-full border-2 flex items-center justify-center bg-bg-ivory shrink-0"
                    style={{ borderColor: cfg.color }}
                  >
                    <Icon size={11} style={{ color: cfg.color }} />
                  </div>
                  <span className="font-accent text-xs font-bold" style={{ color: cfg.color }}>
                    {item.year}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
