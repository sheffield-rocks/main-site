'use client';

import { useEffect, useState } from "react";
import { Sky } from "@/components/sky/Sky";
import { SkyPreset } from "@/components/sky/types";
import { motion } from "framer-motion";
import { Rocks } from "@/components/sky/Rocks";

// Client treats the server-provided preset as authoritative for the whole session.

interface HomeClientProps {
  initialPreset: SkyPreset;
}

export default function HomeClient({ initialPreset }: HomeClientProps) {
  const [preset] = useState<SkyPreset>(initialPreset);

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, []);

  return (
    <main className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden font-sans px-gr-6 sm:px-gr-7">
      <Sky preset={preset} />
      <Rocks />
      
      <div className="z-10 text-center max-w-[min(92vw,48rem)]">
        <motion.h1 
          className="text-[clamp(2.75rem,10vw,6rem)] md:text-8xl text-white drop-shadow-lg mb-6 tracking-tight leading-tight"
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
