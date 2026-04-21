'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { IMAGES } from '@/config/images';

export function HeroSection() {
  const t = useTranslations('hero');

  const scrollDown = () => {
    document.querySelector('#hotel-guide')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">

      {/* Background image */}
      <img
        src={IMAGES.hero}
        alt="Hotel Touring Livigno"
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* Subtle dark overlay to improve text readability */}
      <div className="absolute inset-0 bg-black/35" />

      {/* Content — centered */}
      <div className="relative z-10 flex flex-col items-center justify-center text-center px-4 pt-16">

        {/* Welcome label */}
        <motion.p
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="text-white text-sm sm:text-base uppercase tracking-[0.25em] font-bold mb-4 drop-shadow-md"
        >
          {t('welcome')}
        </motion.p>

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="font-serif font-extrabold text-white leading-tight tracking-tight mb-4 drop-shadow-lg"
          style={{ fontSize: 'clamp(3rem, 9vw, 7rem)' }}
        >
          {t('title')}
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.7 }}
          className="text-white font-semibold text-base sm:text-lg leading-relaxed max-w-md mb-10 drop-shadow-md"
        >
          {t('subtitle')}
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.65 }}
          className="flex flex-wrap items-center justify-center gap-3"
        >
          <button
            onClick={scrollDown}
            className="px-7 py-3 rounded-full bg-white text-[#2C3E50] text-sm font-semibold hover:bg-white/90 transition-colors shadow-lg"
          >
            {t('scroll')}
          </button>
          <a
            href="https://be.bookingexpert.it/book/home/single?layout=14019&lang=it&currency=EUR&nsid=99277590-3b11-4618-87eb-ca0a388150a1&_gl=1*ffrbh5*_gcl_au*NTA4MjYwNzEwLjE3NzQ4MDYzOTA.*_ga*MTkxMDA3MDI1OC4xNzU0NjYxNDMx*_ga_5MR36MSBHF*czE3NzQ5MzkzNzEkbzEwJGcxJHQxNzc0OTQwNDk2JGo1NyRsMCRoMA.."
            target="_blank"
            rel="noopener noreferrer"
            className="px-7 py-3 rounded-full border-2 border-white text-white text-sm font-semibold hover:bg-white hover:text-[#2C3E50] transition-colors"
          >
            Prenota Ora
          </a>
        </motion.div>

        {/* Scroll caret */}
        <motion.button
          onClick={scrollDown}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="mt-16 text-white/60 hover:text-white transition-colors"
        >
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ repeat: Infinity, duration: 2.4, ease: 'easeInOut' }}
          >
            <ChevronDown size={28} strokeWidth={1.5} />
          </motion.div>
        </motion.button>
      </div>

    </section>
  );
}
