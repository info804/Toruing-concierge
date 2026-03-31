'use client';

import { motion } from 'framer-motion';
import { Award, Star, Mountain, Clock } from 'lucide-react';

const STATS = [
  { icon: Award,    value: '15+',   label: 'Anni di ospitalità' },
  { icon: Star,     value: '4.9★',  label: 'Rating medio ospiti' },
  { icon: Mountain, value: '1816m', label: 'Altitudine Livigno' },
  { icon: Clock,    value: '12h',   label: 'Servizio concierge' },
];

export function StatsSection() {
  return (
    <section className="bg-white border-y border-[#EBEBEB]">
      <div className="container-max px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-2 lg:grid-cols-4 divide-x divide-[#EBEBEB]"
        >
          {STATS.map(({ icon: Icon, value, label }, i) => (
            <motion.div
              key={label}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="flex flex-col items-center gap-2 py-8 px-4"
            >
              <Icon size={18} strokeWidth={1.5} className="text-[#8B9EB7]" />
              <p className="font-sans font-extrabold text-[#2C3E50] leading-none tabular-nums"
                style={{ fontSize: 'clamp(1.75rem, 4vw, 2.25rem)' }}>
                {value}
              </p>
              <p className="text-[#9B9B9B] text-xs uppercase tracking-widest text-center leading-snug">
                {label}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
