'use client';

import { useState, useEffect, useRef } from 'react';
import { Play, Pause, RotateCcw, Volume2, VolumeX, Sparkles } from 'lucide-react';

type AmbientSound = 'silence' | 'bell' | 'drone' | 'wind';

export default function MeditationTimer() {
  const [duration, setDuration] = useState(5); // in minutes
  const [timeLeft, setTimeLeft] = useState(5 * 60); // in seconds
  const [isRunning, setIsRunning] = useState(false);
  const [ambientSound, setAmbientSound] = useState<AmbientSound>('silence');
  const [isMuted, setIsMuted] = useState(false);

  const timerRef = useRef<NodeJS.Timeout | null>(null);
  
  // Web Audio API refs for synth sounds
  const audioCtxRef = useRef<AudioContext | null>(null);
  const droneNodeRef = useRef<OscillatorNode | null>(null);
  const droneGainRef = useRef<GainNode | null>(null);
  const windNoiseNodeRef = useRef<AudioWorkletNode | ScriptProcessorNode | null>(null);
  const windGainRef = useRef<GainNode | null>(null);

  // Sync time left when duration changes
  useEffect(() => {
    if (!isRunning) {
      setTimeLeft(duration * 60);
    }
  }, [duration, isRunning]);

  // Main countdown loop
  useEffect(() => {
    if (isRunning) {
      timerRef.current = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            triggerCompletionBell();
            setIsRunning(false);
            stopSounds();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isRunning]);

  // Handle playing ambient sounds based on current state & choices
  useEffect(() => {
    if (isRunning && !isMuted) {
      startSounds();
    } else {
      stopSounds();
    }

    return () => {
      stopSounds();
    };
  }, [isRunning, ambientSound, isMuted]);

  // --- AUDIO SYNTHESIS FUNCTIONS (WEB AUDIO API) ---
  const initAudioContext = () => {
    if (!audioCtxRef.current) {
      audioCtxRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
    }
    if (audioCtxRef.current.state === 'suspended') {
      audioCtxRef.current.resume();
    }
  };

  const startSounds = () => {
    try {
      initAudioContext();
      const ctx = audioCtxRef.current;
      if (!ctx) return;

      stopSounds(); // Ensure anything running is stopped first

      if (ambientSound === 'drone') {
        // Deep Tibetan Sound Bowl / Ethereal Drone Synth
        const osc1 = ctx.createOscillator();
        const osc2 = ctx.createOscillator();
        const filter = ctx.createBiquadFilter();
        const gain = ctx.createGain();

        // Deep warm base frequencies
        osc1.type = 'sawtooth';
        osc1.frequency.setValueAtTime(70.0, ctx.currentTime); // Db note

        osc2.type = 'triangle';
        osc2.frequency.setValueAtTime(70.4, ctx.currentTime); // Detuned slightly for chorus beat

        // Setup filter
        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(150, ctx.currentTime);
        filter.Q.setValueAtTime(5, ctx.currentTime);

        // Setup volume envelope
        gain.gain.setValueAtTime(0, ctx.currentTime);
        gain.gain.linearRampToValueAtTime(0.18, ctx.currentTime + 3.0); // Gentle fade in

        // Connect nodes
        osc1.connect(filter);
        osc2.connect(filter);
        filter.connect(gain);
        gain.connect(ctx.destination);

        osc1.start();
        osc2.start();

        droneNodeRef.current = osc1; // Keep track of main node
        droneGainRef.current = gain;
      } else if (ambientSound === 'wind') {
        // Soft calming forest wind (noise generator)
        const bufferSize = ctx.sampleRate * 2; // 2 seconds
        const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
        const output = noiseBuffer.getChannelData(0);
        
        // Fill buffer with pinkish noise (smooth)
        let lastOut = 0.0;
        for (let i = 0; i < bufferSize; i++) {
          const white = Math.random() * 2 - 1;
          output[i] = (lastOut + (0.02 * white)) / 1.02;
          lastOut = output[i];
          output[i] *= 3.5; // Compensate loss of gain
        }

        const whiteNoise = ctx.createBufferSource();
        whiteNoise.buffer = noiseBuffer;
        whiteNoise.loop = true;

        const filter = ctx.createBiquadFilter();
        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(300, ctx.currentTime);

        // Modulation (LFO) for wind speed gusts
        const lfo = ctx.createOscillator();
        const lfoGain = ctx.createGain();
        lfo.frequency.setValueAtTime(0.08, ctx.currentTime); // extremely slow gust
        lfoGain.gain.setValueAtTime(180, ctx.currentTime); // modulate up/down by 180hz

        lfo.connect(lfoGain);
        lfoGain.connect(filter.frequency);

        const gain = ctx.createGain();
        gain.gain.setValueAtTime(0, ctx.currentTime);
        gain.gain.linearRampToValueAtTime(0.22, ctx.currentTime + 4.0); // Slow fade-in

        whiteNoise.connect(filter);
        filter.connect(gain);
        gain.connect(ctx.destination);

        whiteNoise.start();
        lfo.start();

        droneNodeRef.current = lfo; // track node
        droneGainRef.current = gain;
      }
    } catch (e) {
      console.error('Audio synth error: ', e);
    }
  };

  const stopSounds = () => {
    // Fade out drone/wind
    if (droneGainRef.current && audioCtxRef.current) {
      const g = droneGainRef.current;
      const ctx = audioCtxRef.current;
      try {
        g.gain.cancelScheduledValues(ctx.currentTime);
        g.gain.setValueAtTime(g.gain.value, ctx.currentTime);
        g.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 1.2);
        setTimeout(() => {
          try {
            if (droneNodeRef.current) {
              droneNodeRef.current.stop();
            }
          } catch(e){}
        }, 1300);
      } catch(e){}
      droneGainRef.current = null;
      droneNodeRef.current = null;
    }
  };

  // Tibetan Singing Bowl chime generator
  const triggerCompletionBell = () => {
    if (isMuted) return;
    try {
      initAudioContext();
      const ctx = audioCtxRef.current;
      if (!ctx) return;

      const osc = ctx.createOscillator();
      const oscHarmonic = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(293.66, ctx.currentTime); // D4 note (represents heart chakra)

      oscHarmonic.type = 'sine';
      oscHarmonic.frequency.setValueAtTime(587.32, ctx.currentTime); // Harmonious octave

      gain.gain.setValueAtTime(0, ctx.currentTime);
      gain.gain.linearRampToValueAtTime(0.5, ctx.currentTime + 0.05); // Strike
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 6.0); // Resonance fade

      osc.connect(gain);
      oscHarmonic.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      oscHarmonic.start();

      osc.stop(ctx.currentTime + 6.1);
      oscHarmonic.stop(ctx.currentTime + 6.1);
    } catch(e){}
  };

  // --- CONTROLLER ACTIONS ---
  const handlePlayPause = () => {
    initAudioContext();
    setIsRunning(!isRunning);
  };

  const handleReset = () => {
    setIsRunning(false);
    setTimeLeft(duration * 60);
    stopSounds();
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // Circular progress stroke calculation
  const progressRatio = timeLeft / (duration * 60);
  const strokeDashoffset = 502 * (1 - progressRatio); // SVG path length 502

  return (
    <div className="glass-panel p-8 md:p-10 max-w-4xl mx-auto w-full flex flex-col items-center border border-blue-100/30 shadow-md">
      <div className="flex items-center gap-2 mb-6">
        <Sparkles className="w-5 h-5 text-blue-600" />
        <h3 className="text-2xl font-bold font-outfit text-stone-900">Guided Meditation Sanctuary</h3>
      </div>

      <div className="flex flex-col lg:flex-row items-center justify-between gap-12 w-full mt-4">
        
        {/* Circle Progress Timer */}
        <div className="relative w-64 h-64 flex items-center justify-center bg-white rounded-full shadow-inner shadow-blue-50/30">
          <svg className="w-full h-full transform -rotate-90">
            {/* Background Circle */}
            <circle
              cx="128"
              cy="128"
              r="80"
              className="stroke-blue-50/60"
              strokeWidth="6"
              fill="transparent"
            />
            {/* Active Progress Circle */}
            <circle
              cx="128"
              cy="128"
              r="80"
              className="stroke-blue-600 transition-all duration-300"
              strokeWidth="6"
              fill="transparent"
              strokeDasharray="502"
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="round"
            />
          </svg>

          {/* Core Text Info */}
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-5xl font-extrabold font-outfit text-stone-900 tracking-wider glow-text-accent">
              {formatTime(timeLeft)}
            </span>
            <span className="text-xs uppercase font-bold text-blue-600 tracking-widest mt-1">
              {isRunning ? 'Absorbing...' : 'Meditate'}
            </span>
          </div>
        </div>

        {/* Configurations Panel */}
        <div className="flex-grow flex flex-col justify-between w-full lg:max-w-md">
          {/* Duration Selector */}
          <div className="mb-6">
            <label className="text-xs font-bold text-blue-600 uppercase tracking-wider block mb-2.5">
              Meditation Duration (Minutes)
            </label>
            <div className="grid grid-cols-5 gap-2">
              {[5, 10, 15, 20, 30].map((t) => (
                <button
                  key={t}
                  disabled={isRunning}
                  onClick={() => setDuration(t)}
                  className={`py-2 px-1 rounded-xl text-sm font-semibold font-outfit transition-all duration-300 cursor-pointer ${
                    duration === t
                      ? 'bg-blue-600/10 border border-blue-500/40 text-blue-750'
                      : 'bg-stone-50 border border-stone-200/60 text-stone-600 hover:bg-stone-100 hover:text-stone-900 disabled:opacity-50'
                  }`}
                >
                  {t}m
                </button>
              ))}
            </div>
          </div>

          {/* Soundscapes Selector */}
          <div className="mb-6">
            <label className="text-xs font-bold text-blue-600 uppercase tracking-wider block mb-2.5">
              Calming Audio Environment
            </label>
            <div className="grid grid-cols-3 gap-2">
              {[
                { type: 'silence', label: 'Pure Silence' },
                { type: 'drone', label: 'Tibetan Bowl' },
                { type: 'wind', label: 'Forest Wind' }
              ].map((s) => (
                <button
                  key={s.type}
                  onClick={() => {
                    initAudioContext();
                    setAmbientSound(s.type as AmbientSound);
                  }}
                  className={`py-2.5 px-2 rounded-xl text-xs font-semibold font-outfit transition-all duration-300 cursor-pointer ${
                    ambientSound === s.type
                      ? 'bg-blue-600/10 border border-blue-500/40 text-blue-750'
                      : 'bg-stone-50 border border-stone-200/60 text-stone-600 hover:bg-stone-100 hover:text-stone-900'
                  }`}
                >
                  {s.label}
                </button>
              ))}
            </div>
          </div>

          {/* Control Bar */}
          <div className="flex gap-4">
            {/* Play/Pause Button */}
            <button
              onClick={handlePlayPause}
              className={`flex-grow py-4 rounded-xl flex items-center justify-center gap-2 font-bold font-outfit uppercase tracking-wider transition-all duration-300 cursor-pointer ${
                isRunning
                  ? 'bg-stone-100 border border-stone-200 text-stone-700 hover:bg-stone-200'
                  : 'btn-primary'
              }`}
            >
              {isRunning ? (
                <>
                  <Pause className="w-5 h-5 fill-current" />
                  Pause
                </>
              ) : (
                <>
                  <Play className="w-5 h-5 fill-current" />
                  Enter Meditation
                </>
              )}
            </button>

            {/* Reset Button */}
            <button
              onClick={handleReset}
              className="p-4 bg-stone-50 border border-stone-200/60 hover:bg-stone-100 rounded-xl text-stone-600 hover:text-stone-900 transition-all duration-300 cursor-pointer"
              title="Reset Timer"
            >
              <RotateCcw className="w-5 h-5" />
            </button>

            {/* Audio Bell Tester / Mute */}
            <button
              onClick={() => {
                initAudioContext();
                if (!isMuted) triggerCompletionBell(); // Chime bell as feedback
                setIsMuted(!isMuted);
              }}
              className="p-4 bg-stone-50 border border-stone-200/60 hover:bg-stone-100 rounded-xl text-stone-600 hover:text-stone-900 transition-all duration-300 cursor-pointer"
              title={isMuted ? 'Unmute Bell' : 'Mute Bell / Test Chime'}
            >
              {isMuted ? <VolumeX className="w-5 h-5 text-rose-600" /> : <Volume2 className="w-5 h-5 text-blue-600" />}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
