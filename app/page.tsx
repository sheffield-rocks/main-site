import { promises as fs } from 'fs';
import path from 'path';
import HomeClient from './HomeClient';
import { SkyPreset } from '@/components/sky/types';

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

async function getSkyConfig() {
  try {
    const filePath = path.join(process.cwd(), 'public', 'sky-config.json');
    const fileContents = await fs.readFile(filePath, 'utf8');
    return JSON.parse(fileContents);
  } catch (error) {
    console.warn('Could not read sky-config.json:', error);
    return null;
  }
}

export default async function Home() {
  const config = await getSkyConfig();
  
  let initialPreset: SkyPreset = 'day';

  if (config) {
    if (config.preset) {
      initialPreset = config.preset as SkyPreset;
    } else {
      // Calculate based on config times
      const now = new Date();
      const currentMinutes = getMinutesFromDate(now);
      
      let sunriseMinutes = DEFAULT_SUNRISE;
      let sunsetMinutes = DEFAULT_SUNSET;

      if (config.sunrise && config.sunset) {
        const parseTime = (isoString: string) => {
            const date = new Date(isoString);
            return date.getHours() * 60 + date.getMinutes();
        };
        sunriseMinutes = parseTime(config.sunrise);
        sunsetMinutes = parseTime(config.sunset);
      }
      
      initialPreset = calculatePreset(currentMinutes, sunriseMinutes, sunsetMinutes);
    }
  } else {
      // Fallback calculation
      const now = new Date();
      const currentMinutes = getMinutesFromDate(now);
      initialPreset = calculatePreset(currentMinutes, DEFAULT_SUNRISE, DEFAULT_SUNSET);
  }

  return (
    <HomeClient 
      initialPreset={initialPreset} 
    />
  );
}
