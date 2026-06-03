import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { projects } from '../../data/portfolioData';
import { FiExternalLink, FiCode, FiStar } from 'react-icons/fi';
import AuroraBlob from '../ui/AuroraBlob';
import BrowserMockup from '../ui/BrowserMockup';

const MOCKUP_TYPE = { '01': 'dashboard', '02': 'safety', '03': 'chat', '05': 'ecommerce', '06': 'aiShop' };

// ── Terminal mockup for JARVIS ───────────────────────────────────────────────
function TerminalMockup() {
  return (
    <div className="w-full rounded-2xl bg-[#0a0a0a] border border-white/10 p-6 font-code shadow-2xl">
      <div className="flex items-center gap-1.5 pb-3 border-b border-white/10 mb-5">
        <span className="w-3 h-3 rounded-full bg-red-500/80" />
        <span className="w-3 h-3 rounded-full bg-yellow-500/80" />
        <span className="w-3 h-3 rounded-full bg-green-500/80" />
        <span className="text-[11px] text-white/30 ml-3">jarvis@localhost:~</span>
      </div>
      <div className="text-sm flex flex-col gap-2">
        <p className="text-white/40">&gt; ollama run jarvis-model</p>
        <p className="text-green-400 animate-pulse">Initializing Jarvis AI assistant...</p>
        <p className="text-white/80 mt-1">✓ Local LLM Connection Established.</p>
        <p className="text-white/80">✓ Voice Automation Node Active.</p>
        <p className="text-purple-400 mt-3">&gt; Ask Jarvis: "Are you offline?"</p>
        <p className="text-amber-300">"Yes, running entirely offline on Ollama."</p>
      </div>
    </div>
  );
}

