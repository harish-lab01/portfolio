import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { projects } from '../../data/portfolioData';
import BrowserMockup from '../ui/BrowserMockup';
import MagneticButton from '../ui/MagneticButton';
import AuroraBlob from '../ui/AuroraBlob';

// Helper component for 3D Tilt Hover effect (vanilla mouse tracking, disabled on touch devices)
function TiltCard({ children, className = '', maxTilt = 5, ...props }) {
  const cardRef = useRef(null);
  const [style, setStyle] = useState({
    transform: 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)',
    transition: 'transform 0.5s ease'
  });

  const handleMouseMove = (e) => {
    // Disable on touch devices
    if (window.matchMedia('(pointer: coarse)').matches) return;

    const card = cardRef.current;
    if (!card) return;

    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;

    const rotX = -(y / (rect.height / 2)) * maxTilt;
    const rotY = (x / (rect.width / 2)) * maxTilt;

    setStyle({
      transform: `perspective(1000px) rotateX(${rotX}deg) rotateY(${rotY}deg) scale3d(1.02, 1.02, 1.02)`,
      transition: 'transform 0.1s ease-out'
    });
  };

  const handleMouseLeave = () => {
    setStyle({
      transform: 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)',
      transition: 'transform 0.5s ease'
    });
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={style}
      className={`relative w-full h-full select-none cursor-pointer ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}

export default function Projects() {
  const getMockupType = (id) => {
    if (id === '01') return 'ecommerce';
    if (id === '02') return 'dashboard';
    if (id === '03') return 'safety';
    if (id === '04') return 'chat';
    return 'dashboard'; // default
  };

  return (
    <div className="w-full flex flex-col">
      {/* Projects Title Watermark Section */}
      <div className="w-full bg-bg-ivory border-t border-border-glow/50 py-16 flex flex-col items-center">
        <div className="max-w-7xl w-full mx-auto px-6 text-left">
          <span className="text-[10px] font-code font-bold tracking-widest text-primary-glow-from uppercase">
            Engineering Showcases
          </span>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-text-primary tracking-tight mt-1">
            Featured Projects
          </h2>
          <div className="w-12 h-1 bg-gradient-to-r from-primary-glow-from to-primary-glow-to mt-2 rounded-full" />
        </div>
      </div>

      {projects.map((proj, idx) => {
        const isFlipped = idx % 2 === 1; // Alternating layout
        const isDark = proj.dark === true;
        const mockupType = getMockupType(proj.id);
        const displayUrl = proj.links[0]?.label || "jarvis.ai";

        return (
          <section
            key={proj.id}
            id={`projects-${proj.id}`}
            className={`
              relative w-full py-20 lg:py-32 flex items-center justify-center overflow-hidden border-b border-border-glow/30
              ${isDark ? 'bg-[#0D0D0D] text-bg-ivory' : 'bg-bg-ivory text-text-primary'}
            `}
          >
            {/* Ambient Background Glow (matched to project accent) */}
            <div
              className="absolute inset-0 opacity-10 pointer-events-none"
              style={{
                background: `radial-gradient(circle at ${
                  isFlipped ? '25%' : '75%'
                } 50%, ${proj.accentColor}, transparent 55%)`
              }}
            />
            {isDark && (
              <AuroraBlob color="teal" size="w-[500px] h-[500px]" className="left-[-10%] top-[-10%]" opacity="opacity-10" animationIndex={3} />
            )}

            {/* Scroll-Triggered Content Wrapper */}
            <motion.div
              initial={{ opacity: 0, y: 60, filter: 'blur(8px)' }}
              whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              viewport={{ once: true, margin: '-15%' }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="w-full max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center z-10"
            >
              
              {/* Text column */}
              <div
                className={`
                  lg:col-span-6 flex flex-col justify-center text-left order-2
                  ${isFlipped ? 'lg:order-2 lg:col-start-7' : 'lg:order-1'}
                `}
              >
                {/* Project Number */}
                <div className="absolute top-10 right-12 hidden md:block select-none">
                  <span className={`font-accent text-[9rem] opacity-[0.06] font-bold ${isDark ? 'text-white' : 'text-text-primary'}`}>
                    {proj.id}
                  </span>
                </div>

                {/* Category chip */}
                <div className="self-start mb-4">
                  <div
                    className={`
                      glass px-3.5 py-1 rounded-full text-[10px] font-code font-bold tracking-wider uppercase
                      ${isDark ? 'border-white/10 bg-white/5 text-white/80' : 'border-border-glow bg-white/40 text-primary-glow-from'}
                    `}
                  >
                    {proj.category}
                  </div>
                </div>

                {/* Headline */}
                <h3 className="font-display text-3xl md:text-4xl font-bold tracking-tight mb-4 leading-tight">
                  {proj.title}
                </h3>

                {/* Body Description */}
                <p className={`text-sm leading-relaxed mb-6 font-body ${isDark ? 'text-gray-400' : 'text-text-muted'}`}>
                  {proj.description}
                </p>

                {/* Highlight Badge */}
                <div className="mb-8 text-xs font-code flex items-center gap-2">
                  <span className="text-[#FF6B9D] font-bold">✦</span>
                  <span className={isDark ? 'text-white/70' : 'text-text-muted'}>{proj.highlight}</span>
                </div>

                {/* Tech tags */}
                <div className="flex flex-wrap gap-2 mb-8">
                  {proj.tags.map((tag) => (
                    <span
                      key={tag}
                      className={`
                        text-[10px] font-code px-2.5 py-1 rounded-md border
                        ${
                          isDark
                            ? 'border-white/5 bg-white/5 text-white/70'
                            : 'border-border-glow bg-white/30 text-text-muted'
                        }
                      `}
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* CTA Links */}
                {proj.links.length > 0 ? (
                  <div className="flex flex-wrap gap-4">
                    {proj.links.map((link) => (
                      <MagneticButton
                        key={link.url}
                        as="a"
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`
                          px-6 py-3 rounded-full font-code text-xs uppercase tracking-wider transition-all
                          ${
                            isDark
                              ? 'bg-white text-black hover:bg-transparent hover:text-white border border-white'
                              : 'bg-text-primary text-bg-ivory hover:bg-transparent hover:text-text-primary border border-text-primary'
                          }
                        `}
                      >
                        {link.label} &rarr;
                      </MagneticButton>
                    ))}
                  </div>
                ) : (
                  proj.badge && (
                    <span className="text-xs font-code uppercase tracking-wider text-green-500 font-bold bg-green-500/10 px-3 py-1.5 rounded-full border border-green-500/20 self-start">
                      {proj.badge}
                    </span>
                  )
                )}

              </div>

              {/* Mockup Column */}
              <div
                className={`
                  lg:col-span-6 flex items-center justify-center order-1 relative
                  ${isFlipped ? 'lg:order-1 lg:col-span-5 lg:col-start-1' : 'lg:order-2 lg:col-start-7'}
                `}
              >
                <TiltCard maxTilt={5} data-cursor="explore" className="flex items-center justify-center">
                  {proj.id === '05' ? (
                    // JARVIS AI Custom Dark Terminal Mockup
                    <div className="relative w-full max-w-[480px] rounded-2xl bg-black border border-white/10 p-5 font-code shadow-2xl shadow-green-500/5 select-none overflow-hidden aspect-video text-left">
                      <div className="flex items-center gap-1.5 pb-3 border-b border-white/10 mb-4">
                        <span className="w-2.5 h-2.5 rounded-full bg-red-500/80 block"></span>
                        <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/80 block"></span>
                        <span className="w-2.5 h-2.5 rounded-full bg-green-500/80 block"></span>
                        <span className="text-[10px] text-white/30 ml-2">jarvis@localhost:~</span>
                      </div>
                      <div className="text-green-400 text-xs flex flex-col gap-1">
                        <p className="text-white/50">&gt; ollama run jarvis-model</p>
                        <p className="text-green-500 animate-pulse">Initializing Jarvis AI assistant...</p>
                        <p className="mt-2 text-white/90">✓ Local LLM Connection Established.</p>
                        <p className="text-white/90">✓ Voice Automation Node Active.</p>
                        <p className="mt-4 text-purple-400">&gt; Ask Jarvis: "Are you offline?"</p>
                        <p className="text-amber-300">"Yes, running entirely offline on Ollama."</p>
                      </div>
                    </div>
                  ) : (
                    // Regular Browser Mockup
                    <BrowserMockup url={displayUrl} type={mockupType} className="w-full" />
                  )}
                </TiltCard>
              </div>

            </motion.div>
          </section>
        );
      })}
    </div>
  );
}
