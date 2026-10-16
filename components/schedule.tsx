'use client'

import { AnimatePresence, motion } from 'framer-motion'
import {
  Apple,
  CalendarPlus,
  ChevronDown,
  Clock,
  Flower2,
  Gem,
  HeartHandshake,
  MapPin,
  Music2,
  Sparkles,
} from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { googleCalendarUrl, icsDataUri } from '@/lib/calendar'
import { BASE_PATH } from '@/lib/base-path'
import { IS_RECEPTION, RECEPTION, RECEPTION_SCHEDULE, SCHEDULE, WEDDING, type ScheduleItem } from '@/lib/wedding'
import { Reveal } from '@/components/reveal'

function EventIcon({ kind }: { kind: ScheduleItem['kind'] }) {
  const Icon =
    kind === 'haldi' || kind === 'mehndi'
      ? Flower2
      : kind === 'puja' || kind === 'tilak'
        ? Gem
        : kind === 'sangeet'
          ? Music2
          : kind === 'vivah' || kind === 'baraat'
            ? HeartHandshake
            : Sparkles

  return <Icon className="size-5" aria-hidden="true" />
}

function eventColorClass(kind: ScheduleItem['kind']) {
  if (kind === 'mehndi') return 'event-mehndi'
  if (kind === 'haldi' || kind === 'bhoj') return 'event-haldi'
  if (kind === 'puja' || kind === 'tilak') return 'event-engagement'
  if (kind === 'sangeet') return 'event-sangeet'
  if (kind === 'vivah' || kind === 'baraat') return 'event-wedding'
  return 'event-reception'
}

function AddToCalendar({ item }: { item: ScheduleItem }) {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function onClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('mousedown', onClick)
    return () => document.removeEventListener('mousedown', onClick)
  }, [])

  const cal = {
    title: `${item.title} - ${WEDDING.coupleHi[0]} & ${WEDDING.coupleHi[1]}`,
    description: [item.description, item.note].filter(Boolean).join('\n\n'),
    location:
      item.calendarLocation ??
      (IS_RECEPTION
        ? `${RECEPTION.venue}, ${RECEPTION.venueAddress}`
        : `${WEDDING.venue}, ${WEDDING.venueAddress}`),
    start: item.start,
    durationMinutes: item.durationMinutes,
  }

  return (
    <div className="relative" ref={ref}>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        className="flex items-center gap-1.5 rounded-full border border-cream/15 bg-cream/5 px-3.5 py-1.5 text-xs font-medium text-cream/80 transition-colors hover:border-champagne/40 hover:text-cream"
      >
        <CalendarPlus className="size-3.5 text-champagne" aria-hidden="true" />
        Add to calendar
        <ChevronDown
          className={`size-3.5 transition-transform ${open ? 'rotate-180' : ''}`}
          aria-hidden="true"
        />
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -6, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.98 }}
            transition={{ duration: 0.18 }}
            className="glass absolute right-0 z-20 mt-2 w-44 overflow-hidden rounded-xl p-1"
          >
            <a
              href={googleCalendarUrl(cal)}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 rounded-lg px-3 py-2 text-xs text-cream/85 transition-colors hover:bg-cream/10"
            >
              <CalendarPlus className="size-3.5" aria-hidden="true" /> Google Calendar
            </a>
            <a
              href={icsDataUri(cal)}
              download={`${item.title.replace(/\s+/g, '-').toLowerCase()}.ics`}
              className="flex items-center gap-2 rounded-lg px-3 py-2 text-xs text-cream/85 transition-colors hover:bg-cream/10"
            >
              <Apple className="size-3.5" aria-hidden="true" /> Apple / iCal
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

