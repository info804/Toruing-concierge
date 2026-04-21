'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import emailjs from '@emailjs/browser';
import {
  Flame, Droplets, Leaf, ShowerHead, Waves,
  Thermometer, Clock, Calendar, ChevronDown, X,
  ChevronRight, ArrowLeft, Send, Loader2, CheckCircle2,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { SectionWrapper } from '@/components/ui/SectionWrapper';
import { cn } from '@/lib/utils';

/* ── Massage data ───────────────────────────────────────────── */
interface MassageItem { name: string; duration: string; price: string; }
interface MassageCategory { label: string; items: MassageItem[]; }

const MASSAGE_CATEGORIES: MassageCategory[] = [
  {
    label: 'Massaggi per tutto il corpo',
    items: [
      { name: 'Rilassante',                             duration: '50 min', price: '€ 75,00' },
      { name: 'Sportivo / Decontratturante',            duration: '50 min', price: '€ 90,00' },
      { name: 'Hawaiano',                               duration: '50 min', price: '€ 80,00' },
      { name: 'Balinese',                               duration: '50 min', price: '€ 85,00' },
      { name: 'Tocco del Risveglio',                    duration: '50 min', price: '€ 80,00' },
      { name: 'Hot-Stone',                              duration: '50 min', price: '€ 85,00' },
      { name: 'Coccola per i più piccoli (da 6 anni)', duration: '25 min', price: '€ 40,00' },
    ],
  },
  {
    label: 'Trattamenti Schiena',
    items: [
      { name: 'Orientale Decontratturante',             duration: '50 min', price: '€ 75,00' },
      { name: 'Distensivo',                             duration: '40 min', price: '€ 70,00' },
      { name: 'Parziale · Schiena e Cervicale',         duration: '25 min', price: '€ 45,00' },
    ],
  },
  {
    label: 'Trattamenti Gambe',
    items: [
      { name: 'Drenante Manuale',                       duration: '50 min', price: '€ 75,00' },
      { name: 'Drenante Manuale + Legnoterapia',        duration: '50 min', price: '€ 80,00' },
      { name: 'Defaticante',                            duration: '50 min', price: '€ 80,00' },
    ],
  },
  {
    label: 'Trattamenti Viso',
    items: [
      { name: 'Antiossidante alla Vitamina C',          duration: '40 min', price: '€ 65,00' },
      { name: 'Pelli Sensibili',                        duration: '40 min', price: '€ 60,00' },
      { name: 'Anti-Età · Acido Ialuronico e Multivitamine', duration: '50 min', price: '€ 70,00' },
    ],
  },
  {
    label: 'Trattamenti Piedi',
    items: [
      { name: 'Trattamento Thai',                       duration: '40 min', price: '€ 60,00' },
    ],
  },
];

/* ── Booking Form ───────────────────────────────────────────── */
interface BookingForm { guestName: string; roomNumber: string; preferredTime: string; }
const EMPTY_FORM: BookingForm = { guestName: '', roomNumber: '', preferredTime: '' };

function MassageBookingForm({
  treatment,
  onBack,
  onClose,
}: {
  treatment: MassageItem;
  onBack: () => void;
  onClose: () => void;
}) {
  const [form, setForm] = useState<BookingForm>(EMPTY_FORM);
  const [errors, setErrors] = useState<Partial<BookingForm>>({});
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [sendError, setSendError] = useState(false);

  const update = (f: keyof BookingForm, v: string) => {
    setForm((p) => ({ ...p, [f]: v }));
    if (errors[f]) setErrors((p) => ({ ...p, [f]: undefined }));
  };

  const validate = () => {
    const e: Partial<BookingForm> = {};
    if (!form.guestName.trim()) e.guestName = 'Campo obbligatorio';
    if (!form.roomNumber.trim()) e.roomNumber = 'Campo obbligatorio';
    return e;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) { setErrors(errs); return; }
    setSending(true); setSendError(false);
    try {
      await emailjs.send(
        'service_touring',
        'template_concierge',
        {
          request_type: `Massaggio: ${treatment.name}`,
          guest_name: form.guestName,
          room_number: form.roomNumber,
          preferred_time: form.preferredTime || '—',
          notes: `${treatment.duration} · ${treatment.price}`,
          to_email: 'info@touringlivigno.com',
        },
        { publicKey: 'Q6FmiWmoTO72Im-1Q' }
      );
      setSent(true);
      setTimeout(() => { setSent(false); onClose(); }, 3000);
    } catch {
      setSendError(true);
    } finally {
      setSending(false);
    }
  };

  if (sent) {
    return (
      <div className="flex flex-col items-center justify-center py-16 px-8 text-center">
        <div className="w-16 h-16 rounded-full bg-teal-50 flex items-center justify-center mb-4">
          <CheckCircle2 size={32} className="text-teal-500" />
        </div>
        <h3 className="font-serif text-xl text-[#2C3E50] mb-2">Richiesta Inviata!</h3>
        <p className="text-sm text-[#9B9B9B] max-w-xs">
          Ti contatteremo a breve per confermare disponibilità e orario.
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full">
      {/* Back */}
      <div className="flex items-center gap-3 px-6 py-4 border-b border-[#EBEBEB] flex-shrink-0">
        <button
          onClick={onBack}
          className="flex items-center gap-1.5 text-[#9B9B9B] hover:text-[#2C3E50] transition-colors text-sm font-medium"
        >
          <ArrowLeft size={15} /> Torna ai trattamenti
        </button>
      </div>

      {/* Treatment summary */}
      <div className="px-6 py-4 bg-[#F7F7F5] border-b border-[#EBEBEB] flex-shrink-0">
        <p className="text-[10px] font-semibold text-[#8B9EB7] uppercase tracking-widest mb-0.5">Trattamento selezionato</p>
        <p className="font-serif text-lg text-[#2C3E50] font-bold">{treatment.name}</p>
        <div className="flex items-center gap-3 mt-1">
          <span className="flex items-center gap-1 text-xs text-[#9B9B9B]"><Clock size={11} /> {treatment.duration}</span>
          <span className="text-xs font-bold text-[#2C3E50]">{treatment.price}</span>
        </div>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="px-6 py-5 space-y-4 overflow-y-auto flex-1">
        <div>
          <label className="block text-xs font-medium text-[#4A4A4A] mb-1.5">
            Nome e Cognome <span className="text-rose-500">*</span>
          </label>
          <input
            type="text"
            value={form.guestName}
            onChange={(e) => update('guestName', e.target.value)}
            placeholder="Il tuo nome completo"
            className={cn(
              'w-full px-4 py-2.5 rounded-xl border text-sm outline-none transition-colors',
              errors.guestName ? 'border-rose-400 bg-rose-50' : 'border-[#EBEBEB] focus:border-[#2C3E50] bg-white'
            )}
          />
          {errors.guestName && <p className="text-xs text-rose-500 mt-1">{errors.guestName}</p>}
        </div>

        <div>
          <label className="block text-xs font-medium text-[#4A4A4A] mb-1.5">
            Numero Camera <span className="text-rose-500">*</span>
          </label>
          <input
            type="text"
            inputMode="numeric"
            value={form.roomNumber}
            onChange={(e) => update('roomNumber', e.target.value)}
            placeholder="es. 204"
            className={cn(
              'w-full px-4 py-2.5 rounded-xl border text-sm outline-none transition-colors',
              errors.roomNumber ? 'border-rose-400 bg-rose-50' : 'border-[#EBEBEB] focus:border-[#2C3E50] bg-white'
            )}
          />
          {errors.roomNumber && <p className="text-xs text-rose-500 mt-1">{errors.roomNumber}</p>}
        </div>

        <div>
          <label className="block text-xs font-medium text-[#4A4A4A] mb-1.5">
            <span className="flex items-center gap-1"><Clock size={11} /> Orario Preferito</span>
          </label>
          <input
            type="text"
            value={form.preferredTime}
            onChange={(e) => update('preferredTime', e.target.value)}
            placeholder="es. 16:00 o Prima Possibile"
            className="w-full px-4 py-2.5 rounded-xl border border-[#EBEBEB] focus:border-[#2C3E50] bg-white text-sm outline-none transition-colors"
          />
        </div>

        {sendError && (
          <p className="text-xs text-rose-500 bg-rose-50 rounded-xl px-4 py-3 text-center">
            Ops, qualcosa non ha funzionato. Riprova o chiamaci al +39 0342 996131.
          </p>
        )}

        <button
          type="submit"
          disabled={sending}
          className="w-full flex items-center justify-center gap-2 py-3.5 bg-[#2C3E50] hover:bg-[#1a252f] disabled:opacity-60 text-white rounded-full font-semibold text-sm transition-colors"
        >
          {sending ? <Loader2 size={15} className="animate-spin" /> : <Send size={15} />}
          {sending ? 'Invio in corso…' : 'Invia Richiesta'}
        </button>
      </form>
    </div>
  );
}

/* ── Massage Menu Modal ──────────────────────────────────────── */
function MassageMenuModal({ onClose }: { onClose: () => void }) {
  const [selected, setSelected] = useState<MassageItem | null>(null);

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />
      <motion.div
        initial={{ opacity: 0, y: '100%' }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: '100%' }}
        transition={{ type: 'spring', damping: 28, stiffness: 220 }}
        className="fixed bottom-0 left-0 right-0 z-50 bg-white rounded-t-3xl shadow-2xl max-h-[90vh] flex flex-col sm:max-w-lg sm:left-1/2 sm:-translate-x-1/2 sm:bottom-6 sm:rounded-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#EBEBEB] flex-shrink-0">
          <div>
            <p className="text-[10px] font-semibold text-[#8B9EB7] uppercase tracking-widest">Wellness & Spa</p>
            <h3 className="font-serif text-xl text-[#2C3E50] font-bold">
              {selected ? 'Prenota Trattamento' : 'Trattamenti Disponibili'}
            </h3>
          </div>
          <button onClick={onClose} className="p-2 rounded-full hover:bg-[#F7F7F5] transition-colors">
            <X size={16} className="text-[#9B9B9B]" />
          </button>
        </div>

        {/* Content */}
        <AnimatePresence mode="wait">
          {selected ? (
            <motion.div key="form" initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }} className="flex flex-col flex-1 overflow-hidden">
              <MassageBookingForm
                treatment={selected}
                onBack={() => setSelected(null)}
                onClose={onClose}
              />
            </motion.div>
          ) : (
            <motion.div key="list" initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 30 }} className="flex flex-col flex-1 overflow-hidden">
              {/* Info */}
              <div className="px-6 py-2.5 bg-[#F7F7F5] border-b border-[#EBEBEB] flex-shrink-0">
                <p className="text-xs text-[#9B9B9B] text-center">Su richiesta si effettuano trattamenti e pacchetti personalizzati</p>
              </div>

              {/* List */}
              <div className="overflow-y-auto flex-1 px-6 py-4 space-y-5">
                {MASSAGE_CATEGORIES.map((cat) => (
                  <div key={cat.label}>
                    <h4 className="text-xs font-bold text-[#2C3E50] uppercase tracking-widest mb-2 pb-2 border-b border-[#EBEBEB]">
                      {cat.label}
                    </h4>
                    <div className="space-y-1">
                      {cat.items.map((item) => (
                        <button
                          key={item.name}
                          onClick={() => setSelected(item)}
                          className="w-full flex items-center justify-between gap-3 py-2.5 px-3 rounded-xl hover:bg-[#F7F7F5] transition-colors text-left group"
                        >
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-semibold text-[#2C3E50] leading-snug">{item.name}</p>
                            <div className="flex items-center gap-2 mt-0.5">
                              <span className="flex items-center gap-1 text-xs text-[#9B9B9B]"><Clock size={10} /> {item.duration}</span>
                              <span className="text-xs font-bold text-[#2C3E50]">{item.price}</span>
                            </div>
                          </div>
                          <ChevronRight size={14} className="text-[#9B9B9B] group-hover:text-[#2C3E50] transition-colors flex-shrink-0" />
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              {/* Footer */}
              <div className="px-6 py-3 border-t border-[#EBEBEB] flex-shrink-0 bg-[#F7F7F5]">
                <p className="text-[11px] text-[#9B9B9B] text-center">Tutti i trattamenti sono soggetti a disponibilità · Tel. interno 9</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </AnimatePresence>
  );
}

/* ── Facility definitions ───────────────────────────────────── */
const FACILITIES = [
  { key: 'sauna',      icon: Flame,      color: 'text-orange-400', bg: 'bg-orange-500/15', border: 'border-orange-500/20', dot: 'bg-orange-400', step: 1 },
  { key: 'steam',      icon: Droplets,   color: 'text-teal-400',   bg: 'bg-teal-500/15',   border: 'border-teal-500/20',   dot: 'bg-teal-400',   step: 2 },
  { key: 'brechelbad', icon: Leaf,       color: 'text-green-400',  bg: 'bg-green-500/15',  border: 'border-green-500/20',  dot: 'bg-green-400',  step: 3 },
  { key: 'shower',     icon: ShowerHead, color: 'text-blue-400',   bg: 'bg-blue-500/15',   border: 'border-blue-500/20',   dot: 'bg-blue-400',   step: 4 },
  { key: 'hydropool',  icon: Waves,      color: 'text-sky-400',    bg: 'bg-sky-500/15',    border: 'border-sky-500/20',    dot: 'bg-sky-400',    step: 5 },
] as const;

/* ── Single facility row ────────────────────────────────────── */
function FacilityRow({ def }: { def: typeof FACILITIES[number] }) {
  const t = useTranslations('wellness');
  const [expanded, setExpanded] = useState(false);
  const Icon = def.icon;

  return (
    <motion.div layout className={cn('rounded-2xl border overflow-hidden transition-colors', def.border, expanded ? 'bg-white/8' : 'bg-white/5 hover:bg-white/7')}>
      <button onClick={() => setExpanded((v) => !v)} className="w-full flex items-center gap-4 p-5 text-left">
        <div className="flex items-center gap-3 flex-shrink-0">
          <div className="hidden sm:flex flex-col items-center gap-1">
            <span className="text-[10px] font-bold text-white/25 tracking-widest">0{def.step}</span>
            <div className={cn('w-px flex-1 min-h-[12px]', def.dot, 'opacity-30')} />
          </div>
          <div className={cn('p-3 rounded-xl', def.bg)}>
            <Icon size={22} className={def.color} />
          </div>
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <h3 className="font-serif text-lg text-white font-bold leading-snug">{t(`facilities.${def.key}.name`)}</h3>
            {t(`facilities.${def.key}.temp`) && (
              <span className={cn('inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold', def.bg, def.color)}>
                <Thermometer size={11} />{t(`facilities.${def.key}.temp`)}
              </span>
            )}
          </div>
        </div>
        <motion.div animate={{ rotate: expanded ? 180 : 0 }} transition={{ duration: 0.2 }} className="flex-shrink-0 p-1.5 rounded-lg text-white/40 hover:text-white/70">
          <ChevronDown size={18} />
        </motion.div>
      </button>
      <AnimatePresence initial={false}>
        {expanded && (
          <motion.div key="detail" initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.28, ease: 'easeInOut' }} className="overflow-hidden">
            <div className="px-5 pb-5 pl-[4.5rem] sm:pl-[5.5rem]">
              <p className="text-sm text-white/85 leading-relaxed">{t(`facilities.${def.key}.desc`)}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

/* ── Section ────────────────────────────────────────────────── */
const container = { hidden: {}, visible: { transition: { staggerChildren: 0.09, delayChildren: 0.1 } } };
const rowVar = { hidden: { opacity: 0, x: -16 }, visible: { opacity: 1, x: 0, transition: { duration: 0.45 } } };

export function WellnessSection() {
  const t = useTranslations('wellness');
  const [massageOpen, setMassageOpen] = useState(false);

  return (
    <SectionWrapper id="wellness" className="relative overflow-hidden bg-[#2C3E50]">
      <img src="/images/wellness-bg.jpg" alt="" className="absolute inset-0 w-full h-full object-cover opacity-25 pointer-events-none" />

      <div className="mb-10 lg:mb-14 text-center">
        <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-white">{t('title')}</h2>
        <p className="text-white/80 text-base sm:text-lg mt-3 font-medium">{t('subtitle')}</p>
        <p className="mt-5 text-sm text-white/70 leading-relaxed max-w-2xl mx-auto">{t('intro')}</p>
        <div className="flex flex-wrap gap-4 mt-6 justify-center">
          <div className="flex items-center gap-2 text-xs text-white/75 font-medium">
            <Clock size={13} className="text-white/80" />{t('hours')}
          </div>
        </div>
      </div>

      <motion.div variants={container} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-60px' }} className="flex flex-col gap-3 mb-8 max-w-2xl mx-auto">
        {FACILITIES.map((def) => (
          <motion.div key={def.key} variants={rowVar}><FacilityRow def={def} /></motion.div>
        ))}
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.3 }} className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5 p-6 rounded-2xl bg-white/5 border border-white/10 max-w-2xl mx-auto">
        <div className="flex items-center gap-4">
          <div className="p-3.5 rounded-xl bg-white/10"><Calendar size={22} className="text-white" /></div>
          <div>
            <p className="font-bold text-white text-sm">{t('bookTreatment')}</p>
            <p className="text-xs text-white/75 mt-0.5">{t('bookDesc')}</p>
          </div>
        </div>
        <button
          onClick={() => setMassageOpen(true)}
          className="flex-shrink-0 inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white text-[#2C3E50] text-sm font-bold hover:bg-white/90 transition-colors shadow-md"
        >
          <Calendar size={15} />
          Prenota un Trattamento
          <ChevronRight size={14} />
        </button>
      </motion.div>

      {massageOpen && <MassageMenuModal onClose={() => setMassageOpen(false)} />}
    </SectionWrapper>
  );
}
