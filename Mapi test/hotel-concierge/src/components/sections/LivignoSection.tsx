'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import {
  Snowflake, Sun, CheckCircle2, AlertCircle, XCircle,
  Mountain, Bike, TreePine, Map, ChevronRight, TrendingUp,
  Ticket, Home, ExternalLink, Clock, RefreshCw, Waves, Wind, Train, Droplets,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { SectionWrapper, SectionHeader } from '@/components/ui/SectionWrapper';
import { cn } from '@/lib/utils';
import { IMAGES } from '@/config/images';

type Season = 'winter' | 'summer';

/* ── Lift status config ─────────────────────────────────────── */
const STATUS_CONFIG = {
  open:        { icon: CheckCircle2, color: 'text-green-500',  bg: 'bg-green-50',  label: 'open'        },
  maintenance: { icon: AlertCircle,  color: 'text-amber-500',  bg: 'bg-amber-50',  label: 'maintenance' },
  closed:      { icon: XCircle,      color: 'text-red-400',    bg: 'bg-red-50',    label: 'closed'      },
} as const;
type LiftStatus = keyof typeof STATUS_CONFIG;

const LIFTS = [
  { key: 'teola',     image: IMAGES.lifts.teola     },
  { key: 'mottolino', image: IMAGES.lifts.mottolino },
  { key: 'carosello', image: IMAGES.lifts.carosello },
  { key: 'federia',   image: IMAGES.lifts.federia   },
] as const;

const SKI_PASS_KEYS = ['day', 'week', 'season'] as const;
const HUTS = ['carosello', 'mottolino', 'teola'] as const;

/* ── Difficulty config ──────────────────────────────────────── */
const DIFF_CONFIG = {
  easy:     { dot: 'bg-green-500', text: 'text-green-700', bg: 'bg-green-50' },
  moderate: { dot: 'bg-blue-500',  text: 'text-blue-700',  bg: 'bg-blue-50'  },
  advanced: { dot: 'bg-gray-900',  text: 'text-gray-800',  bg: 'bg-gray-100' },
} as const;

const TRAILS = [
  { key: 'trekking',  icon: Mountain,  difficulty: 'moderate' as const },
  { key: 'hiking',    icon: TreePine,  difficulty: 'easy'     as const },
  { key: 'bike',      icon: Bike,      difficulty: 'advanced' as const },
  { key: 'larix',     icon: Wind,      difficulty: 'moderate' as const },
  { key: 'lake',      icon: Waves,     difficulty: 'easy'     as const },
  { key: 'lago_vago', icon: Droplets,  difficulty: 'moderate' as const },
  { key: 'federia',   icon: TreePine,  difficulty: 'easy'     as const },
];

/* ── Bernina card ───────────────────────────────────────────── */
function BerninaCard({ season }: { season: 'winter' | 'summer' }) {
  const t = useTranslations('livigno.bernina');

  if (season === 'summer') {
    // Same style as trail cards
    return (
      <motion.div whileHover={{ x: 4 }} className="alpine-card p-4 flex items-center gap-4">
        <div className="p-3 rounded-xl bg-alpine-cream flex-shrink-0">
          <Train size={20} className="text-alpine-wood" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <h4 className="font-semibold text-alpine-charcoal text-sm">{t('name')}</h4>
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-purple-50 text-purple-700">
              {t('label')}
            </span>
          </div>
          <p className="text-xs text-alpine-slate mt-0.5 leading-snug line-clamp-2">
            {t('descSummer')}
          </p>
          <a
            href="https://www.rhb.ch/it/offerte/bernina-express"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-[11px] text-alpine-wood font-medium mt-1.5 hover:underline"
          >
            <ExternalLink size={11} /> {t('link')}
          </a>
        </div>
        <ChevronRight size={16} className="text-alpine-slate/60 flex-shrink-0" />
      </motion.div>
    );
  }

  // Winter: compact card with small image strip (like lift cards)
  return (
    <motion.div whileHover={{ y: -2 }} className="alpine-card flex overflow-hidden">
      <div
        className="w-20 flex-shrink-0 bg-cover bg-center"
        style={{ backgroundImage: `url('${process.env.NEXT_PUBLIC_BASE_PATH}/images/bernina-winter.jpg')` }}
      />
      <div className="p-3.5 flex-1">
        <p className="text-[10px] font-semibold text-alpine-wood uppercase tracking-widest mb-0.5">
          {t('label')}
        </p>
        <p className="font-semibold text-alpine-charcoal text-sm leading-snug">{t('name')}</p>
        <p className="text-[11px] text-alpine-slate mt-1 leading-snug line-clamp-2">
          {t('descWinter')}
        </p>
        <a
          href="https://www.rhb.ch/it/offerte/bernina-express"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 text-[11px] text-alpine-wood font-medium mt-1.5 hover:underline"
        >
          <ExternalLink size={11} /> {t('link')}
        </a>
      </div>
    </motion.div>
  );
}

