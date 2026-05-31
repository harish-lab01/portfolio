import React, { useState, useCallback, useEffect, useRef } from 'react';
import Loader from './components/Loader';
import Cursor from './components/Cursor';
import Navbar from './components/Navbar';
import SectionDots from './components/SectionDots';
import AskHarishWidget from './components/AskHarishWidget';
import Hero from './components/sections/Hero';
import About from './components/sections/About';
import Journey from './components/sections/Journey';
import Projects from './components/sections/Projects';
import Skills from './components/sections/Skills';
import Contact from './components/sections/Contact';
import useScrollProgress from './hooks/useScrollProgress';
import useKonamiCode from './hooks/useKonamiCode';
import useTabTitle from './hooks/useTabTitle';
import { ToastContainer, useToast } from './components/ui/Toast';
import { projects, personal } from './data/portfolioData';


const SECTION_IDS = ['hero', 'about', 'journey', 'projects', 'skills', 'contact'];
const SECTION_LABELS = ['Home', 'About', 'Journey', 'Projects', 'Skills', 'Contact'];
const SECTION_COLORS = ['#6C63FF', '#A78BFA', '#45E5C8', '#FFB347', '#45E5C8', '#6C63FF'];

// ─── Konami Code Matrix Rain Easter Egg ──────────────────────────────────────
function MatrixEasterEgg({ onClose }) {
  const canvasRef = useRef(null);
  const [phase, setPhase] = useState('rain'); // 'rain' | 'jarvis'

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const fontSize = 14;
    const cols = Math.floor(canvas.width / fontSize);
    const drops = Array(cols).fill(1);
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&*<>/\\~`';

    ctx.fillStyle = '#000';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    const draw = () => {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = '#00ff41';
      ctx.font = `${fontSize}px 'JetBrains Mono', monospace`;

      for (let i = 0; i < drops.length; i++) {
        const text = chars[Math.floor(Math.random() * chars.length)];
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);
        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      }
    };

    const interval = setInterval(draw, 45);

    // After 2.5s show JARVIS panel, after 5s auto-close
    const jarvisTimer = setTimeout(() => setPhase('jarvis'), 2500);
    const closeTimer = setTimeout(() => onClose(), 7000);

    return () => {
      clearInterval(interval);
      clearTimeout(jarvisTimer);
      clearTimeout(closeTimer);
    };
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center">
      {/* Matrix Canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />

      {/* JARVIS Overlay */}
      {phase === 'jarvis' && (
        <div className="relative z-10 text-center flex flex-col items-center gap-6 animate-fade-in">
          <div className="glass-dark rounded-3xl p-10 max-w-lg w-full border border-green-500/30 shadow-2xl shadow-green-500/10">
            <p className="font-code text-xs uppercase tracking-[0.3em] text-green-400 mb-4 animate-pulse">
              // SYSTEM ACTIVATION SEQUENCE
            </p>
            <h1 className="font-display text-4xl md:text-5xl font-bold text-white mb-2">
              🤖 JARVIS
            </h1>
            <p className="font-code text-green-400 text-sm mb-6 tracking-widest uppercase">
              ACTIVATED
            </p>
            <p className="font-body text-sm text-white/60 leading-relaxed mb-6">
              AI-powered personal assistant · Local LLM via Ollama · Voice & text commands ·
              Desktop automation · Runs 100% offline.
            </p>
            <div className="flex justify-center gap-2 flex-wrap">
              {['Python', 'Ollama', 'LLM', 'Automation', 'Voice'].map(tag => (
                <span key={tag} className="text-[10px] font-code px-2.5 py-1 rounded-md border border-green-500/30 text-green-400 bg-green-500/5">
                  {tag}
                </span>
              ))}
            </div>
            <div className="mt-8 border-t border-green-500/20 pt-4 font-code text-[10px] text-green-600 uppercase tracking-widest flex items-center justify-center gap-2">
              <span className="animate-pulse">●</span> Auto-closing in a moment…
            </div>
          </div>
        </div>
      )}

      {/* Manual close button */}
      <button
        onClick={onClose}
        className="absolute top-6 right-6 z-20 w-10 h-10 rounded-full bg-white/10 border border-white/20 text-white flex items-center justify-center hover:bg-white/20 transition-all cursor-pointer font-code text-sm"
        aria-label="Close Easter Egg"
      >
        ✕
      </button>
    </div>
  );
}

// ─── App ─────────────────────────────────────────────────────────────────────
export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [showEasterEgg, setShowEasterEgg] = useState(false);
  const [activeProjectColor, setActiveProjectColor] = useState('#6C63FF');
  const { activeSection } = useScrollProgress(SECTION_IDS);
  const { toasts, addToast, removeToast } = useToast();
  useTabTitle();

  // Konami Code triggers easter egg
  const handleKonami = useCallback(() => {
    setShowEasterEgg(true);
  }, []);
  useKonamiCode(handleKonami);

  const handleLoaderComplete = useCallback(() => {
    setIsLoading(false);
  }, []);

  // Track active project scroll for dynamic cursor color (Feature 2 & 5 proximity logic)
  useEffect(() => {
    if (isLoading) return;
    const observers = [];

    projects.forEach((proj) => {
      const id = `projects-${proj.id}`;
      const el = document.getElementById(id);
      if (el) {
        const observer = new IntersectionObserver(
          ([entry]) => {
            if (entry.isIntersecting) {
              setActiveProjectColor(proj.accentColor);
            }
          },
          {
            rootMargin: '-50% 0px -50% 0px', // Center viewport trigger
            threshold: 0,
          }
        );
        observer.observe(el);
        observers.push({ observer, el });
      }
    });

    return () => {
      observers.forEach(({ observer, el }) => {
        if (el) observer.unobserve(el);
      });
    };
  }, [isLoading]);

  // Accent colour per section for cursor
  const activeCursorColor = activeSection === 3 ? activeProjectColor : (SECTION_COLORS[activeSection] || '#6C63FF');

  return (
    <>
      {/* Loader Screen */}
      <Loader onComplete={handleLoaderComplete} />

      {/* Konami Easter Egg */}
      {showEasterEgg && (
        <MatrixEasterEgg onClose={() => setShowEasterEgg(false)} />
      )}

      {/* Custom Cursor (desktop only) */}
      <Cursor activeSectionColor={activeCursorColor} />

      {/* Section Scrollspy Dots */}
      {!isLoading && (
        <SectionDots
          activeSection={activeSection}
          sectionIds={SECTION_IDS}
          sectionLabels={SECTION_LABELS}
        />
      )}

      {/* AI Widget */}
      {!isLoading && <AskHarishWidget />}

      {/* Main Site Content */}
      <main
        className="w-full min-h-screen bg-bg-ivory"
        style={{ opacity: isLoading ? 0 : 1, transition: 'opacity 0.5s ease 0.3s' }}
      >
        <Navbar />
        <Hero />
        <About />

        {/* Journey Timeline */}
        <Journey />

        {/* Projects Showcase */}
        <Projects />

        <Skills />
        <Contact addToast={addToast} />
      </main>

      {/* Toast notifications */}
      <ToastContainer toasts={toasts} onRemove={removeToast} />
    </>
  );
}
