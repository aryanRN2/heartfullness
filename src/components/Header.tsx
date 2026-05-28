'use client';

import { useState, useEffect } from 'react';
import { Menu, X, Heart, Sparkles } from 'lucide-react';

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      // Offset scroll for navbar height
      const yOffset = -80;
      const y = element.getBoundingClientRect().top + window.scrollY + yOffset;
      
      const lenis = (window as any).lenisInstance;
      if (lenis) {
        lenis.scrollTo(y);
      } else {
        window.scrollTo({ top: y, behavior: 'smooth' });
      }
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? 'py-4 bg-white/75 border-b border-black/5 backdrop-blur-md shadow-lg shadow-blue-50/20'
          : 'py-6 bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        
        {/* Branding Logo */}
        <div 
          onClick={() => scrollToSection('hero')} 
          className="flex items-center gap-2.5 cursor-pointer group"
        >
          {/* We style an elegant glowing heart circle to act as the standard logo */}
          <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-blue-600 to-cyan-500 flex items-center justify-center shadow-lg group-hover:scale-105 transition-all duration-300">
            <Heart className="w-5 h-5 text-white fill-current" />
          </div>
          <div>
            <h1 className="text-lg font-bold font-outfit text-stone-900 leading-none tracking-wide group-hover:text-blue-600 transition-colors duration-300">
              HEARTFULNESS
            </h1>
            <span className="text-[10px] uppercase font-bold text-blue-600 tracking-widest leading-none">
              Gopal Ram Meditation
            </span>
          </div>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          {[
            { id: 'about', label: 'Meet Gopal Ram' },
            { id: 'philosophy', label: 'Philosophy' },
            { id: 'sanctuary', label: 'Sanctuary' },
            { id: 'schedule', label: 'Guided Sessions' },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => scrollToSection(item.id)}
              className="text-stone-600 hover:text-stone-900 font-medium text-sm font-outfit transition-colors duration-300 cursor-pointer relative py-1.5 after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[2px] after:bg-gradient-to-r after:from-blue-600 after:to-cyan-400 after:scale-x-0 hover:after:scale-x-100 after:origin-right hover:after:origin-left after:transition-transform after:duration-300"
            >
              {item.label}
            </button>
          ))}
        </nav>

        {/* Desktop Booking CTA */}
        <div className="hidden md:block">
          <button
            onClick={() => scrollToSection('schedule')}
            className="px-5 py-2.5 bg-gradient-to-r from-blue-600 to-cyan-550 rounded-xl text-xs font-semibold uppercase tracking-wider text-white shadow-lg shadow-blue-500/10 hover:shadow-blue-500/30 hover:scale-105 active:scale-95 transition-all duration-300 flex items-center gap-1.5"
          >
            <Sparkles className="w-3.5 h-3.5" />
            Book Free Session
          </button>
        </div>

        {/* Mobile Menu Trigger */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 text-stone-750 hover:text-stone-950 hover:bg-black/5 rounded-lg transition-colors"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed top-[73px] left-0 right-0 bottom-0 bg-white/95 backdrop-blur-lg z-40 border-t border-black/5 p-6 animate-in fade-in duration-300">
          <div className="flex flex-col gap-6 mt-4">
            {[
              { id: 'about', label: 'Meet Gopal Ram' },
              { id: 'philosophy', label: 'The Philosophy' },
              { id: 'sanctuary', label: 'Practice Sanctuary' },
              { id: 'schedule', label: 'Schedule Sessions' },
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className="text-left text-xl font-bold font-outfit text-stone-700 hover:text-stone-950 py-2 border-b border-black/5"
              >
                {item.label}
              </button>
            ))}
            
            <button
              onClick={() => scrollToSection('schedule')}
              className="mt-4 w-full py-4 bg-gradient-to-r from-blue-600 to-cyan-550 rounded-xl text-sm font-bold uppercase tracking-wider text-white shadow-lg text-center"
            >
              Book Free Session
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
