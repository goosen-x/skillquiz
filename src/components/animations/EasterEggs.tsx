'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { useSoundEffects } from './SoundEffects';

// Konami Code: ↑↑↓↓←→←→BA
const KONAMI_CODE = [
  'ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown',
  'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight',
  'KeyB', 'KeyA'
];

interface EasterEggProviderProps {
  children: React.ReactNode;
}

export function EasterEggProvider({ children }: EasterEggProviderProps) {
  const [konamiProgress, setKonamiProgress] = useState(0);
  const [showKonamiReward, setShowKonamiReward] = useState(false);
  const [clickCount, setClickCount] = useState(0);
  const [lastClickTime, setLastClickTime] = useState(0);
  const [showClickReward, setShowClickReward] = useState(false);
  const [foundEggs, setFoundEggs] = useState<string[]>([]);
  
  const { playSuccess, playCompletion } = useSoundEffects();

  const activateKonamiReward = React.useCallback(() => {
    playCompletion();
    setShowKonamiReward(true);
    
    // Epic confetti explosion
    const duration = 3000;
    const animationEnd = Date.now() + duration;
    
    const randomInRange = (min: number, max: number) => {
      return Math.random() * (max - min) + min;
    };

    const frame = () => {
      confetti({
        particleCount: 2,
        angle: randomInRange(55, 125),
        spread: randomInRange(50, 70),
        origin: { x: randomInRange(0.1, 0.9), y: Math.random() - 0.2 },
        colors: ['#ff0000', '#00ff00', '#0000ff', '#ffff00', '#ff00ff', '#00ffff']
      });

      if (Date.now() < animationEnd) {
        requestAnimationFrame(frame);
      }
    };
    
    frame();
    
    setTimeout(() => setShowKonamiReward(false), 5000);
    
    if (!foundEggs.includes('konami')) {
      setFoundEggs(prev => [...prev, 'konami']);
    }
  }, [playCompletion, foundEggs]);

  // Konami Code detection
  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      const expectedKey = KONAMI_CODE[konamiProgress];
      
      if (event.code === expectedKey) {
        const newProgress = konamiProgress + 1;
        setKonamiProgress(newProgress);
        
        if (newProgress === KONAMI_CODE.length) {
          // Konami code completed!
          activateKonamiReward();
          setKonamiProgress(0);
        }
      } else {
        setKonamiProgress(0);
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [konamiProgress, activateKonamiReward]);

  const activateClickReward = React.useCallback(() => {
    playSuccess();
    setShowClickReward(true);
    
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#ffd700', '#ff6347', '#98fb98']
    });
    
    setTimeout(() => setShowClickReward(false), 3000);
  }, [playSuccess]);

  // Rapid clicking detection (10 clicks in 3 seconds)
  const handleGlobalClick = React.useCallback(() => {
    const now = Date.now();
    
    if (now - lastClickTime < 3000) {
      const newCount = clickCount + 1;
      setClickCount(newCount);
      
      if (newCount >= 10 && !foundEggs.includes('rapid-click')) {
        activateClickReward();
        setFoundEggs(prev => [...prev, 'rapid-click']);
        setClickCount(0);
      }
    } else {
      setClickCount(1);
    }
    
    setLastClickTime(now);
  }, [clickCount, lastClickTime, foundEggs, activateClickReward]);

  useEffect(() => {
    document.addEventListener('click', handleGlobalClick);
    return () => document.removeEventListener('click', handleGlobalClick);
  }, [handleGlobalClick]);


  return (
    <div>
      {children}
      
      {/* Konami Code Reward */}
      <AnimatePresence>
        {showKonamiReward && (
          <KonamiReward onClose={() => setShowKonamiReward(false)} />
        )}
      </AnimatePresence>

      {/* Click Reward */}
      <AnimatePresence>
        {showClickReward && (
          <ClickReward />
        )}
      </AnimatePresence>

      {/* Hidden elements that trigger rewards */}
      <HiddenTriggers onEggFound={(eggName) => {
        if (!foundEggs.includes(eggName)) {
          setFoundEggs(prev => [...prev, eggName]);
          playSuccess();
        }
      }} />

      {/* Progress indicator for Konami code (subtle) */}
      {konamiProgress > 0 && konamiProgress < KONAMI_CODE.length && (
        <motion.div
          className="fixed bottom-4 left-4 z-50 opacity-30"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          exit={{ scale: 0 }}
        >
          <div className="flex space-x-1">
            {KONAMI_CODE.map((_, index) => (
              <div
                key={index}
                className={`w-2 h-2 rounded-full ${
                  index < konamiProgress ? 'bg-green-500' : 'bg-gray-300'
                }`}
              />
            ))}
          </div>
        </motion.div>
      )}

      {/* Easter egg counter (only show if any found) */}
      {foundEggs.length > 0 && (
        <EggCounter count={foundEggs.length} />
      )}
    </div>
  );
}