// ── Single project section ───────────────────────────────────────────────────
function ProjectSection({ proj, index }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-10%' });
  const isEven = index % 2 === 0;
  const isDark = proj.dark === true;

  return (
    <div
      ref={ref}
      id={`projects-${proj.id}`}
      className="relative w-full overflow-hidden"
      style={{
        background: isDark
          ? `linear-gradient(135deg, #0a0a0f 0%, #0d0d14 100%)`
          : index % 4 === 0
            ? '#FAFAF7'
            : index % 4 === 1
              ? '#F5F4FF'
              : index % 4 === 2
                ? '#FFF5F9'
                : '#F0FDFB',
      }}
    >
      {/* Accent glow */}
      <div
        className="absolute pointer-events-none"
        style={{
          width: '600px', height: '600px',
          borderRadius: '50%',
          background: `radial-gradient(circle, ${proj.accentColor}18 0%, transparent 65%)`,
          filter: 'blur(60px)',
          top: '50%', left: isEven ? '60%' : '10%',
          transform: 'translate(-50%, -50%)',
        }}
      />

      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 py-14 sm:py-24 lg:py-32">
        <div className={`grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center ${!isEven ? 'lg:[&>*:first-child]:order-2' : ''}`}>

          {/* ── Text side ── */}
          <motion.div
            initial={{ opacity: 0, x: isEven ? -40 : 40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col gap-6"
          >
            {/* Project number + category */}
            <div className="flex items-center gap-4">
              <span
                className="font-accent text-6xl font-bold leading-none select-none"
                style={{ color: `${proj.accentColor}20` }}
              >
                {proj.id}
              </span>
              <div className="flex flex-col gap-1">
                <span
                  className="text-[9px] font-code font-bold tracking-[0.25em] uppercase px-2.5 py-1 rounded-lg self-start"
                  style={{
                    color: proj.accentColor,
                    background: `${proj.accentColor}15`,
                    border: `1px solid ${proj.accentColor}30`,
                  }}
                >
                  {proj.category.split('·')[0].trim()}
                </span>
                {proj.badge && (
                  <span
                    className="text-[9px] font-code font-bold px-2.5 py-1 rounded-lg self-start"
                    style={{
                      color: proj.accentColor,
                      background: `${proj.accentColor}15`,
                      border: `1px solid ${proj.accentColor}30`,
                    }}
                  >
                    {proj.badge}
                  </span>
                )}
              </div>
            </div>

            {/* Title */}
            <div>
              <h3
                className="font-display font-bold text-3xl sm:text-4xl md:text-5xl leading-tight tracking-tight"
                style={{ color: isDark ? '#fff' : '#0D0D0D' }}
              >
                {proj.title}
              </h3>
              <div
                className="h-[3px] w-12 rounded-full mt-4"
                style={{ background: `linear-gradient(90deg, ${proj.accentColor}, ${proj.accentColor}55)` }}
              />
            </div>

            {/* Description */}
            <p
              className="font-body text-base leading-relaxed"
              style={{ color: isDark ? 'rgba(255,255,255,0.6)' : '#6B6B7B' }}
            >
              {proj.description}
            </p>

            {/* Highlight box */}
            <div
              className="flex items-start gap-3 px-4 py-3.5 rounded-2xl"
              style={{
                background: `${proj.accentColor}0d`,
                border: `1px solid ${proj.accentColor}25`,
              }}
            >
              <FiStar size={14} className="shrink-0 mt-0.5" style={{ color: proj.accentColor }} />
              <p
                className="text-sm font-body leading-snug"
                style={{ color: isDark ? 'rgba(255,255,255,0.6)' : '#6B6B7B' }}
              >
                {proj.highlight}
              </p>
            </div>

            {/* Tech stack */}
            <div className="flex flex-wrap gap-2">
              {proj.tags.map(tag => (
                <span
                  key={tag}
                  className="inline-flex items-center gap-1.5 text-xs font-code px-3 py-1.5 rounded-xl"
                  style={{
                    color: isDark ? 'rgba(255,255,255,0.5)' : '#6B6B7B',
                    background: isDark ? 'rgba(255,255,255,0.06)' : 'rgba(255,255,255,0.8)',
                    border: isDark ? '1px solid rgba(255,255,255,0.1)' : '1px solid rgba(108,99,255,0.12)',
                  }}
                >
                  <FiCode size={9} />
                  {tag}
                </span>
              ))}
            </div>

            {/* CTA */}
            {proj.links.length > 0 ? (
              <div className="flex flex-wrap gap-3 pt-2">
                {proj.links.map((link, li) => (
                  <a
                    key={link.url}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 font-code text-sm font-semibold px-6 py-3 rounded-2xl transition-all duration-200 hover:scale-105 hover:shadow-lg"
                    style={
                      li === 0
                        ? {
                            background: proj.accentColor,
                            color: '#fff',
                            boxShadow: `0 4px 20px ${proj.accentColor}40`,
                          }
                        : {
                            background: 'transparent',
                            color: proj.accentColor,
                            border: `1.5px solid ${proj.accentColor}50`,
                          }
                    }
                  >
                    <FiExternalLink size={14} />
                    {link.label}
                  </a>
                ))}
              </div>
            ) : proj.badge && (
              <span
                className="self-start text-xs font-code font-bold px-4 py-2 rounded-xl"
                style={{
                  color: proj.accentColor,
                  background: `${proj.accentColor}12`,
                  border: `1px solid ${proj.accentColor}30`,
                }}
              >
                {proj.badge}
              </span>
            )}
          </motion.div>

          {/* ── Visual side ── */}
          <motion.div
            initial={{ opacity: 0, x: isEven ? 40 : -40, scale: 0.95 }}
            animate={inView ? { opacity: 1, x: 0, scale: 1 } : {}}
            transition={{ duration: 0.75, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="flex items-center justify-center"
          >
            <div
              className="w-full rounded-3xl p-6 md:p-8"
              style={{
                background: isDark
                  ? 'rgba(255,255,255,0.03)'
                  : `linear-gradient(135deg, ${proj.accentColor}0a, ${proj.accentColor}18)`,
                border: `1px solid ${proj.accentColor}20`,
                boxShadow: `0 24px 80px ${proj.accentColor}18`,
              }}
            >
              {proj.id === '04'
                ? <TerminalMockup />
                : <BrowserMockup
                    url={proj.links[0]?.label || 'app.dev'}
                    type={MOCKUP_TYPE[proj.id] || 'dashboard'}
                    className="w-full"
                  />
              }
            </div>
          </motion.div>

        </div>
      </div>

      {/* Bottom separator */}
      <div
        className="absolute bottom-0 left-0 right-0 h-px"
        style={{
          background: `linear-gradient(90deg, transparent, ${proj.accentColor}30, transparent)`,
        }}
      />
    </div>
  );
}

// ── Main section ─────────────────────────────────────────────────────────────
export default function Projects() {
  const headerRef = useRef(null);
  const inView = useInView(headerRef, { once: true, margin: '-80px' });

  return (
    <div id="projects" className="w-full">

      {/* ── Section header ── */}
      <div
        ref={headerRef}
        className="relative w-full bg-bg-ivory border-t border-border-glow/40 overflow-hidden"
      >
        <AuroraBlob color="violet" size="w-[500px] h-[500px]" className="-top-32 -right-32" opacity="opacity-[0.06]" animationIndex={1} />

        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 py-14 sm:py-20">
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          >
            <span className="inline-flex items-center gap-1 text-[10px] font-code font-semibold tracking-widest text-primary-glow-from uppercase mb-4">
              <span className="w-1 h-1 rounded-full bg-primary-glow-from inline-block" />
              Engineering Showcases
            </span>

            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
              <div>
                <h2 className="font-display text-4xl sm:text-5xl md:text-6xl font-bold text-text-primary leading-none tracking-tight">
                  Featured{' '}
                  <span className="bg-gradient-to-r from-primary-glow-from to-primary-glow-to bg-clip-text text-transparent">
                    Projects
                  </span>
                </h2>
                <div className="w-14 h-[3px] bg-gradient-to-r from-primary-glow-from to-primary-glow-to mt-4 rounded-full" />
                <p className="font-body text-text-muted text-sm mt-4 max-w-lg leading-relaxed">
                  Production-grade applications I've designed, built, and shipped — each one live and battle-tested.
                </p>
              </div>

              <div className="flex gap-6 sm:gap-8 shrink-0 sm:border-l sm:border-border-glow/40 sm:pl-8">
                {[
                  { val: projects.length, label: 'Projects' },
                  { val: '4+', label: 'Live Apps' },
                  { val: '100%', label: 'Shipped' },
                ].map(({ val, label }) => (
                  <div key={label} className="text-center">
                    <div className="font-accent text-3xl sm:text-4xl font-bold text-primary-glow-from leading-none">{val}</div>
                    <div className="text-[10px] font-code text-text-muted uppercase tracking-widest mt-1">{label}</div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* ── Project sections ── */}
      {projects.map((proj, i) => (
        <ProjectSection key={proj.id} proj={proj} index={i} />
      ))}

    </div>
  );
}
