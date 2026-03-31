'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import emailjs from '@emailjs/browser';
import { IMAGES } from '@/config/images';
import { Wine, Sparkles, Cake, Flower2, X, Send, CheckCircle2, ChevronRight, Clock, Calendar, Tag, Phone, Mail, Loader2, MessageCircle, Download } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { SectionWrapper, SectionHeader } from '@/components/ui/SectionWrapper';
import { cn } from '@/lib/utils';

/* ── Item definitions ───────────────────────────────────────── */
const ITEMS = [
  {
    key: 'wine' as const,
    icon: Wine,
    gradient: '',
    imageBg: IMAGES.concierge.wine,
    badgeColor: 'bg-white/90 text-[#2C3E50]',
    accentLight: 'bg-[#F7F7F5] text-[#2C3E50]',
  },
  {
    key: 'massage' as const,
    icon: Sparkles,
    gradient: '',
    imageBg: IMAGES.concierge.massage,
    badgeColor: 'bg-white/90 text-[#2C3E50]',
    accentLight: 'bg-[#F7F7F5] text-[#2C3E50]',
  },
  {
    key: 'cake' as const,
    icon: Cake,
    gradient: '',
    imageBg: IMAGES.concierge.cake,
    badgeColor: 'bg-white/90 text-[#2C3E50]',
    accentLight: 'bg-[#F7F7F5] text-[#2C3E50]',
  },
  {
    key: 'flowers' as const,
    icon: Flower2,
    gradient: '',
    imageBg: IMAGES.concierge.flowers,
    badgeColor: 'bg-white/90 text-[#2C3E50]',
    accentLight: 'bg-[#F7F7F5] text-[#2C3E50]',
  },
] as const;

type ItemKey = typeof ITEMS[number]['key'];

/* ── Form state ─────────────────────────────────────────────── */
interface FormState {
  guestName: string;
  roomNumber: string;
  preferredTime: string;
  notes: string;
}

const EMPTY_FORM: FormState = {
  guestName: '',
  roomNumber: '',
  preferredTime: '',
  notes: '',
};



