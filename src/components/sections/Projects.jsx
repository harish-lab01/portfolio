import React, { useRef, useState, useEffect } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { projects } from '../../data/portfolioData';
import { FiExternalLink, FiCode, FiStar, FiX, FiZap, FiLayers } from 'react-icons/fi';
import AuroraBlob from '../ui/AuroraBlob';
import BrowserMockup from '../ui/BrowserMockup';

const MOCKUP_TYPE = { '00': 'secondBrain', '01': 'dashboard', '02': 'safety', '03': 'chat', '05': 'ecommerce', '06': 'aiShop' };

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

// ── Project Detail Popup ─────────────────────────────────────────────────────
const AI_SECOND_BRAIN_DETAILS = {
  tagline: "Turn passive saving into an active, conversational knowledge base.",
  techStack: [
    { layer: "Frontend", tech: "React 18 + Vite" },
    { layer: "Styling", tech: "Tailwind CSS — dark glassmorphism" },
    { layer: "State", tech: "Zustand — real-time global store" },
    { layer: "Auth", tech: "Firebase Authentication (Google Sign-In)" },
    { layer: "Database", tech: "Firestore — real-time NoSQL" },
    { layer: "AI Chat", tech: "Groq API — llama-3.3-70b-versatile" },
    { layer: "Semantic Search", tech: "Hugging Face — sentence-transformers/all-MiniLM-L6-v2" },
    { layer: "Graph Viz", tech: "react-force-graph-2d — WebGL force-directed" },
    { layer: "PWA", tech: "vite-plugin-pwa + Workbox — installable, offline-capable" },
    { layer: "Deployment", tech: "Vercel" },
  ],
  features: [
    { icon: "📄", title: "Multi-format Note Capture", desc: "Save text notes, extract text from PDFs locally (zero uploads), or paste a URL for auto-fetched article content." },
    { icon: "🤖", title: "AI Analysis on Every Save", desc: "Groq AI auto-generates a 2–3 sentence summary, up to 5 tags, and finds related notes — before you even close the modal." },
    { icon: "🔍", title: "Semantic Vector Search", desc: "Hybrid search: 40% keyword + 60% vector similarity. Searching 'focus' surfaces notes on 'deep work' and 'flow state'." },
    { icon: "💬", title: "AI Chat with Your Knowledge", desc: "Full chat interface that retrieves semantically relevant notes as context before calling the LLM. Chat history persists to Firestore." },
    { icon: "🕸️", title: "Knowledge Graph Visualisation", desc: "Interactive WebGL force-directed graph. Every note is a node, AI-detected relationships are edges. Click any node to open the note." },
    { icon: "🔁", title: "Spaced Repetition (SM-2)", desc: "Anki-style review scheduling. AI generates a flashcard question. Rate recall (Forgot/Hard/Good/Easy) to set the next review date." },
    { icon: "📁", title: "Collections / Notebooks", desc: "Group notes into named collections with custom colors and emoji icons. Move notes between collections from the detail page." },
    { icon: "🎙️", title: "Voice Input", desc: "Web Speech API integration — dictate notes or chat messages with real-time transcript display before submitting." },
    { icon: "📑", title: "Note Templates", desc: "6 built-in templates (Book Summary, Meeting Notes, Research, Daily Journal, Learning Note, Project Plan) that pre-fill structured content." },
    { icon: "📥", title: "Import from Notion / Obsidian", desc: "Drag and drop .md files — YAML front matter stripped, titles extracted, each file becomes a note with full AI analysis." },
    { icon: "🌐", title: "Public Note Sharing", desc: "One-click publish any note to a public URL. Accessible without login, branded with a CTA. Link auto-copied to clipboard." },
    { icon: "📱", title: "PWA — Installable App", desc: "Workbox service worker caches app shell, fonts, and Firestore reads. Installable on mobile and desktop. Works offline." },
  ],
  numbers: [
    { val: "44", label: "Source Files" },
    { val: "12", label: "Major Features" },
    { val: "5", label: "Firestore Collections" },
    { val: "2", label: "AI APIs" },
    { val: "0", label: "Lint Errors" },
  ],
};

