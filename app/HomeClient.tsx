'use client';

import { useState, useEffect } from "react";
import { Sky } from "@/components/sky/Sky";
import { SkyPreset } from "@/components/sky/types";
import { motion } from "framer-motion";
import { Rocks } from "@/components/sky/Rocks";

// Default configuration (approximate winter times)
const DEFAULT_SUNRISE = 8 * 60; // 08:00
const DEFAULT_SUNSET = 16 * 60; // 16:00

const getMinutesFromDate = (date: Date) => {
  const formatter = new Intl.DateTimeFormat('en-GB', {
    timeZone: 'Europe/London',
    hour: 'numeric',
    minute: 'numeric',
    hour12: false
  });
  const parts = formatter.formatToParts(date);
  const hour = parseInt(parts.find(p => p.type === 'hour')?.value || '0');
  const minute = parseInt(parts.find(p => p.type === 'minute')?.value || '0');
  return hour * 60 + minute;
};

const calculatePreset = (currentMinutes: number, sunriseMinutes: number, sunsetMinutes: number): SkyPreset => {
  const duskStart = sunsetMinutes - 45;
  const duskEnd = sunsetMinutes + 15;

  if (currentMinutes >= sunriseMinutes && currentMinutes < duskStart) {
    return 'day';
  } else if (currentMinutes >= duskStart && currentMinutes <= duskEnd) {
    return 'dusk';
  } else {
    return 'night';
  }
};

interface HomeClientProps {
  initialPreset: SkyPreset;
  initialSunrise?: string;
  initialSunset?: string;
}

export default function HomeClient({ initialPreset, initialSunrise, initialSunset }: HomeClientProps) {
  const [preset, setPreset] = useState<SkyPreset>(initialPreset);

  useEffect(() => {
    const updateSkyState = async () => {
      try {
        let currentSunrise = initialSunrise ? (() => {
            const d = new Date(initialSunrise);
            return d.getHours() * 60 + d.getMinutes();
        })() : DEFAULT_SUNRISE;

        let currentSunset = initialSunset ? (() => {
            const d = new Date(initialSunset);
            return d.getHours() * 60 + d.getMinutes();
        })() : DEFAULT_SUNSET;

        let newPreset: SkyPreset | null = null;

        try {
          const res = await fetch('/sky-config.json');
          if (res.ok) {
            const data = await res.json();
            
            // Update times if available
            if (data.sunrise) {
               const d = new Date(data.sunrise);
               currentSunrise = d.getHours() * 60 + d.getMinutes();
            }
            if (data.sunset) {
               const d = new Date(data.sunset);
               currentSunset = d.getHours() * 60 + d.getMinutes();
            }

            // Priority 1: Explicit preset in config
            if (data.preset) {
                newPreset = data.preset as SkyPreset;
            }
          }
        } catch (e) {
          console.error('Failed to update sky config', e);
        }

        // Priority 2: Calculated based on time (using updated or initial sunrise/sunset)
        if (!newPreset) {
            const now = new Date();
            const currentMinutes = getMinutesFromDate(now);
            newPreset = calculatePreset(currentMinutes, currentSunrise, currentSunset);
        }

        setPreset(prev => {
            if (prev !== newPreset) return newPreset!;
            return prev;
        });

      } catch (error) {
        console.error('Error calculating sky state:', error);
      }
    };
    
    // Update every minute
    const interval = setInterval(updateSkyState, 60000);
    return () => clearInterval(interval);
  }, [initialSunrise, initialSunset]);

  return (
    <main className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden font-sans">
      <Sky preset={preset} />
      <Rocks />
      
      <div className="z-10 text-center px-4">
        <motion.h1 
          className="text-6xl md:text-8xl text-white drop-shadow-lg mb-6 tracking-tight"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          sheffield.rocks
        </motion.h1>
        <motion.p 
          className="text-xl md:text-2xl text-white/90 font-light drop-shadow-md"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          Coming this spring
        </motion.p>
      </div>
    </main>
  );
}