/* ── Flowers Contact Modal ──────────────────────────────────── */
function FlowersContactModal({ onClose }: { onClose: () => void }) {
  const item = ITEMS.find((i) => i.key === 'flowers')!;

  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
        onClick={onClose}
      />
      <motion.div
        initial={{ opacity: 0, y: '100%' }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: '100%' }}
        transition={{ type: 'spring', damping: 28, stiffness: 220 }}
        className="fixed bottom-0 left-0 right-0 z-50 bg-white rounded-t-3xl shadow-2xl max-h-[92vh] overflow-y-auto sm:max-w-lg sm:left-1/2 sm:-translate-x-1/2 sm:bottom-6 sm:rounded-2xl"
      >
        {/* Header */}
        <div className="relative flex-shrink-0">
          <div className="h-36 overflow-hidden rounded-t-3xl sm:rounded-t-2xl">
            <img
              src={item.imageBg}
              alt="Bouquet di Benvenuto"
              className="w-full h-full object-cover"
            />
          </div>
          <button onClick={onClose} className="absolute top-3 right-3 p-2 rounded-full bg-white shadow-md hover:bg-[#F7F7F5] transition-colors">
            <X size={15} className="text-[#2C3E50]" />
          </button>
          <div className="px-5 py-4 border-b border-[#EBEBEB]">
            <span className="section-label">Flower Touch</span>
            <h3 className="font-serif text-xl text-[#2C3E50] font-bold">Bouquet di Benvenuto</h3>
          </div>
        </div>

        {/* Nota */}
        <div className="px-5 py-3 bg-[#F7F7F5] border-b border-[#EBEBEB]">
          <p className="text-xs text-[#9B9B9B] text-center">Fiori freschi di stagione — prenota con almeno 24h di anticipo</p>
        </div>

        {/* Descrizione */}
        <div className="px-5 py-5 space-y-4">
          <p className="text-sm text-[#4A4A4A] leading-relaxed">
            Trasforma la tua camera in un angolo speciale con un bouquet di fiori freschi scelti dai nostri fornitori locali. Perfetto per anniversari, compleanni o semplicemente per rendere unico ogni arrivo.
          </p>
          <div className="flex items-start gap-3 bg-[#F7F7F5] rounded-2xl px-4 py-3">
            <Flower2 size={16} className="text-[#8B9EB7] flex-shrink-0 mt-0.5" />
            <p className="text-xs text-[#4A4A4A] leading-relaxed">
              <span className="font-semibold text-[#2C3E50]">Composizione personalizzata</span>
              {' '}— realizzata in base all&apos;evento o alle tue preferenze. Contattaci con anticipo per concordare i dettagli.
            </p>
          </div>
        </div>

        {/* Contatti */}
        <div className="px-5 pb-6 space-y-3">
          <p className="text-xs text-[#9B9B9B] text-center font-medium">Contattaci per composizione e disponibilità</p>
          <a
            href="tel:+390342996131"
            className="flex items-center gap-4 p-4 rounded-2xl bg-[#F7F7F5] border border-[#EBEBEB] hover:bg-[#EBEBEB] transition-colors group"
          >
            <div className="p-2.5 rounded-xl bg-white shadow-sm border border-[#EBEBEB]">
              <Phone size={18} className="text-[#2C3E50]" />
            </div>
            <div>
              <p className="text-[11px] text-[#9B9B9B] font-medium uppercase tracking-wide">Telefono · Interno 9</p>
              <p className="text-[#2C3E50] font-semibold text-sm">+39 0342 996131</p>
            </div>
            <ChevronRight size={16} className="text-[#9B9B9B] ml-auto group-hover:translate-x-0.5 transition-transform" />
          </a>
          <a
            href="mailto:info@touringlivigno.com"
            className="flex items-center gap-4 p-4 rounded-2xl bg-[#F7F7F5] border border-[#EBEBEB] hover:bg-[#EBEBEB] transition-colors group"
          >
            <div className="p-2.5 rounded-xl bg-white shadow-sm border border-[#EBEBEB]">
              <Mail size={18} className="text-[#2C3E50]" />
            </div>
            <div>
              <p className="text-[11px] text-[#9B9B9B] font-medium uppercase tracking-wide">Email</p>
              <p className="text-[#2C3E50] font-semibold text-sm">info@touringlivigno.com</p>
            </div>
            <ChevronRight size={16} className="text-[#9B9B9B] ml-auto group-hover:translate-x-0.5 transition-transform" />
          </a>
        </div>
      </motion.div>
    </>
  );
}

