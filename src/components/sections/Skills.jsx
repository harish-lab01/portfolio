import React, { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { skills } from '../../data/portfolioData';
import { FiLayout, FiLink, FiZap, FiTool } from 'react-icons/fi';

const CATEGORY_META = {
  frontend: {
    label: 'Frontend Development',
    Icon: FiLayout,
    sub: 'UI · Styling · Frameworks',
  },
  integration: {
    label: 'API & Integration',
    Icon: FiLink,
    sub: 'REST · Auth · Firebase',
  },
  performance: {
    label: 'Performance',
    Icon: FiZap,
    sub: 'Optimization · State · Batching',
  },
  tools: {
    label: 'Dev Tools',
    Icon: FiTool,
    sub: 'Workflow · AI · Version Control',
  },
};

// ── Individual skill tag ─────────────────────────────────────────────────────
function SkillTag({ name, delay }) {
  const [hovered, setHovered] = useState(false);
  return (
    <motion.span
      initial={{ opacity: 0, y: 8 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay, ease: [0.22, 1, 0.36, 1] }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-body font-medium cursor-default select-none transition-all duration-200"
      style={{
        background: hovered ? 'rgba(108,99,255,0.2)' : 'rgba(255,255,255,0.06)',
        border: `1px solid ${hovered ? 'rgba(108,99,255,0.5)' : 'rgba(255,255,255,0.1)'}`,
        color: hovered ? '#A78BFA' : 'rgba(255,255,255,0.7)',
        boxShadow: hovered ? '0 4px 16px rgba(108,99,255,0.2)' : 'none',
        transform: hovered ? 'translateY(-2px)' : 'none',
      }}
    >
      <span
        className="w-1.5 h-1.5 rounded-full shrink-0 transition-colors duration-200"
        style={{ background: hovered ? '#A78BFA' : 'rgba(255,255,255,0.3)' }}
      />
      {name}
    </motion.span>
  );
}

// ── Single category card ─────────────────────────────────────────────────────
function SkillCard({ category, items, cardIndex }) {
  const meta = CATEGORY_META[category];
  const { Icon } = meta;
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 36 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: cardIndex * 0.1, ease: [0.22, 1, 0.36, 1] }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="relative rounded-3xl flex flex-col gap-5 p-7 transition-all duration-400"
      style={{
        background: hovered
          ? 'rgba(255,255,255,0.07)'
          : 'rgba(255,255,255,0.04)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        border: `1px solid ${hovered ? 'rgba(108,99,255,0.35)' : 'rgba(255,255,255,0.08)'}`,
        boxShadow: hovered
          ? '0 16px 48px rgba(108,99,255,0.15), 0 2px 8px rgba(0,0,0,0.3)'
          : '0 2px 12px rgba(0,0,0,0.2)',
        transform: hovered ? 'translateY(-4px)' : 'translateY(0)',
      }}
    >
      {/* Subtle top accent line */}
      <div
        className="absolute top-0 left-8 right-8 h-px rounded-full transition-opacity duration-400"
        style={{
          background: 'linear-gradient(90deg, transparent, rgba(108,99,255,0.4), transparent)',
          opacity: hovered ? 1 : 0.4,
        }}
      />

      {/* Card header */}
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div
            className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 transition-all duration-300"
            style={{
              background: hovered ? 'rgba(108,99,255,0.12)' : 'rgba(108,99,255,0.06)',
              border: '1px solid rgba(108,99,255,0.15)',
            }}
          >
            <Icon size={17} style={{ color: '#6C63FF' }} />
          </div>
          <div>
            <h3 className="font-display font-bold text-white text-base leading-tight">
              {meta.label}
            </h3>
            <p className="text-[10px] font-code text-white/40 mt-0.5 tracking-wide">
              {meta.sub}
            </p>
          </div>
        </div>
        <span
          className="text-[10px] font-code font-bold px-2.5 py-1 rounded-lg shrink-0"
          style={{
            color: '#6C63FF',
            background: 'rgba(108,99,255,0.07)',
            border: '1px solid rgba(108,99,255,0.15)',
          }}
        >
          {items.length}
        </span>
      </div>

      {/* Divider */}
      <div
        className="h-px w-full"
        style={{ background: 'linear-gradient(90deg, rgba(108,99,255,0.15), transparent)' }}
      />

      {/* Skill tags */}
      <div className="flex flex-wrap gap-2">
        {items.map((skill, i) => (
          <SkillTag
            key={skill}
            name={skill}
            delay={cardIndex * 0.06 + i * 0.04}
          />
        ))}
      </div>
    </motion.div>
  );
}