/* ── Winter content ─────────────────────────────────────────── */
function WinterContent() {
  const t = useTranslations('livigno.winterContent');

  return (
    <motion.div
      key="winter"
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -18 }}
      transition={{ duration: 0.38 }}
    >
      {/* Section heading */}
      <div className="text-center mb-8">
        <h3 className="font-serif text-2xl sm:text-3xl text-alpine-charcoal">{t('title')}</h3>
        <p className="text-alpine-slate text-sm mt-1">{t('subtitle')}</p>
      </div>

      {/* ── Live lift status ── */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-3">
          <h4 className="font-semibold text-alpine-charcoal text-sm flex items-center gap-2">
            <RefreshCw size={13} className="text-alpine-wood" />
            {t('liftStatusTitle')}
          </h4>
          <span className="flex items-center gap-1.5 text-[11px] text-alpine-slate">
            <Clock size={11} />
            {t('liftStatusUpdated')}
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {LIFTS.map(({ key, image }) => {
            const status = t(`lifts.${key}.status`) as LiftStatus;
            const conf = STATUS_CONFIG[status] ?? STATUS_CONFIG.closed;
            const StatusIcon = conf.icon;
            return (
              <motion.div
                key={key}
                whileHover={{ y: -2 }}
                className="alpine-card flex overflow-hidden"
              >
                <div
                  className="w-16 flex-shrink-0 bg-cover bg-center"
                  style={{ backgroundImage: `url('${image}')` }}
                />
                <div className="p-3.5 flex-1">
                  <div className="flex items-start justify-between gap-2">
                    <p className="font-semibold text-alpine-charcoal text-sm leading-snug">
                      {t(`lifts.${key}.name`)}
                    </p>
                    <span className={cn('inline-flex items-center gap-1 px-2 py-0.5 rounded-full flex-shrink-0 text-[10px] font-semibold', conf.bg)}>
                      <StatusIcon size={11} className={conf.color} />
                      <span className={conf.color}>{t(status)}</span>
                    </span>
                  </div>
                  <p className="text-[11px] text-alpine-slate mt-1 leading-snug">
                    {t(`lifts.${key}.info`)}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* ── Ski Pass info ── */}
      <div className="rounded-2xl border border-blue-100 bg-blue-50/60 p-5 mb-5">
        <div className="flex items-center gap-2 mb-3">
          <Ticket size={16} className="text-blue-600" />
          <h4 className="font-semibold text-blue-900 text-sm">{t('skiPassTitle')}</h4>
        </div>
        <p className="text-xs text-blue-700/80 leading-relaxed mb-4">{t('skiPassDesc')}</p>

        {/* Pass options */}
        <div className="grid grid-cols-3 gap-2 mb-4">
          {SKI_PASS_KEYS.map((passKey) => (
            <div
              key={passKey}
              className="flex flex-col items-center text-center bg-white rounded-xl px-2 py-3 border border-blue-100 shadow-sm"
            >
              <p className="text-[10px] font-semibold text-blue-900 leading-tight">
                {t(`skiPassOptions.${passKey}.label`)}
              </p>
              <p className="font-bold text-blue-700 text-base mt-1">
                {t(`skiPassOptions.${passKey}.price`)}
              </p>
              <p className="text-[10px] text-blue-500 mt-0.5 leading-tight">
                {t(`skiPassOptions.${passKey}.note`)}
              </p>
            </div>
          ))}
        </div>

        <a
          href={t('skiPassUrl')}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-blue-600 hover:text-blue-800 transition-colors"
        >
          <ExternalLink size={12} />
          {t('skiPassLink')}
        </a>
      </div>

      {/* ── Mountain hut map ── */}
      <div className="rounded-2xl border border-amber-200 bg-amber-50/60 p-5">
        <div className="flex items-center gap-2 mb-3">
          <Home size={16} className="text-amber-700" />
          <h4 className="font-semibold text-amber-900 text-sm">{t('hutMapTitle')}</h4>
        </div>
        <p className="text-xs text-amber-800/80 leading-relaxed mb-4">{t('hutMapDesc')}</p>

        {/* Hut list */}
        <div className="space-y-2 mb-4">
          {HUTS.map((hutKey) => (
            <div
              key={hutKey}
              className="flex items-center gap-3 bg-white rounded-xl px-3.5 py-2.5 border border-amber-100"
            >
              <Home size={13} className="text-amber-600 flex-shrink-0" />
              <div className="flex-1 min-w-0">
                <p className="text-xs font-semibold text-amber-900 truncate">
                  {t(`huts.${hutKey}.name`)}
                </p>
                <p className="text-[10px] text-amber-600">{t(`huts.${hutKey}.specialty`)}</p>
              </div>
              <span className="text-[10px] text-amber-500 font-medium flex-shrink-0">
                {t(`huts.${hutKey}.altitude`)}
              </span>
            </div>
          ))}
        </div>

        <a
          href={t('hutMapUrl')}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-amber-600 hover:bg-amber-700 text-white text-xs font-semibold transition-colors"
        >
          <Map size={13} />
          {t('hutMapLink')}
          <ExternalLink size={11} className="opacity-70" />
        </a>
      </div>

      {/* ── Bernina Express ── */}
      <div className="mt-6">
        <BerninaCard season="winter" />
      </div>
    </motion.div>
  );
}

/* ── Summer content ─────────────────────────────────────────── */
function SummerContent() {
  const t = useTranslations('livigno.summerContent');

  return (
    <motion.div
      key="summer"
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -18 }}
      transition={{ duration: 0.38 }}
    >
      <div className="text-center mb-8">
        <h3 className="font-serif text-2xl sm:text-3xl text-alpine-charcoal">{t('title')}</h3>
        <p className="text-alpine-slate text-sm mt-1">{t('subtitle')}</p>
      </div>

      <div className="space-y-3 mb-6">
        {TRAILS.map(({ key, icon: Icon, difficulty }) => {
          const diff = DIFF_CONFIG[difficulty];
          return (
            <motion.div
              key={key}
              whileHover={{ x: 4 }}
              className="alpine-card p-4 flex items-center gap-4"
            >
              <div className="p-3 rounded-xl bg-alpine-cream flex-shrink-0">
                <Icon size={20} className="text-alpine-wood" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <h4 className="font-semibold text-alpine-charcoal text-sm">
                    {t(`trails.${key}.name`)}
                  </h4>
                  <span className={cn('inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold', diff.bg, diff.text)}>
                    <span className={cn('w-1.5 h-1.5 rounded-full', diff.dot)} />
                    {t(difficulty)}
                  </span>
                </div>
                <p className="text-xs text-alpine-slate mt-0.5 leading-snug line-clamp-2">
                  {t(`trails.${key}.desc`)}
                </p>
                <div className="flex items-center gap-3 mt-1.5 flex-wrap">
                  <span className="flex items-center gap-1 text-[11px] text-alpine-wood font-medium">
                    <Map size={11} /> {t(`trails.${key}.distance`)}
                  </span>
                  <span className="flex items-center gap-1 text-[11px] text-alpine-wood font-medium">
                    <TrendingUp size={11} /> {t(`trails.${key}.elevation`)}
                  </span>
                  <span className="flex items-center gap-1 text-[11px] text-alpine-slate">
                    <Clock size={11} /> {t(`trails.${key}.duration`)}
                  </span>
                </div>
              </div>
              <ChevronRight size={16} className="text-alpine-slate/60 flex-shrink-0" />
            </motion.div>
          );
        })}
      </div>

      <a
        href={t('trailMapUrl')}
        target="_blank"
        rel="noopener noreferrer"
        className="btn-primary"
      >
        <Map size={16} />
        {t('mapLink')}
        <ExternalLink size={13} className="opacity-70" />
      </a>

      {/* ── Bernina Express ── */}
      <div className="mt-8 pt-6 border-t border-[#EBEBEB]">
        <BerninaCard season="summer" />
      </div>
    </motion.div>
  );
}

