import React, { useEffect, useState } from 'react';
import MagneticButton from './ui/MagneticButton';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close menu on scroll
  useEffect(() => {
    if (menuOpen) {
      const close = () => setMenuOpen(false);
      window.addEventListener('scroll', close, { once: true, passive: true });
      return () => window.removeEventListener('scroll', close);
    }
  }, [menuOpen]);

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
        scrolled || menuOpen ? 'bg-bg-ivory/90 backdrop-blur-md border-b border-border-glow' : 'bg-transparent'
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

        {/* Desktop nav */}
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

        {/* Desktop CTA + Mobile hamburger */}
        <div className="flex items-center gap-3">
          <MagneticButton
            as="a"
            href="#contact"
            className="hidden sm:inline-flex px-5 py-2 rounded-full font-code text-xs uppercase tracking-wider bg-text-primary text-bg-ivory border border-text-primary hover:bg-transparent hover:text-text-primary transition-all duration-300 shadow-md shadow-purple-500/5"
          >
            Say Hello ✦
          </MagneticButton>

          {/* Hamburger — mobile only */}
          <button
            onClick={() => setMenuOpen(p => !p)}
            className="md:hidden flex flex-col justify-center items-center w-9 h-9 gap-1.5 rounded-xl border border-border-glow bg-white/40 backdrop-blur-md"
            aria-label="Toggle menu"
          >
            <span
              className="block w-4.5 h-px bg-text-primary rounded-full transition-all duration-300 origin-center"
              style={{ transform: menuOpen ? 'translateY(4px) rotate(45deg)' : 'none', width: '18px' }}
            />
            <span
              className="block h-px bg-text-primary rounded-full transition-all duration-300"
              style={{ width: menuOpen ? '0px' : '14px', opacity: menuOpen ? 0 : 1 }}
            />
            <span
              className="block h-px bg-text-primary rounded-full transition-all duration-300 origin-center"
              style={{ transform: menuOpen ? 'translateY(-4px) rotate(-45deg)' : 'none', width: '18px' }}
            />
          </button>
        </div>
      </div>

      {/* Mobile dropdown menu */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
          menuOpen ? 'max-h-80 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <nav className="flex flex-col gap-1 pt-4 pb-2">
          {navItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              onClick={() => setMenuOpen(false)}
              className="text-sm font-code tracking-wider uppercase text-text-muted hover:text-text-primary hover:bg-primary-glow-from/5 px-3 py-2.5 rounded-xl transition-all duration-200"
            >
              {item.label}
            </a>
          ))}
          <a
            href="#contact"
            onClick={() => setMenuOpen(false)}
            className="mt-2 text-sm font-code tracking-wider uppercase text-white bg-gradient-to-r from-primary-glow-from to-primary-glow-to px-3 py-2.5 rounded-xl text-center"
          >
            Say Hello ✦
          </a>
        </nav>
      </div>
    </header>
  );
}
