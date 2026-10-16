'use client'

import { motion } from 'framer-motion'
import type { ReactNode } from 'react'

export function Reveal({
  children,
  delay = 0,
  y = 24,
  className,
}: {
  children: ReactNode
  delay?: number
  y?: number
  className?: string
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  )
}

export function SectionHeading({
  eyebrow,
  title,
  className,
  align = 'start',
}: {
  eyebrow: string
  title: string
  className?: string
  align?: 'start' | 'center'
}) {
  const centered = align === 'center'
  return (
    <div className={`section-heading relative ${centered ? 'mx-auto text-center' : ''} ${className ?? ''}`}>
      <span className="mandala-watermark" aria-hidden="true" />
      <Reveal>
        <p className="text-champagne/80 text-xs font-medium uppercase tracking-[0.35em]">
          {eyebrow}
        </p>
      </Reveal>
      <Reveal delay={0.08}>
        <h2 className="font-serif mt-4 text-balance text-4xl font-light leading-[1.05] text-champagne sm:text-5xl md:text-6xl">
          {title}
        </h2>
      </Reveal>
      <Reveal delay={0.14}>
        <div
          className={`mt-5 flex w-36 items-center gap-3 text-champagne/70 ${centered ? 'mx-auto' : 'mx-auto sm:mx-0'}`}
          aria-hidden="true"
        >
          <span className="h-px flex-1 bg-gradient-to-r from-transparent to-champagne/70" />
          <span className="font-serif text-lg leading-none">❦</span>
          <span className="h-px flex-1 bg-gradient-to-l from-transparent to-champagne/70" />
        </div>
      </Reveal>
    </div>
  )
}
