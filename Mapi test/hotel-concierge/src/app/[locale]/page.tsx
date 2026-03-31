'use client';

import { Header } from '@/components/Header';
import { HeroSection } from '@/components/sections/HeroSection';
import { HotelGuideSection } from '@/components/sections/HotelGuideSection';
import { PersonalizeStaySection } from '@/components/sections/PersonalizeStaySection';
import { DigitalMenusSection } from '@/components/sections/DigitalMenusSection';
import { WellnessSection } from '@/components/sections/WellnessSection';
import { LivignoSection } from '@/components/sections/LivignoSection';
import { CityPulseSection } from '@/components/sections/CityPulseSection';
import { QRCodeSection } from '@/components/QRCodeSection';
import { Footer } from '@/components/Footer';
import { WhatsAppButton } from '@/components/WhatsAppButton';

export default function HomePage() {
  return (
    <main className="min-h-screen">
      <Header />
      <HeroSection />
<HotelGuideSection />
      <PersonalizeStaySection />
      <DigitalMenusSection />
      <WellnessSection />
      <LivignoSection />
      <CityPulseSection />
      <QRCodeSection />
      <Footer />
      <WhatsAppButton />
    </main>
  );
}
