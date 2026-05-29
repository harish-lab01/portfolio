import React, { useRef, useEffect, useState } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { experience } from '../../data/portfolioData';
import { FaBriefcase, FaGraduationCap, FaCertificate } from 'react-icons/fa';
import GlassCard from '../ui/GlassCard';

const TYPE = {
  work: {
    Icon: FaBriefcase,
    accent: '#6C63FF',
    label: 'Work',
    bg: 'bg-[#6C63FF]/8',
    border: 'border-[#6C63FF]/25',
    text: 'text-[#6C63FF]',
    glow: 'shadow-[0_0_24px_rgba(108,99,255,0.15)]',
  },
  education: {
    Icon: FaGraduationCap,
    accent: '#45E5C8',
    label: 'Education',
    bg: 'bg-[#45E5C8]/8',
    border: 'border-[#45E5C8]/25',
    text: 'text-[#45E5C8]',
    glow: 'shadow-[0_0_24px_rgba(69,229,200,0.15)]',
  },
  certification: {
    Icon: FaCertificate,
    accent: '#FFB347',
    label: 'Certification',
    bg: 'bg-[#FFB347]/8',
    border: 'border-[#FFB347]/25',
    text: 'text-[#FFB347]',
    glow: 'shadow-[0_0_24px_rgba(255,179,71,0.15)]',
  },
};

// ── Mobile vertical card ─────────────────────────────────────────────────────
function MobileJourneyCard({ item, index }) {
  const cfg = TYPE[item.type] || TYPE.work;
  const { Icon } = cfg;
  const isLast = index === experience.length - 1;

  return (
    <div className="flex gap-4">
      <div className="flex flex-col items-center shrink-0">
        <div
          className="w-10 h-10 rounded-full flex items-center justify-center border-2 bg-bg-ivory shrink-0"
          style={{ borderColor: cfg.accent, boxShadow: `0 0 0 6px ${cfg.accent}15` }}
        >
          <Icon size={16} style={{ color: cfg.accent }} />
        </div>
        {!isLast && (
          <div className="w-px flex-1 mt-2 min-h-[40px]"
            style={{ background: `linear-gradient(180deg, ${cfg.accent}60, ${cfg.accent}10)` }} />
        )}
      </div>
      <div className="flex-1 pb-6">
        <GlassCard className={`p-5 border-2 ${cfg.border} ${cfg.glow}`} hoverGlow>
          <div className={`inline-flex items-center gap-1.5 text-[9px] font-code font-bold tracking-[0.2em] uppercase px-2.5 py-1 rounded-lg border mb-2 ${cfg.bg} ${cfg.text} ${cfg.border}`}>
            <Icon size={9} />{cfg.label}
          </div>
          <div className="font-accent text-3xl font-bold mb-2" style={{ color: cfg.accent }}>{item.year}</div>
          <h3 className="font-display font-bold text-text-primary text-base leading-tight mb-1">{item.title}</h3>
          <p className="text-sm font-body text-text-muted mb-1">{item.company}</p>
          {item.location && <p className="text-xs font-code text-text-muted/60 mb-2">📍 {item.location}</p>}
          {item.description && (
            <p className="text-xs font-body text-text-muted leading-relaxed border-t border-border-glow/40 pt-2 mt-2">
              {item.description}
            </p>
          )}
        </GlassCard>
      </div>
    </div>
  );
}

// ── Desktop horizontal card ──────────────────────────────────────────────────
function JourneyCard({ item, index }) {
  const cfg = TYPE[item.type] || TYPE.work;
  const { Icon } = cfg;

  return (
    <div className="flex flex-col items-center shrink-0" style={{ width: '380px' }}>
      <div className="relative w-full flex items-center mb-6">
        {index > 0 && (
          <div className="flex-1 h-px" style={{ background: `linear-gradient(90deg, transparent, ${cfg.accent}40)` }} />
        )}
        <div
          className="relative z-10 w-14 h-14 rounded-full flex items-center justify-center border-2 bg-bg-ivory shrink-0 mx-4"
          style={{ borderColor: cfg.accent, boxShadow: `0 0 0 8px ${cfg.accent}15` }}
        >
          <Icon size={20} style={{ color: cfg.accent }} />
          <span className="absolute inset-0 rounded-full animate-ping opacity-20"
            style={{ background: cfg.accent, animationDuration: '2.5s' }} />
        </div>
        {index < experience.length - 1 && (
          <div className="flex-1 h-px" style={{ background: `linear-gradient(90deg, ${cfg.accent}40, transparent)` }} />
        )}
      </div>
      <GlassCard className={`w-full p-6 border-2 transition-all duration-500 hover:-translate-y-2 ${cfg.border} ${cfg.glow}`} hoverGlow>
        <div className={`inline-flex items-center gap-1.5 text-[9px] font-code font-bold tracking-[0.2em] uppercase px-2.5 py-1 rounded-lg border mb-3 ${cfg.bg} ${cfg.text} ${cfg.border}`}>
          <Icon size={9} />{cfg.label}
        </div>
        <div className="font-accent text-4xl font-bold mb-3" style={{ color: cfg.accent }}>{item.year}</div>
        <h3 className="font-display font-bold text-text-primary text-lg leading-tight mb-2">{item.title}</h3>
        <p className="text-sm font-body text-text-muted mb-1">{item.company}</p>
        {item.location && <p className="text-xs font-code text-text-muted/60 mb-3">📍 {item.location}</p>}
        {item.description && (
          <p className="text-xs font-body text-text-muted leading-relaxed border-t border-border-glow/40 pt-3 mt-3">
            {item.description}
          </p>
        )}
      </GlassCard>
    </div>
  );
}

