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

  // Determine circle scale and color based on breathing phase (Adjusted for Blue theme)
  const getCircleStyle = () => {
    if (!isPlaying) return { transform: 'scale(1)', color: 'var(--color-primary)', borderColor: 'rgba(37, 99, 235, 0.12)' };
    
    switch (phase) {
      case 'Inhale':
        const inhalePercent = 1 + ((activePattern.inhale - timeLeft) / activePattern.inhale) * 0.45;
        return {
          transform: `scale(${inhalePercent})`,
          background: 'radial-gradient(circle, rgba(37, 99, 235, 0.16) 0%, rgba(6, 182, 212, 0.05) 70%)',
          borderColor: 'var(--color-primary)',
          boxShadow: '0 0 30px rgba(37, 99, 235, 0.18)',
          color: 'var(--text-primary)'
        };
      case 'Hold':
        return {
          transform: 'scale(1.45)',
          background: 'radial-gradient(circle, rgba(14, 165, 233, 0.18) 0%, rgba(37, 99, 235, 0.05) 70%)',
          borderColor: 'var(--color-accent)',
          boxShadow: '0 0 35px rgba(14, 165, 233, 0.22)',
          color: 'var(--text-primary)'
        };
      case 'Exhale':
        const exhalePercent = 1.45 - ((activePattern.exhale - timeLeft) / activePattern.exhale) * 0.45;
        return {
          transform: `scale(${exhalePercent})`,
          background: 'radial-gradient(circle, rgba(6, 182, 212, 0.15) 0%, rgba(37, 99, 235, 0.03) 70%)',
          borderColor: 'rgba(6, 182, 212, 0.7)',
          boxShadow: '0 0 25px rgba(6, 182, 212, 0.18)',
          color: 'var(--text-primary)'
        };
      case 'Rest':
        return {
          transform: 'scale(1)',
          background: 'radial-gradient(circle, rgba(37, 99, 235, 0.05) 0%, rgba(0, 0, 0, 0) 70%)',
          borderColor: 'rgba(37, 99, 235, 0.08)',
          boxShadow: 'none',
          color: 'var(--text-primary)'
        };
    }
  };

  return (
    <div className="glass-panel p-8 md:p-10 flex flex-col md:flex-row gap-8 items-center max-w-4xl mx-auto w-full border border-blue-100/30 shadow-md">
      {/* Visual Circle Area */}
      <div className="relative w-64 h-64 flex items-center justify-center flex-shrink-0">
        {/* Dynamic Glowing Circle */}
        <div
          style={getCircleStyle()}
          className="absolute w-44 h-44 rounded-full border-2 border-dashed flex flex-col items-center justify-center transition-all duration-1000 ease-out bg-white"
        >
          <span className="text-xl font-bold tracking-wider font-outfit uppercase mt-2 text-stone-505">
            {isPlaying ? phase : 'Ready'}
          </span>
          <span className="text-5xl font-extrabold font-outfit mt-1 text-stone-900 glow-text-primary">
            {isPlaying ? timeLeft : '0'}
          </span>
        </div>

        {/* Outer Ring boundary */}
        <div className="absolute w-64 h-64 rounded-full border border-blue-100/40 pointer-events-none" />
        <div className="absolute w-48 h-48 rounded-full border border-blue-100/20 pointer-events-none" />
      </div>

      {/* Control Area */}
      <div className="flex-grow flex flex-col justify-between w-full">
        <div>
          <div className="flex items-center gap-2 mb-3">
            <Wind className="w-6 h-6 text-blue-600" />
            <h3 className="text-2xl font-bold font-outfit text-stone-900">Breathing Sanctuary</h3>
          </div>
          <p className="text-stone-600 text-sm md:text-base leading-relaxed mb-6 font-inter">
            Tune your heart rate coherence to experience deep silence. Transmission-based meditation begins with harmonizing the breath.
          </p>

          {/* Pattern Selector */}
          <div className="grid grid-cols-3 gap-2.5 mb-6">
            {PATTERNS.map((p, idx) => (
              <button
                key={p.name}
                disabled={isPlaying}
                onClick={() => setPatternIndex(idx)}
                className={`py-2 px-3 rounded-lg text-xs font-semibold font-outfit transition-all duration-300 cursor-pointer ${
                  patternIndex === idx
                    ? 'bg-blue-600/10 border border-blue-500/40 text-blue-700'
                    : 'bg-stone-50 border border-stone-200/60 text-stone-600 hover:bg-stone-100 hover:text-stone-900 disabled:opacity-50'
                }`}
              >
                {p.name}
              </button>
            ))}
          </div>

          <div className="bg-stone-50/70 border border-stone-200/60 rounded-xl p-4 mb-6">
            <div className="flex justify-between items-center mb-1">
              <span className="text-xs text-blue-700 font-bold uppercase tracking-wider">Pattern Description</span>
              {isPlaying && (
                <span className="text-xs text-blue-700 font-bold bg-blue-50 px-2 py-0.5 rounded-full">
                  Cycles Completed: {totalCycles}
                </span>
              )}
            </div>
            <p className="text-stone-600 text-xs md:text-sm font-inter">
              {activePattern.description}
            </p>
          </div>
        </div>

        {/* Action Button */}
        <button
          onClick={handleStartStop}
          className={`w-full py-4 rounded-xl flex items-center justify-center gap-2 font-bold font-outfit uppercase tracking-wider transition-all duration-300 cursor-pointer ${
            isPlaying
              ? 'bg-blue-50 border border-blue-200 text-blue-700 hover:bg-blue-100/70'
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
