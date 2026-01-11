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

export default function Home() {
  const [preset, setPreset] = useState<SkyPreset>(() => {
    try {
      const now = new Date();
      const minutes = getMinutesFromDate(now);
      return calculatePreset(minutes, DEFAULT_SUNRISE, DEFAULT_SUNSET);
    } catch {
      return 'day'; // Fallback
    }
  });

  useEffect(() => {
    const updateSkyState = async () => {
      try {
        let sunriseMinutes = DEFAULT_SUNRISE;
        let sunsetMinutes = DEFAULT_SUNSET;

        // Fetch config
        try {
          const res = await fetch('/sky-config.json');
          if (res.ok) {
            const data = await res.json();
            // Parse sunrise/sunset from config (e.g., "2026-01-10T08:17")
            const parseTime = (isoString: string) => {
              const date = new Date(isoString);
              return date.getHours() * 60 + date.getMinutes();
            };
            
            if (data.sunrise && data.sunset) {
              sunriseMinutes = parseTime(data.sunrise);
              sunsetMinutes = parseTime(data.sunset);
            }
          }
        } catch (e) {
          console.error('Failed to load sky config', e);
        }

        const now = new Date();
        const currentMinutes = getMinutesFromDate(now);
        setPreset(calculatePreset(currentMinutes, sunriseMinutes, sunsetMinutes));
      } catch (error) {
        console.error('Error calculating sky state:', error);
      }
    };

    updateSkyState();
    
    // Update every minute
    const interval = setInterval(updateSkyState, 60000);
    return () => clearInterval(interval);
  }, []);

  return (
    <main className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden font-sans">
      <Sky preset={preset} />
      <Rocks />
      
      <div className="z-10 text-center px-4">
        <motion.h1 
          className="text-6xl md:text-8xl font-bold text-white drop-shadow-lg mb-6 tracking-tight"
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
