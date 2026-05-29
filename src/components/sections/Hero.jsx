import React from 'react';
import { motion } from 'framer-motion';
import { personal } from '../../data/portfolioData';
import AuroraBlob from '../ui/AuroraBlob';
import MagneticButton from '../ui/MagneticButton';
import { FaGithub, FaLinkedin, FaEnvelope } from 'react-icons/fa';
import harishPhoto from '../../assets/HARISH.png';

// Faint background code snippets
const CODE_SNIPPETS = [
  "import React, { useState, useEffect } from 'react';",
  "const [coffee, setCoffee] = useState('filter-coffee');",
  "useEffect(() => {",
  "  const buildInterfaces = async () => {",
  "    const result = await craftWithLove(react, dotnetCore);",
  "    if (result.isStunning) {",
  "      setUserHappier(true);",
  "    }",
  "  };",
  "  buildInterfaces();",
  "}, []);",
  "return <StunningPortfolio dev={harish} />;",
  "// Custom React hook for personal developer vibe",
  "const useCoffeeBoost = () => {",
  "  const [energy, setEnergy] = useState(100);",
  "  return () => setEnergy(prev => prev + 100);",
  "};",
  "// Connecting React beautiful layouts to .NET Core APIs",
  "const connectEndpoint = async (req, res) => {",
  "  const connection = await dotNetBridge.consume('/api/v1/auth');",
  "  return connection.data.roleSecureStatus;",
  "};"
];

