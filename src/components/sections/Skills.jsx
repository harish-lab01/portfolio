import React, { useRef, useEffect, useState } from 'react';
import { skills } from '../../data/portfolioData';

// ── Skill proficiency map ────────────────────────────────────────────────────
const PROFICIENCY = {
  'React.js': 95, 'JavaScript ES6+': 92, 'HTML5': 98, 'CSS3': 90, 'Tailwind CSS': 93,
  'RESTful API': 88, '.NET API Consumption': 85, 'Axios/Fetch': 90,
  'Role-Based Auth': 82, 'Firebase Auth': 80, 'Firebase Realtime DB': 78,
  'React State Management': 87, 'Component Optimization': 83, 'API Call Batching': 79,
  'Git': 90, 'GitHub': 90, 'VS Code': 95, 'Node.js/npm': 82,
  'Cursor AI': 88, 'Claude AI': 85, 'Kiro': 80,
};

const CATEGORY_META = {
  frontend: {
    label: 'Frontend',
    emoji: '🎨',
    accent: '#6C63FF',
    desc: 'Crafting pixel-perfect, responsive interfaces',
  },
  integration: {
    label: 'API & Auth',
    emoji: '🔗',
    accent: '#FF6B9D',
    desc: 'Connecting frontends to powerful backends',
  },
  performance: {
    label: 'Performance',
    emoji: '⚡',
    accent: '#45E5C8',
    desc: 'Optimizing for speed and smooth UX',
  },
  tools: {
    label: 'Dev Tools',
    emoji: '🛠',
    accent: '#FFB347',
    desc: 'The toolkit that powers my workflow',
  },
};

// ── Animated skill bar ───────────────────────────────────────────────────────
function SkillBar({ name, value, accent, delay = 0 }) {
  const [width, setWidth] = useState(0);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setWidth(value), delay);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [value, delay]);

  return (
    <div ref={ref} className="group">
      <div className="flex justify-between items-center mb-1.5">
        <span className="text-sm font-body font-medium text-white/80 group-hover:text-white transition-colors duration-200">
          {name}
        </span>
        <span
          className="text-xs font-code font-bold tabular-nums"
          style={{ color: accent }}
        >
          {width}%
        </span>
      </div>
      <div className="h-1.5 w-full rounded-full bg-white/10 overflow-hidden">
        <div
          className="h-full rounded-full transition-all duration-1000 ease-out"
          style={{
            width: `${width}%`,
            background: `linear-gradient(90deg, ${accent}99, ${accent})`,
            boxShadow: `0 0 8px ${accent}66`,
          }}
        />
      </div>
    </div>
  );
}

// ── Category card ────────────────────────────────────────────────────────────
function CategoryCard({ category, items, meta, index }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className="relative rounded-2xl p-6 flex flex-col gap-5 cursor-default transition-all duration-500"
      style={{
        background: hovered
          ? `linear-gradient(135deg, rgba(13,13,13,0.95), rgba(13,13,13,0.85))`
          : 'rgba(13,13,13,0.7)',
        border: `1px solid ${hovered ? meta.accent + '55' : 'rgba(255,255,255,0.07)'}`,
        boxShadow: hovered ? `0 0 40px ${meta.accent}22, inset 0 0 30px ${meta.accent}08` : 'none',
        backdropFilter: 'blur(20px)',
        transform: hovered ? 'translateY(-4px)' : 'translateY(0)',
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Corner accent */}
      <div
        className="absolute top-0 right-0 w-20 h-20 rounded-bl-[60px] rounded-tr-2xl opacity-10 transition-opacity duration-500"
        style={{ background: meta.accent, opacity: hovered ? 0.15 : 0.06 }}
      />

      {/* Header */}
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          <div
            className="w-10 h-10 rounded-xl flex items-center justify-center text-xl shrink-0"
            style={{ background: `${meta.accent}18`, border: `1px solid ${meta.accent}33` }}
          >
            {meta.emoji}
          </div>
          <div>
            <h3 className="font-display font-bold text-white text-base leading-tight">
              {meta.label}
            </h3>
            <p className="text-[10px] font-code text-white/40 mt-0.5">{meta.desc}</p>
          </div>
        </div>
        <span
          className="text-[10px] font-code font-bold px-2 py-0.5 rounded-md shrink-0"
          style={{ color: meta.accent, background: `${meta.accent}18`, border: `1px solid ${meta.accent}30` }}
        >
          {items.length} skills
        </span>
      </div>

      {/* Skill bars */}
      <div className="flex flex-col gap-3">
        {items.map((skill, i) => (
          <SkillBar
            key={skill}
            name={skill}
            value={PROFICIENCY[skill] || 80}
            accent={meta.accent}
            delay={index * 100 + i * 80}
          />
        ))}
      </div>
    </div>
  );
}