function DayTimeline({ events, centered = false }: { events: ScheduleItem[]; centered?: boolean }) {
  return (
    <div className={`relative mt-10 ${centered ? 'mx-auto max-w-md' : ''}`}>
      {!centered && (
        <div
          className="absolute bottom-0 left-[7px] top-2 w-px bg-gradient-to-b from-champagne/60 via-cream/15 to-transparent sm:left-1/2"
          aria-hidden="true"
        />
      )}

      <ol className="space-y-8">
        {events.map((item, i) => {
          const end = !centered && i % 2 === 0

          return (
          <li
            key={item.title}
            className="relative"
            style={{ zIndex: events.length - i }}
          >
            <Reveal delay={(i % 2) * 0.05}>
              <div className={centered ? 'text-center' : 'relative pl-8 sm:grid sm:grid-cols-2 sm:gap-10 sm:pl-0'}>
                {!centered && (
                  <span
                    className="absolute left-0 top-2 size-3.5 rounded-full border border-champagne bg-[#f7f0e2] sm:left-1/2 sm:-translate-x-1/2"
                    aria-hidden="true"
                  >
                    <span className="absolute inset-0.5 rounded-full bg-champagne" />
                  </span>
                )}

                <div className={centered ? '' : end ? 'sm:col-start-1 sm:text-right' : 'sm:col-start-2'}>
                  <div className={`event-card glass rounded-2xl p-4 ${eventColorClass(item.kind)}`}>
                    <div className={`mb-2.5 flex ${centered ? 'justify-center' : end ? 'sm:justify-end' : ''}`}>
                      <span className="event-icon flex size-9 items-center justify-center rounded-full border">
                        <EventIcon kind={item.kind} />
                      </span>
                    </div>
                    <div
                      className={`event-time flex items-center gap-2 ${centered ? 'justify-center' : end ? 'sm:justify-end' : ''}`}
                    >
                      <Clock className="size-3.5" aria-hidden="true" />
                      <span className="text-base font-medium">
                        {item.time}
                      </span>
                    </div>
                    <h3 className="event-title font-serif mt-1.5 text-[2.1375rem] font-normal leading-[1.05] sm:text-[2.85rem]">
                      {item.title}
                    </h3>
                    {item.mapsUrl && (
                      <div className={`mt-2.5 flex ${centered ? 'justify-center' : end ? 'sm:justify-end' : ''}`}>
                        <a
                          href={item.mapsUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={`inline-flex items-start gap-1.5 text-xs font-medium text-champagne/90 underline-offset-4 hover:underline ${centered ? 'text-center' : end ? 'sm:text-right' : ''}`}
                        >
                          <MapPin className="mt-0.5 size-3.5 shrink-0" aria-hidden="true" />
                          <span>{item.address}</span>
                        </a>
                      </div>
                    )}
                    <div className={`mt-3 flex ${centered ? 'justify-center' : end ? 'sm:justify-end' : ''}`}>
                      <AddToCalendar item={item} />
                    </div>
                  </div>
                </div>

                {!centered && item.art && (
                  <div
                    className={`relative hidden sm:block sm:row-start-1 ${end ? 'sm:col-start-2' : 'sm:col-start-1'}`}
                  >
                    <img
                      src={`${BASE_PATH}/event-art/${item.art}`}
                      alt=""
                      aria-hidden="true"
                      className="absolute inset-0 h-full w-full select-none object-contain"
                    />
                  </div>
                )}
              </div>
            </Reveal>
          </li>
          )
        })}
      </ol>
    </div>
  )
}

export function Schedule() {
  const days = IS_RECEPTION ? RECEPTION_SCHEDULE : SCHEDULE

  return (
    <section id="schedule" className="wedding-section section-saffron relative px-2.5 py-10 sm:px-6 sm:py-20">
      <div className="invitation-page-panel mx-auto max-w-4xl">
        <div className="mt-2 space-y-16">
          {days.map((day) => {
            return (
              <div key={day.label}>
                {day.separated && (
                  <div className="mb-16 flex items-center gap-4" aria-hidden="true">
                    <span className="h-px flex-1 bg-gradient-to-r from-transparent to-champagne/55" />
                    <span className="font-serif text-lg leading-none text-champagne/80">❦</span>
                    <span className="h-px flex-1 bg-gradient-to-l from-transparent to-champagne/55" />
                  </div>
                )}
                <Reveal>
                  <div className="flex flex-col items-center text-center">
                    <h2 className="font-serif text-4xl font-medium text-champagne sm:text-5xl">
                      {day.dateLabel}
                    </h2>
                    <span
                      className="mt-4 h-px w-16 bg-gradient-to-r from-transparent via-champagne/60 to-transparent"
                      aria-hidden="true"
                    />
                  </div>
                </Reveal>
                <DayTimeline events={day.events} centered={day.separated || IS_RECEPTION} />
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
