'use client';

import { Header } from '@/components/Header';
import { HeroSection } from '@/components/sections/HeroSection';
import { HotelGuideSection } from '@/components/sections/HotelGuideSection';
import { PersonalizeStaySection } from '@/components/sections/PersonalizeStaySection';
import { DigitalMenusSection } from '@/components/sections/DigitalMenusSection';
import { WellnessSection } from '@/components/sections/WellnessSection';
import { LivignoSection } from '@/components/sections/LivignoSection';
import { CityPulseSection } from '@/components/sections/CityPulseSection';
import { HowToReachSection } from '@/components/sections/HowToReachSection';
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
      <div className="h-32 bg-[#F7F7F5]" />
      <WellnessSection />
      <LivignoSection />
      <CityPulseSection />
      <HowToReachSection />
      <QRCodeSection />
      <Footer />
      <WhatsAppButton />
    </main>
  );
}
