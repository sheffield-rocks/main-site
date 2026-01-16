import HomeClient from './HomeClient';
import { SkyPreset } from '@/components/sky/types';

export default async function Home() {
  const initialPreset: SkyPreset = 'day';

  return (
    <HomeClient 
      initialPreset={initialPreset} 
    />
  );
}
