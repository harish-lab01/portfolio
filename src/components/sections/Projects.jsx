import React, { useRef, useState, useEffect, useCallback } from 'react';
import { motion, useInView, AnimatePresence, useMotionValue, useTransform, useSpring } from 'framer-motion';
import { projects } from '../../data/portfolioData';
import {
  FiExternalLink, FiCode, FiX, FiZap, FiLayers,
  FiChevronLeft, FiChevronRight, FiArrowUpRight, FiGlobe
} from 'react-icons/fi';
import AuroraBlob from '../ui/AuroraBlob';

// ── Real project images (bright, high-quality) ────────────────────────────────
const PROJECT_IMAGES = {
  '00': 'https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=900&q=90',  // AI/neural - vibrant purple
  '01': 'https://images.unsplash.com/photo-1553877522-43269d4ea984?w=900&q=90',   // HR team collaboration
  '02': 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=900&q=90', // workplace/safety
  '03': 'https://images.unsplash.com/photo-1611746872915-64382b5c76da?w=900&q=90', // chat/messaging
  '04': 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=900&q=90', // terminal/code matrix
  '05': 'https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=900&q=90', // ecommerce shopping
  '06': 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=900&q=90', // AI robot/tech
};

// ── AI Second Brain detail data ───────────────────────────────────────────────
const AI_SECOND_BRAIN_DETAILS = {
  tagline: "Turn passive saving into an active, conversational knowledge base.",
  techStack: [
    { layer: "Frontend", tech: "React 18 + Vite" },
    { layer: "Styling", tech: "Tailwind CSS" },
    { layer: "State", tech: "Zustand" },
    { layer: "Auth", tech: "Firebase Authentication" },
    { layer: "Database", tech: "Firestore — real-time NoSQL" },
    { layer: "AI Chat", tech: "Groq llama-3.3-70b" },
    { layer: "Semantic", tech: "Hugging Face embeddings" },
    { layer: "Graph", tech: "react-force-graph-2d" },
    { layer: "PWA", tech: "vite-plugin-pwa + Workbox" },
    { layer: "Deploy", tech: "Vercel" },
  ],
  features: [
    { icon: "📄", title: "Multi-format Capture", desc: "Text, PDFs, and web URLs — auto-analyzed on save." },
    { icon: "🤖", title: "AI Auto-Analysis", desc: "Summary, tags, and related notes generated instantly." },
    { icon: "🔍", title: "Semantic Vector Search", desc: "40% keyword + 60% vector finds conceptually linked notes." },
    { icon: "💬", title: "Chat with Your Knowledge", desc: "Your notes become the AI's context before any LLM call." },
    { icon: "🕸️", title: "Knowledge Graph", desc: "WebGL force-directed graph of all notes and relationships." },
    { icon: "🔁", title: "Spaced Repetition", desc: "SM-2 scheduling with AI-generated flashcards." },
    { icon: "📁", title: "Collections", desc: "Group notes with custom colors and emoji icons." },
    { icon: "🎙️", title: "Voice Input", desc: "Web Speech API — dictate notes or chat messages." },
    { icon: "📱", title: "PWA — Installable", desc: "Offline-capable, installable on mobile and desktop." },
    { icon: "🌐", title: "Public Sharing", desc: "One-click publish any note to a public URL." },
  ],
  numbers: [
    { val: "44", label: "Source Files" },
    { val: "12", label: "Features" },
    { val: "5", label: "DB Collections" },
    { val: "2", label: "AI APIs" },
    { val: "0", label: "Lint Errors" },
  ],
};

