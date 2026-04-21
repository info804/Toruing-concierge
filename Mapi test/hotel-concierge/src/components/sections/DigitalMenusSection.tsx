'use client';

import { useTranslations } from 'next-intl';
import { UtensilsCrossed, ExternalLink, Wine, Leaf } from 'lucide-react';
import { motion } from 'framer-motion';

export function DigitalMenusSection() {
  const t = useTranslations('menus');

  return (
    <section id="menus" className="relative overflow-hidden py-20 sm:py-28">
      {/* Background image */}
      <img
        src="/images/menus-bg.avif"
        alt=""
        className="absolute inset-0 w-full h-full object-cover"
      />
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/60" />

      {/* Decorative icons */}
      <div className="absolute top-8 left-8 opacity-10 text-white">
        <Wine size={64} strokeWidth={1} />
      </div>
      <div className="absolute bottom-8 right-8 opacity-10 text-white">
        <Leaf size={64} strokeWidth={1} />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col items-center gap-6"
        >
          {/* Icon */}
          <div className="w-16 h-16 rounded-full bg-white/10 border border-white/20 flex items-center justify-center backdrop-blur-sm">
            <UtensilsCrossed size={28} className="text-white" />
          </div>

          {/* Title */}
          <div>
            <p className="text-white/60 text-xs uppercase tracking-widest font-semibold mb-2">
              Hotel Touring Livigno
            </p>
            <h2 className="font-serif text-3xl sm:text-4xl text-white font-bold">
              {t('title')}
            </h2>
            <p className="text-white/70 text-base mt-3 leading-relaxed">
              {t('subtitle')}
            </p>
          </div>

          {/* Divider */}
          <div className="w-12 h-px bg-white/30" />

          {/* CTA */}
          <a
            href="https://touring-menu.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2.5 px-8 py-4 rounded-full bg-white text-[#2C3E50] text-sm font-bold hover:bg-white/90 transition-colors shadow-xl"
          >
            <UtensilsCrossed size={15} />
            Sfoglia il Menù Completo
            <ExternalLink size={13} className="opacity-60" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
