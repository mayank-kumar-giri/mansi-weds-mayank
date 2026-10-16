'use client'

import { motion } from 'framer-motion'
import { Countdown } from '@/components/countdown'
import { GaneshEmblem } from '@/components/indian-ornaments'
import { BASE_PATH } from '@/lib/base-path'
import { IS_RECEPTION, RECEPTION, WEDDING } from '@/lib/wedding'

/**
 * Shared invitation content. All sizes are in `em`, relative to the font-size
 * set on the overlay wrapper. Each overlay below sets that base in `cqw`
 * (container-relative), so the whole block scales with its background's arch
 * and can be tuned bigger/smaller per layout by changing one number.
 */
function HeroContent() {
  return (
    <>
      {/* Ganesh + mantra — mantra kept in Devanagari, never translated */}
      <motion.div
        className="flex flex-col items-center"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
      >
        <GaneshEmblem className="h-[2em] w-[2em] object-contain" />
        <p lang="hi" className="font-hindi mt-[0.3em] text-[0.42em] tracking-[0.08em] text-[#a96949]">
          ॥ श्री गणेशाय नमः ॥
        </p>
      </motion.div>

      {/* Together with our families + invite line */}
      <motion.div
        className="mt-[0.2em] flex flex-col items-center gap-[0.04em] min-[900px]:mt-[0.9em] min-[900px]:gap-[0.12em]"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.1 }}
      >
        <p className="font-serif text-[#a96949] text-[0.92em] leading-tight min-[900px]:text-[1.1em]">
          Together with our families
        </p>
        <p className="font-serif text-cream text-[0.56em] leading-tight">
          we cordially invite you to the wedding of
        </p>
      </motion.div>

      {/* Names - stacked vertically on mobile, inline (with &) on desktop */}
      <motion.h1
        className="font-serif mt-[0.3em] flex w-full flex-col items-center leading-none text-cream min-[900px]:mt-[1em] min-[900px]:flex-row min-[900px]:items-baseline min-[900px]:justify-center min-[900px]:whitespace-nowrap"
        initial={{ opacity: 0, y: 28 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
      >
        <span className="text-champagne text-[1.62em] min-[900px]:flex-1 min-[900px]:basis-0 min-[900px]:pr-[0.4em] min-[900px]:text-right">{WEDDING.couple[0]}</span>
        <span className="text-champagne/90 text-[0.7em] leading-tight min-[900px]:shrink-0 min-[900px]:text-[0.9em]">&amp;</span>
        <span className="text-champagne text-[1.62em] min-[900px]:flex-1 min-[900px]:basis-0 min-[900px]:pl-[0.4em] min-[900px]:text-left">{WEDDING.couple[1]}</span>
      </motion.h1>

      {/* Date - wedding day only (nudged down slightly on mobile for breathing room) */}
      <motion.div
        className="mt-[0.75em] flex flex-col items-center min-[900px]:mt-[0.6em]"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.4 }}
      >
        <p className="font-serif text-champagne text-[0.78em] tracking-wide">
          December 12, 2026
        </p>
      </motion.div>

      {/* Sender */}
      <motion.div
        className="mt-[0.8em] flex flex-col items-center gap-[0.02em] min-[900px]:gap-[0.08em]"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.5 }}
      >
        <p className="font-serif text-[0.56em] font-medium text-[#a96949]">With love from</p>
        <p className="font-serif text-cream text-[0.6em]">Shivrani Devi &amp; Braham Dutt Sharma</p>
        <p className="font-serif text-cream text-[0.6em]">Shelly &amp; Jeewan Sharma</p>
      </motion.div>

      {/* Countdown */}
      <motion.div
        className="mt-[0.85em] min-[900px]:mt-[1.5em]"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, delay: 0.7 }}
      >
        <Countdown target={IS_RECEPTION ? RECEPTION.date : WEDDING.date} />
      </motion.div>
    </>
  )
}

export function Hero() {
  return (
    <section className="hero-invitation relative w-full bg-[#f8f0dd]">
      {/* ---------- Phone / portrait ---------- */}
      <div className="relative mx-auto block w-full max-w-[560px] min-[900px]:hidden">
        <img
          src={`${BASE_PATH}/indian-wedding-hero-centered.png`}
          alt=""
          aria-hidden="true"
          className="block h-auto w-full select-none"
        />
        {/* content overlay establishes its own container; base font-size (cqw) scales the whole block */}
        <div className="absolute left-1/2 top-[11%] z-10 flex w-[80%] -translate-x-1/2 flex-col items-center text-center text-[6.4cqw] [container-type:inline-size]">
          <HeroContent />
        </div>
      </div>

      {/* ---------- Desktop / landscape ---------- */}
      <div className="relative mx-auto hidden w-full min-[900px]:block">
        <img
          src={`${BASE_PATH}/indian-wedding-hero-desktop-botanical.png`}
          alt=""
          aria-hidden="true"
          className="block h-auto w-full select-none"
        />
        {/* desktop arch is centred and narrower; container width tuned to it.
            Widened from 30% to fit longer English names/address (was sized
            for short Devanagari text). */}
        <div className="absolute left-1/2 top-[6%] z-10 flex w-[42%] -translate-x-1/2 flex-col items-center text-center text-[2.1cqw] [container-type:inline-size]">
          <HeroContent />
        </div>
      </div>
    </section>
  )
}
