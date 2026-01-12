'use client';

import { useState } from "react";
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
