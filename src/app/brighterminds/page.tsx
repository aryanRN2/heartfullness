'use client';

import { useState } from 'react';
import Link from 'next/link';
import { 
  ArrowLeft, 
  Sparkles, 
  Brain, 
  Eye, 
  BookOpen, 
  Heart, 
  Smile, 
  Zap, 
  Play, 
  Volume2,
  Award,
  ChevronRight,
  ShieldCheck,
  Compass
} from 'lucide-react';

export default function BrighterMindsPage() {
  const [activeVideo, setActiveVideo] = useState<string | null>(null);

  const videos = [
    {
      title: "Sensory & Cognitive Development",
      desc: "Watch children demonstrate enhanced sensory perception and brain-hemisphere coordination under the Brighter Minds initiative.",
      src: "/brightersminds/WhatsApp%20Video%202026-06-20%20at%2008.11.28%20(1).mp4"
    },
    {
      title: "Right & Left Brain Synchronization",
      desc: "Exercises showcasing whole-brain activation, combining logical and creative capabilities for cognitive growth.",
      src: "/brightersminds/WhatsApp%20Video%202026-06-20%20at%2008.11.28%20(2).mp4"
    },
    {
      title: "Intuitive Focus & Concentration",
      desc: "Demonstration of kids achieving deep focus, leading to improved memory, retention, and spatial awareness.",
      src: "/brightersminds/WhatsApp%20Video%202026-06-20%20at%2008.11.28.mp4"
    }
  ];

  return (
    <div className="w-full min-h-screen flex flex-col items-center bg-stone-50 select-none pb-24">
      <header className="fixed top-0 left-0 right-0 z-50 py-2 sm:py-2.5 bg-white/75 border-b border-black/5 backdrop-blur-md shadow-lg shadow-pink-500/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between">
          <Link href="/" className="flex items-center group py-1">
            <img
              src="/brighterminds_logo.png"
              alt="Brighter Minds Logo"
              className="h-9 sm:h-12 md:h-16 w-auto object-contain group-hover:scale-105 transition-transform duration-300"
            />
          </Link>

          <Link
            href="/"
            className="px-2.5 py-1.5 sm:px-4 sm:py-2 border border-stone-200 hover:border-pink-500 hover:text-pink-600 rounded-xl text-[10px] sm:text-xs font-semibold uppercase tracking-wider text-stone-600 transition-all duration-300 flex items-center gap-1 shadow-sm bg-white"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            Back <span className="hidden sm:inline">to Home</span>
          </Link>
        </div>
      </header>

      {/* Ambient pink/rose glow background effect */}
      <div className="absolute top-0 right-1/4 w-[280px] sm:w-[500px] h-[280px] sm:h-[500px] bg-pink-300/10 rounded-full filter blur-[80px] sm:blur-[100px] pointer-events-none z-0" />
      <div className="absolute top-1/3 left-1/4 w-[240px] sm:w-[400px] h-[240px] sm:h-[400px] bg-rose-300/10 rounded-full filter blur-[90px] sm:blur-[120px] pointer-events-none z-0" />

      {/* 2. HERO SECTION */}
      <section className="pt-24 sm:pt-36 pb-12 sm:pb-16 px-4 sm:px-6 text-center max-w-5xl relative z-10 flex flex-col items-center">
        <h2 className="text-3xl sm:text-5xl md:text-7xl font-extrabold font-outfit leading-[1.1] mb-6 tracking-tight">
          <span className="text-[#facc15]">BRIGHTER</span> <span className="text-[#ec4899]">LIVES</span>
          <span className="block mt-1 sm:mt-2"><span className="text-[#a3e635]">BRIGHTER</span> <span className="text-[#a855f7]">FUTURES</span></span>
        </h2>

        <p className="text-stone-700 text-xs sm:text-base md:text-xl max-w-3xl font-inter leading-relaxed mb-6 sm:mb-10">
          Brighter Minds is a methodology designed to grow the brain’s ability to optimize performance through differential recruitment of neural network.
        </p>

        {/* Action badges */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 sm:gap-4 w-full max-w-4xl mt-2 sm:mt-4">
          {[
            { label: "Ages 5 - 15", sub: "Ideal brain growth window", icon: Smile, color: "text-rose-500 bg-rose-50 border-rose-100" },
            { label: "Whole-Brain Balance", sub: "Left & right integration", icon: Brain, color: "text-pink-500 bg-pink-50 border-pink-100" },
            { label: "Neuroplasticity", sub: "Rewiring neural pathways", icon: Zap, color: "text-fuchsia-500 bg-fuchsia-50 border-fuchsia-100" },
            { label: "Intuition & Focus", sub: "Enhanced mindfulness", icon: Compass, color: "text-rose-600 bg-rose-50 border-rose-100" }
          ].map((badge, idx) => (
            <div key={idx} className="glass-card p-3 sm:p-5 flex flex-col items-center text-center border border-black/5 bg-white/60">
              <div className={`w-8 h-8 sm:w-10 sm:h-10 rounded-xl flex items-center justify-center mb-2 sm:mb-3 border ${badge.color}`}>
                <badge.icon className="w-4 h-4 sm:w-5 sm:h-5" />
              </div>
              <h4 className="text-[11px] sm:text-sm font-bold text-stone-900 leading-tight">{badge.label}</h4>
              <p className="text-[9px] sm:text-[11px] text-stone-500 mt-1">{badge.sub}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 3. DEDICATED VIDEO SHOWCASE */}
      <section className="py-12 sm:py-16 w-full max-w-7xl px-4 sm:px-6 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-12">
          <span className="text-xs text-pink-650 font-bold uppercase tracking-wider mb-2 block">Observe the Results</span>
          <h3 className="text-2xl sm:text-3xl md:text-5xl font-bold font-outfit text-stone-900 mb-3 sm:mb-4">
            Brighter Minds in Action
          </h3>
          <p className="text-stone-600 text-xs sm:text-sm md:text-base font-inter leading-relaxed max-w-xl mx-auto">
            Witness how our participants develop cognitive focus and sensory capabilities. Watch the showcase videos below.
          </p>
        </div>

        {/* Video Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {videos.map((vid, idx) => (
            <div key={idx} className="glass-card overflow-hidden border border-black/5 bg-white shadow-xl hover:shadow-2xl transition-all duration-300 flex flex-col justify-between rounded-2xl group">
              <div className="relative w-full bg-stone-950 overflow-hidden flex items-center justify-center">
                <video
                  src={vid.src}
                  controls
                  preload="metadata"
                  className="w-full h-auto block"
                />
              </div>
              
              <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between">
                <div>
                  <h4 className="text-base sm:text-lg font-bold font-outfit text-stone-900 mb-2 group-hover:text-pink-600 transition-colors">
                    {vid.title}
                  </h4>
                  <p className="text-stone-600 text-xs md:text-sm leading-relaxed mb-4">
                    {vid.desc}
                  </p>
                </div>
                
                <div className="pt-4 border-t border-stone-100 flex items-center justify-between text-xs text-stone-500 font-semibold font-outfit">
                  <span className="flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4 text-emerald-500" />
                    Verified Training
                  </span>
                  <span className="text-pink-650 uppercase tracking-widest text-[10px]">
                    Interactive
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. METHODOLOGY & SCIENCE SECTION */}
      <section className="py-12 sm:py-16 w-full max-w-5xl px-4 sm:px-6 relative z-10 border-t border-stone-200/50 mt-8 sm:mt-12 text-center mx-auto">
        <span className="text-xs text-pink-650 font-bold uppercase tracking-wider mb-2 block">Our Methodology</span>
        <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold font-outfit text-stone-900 mb-4 sm:mb-6">
          How Brighter Minds Enhances Cognitive Reserve
        </h3>
        <p className="text-stone-700 text-xs sm:text-sm md:text-base leading-relaxed mb-4 sm:mb-6 font-inter max-w-3xl mx-auto">
          The human brain possesses an incredible ability called neuroplasticity—the capacity to construct new connections and adapt based on environmental stimulation and practice. 
        </p>
        <p className="text-stone-700 text-xs sm:text-sm md:text-base leading-relaxed mb-8 sm:mb-12 font-inter max-w-3xl mx-auto">
          During child development (specifically between ages 5 to 15), the brain is highly receptive. The Brighter Minds training leverages this window using specialized tools, cognitive challenges, sound frequencies, and focus exercises to foster whole-brain synchronization.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6 w-full mt-4">
          {[
            { title: "Sound Wave Frequencies", desc: "Proprietary soundscapes to align brainwave patterns into optimal learning zones.", icon: Volume2 },
            { title: "Brain Gymnastics", desc: "Physical movements designed to stimulate cross-hemisphere brain activity.", icon: Brain },
            { title: "Sensory Activation", desc: "Mindfulness and blindfolded activities that sharpen non-visual focus and observation.", icon: Eye }
          ].map((step, idx) => (
            <div key={idx} className="flex flex-col items-center p-5 sm:p-6 bg-white border border-stone-200/60 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 rounded-xl bg-pink-100 flex items-center justify-center text-pink-650 mb-4 border border-pink-200">
                <step.icon className="w-5 h-5" />
              </div>
              <h5 className="font-bold text-stone-900 text-xs sm:text-sm md:text-base leading-none mb-3">{step.title}</h5>
              <p className="text-stone-600 text-xs md:text-sm leading-relaxed">{step.desc}</p>
            </div>
          ))}
        </div>
      </section>


    </div>
  );
}
