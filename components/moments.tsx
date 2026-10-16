'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { MOMENTS, type Moment } from '@/lib/wedding'
import { Reveal } from '@/components/reveal'
import { BASE_PATH } from '@/lib/base-path'

export function Moments({ moments = MOMENTS }: { moments?: Moment[] }) {
  return (
    <section id="moments" className="wedding-section section-rose relative px-2.5 py-10 sm:px-6 sm:py-20">
      <div className="invitation-page-panel mx-auto max-w-6xl">
        <Reveal className="flex flex-col items-center gap-[15px] text-center">
          <Image
            src={`${BASE_PATH}/moments.png?v=2`}
            alt="A Glimpse of Our Moments"
            width={320}
            height={320}
            className="mx-auto h-36 w-auto object-contain sm:h-[10.8rem]"
            priority={false}
          />
          <h2 className="font-serif text-4xl font-light text-champagne sm:text-5xl">
            A Glimpse of Our Moments
          </h2>
        </Reveal>

        <div className="mt-10 grid auto-rows-[210px] grid-cols-2 gap-2.5 sm:mt-14 sm:auto-rows-[260px] sm:gap-4 lg:grid-cols-3">
          {moments.map((m, i) => (
            <Reveal
              key={m.src}
              delay={(i % 3) * 0.08}
              className={[
                'group relative overflow-hidden rounded-[2rem] border border-[#a96949]/20 bg-[#efe5d2] p-1 shadow-[0_18px_45px_rgba(95,68,50,0.12)]',
                m.span === 'row' ? 'row-span-2' : '',
                m.span === 'col' ? 'sm:col-span-2' : '',
              ].join(' ')}
            >
              <motion.img
                src={m.src}
                alt={m.alt}
                loading="lazy"
                className="h-full w-full rounded-[1.7rem] object-cover"
                whileHover={{ scale: 1.06 }}
                transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
              />
              {/* Live-photo style shimmer + vignette on hover */}
              <div className="pointer-events-none absolute inset-1 rounded-[1.7rem] bg-gradient-to-t from-[#26301f]/65 via-transparent to-transparent opacity-65 transition-opacity duration-500 group-hover:opacity-85" />
              <motion.div
                className="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-inset ring-champagne/0 group-hover:ring-champagne/30"
                aria-hidden="true"
              />
              <div className="absolute left-4 top-4 flex items-center gap-1.5 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                <span className="relative flex size-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-champagne/70" />
                  <span className="relative inline-flex size-2 rounded-full bg-champagne" />
                </span>
                <span className="text-[10px] font-medium uppercase tracking-[0.25em] text-white/85">
                  Live
                </span>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
