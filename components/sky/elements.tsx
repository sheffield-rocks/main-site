'use client';

import { motion } from 'framer-motion';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const Sun = ({ className }: { className?: string }) => {
  return (
    <motion.div
      className={cn("absolute rounded-full bg-yellow-400 blur-sm", className)}
      initial={{ scale: 0.9 }}
      animate={{ scale: 1.1, opacity: [0.8, 1, 0.8] }}
      transition={{ 
        scale: { duration: 4, repeat: Infinity, repeatType: "reverse" },
        opacity: { duration: 3, repeat: Infinity, repeatType: "reverse" }
      }}
      style={{
        boxShadow: "0 0 60px 30px rgba(253, 224, 71, 0.3)"
      }}
    >
      <div className="w-24 h-24 bg-yellow-200 rounded-full" />
    </motion.div>
  );
};

export const Moon = ({ className }: { className?: string }) => {
  return (
    <motion.div
      className={cn("absolute text-slate-200 drop-shadow-[0_0_15px_rgba(226,232,240,0.5)]", className)}
      initial={{ rotate: -10 }}
      animate={{ rotate: 10 }}
      transition={{ duration: 10, repeat: Infinity, repeatType: "reverse" }}
    >
        <svg width="80" height="80" viewBox="0 0 24 24" fill="currentColor">
            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
        </svg>
    </motion.div>
  );
};

export const Cloud = ({ 
  className, 
  duration = 20, 
  delay = 0,
  opacity = 0.8,
  scale = 1
}: { 
  className?: string; 
  duration?: number;
  delay?: number;
  opacity?: number;
  scale?: number;
}) => {
  return (
    <motion.div
        className={cn("absolute text-white/90 filter blur-[1px]", className)}
        initial={{ x: "-100%", opacity: 0 }}
        animate={{ x: "120vw", opacity: [0, opacity, opacity, 0] }}
        transition={{ 
            duration: duration, 
            repeat: Infinity, 
            delay: delay,
            ease: "linear"
        }}
        style={{ scale }}
    >
      <svg width="200" height="100" viewBox="0 0 24 24" fill="currentColor">
        <path d="M20.5,12.5c0-3.04-2.46-5.5-5.5-5.5c-0.19,0-0.38,0.01-0.56,0.03c-0.95-2.28-3.18-3.93-5.79-3.93 c-3.48,0-6.3,2.82-6.3,6.3c0,0.22,0.01,0.44,0.04,0.65C1.04,10.6,0,12.18,0,14c0,2.76,2.24,5,5,5h15.5c1.93,0,3.5-1.57,3.5-3.5 C24,14.07,22.43,12.5,20.5,12.5z"/>
      </svg>
    </motion.div>
  );
};

export const Star = ({ 
    top, 
    left, 
    size = 2,
    delay = 0,
    duration = 3
}: { 
    top: string; 
    left: string; 
    size?: number;
    delay?: number;
    duration?: number;
}) => {
    return (
        <motion.div
            className="absolute bg-white rounded-full"
            style={{ 
                top, 
                left, 
                width: size, 
                height: size 
            }}
            animate={{ opacity: [0.2, 1, 0.2] }}
            transition={{ 
                duration: duration, 
                repeat: Infinity, 
                delay: delay 
            }}
        />
    );
};

export const Rain = ({ count = 100 }: { count?: number }) => {
    // Generate rain drops with randomized properties
    const drops = Array.from({ length: count }).map((_, i) => ({
        id: i,
        left: `${Math.random() * 100}%`,
        delay: Math.random() * 2,
        duration: 0.5 + Math.random() * 0.5
    }));

    return (
        <div className="absolute inset-0 pointer-events-none z-0">
            {drops.map(drop => (
                <motion.div
                    key={drop.id}
                    className="absolute top-0 w-[1px] h-24 bg-gradient-to-b from-transparent to-blue-200/50"
                    style={{ left: drop.left }}
                    initial={{ y: -100, opacity: 0 }}
                    animate={{ y: '100vh', opacity: [0, 1, 0] }}
                    transition={{
                        duration: drop.duration,
                        repeat: Infinity,
                        delay: drop.delay,
                        ease: "linear"
                    }}
                />
            ))}
        </div>
    );
};

export const CirrusCloud = ({ 
    className, 
    top,
    left,
    scale = 1,
    opacity = 0.6,
    duration = 60
}: { 
    className?: string;
    top: string;
    left: string;
    scale?: number;
    opacity?: number;
    duration?: number;
}) => {
    return (
        <motion.div
            className={cn("absolute mix-blend-screen pointer-events-none", className)}
            style={{ 
                top, 
                left,
                scale 
            }}
            initial={{ x: "-10%", opacity: 0 }}
            animate={{ x: "10%", opacity }}
            transition={{
                duration,
                repeat: Infinity,
                repeatType: "reverse",
                ease: "easeInOut"
            }}
        >
           {/* Composite wispy cloud using multiple blurred gradients */}
           <div className="relative w-96 h-32 filter blur-3xl opacity-80">
                <div className="absolute top-4 left-0 w-full h-12 bg-white/20 rounded-full transform -rotate-2" />
                <div className="absolute top-10 left-12 w-3/4 h-16 bg-white/30 rounded-full transform rotate-1" />
                <div className="absolute top-2 left-24 w-1/2 h-10 bg-white/10 rounded-full transform -rotate-1" />
           </div>
        </motion.div>
    );
};