// ── 3D tilt wrapper ───────────────────────────────────────────────────────────
function TiltCard({ children, className = '', style = {}, disabled = false }) {
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [6, -6]), { stiffness: 400, damping: 40 });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-6, 6]), { stiffness: 400, damping: 40 });

  const handleMouse = useCallback((e) => {
    if (disabled) return;
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
  }, [x, y, disabled]);

  const handleLeave = useCallback(() => {
    x.set(0); y.set(0);
  }, [x, y]);

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouse}
      onMouseLeave={handleLeave}
      style={{ rotateX: disabled ? 0 : rotateX, rotateY: disabled ? 0 : rotateY, transformStyle: 'preserve-3d', ...style }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// ── Project Detail Modal ──────────────────────────────────────────────────────
function ProjectDetailModal({ proj, onClose }) {
  useEffect(() => {
    const h = (e) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', h);
    return () => window.removeEventListener('keydown', h);
  }, [onClose]);
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, []);

  const details = AI_SECOND_BRAIN_DETAILS;
  const img = PROJECT_IMAGES[proj.id];

  return (
    <motion.div
      className="fixed inset-0 z-[9999] flex items-end sm:items-center justify-center p-0 sm:p-4"
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
    >
      <div className="absolute inset-0 bg-black/40 backdrop-blur-md" onClick={onClose} />

      <motion.div
        className="relative w-full sm:max-w-2xl max-h-[92vh] overflow-y-auto rounded-t-3xl sm:rounded-3xl shadow-2xl"
        style={{ background: '#fff', border: '1px solid rgba(108,99,255,0.12)', boxShadow: `0 40px 120px rgba(0,0,0,0.18), 0 0 0 1px rgba(108,99,255,0.08)` }}
        initial={{ y: 80, opacity: 0 }} animate={{ y: 0, opacity: 1 }}
        exit={{ y: 80, opacity: 0 }}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      >
        {/* Hero image */}
        <div className="relative h-48 sm:h-56 w-full overflow-hidden rounded-t-3xl">
          <img src={img} alt={proj.title} className="w-full h-full object-cover" />
          <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, rgba(0,0,0,0.15) 0%, rgba(255,255,255,0.95) 100%)' }} />
          <button
            onClick={onClose}
            className="absolute top-3 right-3 p-2 rounded-xl bg-white/80 backdrop-blur-sm transition hover:scale-110 hover:bg-white shadow-sm"
            style={{ border: '1px solid rgba(0,0,0,0.1)', color: '#333' }}
          >
            <FiX size={16} />
          </button>
          <div className="absolute bottom-3 left-4 flex flex-wrap gap-1.5">
            {proj.isLatest && (
              <span className="text-[9px] font-code font-bold tracking-widest uppercase px-2.5 py-1 rounded-lg animate-pulse shadow-sm"
                style={{ color: '#fff', background: `linear-gradient(90deg, ${proj.accentColor}, ${proj.accentColor}cc)` }}>
                ✦ Latest Project
              </span>
            )}
            {proj.badge && (
              <span className="text-[9px] font-code font-bold px-2.5 py-1 rounded-lg shadow-sm"
                style={{ color: proj.accentColor, background: '#fff', border: `1.5px solid ${proj.accentColor}40` }}>
                {proj.badge}
              </span>
            )}
          </div>
        </div>

        <div className="px-5 sm:px-7 py-6 flex flex-col gap-6">
          <div>
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-text-primary">{proj.title}</h2>
            {proj.id === '00' && (
              <p className="text-sm font-body mt-1.5 text-text-muted">{details.tagline}</p>
            )}
          </div>

          {proj.id === '00' && (
            <div className="grid grid-cols-5 gap-2">
              {details.numbers.map(({ val, label }) => (
                <div key={label} className="flex flex-col items-center gap-1 py-3 rounded-2xl"
                  style={{ background: `${proj.accentColor}0d`, border: `1.5px solid ${proj.accentColor}20` }}>
                  <span className="font-accent text-xl font-bold" style={{ color: proj.accentColor }}>{val}</span>
                  <span className="text-[8px] font-code text-center leading-tight text-text-muted">{label}</span>
                </div>
              ))}
            </div>
          )}

          {/* Tech Stack */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <FiLayers size={13} style={{ color: proj.accentColor }} />
              <span className="text-[10px] font-code font-bold tracking-widest uppercase" style={{ color: proj.accentColor }}>Tech Stack</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {(proj.id === '00' ? details.techStack.map(t => t.tech) : proj.tags).map((t) => (
                <span key={t} className="text-xs font-code px-2.5 py-1 rounded-lg"
                  style={{ color: '#444', background: '#F4F4F7', border: '1px solid rgba(108,99,255,0.12)' }}>
                  {t}
                </span>
              ))}
            </div>
          </div>

          {proj.id === '00' && (
            <div>
              <div className="flex items-center gap-2 mb-3">
                <FiZap size={13} style={{ color: proj.accentColor }} />
                <span className="text-[10px] font-code font-bold tracking-widest uppercase" style={{ color: proj.accentColor }}>Core Features</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {details.features.map(({ icon, title, desc }) => (
                  <div key={title} className="flex items-start gap-2.5 px-3 py-2.5 rounded-xl"
                    style={{ background: '#FAFAF7', border: `1.5px solid ${proj.accentColor}15` }}>
                    <span className="text-sm shrink-0">{icon}</span>
                    <div>
                      <p className="text-[11px] font-code font-semibold text-text-primary leading-snug">{title}</p>
                      <p className="text-[10px] font-body text-text-muted mt-0.5 leading-snug">{desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {proj.id !== '00' && (
            <p className="text-sm font-body text-text-muted leading-relaxed">{proj.description}</p>
          )}

          <div className="flex flex-wrap gap-3 pt-1 pb-2">
            {proj.links.map((link, li) => (
              <a key={link.url} href={link.url} target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-2 font-code text-sm font-semibold px-5 py-2.5 rounded-2xl transition-all duration-200 hover:scale-105 hover:shadow-lg"
                style={li === 0
                  ? { background: proj.accentColor, color: '#fff', boxShadow: `0 4px 20px ${proj.accentColor}40` }
                  : { background: 'transparent', color: proj.accentColor, border: `1.5px solid ${proj.accentColor}50` }
                }>
                <FiExternalLink size={13} />
                {link.label}
              </a>
            ))}
            {proj.links.length === 0 && (
              <span className="inline-flex items-center gap-2 font-code text-xs font-bold px-4 py-2 rounded-xl"
                style={{ color: proj.accentColor, background: `${proj.accentColor}10`, border: `1.5px solid ${proj.accentColor}30` }}>
                {proj.badge}
              </span>
            )}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

// ── Single Project Card ───────────────────────────────────────────────────────
function ProjectCard({ proj, index, onOpen, isActive, onClick }) {
  const img = PROJECT_IMAGES[proj.id];

  return (
    <motion.div
      onClick={onClick}
      className="relative shrink-0 cursor-pointer group"
      style={{
        width: isActive ? 'min(480px, 82vw)' : '180px',
        transition: 'width 0.5s cubic-bezier(0.22,1,0.36,1)',
      }}
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, delay: index * 0.06 }}
    >
      <TiltCard
        disabled={!isActive}
        className="relative w-full rounded-2xl overflow-hidden"
        style={{
          height: '400px',
          border: isActive
            ? `2px solid ${proj.accentColor}50`
            : '2px solid rgba(108,99,255,0.10)',
          boxShadow: isActive
            ? `0 24px 60px ${proj.accentColor}22, 0 2px 12px rgba(0,0,0,0.08)`
            : '0 2px 12px rgba(0,0,0,0.06)',
          background: '#fff',
          transition: 'box-shadow 0.4s ease, border-color 0.4s ease',
        }}
      >
        {/* ── Image — FULL brightness on all cards ── */}
        <div className="absolute inset-0 overflow-hidden">
          <img
            src={img}
            alt={proj.title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
            style={{
              filter: isActive ? 'brightness(0.72) saturate(1.15)' : 'brightness(0.88) saturate(1.0)',
              transition: 'filter 0.5s ease, transform 0.7s ease',
            }}
          />
          {/* Bottom gradient so text is always readable */}
          <div
            className="absolute inset-0"
            style={{
              background: isActive
                ? 'linear-gradient(to top, rgba(10,10,20,0.88) 35%, rgba(0,0,0,0.15) 70%, transparent 100%)'
                : 'linear-gradient(to top, rgba(10,10,20,0.75) 45%, rgba(0,0,0,0.05) 100%)',
              transition: 'background 0.5s ease',
            }}
          />
        </div>

        {/* Accent dot top-right */}
        <div
          className="absolute top-3.5 right-3.5 w-2.5 h-2.5 rounded-full"
          style={{
            background: proj.accentColor,
            boxShadow: `0 0 10px ${proj.accentColor}cc`,
            opacity: isActive ? 1 : 0.6,
            transition: 'opacity 0.3s',
          }}
        />

        {/* Index number */}
        <div
          className="absolute top-3.5 left-4 font-accent leading-none select-none"
          style={{
            fontSize: isActive ? '3rem' : '2.2rem',
            color: isActive ? `${proj.accentColor}50` : 'rgba(255,255,255,0.25)',
            transition: 'all 0.4s ease',
          }}
        >
          {proj.id}
        </div>

        {/* Bottom content */}
        <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-5 flex flex-col gap-2.5">

          {/* Badge */}
          {proj.badge && isActive && (
            <motion.span
              initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }}
              className="text-[9px] font-code font-bold tracking-widest uppercase px-2.5 py-1 rounded-lg self-start backdrop-blur-sm"
              style={{ color: '#fff', background: `${proj.accentColor}cc`, border: `1px solid ${proj.accentColor}` }}
            >
              {proj.badge}
            </motion.span>
          )}

          {/* Title */}
          <h3
            className="font-display font-bold text-white leading-tight"
            style={{
              fontSize: isActive ? '1.45rem' : '1rem',
              textShadow: '0 2px 8px rgba(0,0,0,0.5)',
              transition: 'font-size 0.4s ease',
            }}
          >
            {proj.title}
          </h3>

          {/* Description — active only */}
          {isActive && (
            <motion.p
              initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              transition={{ delay: 0.08 }}
              className="font-body text-[13px] leading-relaxed"
              style={{ color: 'rgba(255,255,255,0.72)' }}
            >
              {proj.description.slice(0, 110)}…
            </motion.p>
          )}

          {/* Tags — active only */}
          {isActive && (
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              transition={{ delay: 0.12 }}
              className="flex flex-wrap gap-1.5"
            >
              {proj.tags.slice(0, 4).map(tag => (
                <span key={tag}
                  className="text-[9px] font-code px-2 py-0.5 rounded-md backdrop-blur-sm"
                  style={{ color: 'rgba(255,255,255,0.75)', background: 'rgba(255,255,255,0.14)', border: '1px solid rgba(255,255,255,0.2)' }}>
                  {tag}
                </span>
              ))}
            </motion.div>
          )}

          {/* Action buttons — active only */}
          {isActive && (
            <motion.div
              initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.16 }}
              className="flex gap-2"
            >
              {proj.links[0] && (
                <a
                  href={proj.links[0].url}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={e => e.stopPropagation()}
                  className="inline-flex items-center gap-1.5 font-code text-xs font-semibold px-3.5 py-2 rounded-xl transition-all hover:scale-105 hover:brightness-110"
                  style={{ background: proj.accentColor, color: '#fff', boxShadow: `0 4px 14px ${proj.accentColor}55` }}
                >
                  <FiGlobe size={11} />
                  View Live
                </a>
              )}
              <button
                onClick={e => { e.stopPropagation(); onOpen(proj); }}
                className="inline-flex items-center gap-1.5 font-code text-xs font-semibold px-3.5 py-2 rounded-xl transition-all hover:scale-105 backdrop-blur-sm"
                style={{ background: 'rgba(255,255,255,0.15)', color: '#fff', border: '1px solid rgba(255,255,255,0.3)' }}
              >
                <FiArrowUpRight size={11} />
                Details
              </button>
            </motion.div>
          )}

          {/* Collapsed hover hint */}
          {!isActive && (
            <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
              <div className="w-3 h-px" style={{ background: proj.accentColor }} />
              <span className="text-[9px] font-code text-white/60">expand</span>
            </div>
          )}
        </div>
      </TiltCard>
    </motion.div>
  );
}

// ── Main Projects Section ─────────────────────────────────────────────────────
export default function Projects() {
  const headerRef = useRef(null);
  const trackRef = useRef(null);
  const inView = useInView(headerRef, { once: true, margin: '-80px' });
  const [activeIndex, setActiveIndex] = useState(0);
  const [detailProj, setDetailProj] = useState(null);

  const scrollTo = (dir) => {
    setActiveIndex(prev => Math.max(0, Math.min(projects.length - 1, prev + dir)));
  };

  useEffect(() => {
    const h = (e) => {
      if (e.key === 'ArrowRight') scrollTo(1);
      if (e.key === 'ArrowLeft') scrollTo(-1);
    };
    window.addEventListener('keydown', h);
    return () => window.removeEventListener('keydown', h);
  }, []);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const cards = track.querySelectorAll('[data-card]');
    if (cards[activeIndex]) {
      cards[activeIndex].scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
    }
  }, [activeIndex]);

  const activeProj = projects[activeIndex];

  return (
    <div id="projects" className="w-full bg-bg-ivory">

      {/* ── Section Header ── */}
      <div
        ref={headerRef}
        className="relative w-full overflow-hidden border-t border-border-glow/40"
      >
        <AuroraBlob color="violet" size="w-[500px] h-[500px]" className="-top-32 -right-32" opacity="opacity-[0.05]" animationIndex={1} />

        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-8 py-14 sm:py-20">
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col md:flex-row md:items-end md:justify-between gap-8"
          >
            <div>
              <span className="inline-flex items-center gap-1.5 text-[10px] font-code font-semibold tracking-widest text-primary-glow-from uppercase mb-4">
                <span className="w-1 h-1 rounded-full bg-primary-glow-from inline-block animate-pulse" />
                Engineering Showcases
              </span>
              <h2 className="font-display text-4xl sm:text-5xl md:text-6xl font-bold leading-none tracking-tight text-text-primary">
                Featured{' '}
                <span className="bg-gradient-to-r from-primary-glow-from to-primary-glow-to bg-clip-text text-transparent">
                  Projects
                </span>
              </h2>
              <div className="w-14 h-[3px] bg-gradient-to-r from-primary-glow-from to-primary-glow-to mt-4 rounded-full" />
              <p className="font-body text-text-muted text-sm mt-4 max-w-lg leading-relaxed">
                Production-grade applications I've designed, built, and shipped — each one live and battle-tested.
                <span className="text-primary-glow-from"> Click a card to explore.</span>
              </p>
            </div>

            {/* Stats + navigation */}
            <div className="flex flex-col gap-4 shrink-0">
              <div className="flex gap-6 sm:gap-8 sm:border-l sm:border-border-glow/60 sm:pl-8">
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

              {/* Nav controls */}
              <div className="flex items-center gap-3 sm:pl-8">
                <button
                  onClick={() => scrollTo(-1)}
                  disabled={activeIndex === 0}
                  className="w-9 h-9 rounded-full flex items-center justify-center transition-all hover:scale-110 hover:bg-primary-glow-from/10 disabled:opacity-25 disabled:cursor-not-allowed"
                  style={{ background: '#fff', border: '1.5px solid rgba(108,99,255,0.18)', color: '#6C63FF', boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}
                >
                  <FiChevronLeft size={16} />
                </button>

                <div className="flex gap-1.5 items-center">
                  {projects.map((p, i) => (
                    <button
                      key={i}
                      onClick={() => setActiveIndex(i)}
                      className="rounded-full transition-all duration-300"
                      style={{
                        width: i === activeIndex ? '22px' : '7px',
                        height: '7px',
                        background: i === activeIndex ? activeProj.accentColor : 'rgba(108,99,255,0.2)',
                      }}
                    />
                  ))}
                </div>

                <button
                  onClick={() => scrollTo(1)}
                  disabled={activeIndex === projects.length - 1}
                  className="w-9 h-9 rounded-full flex items-center justify-center transition-all hover:scale-110 hover:bg-primary-glow-from/10 disabled:opacity-25 disabled:cursor-not-allowed"
                  style={{ background: '#fff', border: '1.5px solid rgba(108,99,255,0.18)', color: '#6C63FF', boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}
                >
                  <FiChevronRight size={16} />
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* ── Card Track ── */}
      <div className="relative w-full overflow-hidden" style={{ background: '#F2F2F8' }}>
        {/* Fade edges */}
        <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-14 z-10"
          style={{ background: 'linear-gradient(to right, #F2F2F8, transparent)' }} />
        <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-14 z-10"
          style={{ background: 'linear-gradient(to left, #F2F2F8, transparent)' }} />

        <div
          ref={trackRef}
          className="flex gap-3 sm:gap-4 px-8 sm:px-12 py-8 overflow-x-auto scrollbar-hide"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {projects.map((proj, i) => (
            <div key={proj.id} data-card>
              <ProjectCard
                proj={proj}
                index={i}
                isActive={i === activeIndex}
                onClick={() => setActiveIndex(i)}
                onOpen={setDetailProj}
              />
            </div>
          ))}
          <div className="shrink-0 w-4" />
        </div>
      </div>

      {/* ── Active Project Info Strip ── */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeIndex}
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -14 }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="w-full max-w-7xl mx-auto px-4 sm:px-8 py-8 pb-16"
        >
          <div
            className="rounded-2xl p-6 sm:p-8 grid grid-cols-1 md:grid-cols-2 gap-6"
            style={{
              background: '#fff',
              border: `1.5px solid ${activeProj.accentColor}20`,
              boxShadow: `0 4px 32px ${activeProj.accentColor}10, 0 1px 4px rgba(0,0,0,0.05)`,
            }}
          >
            {/* Left */}
            <div className="flex flex-col gap-4">
              <div>
                <span className="text-[10px] font-code text-text-muted uppercase tracking-widest">{activeProj.category}</span>
                <h3 className="font-display text-2xl sm:text-3xl font-bold text-text-primary mt-1">{activeProj.title}</h3>
              </div>
              <p className="font-body text-sm text-text-muted leading-relaxed">{activeProj.description}</p>
              <div
                className="flex items-start gap-2.5 px-4 py-3 rounded-xl"
                style={{ background: `${activeProj.accentColor}0c`, border: `1.5px solid ${activeProj.accentColor}22` }}
              >
                <span className="text-sm shrink-0" style={{ color: activeProj.accentColor }}>✦</span>
                <p className="text-sm font-body leading-snug text-text-muted">{activeProj.highlight}</p>
              </div>
            </div>

            {/* Right */}
            <div className="flex flex-col gap-4">
              <div className="flex flex-wrap gap-2">
                {activeProj.tags.map(tag => (
                  <span key={tag}
                    className="inline-flex items-center gap-1 text-xs font-code px-3 py-1.5 rounded-xl"
                    style={{ color: '#555', background: '#F4F4F7', border: '1px solid rgba(108,99,255,0.12)' }}>
                    <FiCode size={9} style={{ color: activeProj.accentColor }} />
                    {tag}
                  </span>
                ))}
              </div>

              <div className="flex flex-wrap gap-3 mt-auto pt-2">
                {activeProj.links.map((link, li) => (
                  <a key={link.url} href={link.url} target="_blank" rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 font-code text-sm font-semibold px-5 py-2.5 rounded-2xl transition-all duration-200 hover:scale-105 hover:shadow-lg"
                    style={li === 0
                      ? { background: activeProj.accentColor, color: '#fff', boxShadow: `0 4px 20px ${activeProj.accentColor}40` }
                      : { background: 'transparent', color: activeProj.accentColor, border: `1.5px solid ${activeProj.accentColor}45` }
                    }>
                    <FiExternalLink size={13} />
                    {link.label}
                  </a>
                ))}
                <button
                  onClick={() => setDetailProj(activeProj)}
                  className="inline-flex items-center gap-2 font-code text-sm font-semibold px-5 py-2.5 rounded-2xl transition-all duration-200 hover:scale-105"
                  style={{ background: 'transparent', color: activeProj.accentColor, border: `1.5px solid ${activeProj.accentColor}45` }}
                >
                  <FiArrowUpRight size={13} />
                  Full Details
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* ── Detail Modal ── */}
      <AnimatePresence>
        {detailProj && (
          <ProjectDetailModal proj={detailProj} onClose={() => setDetailProj(null)} />
        )}
      </AnimatePresence>
    </div>
  );
}
