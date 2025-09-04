'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';

// Create audio context
interface SoundContextType {
  playSound: (soundType: string) => void;
  soundEnabled: boolean;
  toggleSound: () => void;
}

const SoundContext = createContext<SoundContextType | undefined>(undefined);

// Sound data - using Web Audio API for better control
const sounds = {
  click: { frequency: 800, duration: 0.1, type: 'click' },
  success: { frequency: 600, duration: 0.3, type: 'success' },
  error: { frequency: 200, duration: 0.5, type: 'error' },
  completion: { frequency: [440, 554, 659], duration: 0.8, type: 'completion' },
  hover: { frequency: 1000, duration: 0.05, type: 'hover' },
  transition: { frequency: 400, duration: 0.2, type: 'transition' },
  milestone: { frequency: [330, 440, 550], duration: 1.0, type: 'milestone' }
};

interface SoundProviderProps {
  children: React.ReactNode;
}

export function SoundProvider({ children }: SoundProviderProps) {
  const [soundEnabled, setSoundEnabled] = useState(false);
  const [audioContext, setAudioContext] = useState<AudioContext | null>(null);

  useEffect(() => {
    // Initialize audio context on first user interaction
    const initAudio = () => {
      if (!audioContext) {
        const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
        const ctx = new AudioCtx();
        setAudioContext(ctx);
      }
    };

    // Check localStorage for sound preference
    const savedSoundState = localStorage.getItem('soundEnabled');
    if (savedSoundState !== null) {
      setSoundEnabled(JSON.parse(savedSoundState));
    }

    // Initialize on first click
    document.addEventListener('click', initAudio, { once: true });
    
    return () => {
      document.removeEventListener('click', initAudio);
    };
  }, [audioContext]);

  const playTone = (frequency: number, duration: number, type: string = 'sine') => {
    if (!audioContext || !soundEnabled) return;

    try {
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();

      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);

      oscillator.frequency.setValueAtTime(frequency, audioContext.currentTime);
      oscillator.type = type as OscillatorType;

      // Create envelope for smoother sound
      gainNode.gain.setValueAtTime(0, audioContext.currentTime);
      gainNode.gain.linearRampToValueAtTime(0.1, audioContext.currentTime + 0.01);
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + duration);

      oscillator.start(audioContext.currentTime);
      oscillator.stop(audioContext.currentTime + duration);
    } catch (error) {
      console.warn('Audio playback failed:', error);
    }
  };

  const playChord = (frequencies: number[], duration: number) => {
    frequencies.forEach((freq, index) => {
      setTimeout(() => playTone(freq, duration / frequencies.length), index * 100);
    });
  };

  const playSound = (soundType: string) => {
    if (!soundEnabled || !audioContext) return;

    const sound = sounds[soundType as keyof typeof sounds];
    if (!sound) return;

    if (audioContext.state === 'suspended') {
      audioContext.resume();
    }

    if (Array.isArray(sound.frequency)) {
      playChord(sound.frequency, sound.duration);
    } else {
      playTone(sound.frequency, sound.duration);
    }
  };

  const toggleSound = () => {
    const newState = !soundEnabled;
    setSoundEnabled(newState);
    localStorage.setItem('soundEnabled', JSON.stringify(newState));
    
    // Play a test sound when enabling
    if (newState && audioContext) {
      setTimeout(() => playSound('click'), 100);
    }
  };

  return (
    <SoundContext.Provider value={{ playSound, soundEnabled, toggleSound }}>
      {children}
    </SoundContext.Provider>
  );
}

export function useSound() {
  const context = useContext(SoundContext);
  if (context === undefined) {
    throw new Error('useSound must be used within a SoundProvider');
  }
  return context;
}

// Sound toggle button component
export function SoundToggle() {
  const { soundEnabled, toggleSound } = useSound();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="fixed top-4 right-4 z-50"
    >
      <Button
        variant="outline"
        size="sm"
        onClick={toggleSound}
        className="flex items-center space-x-2 bg-white/80 backdrop-blur-sm border border-gray-200 hover:bg-gray-50"
        title={soundEnabled ? 'Отключить звуки' : 'Включить звуки'}
      >
        <motion.div
          animate={{ scale: soundEnabled ? 1 : 0.8, opacity: soundEnabled ? 1 : 0.5 }}
          transition={{ type: "spring", stiffness: 400, damping: 17 }}
        >
          {soundEnabled ? (
            <Volume2 className="w-4 h-4 text-green-600" />
          ) : (
            <VolumeX className="w-4 h-4 text-gray-400" />
          )}
        </motion.div>
        <span className="text-xs hidden sm:inline">
          {soundEnabled ? 'Вкл' : 'Выкл'}
        </span>
      </Button>
    </motion.div>
  );
}

// Hook for components to play sounds with actions
export function useSoundEffects() {
  const { playSound } = useSound();

  return {
    playClick: () => playSound('click'),
    playSuccess: () => playSound('success'),
    playError: () => playSound('error'),
    playCompletion: () => playSound('completion'),
    playHover: () => playSound('hover'),
    playTransition: () => playSound('transition'),
    playMilestone: () => playSound('milestone')
  };
}

// Wrapper components that add sound to common interactions
interface SoundButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  soundType?: keyof typeof sounds;
  className?: string;
  [key: string]: unknown;
}

export function SoundButton({ 
  children, 
  onClick, 
  soundType = 'click', 
  className,
  ...props 
}: SoundButtonProps) {
  const { playSound } = useSound();

  const handleClick = () => {
    playSound(soundType);
    onClick?.();
  };

  return (
    <Button
      className={className}
      onClick={handleClick}
      {...props}
    >
      {children}
    </Button>
  );
}