export default function Hero() {
  const words = personal.subtitle.split(" ");

  // Animations for words in subheadline
  const containerVariants = {
    visible: {
      transition: {
        staggerChildren: 0.08,
      }
    }
  };

  const wordVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4 }
    }
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen w-full flex flex-col justify-center items-center overflow-hidden bg-bg-ivory pt-20"
    >
      {/* Background Code Scroller (Feature 4) */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none select-none z-0 opacity-[0.04] flex flex-col justify-around text-left">
        <div className="flex flex-col gap-6 font-code text-[11px] text-[#6C63FF] leading-relaxed translate-x-12 rotate-[-5deg] scale-110">
          {CODE_SNIPPETS.map((line, idx) => (
            <div
              key={idx}
              className="whitespace-nowrap"
              style={{
                animation: `marquee ${30 + idx * 5}s linear infinite`,
                animationDelay: `-${idx * 2}s`
              }}
            >
              {line} &nbsp;&nbsp;&nbsp;&nbsp; {line} &nbsp;&nbsp;&nbsp;&nbsp; {line}
            </div>
          ))}
        </div>
      </div>

      {/* Aurora Blobs */}
      <AuroraBlob color="violet" size="w-[500px] h-[500px]" className="left-[-10%] top-[-10%]" opacity="opacity-20" animationIndex={1} />
      <AuroraBlob color="pink" size="w-[600px] h-[600px]" className="right-[-10%] bottom-[-10%]" opacity="opacity-15" animationIndex={2} />
      <AuroraBlob color="teal" size="w-[400px] h-[400px]" className="left-[40%] top-[30%]" opacity="opacity-10" animationIndex={3} />

      {/* Split Layout Container */}
      <div className="w-full max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-6 z-10 flex-1 items-center py-12">
        
        {/* Left Half (Text Content) - 7 cols */}
        <div className="lg:col-span-7 flex flex-col justify-center text-left">
          
          {/* Availability Badge */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="self-start mb-6"
          >
            <div className="glass px-4 py-1.5 rounded-full flex items-center gap-2 border border-border-glow bg-white/40">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
              </span>
              <span className="text-[10px] font-code font-bold tracking-widest text-text-primary uppercase">
                ✦ Open to Full-Time Roles
              </span>
            </div>
          </motion.div>

          {/* Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="font-display text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-text-primary mb-4 leading-[1.05]"
          >
            Building Software<br />
            That <span className="font-display italic font-semibold bg-gradient-to-r from-primary-glow-from to-[#FF6B9D] bg-clip-text text-transparent">Works</span>
          </motion.h1>

          {/* Subheading (Staggered Fade-in) */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="text-xs font-code font-semibold tracking-wider text-primary-glow-from uppercase mb-6 flex flex-wrap gap-x-2 gap-y-1"
          >
            {words.map((word, i) => (
              <motion.span key={i} variants={wordVariants}>
                {word}
              </motion.span>
            ))}
          </motion.div>

          {/* Body */}
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.35 }}
            className="text-base text-text-muted max-w-xl mb-10 leading-relaxed font-body"
          >
            Hey! I'm a Software Developer based in Chennai who builds complete web applications — clean React frontends, robust .NET APIs, and everything in between. I care about code that's fast, scalable, and genuinely great to use.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.45 }}
            className="flex flex-wrap gap-4 mb-10"
          >
            <MagneticButton
              as="a"
              href="#projects"
              className="px-8 py-4 rounded-full font-code text-xs uppercase tracking-wider bg-gradient-to-r from-primary-glow-from to-[#A78BFA] text-white hover:shadow-lg hover:shadow-purple-500/25 transition-all shadow-md"
            >
              See My Builds ↓
            </MagneticButton>

            <MagneticButton
              as="a"
              href="/Harish_M_Resume.txt"
              download="Harish_M_Resume.txt"
              className="px-8 py-4 rounded-full font-code text-xs uppercase tracking-wider border border-border-glow text-text-primary bg-white/20 hover:bg-gradient-to-r hover:from-primary-glow-from hover:to-primary-glow-to hover:text-white hover:border-transparent transition-all"
            >
              Grab My Resume ↑
            </MagneticButton>
          </motion.div>

          {/* Social Row */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.55 }}
            className="flex items-center gap-6"
          >
            <a
              href={personal.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="text-text-muted hover:text-[#0D0d0d] transition-colors"
              aria-label="LinkedIn Profile"
            >
              <FaLinkedin size={20} />
            </a>
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-text-muted hover:text-[#0D0d0d] transition-colors"
              aria-label="GitHub Profile"
            >
              <FaGithub size={20} />
            </a>
            <a
              href={`mailto:${personal.email}`}
              className="text-text-muted hover:text-[#0D0d0d] transition-colors"
              aria-label="Send Email"
            >
              <FaEnvelope size={20} />
            </a>
          </motion.div>

        </div>

        {/* Right Half — Hero Photo */}
        <div className="lg:col-span-5 flex items-center justify-center relative min-h-[320px] sm:min-h-[460px] lg:min-h-[540px]">

          {/* Ambient glow — soft, diffused, sits under the photo */}
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[280px] h-[180px] rounded-full bg-gradient-to-t from-primary-glow-from/20 via-[#FF6B9D]/10 to-transparent blur-3xl pointer-events-none" />

          {/* Floating photo wrapper */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.25, 1, 0.5, 1] }}
            className="relative z-10 animate-[float_5s_ease-in-out_infinite]"
          >
            {/* Photo — no border, free-floating */}
            <img
              src={harishPhoto}
              alt="Harish M — Frontend Developer"
              className="w-[280px] sm:w-[320px] lg:w-[350px] object-cover object-top block select-none"
              style={{
                aspectRatio: '3/4',
                filter: 'drop-shadow(0 30px 60px rgba(108,99,255,0.18)) drop-shadow(0 8px 24px rgba(0,0,0,0.10))',
                maskImage: 'linear-gradient(to bottom, black 70%, transparent 100%)',
                WebkitMaskImage: 'linear-gradient(to bottom, black 70%, transparent 100%)',
              }}
              draggable={false}
            />

            {/* Orbiting Badge: React (Top Left) */}
            <div
              className="hidden sm:flex absolute -top-4 -left-8 glass px-3.5 py-1.5 rounded-full items-center gap-1.5 border border-border-glow shadow-md bg-white/90 select-none animate-[float-slow-1_6s_ease-in-out_infinite]"
              style={{ animationDelay: '-1s' }}
            >
              <span className="text-cyan-500 animate-spin [animation-duration:8s]">⚛</span>
              <span className="text-[9px] font-code font-bold tracking-widest uppercase text-text-primary">React.js</span>
            </div>

            {/* Orbiting Badge: .NET API (Right Middle) */}
            <div
              className="hidden sm:flex absolute top-[38%] -right-10 glass px-3.5 py-1.5 rounded-full items-center gap-1.5 border border-[#FF6B9D]/40 shadow-md bg-white/90 select-none animate-[float-slow-3_5s_ease-in-out_infinite]"
              style={{ animationDelay: '-0.5s' }}
            >
              <span className="text-pink-500">🛡️</span>
              <span className="text-[9px] font-code font-bold tracking-widest uppercase text-text-primary">.NET API</span>
            </div>

            {/* Name tag at bottom */}
            <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 whitespace-nowrap glass px-5 py-2 rounded-full border border-border-glow/60 bg-white/80 shadow-md flex items-center gap-2 select-none">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
              </span>
              <span className="font-code text-[10px] font-bold tracking-widest uppercase text-text-primary">Harish M · Chennai 🇮🇳</span>
            </div>

          </motion.div>

        </div>

      </div>

      {/* Scroll Mouse Indicator */}
      <div className="absolute bottom-6 flex flex-col items-center gap-1.5 select-none z-10 pointer-events-none">
        <div className="w-6 h-10 rounded-full border-2 border-text-muted/40 flex justify-center p-1.5">
          <div className="w-1.5 h-1.5 bg-primary-glow-from rounded-full animate-scroll-dot" />
        </div>
        <span className="font-code text-[9px] uppercase tracking-[0.2em] text-text-muted">
          scroll to explore
        </span>
      </div>

    </section>
  );
}
