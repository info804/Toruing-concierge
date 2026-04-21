'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import {
  AlertTriangle, MapPin, Navigation, ExternalLink,
  Info, Snowflake, MountainSnow, Clock, Route, Compass,
} from 'lucide-react';
import { SectionWrapper } from '@/components/ui/SectionWrapper';

const GOOGLE_MAPS_URL =
  'https://www.google.com/maps/dir/?api=1&destination=Hotel+Touring+Livigno+Via+Plan+117+Livigno';

const MAPS_EMBED_URL =
  'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2742.0!2d10.1361!3d46.5375!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47833a6f0f4b4f4f%3A0x0!2sHotel+Touring+Livigno!5e0!3m2!1sit!2sit!4v1700000000000!5m2!1sit!2sit';

/* ── Mountain silhouette SVG decoration ─────────────────────── */
function MountainDecor({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 800 160"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      preserveAspectRatio="none"
    >
      {/* Far mountains */}
      <polygon points="0,160 80,60 160,130 240,40 320,110 400,30 480,90 560,50 640,120 720,45 800,100 800,160" fill="currentColor" opacity="0.06" />
      {/* Near mountains */}
      <polygon points="0,160 60,100 130,150 220,70 310,140 400,55 490,135 580,80 660,145 740,65 800,120 800,160" fill="currentColor" opacity="0.10" />
      {/* Foreground ridge */}
      <polygon points="0,160 100,130 200,155 300,120 400,140 500,115 600,150 700,125 800,145 800,160" fill="currentColor" opacity="0.18" />
    </svg>
  );
}

type RouteKey = 'tunnel' | 'forcola' | 'foscagno';

interface RouteDef {
  key: RouteKey;
  type: 'tunnel' | 'pass';
  altitude?: string;
  icon: React.ElementType;
  accent: string;
  bg: string;
  border: string;
  badgeBg: string;
  badgeText: string;
  alertBg: string;
  alertBorder: string;
  alertText: string;
}

const ROUTES: RouteDef[] = [
  {
    key: 'tunnel',
    type: 'tunnel',
    icon: Route,
    accent: 'text-amber-600',
    bg: 'bg-amber-50',
    border: 'border-amber-200',
    badgeBg: 'bg-amber-500',
    badgeText: 'text-white',
    alertBg: 'bg-amber-50',
    alertBorder: 'border-amber-200',
    alertText: 'text-amber-800',
  },
  {
    key: 'forcola',
    type: 'pass',
    altitude: '2.315 m',
    icon: MountainSnow,
    accent: 'text-blue-600',
    bg: 'bg-blue-50',
    border: 'border-blue-200',
    badgeBg: 'bg-blue-500',
    badgeText: 'text-white',
    alertBg: 'bg-blue-50',
    alertBorder: 'border-blue-200',
    alertText: 'text-blue-800',
  },
  {
    key: 'foscagno',
    type: 'pass',
    altitude: '2.291 m',
    icon: MountainSnow,
    accent: 'text-indigo-600',
    bg: 'bg-indigo-50',
    border: 'border-indigo-200',
    badgeBg: 'bg-indigo-500',
    badgeText: 'text-white',
    alertBg: 'bg-indigo-50',
    alertBorder: 'border-indigo-200',
    alertText: 'text-indigo-800',
  },
];

const cardVar = {
  hidden: { opacity: 0, y: 22 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.45 } },
};

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.15 } },
};

