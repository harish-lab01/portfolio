import React, { useState, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { projects } from '../../data/portfolioData';
import { FiExternalLink, FiArrowRight, FiChevronDown, FiChevronUp } from 'react-icons/fi';

// ── images (reuse same map as Projects) ───────────────────────────────────────
const PROJECT_IMAGES = {
  '00': 'https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=1200&q=90',
  '01': 'https://images.unsplash.com/photo-1516302752625-fcc3c50ae61f?w=1200&q=90',
  '02': 'https://images.unsplash.com/photo-1553877522-43269d4ea984?w=1200&q=90',
  '03': 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=1200&q=90',
  '04': 'https://images.unsplash.com/photo-1611746872915-64382b5c76da?w=1200&q=90',
  '05': 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=1200&q=90',
  '06': 'https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=1200&q=90',
  '07': 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=1200&q=90',
  '08': 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=1200&q=90',
};

// ── tiny helper: section label ────────────────────────────────────────────────
function SectionLabel({ icon, label, color }) {
  return (
    <div className="flex items-center gap-2 mb-4">
      <div
        className="w-7 h-7 rounded-lg flex items-center justify-center text-sm shrink-0"
        style={{ background: `${color}18`, border: `1.5px solid ${color}30` }}
      >
        {icon}
      </div>
      <span
        className="text-[10px] font-code font-bold tracking-[0.18em] uppercase"
        style={{ color: `${color}cc` }}
      >
        {label}
      </span>
      <div className="flex-1 h-px ml-2" style={{ background: `linear-gradient(to right, ${color}30, transparent)` }} />
    </div>
  );
}

// ── architecture step ─────────────────────────────────────────────────────────
function ArchStep({ step, layer, detail, color, isLast }) {
  return (
    <div className="flex gap-4 items-stretch">
      <div className="flex flex-col items-center shrink-0">
        <div
          className="w-9 h-9 rounded-full flex items-center justify-center text-[11px] font-code font-bold shrink-0 z-10"
          style={{ background: `${color}20`, color, border: `2px solid ${color}50` }}
        >
          {step}
        </div>
        {!isLast && (
          <div
            className="w-px flex-1 mt-1"
            style={{ background: `linear-gradient(to bottom, ${color}40, transparent)`, minHeight: 24 }}
          />
        )}
      </div>
      <div className="flex-1 pb-5">
        <p className="text-xs font-code font-bold mb-1" style={{ color }}>
          {layer}
        </p>
        <p className="text-sm font-body leading-relaxed text-text-muted">{detail}</p>
      </div>
    </div>
  );
}

// ── challenge card ────────────────────────────────────────────────────────────
function ChallengeCard({ icon, title, desc, index, color }) {
  const [open, setOpen] = useState(false);
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.07, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      className="rounded-2xl overflow-hidden cursor-pointer"
      style={{ background: '#fff', border: `1.5px solid ${color}18`, boxShadow: `0 2px 16px ${color}08` }}
      onClick={() => setOpen(o => !o)}
    >
      <div className="flex items-center gap-4 p-4 sm:p-5">
        <div
          className="w-11 h-11 rounded-xl flex items-center justify-center text-xl shrink-0"
          style={{ background: `${color}10`, border: `1.5px solid ${color}25` }}
        >
          {icon}
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-[9px] font-code font-bold tracking-widest uppercase mb-0.5" style={{ color: `${color}99` }}>
            Challenge {String(index + 1).padStart(2, '0')}
          </p>
          <p className="text-sm font-code font-semibold text-text-primary leading-snug">{title}</p>
        </div>
        <div
          className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0 transition-all"
          style={{ background: `${color}10`, color }}
        >
          {open ? <FiChevronUp size={14} /> : <FiChevronDown size={14} />}
        </div>
      </div>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <div
              className="px-5 pb-5 pt-1 text-sm font-body leading-relaxed text-text-muted border-t"
              style={{ borderColor: `${color}15` }}
            >
              {desc}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

// ── main component ────────────────────────────────────────────────────────────
export default function CaseStudy() {
  const [selected, setSelected] = useState(0);
  const headerRef = useRef(null);
  const inView = useInView(headerRef, { once: true, margin: '-80px' });
  const proj = projects[selected];
  const cs = proj.caseStudy;
  const accent = proj.accentColor;
  const img = PROJECT_IMAGES[proj.id];

  return (
    <section id="casestudy" className="w-full bg-bg-ivory border-t border-border-glow/30">

      {/* ── Section Header ── */}
      <div
        ref={headerRef}
        className="w-full max-w-7xl mx-auto px-4 sm:px-8 pt-16 sm:pt-20 pb-10"
      >
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <span className="inline-flex items-center gap-1.5 text-[10px] font-code font-semibold tracking-widest text-primary-glow-from uppercase mb-4">
            <span className="w-1 h-1 rounded-full bg-primary-glow-from inline-block animate-pulse" />
            Product Thinking
          </span>
          <h2 className="font-display text-4xl sm:text-5xl md:text-6xl font-bold leading-none tracking-tight text-text-primary">
            Case{' '}
            <span className="bg-gradient-to-r from-primary-glow-from to-primary-glow-to bg-clip-text text-transparent">
              Studies
            </span>
          </h2>
          <div className="w-14 h-[3px] bg-gradient-to-r from-primary-glow-from to-primary-glow-to mt-4 rounded-full" />
          <p className="font-body text-text-muted text-sm mt-4 max-w-xl leading-relaxed">
            Every project starts with a problem. Here's how I think through architecture, tackle hard challenges, and ship solutions that actually work.
          </p>
        </motion.div>
      </div>

      {/* ── Project Selector Strip ── */}
      <div
        className="w-full border-y border-border-glow/30 overflow-x-auto"
        style={{ background: '#F6F6FC', scrollbarWidth: 'none' }}
      >
        <div className="flex w-max min-w-full px-4 sm:px-8">
          {projects.map((p, i) => (
            <button
              key={p.id}
              onClick={() => setSelected(i)}
              className="relative shrink-0 flex flex-col items-start gap-1 px-5 py-4 transition-all"
              style={{ minWidth: 140 }}
            >
              {/* active underline */}
              {i === selected && (
                <motion.div
                  layoutId="cs-selector"
                  className="absolute bottom-0 left-0 right-0 h-[3px] rounded-t-full"
                  style={{ background: accent }}
                  transition={{ type: 'spring', stiffness: 500, damping: 35 }}
                />
              )}
              <div className="flex items-center gap-2">
                <div
                  className="w-2 h-2 rounded-full shrink-0"
                  style={{
                    background: i === selected ? p.accentColor : 'rgba(0,0,0,0.12)',
                    boxShadow: i === selected ? `0 0 8px ${p.accentColor}88` : 'none',
                    transition: 'all 0.3s',
                  }}
                />
                <span
                  className="text-xs font-code font-semibold whitespace-nowrap transition-colors"
                  style={{ color: i === selected ? p.accentColor : '#888' }}
                >
                  {p.title}
                </span>
              </div>
              <span
                className="text-[9px] font-code pl-4 transition-colors line-clamp-1"
                style={{ color: i === selected ? `${p.accentColor}99` : '#bbb' }}
              >
                {p.id}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* ── Case Study Body ── */}
      <AnimatePresence mode="wait">
        <motion.div
          key={proj.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -12 }}
          transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
          className="w-full max-w-7xl mx-auto px-4 sm:px-8 py-10 sm:py-14"
        >

          {/* ── Hero Banner ── */}
          <div
            className="relative w-full rounded-3xl overflow-hidden mb-12"
            style={{ height: 'clamp(220px, 36vw, 420px)' }}
          >
            <img
              src={img}
              alt={proj.title}
              className="w-full h-full object-cover"
              style={{ filter: 'brightness(0.55) saturate(1.1)' }}
            />
            {/* gradient */}
            <div
              className="absolute inset-0"
              style={{
                background: `linear-gradient(120deg, rgba(8,8,20,0.92) 0%, rgba(8,8,20,0.55) 55%, ${accent}18 100%)`,
              }}
            />
            {/* accent glow corner */}
            <div
              className="absolute -bottom-20 -right-20 w-72 h-72 rounded-full blur-3xl pointer-events-none"
              style={{ background: `${accent}22` }}
            />

            {/* badges */}
            <div className="absolute top-5 left-6 flex flex-wrap gap-2">
              {proj.isLatest && (
                <span className="text-[9px] font-code font-bold tracking-widest uppercase px-2.5 py-1 rounded-lg animate-pulse"
                  style={{ color: '#fff', background: `${accent}cc`, border: `1px solid ${accent}` }}>
                  ✦ Latest
                </span>
              )}
              {proj.isOngoing && (
                <span className="text-[9px] font-code font-bold tracking-widest uppercase px-2.5 py-1 rounded-lg animate-pulse"
                  style={{ color: '#fff', background: `${accent}cc`, border: `1px solid ${accent}` }}>
                  🚧 In Progress
                </span>
              )}
              {proj.badge && !proj.isOngoing && (
                <span className="text-[9px] font-code font-bold px-2.5 py-1 rounded-lg"
                  style={{ color: '#fff', background: `${accent}88`, border: `1px solid ${accent}60` }}>
                  {proj.badge}
                </span>
              )}
            </div>

            {/* text */}
            <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-10">
              <p className="text-[10px] font-code tracking-widest uppercase mb-2" style={{ color: `${accent}cc` }}>
                {proj.category}
              </p>
              <h3 className="font-display text-3xl sm:text-5xl font-bold text-white leading-tight mb-2">
                {proj.title}
              </h3>
              {cs?.tagline && (
                <p className="font-body text-sm sm:text-base text-white/60 max-w-2xl">{cs.tagline}</p>
              )}
            </div>
          </div>

          {/* ── Stats Bar ── */}
          {cs?.stats && (
            <div
              className="grid grid-cols-5 gap-3 mb-12 p-4 sm:p-6 rounded-2xl"
              style={{ background: '#fff', border: `1.5px solid ${accent}18`, boxShadow: `0 4px 32px ${accent}08` }}
            >
              {cs.stats.map(({ val, label }) => (
                <div key={label} className="flex flex-col items-center gap-1.5 py-2">
                  <span className="font-accent text-xl sm:text-2xl font-bold leading-none" style={{ color: accent }}>
                    {val}
                  </span>
                  <span className="text-[9px] sm:text-[10px] font-code text-center leading-tight text-text-muted uppercase tracking-wider">
                    {label}
                  </span>
                </div>
              ))}
            </div>
          )}

          {/* ── Two-column content grid ── */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">

            {/* Problem */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="rounded-3xl p-6 sm:p-8 flex flex-col gap-5"
              style={{
                background: '#fff',
                border: `1.5px solid ${accent}18`,
                boxShadow: `0 4px 40px ${accent}08`,
              }}
            >
              <SectionLabel icon="🎯" label="The Problem" color={accent} />
              <div
                className="relative pl-4"
                style={{ borderLeft: `3px solid ${accent}40` }}
              >
                <p className="text-[15px] font-body leading-[1.8] text-text-muted">
                  {cs?.problem || proj.description}
                </p>
              </div>
            </motion.div>

            {/* Solution */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
              className="rounded-3xl p-6 sm:p-8 flex flex-col gap-5"
              style={{
                background: '#fff',
                border: `1.5px solid ${accent}18`,
                boxShadow: `0 4px 40px ${accent}08`,
              }}
            >
              <SectionLabel icon="💡" label="The Solution" color={accent} />
              <div
                className="relative pl-4"
                style={{ borderLeft: `3px solid ${accent}40` }}
              >
                <p className="text-[15px] font-body leading-[1.8] text-text-muted">
                  {cs?.solution || proj.highlight}
                </p>
              </div>
              {/* Highlight callout */}
              <div
                className="flex items-start gap-3 px-4 py-3.5 rounded-xl mt-1"
                style={{ background: `${accent}0c`, border: `1.5px solid ${accent}22` }}
              >
                <span style={{ color: accent }} className="shrink-0 mt-0.5">✦</span>
                <p className="text-xs font-body leading-snug text-text-muted">{proj.highlight}</p>
              </div>
            </motion.div>
          </div>

          {/* ── Challenges ── */}
          <div className="mb-12">
            <div className="flex items-center gap-3 mb-6">
              <div
                className="w-9 h-9 rounded-xl flex items-center justify-center text-lg shrink-0"
                style={{ background: `${accent}12`, border: `1.5px solid ${accent}28` }}
              >
                ⚡
              </div>
              <div>
                <h4 className="font-display text-xl font-bold text-text-primary">Technical Challenges</h4>
                <p className="text-[11px] font-code text-text-muted mt-0.5">What was difficult — and how I solved it</p>
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {(cs?.challenges || []).map((c, i) => (
                <ChallengeCard key={c.title} {...c} index={i} color={accent} />
              ))}
            </div>
          </div>

          {/* ── Architecture + Tech Stack ── */}
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 mb-12">

            {/* Architecture flow — 3 cols */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="lg:col-span-3 rounded-3xl p-6 sm:p-8"
              style={{
                background: '#fff',
                border: `1.5px solid ${accent}18`,
                boxShadow: `0 4px 40px ${accent}08`,
              }}
            >
              <SectionLabel icon="🏗️" label="Architecture & Data Flow" color={accent} />
              <div className="flex flex-col">
                {(cs?.architecture || []).map((a, i) => (
                  <ArchStep
                    key={a.step}
                    {...a}
                    color={accent}
                    isLast={i === (cs?.architecture?.length ?? 1) - 1}
                  />
                ))}
              </div>
            </motion.div>

            {/* Tech Stack — 2 cols */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="lg:col-span-2 rounded-3xl p-6 sm:p-8 flex flex-col gap-5"
              style={{
                background: '#fff',
                border: `1.5px solid ${accent}18`,
                boxShadow: `0 4px 40px ${accent}08`,
              }}
            >
              <SectionLabel icon="🧱" label="Tech Stack" color={accent} />
              <div className="flex flex-col gap-2">
                {(cs?.techStack || proj.tags.map(t => ({ layer: '', tech: t }))).map(({ layer, tech }) => (
                  <div
                    key={tech}
                    className="flex items-center justify-between gap-3 px-3 py-2.5 rounded-xl"
                    style={{ background: `${accent}06`, border: `1px solid ${accent}14` }}
                  >
                    {layer && (
                      <span className="text-[9px] font-code uppercase tracking-widest shrink-0" style={{ color: `${accent}88` }}>
                        {layer}
                      </span>
                    )}
                    <span className="text-xs font-code font-semibold text-text-primary ml-auto">{tech}</span>
                  </div>
                ))}
              </div>

              {/* Links */}
              {proj.links.length > 0 && (
                <div className="flex flex-col gap-2 mt-auto pt-4 border-t border-border-glow/30">
                  {proj.links.map((link, li) => (
                    <a
                      key={link.url}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-between gap-2 font-code text-xs font-semibold px-4 py-2.5 rounded-xl transition-all hover:scale-[1.02] hover:brightness-105 w-full"
                      style={li === 0
                        ? { background: accent, color: '#fff', boxShadow: `0 4px 16px ${accent}35` }
                        : { background: 'transparent', color: accent, border: `1.5px solid ${accent}40` }
                      }
                    >
                      <span>{link.label}</span>
                      <FiExternalLink size={11} />
                    </a>
                  ))}
                </div>
              )}
              {proj.isOngoing && (
                <div
                  className="flex items-center gap-2 justify-center font-code text-xs font-semibold px-4 py-2.5 rounded-xl mt-auto animate-pulse"
                  style={{ color: accent, background: `${accent}10`, border: `1.5px solid ${accent}30` }}
                >
                  🚧 Currently in Development
                </div>
              )}
            </motion.div>
          </div>

          {/* ── Next Project ── */}
          {selected < projects.length - 1 && (
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="flex justify-end"
            >
              <button
                onClick={() => { setSelected(s => s + 1); window.scrollTo({ top: document.getElementById('casestudy').offsetTop - 80, behavior: 'smooth' }); }}
                className="group inline-flex items-center gap-3 font-code text-sm font-semibold px-6 py-3.5 rounded-2xl transition-all hover:scale-105"
                style={{ background: '#fff', border: `1.5px solid ${accent}30`, color: accent, boxShadow: `0 4px 20px ${accent}10` }}
              >
                Next Case Study
                <span className="font-display font-bold">{projects[selected + 1]?.title}</span>
                <FiArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
              </button>
            </motion.div>
          )}

        </motion.div>
      </AnimatePresence>
    </section>
  );
}
