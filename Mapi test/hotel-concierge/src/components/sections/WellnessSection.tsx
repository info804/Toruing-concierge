'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import {
  Flame, Droplets, Leaf, ShowerHead, Waves,
  Thermometer, Clock, Calendar, ChevronDown, Download,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { SectionWrapper } from '@/components/ui/SectionWrapper';
import { cn } from '@/lib/utils';

/* ── Facility definitions ───────────────────────────────────── */
const FACILITIES = [
  {
    key: 'sauna',
    icon: Flame,
    color: 'text-orange-400',
    bg: 'bg-orange-500/15',
    border: 'border-orange-500/20',
    dot: 'bg-orange-400',
    step: 1,
  },
  {
    key: 'steam',
    icon: Droplets,
    color: 'text-teal-400',
    bg: 'bg-teal-500/15',
    border: 'border-teal-500/20',
    dot: 'bg-teal-400',
    step: 2,
  },
  {
    key: 'brechelbad',
    icon: Leaf,
    color: 'text-green-400',
    bg: 'bg-green-500/15',
    border: 'border-green-500/20',
    dot: 'bg-green-400',
    step: 3,
  },
  {
    key: 'shower',
    icon: ShowerHead,
    color: 'text-blue-400',
    bg: 'bg-blue-500/15',
    border: 'border-blue-500/20',
    dot: 'bg-blue-400',
    step: 4,
  },
  {
    key: 'hydropool',
    icon: Waves,
    color: 'text-sky-400',
    bg: 'bg-sky-500/15',
    border: 'border-sky-500/20',
    dot: 'bg-sky-400',
    step: 5,
  },
] as const;


/* ── Single facility row ────────────────────────────────────── */
function FacilityRow({ def }: { def: typeof FACILITIES[number] }) {
  const t = useTranslations('wellness');
  const [expanded, setExpanded] = useState(false);
  const Icon = def.icon;

  return (
    <motion.div
      layout
      className={cn(
        'rounded-2xl border overflow-hidden transition-colors',
        def.border,
        expanded ? 'bg-white/8' : 'bg-white/5 hover:bg-white/7'
      )}
    >
      {/* Row header — always visible */}
      <button
        onClick={() => setExpanded((v) => !v)}
        className="w-full flex items-center gap-4 p-5 text-left"
      >
        {/* Step number + icon */}
        <div className="flex items-center gap-3 flex-shrink-0">
          <div className="hidden sm:flex flex-col items-center gap-1">
            <span className="text-[10px] font-bold text-white/25 tracking-widest">
              0{def.step}
            </span>
            <div className={cn('w-px flex-1 min-h-[12px]', def.dot, 'opacity-30')} />
          </div>
          <div className={cn('p-3 rounded-xl', def.bg)}>
            <Icon size={22} className={def.color} />
          </div>
        </div>

        {/* Name + temp */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <h3 className="font-serif text-lg text-white font-medium leading-snug">
              {t(`facilities.${def.key}.name`)}
            </h3>
            {t(`facilities.${def.key}.temp`) && (
              <span className={cn(
                'inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold',
                def.bg, def.color
              )}>
                <Thermometer size={11} />
                {t(`facilities.${def.key}.temp`)}
              </span>
            )}
          </div>
        </div>

        {/* Expand toggle */}
        <motion.div
          animate={{ rotate: expanded ? 180 : 0 }}
          transition={{ duration: 0.2 }}
          className="flex-shrink-0 p-1.5 rounded-lg text-white/40 hover:text-white/70"
        >
          <ChevronDown size={18} />
        </motion.div>
      </button>

      {/* Expandable detail */}
      <AnimatePresence initial={false}>
        {expanded && (
          <motion.div
            key="detail"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.28, ease: 'easeInOut' }}
            className="overflow-hidden"
          >
            <div className="px-5 pb-5 pl-[4.5rem] sm:pl-[5.5rem] flex flex-col gap-3">
              {/* Description */}
              <p className="text-sm text-white/65 leading-relaxed">
                {t(`facilities.${def.key}.desc`)}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

/* ── Section ────────────────────────────────────────────────── */
const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.09, delayChildren: 0.1 } },
};

const rowVar = {
  hidden:  { opacity: 0, x: -16 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.45 } },
};

export function WellnessSection() {
  const t = useTranslations('wellness');

  return (
    <SectionWrapper id="wellness" dark>
      {/* Section header */}
      <div className="mb-10 lg:mb-14">
        <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-white">
          {t('title')}
        </h2>
        <p className="text-white/55 text-base sm:text-lg mt-3">{t('subtitle')}</p>

        {/* Intro paragraph */}
        <p className="mt-5 text-sm text-white/45 leading-relaxed max-w-2xl">
          {t('intro')}
        </p>

        {/* Quick stats row */}
        <div className="flex flex-wrap gap-4 mt-6">
          <div className="flex items-center gap-2 text-xs text-white/55">
            <Clock size={13} className="text-alpine-wood-light" />
            {t('hours')}
          </div>
        </div>
      </div>

      {/* Facility list */}
      <motion.div
        variants={container}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-60px' }}
        className="flex flex-col gap-3 mb-8"
      >
        {FACILITIES.map((def) => (
          <motion.div key={def.key} variants={rowVar}>
            <FacilityRow def={def} />
          </motion.div>
        ))}
      </motion.div>

      {/* Book CTA */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.3 }}
        className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5 p-6 rounded-2xl bg-white/5 border border-white/10"
      >
        <div className="flex items-center gap-4">
          <div className="p-3.5 rounded-xl bg-alpine-wood/20">
            <Calendar size={22} className="text-alpine-wood-light" />
          </div>
          <div>
            <p className="font-semibold text-white text-sm">{t('bookTreatment')}</p>
            <p className="text-xs text-white/50 mt-0.5">{t('bookDesc')}</p>
          </div>
        </div>
        <a
          href="/brochure-massaggi.pdf"
          target="_blank"
          rel="noopener noreferrer"
          className="flex-shrink-0 inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-white text-sm font-semibold transition-colors"
        >
          <Download size={15} />
          Brochure Massaggi
        </a>
      </motion.div>
    </SectionWrapper>
  );
}