// ── Main Skills section ──────────────────────────────────────────────────────
export default function Skills() {
  const [visible, setVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const allSkills = Object.values(skills).flat();
  const totalSkills = allSkills.length;

  return (
    <section
      id="skills"
      ref={sectionRef}
      className="relative py-28 w-full overflow-hidden"
      style={{ background: 'linear-gradient(180deg, #0a0a0f 0%, #0d0d14 50%, #0a0a0f 100%)' }}
    >
      {/* Ambient grid background */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(rgba(108,99,255,0.04) 1px, transparent 1px),
            linear-gradient(90deg, rgba(108,99,255,0.04) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px',
        }}
      />

      {/* Radial glow spots */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(108,99,255,0.12) 0%, transparent 70%)', filter: 'blur(40px)' }} />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(69,229,200,0.10) 0%, transparent 70%)', filter: 'blur(40px)' }} />
      <div className="absolute top-1/2 right-1/3 w-64 h-64 rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(255,107,157,0.08) 0%, transparent 70%)', filter: 'blur(40px)' }} />

      <div className="relative z-10 w-full max-w-7xl mx-auto px-6">

        {/* ── Section header ── */}
        <div
          className="mb-16 transition-all duration-700"
          style={{ opacity: visible ? 1 : 0, transform: visible ? 'translateY(0)' : 'translateY(30px)' }}
        >
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            <div>
              <span className="inline-flex items-center gap-2 text-[10px] font-code font-bold tracking-[0.3em] uppercase mb-3"
                style={{ color: '#6C63FF' }}>
                <span className="w-4 h-px bg-[#6C63FF]" />
                Technical Arsenal
                <span className="w-4 h-px bg-[#6C63FF]" />
              </span>
              <h2 className="font-display text-5xl md:text-6xl font-bold text-white leading-none tracking-tight">
                Skills &{' '}
                <span
                  className="relative inline-block"
                  style={{
                    background: 'linear-gradient(135deg, #6C63FF, #FF6B9D, #45E5C8)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                  }}
                >
                  Expertise
                </span>
              </h2>
              <p className="font-body text-white/40 text-sm mt-3 max-w-md">
                A curated breakdown of my technical proficiency across frontend, integration, performance, and tooling.
              </p>
            </div>

            {/* Stats strip */}
            <div className="flex gap-6 shrink-0">
              {[
                { val: totalSkills, label: 'Total Skills', color: '#6C63FF' },
                { val: '95%', label: 'React Mastery', color: '#FF6B9D' },
                { val: '1+', label: 'Years Pro', color: '#45E5C8' },
              ].map(({ val, label, color }) => (
                <div key={label} className="text-center">
                  <div className="font-accent text-3xl font-bold" style={{ color }}>{val}</div>
                  <div className="text-[10px] font-code text-white/40 mt-0.5 whitespace-nowrap">{label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Divider */}
          <div className="mt-8 h-px w-full"
            style={{ background: 'linear-gradient(90deg, transparent, rgba(108,99,255,0.4), rgba(255,107,157,0.3), rgba(69,229,200,0.3), transparent)' }} />
        </div>

        {/* ── Skill category cards grid ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {Object.entries(skills).map(([category, items], index) => {
            const meta = CATEGORY_META[category] || { label: category, emoji: '💡', accent: '#6C63FF', desc: '' };
            return (
              <div
                key={category}
                className="transition-all duration-700"
                style={{
                  opacity: visible ? 1 : 0,
                  transform: visible ? 'translateY(0)' : 'translateY(40px)',
                  transitionDelay: `${index * 120 + 200}ms`,
                }}
              >
                <CategoryCard category={category} items={items} meta={meta} index={index} />
              </div>
            );
          })}
        </div>

        {/* ── Bottom floating pill strip ── */}
        <div
          className="mt-12 flex flex-wrap justify-center gap-3 transition-all duration-700"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? 'translateY(0)' : 'translateY(20px)',
            transitionDelay: '700ms',
          }}
        >
          {allSkills.map((skill, i) => (
            <span
              key={skill}
              className="text-xs font-code px-3 py-1.5 rounded-full transition-all duration-300 hover:scale-105 cursor-default"
              style={{
                color: 'rgba(255,255,255,0.5)',
                background: 'rgba(255,255,255,0.04)',
                border: '1px solid rgba(255,255,255,0.08)',
              }}
              onMouseEnter={e => {
                const colors = ['#6C63FF', '#FF6B9D', '#45E5C8', '#FFB347'];
                const c = colors[i % colors.length];
                e.currentTarget.style.color = c;
                e.currentTarget.style.borderColor = c + '55';
                e.currentTarget.style.background = c + '12';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.color = 'rgba(255,255,255,0.5)';
                e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)';
                e.currentTarget.style.background = 'rgba(255,255,255,0.04)';
              }}
            >
              {skill}
            </span>
          ))}
        </div>

      </div>
    </section>
  );
}
