'use client';

import { useState } from 'react';
import dynamic from 'next/dynamic';
import { useTranslations } from 'next-intl';
import {
  UtensilsCrossed, Sparkles, Dumbbell, LogIn,
  Car, Baby, AlertTriangle, MountainSnow, ExternalLink, Navigation, X, Route,
} from 'lucide-react';

const ZtlMap = dynamic(() => import('@/components/ui/ZtlMap').then(m => m.ZtlMap), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex items-center justify-center bg-[#F7F7F5]">
      <p className="text-xs text-[#9B9B9B]">Caricamento mappa…</p>
    </div>
  ),
});
import { motion, AnimatePresence } from 'framer-motion';
import { SectionWrapper, SectionHeader } from '@/components/ui/SectionWrapper';
import { cn } from '@/lib/utils';

/* ── Types ─────────────────────────────────────────────────── */
interface ServiceDef {
  key: string;
  icon: React.ElementType;
  accent: string;
  iconBg: string;
}

/* ── Service definitions ────────────────────────────────────── */
const SERVICES: ServiceDef[] = [
  { key: 'restaurant', icon: UtensilsCrossed, accent: 'text-[#8B9EB7]', iconBg: 'bg-[#F7F7F5]' },
  { key: 'spa',        icon: Sparkles,        accent: 'text-[#8B9EB7]', iconBg: 'bg-[#F7F7F5]' },
  { key: 'gym',        icon: Dumbbell,        accent: 'text-[#8B9EB7]', iconBg: 'bg-[#F7F7F5]' },
  { key: 'checkin',    icon: LogIn,           accent: 'text-[#8B9EB7]', iconBg: 'bg-[#F7F7F5]' },
  { key: 'garage',     icon: Car,             accent: 'text-[#8B9EB7]', iconBg: 'bg-[#F7F7F5]' },
  { key: 'skiDepot',   icon: MountainSnow,    accent: 'text-[#8B9EB7]', iconBg: 'bg-[#F7F7F5]' },
  { key: 'kids',       icon: Baby,            accent: 'text-[#8B9EB7]', iconBg: 'bg-[#F7F7F5]' },
];

/* ── Animation variants ─────────────────────────────────────── */
const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.07, delayChildren: 0.1 } },
};

const item = {
  hidden:  { opacity: 0, y: 22 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.45 } },
};

