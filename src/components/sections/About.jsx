import React, { useState, useEffect } from 'react';
import useTextScramble from '../../hooks/useTextScramble';
import StatCounter from '../ui/StatCounter';
import TechOrbit from '../ui/TechOrbit';
import { stats } from '../../data/portfolioData';
import { IoLocationOutline } from 'react-icons/io5';
import harishAvatar from '../../assets/harish_avatar.png';

/* ─── main component ───────────────────────────────────────────── */
export default function About() {
  const scramble = useTextScramble('About Harish', 600, true);

  /* live IST clock */
  const [timeStr, setTimeStr] = useState('');
  useEffect(() => {
    const tick = () => {
      setTimeStr(
        new Intl.DateTimeFormat([], {
          timeZone: 'Asia/Kolkata',
          hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true,
        }).format(new Date())
      );
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <section
      id="about"
      className="relative py-28 w-full bg-bg-ivory overflow-hidden border-t border-border-glow/40"
    >
      {/* ── ambient blobs ── */}
      <div className="pointer-events-none absolute -top-32 -left-32 w-[500px] h-[500px] rounded-full bg-primary-glow-from/5 blur-[120px]" />
      <div className="pointer-events-none absolute bottom-0 right-0 w-[400px] h-[400px] rounded-full bg-aurora-pink/5 blur-[100px]" />

      <div className="relative z-10 w-full max-w-7xl mx-auto px-6">

        {/* ══════════════════════════════════════════════════════════
            SECTION LABEL
        ══════════════════════════════════════════════════════════ */}
        <span className="inline-flex items-center gap-1 text-[10px] font-code font-semibold tracking-widest text-primary-glow-from uppercase">
          <span className="w-1 h-1 rounded-full bg-primary-glow-from inline-block" />
          Who I am
        </span>

        {/* ══════════════════════════════════════════════════════════
            HERO SPLIT — left: big heading + bio  |  right: orbit
        ══════════════════════════════════════════════════════════ */}
        <div className="mt-6 flex flex-col lg:flex-row items-center gap-12 lg:gap-20">

          {/* LEFT — text block */}
          <div className="flex-1 min-w-0">
            {/* avatar + name inline */}
            <div className="flex items-center gap-4 mb-6">
              <div className="relative shrink-0">
                <div className="w-16 h-16 rounded-full p-[2px] bg-gradient-to-tr from-primary-glow-from via-aurora-pink to-aurora-teal shadow-lg">
                  <img
                    src={harishAvatar}
                    alt="Harish M"
                    className="w-full h-full rounded-full object-cover bg-bg-ivory"
                  />
                </div>
                {/* online dot */}
                <span className="absolute bottom-0.5 right-0.5 w-3 h-3 rounded-full bg-emerald-400 border-2 border-bg-ivory shadow" />
              </div>
              <div>
                <p className="font-display font-bold text-text-primary text-lg leading-none">Harish M</p>
                <p className="font-code text-[11px] text-text-muted mt-0.5">Software Developer</p>
              </div>
            </div>

            {/* big heading */}
            <h2
              ref={scramble.ref}
              className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-text-primary leading-[1.05] tracking-tight"
            >
              {scramble.text}
            </h2>

            {/* gradient underline */}
            <div className="w-16 h-[3px] bg-gradient-to-r from-primary-glow-from to-aurora-teal mt-4 rounded-full" />

            {/* bio paragraph */}
            <p className="mt-6 text-base md:text-lg text-text-muted leading-relaxed font-body max-w-xl">
              I'm a Software Developer based in{' '}
              <span className="text-text-primary font-semibold">Chennai, India</span>. I build
              complete web applications — from pixel-perfect React frontends to robust{' '}
              <span className="text-text-primary font-semibold">.NET Core APIs</span> — delivering
              production-grade software that's fast, scalable, and great to use.
            </p>

            {/* quote */}
            <p className="mt-6 font-display italic text-xl md:text-2xl text-text-primary/80 leading-snug border-l-2 border-primary-glow-from/40 pl-4">
              "I don't just write code —{' '}
              <span className="bg-gradient-to-r from-primary-glow-from via-aurora-pink to-aurora-amber bg-clip-text text-transparent font-semibold not-italic">
                I build products.
              </span>"
            </p>

            {/* location + time strip */}
            <div className="mt-8 flex flex-wrap items-center gap-6 text-sm font-code text-text-muted">
              <span className="flex items-center gap-1.5">
                <IoLocationOutline className="text-aurora-teal" size={15} />
                Chennai, TN 🇮🇳
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                {timeStr || '—'} IST
              </span>
            </div>
          </div>

          {/* RIGHT — orbit */}
          <div className="shrink-0 flex flex-col items-center gap-6 scale-75 sm:scale-90 lg:scale-100 origin-center">
            <TechOrbit />
            <p className="font-code text-[10px] text-text-muted uppercase tracking-widest">Tech Stack</p>
          </div>
        </div>

        {/* ══════════════════════════════════════════════════════════
            STATS ROW — full-width divider strip
        ══════════════════════════════════════════════════════════ */}
        <div className="mt-20 border-y border-border-glow/40 py-10 grid grid-cols-1 sm:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-border-glow/40">
          {stats.map((stat, i) => (
            <div key={i} className="flex flex-col items-center justify-center py-4 sm:py-0 gap-1">
              <StatCounter
                value={stat.value}
                suffix={stat.suffix}
                label={stat.label}
                duration={1200 + i * 200}
              />
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
