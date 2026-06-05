import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiArrowRight, FiX } from 'react-icons/fi';
import avatarImg from '../assets/harish_avatar.png';

const ACCENT = '#A78BFA';
const LIVE_URL = 'https://second-brain-mauve-psi.vercel.app/login';

// Floating particle dot
function Dot({ style }) {
  return (
    <motion.div
      className="absolute rounded-full pointer-events-none"
      style={{ width: 6, height: 6, background: ACCENT, opacity: 0.35, ...style }}
      animate={{ y: [0, -12, 0], opacity: [0.35, 0.7, 0.35] }}
      transition={{ duration: 3 + Math.random() * 2, repeat: Infinity, ease: 'easeInOut', delay: Math.random() * 2 }}
    />
  );
}

// Rings that pulse around the avatar
function PulseRings() {
  return (
    <>
      {[1, 2, 3].map((i) => (
        <motion.div
          key={i}
          className="absolute inset-0 rounded-full"
          style={{ border: `1.5px solid ${ACCENT}`, borderRadius: '50%' }}
          initial={{ scale: 1, opacity: 0.5 }}
          animate={{ scale: 1 + i * 0.3, opacity: 0 }}
          transition={{ duration: 2.4, repeat: Infinity, delay: i * 0.6, ease: 'easeOut' }}
        />
      ))}
    </>
  );
}

// Tiny floating emoji chips around the avatar
const FLOAT_CHIPS = [
  { emoji: '🧠', top: '-18%', left: '72%', delay: 0 },
  { emoji: '⚡', top: '65%',  left: '-22%', delay: 0.4 },
  { emoji: '🚀', top: '-12%', left: '-20%', delay: 0.9 },
  { emoji: '✨', top: '72%',  left: '68%',  delay: 0.6 },
];

function FloatChip({ emoji, top, left, delay }) {
  return (
    <motion.div
      className="absolute flex items-center justify-center w-8 h-8 rounded-full text-base select-none"
      style={{
        top, left,
        background: 'rgba(167,139,250,0.12)',
        border: `1px solid ${ACCENT}30`,
        backdropFilter: 'blur(6px)',
      }}
      animate={{ y: [0, -8, 0], rotate: [0, 6, -6, 0] }}
      transition={{ duration: 3.5, repeat: Infinity, delay, ease: 'easeInOut' }}
    >
      {emoji}
    </motion.div>
  );
}

