import HomeClient from './HomeClient';
import { SkyPreset } from '@/components/sky/types';
import { getSkyConfig, SkyConfig } from '@/lib/sky-data';

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

export default async function Home() {
  const config = await getSkyConfig();
  
  let initialPreset: SkyPreset = 'day';

  const parseTime = (isoString: string) => {
    const date = new Date(isoString);
    return date.getHours() * 60 + date.getMinutes();
  };

  const getPresetFromConfig = (data: SkyConfig | null): SkyPreset | null => {
    if (!data) return null;
    if (typeof data.preset === "string") {
      return data.preset as SkyPreset;
    }

    if (typeof data.sunrise === "string" && typeof data.sunset === "string") {
      const now = new Date();
      const currentMinutes = getMinutesFromDate(now);
      const sunriseMinutes = parseTime(data.sunrise);
      const sunsetMinutes = parseTime(data.sunset);
      return calculatePreset(currentMinutes, sunriseMinutes, sunsetMinutes);
    }

    return null;
  };

  const presetFromConfig = getPresetFromConfig(config);
  if (presetFromConfig) {
    initialPreset = presetFromConfig;
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