/* ── Section ────────────────────────────────────────────────── */
export function LivignoSection() {
  const t = useTranslations('livigno');
  const [season, setSeason] = useState<Season>('winter');

  return (
    <SectionWrapper id="livigno" className="bg-alpine-cream/30">
      <SectionHeader title={t('title')} subtitle={t('subtitle')} center />

      {/* ── Season toggle ── */}
      <div className="flex justify-center mb-10">
        <div className="flex bg-white rounded-2xl p-1.5 shadow-sm border border-alpine-cream gap-1">
          {(['winter', 'summer'] as Season[]).map((s) => (
            <button
              key={s}
              onClick={() => setSeason(s)}
              className={cn(
                'relative flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-medium transition-colors',
                season === s ? 'text-white' : 'text-alpine-slate hover:text-alpine-charcoal'
              )}
            >
              {season === s && (
                <motion.div
                  layoutId="season-bg"
                  className={cn(
                    'absolute inset-0 rounded-xl',
                    s === 'winter' ? 'bg-blue-600' : 'bg-amber-500'
                  )}
                  transition={{ type: 'spring', stiffness: 420, damping: 32 }}
                />
              )}
              <span className="relative z-10 flex items-center gap-2">
                {s === 'winter' ? <Snowflake size={15} /> : <Sun size={15} />}
                {t(s)}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* ── Seasonal content ── */}
      <AnimatePresence mode="wait">
        {season === 'winter' ? <WinterContent /> : <SummerContent />}
      </AnimatePresence>
    </SectionWrapper>
  );
}
