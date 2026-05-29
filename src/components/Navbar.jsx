import React, { useEffect, useState } from 'react';
import MagneticButton from './ui/MagneticButton';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { label: 'Home', href: '#hero' },
    { label: 'About', href: '#about' },
    { label: 'Journey', href: '#journey' },
    { label: 'Projects', href: '#projects' },
    { label: 'Skills', href: '#skills' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 py-4 px-6 ${
        scrolled ? 'bg-bg-ivory/60 backdrop-blur-md border-b border-border-glow' : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <a
          href="#hero"
          className="font-display text-xl font-bold tracking-tight text-text-primary hover:opacity-80 transition-opacity"
        >
          HARISH<span className="bg-gradient-to-r from-primary-glow-from to-primary-glow-to bg-clip-text text-transparent">.DEV</span>
        </a>

        {/* Navigation links - hidden on mobile */}
        <nav className="hidden md:flex items-center gap-8 glass px-6 py-2 rounded-full border border-border-glow bg-white/30 backdrop-blur-md">
          {navItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="text-xs font-code tracking-wider uppercase text-text-muted hover:text-text-primary transition-colors duration-300"
            >
              {item.label}
            </a>
          ))}
        </nav>

        {/* CTA Button */}
        <div className="flex items-center gap-4">
          <MagneticButton
            as="a"
            href="#contact"
            className="hidden sm:inline-flex px-5 py-2 rounded-full font-code text-xs uppercase tracking-wider bg-text-primary text-bg-ivory border border-text-primary hover:bg-transparent hover:text-text-primary transition-all duration-300 shadow-md shadow-purple-500/5"
          >
            Say Hello ✦
          </MagneticButton>
        </div>
      </div>
    </header>
  );
}
