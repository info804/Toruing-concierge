'use client';

import { useState, useEffect } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { useRouter, usePathname } from 'next/navigation';
import { Snowflake, ChevronDown, Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { IMAGES } from '@/config/images';

const NAV_SECTIONS = [
  { key: 'hotelGuide',      href: '#hotel-guide' },
  { key: 'personalizeStay', href: '#personalize-stay' },
  { key: 'menus',           href: '#menus' },
  { key: 'wellness',        href: '#wellness' },
  { key: 'livigno',         href: '#livigno' },
  { key: 'cityPulse',       href: '#city-pulse' },
  { key: 'howToReach',     href: '#how-to-reach' },
] as const;

const LOCALES = [
  { code: 'en', label: 'English', flag: '🇬🇧' },
  { code: 'it', label: 'Italiano', flag: '🇮🇹' },
  { code: 'de', label: 'Deutsch', flag: '🇩🇪' },
] as const;

function WeatherWidget() {
  const [time, setTime] = useState('');

  useEffect(() => {
    const update = () => {
      const now = new Date();
      setTime(now.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' }));
    };
    update();
    const id = setInterval(update, 60000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="hidden sm:flex items-center gap-1.5 text-xs">
      <div className="flex items-center gap-1 bg-[#F7F7F5] rounded-full px-2.5 py-1">
        <Snowflake size={11} className="text-[#8B9EB7]" />
        <span className="font-semibold text-[#2C3E50]">−4°C</span>
      </div>
      {time && (
        <span className="text-[#9B9B9B] tabular-nums">{time}</span>
      )}
    </div>
  );
}

function LanguageSwitcher() {
  const [open, setOpen] = useState(false);
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const current = LOCALES.find((l) => l.code === locale) ?? LOCALES[0];

  const switchLocale = (code: string) => {
    const newPath = pathname.replace(`/${locale}`, `/${code}`);
    router.push(newPath);
    setOpen(false);
  };

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-1 border border-[#EBEBEB] hover:border-[#8B9EB7] transition-colors rounded-full px-3 py-1.5 text-[#4A4A4A] text-xs font-semibold tracking-wide"
      >
        {current.code.toUpperCase()}
        <ChevronDown size={11} className={cn('transition-transform text-[#9B9B9B]', open && 'rotate-180')} />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.15 }}
            className="absolute right-0 mt-2 w-36 bg-white border border-[#EBEBEB] rounded-2xl shadow-lg overflow-hidden z-50"
          >
            {LOCALES.map((loc) => (
              <button
                key={loc.code}
                onClick={() => switchLocale(loc.code)}
                className={cn(
                  'w-full flex items-center gap-2.5 px-3.5 py-2.5 text-xs text-left transition-colors',
                  locale === loc.code
                    ? 'bg-[#F7F7F5] text-[#2C3E50] font-semibold'
                    : 'text-[#4A4A4A] hover:bg-[#F7F7F5]'
                )}
              >
                <span className="text-sm">{loc.flag}</span>
                <span>{loc.label}</span>
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function Header() {
  const t = useTranslations('nav');
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, []);

  const scrollTo = (href: string) => {
    const el = document.querySelector(href);
    el?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    setMobileOpen(false);
  };

  return (
    <>
      <header
        className={cn(
          'fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md transition-all duration-300',
          scrolled ? 'shadow-sm border-b border-[#EBEBEB]' : ''
        )}
      >
        <div className="container-max px-4 sm:px-6">
          <div className="flex items-center h-16 lg:h-18 gap-6">

            {/* Left — Logo + weather inline */}
            <div className="flex-shrink-0 flex items-center gap-3">
              <img
                src={IMAGES.stellaAlpina}
                alt="Stella Alpina — Hotel Touring Livigno"
                className="w-9 h-9 object-contain"
              />
              <div className="leading-tight">
                <p className="font-serif font-bold text-[#2C3E50] text-[15px] tracking-tight leading-none">
                  TOURING
                </p>
                <p className="font-sans font-light text-[#9B9B9B] text-[9px] tracking-[0.18em] uppercase mt-0.5">
                  LIVIGNO
                </p>
              </div>
              {/* Weather sits right next to the brand name */}
              <span className="w-px h-5 bg-[#EBEBEB] hidden sm:block" />
              <WeatherWidget />
            </div>

            {/* Center — Desktop Nav */}
            <nav className="hidden lg:flex flex-1 items-center justify-center gap-0.5">
              {NAV_SECTIONS.map((item) => (
                <button
                  key={item.key}
                  onClick={() => scrollTo(item.href)}
                  className="px-3 py-1.5 rounded-full text-[13px] font-medium text-[#4A4A4A] hover:text-[#2C3E50] hover:bg-[#F7F7F5] transition-colors"
                >
                  {t(item.key)}
                </button>
              ))}
            </nav>

            {/* Right — Lang + hamburger */}
            <div className="flex items-center gap-2 flex-shrink-0 ml-auto lg:ml-0">
              <LanguageSwitcher />
              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className="lg:hidden p-2 rounded-full text-[#4A4A4A] hover:bg-[#F7F7F5] transition-colors"
              >
                {mobileOpen ? <X size={18} /> : <Menu size={18} />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Nav Drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'spring', damping: 28, stiffness: 220 }}
            className="fixed inset-y-0 right-0 z-40 w-68 bg-white shadow-2xl lg:hidden flex flex-col"
          >
            {/* Drawer header */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-[#EBEBEB]">
              <div className="flex items-center gap-2.5">
                <img
                  src={IMAGES.stellaAlpina}
                  alt="Hotel Touring Livigno"
                  className="w-7 h-7 object-contain"
                />
                <div>
                  <p className="font-serif font-bold text-[#2C3E50] text-sm tracking-tight leading-none">TOURING</p>
                  <p className="font-sans text-[#9B9B9B] text-[9px] tracking-widest uppercase mt-0.5">LIVIGNO</p>
                </div>
              </div>
              <button
                onClick={() => setMobileOpen(false)}
                className="p-1.5 rounded-full text-[#9B9B9B] hover:bg-[#F7F7F5] transition-colors"
              >
                <X size={16} />
              </button>
            </div>

            {/* Drawer nav links */}
            <div className="flex flex-col p-3 gap-0.5 flex-1 overflow-y-auto">
              {NAV_SECTIONS.map((item, i) => (
                <motion.button
                  key={item.key}
                  initial={{ opacity: 0, x: 14 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.045 }}
                  onClick={() => scrollTo(item.href)}
                  className="text-left px-4 py-2.5 rounded-xl text-[#4A4A4A] hover:text-[#2C3E50] hover:bg-[#F7F7F5] transition-colors font-medium text-sm"
                >
                  {t(item.key)}
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Backdrop */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/15 lg:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}
    </>
  );
}