/* ── ServiceCard ────────────────────────────────────────────── */
function ServiceCard({ def }: { def: ServiceDef }) {
  const t = useTranslations('hotelGuide');
  const Icon = def.icon;

  return (
    <motion.div
      variants={item}
      whileHover={{ y: -3, boxShadow: '0 8px 28px rgba(0,0,0,0.08)' }}
      transition={{ type: 'spring', stiffness: 320, damping: 22 }}
      className="bg-white rounded-2xl border border-[#EBEBEB] p-5 flex flex-col gap-3 h-full"
    >
      <div className="flex items-start gap-3">
        <div className={cn('p-2.5 rounded-xl flex-shrink-0', def.iconBg)}>
          <Icon size={18} strokeWidth={1.5} className={def.accent} />
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-[#2C3E50] text-sm leading-snug">
            {t(`${def.key}.name`)}
          </h3>
          <p className="text-xs font-medium mt-0.5 text-[#9B9B9B]">
            {t(`${def.key}.hours`)}
          </p>
        </div>
      </div>
      <p className="text-xs text-[#9B9B9B] leading-relaxed">
        {t(`${def.key}.desc`)}
      </p>
    </motion.div>
  );
}

/* ── ZTL Map Modal ──────────────────────────────────────────── */
function ZtlMapModal({ onClose }: { onClose: () => void }) {
  const [showRoute, setShowRoute] = useState(false);

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm"
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 16 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 16 }}
          transition={{ duration: 0.25 }}
          className="bg-white rounded-3xl shadow-2xl overflow-hidden w-full max-w-2xl"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Modal header */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-[#EBEBEB]">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-amber-50">
                <AlertTriangle size={16} className="text-amber-600" />
              </div>
              <div>
                <p className="font-semibold text-[#2C3E50] text-sm">Zona Traffico Limitato</p>
                <p className="text-xs text-[#9B9B9B]">Hotel Touring · Via Plan, 117 — Livigno</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-full text-[#9B9B9B] hover:bg-[#F7F7F5] transition-colors"
            >
              <X size={16} />
            </button>
          </div>

          {/* Tab toggle */}
          <div className="flex gap-1 px-6 pt-4 pb-0">
            <button
              onClick={() => setShowRoute(false)}
              className={cn(
                'flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-semibold transition-colors',
                !showRoute
                  ? 'bg-[#2C3E50] text-white'
                  : 'bg-[#F7F7F5] text-[#9B9B9B] hover:text-[#2C3E50]'
              )}
            >
              <Navigation size={12} />
              Mappa
            </button>
            <button
              onClick={() => setShowRoute(true)}
              className={cn(
                'flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-semibold transition-colors',
                showRoute
                  ? 'bg-amber-500 text-white'
                  : 'bg-[#F7F7F5] text-[#9B9B9B] hover:text-[#2C3E50]'
              )}
            >
              <Route size={12} />
              Percorso Consentito
            </button>
          </div>

          {/* Content */}
          <div className="w-full mt-4" style={{ height: '360px' }}>
            {showRoute ? (
              <img
                src={`${process.env.NEXT_PUBLIC_BASE_PATH}/images/ztl-percorso.jpg`}
                alt="Percorso ZTL N.5 — Hotel Touring"
                className="w-full h-full object-contain bg-[#F7F7F5]"
              />
            ) : (
              <ZtlMap />
            )}
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between px-6 py-4 border-t border-[#EBEBEB] bg-[#F7F7F5]">
            <p className="text-xs text-[#9B9B9B]">
              Accedi alla ZTL con il codice fornito in reception
            </p>
            <a
              href="https://www.openstreetmap.org/?mlat=46.5387&mlon=10.1356#map=16/46.5387/10.1356"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs font-medium text-[#2C3E50] hover:underline"
            >
              <Navigation size={12} />
              Apri in Maps
              <ExternalLink size={10} className="opacity-60" />
            </a>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

/* ── ZTL Card ───────────────────────────────────────────────── */
function ZtlCard() {
  const t = useTranslations('hotelGuide');
  const [mapOpen, setMapOpen] = useState(false);

  return (
    <>
      <motion.div
        variants={item}
        whileHover={{ y: -3 }}
        transition={{ type: 'spring', stiffness: 320, damping: 22 }}
        className="bg-white rounded-2xl border border-amber-200 border-l-4 border-l-amber-400 p-5 flex flex-col gap-3 h-full col-span-1 sm:col-span-2 lg:col-span-2"
      >
        <div className="flex items-start gap-3">
          <div className="p-2.5 rounded-xl bg-amber-50 flex-shrink-0">
            <AlertTriangle size={18} strokeWidth={1.5} className="text-amber-600" />
          </div>
          <div>
            <h3 className="font-semibold text-[#2C3E50] text-sm leading-snug">
              {t('ztl.name')}
            </h3>
            <p className="text-xs font-medium text-amber-600 mt-0.5">
              {t('ztl.hours')}
            </p>
          </div>
        </div>

        <p className="text-xs text-[#9B9B9B] leading-relaxed">
          {t('ztl.desc')}
        </p>

        <button
          onClick={() => setMapOpen(true)}
          className="mt-auto inline-flex items-center gap-2 self-start px-4 py-2 rounded-xl bg-amber-50 hover:bg-amber-100 border border-amber-200 transition-colors text-xs font-semibold text-amber-700"
        >
          <Navigation size={13} />
          {t('ztl.mapLink')}
        </button>
      </motion.div>

      {mapOpen && <ZtlMapModal onClose={() => setMapOpen(false)} />}
    </>
  );
}

/* ── Section ────────────────────────────────────────────────── */
export function HotelGuideSection() {
  const t = useTranslations('hotelGuide');

  return (
    <SectionWrapper id="hotel-guide" className="bg-[#F7F7F5]">
      <SectionHeader title={t('title')} subtitle={t('subtitle')} />

      <motion.div
        variants={container}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-60px' }}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
      >
        {SERVICES.map((def) => (
          <ServiceCard key={def.key} def={def} />
        ))}
        <ZtlCard />
      </motion.div>
    </SectionWrapper>
  );
}