// ── Main section ─────────────────────────────────────────────────────────────
export default function Journey() {
  const sectionRef = useRef(null);
  const trackRef = useRef(null);
  const [scrollRange, setScrollRange] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  useEffect(() => {
    if (isMobile) return;
    const calculateRange = () => {
      if (trackRef.current) {
        const range = trackRef.current.scrollWidth - window.innerWidth;
        setScrollRange(range);
      }
    };
    const timer = setTimeout(calculateRange, 100);
    window.addEventListener('resize', calculateRange);
    return () => { clearTimeout(timer); window.removeEventListener('resize', calculateRange); };
  }, [isMobile]);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end end'],
  });
  const xRaw = useTransform(scrollYProgress, [0, 1], [0, -scrollRange]);
  const x = useSpring(xRaw, { stiffness: 100, damping: 30, mass: 0.5 });
  const sectionHeight = !isMobile && scrollRange > 0 ? scrollRange + window.innerHeight : undefined;

  // ── Mobile layout ──────────────────────────────────────────────────────────
  if (isMobile) {
    return (
      <section id="journey" className="relative bg-bg-ivory border-t border-border-glow/40 py-16 px-5 overflow-hidden">
        <div className="pointer-events-none absolute top-0 left-0 w-72 h-72 rounded-full blur-[80px]"
          style={{ background: 'radial-gradient(circle, rgba(108,99,255,0.06) 0%, transparent 70%)' }} />
        <div className="mb-10">
          <span className="inline-flex items-center gap-2 text-[10px] font-code font-bold tracking-[0.3em] uppercase text-primary-glow-from mb-3">
            <span className="w-4 h-px bg-primary-glow-from/60" />Career Path
          </span>
          <h2 className="font-display text-4xl font-bold text-text-primary leading-none tracking-tight mb-3">
            The Journey
          </h2>
          <div className="w-10 h-[3px] bg-gradient-to-r from-primary-glow-from to-primary-glow-to rounded-full mb-4" />
          <p className="font-body text-text-muted text-sm leading-relaxed">
            Every milestone that shaped who I am as a developer.
          </p>
        </div>
        <div className="flex flex-col">
          {experience.map((item, i) => (
            <MobileJourneyCard key={i} item={item} index={i} />
          ))}
        </div>
      </section>
    );
  }

  // ── Desktop horizontal scroll layout ──────────────────────────────────────
  return (
    <section
      id="journey"
      ref={sectionRef}
      className="relative bg-bg-ivory border-t border-border-glow/40"
      style={{ height: sectionHeight ? `${sectionHeight}px` : '300vh' }}
    >
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] rounded-full blur-[120px]"
            style={{ background: 'radial-gradient(circle, rgba(108,99,255,0.06) 0%, transparent 70%)' }} />
          <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] rounded-full blur-[100px]"
            style={{ background: 'radial-gradient(circle, rgba(69,229,200,0.05) 0%, transparent 70%)' }} />
        </div>

        <motion.div
          ref={trackRef}
          style={{ x }}
          className="absolute top-0 left-0 h-full flex items-center gap-16 will-change-transform"
        >
          <div className="shrink-0" style={{ width: '10vw' }} />
          <div className="shrink-0 flex flex-col justify-center" style={{ width: '500px' }}>
            <span className="inline-flex items-center gap-2 text-[10px] font-code font-bold tracking-[0.3em] uppercase text-primary-glow-from mb-4">
              <span className="w-4 h-px bg-primary-glow-from/60" />Career Path
            </span>
            <h2 className="font-display text-6xl md:text-7xl font-bold text-text-primary leading-none tracking-tight mb-5">
              The<br />Journey
            </h2>
            <div className="w-12 h-[3px] bg-gradient-to-r from-primary-glow-from to-primary-glow-to rounded-full mb-6" />
            <p className="font-body text-text-muted text-base leading-relaxed max-w-md">
              Every milestone — from first lecture to shipping production code — that shaped who I am as a developer.
            </p>
            <div className="mt-8 flex items-center gap-3 text-xs font-code text-text-muted">
              <span className="animate-pulse">→</span>
              <span>Scroll to explore timeline</span>
            </div>
          </div>

          {experience.map((item, i) => (
            <JourneyCard key={i} item={item} index={i} />
          ))}

          <div className="shrink-0 flex flex-col justify-center gap-6" style={{ width: '400px' }}>
            <div className="text-center">
              <div className="font-accent text-6xl font-bold text-primary-glow-from mb-2">{experience.length}</div>
              <div className="text-sm font-code text-text-muted uppercase tracking-widest">Key Milestones</div>
            </div>
            <GlassCard className="p-6 text-center border border-border-glow/40">
              <p className="text-xs font-body text-text-muted leading-relaxed">
                From 2020 to 2025, a journey of continuous learning, building, and shipping production-grade applications.
              </p>
            </GlassCard>
          </div>
          <div className="shrink-0" style={{ width: '10vw' }} />
        </motion.div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-2 z-20">
          {experience.map((_, i) => {
            const start = i / (experience.length + 1);
            const end = (i + 1) / (experience.length + 1);
            return (
              <motion.div key={i} className="rounded-full transition-all duration-300"
                style={{ width: 8, height: 8, background: '#6C63FF',
                  opacity: useTransform(scrollYProgress, [start, end], [0.3, 1]) }} />
            );
          })}
        </div>
      </div>
    </section>
  );
}
