import { motion } from 'framer-motion';
import type { ReactNode } from 'react';

type RevealProps = {
  children: ReactNode;
  /** delay in seconds */
  delay?: number;
  /** travel distance in px */
  y?: number;
  className?: string;
  as?: 'div' | 'li' | 'span';
};

/**
 * Scroll-triggered entrance. Respects prefers-reduced-motion automatically
 * (framer-motion reads the media query and skips transforms).
 */
export default function Reveal({ children, delay = 0, y = 24, className, as = 'div' }: RevealProps) {
  const MotionTag = motion[as] as typeof motion.div;
  return (
    <MotionTag
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '0px 0px -12% 0px' }}
      transition={{ duration: 0.7, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      {children}
    </MotionTag>
  );
}
