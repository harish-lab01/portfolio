import React, { useState, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { projects } from '../../data/portfolioData';
import { FiExternalLink, FiArrowUpRight, FiGlobe } from 'react-icons/fi';
import AuroraBlob from '../ui/AuroraBlob';

// ── images ─────────────────────────────────────────────────────────────────────
const IMG = {
  '00': 'https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=900&q=85',
  '01': 'https://images.unsplash.com/photo-1516302752625-fcc3c50ae61f?w=900&q=85',
  '02': 'https://images.unsplash.com/photo-1553877522-43269d4ea984?w=900&q=85',
  '03': 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=900&q=85',
  '04': 'https://images.unsplash.com/photo-1611746872915-64382b5c76da?w=900&q=85',
  '05': 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=900&q=85',
  '06': 'https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=900&q=85',
  '07': 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=900&q=85',
  '08': 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=900&q=85',
};

const personal = projects.filter(p => p.type === 'personal');
const company  = projects.filter(p => p.type === 'company');

// ── individual project card ────────────────────────────────────────────────────
function ProjectCard({ proj, size = 'normal', delay = 0 }) {
  const [hovered, setHovered] = useState(false);
  const accent = proj.accentColor;
  const isLarge = size === 'large';

  return (
    <motion.article
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      className="relative group rounded-3xl overflow-hidden cursor-default"
      style={{
        background: '#fff',
        border: `1.5px solid ${hovered ? accent + '35' : 'rgba(108,99,255,0.09)'}`,
        boxShadow: hovered
          ? `0 20px 60px ${accent}18, 0 4px 20px rgba(0,0,0,0.06)`
          : '0 2px 16px rgba(0,0,0,0.04)',
        transition: 'border-color 0.35s ease, box-shadow 0.35s ease',
        height: isLarge ? '100%' : 'auto',
      }}
    >
      {/* image */}
      <div
        className="relative overflow-hidden"
        style={{ height: isLarge ? 280 : 200 }}
      >
        <motion.img
          src={IMG[proj.id]}
          alt={proj.title}
          className="w-full h-full object-cover"
          animate={{ scale: hovered ? 1.05 : 1 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          style={{ filter: hovered ? 'brightness(0.82) saturate(1.1)' : 'brightness(0.88) saturate(0.95)' }}
        />

        {/* gradient overlay on image */}
        <div className="absolute inset-0"
          style={{ background: 'linear-gradient(to bottom, transparent 40%, rgba(0,0,0,0.55) 100%)' }} />

        {/* accent corner */}
        <motion.div
          className="absolute top-0 right-0 w-32 h-32 rounded-full blur-2xl"
          animate={{ opacity: hovered ? 1 : 0 }}
          transition={{ duration: 0.4 }}
          style={{ background: `${accent}30`, transform: 'translate(30%, -30%)' }}
        />

        {/* id ghost number */}
        <div className="absolute top-4 left-4 font-accent leading-none select-none"
          style={{ fontSize: '3.5rem', color: 'rgba(255,255,255,0.18)' }}>
          {proj.id}
        </div>

        {/* badges */}
        <div className="absolute top-4 right-4 flex flex-col gap-1.5 items-end">
          {proj.isLatest && (
            <span className="text-[8px] font-code font-bold tracking-widest uppercase px-2 py-0.5 rounded-md"
              style={{ color: '#fff', background: `${accent}dd` }}>✦ Latest</span>
          )}
          {proj.isOngoing && (
            <span className="text-[8px] font-code font-bold tracking-widest uppercase px-2 py-0.5 rounded-md animate-pulse"
              style={{ color: '#fff', background: `${accent}dd` }}>🚧 WIP</span>
          )}
          {proj.badge && !proj.isOngoing && (
            <span className="text-[8px] font-code font-bold px-2 py-0.5 rounded-md"
              style={{ color: '#fff', background: `${accent}cc` }}>{proj.badge}</span>
          )}
        </div>

        {/* title overlay on image bottom */}
        <div className="absolute bottom-0 left-0 right-0 px-5 pb-4">
          <p className="text-[10px] font-code tracking-widest uppercase mb-1"
            style={{ color: `${accent}cc` }}>{proj.category.split('·')[0].trim()}</p>
          <h3 className="font-display font-bold text-white leading-tight"
            style={{ fontSize: isLarge ? '1.7rem' : '1.25rem' }}>
            {proj.title}
          </h3>
        </div>
      </div>

      {/* body */}
      <div className="px-5 pt-4 pb-5 flex flex-col gap-4">
        <p className="font-body text-[13px] leading-relaxed text-text-muted line-clamp-3">
          {proj.description}
        </p>

        {/* highlight pill */}
        <div className="flex items-start gap-2 px-3 py-2.5 rounded-xl"
          style={{ background: `${accent}08`, border: `1.5px solid ${accent}18` }}>
          <span className="shrink-0 mt-0.5 text-sm" style={{ color: accent }}>✦</span>
          <p className="text-[11px] font-body leading-snug text-text-muted">{proj.highlight}</p>
        </div>

        {/* tags */}
        <div className="flex flex-wrap gap-1.5">
          {proj.tags.slice(0, isLarge ? 6 : 4).map(t => (
            <span key={t}
              className="text-[10px] font-code px-2.5 py-1 rounded-lg"
              style={{ color: '#555', background: '#F4F4F7', border: '1px solid rgba(108,99,255,0.1)' }}>
              {t}
            </span>
          ))}
        </div>

        {/* actions */}
        <div className="flex items-center gap-2 pt-1">
          {proj.links[0] ? (
            <a
              href={proj.links[0].url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 font-code text-xs font-semibold px-4 py-2 rounded-xl transition-all hover:scale-105 hover:brightness-110"
              style={{ background: accent, color: '#fff', boxShadow: `0 4px 14px ${accent}40` }}
            >
              <FiGlobe size={11} /> View Live
            </a>
          ) : (
            <span className="inline-flex items-center gap-1.5 font-code text-xs font-bold px-3 py-2 rounded-xl"
              style={{ color: accent, background: `${accent}10`, border: `1.5px solid ${accent}28` }}>
              🚧 In Progress
            </span>
          )}
          <button
            onClick={() => { const el = document.getElementById('casestudy'); if (el) el.scrollIntoView({ behavior: 'smooth' }); }}
            className="inline-flex items-center gap-1.5 font-code text-xs font-semibold px-4 py-2 rounded-xl transition-all hover:scale-105 ml-auto"
            style={{ color: accent, background: 'transparent', border: `1.5px solid ${accent}30` }}
          >
            <FiArrowUpRight size={11} /> Case Study
          </button>
        </div>
      </div>

      {/* hover accent bottom bar */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 h-[3px] rounded-b-3xl"
        style={{ background: `linear-gradient(90deg, ${accent}, ${accent}55)` }}
        animate={{ scaleX: hovered ? 1 : 0, originX: 0 }}
        transition={{ duration: 0.35 }}
      />
    </motion.article>
  );
}

// ── section title block ────────────────────────────────────────────────────────
function SectionBlock({ eyebrow, title, subtitle, accent, align = 'left' }) {
  return (
    <div className={`flex flex-col gap-2 ${align === 'right' ? 'items-end text-right' : ''}`}>
      <span className="inline-flex items-center gap-2 text-[10px] font-code font-bold tracking-[0.2em] uppercase"
        style={{ color: accent }}>
        <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: accent }} />
        {eyebrow}
      </span>
      <h3 className="font-display text-3xl sm:text-4xl font-bold text-text-primary leading-none">
        {title}
      </h3>
      <p className="font-body text-sm text-text-muted max-w-sm mt-1">{subtitle}</p>
    </div>
  );
}

// ── main component ─────────────────────────────────────────────────────────────
export default function Projects() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section id="projects" className="w-full bg-bg-ivory relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <AuroraBlob color="violet" size="w-[600px] h-[600px]" className="-top-40 -right-40" opacity="opacity-[0.04]" animationIndex={1} />
        <AuroraBlob color="pink"   size="w-[500px] h-[500px]" className="-bottom-20 -left-32"  opacity="opacity-[0.04]" animationIndex={2} />
      </div>

      {/* ── HEADER ── */}
      <div ref={ref} className="relative z-10 w-full max-w-7xl mx-auto px-5 sm:px-10 pt-20 pb-14 border-t border-border-glow/30">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col md:flex-row md:items-end md:justify-between gap-8"
        >
          <div>
            <span className="inline-flex items-center gap-2 text-[10px] font-code font-bold tracking-[0.2em] uppercase mb-5 text-primary-glow-from">
              <span className="w-1.5 h-1.5 rounded-full bg-primary-glow-from animate-pulse" />
              Portfolio
            </span>
            <h2 className="font-display text-5xl sm:text-6xl md:text-7xl font-bold leading-none tracking-tight text-text-primary">
              Things I've<br />
              <span className="bg-gradient-to-r from-primary-glow-from to-primary-glow-to bg-clip-text text-transparent">
                Built
              </span>
            </h2>
            <div className="w-16 h-1 bg-gradient-to-r from-primary-glow-from to-primary-glow-to rounded-full mt-5" />
            <p className="font-body text-sm text-text-muted mt-4 max-w-lg leading-relaxed">
              Products I designed and built to solve real problems — from personal experiments to production software.
            </p>
          </div>

          {/* stats row */}
          <div className="flex gap-10 sm:gap-14 shrink-0">
            {[
              { val: personal.length, label: 'Personal', color: '#A78BFA' },
              { val: company.length,  label: 'Company',  color: '#45E5C8' },
              { val: '4+',            label: 'Live',      color: '#FF6B9D' },
            ].map(({ val, label, color }) => (
              <div key={label} className="flex flex-col items-center gap-1">
                <span className="font-accent text-5xl font-bold leading-none" style={{ color }}>{val}</span>
                <span className="text-[10px] font-code uppercase tracking-widest text-text-muted">{label}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* ══════════════════════════════════════════
          COMPANY PROJECTS
      ══════════════════════════════════════════ */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-5 sm:px-10 pb-20">

        {/* company header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="mb-8"
        >
          <div className="flex items-center gap-4 mb-2">
            <div className="w-10 h-10 rounded-2xl flex items-center justify-center text-xl shrink-0"
              style={{ background: '#0D948815', border: '2px solid #0D948830' }}>
              🏢
            </div>
            <div>
              <div className="flex items-center gap-3">
                <span className="text-xs font-code font-bold tracking-[0.2em] uppercase" style={{ color: '#0D9488' }}>
                  Company Projects
                </span>
                <span className="font-accent text-2xl font-bold" style={{ color: '#0D948840' }}>
                  {String(company.length).padStart(2, '0')}
                </span>
              </div>
              <h3 className="font-display text-4xl sm:text-5xl md:text-6xl font-bold text-text-primary leading-none mt-1">
                Delivered at Vivify Technocrats
              </h3>
              <p className="text-sm font-body text-text-muted mt-2">
                Production software for real clients — live, used, and battle-tested.
              </p>
            </div>
          </div>
          <div className="h-px w-full mt-4" style={{ background: 'linear-gradient(to right, #0D948830, rgba(13,148,136,0.06) 60%, transparent)' }} />
        </motion.div>

        {/* company work strip — horizontal emphasis */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-20">
          {company.map((p, i) => (
            <ProjectCard key={p.id} proj={p} size="normal" delay={0.04 + i * 0.07} />
          ))}
        </div>

        {/* ══════════════════════════════════════════
            PERSONAL PROJECTS
        ══════════════════════════════════════════ */}

        {/* personal header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="mb-8"
        >
          <div className="flex items-center gap-4 mb-2">
            <div className="w-10 h-10 rounded-2xl flex items-center justify-center text-xl shrink-0"
              style={{ background: '#A78BFA15', border: '2px solid #A78BFA30' }}>
              🧑‍💻
            </div>
            <div>
              <div className="flex items-center gap-3">
                <span className="text-xs font-code font-bold tracking-[0.2em] uppercase" style={{ color: '#A78BFA' }}>
                  Personal Projects
                </span>
                <span className="font-accent text-2xl font-bold" style={{ color: '#A78BFA40' }}>
                  {String(personal.length).padStart(2, '0')}
                </span>
              </div>
              <h3 className="font-display text-4xl sm:text-5xl md:text-6xl font-bold text-text-primary leading-none mt-1">
                Built on My Own Time
              </h3>
              <p className="text-sm font-body text-text-muted mt-2">
                AI tools, real-time apps & side experiments — shipped because I wanted to.
              </p>
            </div>
          </div>
          <div className="h-px w-full mt-4" style={{ background: 'linear-gradient(to right, #A78BFA30, rgba(108,99,255,0.06) 60%, transparent)' }} />
        </motion.div>

        {/* PERSONAL BENTO GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {/* Card 0 — AI Second Brain — featured wide */}
          <div className="sm:col-span-2 lg:col-span-2">
            <ProjectCard proj={personal[0]} size="large" delay={0.05} />
          </div>

          {/* Card 1 — Soulify — tall */}
          <div>
            <ProjectCard proj={personal[1]} size="normal" delay={0.1} />
          </div>

          {/* Cards 2–4 — equal row */}
          {personal.slice(2).map((p, i) => (
            <ProjectCard key={p.id} proj={p} size="normal" delay={0.05 + i * 0.06} />
          ))}
        </div>
      </div>
    </section>
  );
}
