'use client';

import { motion } from 'framer-motion';
import { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ServiceCardProps {
  icon: LucideIcon;
  name: string;
  hours: string;
  desc: string;
  accent?: string;
  className?: string;
  children?: React.ReactNode;
}

export function ServiceCard({
  icon: Icon,
  name,
  hours,
  desc,
  accent = 'bg-alpine-wood/10 text-alpine-wood',
  className,
  children,
}: ServiceCardProps) {
  return (
    <motion.div
      whileHover={{ y: -3 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      className={cn('alpine-card p-5 flex flex-col gap-3', className)}
    >
      <div className="flex items-start gap-3">
        <div className={cn('p-2.5 rounded-xl flex-shrink-0', accent)}>
          <Icon size={20} />
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-alpine-charcoal text-sm">{name}</h3>
          <p className="text-xs text-alpine-wood font-medium mt-0.5">{hours}</p>
        </div>
      </div>
      <p className="text-xs text-alpine-slate leading-relaxed">{desc}</p>
      {children}
    </motion.div>
  );
}