/* ── Request Modal ──────────────────────────────────────────── */
function RequestModal({
  itemKey,
  onClose,
}: {
  itemKey: ItemKey;
  onClose: () => void;
}) {
  const t = useTranslations('personalizeStay');
  const [form, setForm] = useState<FormState>(EMPTY_FORM);
  const [errors, setErrors] = useState<Partial<FormState>>({});
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);
  const [sendError, setSendError] = useState(false);

  const item = ITEMS.find((i) => i.key === itemKey)!;

  const validate = () => {
    const errs: Partial<FormState> = {};
    if (!form.guestName.trim()) errs.guestName = t('required');
    if (itemKey !== 'cake' && !form.roomNumber.trim()) errs.roomNumber = t('required');
    if (itemKey === 'cake' && !form.preferredTime.trim()) errs.preferredTime = t('required');
    return errs;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }
    setSending(true);
    setSendError(false);
    try {
      await emailjs.send(
        'service_touring',
        'template_concierge',
        {
          request_type: t(`items.${itemKey}.name`),
          guest_name: form.guestName,
          room_number: form.roomNumber,
          preferred_time: form.preferredTime || '—',
          notes: form.notes || '—',
          to_email: 'info@touringlivigno.com',
        },
        { publicKey: 'Q6FmiWmoTO72Im-1Q' }
      );
      setSent(true);
      setTimeout(() => {
        setSent(false);
        setForm(EMPTY_FORM);
        onClose();
      }, 3200);
    } catch (err) {
      console.error('[EmailJS concierge]', err);
      setSendError(true);
    } finally {
      setSending(false);
    }
  };

  const update = (field: keyof FormState, value: string) => {
    setForm((p) => ({ ...p, [field]: value }));
    if (errors[field]) setErrors((p) => ({ ...p, [field]: undefined }));
  };

  return (
    <>
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
        onClick={() => !sent && onClose()}
      />

      {/* Sheet */}
      <motion.div
        initial={{ opacity: 0, y: '100%' }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: '100%' }}
        transition={{ type: 'spring', damping: 28, stiffness: 220 }}
        className="fixed bottom-0 left-0 right-0 z-50 bg-white rounded-t-3xl shadow-2xl max-h-[92vh] overflow-y-auto sm:max-w-lg sm:left-1/2 sm:-translate-x-1/2 sm:bottom-6 sm:rounded-2xl"
      >
        {sent ? (
          <motion.div
            initial={{ scale: 0.85, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="flex flex-col items-center py-14 px-8 text-center"
          >
            <div className="w-20 h-20 rounded-full bg-green-50 flex items-center justify-center mb-5">
              <CheckCircle2 size={40} className="text-green-500" />
            </div>
            <h3 className="font-serif text-2xl text-[#2C3E50] mb-2">
              {t('requestSent')}
            </h3>
            <p className="text-[#9B9B9B] text-sm leading-relaxed max-w-xs">
              {t('requestDesc')}
            </p>
          </motion.div>
        ) : (
          <div>
            {/* Modal header */}
            <div className="relative flex-shrink-0">
              <div className="h-36 overflow-hidden rounded-t-3xl sm:rounded-t-2xl">
                <img
                  src={item.imageBg}
                  alt={t(`items.${itemKey}.name`)}
                  className="w-full h-full object-cover"
                />
              </div>
              <button
                onClick={onClose}
                className="absolute top-3 right-3 p-2 rounded-full bg-white shadow-md hover:bg-[#F7F7F5] transition-colors"
              >
                <X size={15} className="text-[#2C3E50]" />
              </button>
              <div className="px-6 py-4 border-b border-[#EBEBEB]">
                {itemKey !== 'cake' && itemKey !== 'massage' && (
                  <span className="section-label">{t('formTitle')}</span>
                )}
                <h3 className="font-serif text-xl text-[#2C3E50] font-bold">
                  {t(`items.${itemKey}.name`)}
                </h3>
              </div>
            </div>

            {/* Subtitle + price strip */}
            <div className="flex items-center justify-between px-6 py-3 bg-[#F7F7F5] border-b border-[#EBEBEB]">
              <p className="text-xs text-[#9B9B9B]">{t('formSubtitle')}</p>
              <span className="text-[#2C3E50] font-bold text-sm">
                {t(`items.${itemKey}.price`)}
              </span>
            </div>

            {/* Contatti rapidi — massaggio */}
            {itemKey === 'massage' && (
              <div className="px-6 py-4 border-b border-[#EBEBEB] flex gap-2">
                <a
                  href="https://wa.me/393317713313"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-full bg-[#25D366] text-white text-xs font-semibold hover:bg-[#1ebe5d] transition-colors"
                >
                  <MessageCircle size={14} />
                  WhatsApp
                </a>
                <a
                  href="/brochure-massaggi.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-full bg-[#F7F7F5] border border-[#EBEBEB] text-[#2C3E50] text-xs font-semibold hover:bg-[#EBEBEB] transition-colors"
                >
                  <Download size={14} />
                  Brochure
                </a>
              </div>
            )}

            {/* Contatti rapidi — solo per torta */}
            {itemKey === 'cake' && (
              <div className="px-6 py-4 border-b border-[#EBEBEB] flex gap-2">
                <a
                  href="https://wa.me/393317713313"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-full bg-[#25D366] text-white text-xs font-semibold hover:bg-[#1ebe5d] transition-colors"
                >
                  <MessageCircle size={14} />
                  WhatsApp
                </a>
                <a
                  href="mailto:info@touringlivigno.com"
                  className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-full border-2 border-[#2C3E50] text-[#2C3E50] text-xs font-semibold hover:bg-[#2C3E50] hover:text-white transition-colors"
                >
                  <Mail size={14} />
                  Email
                </a>
              </div>
            )}

            {/* Carta dei vini — solo per vino */}
            {itemKey === 'wine' && (
              <div className="px-6 py-4 border-b border-[#EBEBEB]">
                <a
                  href="/carta-dei-vini.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-2 py-2.5 rounded-full bg-[#F7F7F5] border border-[#EBEBEB] text-[#2C3E50] text-xs font-semibold hover:bg-[#EBEBEB] transition-colors"
                >
                  <Download size={14} />
                  Scarica Carta dei Vini
                </a>
              </div>
            )}

            {/* Form */}
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-xs font-medium text-[#4A4A4A] mb-1.5">
                  {t('guestName')} <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  value={form.guestName}
                  onChange={(e) => update('guestName', e.target.value)}
                  placeholder={t('guestNamePlaceholder')}
                  className={cn(
                    'w-full px-4 py-2.5 rounded-xl border text-sm outline-none transition-colors',
                    errors.guestName
                      ? 'border-rose-400 bg-rose-50 focus:border-rose-500'
                      : 'border-[#EBEBEB] focus:border-[#2C3E50] bg-white'
                  )}
                />
                {errors.guestName && (
                  <p className="text-xs text-rose-500 mt-1">{errors.guestName}</p>
                )}
              </div>

              {itemKey === 'cake' ? (
                /* Torta: data consegna torta */
                <div>
                  <label className="block text-xs font-medium text-[#4A4A4A] mb-1.5">
                    <span className="flex items-center gap-1">
                      <Calendar size={11} />
                      Data della torta <span className="text-rose-500">*</span>
                    </span>
                  </label>
                  <input
                    type="date"
                    value={form.preferredTime}
                    onChange={(e) => update('preferredTime', e.target.value)}
                    min={new Date().toISOString().split('T')[0]}
                    className={cn(
                      'w-full px-4 py-2.5 rounded-xl border text-sm outline-none transition-colors',
                      errors.preferredTime
                        ? 'border-rose-400 bg-rose-50'
                        : 'border-[#EBEBEB] focus:border-[#2C3E50] bg-white'
                    )}
                  />
                  {errors.preferredTime && (
                    <p className="text-xs text-rose-500 mt-1">{errors.preferredTime}</p>
                  )}
                </div>
              ) : (
                /* Altri item: camera + orario */
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-medium text-[#4A4A4A] mb-1.5">
                      {t('roomNumber')} <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="text"
                      inputMode="numeric"
                      value={form.roomNumber}
                      onChange={(e) => update('roomNumber', e.target.value)}
                      placeholder={t('roomNumberPlaceholder')}
                      className={cn(
                        'w-full px-4 py-2.5 rounded-xl border text-sm outline-none transition-colors',
                        errors.roomNumber
                          ? 'border-rose-400 bg-rose-50'
                          : 'border-[#EBEBEB] focus:border-[#2C3E50] bg-white'
                      )}
                    />
                    {errors.roomNumber && (
                      <p className="text-xs text-rose-500 mt-1">{errors.roomNumber}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-[#4A4A4A] mb-1.5">
                      <span className="flex items-center gap-1">
                        <Clock size={11} />
                        {t('preferredTime')}
                      </span>
                    </label>
                    <input
                      type="text"
                      value={form.preferredTime}
                      onChange={(e) => update('preferredTime', e.target.value)}
                      placeholder={t('preferredTimePlaceholder')}
                      className="w-full px-4 py-2.5 rounded-xl border border-[#EBEBEB] focus:border-[#2C3E50] bg-white text-sm outline-none transition-colors"
                    />
                  </div>
                </div>
              )}

              {itemKey === 'massage' ? (
                <div>
                  <label className="block text-xs font-medium text-[#4A4A4A] mb-1.5">
                    Quale massaggio preferisci?
                  </label>
                  <input
                    type="text"
                    value={form.notes}
                    onChange={(e) => update('notes', e.target.value)}
                    placeholder="Es. Rilassante, Hot Stone, Parziale…"
                    className="w-full px-4 py-2.5 rounded-xl border border-[#EBEBEB] focus:border-[#2C3E50] bg-white text-sm outline-none transition-colors"
                  />
                </div>
              ) : (
                <div>
                  <label className="block text-xs font-medium text-[#4A4A4A] mb-1.5">
                    {t('notes')}
                  </label>
                  <textarea
                    rows={3}
                    value={form.notes}
                    onChange={(e) => update('notes', e.target.value)}
                    placeholder={t('notesPlaceholder')}
                    className="w-full px-4 py-2.5 rounded-xl border border-[#EBEBEB] focus:border-[#2C3E50] bg-white text-sm outline-none transition-colors resize-none"
                  />
                </div>
              )}

              {sendError && (
                <p className="text-xs text-rose-500 text-center bg-rose-50 rounded-xl py-2 px-4">
                  {t('sendError')}
                </p>
              )}
              <button
                type="submit"
                disabled={sending}
                className="w-full flex items-center justify-center gap-2 py-3.5 bg-[#2C3E50] hover:bg-[#1a252f] disabled:opacity-60 text-white rounded-full font-medium text-sm transition-colors"
              >
                {sending ? <Loader2 size={15} className="animate-spin" /> : <Send size={15} />}
                {sending ? t('sending') : t('sendRequest')}
              </button>
            </form>
          </div>
        )}
      </motion.div>
    </>
  );
}

/* ── Item Card ──────────────────────────────────────────────── */
function ItemCard({
  def,
  onRequest,
}: {
  def: typeof ITEMS[number];
  onRequest: (key: ItemKey) => void;
}) {
  const t = useTranslations('personalizeStay');

  return (
    <motion.div
      whileHover={{ scale: 1.02, boxShadow: '0 16px 48px rgba(0,0,0,0.10)' }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
      className="bg-white rounded-3xl border border-[#EBEBEB] overflow-hidden flex flex-col group cursor-pointer shadow-sm"
      onClick={() => onRequest(def.key)}
    >
      {/* Image — clean, no overlay */}
      <div className="relative overflow-hidden" style={{ aspectRatio: '4/5' }}>
        <img
          src={def.imageBg}
          alt={t(`items.${def.key}.name`)}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        {/* Badge — top left */}
        <div className="absolute top-3 left-3">
          <span className="inline-flex items-center gap-1 bg-white/90 text-[#2C3E50] rounded-full px-2.5 py-1 text-[10px] font-semibold backdrop-blur-sm">
            <Tag size={9} />
            {t(`items.${def.key}.badge`)}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-col gap-3 p-5 flex-1">
        <div>
          <h3 className="font-semibold text-[#2C3E50] text-sm leading-snug">
            {t(`items.${def.key}.name`)}
          </h3>
          <p className="text-xs text-[#9B9B9B] mt-1 leading-relaxed">
            {t(`items.${def.key}.desc`)}
          </p>
        </div>

        <div className="flex items-center justify-between mt-auto pt-3 border-t border-[#EBEBEB]">
          <span className="text-[#2C3E50] font-bold text-sm">
            {t(`items.${def.key}.price`)}
          </span>
          <button
            onClick={(e) => { e.stopPropagation(); onRequest(def.key); }}
            className="flex items-center gap-1 px-4 py-2 rounded-full bg-[#2C3E50] text-white text-xs font-medium hover:bg-[#1a252f] transition-colors"
          >
            {def.key === 'massage' || def.key === 'cake' ? 'Prenota ora' : t('requestToRoom')}
            <ChevronRight size={12} />
          </button>
        </div>
      </div>
    </motion.div>
  );
}

/* ── Section ────────────────────────────────────────────────── */
const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.05 } },
};

const itemVar = {
  hidden:  { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export function PersonalizeStaySection() {
  const t = useTranslations('personalizeStay');
  const [activeModal, setActiveModal] = useState<ItemKey | null>(null);

  return (
    <SectionWrapper id="personalize-stay" className="bg-white">
      <SectionHeader title={t('title')} subtitle={t('subtitle')} />

      <motion.div
        variants={container}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-60px' }}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
      >
        {ITEMS.map((def) => (
          <motion.div key={def.key} variants={itemVar}>
            <ItemCard def={def} onRequest={setActiveModal} />
          </motion.div>
        ))}
      </motion.div>

      <AnimatePresence>
        {activeModal === 'flowers' && (
          <FlowersContactModal onClose={() => setActiveModal(null)} />
        )}
        {activeModal && activeModal !== 'flowers' && (
          <RequestModal
            itemKey={activeModal}
            onClose={() => setActiveModal(null)}
          />
        )}
      </AnimatePresence>
    </SectionWrapper>
  );
}