function KonamiReward({ onClose }: { onClose: () => void }) {
  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        className="bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 rounded-2xl p-8 m-4 max-w-md w-full text-center shadow-2xl text-white relative overflow-hidden"
        initial={{ scale: 0.8, rotateY: -90 }}
        animate={{ scale: 1, rotateY: 0 }}
        exit={{ scale: 0.8, rotateY: 90 }}
        transition={{ type: "spring", duration: 0.8 }}
      >
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
          animate={{
            x: [-300, 300]
          }}
          transition={{
            duration: 2,
            repeat: Infinity
          }}
        />
        
        <motion.div
          className="text-6xl mb-4"
          animate={{
            rotate: [0, 360],
            scale: [1, 1.2, 1]
          }}
          transition={{
            duration: 2,
            repeat: Infinity
          }}
        >
          🎮
        </motion.div>
        
        <h3 className="text-2xl font-bold mb-3">
          KONAMI CODE!
        </h3>
        
        <p className="text-lg mb-6 opacity-90">
          Вы нашли секретный код! 
          <br />
          Настоящий игрок! 🏆
        </p>

        <div className="flex justify-center space-x-2">
          {['⭐', '🎯', '💫', '🚀', '⚡'].map((emoji, index) => (
            <motion.span
              key={index}
              className="text-2xl"
              animate={{ 
                y: [0, -10, 0],
                rotate: [0, 360]
              }}
              transition={{ 
                duration: 1.5, 
                repeat: Infinity, 
                delay: index * 0.2 
              }}
            >
              {emoji}
            </motion.span>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
}

function ClickReward() {
  return (
    <motion.div
      className="fixed top-20 right-4 z-50 bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-6 py-4 rounded-lg shadow-lg max-w-sm"
      initial={{ x: 300, opacity: 0, rotate: 10 }}
      animate={{ x: 0, opacity: 1, rotate: 0 }}
      exit={{ x: 300, opacity: 0, rotate: -10 }}
      transition={{ type: "spring", duration: 0.6 }}
    >
      <div className="flex items-center space-x-3">
        <motion.div
          className="text-3xl"
          animate={{
            scale: [1, 1.3, 1],
            rotate: [0, 180, 360]
          }}
          transition={{ duration: 1, repeat: 2 }}
        >
          🎯
        </motion.div>
        <div>
          <h4 className="font-bold">Быстрые пальцы!</h4>
          <p className="text-sm opacity-90">Вы нашли скрытый триггер!</p>
        </div>
      </div>
    </motion.div>
  );
}

function HiddenTriggers({ onEggFound }: { onEggFound: (eggName: string) => void }) {
  const [hoverCount, setHoverCount] = useState(0);
  
  return (
    <>
      {/* Long hover trigger - invisible area */}
      <motion.div
        className="fixed bottom-0 left-0 w-20 h-20 opacity-0 cursor-pointer"
        onMouseEnter={() => {
          const newCount = hoverCount + 1;
          setHoverCount(newCount);
          if (newCount >= 5) {
            onEggFound('hover-master');
            setHoverCount(0);
          }
        }}
        whileHover={{ scale: 1.1 }}
        title="🥚"
      />

      {/* Double-click somewhere specific */}
      <div
        className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-1 h-1 opacity-0 cursor-pointer"
        onDoubleClick={() => onEggFound('center-double-click')}
      />

      {/* Sequence trigger - specific element hovering */}
      <div className="fixed top-0 left-0 right-0 bottom-0 pointer-events-none">
        <div 
          className="absolute top-4 left-4 w-2 h-2 pointer-events-auto cursor-help opacity-0 hover:opacity-20"
          onClick={() => onEggFound('corner-click')}
        />
      </div>
    </>
  );
}

function EggCounter({ count }: { count: number }) {
  return (
    <motion.div
      className="fixed bottom-4 right-4 z-40 bg-gradient-to-r from-purple-500 to-pink-500 text-white px-3 py-2 rounded-full shadow-lg"
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      whileHover={{ scale: 1.1 }}
    >
      <div className="flex items-center space-x-2 text-sm font-semibold">
        <motion.span
          animate={{ rotate: [0, 10, -10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          🥚
        </motion.span>
        <span>{count}</span>
      </div>
    </motion.div>
  );
}

// Time-based easter egg - теперь использует EngagementNotification
// Эта функция оставлена для обратной совместимости, но теперь просто возвращает EngagementNotification
export function TimeBasedEasterEgg() {
  // Компонент перемещен в EngagementNotification для лучшего UX
  return null;
}