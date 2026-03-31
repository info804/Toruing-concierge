'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { cn } from '@/lib/utils';

interface SectionWrapperProps {
  id: string;
  className?: string;
  children: React.ReactNode;
  dark?: boolean;
}

export function SectionWrapper({ id, className, children, dark }: SectionWrapperProps) {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section
      id={id}
      ref={ref}
      className={cn(
        'section-padding',
        dark ? 'bg-alpine-charcoal' : 'bg-alpine-white',
        className
      )}
    >
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="container-max"
      >
        {children}
      </motion.div>
    </section>
  );
}

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  dark?: boolean;
  center?: boolean;
}

export function SectionHeader({ title, subtitle, dark, center }: SectionHeaderProps) {
  return (
    <div className={cn('mb-12 lg:mb-16', center && 'text-center')}>
      <h2 className={cn('section-title', dark ? 'text-white' : 'text-alpine-charcoal')}>
        {title}
      </h2>
      {/* Thin decorative rule */}
      <div className={cn('mt-4 h-px w-12', center && 'mx-auto', dark ? 'bg-alpine-gold/60' : 'bg-alpine-wood/40')} />
      {subtitle && (
        <p className={cn('section-subtitle', dark ? 'text-white/60' : 'text-alpine-slate', center && 'mx-auto')}>
          {subtitle}
        </p>
      )}
    </div>
  );
}
