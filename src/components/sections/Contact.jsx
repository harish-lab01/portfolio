import React, { useState } from 'react';
import GlassCard from '../ui/GlassCard';
import useTextScramble from '../../hooks/useTextScramble';
import { personal } from '../../data/portfolioData';
import { FiMail, FiPhone, FiLinkedin, FiDownload, FiSend } from 'react-icons/fi';
import { FaWhatsapp } from 'react-icons/fa';

export default function Contact() {
  const scramble = useTextScramble("Let's Connect", 600, true);
  const [copied, setCopied] = useState(null);

  const handleCardClick = (item) => {
    // LinkedIn and WhatsApp open directly in new tab
    if (item.external || item.key === 'whatsapp') {
      window.open(item.href, '_blank', 'noopener,noreferrer');
      return;
    }
    // Email and Phone copy to clipboard
    navigator.clipboard.writeText(item.value).then(() => {
      setCopied(item.key);
      setTimeout(() => setCopied(null), 2000);
    });
  };

  const contactItems = [
    {
      key: 'email',
      icon: FiMail,
      label: 'Email',
      value: personal.email,
      href: `mailto:${personal.email}`,
      color: '#6C63FF',
    },
    {
      key: 'phone',
      icon: FiPhone,
      label: 'Phone',
      value: personal.phone,
      href: `tel:${personal.phone}`,
      color: '#45E5C8',
    },
    {
      key: 'whatsapp',
      icon: FaWhatsapp,
      label: 'WhatsApp',
      value: 'Chat on WhatsApp',
      href: 'https://wa.me/919361070003',
      color: '#25D366',
      external: true,
      actionLabel: 'Open',
    },
    {
      key: 'linkedin',
      icon: FiLinkedin,
      label: 'LinkedIn',
      value: 'linkedin.com/in/harish43',
      href: personal.linkedin,
      color: '#0A66C2',
      external: true,
      actionLabel: 'Open',
    },
  ];

  return (
    <section
      id="contact"
      className="relative py-24 w-full bg-bg-ivory flex flex-col items-center justify-center overflow-hidden border-t border-border-glow/50"
    >
      <div className="w-full max-w-7xl mx-auto px-6 z-10">

        {/* Section Heading */}
        <div className="mb-12 text-left">
          <h2
            ref={scramble.ref}
            className="font-display text-4xl md:text-5xl font-bold text-text-primary tracking-tight"
          >
            {scramble.text}
          </h2>
          <div className="w-12 h-1 bg-gradient-to-r from-primary-glow-from to-primary-glow-to mt-2 rounded-full" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          {/* Left: CTA card */}
          <GlassCard className="flex flex-col justify-between p-8 gap-6" hoverGlow>
            <div>
              <span className="text-[10px] font-code font-bold tracking-widest text-primary-glow-from uppercase mb-3 block">
                Open to Opportunities
              </span>
              <h3 className="font-display text-2xl md:text-3xl font-bold text-text-primary leading-snug mb-4">
                Looking for the right{' '}
                <span className="bg-gradient-to-r from-primary-glow-from via-[#FF6B9D] to-[#FFB347] bg-clip-text text-transparent">
                  opportunity.
                </span>
              </h3>
              <p className="text-sm text-text-muted font-body leading-relaxed">
                I'm actively seeking full-time Software Developer roles where I can contribute,
                grow, and build great products. If you're hiring or know of an opening,
                I'd love to connect — I usually reply within a day.
              </p>
            </div>

            {/* Availability badge */}
            <div className="flex items-center gap-2 mt-2">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
              </span>
              <span className="text-xs font-code text-emerald-500 font-bold uppercase tracking-widest">
                Open to full-time roles
              </span>
            </div>

            {/* Resume download */}
            <a
              href="/Harish.pdf"
              download="Harish_M_Resume.pdf"
              className="inline-flex items-center gap-2 self-start px-5 py-2.5 rounded-xl bg-gradient-to-r from-primary-glow-from to-primary-glow-to text-white text-sm font-code font-bold tracking-wide shadow-md hover:shadow-purple-500/30 hover:scale-[1.03] active:scale-[0.98] transition-all duration-200"
            >
              <FiDownload size={14} />
              Download Resume
            </a>
          </GlassCard>

          {/* Right: Contact links */}
          <div className="flex flex-col gap-4">
            {contactItems.map((item) => {
              const Icon = item.icon;
              return (
                <GlassCard
                  key={item.key}
                  className="flex items-center justify-between gap-4 p-5 group hover:shadow-lg transition-all duration-300 cursor-pointer"
                  hoverGlow
                  onClick={() => handleCardClick(item)}
                >
                  <div className="flex items-center gap-4">
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                      style={{ background: `${item.color}18`, border: `1px solid ${item.color}33` }}
                    >
                      <Icon size={16} style={{ color: item.color }} />
                    </div>
                    <div>
                      <p className="text-[10px] font-code font-bold tracking-widest text-text-muted uppercase mb-0.5">
                        {item.label}
                      </p>
                      <p className="text-sm font-code text-text-primary font-medium truncate max-w-[180px] sm:max-w-none">{item.value}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    {/* Copy feedback */}
                    <span
                      className={`text-[10px] font-code transition-opacity duration-200 ${
                        copied === item.key ? 'opacity-100 text-emerald-500' : 'opacity-0'
                      }`}
                    >
                      Copied!
                    </span>

                    {/* Action button */}
                    {item.external ? (
                      <a
                        href={item.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="w-8 h-8 rounded-lg flex items-center justify-center border border-border-glow/50 text-text-muted hover:text-text-primary hover:border-border-glow transition-all"
                        aria-label={`Open ${item.label}`}
                        style={{ '--hover-color': item.color }}
                      >
                        <FiSend size={12} />
                      </a>
                    ) : (
                      <button
                        onClick={(e) => { e.stopPropagation(); handleCardClick(item); }}
                        className="w-8 h-8 rounded-lg flex items-center justify-center border border-border-glow/50 text-text-muted hover:text-text-primary hover:border-border-glow transition-all"
                        aria-label={`Copy ${item.label}`}
                      >
                        <FiSend size={12} />
                      </button>
                    )}
                  </div>
                </GlassCard>
              );
            })}
          </div>

        </div>

        {/* Footer note */}
        <p className="text-center text-[11px] font-code text-text-muted/50 mt-16 tracking-widest uppercase">
          Designed &amp; built by Harish M · {new Date().getFullYear()} · Chennai, India
        </p>

      </div>
    </section>
  );
}
