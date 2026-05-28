'use client';

import { useState, useEffect } from 'react';
import { 
  Heart, 
  Sparkles, 
  BookOpen, 
  Calendar, 
  ChevronRight, 
  ChevronLeft,
  Quote, 
  User, 
  ShieldCheck, 
  ArrowRight,
  Send,
  CheckCircle2,
  Clock,
  MapPin
} from 'lucide-react';


// Calming Quotes for the slider
const QUOTES = [
  {
    text: "The heart is the master of our system. When we purify the heart, the entire being becomes harmonious and aligned with the divine light.",
    author: "Gopal",
    title: "Heartfulness Trainer"
  },
  {
    text: "Yogic transmission (Pranahuti) is the unique catalyst in Heartfulness. It is not just instruction, but an active flow of spiritual energy directly to the seeker's heart.",
    author: "Heartfulness Philosophy",
    title: "Core Pillar"
  },
  {
    text: "Cleaning is the daily practice of releasing mental impressions (samskaras). By removing yesterday's heavy baggage, we greet today with complete lightness.",
    author: "Gopal",
    title: "Daily Practice Guide"
  }
];

export default function Home() {
  // Quotes Carousel State
  const [activeQuote, setActiveQuote] = useState(0);
  
  // Booking Form State
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    experience: 'beginner',
    sessionType: 'transmission-intro',
    date: ''
  });
  const [isBooked, setIsBooked] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveQuote((prev) => (prev + 1) % QUOTES.length);
    }, 7000);
    return () => clearInterval(interval);
  }, []);

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email) return;
    setIsBooked(true);
  };

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
          Unlock the natural flow of spiritual energy. Experience heart based meditation to cultivate deep inner peace for global peace.
        </p>

        {/* Actions bar */}
        <div className="flex flex-col sm:flex-row gap-4 w-full justify-center max-w-md">
          <button
            onClick={() => scrollToSection('schedule')}
            className="btn-primary py-4 px-8 text-sm uppercase tracking-wider font-bold"
          >
            Book Free Session
          </button>
          <button
            onClick={() => scrollToSection('about')}
            className="btn-secondary py-4 px-8 text-sm uppercase tracking-wider font-bold"
          >
            Meet Trainer
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
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Glowing Vector Frame for Profile (No text overlaid on the image) */}
          <div className="lg:col-span-5 flex flex-col items-center justify-center relative">
            <div className="w-72 h-72 md:w-96 md:h-96 rounded-3xl bg-gradient-to-tr from-blue-600 via-cyan-500 to-sky-400 p-[3px] shadow-xl relative overflow-hidden group mb-6">
              <div className="w-full h-full rounded-[21px] bg-stone-100 relative overflow-hidden">
                {/* Real Trainer Image */}
                <img
                  src="/trainer.jpg"
                  alt="Gopal - Heartfulness Meditation Trainer"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
            </div>
            
            {/* Biography details placed cleanly below the image instead of overlaying it */}
            <div className="text-center">
              <h3 className="text-2xl md:text-3xl font-extrabold font-outfit text-stone-900 leading-none">Gopal</h3>
              <span className="text-xs uppercase font-bold tracking-widest text-blue-650 mt-2.5 block font-inter">
                Heartfulness Trainer
              </span>
              <p className="text-stone-600 text-xs md:text-sm mt-3 italic leading-relaxed max-w-[320px]">
                "Spreading the divine light of yogic transmission for 20+ years."
              </p>
            </div>

            {/* Float badges around frame */}
            <div className="absolute top-[80px] -right-4 md:-right-8 glass-panel py-2.5 px-4 flex items-center gap-2 border border-black/5 shadow-md">
              <ShieldCheck className="w-5 h-5 text-emerald-600" />
              <div className="text-left">
                <p className="text-[10px] text-stone-500 font-bold uppercase leading-none">Trainer Since</p>
                <p className="text-sm font-bold text-stone-900 leading-none mt-0.5">2004</p>
              </div>
            </div>

            <div className="absolute top-[280px] -left-4 md:-left-8 glass-panel py-2.5 px-4 flex items-center gap-2 border border-black/5 shadow-md">
              <Calendar className="w-5 h-5 text-blue-500" />
              <div className="text-left">
                <p className="text-[10px] text-stone-500 font-bold uppercase leading-none">Guided Sessions</p>
                <p className="text-sm font-bold text-stone-900 leading-none mt-0.5">15,000+</p>
              </div>
            </div>
          </div>

          {/* Biographical content */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            <span className="text-xs text-blue-655 font-bold uppercase tracking-wider mb-2 block">Spiritual Mentorship</span>
            <h3 className="text-3xl md:text-5xl font-bold font-outfit text-stone-900 mb-6">
              Guiding Seeker’s Hearts Back to the Source
            </h3>
            
            <p className="text-stone-700 leading-relaxed mb-6 font-inter">
              Gopal has spent over two decades facilitating spiritual transition and cleaning sessions. Under the Heartfulness lineage, he conducts masterclasses globally, translating highly complex metaphysical yogic practices into modern, highly accessible habits.
            </p>

            <p className="text-stone-700 leading-relaxed mb-8 font-inter">
              Whether you are a busy corporate professional seeking nervous system relief, or a spiritual seeker yearning for the highest stages of human absorption, Gopal’s unique teaching style connects directly, using pranahuti (transmission) to clear obstacles and establish inner alignment.
            </p>

            {/* Grid checklist */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                { title: 'Yogic Transmission', desc: 'Direct activation of heart consciousness.' },
                { title: 'Samskara Cleaning', desc: 'Shedding deep-rooted impressions.' },
                { title: 'Daily Breathing Pacing', desc: 'Establishing deep autonomic rest.' },
                { title: 'Individual Mentorship', desc: 'Tailored 1-on-1 spiritual guidelines.' }
              ].map((item) => (
                <div key={item.title} className="flex gap-3">
                  <div className="w-6 h-6 rounded-full bg-blue-50 border border-blue-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-blue-655" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-stone-900">{item.title}</h4>
                    <p className="text-xs text-stone-600 mt-0.5">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* 3. THE 4 PILLARS OF HEARTFULNESS */}
      <section id="philosophy" className="py-24 md:py-32 w-full max-w-7xl px-6 bg-stone-50/40 border-y border-stone-100">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs text-blue-650 font-bold uppercase tracking-wider mb-2 block">Deep Wisdom</span>
          <h3 className="text-3xl md:text-5xl font-bold font-outfit text-stone-900 mb-4">
            The Core Pillars of Heartfulness
          </h3>
          <p className="text-stone-600">
            A comprehensive, scientific approach to spiritual awakening. Discover how these 4 interconnected pillars transform your daily conscious experience.
          </p>
        </div>

        {/* 4 Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              title: 'Meditation',
              num: '01',
              desc: 'Sit comfortably, close your eyes, and gently direct your attention to the source of divine light already present in your heart. Let go of active thoughts.',
              gradient: 'from-blue-650 to-blue-800'
            },
            {
              title: 'Cleaning',
              num: '02',
              desc: 'An active, mental vacuuming process conducted at the end of the day. Intend that all complexities and heavy impressions are leaving your back as smoke.',
              gradient: 'from-cyan-600 to-blue-600'
            },
            {
              title: 'Prayer',
              num: '03',
              desc: 'A gentle nightly reset that aligns the individual ego with the cosmic master. Creating a deep prayerful state creates immense space for transmission.',
              gradient: 'from-blue-700 to-sky-600'
            },
            {
              title: 'Transmission',
              num: '04',
              desc: 'Known as Pranahuti, this is yogic energy flowing directly into your heart from a trainer, immediately unlocking deeper meditative absorption.',
              gradient: 'from-sky-500 to-cyan-500'
            }
          ].map((pillar) => (
            <div key={pillar.num} className="glass-card p-8 flex flex-col justify-between min-h-[300px]">
              <div>
                <div className={`w-12 h-12 rounded-2xl bg-gradient-to-tr ${pillar.gradient} flex items-center justify-center text-white font-extrabold font-outfit text-lg shadow-md mb-6`}>
                  {pillar.num}
                </div>
                <h4 className="text-xl font-bold font-outfit text-stone-900 mb-3">{pillar.title}</h4>
                <p className="text-stone-600 text-sm leading-relaxed">{pillar.desc}</p>
              </div>
              <div className="mt-6 flex items-center gap-1 text-xs text-blue-650 hover:text-blue-800 font-bold cursor-pointer group">
                Learn Practical Application 
                <ChevronRight className="w-3.5 h-3.5 transform group-hover:translate-x-1 transition-transform" />
              </div>
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
              <h4 className="text-base font-bold text-stone-900 leading-none">
                {QUOTES[activeQuote].author}
              </h4>
              <span className="text-xs text-blue-650 font-bold uppercase tracking-wider mt-1.5">
                {QUOTES[activeQuote].title}
              </span>
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

      </section>



      {/* 5. SESSION SCHEDULE & BOOKING PORTAL */}
      <section id="schedule" className="py-24 md:py-32 w-full max-w-7xl px-6 bg-stone-50/40 rounded-3xl relative overflow-hidden border border-stone-100">
        
        {/* Glow vector overlay */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-500/5 rounded-full filter blur-[120px] pointer-events-none" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
          
          {/* Details Column */}
          <div className="lg:col-span-6 flex flex-col justify-center">
            <span className="text-xs text-blue-650 font-bold uppercase tracking-wider mb-2 block">Connect Directly</span>
            <h3 className="text-3xl md:text-5xl font-bold font-outfit text-stone-900 mb-6">
              Experience Pranahuti Live with Gopal
            </h3>
            <p className="text-stone-700 leading-relaxed mb-6 font-inter">
              Heartfulness guided transmission sessions are completely free of charge, in alignment with traditional spiritual principles. Book an individual 1-on-1 virtual session, or register for the daily group meditation masterclass.
            </p>

            {/* Quick Details Check */}
            <div className="flex flex-col gap-4 mt-2">
              {[
                { icon: Clock, title: 'Session Times', desc: 'Individual slots: 6:00 AM & 7:30 PM (IST) daily.' },
                { icon: MapPin, title: 'Interactive Portal', desc: 'Conducted live via Zoom/Google Meet with interactive Q&A.' },
                { icon: Sparkles, title: 'Yogic Cleanse Included', desc: 'Every booking includes a 10-minute active mental impression clearance.' }
              ].map((item, idx) => (
                <div key={idx} className="flex gap-4 items-start">
                  <div className="w-10 h-10 rounded-xl bg-white border border-blue-100/50 flex items-center justify-center text-blue-655 flex-shrink-0 shadow-sm">
                    <item.icon className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-stone-900">{item.title}</h4>
                    <p className="text-xs text-stone-600 mt-0.5">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Booking Form Card Column */}
          <div className="lg:col-span-6 flex justify-center">
            <div className="glass-panel p-8 w-full max-w-md border border-black/5 shadow-md">
              {!isBooked ? (
                <form onSubmit={handleBookingSubmit} className="flex flex-col gap-4">
                  <h4 className="text-xl font-bold font-outfit text-stone-900 mb-2">Request Free Booking</h4>
                  
                  <div>
                    <label className="text-[10px] text-stone-500 font-bold uppercase tracking-wider block mb-1">Your Full Name</label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      placeholder="e.g. Aryan Maurya"
                      className="glass-input w-full p-3 text-sm focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="text-[10px] text-stone-500 font-bold uppercase tracking-wider block mb-1">Your Email</label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      placeholder="e.g. aryan@gmail.com"
                      className="glass-input w-full p-3 text-sm focus:outline-none"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-[10px] text-stone-500 font-bold uppercase tracking-wider block mb-1">Experience</label>
                      <select
                        value={formData.experience}
                        onChange={(e) => setFormData({...formData, experience: e.target.value})}
                        className="glass-input w-full p-3 text-sm focus:outline-none bg-white text-stone-900 cursor-pointer"
                      >
                        <option value="beginner">Beginner</option>
                        <option value="intermediate">Have Meditated</option>
                        <option value="advanced">Experienced</option>
                      </select>
                    </div>

                    <div>
                      <label className="text-[10px] text-stone-500 font-bold uppercase tracking-wider block mb-1">Select Date</label>
                      <input
                        type="date"
                        required
                        value={formData.date}
                        onChange={(e) => setFormData({...formData, date: e.target.value})}
                        className="glass-input w-full p-3 text-sm focus:outline-none bg-white text-stone-900 cursor-pointer"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="btn-primary w-full py-4 mt-2 flex items-center justify-center gap-2 font-bold font-outfit uppercase text-xs tracking-wider"
                  >
                    <Send className="w-4 h-4" />
                    Book Free Session
                  </button>

                  <span className="text-[10px] text-stone-500 text-center mt-2 leading-relaxed block font-inter">
                    *Heartfulness transmission sessions are absolutely free of charge. No payment detail required.
                  </span>
                </form>
              ) : (
                <div className="text-center py-8 flex flex-col items-center justify-center">
                  <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-600 mb-6 animate-bounce">
                    <CheckCircle2 className="w-8 h-8 fill-current" />
                  </div>
                  <h4 className="text-2xl font-bold font-outfit text-stone-900 mb-2">Session Booked!</h4>
                  <p className="text-stone-700 text-sm leading-relaxed max-w-sm mb-6 font-inter">
                    Namaste <strong className="font-bold">{formData.name}</strong>. Gopal has received your request. We have emailed the meditation guidelines and live Zoom credentials to:
                    <br />
                    <span className="text-blue-650 font-bold mt-1.5 block">{formData.email}</span>
                  </p>
                  
                  <button
                    onClick={() => {
                      setIsBooked(false);
                      setFormData({name:'', email:'', experience:'beginner', sessionType:'transmission-intro', date:''});
                    }}
                    className="btn-secondary py-3 px-6 text-xs uppercase tracking-wider font-bold"
                  >
                    Schedule Another
                  </button>
                </div>
              )}
            </div>
          </div>

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
            Experience internal cleanliness and transmission-driven silence. Guided classes and individual cleaning sessions directed by Trainer Gopal in connection with Heartfulness Sahaj Marg spiritual tradition.
          </p>

          {/* Quick legal and links */}
          <div className="flex flex-wrap justify-center gap-x-8 gap-y-3 text-stone-500 text-xs mb-8 font-medium">
            <span className="hover:text-stone-950 cursor-pointer transition-colors" onClick={() => scrollToSection('about')}>Instructor bio</span>
            <span className="hover:text-stone-950 cursor-pointer transition-colors" onClick={() => scrollToSection('philosophy')}>Pillars</span>
            <span className="hover:text-stone-950 cursor-pointer transition-colors" onClick={() => scrollToSection('schedule')}>Daily schedule</span>
          </div>

          <div className="text-stone-500 text-[10px] md:text-xs font-inter">
            © {new Date().getFullYear()} Gopal Heartfulness Meditation. All rights reserved. Spiritual meditation is a voluntary practice.
          </div>
        </div>
      </footer>

    </div>
  );
}