function ProjectDetailModal({ proj, onClose }) {
  // Close on Escape key
  useEffect(() => {
    const handler = (e) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [onClose]);

  // Lock body scroll
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, []);

  const details = AI_SECOND_BRAIN_DETAILS;

  return (
    <motion.div
      className="fixed inset-0 z-[9999] flex items-center justify-center p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/75 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <motion.div
        className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-3xl shadow-2xl"
        style={{
          background: 'linear-gradient(135deg, #0d0d18 0%, #12101f 100%)',
          border: `1px solid ${proj.accentColor}30`,
          boxShadow: `0 32px 100px ${proj.accentColor}25`,
        }}
        initial={{ scale: 0.92, y: 24 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.92, y: 24 }}
        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
      >
        {/* Header */}
        <div
          className="sticky top-0 z-10 flex items-start justify-between px-6 py-5"
          style={{ background: 'linear-gradient(135deg, #0d0d18 0%, #12101f 100%)', borderBottom: `1px solid ${proj.accentColor}20` }}
        >
          <div className="flex flex-col gap-1.5">
            <div className="flex items-center gap-2">
              <span
                className="text-[9px] font-code font-bold tracking-[0.2em] uppercase px-2.5 py-1 rounded-lg animate-pulse"
                style={{ color: '#fff', background: `linear-gradient(90deg, ${proj.accentColor}, ${proj.accentColor}bb)` }}
              >
                ✦ Latest Project
              </span>
              <span
                className="text-[9px] font-code font-bold px-2.5 py-1 rounded-lg"
                style={{ color: proj.accentColor, background: `${proj.accentColor}18`, border: `1px solid ${proj.accentColor}35` }}
              >
                {proj.badge}
              </span>
            </div>
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-white leading-tight">{proj.title}</h2>
            <p className="text-sm font-body" style={{ color: `${proj.accentColor}cc` }}>{details.tagline}</p>
          </div>
          <button
            onClick={onClose}
            className="shrink-0 ml-4 p-2 rounded-xl transition-all hover:scale-110"
            style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)', color: 'rgba(255,255,255,0.5)' }}
          >
            <FiX size={18} />
          </button>
        </div>

        <div className="px-6 py-6 flex flex-col gap-8">

          {/* Numbers */}
          <div className="grid grid-cols-5 gap-2">
            {details.numbers.map(({ val, label }) => (
              <div key={label} className="flex flex-col items-center gap-1 py-3 rounded-2xl" style={{ background: `${proj.accentColor}0d`, border: `1px solid ${proj.accentColor}20` }}>
                <span className="font-accent text-xl font-bold" style={{ color: proj.accentColor }}>{val}</span>
                <span className="text-[9px] font-code text-center leading-tight" style={{ color: 'rgba(255,255,255,0.4)' }}>{label}</span>
              </div>
            ))}
          </div>

          {/* Tech Stack */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <FiLayers size={14} style={{ color: proj.accentColor }} />
              <span className="text-xs font-code font-bold tracking-widest uppercase" style={{ color: proj.accentColor }}>Tech Stack</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {details.techStack.map(({ layer, tech }) => (
                <div key={layer} className="flex items-start gap-3 px-3 py-2.5 rounded-xl" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}>
                  <span className="text-[9px] font-code shrink-0 mt-0.5 px-1.5 py-0.5 rounded" style={{ color: proj.accentColor, background: `${proj.accentColor}20` }}>{layer}</span>
                  <span className="text-xs font-code text-white/60 leading-snug">{tech}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Features */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <FiZap size={14} style={{ color: proj.accentColor }} />
              <span className="text-xs font-code font-bold tracking-widest uppercase" style={{ color: proj.accentColor }}>Core Features</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {details.features.map(({ icon, title, desc }) => (
                <div key={title} className="flex items-start gap-3 px-3.5 py-3 rounded-xl" style={{ background: 'rgba(255,255,255,0.03)', border: `1px solid ${proj.accentColor}15` }}>
                  <span className="text-base shrink-0 mt-0.5">{icon}</span>
                  <div>
                    <p className="text-xs font-code font-semibold text-white/80 leading-snug">{title}</p>
                    <p className="text-[11px] font-body text-white/40 mt-0.5 leading-snug">{desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* CTA */}
          <div className="flex flex-wrap gap-3 pt-2 pb-2">
            <a
              href="https://second-brain-mauve-psi.vercel.app/login"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 font-code text-sm font-semibold px-6 py-3 rounded-2xl transition-all duration-200 hover:scale-105 hover:shadow-lg"
              style={{ background: proj.accentColor, color: '#fff', boxShadow: `0 4px 20px ${proj.accentColor}40` }}
            >
              <FiExternalLink size={14} />
              Open Live Demo
            </a>
            <button
              onClick={onClose}
              className="inline-flex items-center gap-2 font-code text-sm font-semibold px-6 py-3 rounded-2xl transition-all duration-200 hover:scale-105"
              style={{ background: 'transparent', color: proj.accentColor, border: `1.5px solid ${proj.accentColor}50` }}
            >
              Close
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

// ── Single project section ───────────────────────────────────────────────────
function ProjectSection({ proj, index, onOpenDetail }) {
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
            <div className="flex items-center gap-4">
              <span
                className="font-accent text-6xl font-bold leading-none select-none"
                style={{ color: `${proj.accentColor}20` }}
              >
                {proj.id}
              </span>
              <div className="flex flex-col gap-1">
                {proj.isLatest && (
                  <span
                    className="text-[9px] font-code font-bold tracking-[0.2em] uppercase px-2.5 py-1 rounded-lg self-start animate-pulse"
                    style={{
                      color: '#fff',
                      background: `linear-gradient(90deg, ${proj.accentColor}, ${proj.accentColor}bb)`,
                    }}
                  >
                    ✦ Latest Project
                  </span>
                )}
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
                {proj.isLatest && (
                  <button
                    onClick={() => onOpenDetail(proj)}
                    className="inline-flex items-center gap-2 font-code text-sm font-semibold px-6 py-3 rounded-2xl transition-all duration-200 hover:scale-105"
                    style={{
                      background: 'transparent',
                      color: proj.accentColor,
                      border: `1.5px solid ${proj.accentColor}50`,
                    }}
                  >
                    <FiLayers size={14} />
                    View Details
                  </button>
                )}
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
  const [detailProj, setDetailProj] = useState(null);

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
        <ProjectSection key={proj.id} proj={proj} index={i} onOpenDetail={setDetailProj} />
      ))}

      {/* ── Detail modal ── */}
      <AnimatePresence>
        {detailProj && (
          <ProjectDetailModal proj={detailProj} onClose={() => setDetailProj(null)} />
        )}
      </AnimatePresence>

    </div>
  );
}
