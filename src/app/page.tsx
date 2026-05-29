'use client';

import { useState, useEffect } from 'react';
import { 
  Heart, 
  Sparkles, 
  BookOpen, 
  ChevronRight, 
  ChevronLeft,
  X,
  Quote, 
  User, 
  ArrowRight,
  Send,
  CheckCircle2,
  Clock,
  MapPin,
  Flower2,
  Wind,
  Play
} from 'lucide-react';


// Calming Quotes for the slider
const QUOTES = [
  {
    text: "The heart is the master of our system. When we purify the heart, the entire being becomes harmonious and aligned with the divine light.",
    author: "",
    title: ""
  },
  {
    text: "Yogic transmission (Pranahuti) is the unique catalyst in Heartfulness. It is not just instruction, but an active flow of spiritual energy directly to the seeker's heart.",
    author: "Heartfulness Philosophy",
    title: "Core Pillar"
  },
  {
    text: "Cleaning is the daily practice of releasing mental impressions (samskaras). By removing yesterday's heavy baggage, we greet today with complete lightness.",
    author: "",
    title: "Daily Practice Guide"
  }
];

export default function Home() {
  // Quotes Carousel State
  const [activeQuote, setActiveQuote] = useState(0);
  
  // Gallery Lightbox State
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  // Dynamic Gallery Images State
  const [galleryImages, setGalleryImages] = useState<any[]>([]);
  const [isLoadingGallery, setIsLoadingGallery] = useState(true);
  
  // Hovered Gallery Item State
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveQuote((prev) => (prev + 1) % QUOTES.length);
    }, 7000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    async function fetchGallery() {
      try {
        const res = await fetch('/api/gallery');
        if (res.ok) {
          const data = await res.json();
          setGalleryImages(data);
        }
      } catch (err) {
        console.error('Error fetching gallery:', err);
      } finally {
        setIsLoadingGallery(false);
      }
    }
    fetchGallery();
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
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
    <div className="w-full flex flex-col items-center select-none" id="hero">
      
      {/* 1. HERO SECTION */}
      <section className="min-h-screen w-full flex flex-col items-center justify-center relative px-6 text-center pt-24 pb-16">
        
        {/* Large spiritual meditation headlines */}
        <h2 className="text-4xl md:text-7xl font-extrabold font-outfit max-w-5xl leading-tight md:leading-tight text-stone-900 mb-6">
          Connect with Your Heart, <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-700 via-cyan-600 to-sky-500 glow-text-primary">
            Experience Deep Silence
          </span>
        </h2>

        <p className="text-stone-700 text-base md:text-xl max-w-2xl font-inter leading-relaxed mb-10">
          Unlock the natural flow of spiritual energy. Experience heart based meditation to cultivate deep inner peace for world peace.
        </p>

        {/* Actions bar */}
        <div className="flex flex-col sm:flex-row gap-4 w-full justify-center max-w-md">
          <button
            onClick={() => scrollToSection('gallery')}
            className="btn-primary py-4 px-8 text-sm uppercase tracking-wider font-bold"
          >
            Explore Gallery
          </button>
        </div>

        {/* Simple floating down indicator */}
        <div 
          onClick={() => scrollToSection('about')}
          className="absolute bottom-8 cursor-pointer text-stone-500 hover:text-stone-800 transition-colors duration-300 animate-bounce flex flex-col items-center"
        >
          <span className="text-[10px] uppercase font-bold tracking-widest mb-1.5">Scroll Down</span>
          <ArrowRight className="w-5 h-5 transform rotate-90 text-blue-650" />
        </div>
      </section>

      {/* 2. ABOUT GOPAL (BIOGRAPHY) */}
      <section id="about" className="py-24 md:py-32 w-full max-w-7xl px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Glowing Vector Frame for Profile (No text overlaid on the image) */}
          <div className="lg:col-span-5 flex flex-col items-center justify-center relative w-full">
            <div className="w-full max-w-[440px] aspect-[1024/781] rounded-3xl bg-gradient-to-tr from-blue-600 via-cyan-500 to-sky-400 p-[3px] shadow-xl relative overflow-hidden group mb-6">
              <div className="w-full h-full rounded-[21px] bg-stone-100 relative overflow-hidden">
                {/* Real Trainer Image */}
                <img
                  src="/trainer.jpg"
                  alt="Gopal - Heartfulness Meditation Trainer"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.02]"
                />
              </div>
            </div>
            
            {/* Biography details placed cleanly below the image instead of overlaying it */}
            <div className="text-center">
              <h3 className="text-2xl md:text-3xl font-extrabold font-outfit text-stone-900 leading-none">Gopal</h3>
              <p className="text-stone-600 text-xs md:text-sm mt-3 italic leading-relaxed max-w-[320px]">
                "Spreading the divine light of yogic transmission for 18+ years."
              </p>
            </div>

          </div>

          {/* Biographical content */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            <span className="text-xs text-blue-655 font-bold uppercase tracking-wider mb-2 block">Spiritual Mentorship</span>
            <h3 className="text-3xl md:text-5xl font-bold font-outfit text-stone-900 mb-6">
              Guiding Seeker’s Hearts Back to the Source
            </h3>
            
            <p className="text-stone-700 leading-relaxed mb-8 font-inter">
              I have served in Judicial Department as Personal Assistant to Additional District Judge Sonbhadra. During service period, I continued spiritual service among the people of my locality. I am leading a purposeful, joyful, and balanced life with my family for last 18 years.
            </p>


          </div>

        </div>
      </section>

      {/* 3. THE 4 PILLARS OF HEARTFULNESS */}
      <section id="philosophy" className="py-24 md:py-32 w-full max-w-7xl px-6 bg-stone-50/40 border-y border-stone-100">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs text-blue-650 font-bold uppercase tracking-wider mb-1.5 block">Meaning of Meditation (Dhyan)</span>
          <div className="text-[11px] md:text-xs font-extrabold tracking-widest uppercase mb-4 select-none flex flex-wrap items-center justify-center gap-1.5">
            <span className="text-blue-655">DHEE</span>
            <span className="text-stone-400 font-normal">+</span>
            <span className="text-blue-655">YAAN</span>
            <span className="text-stone-400 font-normal">=</span>
            <span className="text-stone-800">ULTIMATE WISDOM</span>
            <span className="text-stone-400 font-normal">+</span>
            <span className="text-stone-800">VEHICLE</span>
          </div>
          <h3 className="text-3xl md:text-5xl font-bold font-outfit text-stone-900 mb-4">
            What is Heartfulness?
          </h3>
          <p className="text-stone-600 max-w-2xl mx-auto leading-relaxed">
            Heartfulness is a simple, heart-centered approach to living that connects us with our inner self. It is a modern, practical application of Sahaj Marg (the Natural Path)—a form of Raja Yoga designed to fit seamlessly into daily life.
          </p>
        </div>

        {/* Intro to the Practices */}
        <div className="text-center max-w-3xl mx-auto mt-20 mb-10">
          <h4 className="text-2xl md:text-3xl font-bold font-outfit text-stone-900">
            A Set of Heartfulness Practices
          </h4>
        </div>

        {/* 4 Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              title: 'Relaxation',
              num: '01',
              desc: 'A physical practice to quiet the body so the mind can settle down.',
              gradient: 'from-blue-650 to-blue-800',
              icon: Wind
            },
            {
              title: 'Meditation',
              num: '02',
              desc: "Sitting in silence with the gentle, soft suggestion that a Divine Light is present within the heart. You don't try to force concentration; you simply observe your feelings and let yourself sink inward.",
              gradient: 'from-cyan-600 to-blue-600',
              icon: Flower2
            },
            {
              title: 'Cleaning (The Mental Detox)',
              num: '03',
              desc: "Practiced in the evening, this is a unique element where you use your willpower to actively sweep away the day's accumulated stress, complexities, emotional heaviness, and impressions. It restores a state of inner purity.",
              gradient: 'from-blue-700 to-sky-600',
              icon: Sparkles
            },
            {
              title: 'Prayer (Inner Connection)',
              num: '04',
              desc: 'A brief, reflective practice done before sleep and upon waking to connect deeply with your inner essence and maintain that peaceful state throughout the day.',
              gradient: 'from-sky-500 to-cyan-500',
              icon: Heart
            }
          ].map((pillar) => (
            <div key={pillar.num} className="glass-card p-8 flex flex-col justify-start min-h-[280px]">
              <div className="flex justify-between items-center mb-6">
                <div className={`w-12 h-12 rounded-2xl bg-gradient-to-tr ${pillar.gradient} flex items-center justify-center text-white shadow-md`}>
                  <pillar.icon className="w-6 h-6" />
                </div>
                <span className="text-stone-300 font-extrabold font-outfit text-xl">
                  {pillar.num}
                </span>
              </div>
              <h4 className="text-xl font-bold font-outfit text-stone-900 mb-3">{pillar.title}</h4>
              <p className="text-stone-600 text-sm leading-relaxed">{pillar.desc}</p>
            </div>
          ))}
        </div>

        {/* Dynamic Quotes Carousel inside Philosophy */}
        <div className="glass-panel p-8 md:p-12 max-w-4xl mx-auto mt-20 relative overflow-hidden border border-black/5 shadow-md">
          <div className="absolute top-6 left-6 text-blue-500/5">
            <Quote className="w-24 h-24 stroke-[4]" />
          </div>

          {/* Side navigation arrows for desktop */}
          <button
            onClick={() => setActiveQuote((prev) => (prev - 1 + QUOTES.length) % QUOTES.length)}
            className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/40 hover:bg-white/80 border border-black/5 flex items-center justify-center text-stone-600 hover:text-blue-600 shadow-sm transition-all duration-300 z-20 cursor-pointer hidden md:flex"
            aria-label="Previous quote"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          <button
            onClick={() => setActiveQuote((prev) => (prev + 1) % QUOTES.length)}
            className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/40 hover:bg-white/80 border border-black/5 flex items-center justify-center text-stone-600 hover:text-blue-600 shadow-sm transition-all duration-300 z-20 cursor-pointer hidden md:flex"
            aria-label="Next quote"
          >
            <ChevronRight className="w-5 h-5" />
          </button>

          <div className="relative z-10 flex flex-col items-center text-center">
            {/* Smooth transition container */}
            <div className="min-h-[140px] flex flex-col items-center justify-center transition-all duration-500">
              <p className="text-stone-800 text-lg md:text-xl italic leading-relaxed max-w-2xl mb-6">
                "{QUOTES[activeQuote].text}"
              </p>
              {QUOTES[activeQuote].author && (
                <h4 className="text-base font-bold text-stone-900 leading-none">
                  {QUOTES[activeQuote].author}
                </h4>
              )}
              {QUOTES[activeQuote].title && (
                <span className={`text-xs text-blue-655 font-bold uppercase tracking-wider ${QUOTES[activeQuote].author ? 'mt-1.5' : ''}`}>
                  {QUOTES[activeQuote].title}
                </span>
              )}
            </div>

            {/* Slider Dots and Control Buttons */}
            <div className="flex items-center gap-4 mt-8">
              <button
                onClick={() => setActiveQuote((prev) => (prev - 1 + QUOTES.length) % QUOTES.length)}
                className="w-8 h-8 rounded-full bg-white/45 hover:bg-white/80 border border-black/5 flex items-center justify-center text-stone-600 hover:text-blue-600 shadow-sm transition-all duration-300 cursor-pointer md:hidden"
                aria-label="Previous quote"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>

              <div className="flex gap-2.5">
                {QUOTES.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveQuote(idx)}
                    className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                      activeQuote === idx ? 'bg-blue-600 w-6' : 'bg-stone-300 hover:bg-stone-400'
                    }`}
                    title={`Go to quote ${idx + 1}`}
                  />
                ))}
              </div>

              <button
                onClick={() => setActiveQuote((prev) => (prev + 1) % QUOTES.length)}
                className="w-8 h-8 rounded-full bg-white/45 hover:bg-white/80 border border-black/5 flex items-center justify-center text-stone-600 hover:text-blue-600 shadow-sm transition-all duration-300 cursor-pointer md:hidden"
                aria-label="Next quote"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

      </section>      {/* 5. MEDITATION GALLERY SECTION */}
      <section id="gallery" className="py-24 md:py-32 w-full max-w-7xl px-6 bg-stone-50/40 rounded-3xl relative overflow-hidden border border-stone-100">
        
        {/* Glow vector overlay */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-500/5 rounded-full filter blur-[120px] pointer-events-none" />

        <div className="relative z-10 flex flex-col items-center">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs text-blue-655 font-bold uppercase tracking-wider mb-2 block">World of Stillness</span>
            <h3 className="text-3xl md:text-5xl font-bold font-outfit text-stone-900 mb-4">
              Heartfulness Gallery
            </h3>
            <p className="text-stone-600 font-inter leading-relaxed max-w-2xl mx-auto">
              A glimpse into the quiet sanctuary. Explore moments of deep absorption, collective harmony, and inner stillness. Click on any image to open the interactive lightbox.
            </p>
          </div>

          {/* Masonry free-form layout */}
          {isLoadingGallery ? (
            <div className="flex items-center justify-center py-16 text-stone-500 font-inter">
              <span className="animate-pulse">Loading gallery sanctuary...</span>
            </div>
          ) : galleryImages.length === 0 ? (
            <div className="flex items-center justify-center py-16 text-stone-500 font-inter">
              <span>Gallery is currently empty. Add photos to the gallary folder.</span>
            </div>
          ) : (
            <div
              className="w-full max-w-6xl"
              style={{
                columns: 'var(--gallery-cols, 3)',
                columnGap: '1.25rem',
              }}
            >
              <style>{`
                @media (max-width: 640px)  { :root { --gallery-cols: 1; } }
                @media (min-width: 641px) and (max-width: 1023px) { :root { --gallery-cols: 2; } }
                @media (min-width: 1024px) { :root { --gallery-cols: 3; } }
              `}</style>
              {galleryImages.map((img, idx) => (
                <div
                  key={idx}
                  onClick={() => setLightboxIndex(idx)}
                  onMouseEnter={() => setHoveredIndex(idx)}
                  onMouseLeave={() => setHoveredIndex(null)}
                  className="group relative rounded-2xl overflow-hidden cursor-pointer shadow-lg hover:shadow-xl border border-black/5 bg-white mb-5 break-inside-avoid transition-all duration-500 transform hover:-translate-y-1"
                >
                  {img.type === 'video' ? (
                    <div className="relative w-full overflow-hidden">
                      {hoveredIndex === idx ? (
                        <video
                          src={img.src}
                          muted
                          loop
                          playsInline
                          autoPlay
                          className="w-full h-auto block transition-transform duration-700 scale-105"
                        />
                      ) : (
                        <video
                          src={img.src}
                          muted
                          playsInline
                          preload="metadata"
                          className="w-full h-auto block transition-transform duration-700"
                        />
                      )}
                      {/* Styled video play icon badge */}
                      <div className="absolute top-4 right-4 w-8 h-8 rounded-full bg-black/60 backdrop-blur-sm flex items-center justify-center text-white shadow-md z-10 border border-white/10 group-hover:bg-blue-600 transition-colors duration-300">
                        <Play className="w-3.5 h-3.5 fill-current ml-0.5" />
                      </div>
                    </div>
                  ) : (
                    <img
                      src={img.src}
                      alt={img.title}
                      className="w-full h-auto block transition-transform duration-700 group-hover:scale-105"
                    />
                  )}
                  {/* Hover overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-5">
                    <h4 className="text-white text-base font-bold font-outfit leading-none">{img.title}</h4>
                    <p className="text-stone-300 text-xs mt-1.5 font-inter leading-relaxed line-clamp-2">
                      {img.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* 6. FOOTER */}
      <footer className="w-full border-t border-stone-200/50 bg-stone-100/80 py-12 md:py-16 px-6 text-center mt-24">
        <div className="max-w-7xl mx-auto flex flex-col items-center">
          
          <div className="flex items-center gap-2.5 mb-6">
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-blue-600 to-cyan-500 flex items-center justify-center shadow-lg">
              <Heart className="w-4 h-4 text-white fill-current" />
            </div>
            <h4 className="text-base font-bold font-outfit text-stone-900 leading-none tracking-wide">
              HEARTFULNESS MEDITATION
            </h4>
          </div>

          <p className="text-stone-600 text-xs md:text-sm max-w-xl leading-relaxed mb-8 font-inter">
            Experience internal cleanliness and transmission-driven silence. Discover spiritual absorption and daily cleaning practices guided by Trainer Gopal in connection with the Heartfulness Sahaj Marg spiritual tradition.
          </p>

          {/* Quick legal and links */}
          <div className="flex flex-wrap justify-center gap-x-8 gap-y-3 text-stone-500 text-xs mb-8 font-medium">
            <span className="hover:text-stone-950 cursor-pointer transition-colors" onClick={() => scrollToSection('about')}>Instructor bio</span>
            <span className="hover:text-stone-950 cursor-pointer transition-colors" onClick={() => scrollToSection('philosophy')}>Pillars</span>
            <span className="hover:text-stone-950 cursor-pointer transition-colors" onClick={() => scrollToSection('gallery')}>Heartfulness Gallery</span>
          </div>

          <div className="text-stone-500 text-[10px] md:text-xs font-inter">
            © {new Date().getFullYear()} Gopal Heartfulness Meditation. All rights reserved. Spiritual meditation is a voluntary practice.
          </div>
        </div>
      </footer>

      {/* GALLERY LIGHTBOX MODAL */}
      {lightboxIndex !== null && galleryImages.length > 0 && (
        <div className="fixed inset-0 z-50 bg-stone-950/90 backdrop-blur-md flex items-center justify-center p-4 transition-all duration-300">
          {/* Close button */}
          <button
            onClick={() => setLightboxIndex(null)}
            className="absolute top-6 right-6 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 border border-white/10 flex items-center justify-center text-white cursor-pointer z-50 transition-colors"
            title="Close Lightbox"
          >
            <X className="w-6 h-6" />
          </button>

          {/* Left arrow */}
          <button
            onClick={() => setLightboxIndex((prev) => (prev !== null ? (prev - 1 + galleryImages.length) % galleryImages.length : null))}
            className="absolute left-6 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 border border-white/10 flex items-center justify-center text-white cursor-pointer z-50 transition-colors hidden sm:flex"
            title="Previous Image"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          {/* Image Container with text below */}
          <div className="max-w-4xl max-h-[85vh] flex flex-col items-center gap-6 relative select-none">
            {galleryImages[lightboxIndex]?.type === 'video' ? (
              <video
                src={galleryImages[lightboxIndex]?.src}
                controls
                autoPlay
                className="max-h-[70vh] rounded-2xl object-contain shadow-2xl border border-white/10"
              />
            ) : (
              <img
                src={galleryImages[lightboxIndex]?.src}
                alt={galleryImages[lightboxIndex]?.title}
                className="max-h-[70vh] rounded-2xl object-contain shadow-2xl border border-white/10"
              />
            )}
            
            <div className="text-center text-white max-w-xl px-4">
              <h4 className="text-xl md:text-2xl font-bold font-outfit">{galleryImages[lightboxIndex]?.title}</h4>
              <p className="text-stone-400 text-sm md:text-base mt-2 font-inter leading-relaxed">
                {galleryImages[lightboxIndex]?.desc}
              </p>
            </div>
            
            {/* Mobile swipe indicators */}
            <div className="flex gap-4 sm:hidden mt-2">
              <button
                onClick={() => setLightboxIndex((prev) => (prev !== null ? (prev - 1 + galleryImages.length) % galleryImages.length : null))}
                className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white cursor-pointer"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={() => setLightboxIndex((prev) => (prev !== null ? (prev + 1) % galleryImages.length : null))}
                className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white cursor-pointer"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Right arrow */}
          <button
            onClick={() => setLightboxIndex((prev) => (prev !== null ? (prev + 1) % galleryImages.length : null))}
            className="absolute right-6 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 border border-white/10 flex items-center justify-center text-white cursor-pointer z-50 transition-colors hidden sm:flex"
            title="Next Image"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>
      )}

    </div>
  );
}
