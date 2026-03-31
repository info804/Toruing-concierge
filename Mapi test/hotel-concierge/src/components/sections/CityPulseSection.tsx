'use client';

import { useTranslations } from 'next-intl';
import { ExternalLink, Calendar, Music, ShoppingBag, Zap } from 'lucide-react';
import { IMAGES } from '@/config/images';
import { motion } from 'framer-motion';
import { SectionWrapper } from '@/components/ui/SectionWrapper';

const PULSE_ITEMS = [
  { icon: Calendar, label: 'Festivals & Events', color: 'bg-purple-100 text-purple-700' },
  { icon: Music, label: 'Live Music', color: 'bg-rose-100 text-rose-700' },
  { icon: ShoppingBag, label: 'Markets', color: 'bg-amber-100 text-amber-700' },
  { icon: Zap, label: 'Sports Events', color: 'bg-blue-100 text-blue-700' },
];

export function CityPulseSection() {
  const t = useTranslations('cityPulse');

  return (
    <SectionWrapper id="city-pulse" className="bg-alpine-charcoal" dark>
      <div className="relative overflow-hidden rounded-3xl">
        {/* Background */}
        <div
          className="absolute inset-0 bg-cover bg-center opacity-20"
          style={{
            backgroundImage: `url('${IMAGES.cityPulseBg}')`,
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-br from-alpine-wood/30 to-alpine-charcoal/80" />

        <div className="relative p-8 lg:p-14">
          <div className="max-w-2xl">
            {/* Label */}
            <div className="inline-flex items-center gap-2 bg-white/10 rounded-full px-4 py-1.5 mb-6">
              <Zap size={14} className="text-alpine-gold" />
              <span className="text-white/80 text-xs font-medium uppercase tracking-widest">
                {t('tagline')}
              </span>
            </div>

            <h2 className="font-serif text-4xl lg:text-5xl text-white mb-3">
              {t('title')}
            </h2>
            <p className="text-white/60 text-lg mb-2">{t('subtitle')}</p>
            <p className="text-white/50 text-sm leading-relaxed mb-8">{t('desc')}</p>

            {/* Category pills */}
            <div className="flex flex-wrap gap-2 mb-8">
              {PULSE_ITEMS.map(({ icon: Icon, label, color }) => (
                <motion.div
                  key={label}
                  whileHover={{ scale: 1.05 }}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium ${color}`}
                >
                  <Icon size={12} />
                  {label}
                </motion.div>
              ))}
            </div>

            <motion.a
              href="https://www.livigno.eu"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
              className="inline-flex items-center gap-3 px-8 py-4 bg-alpine-wood hover:bg-alpine-wood-dark text-white rounded-2xl font-semibold text-base shadow-xl transition-colors"
            >
              <ExternalLink size={18} />
              {t('cta')}
            </motion.a>
          </div>

          {/* Decorative element */}
          <div className="absolute right-8 top-1/2 -translate-y-1/2 hidden lg:block">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 60, repeat: Infinity, ease: 'linear' }}
              className="w-40 h-40 rounded-full border border-white/10"
            />
            <motion.div
              animate={{ rotate: -360 }}
              transition={{ duration: 40, repeat: Infinity, ease: 'linear' }}
              className="absolute inset-6 rounded-full border border-alpine-wood/30"
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="font-serif text-white/30 text-4xl font-bold">L</span>
            </div>
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
}
