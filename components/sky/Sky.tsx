'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { Sun, Moon, Cloud, Star } from './elements';
import { SkyPreset } from './types';
import { useEffect, useState } from 'react';

const gradients: Record<SkyPreset, string> = {
  day: 'linear-gradient(to bottom, #38bdf8, #bae6fd)', // sky-400 to sky-200
  dusk: 'linear-gradient(to bottom, #4c1d95, #f97316)', // violet-900 to orange-500
  night: 'linear-gradient(to bottom, #020617, #172554)', // slate-950 to blue-950
  overcast: 'linear-gradient(to bottom, #64748b, #cbd5e1)', // slate-500 to slate-300
};

type StarData = {
    id: number;
    top: string;
    left: string;
    size: number;
    delay: number;
    duration: number;
};

export const Sky = ({ preset }: { preset: SkyPreset }) => {
  
  const [stars, setStars] = useState<StarData[]>([]);

  // Generate random stars on client-side only
  useEffect(() => {
    const newStars = Array.from({ length: 50 }).map((_, i) => ({
      id: i,
      top: `${Math.random() * 60}%`, // Only in top 60% of screen
      left: `${Math.random() * 100}%`,
      size: Math.random() < 0.8 ? 2 : 3,
      delay: Math.random() * 3,
      duration: 2 + Math.random() * 2
    }));
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setStars(newStars);
  }, []);

  return (
    <motion.div
        className="fixed inset-0 w-full h-full -z-10 overflow-hidden"
        initial={false}
        animate={{ background: gradients[preset] }}
        transition={{ duration: 1.5, ease: "easeInOut" }}
    >
        <AnimatePresence mode="wait">
            {preset === 'day' && (
                <motion.div key="day-elements" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 1 }}>
                    <Sun className="top-10 right-20" />
                    {/* <Cloud className="top-20" delay={0} duration={45} scale={1.2} />
                    <Cloud className="top-40" delay={20} duration={55} opacity={0.6} />
                    <Cloud className="top-10" delay={10} duration={60} scale={0.8} /> */}
                </motion.div>
            )}

            {preset === 'dusk' && (
                <motion.div key="dusk-elements" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 1 }}>
                    <Sun className="bottom-20 left-20 !bg-orange-400 !blur-md scale-125" />
                    {stars.slice(0, 10).map(star => (
                        <Star key={star.id} {...star} />
                    ))}
                    {/* <Cloud className="top-20 text-orange-100" delay={0} duration={50} opacity={0.5} /> */}
                </motion.div>
            )}

            {preset === 'night' && (
                <motion.div key="night-elements" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 1 }}>
                    <Moon className="top-16 left-16" />
                    {stars.map(star => (
                        <Star key={star.id} {...star} />
                    ))}
                    {/* <Cloud className="top-32 text-indigo-900" delay={0} duration={80} opacity={0.2} /> */}
                </motion.div>
            )}

            {preset === 'overcast' && (
                <motion.div key="overcast-elements" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 1 }}>
                    <Cloud className="top-10 text-slate-200" delay={0} duration={30} scale={1.5} opacity={0.9} />
                    <Cloud className="top-32 text-slate-300" delay={5} duration={35} scale={1.2} opacity={0.8} />
                    <Cloud className="top-5 text-slate-100" delay={15} duration={40} scale={0.9} opacity={0.7} />
                    <Cloud className="top-60 text-slate-400" delay={2} duration={25} scale={1.8} opacity={0.4} />
                    <Cloud className="top-20 text-slate-200" delay={20} duration={38} scale={1.1} />
                </motion.div>
            )}
        </AnimatePresence>
    </motion.div>
  );
};
