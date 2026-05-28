'use client';

import { useState, useEffect, useRef } from 'react';
import { Wind, Play, Square, Settings, Compass } from 'lucide-react';

interface Pattern {
  name: string;
  inhale: number;
  holdIn: number;
  exhale: number;
  holdOut: number;
  description: string;
}

const PATTERNS: Pattern[] = [
  {
    name: 'Coherent Breathing',
    inhale: 5,
    holdIn: 0,
    exhale: 5,
    holdOut: 0,
    description: 'Stabilizes heart rate variability & calms the nervous system.'
  },
  {
    name: 'Box Breathing',
    inhale: 4,
    holdIn: 4,
    exhale: 4,
    holdOut: 4,
    description: 'Used by high performers to clear the mind and sharpen focus.'
  },
  {
    name: 'Relief (4-7-8)',
    inhale: 4,
    holdIn: 7,
    exhale: 8,
    holdOut: 0,
    description: 'Natural tranquilizer for the nervous system, promotes sleep.'
  }
];

export default function BreathingGuide() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [patternIndex, setPatternIndex] = useState(0);
  const [phase, setPhase] = useState<'Inhale' | 'Hold' | 'Exhale' | 'Rest'>('Inhale');
  const [timeLeft, setTimeLeft] = useState(4);
  const [totalCycles, setTotalCycles] = useState(0);
  
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const activePattern = PATTERNS[patternIndex];

  // Start breathing cycle
  useEffect(() => {
    if (!isPlaying) {
      if (timerRef.current) clearInterval(timerRef.current);
      setPhase('Inhale');
      setTimeLeft(activePattern.inhale);
      return;
    }

    setPhase('Inhale');
    setTimeLeft(activePattern.inhale);

    // Main tick loop
    timerRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          // Switch to next phase
          setPhase((currentPhase) => {
            if (currentPhase === 'Inhale') {
              if (activePattern.holdIn > 0) {
                setTimeLeft(activePattern.holdIn);
                return 'Hold';
              } else {
                setTimeLeft(activePattern.exhale);
                return 'Exhale';
              }
            } else if (currentPhase === 'Hold') {
              setTimeLeft(activePattern.exhale);
              return 'Exhale';
            } else if (currentPhase === 'Exhale') {
              if (activePattern.holdOut > 0) {
                setTimeLeft(activePattern.holdOut);
                return 'Rest';
              } else {
                setTotalCycles((c) => c + 1);
                setTimeLeft(activePattern.inhale);
                return 'Inhale';
              }
            } else {
              // From Rest back to Inhale
              setTotalCycles((c) => c + 1);
              setTimeLeft(activePattern.inhale);
              return 'Inhale';
            }
          });
          return 0; // Temp placeholder, gets overwritten immediately
        }
        return prev - 1;
      });
    }, 1000);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPlaying, patternIndex, activePattern]);

  const handleStartStop = () => {
    setIsPlaying(!isPlaying);
    if (!isPlaying) setTotalCycles(0);
  };

  // Determine circle scale and color based on breathing phase
  const getCircleStyle = () => {
    if (!isPlaying) return { transform: 'scale(1)', color: 'var(--color-primary)' };
    
    switch (phase) {
      case 'Inhale':
        const inhalePercent = 1 + ((activePattern.inhale - timeLeft) / activePattern.inhale) * 0.45;
        return {
          transform: `scale(${inhalePercent})`,
          background: 'radial-gradient(circle, rgba(139, 92, 246, 0.4) 0%, rgba(255, 51, 119, 0.1) 70%)',
          borderColor: 'var(--color-primary)',
          boxShadow: '0 0 40px rgba(255, 51, 119, 0.5)'
        };
      case 'Hold':
        return {
          transform: 'scale(1.45)',
          background: 'radial-gradient(circle, rgba(255, 190, 59, 0.4) 0%, rgba(139, 92, 246, 0.15) 70%)',
          borderColor: 'var(--color-gold)',
          boxShadow: '0 0 50px rgba(255, 190, 59, 0.6)'
        };
      case 'Exhale':
        const exhalePercent = 1.45 - ((activePattern.exhale - timeLeft) / activePattern.exhale) * 0.45;
        return {
          transform: `scale(${exhalePercent})`,
          background: 'radial-gradient(circle, rgba(0, 242, 254, 0.3) 0%, rgba(139, 92, 246, 0.1) 70%)',
          borderColor: 'rgba(0, 242, 254, 0.8)',
          boxShadow: '0 0 35px rgba(0, 242, 254, 0.4)'
        };
      case 'Rest':
        return {
          transform: 'scale(1)',
          background: 'radial-gradient(circle, rgba(139, 92, 246, 0.1) 0%, rgba(0, 0, 0, 0) 70%)',
          borderColor: 'rgba(255, 255, 255, 0.2)',
          boxShadow: 'none'
        };
    }
  };

  return (
    <div className="glass-panel p-8 md:p-10 flex flex-col md:flex-row gap-8 items-center max-w-4xl mx-auto w-full">
      {/* Visual Circle Area */}
      <div className="relative w-64 h-64 flex items-center justify-center flex-shrink-0">
        {/* Dynamic Glowing Circle */}
        <div
          style={getCircleStyle()}
          className="absolute w-44 h-44 rounded-full border-2 border-dashed flex flex-col items-center justify-center transition-all duration-1000 ease-out"
        >
          <span className="text-2xl font-bold tracking-wider font-outfit uppercase mt-2">
            {isPlaying ? phase : 'Ready'}
          </span>
          <span className="text-5xl font-extrabold font-outfit mt-1 glow-text-primary">
            {isPlaying ? timeLeft : '0'}
          </span>
        </div>

        {/* Outer Ring boundary */}
        <div className="absolute w-64 h-64 rounded-full border border-white/5 pointer-events-none" />
        <div className="absolute w-48 h-48 rounded-full border border-white/10 pointer-events-none" />
      </div>

      {/* Control Area */}
      <div className="flex-grow flex flex-col justify-between w-full">
        <div>
          <div className="flex items-center gap-2 mb-3">
            <Wind className="w-6 h-6 text-violet-400" />
            <h3 className="text-2xl font-bold font-outfit">Breathing Sanctuary</h3>
          </div>
          <p className="text-stone-300 text-sm md:text-base leading-relaxed mb-6">
            Tune your heart rate coherence to experience deep silence. Transmission-based meditation begins with harmonizing the breath.
          </p>

          {/* Pattern Selector */}
          <div className="grid grid-cols-3 gap-2.5 mb-6">
            {PATTERNS.map((p, idx) => (
              <button
                key={p.name}
                disabled={isPlaying}
                onClick={() => setPatternIndex(idx)}
                className={`py-2 px-3 rounded-lg text-xs font-semibold font-outfit transition-all duration-300 ${
                  patternIndex === idx
                    ? 'bg-violet-600/30 border border-violet-500/50 text-white'
                    : 'bg-white/5 border border-white/5 text-stone-400 hover:bg-white/10 hover:text-white disabled:opacity-50'
                }`}
              >
                {p.name}
              </button>
            ))}
          </div>

          <div className="bg-white/3 border border-white/5 rounded-xl p-4 mb-6">
            <div className="flex justify-between items-center mb-1">
              <span className="text-xs text-violet-300 font-bold uppercase tracking-wider">Pattern Description</span>
              {isPlaying && (
                <span className="text-xs text-violet-300 font-bold bg-violet-950/40 px-2 py-0.5 rounded-full">
                  Cycles Completed: {totalCycles}
                </span>
              )}
            </div>
            <p className="text-stone-300 text-xs md:text-sm">
              {activePattern.description}
            </p>
          </div>
        </div>

        {/* Action Button */}
        <button
          onClick={handleStartStop}
          className={`w-full py-4 rounded-xl flex items-center justify-center gap-2 font-bold font-outfit uppercase tracking-wider transition-all duration-300 ${
            isPlaying
              ? 'bg-rose-500/20 border border-rose-500/50 text-rose-300 hover:bg-rose-500/30'
              : 'btn-primary'
          }`}
        >
          {isPlaying ? (
            <>
              <Square className="w-5 h-5 fill-current" />
              Stop Breathing Guide
            </>
          ) : (
            <>
              <Play className="w-5 h-5 fill-current" />
              Begin Session
            </>
          )}
        </button>
      </div>
    </div>
  );
}