export default function NewProjectPopup({ onClose }) {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setShow(true), 700);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    const handler = (e) => { if (e.key === 'Escape') handleClose(); };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, []);

  const handleClose = () => {
    setShow(false);
    setTimeout(onClose, 320);
  };

  const handleYes = () => {
    handleClose();
    setTimeout(() => {
      document.getElementById('projects-00')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 340);
  };

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="fixed inset-0 z-[500] flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.22 }}
        >
          {/* Backdrop */}
          <div
            className="absolute inset-0 cursor-pointer"
            style={{ background: 'rgba(4,3,12,0.80)', backdropFilter: 'blur(12px)' }}
            onClick={handleClose}
          />

          {/* ── Card ── */}
          <motion.div
            className="relative w-full max-w-sm rounded-[28px] overflow-hidden"
            style={{
              background: 'linear-gradient(160deg, #0f0e1c 0%, #13101f 100%)',
              border: `1px solid ${ACCENT}28`,
              boxShadow: `0 0 0 1px ${ACCENT}0d, 0 40px 100px rgba(0,0,0,0.8), 0 0 100px ${ACCENT}14`,
            }}
            initial={{ scale: 0.85, y: 48, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.9, y: 28, opacity: 0 }}
            transition={{ duration: 0.42, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* Top shimmer bar */}
            <div
              className="h-[2px]"
              style={{ background: `linear-gradient(90deg, transparent, ${ACCENT}, #F472B6, ${ACCENT}88, transparent)` }}
            />

            {/* Background glow */}
            <div
              className="absolute pointer-events-none"
              style={{
                width: 280, height: 280, borderRadius: '50%',
                background: `radial-gradient(circle, ${ACCENT}1a 0%, transparent 70%)`,
                top: -60, left: '50%', transform: 'translateX(-50%)',
                filter: 'blur(40px)',
              }}
            />

            {/* Floating particles */}
            <Dot style={{ top: '12%', right: '8%' }} />
            <Dot style={{ top: '55%', left: '6%' }} />
            <Dot style={{ bottom: '18%', right: '12%' }} />

            {/* Close btn */}
            <button
              onClick={handleClose}
              className="absolute top-4 right-4 z-20 w-8 h-8 rounded-xl flex items-center justify-center transition-all duration-200 hover:scale-110 hover:rotate-90"
              style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)', color: 'rgba(255,255,255,0.3)' }}
              aria-label="Close"
            >
              <FiX size={14} />
            </button>

            <div className="relative z-10 flex flex-col items-center text-center px-6 pt-8 pb-7 gap-0">

              {/* ── Animated Avatar ── */}
              <div className="relative mb-6" style={{ width: 88, height: 88 }}>
                <PulseRings />
                {FLOAT_CHIPS.map((c) => (
                  <FloatChip key={c.emoji} {...c} />
                ))}
                {/* Avatar circle */}
                <motion.div
                  className="relative w-full h-full rounded-full overflow-hidden"
                  style={{
                    border: `2.5px solid ${ACCENT}`,
                    boxShadow: `0 0 24px ${ACCENT}50, 0 0 6px ${ACCENT}80`,
                  }}
                  animate={{ boxShadow: [`0 0 20px ${ACCENT}40`, `0 0 36px ${ACCENT}70`, `0 0 20px ${ACCENT}40`] }}
                  transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
                >
                  <img
                    src={avatarImg}
                    alt="Harish"
                    className="w-full h-full object-cover object-top"
                    draggable={false}
                  />
                </motion.div>

                {/* Green online dot */}
                <span className="absolute bottom-0.5 right-0.5 w-4 h-4 rounded-full bg-green-400 border-2 flex items-center justify-center"
                  style={{ borderColor: '#0f0e1c' }}>
                  <motion.span
                    className="w-2 h-2 rounded-full bg-green-400"
                    animate={{ scale: [1, 1.6, 1], opacity: [1, 0.4, 1] }}
                    transition={{ duration: 1.8, repeat: Infinity }}
                  />
                </span>
              </div>

              {/* ── Greeting ── */}
              <motion.p
                className="text-[11px] font-mono font-bold tracking-[0.22em] uppercase mb-2"
                style={{ color: `${ACCENT}cc` }}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15 }}
              >
                👋 Hey there!
              </motion.p>

              {/* ── Main message ── */}
              <motion.h2
                className="font-display text-[22px] font-bold text-white leading-snug tracking-tight mb-3"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.22 }}
              >
                I just shipped my<br />
                <span
                  className="bg-clip-text text-transparent"
                  style={{ backgroundImage: `linear-gradient(90deg, ${ACCENT}, #F472B6)` }}
                >
                  latest project ✦
                </span>
              </motion.h2>

              {/* ── Sub message ── */}
              <motion.p
                className="text-[13px] font-body text-white/45 leading-relaxed mb-7 max-w-[260px]"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.30 }}
              >
                It's an <span className="text-white/70 font-semibold">AI-powered knowledge app</span> — built with React, Firebase & Groq AI. Want to take a look?
              </motion.p>

              {/* ── Buttons ── */}
              <motion.div
                className="flex flex-col w-full gap-2.5"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.38 }}
              >
                {/* Yes */}
                <button
                  onClick={handleYes}
                  className="w-full flex items-center justify-center gap-2 font-mono text-[13px] font-bold py-3.5 rounded-2xl transition-all duration-200 hover:scale-[1.03] hover:brightness-110 active:scale-[0.97]"
                  style={{
                    background: `linear-gradient(135deg, ${ACCENT} 0%, #F472B6 100%)`,
                    color: '#fff',
                    boxShadow: `0 8px 28px ${ACCENT}45`,
                  }}
                >
                  Yes, show me!
                  <FiArrowRight size={15} />
                </button>

                {/* Maybe later */}
                <button
                  onClick={handleClose}
                  className="w-full font-mono text-[12px] font-medium py-3 rounded-2xl transition-all duration-200 hover:scale-[1.02]"
                  style={{
                    background: 'rgba(255,255,255,0.04)',
                    color: 'rgba(255,255,255,0.30)',
                    border: '1px solid rgba(255,255,255,0.07)',
                  }}
                >
                  Maybe later
                </button>
              </motion.div>

            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