/* ── Route Card ─────────────────────────────────────────────── */
function RouteCard({ route, t }: { route: RouteDef; t: ReturnType<typeof useTranslations> }) {
  const Icon = route.icon;

  return (
    <motion.div
      variants={cardVar}
      whileHover={{ y: -2, boxShadow: '0 12px 32px rgba(0,0,0,0.09)' }}
      transition={{ type: 'spring', stiffness: 300, damping: 22 }}
      className={`rounded-2xl border ${route.border} overflow-hidden bg-white`}
    >
      {/* Card header */}
      <div className={`px-5 py-4 ${route.bg} flex items-start gap-4`}>
        {/* Icon */}
        <div className={`p-2.5 rounded-xl bg-white shadow-sm flex-shrink-0 mt-0.5`}>
          <Icon size={18} strokeWidth={1.75} className={route.accent} />
        </div>

        {/* Name & desc */}
        <div className="flex-1 min-w-0">
          <p className="font-bold text-[#2C3E50] text-sm leading-snug">
            {t(`routes.${route.key}.name`)}
          </p>
          <p className="text-xs text-[#9B9B9B] mt-0.5 leading-relaxed">
            {t(`routes.${route.key}.desc`)}
          </p>
        </div>

        {/* Badge */}
        <div className="flex-shrink-0 flex flex-col items-end gap-1.5">
          {route.altitude && (
            <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold ${route.badgeBg} ${route.badgeText}`}>
              <MountainSnow size={9} />
              {route.altitude}
            </span>
          )}
          {route.key === 'tunnel' ? (
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold bg-white text-amber-600 border border-amber-200">
              <AlertTriangle size={9} />
              {t('alertTitle')}
            </span>
          ) : (
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold bg-white text-blue-600 border border-blue-200">
              <Snowflake size={9} />
              {t('winterClosure')}
            </span>
          )}
        </div>
      </div>

      {/* Alert row */}
      <div className={`px-5 py-3.5 border-t ${route.alertBorder} ${route.alertBg} flex items-start gap-3`}>
        {route.key === 'tunnel' ? (
          <Clock size={14} className={`flex-shrink-0 mt-0.5 ${route.accent}`} />
        ) : (
          <Snowflake size={14} className={`flex-shrink-0 mt-0.5 ${route.accent}`} />
        )}
        <p className={`text-xs leading-relaxed font-medium ${route.alertText}`}>
          {t(`routes.${route.key}.alert`)}
        </p>
      </div>
    </motion.div>
  );
}

/* ── Section ────────────────────────────────────────────────── */
export function HowToReachSection() {
  const t = useTranslations('howToReach');

  return (
    <SectionWrapper id="how-to-reach" className="relative overflow-hidden bg-white">

      {/* Mountain silhouette decoration — top */}
      <MountainDecor className="absolute top-0 left-0 right-0 w-full h-28 text-[#2C3E50] pointer-events-none" />

      {/* Compass decoration — top right */}
      <div className="absolute top-8 right-10 opacity-5 pointer-events-none hidden lg:block">
        <Compass size={180} strokeWidth={0.6} className="text-[#2C3E50]" />
      </div>

      {/* ── Header ─────────────────────────────────────────────── */}
      <div className="relative mb-12 lg:mb-16">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#2C3E50]/8 text-[#2C3E50] text-[11px] font-bold uppercase tracking-widest mb-5">
          <Navigation size={12} />
          Livigno · 1.816 m s.l.m.
        </div>

        <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#2C3E50] font-bold">
          {t('title')}
        </h2>
        <p className="text-[#9B9B9B] text-base sm:text-lg mt-3 max-w-2xl leading-relaxed">
          {t('subtitle')}
        </p>

        {/* Route summary pills */}
        <div className="flex flex-wrap gap-2 mt-5">
          {(['tunnel', 'forcola', 'foscagno'] as const).map((key, i) => (
            <span
              key={key}
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#F7F7F5] border border-[#EBEBEB] text-xs font-medium text-[#4A4A4A]"
            >
              <span className={`w-2 h-2 rounded-full flex-shrink-0 ${['bg-amber-400', 'bg-blue-400', 'bg-indigo-400'][i]}`} />
              {t(`routes.${key}.name`)}
            </span>
          ))}
        </div>
      </div>

      {/* ── Main grid ──────────────────────────────────────────── */}
      <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">

        {/* Left — Map + address + tips */}
        <motion.div
          initial={{ opacity: 0, x: -24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55 }}
          className="flex flex-col gap-4"
        >
          {/* Map */}
          <div className="rounded-3xl overflow-hidden border border-[#EBEBEB] shadow-md aspect-[4/3] relative">
            <iframe
              src={MAPS_EMBED_URL}
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Hotel Touring Livigno"
            />
            {/* Map label overlay */}
            <div className="absolute top-3 left-3 flex items-center gap-2 bg-white/95 backdrop-blur-sm px-3 py-1.5 rounded-full shadow-md border border-white/60 pointer-events-none">
              <div className="w-2.5 h-2.5 rounded-full bg-[#2C3E50]" />
              <p className="text-xs font-bold text-[#2C3E50]">Hotel Touring</p>
            </div>
          </div>

          {/* Address chip */}
          <div className="flex items-center justify-between gap-4 p-4 rounded-2xl bg-[#F7F7F5] border border-[#EBEBEB]">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-white border border-[#EBEBEB] shadow-sm">
                <MapPin size={16} className="text-[#2C3E50]" />
              </div>
              <div>
                <p className="text-[10px] text-[#9B9B9B] font-semibold uppercase tracking-wider">Indirizzo</p>
                <p className="text-sm text-[#2C3E50] font-bold mt-0.5">Via Plan, 117 · 23041 Livigno (SO)</p>
              </div>
            </div>
            <a
              href={GOOGLE_MAPS_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-shrink-0 inline-flex items-center gap-1.5 px-4 py-2.5 rounded-full bg-[#2C3E50] hover:bg-[#1a252f] text-white text-xs font-bold transition-colors shadow-sm"
            >
              <ExternalLink size={12} />
              {t('mapsButton')}
            </a>
          </div>

          {/* Tips */}
          <div className="p-5 rounded-2xl bg-gradient-to-br from-[#2C3E50]/5 to-[#2C3E50]/8 border border-[#2C3E50]/12">
            <div className="flex items-center gap-2 mb-4">
              <div className="p-1.5 rounded-lg bg-[#2C3E50]/10">
                <Info size={13} className="text-[#2C3E50]" />
              </div>
              <p className="text-xs font-bold text-[#2C3E50] uppercase tracking-wider">{t('tips.title')}</p>
            </div>
            <ul className="space-y-3">
              {(['gps', 'chains', 'check'] as const).map((tip) => (
                <li key={tip} className="flex items-start gap-3 text-sm text-[#4A4A4A]">
                  <span className="w-5 h-5 rounded-full bg-[#2C3E50]/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#2C3E50]/60" />
                  </span>
                  {t(`tips.${tip}`)}
                </li>
              ))}
            </ul>
          </div>
        </motion.div>

        {/* Right — Route cards */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-40px' }}
          className="flex flex-col gap-4"
        >
          {/* Section label */}
          <div className="flex items-center gap-2 mb-1">
            <Route size={14} className="text-[#8B9EB7]" />
            <p className="text-xs font-bold text-[#9B9B9B] uppercase tracking-widest">Percorsi di accesso</p>
          </div>

          {ROUTES.map((route) => (
            <RouteCard key={route.key} route={route} t={t} />
          ))}

          {/* Winter reminder card */}
          <motion.div
            variants={cardVar}
            className="rounded-2xl bg-gradient-to-br from-[#2C3E50] to-[#3d5166] p-5 flex items-start gap-4 text-white"
          >
            <div className="p-2.5 rounded-xl bg-white/10 flex-shrink-0">
              <MountainSnow size={20} className="text-white" />
            </div>
            <div>
              <p className="font-bold text-sm mb-1">Viaggio in Montagna</p>
              <p className="text-xs text-white/75 leading-relaxed">
                Livigno si trova a 1.816 m. In inverno raccomandiamo sempre catene o pneumatici da neve e di verificare le condizioni dei passi su{' '}
                <span className="font-semibold text-white/90">stradainforma.it</span>{' '}
                prima di partire.
              </p>
            </div>
          </motion.div>
        </motion.div>

      </div>

      {/* Mountain silhouette decoration — bottom */}
      <MountainDecor className="absolute bottom-0 left-0 right-0 w-full h-20 text-[#2C3E50] pointer-events-none rotate-180" />
    </SectionWrapper>
  );
}