// ── Main section ─────────────────────────────────────────────────────────────
export default function Skills() {
  const sectionRef = useRef(null);
  const inView = useInView(sectionRef, { once: true, margin: '-80px' });
  const allSkills = Object.values(skills).flat();

  return (
    <section
      id="skills"
      ref={sectionRef}
      className="relative py-28 w-full overflow-hidden border-t border-white/5"
      style={{ background: 'linear-gradient(180deg, #0a0a0f 0%, #0d0d14 50%, #0a0a0f 100%)' }}
    >
      {/* Ambient glows */}
      <div className="pointer-events-none absolute -top-32 -right-32 w-[500px] h-[500px] rounded-full blur-[120px]"
        style={{ background: 'rgba(108,99,255,0.12)' }} />
      <div className="pointer-events-none absolute bottom-0 -left-20 w-[400px] h-[400px] rounded-full blur-[100px]"
        style={{ background: 'rgba(167,139,250,0.08)' }} />
      {/* Subtle dot grid */}
      <div className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(circle, rgba(108,99,255,0.08) 1px, transparent 1px)',
          backgroundSize: '36px 36px',
        }} />

      <div className="relative z-10 w-full max-w-7xl mx-auto px-6">

        {/* ── Header ── */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          className="mb-14"
        >
          {/* Label */}
          <span className="inline-flex items-center gap-1 text-[10px] font-code font-semibold tracking-widest text-primary-glow-from uppercase mb-4">
            <span className="w-1 h-1 rounded-full bg-primary-glow-from inline-block" />
            Technical Arsenal
          </span>

          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            <div>
              <h2 className="font-display text-4xl sm:text-5xl md:text-6xl font-bold text-white leading-none tracking-tight">
                Skills &{' '}
                <span className="bg-gradient-to-r from-primary-glow-from to-primary-glow-to bg-clip-text text-transparent">
                  Expertise
                </span>
              </h2>
              <div className="w-14 h-[3px] bg-gradient-to-r from-primary-glow-from to-primary-glow-to mt-4 rounded-full" />
              <p className="font-body text-white/40 text-sm mt-4 max-w-md leading-relaxed">
                Technologies and tools I use to build fast, beautiful, production-ready web applications.
              </p>
            </div>

            {/* Stats — same style as About stats row */}
            <div className="flex gap-8 shrink-0 sm:border-l sm:border-border-glow/40 sm:pl-8">
              {[
                { val: allSkills.length, label: 'Technologies' },
                { val: '4', label: 'Domains' },
                { val: '1+', label: 'Years Exp' },
              ].map(({ val, label }) => (
                <div key={label} className="text-center">
                  <div className="font-accent text-4xl font-bold text-primary-glow-from leading-none">{val}</div>
                  <div className="text-[10px] font-code text-white/40 uppercase tracking-widest mt-1">{label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Full-width border */}
          <div className="mt-10 h-px w-full bg-white/10" />
        </motion.div>

        {/* ── 2×2 card grid ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {Object.entries(skills).map(([category, items], i) => (
            <SkillCard
              key={category}
              category={category}
              items={items}
              cardIndex={i}
            />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="mt-14 border-t border-white/10 pt-10 relative overflow-hidden"
        >
          <div className="absolute left-0 top-0 bottom-0 w-16 z-10 pointer-events-none"
            style={{ background: 'linear-gradient(90deg, #0a0a0f, transparent)' }} />
          <div className="absolute right-0 top-0 bottom-0 w-16 z-10 pointer-events-none"
            style={{ background: 'linear-gradient(270deg, #0a0a0f, transparent)' }} />

          <div className="flex gap-3 animate-marquee whitespace-nowrap">
            {[...allSkills, ...allSkills].map((skill, i) => (
              <span
                key={i}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-code shrink-0"
                style={{
                  background: 'rgba(255,255,255,0.05)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  color: 'rgba(255,255,255,0.45)',
                }}
              >
                <span className="w-1 h-1 rounded-full bg-primary-glow-from/60" />
                {skill}
              </span>
            ))}
          </div>
        </motion.div>

      </div>
    </section>
  );
}
