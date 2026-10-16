'use client'

import { AnimatePresence, motion } from 'framer-motion'
import Image from 'next/image'
import { Check, PartyPopper } from 'lucide-react'
import { useState } from 'react'
import { Reveal } from '@/components/reveal'
import { BASE_PATH } from '@/lib/base-path'
import { IS_RECEPTION } from '@/lib/wedding'

type Attendance = 'yes' | 'no'

// Function labels are day-wise, worded to match the event cards above. The
// submitted values go to the bride-side Google Form (GOOGLE_FORM_URL /
// FORM_ENTRY below) and MUST match the form's option strings exactly.
const FUNCTIONS = [
  '9th December - Sundar Kaand & Kirtan',
  '10th December - Mehndi, Jaaggo',
  '11th December - Neg Tilak, Haldi and Pool Party, Engagement and Sangeet',
  '12th December - Baraat Swagat, Varmala and Reception, Panigrahan',
  'All of the above',
] as const
type FunctionAttending = (typeof FUNCTIONS)[number]

// "All of the above" is a convenience toggle: selecting it checks every day,
// clearing it unchecks everything. DAY_FUNCTIONS is the non-"all" subset.
const ALL_IN: FunctionAttending = 'All of the above'
const DAY_FUNCTIONS = FUNCTIONS.filter((f) => f !== ALL_IN) as FunctionAttending[]

const FUNCTION_LABELS: Record<FunctionAttending, string> = {
  '9th December - Sundar Kaand & Kirtan':
    '9th December - Sundar Kaand & Kirtan',
  '10th December - Mehndi, Jaaggo':
    '10th December - Mehndi, Jaaggo',
  '11th December - Neg Tilak, Haldi and Pool Party, Engagement and Sangeet':
    '11th December - Neg Tilak, Haldi and Pool Party, Engagement and Sangeet',
  '12th December - Baraat Swagat, Varmala and Reception, Panigrahan':
    '12th December - Baraat Swagat, Varmala and Reception, Panigrahan',
  'All of the above': 'All In',
}

// Bride-side (temp-site-d) Google Form.
// Form: https://docs.google.com/forms/d/e/1FAIpQLSfdNf8ftX-aZV8z0AQ-EskoBtYk9w2UVRo5GYluSifp1AXshA/viewform
const GOOGLE_FORM_URL =
  'https://docs.google.com/forms/d/e/1FAIpQLSfdNf8ftX-aZV8z0AQ-EskoBtYk9w2UVRo5GYluSifp1AXshA/formResponse'

const FORM_ENTRY = {
  name: 'entry.1282806896',
  phone: 'entry.1866479434',
  attendance: 'entry.965839261',
  functions: 'entry.1240637949',
  guests: 'entry.1560098025',
  arrivalDate: 'entry.1192382213',
  arrivalTime: 'entry.842852896',
} as const

const ATTENDANCE_YES = 'Of course! 😎'
const ATTENDANCE_NO = "Can't make it unfortunately ☹️"

const inputClass =
  'w-full rounded-xl border border-cream/15 bg-cream/5 px-4 py-3 text-sm text-cream placeholder:text-cream/35 outline-none transition-colors focus:border-champagne/60 focus:bg-cream/10'
const labelClass =
  'mb-2 block font-serif text-sm font-bold tracking-[0.04em] text-cream'

const CONFETTI = [
  ['8%', '#f6b934', '0s'],
  ['15%', '#d96b5f', '0.12s'],
  ['23%', '#91a86b', '0.24s'],
  ['32%', '#d786a8', '0.08s'],
  ['41%', '#f6b934', '0.32s'],
  ['50%', '#9b79c6', '0.16s'],
  ['59%', '#91a86b', '0.28s'],
  ['68%', '#d96b5f', '0.04s'],
  ['77%', '#e4c692', '0.2s'],
  ['86%', '#d786a8', '0.36s'],
  ['93%', '#f6b934', '0.1s'],
] as const

function CelebrationConfetti() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      {CONFETTI.map(([left, color, delay], index) => (
        <span
          key={index}
          className="confetti-piece"
          style={{ left, backgroundColor: color, animationDelay: delay }}
        />
      ))}
    </div>
  )
}

export function Rsvp() {
  const [submitted, setSubmitted] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')
  const [attendance, setAttendance] = useState<Attendance>('yes')
  const [functions, setFunctions] = useState<Set<FunctionAttending>>(new Set(FUNCTIONS))
  const [guests, setGuests] = useState(1)

  function toggleFunction(option: FunctionAttending) {
    setFunctions((prev) => {
      // "All of the above" selects every function; unchecking it clears all.
      if (option === ALL_IN) {
        return prev.has(ALL_IN) ? new Set() : new Set(FUNCTIONS)
      }
      // Toggling an individual day: flip it, and keep the ALL_IN flag in sync
      // (set only when every day is selected, cleared otherwise).
      const next = new Set(prev)
      if (next.has(option)) next.delete(option)
      else next.add(option)
      if (DAY_FUNCTIONS.every((d) => next.has(d))) next.add(ALL_IN)
      else next.delete(ALL_IN)
      return next
    })
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setError('')

    const formData = new FormData(e.currentTarget)

    // Validation: when attending, functions + arrival date & time are required.
    // (Name and phone are enforced natively via the `required` attribute.)
    if (attendance === 'yes') {
      if (functions.size === 0) {
        setError('Please select at least one function you will attend.')
        return
      }
      if (!String(formData.get('arrivalDate') ?? '').trim()) {
        setError('Please choose your arrival date.')
        return
      }
      if (!String(formData.get('arrivalTime') ?? '').trim()) {
        setError('Please choose your arrival time.')
        return
      }
    }

    setSubmitting(true)

    try {
      const googleFormData = new URLSearchParams()
      googleFormData.set(FORM_ENTRY.name, String(formData.get('name')))
      googleFormData.set(FORM_ENTRY.phone, String(formData.get('phone')))
      googleFormData.set(FORM_ENTRY.attendance, attendance === 'yes' ? ATTENDANCE_YES : ATTENDANCE_NO)
      googleFormData.set('fvv', '1')
      googleFormData.set('pageHistory', '0')

      if (attendance === 'yes') {
        // Checkbox field: append one param per selected value.
        for (const fn of functions) {
          googleFormData.append(FORM_ENTRY.functions, fn)
        }
        googleFormData.set(FORM_ENTRY.guests, guests === 2 ? 'Me and my family' : 'Just me')

        const arrivalDate = String(formData.get('arrivalDate'))
        const dateParts = arrivalDate.match(/^(\d{4})-(\d{2})-(\d{2})$/)
        if (dateParts) {
          const [, year, month, day] = dateParts
          googleFormData.set(`${FORM_ENTRY.arrivalDate}_year`, year)
          googleFormData.set(`${FORM_ENTRY.arrivalDate}_month`, String(Number(month)))
          googleFormData.set(`${FORM_ENTRY.arrivalDate}_day`, String(Number(day)))
        }

        const arrivalTime = String(formData.get('arrivalTime') ?? '')
        const timeParts = arrivalTime.match(/^(\d{2}):(\d{2})$/)
        if (timeParts) {
          const [, hour, minute] = timeParts
          googleFormData.set(`${FORM_ENTRY.arrivalTime}_hour`, String(Number(hour)))
          googleFormData.set(`${FORM_ENTRY.arrivalTime}_minute`, String(Number(minute)))
        }
      }

      await fetch(GOOGLE_FORM_URL, {
        method: 'POST',
        mode: 'no-cors',
        body: googleFormData,
      })

      setSubmitted(true)
    } catch {
      setError('Your RSVP could not be saved. Please try again.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <section id="rsvp" className="wedding-section section-sage relative px-2.5 py-10 sm:px-6 sm:py-20">
      {/* Ambient glow */}
      <div
        className="pointer-events-none absolute left-1/2 top-1/3 -z-0 h-[420px] w-[420px] -translate-x-1/2 rounded-full bg-champagne/10 blur-[120px]"
        aria-hidden="true"
      />
      <div className="invitation-page-panel relative mx-auto max-w-2xl">
        <Reveal className="flex flex-col items-center gap-[10px] text-center">
          <Image
            src={`${BASE_PATH}/rsvp.png?v=2`}
            alt="RSVP"
            width={320}
            height={320}
            className="mx-auto h-36 w-auto object-contain sm:h-[10.8rem]"
            priority={false}
          />
          <h2 className="font-serif text-5xl font-semibold tracking-[0.08em] text-champagne sm:text-6xl">
            RSVP
          </h2>
        </Reveal>

        <Reveal delay={0.15}>
          <div className="invitation-card glass mt-12 overflow-hidden rounded-3xl p-6 sm:p-9">
            <AnimatePresence mode="wait">
              {submitted ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                  className="relative flex flex-col items-center overflow-hidden py-10 text-center"
                >
                  {attendance === 'yes' && <CelebrationConfetti />}
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.15, type: 'spring', stiffness: 200, damping: 14 }}
                    className="flex size-16 items-center justify-center rounded-full bg-champagne text-white"
                  >
                    {attendance === 'yes' ? (
                      <PartyPopper className="size-7" aria-hidden="true" />
                    ) : (
                      <span className="text-3xl leading-none" aria-hidden="true">😢</span>
                    )}
                  </motion.span>
                  <h3 className="font-serif mt-6 text-3xl font-light text-cream">
                    {attendance === 'yes'
                      ? 'Yay, eager to welcome you!!'
                      : "We'll miss you."}
                  </h3>
                  <p className="mt-3 max-w-sm text-sm leading-relaxed text-cream/60">
                    {attendance === 'yes'
                      ? 'See you there soon!'
                      : "Thanks for letting us know - sending our love from afar."}
                  </p>
                  <button
                    type="button"
                    onClick={() => setSubmitted(false)}
                    className="mt-8 text-xs font-medium tracking-[0.1em] text-champagne/80 underline-offset-4 hover:underline"
                  >
                    Send another response
                  </button>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onSubmit={handleSubmit}
                  className="space-y-6"
                >
                  <div>
                    <label htmlFor="name" className={labelClass}>
                      Full Name
                    </label>
                    <input
                      id="name"
                      name="name"
                      required
                      placeholder="Your name"
                      className={inputClass}
                    />
                  </div>

                  <div>
                    <label htmlFor="phone" className={labelClass}>
                      Phone Number
                    </label>
                    <input
                      id="phone"
                      name="phone"
                      type="tel"
                      required
                      inputMode="tel"
                      placeholder="Your phone number"
                      className={inputClass}
                    />
                  </div>

                  <fieldset>
                    <legend className={labelClass}>Will you be attending?</legend>
                    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                      {(
                        [
                          { v: 'yes', label: 'Of course! 😎' },
                          { v: 'no', label: "Can't make it this time ☹️" },
                        ] as const
                      ).map((opt) => (
                        <label
                          key={opt.v}
                          className={`flex cursor-pointer items-center gap-3 rounded-xl border px-4 py-3 text-sm transition-colors ${
                            attendance === opt.v
                              ? 'border-champagne/60 bg-champagne/10 text-cream'
                              : 'border-cream/15 bg-cream/5 text-cream/70 hover:border-cream/30'
                          }`}
                        >
                          <input
                            type="radio"
                            name="attendance"
                            value={opt.v}
                            checked={attendance === opt.v}
                            onChange={() => setAttendance(opt.v)}
                            className="sr-only"
                          />
                          <span
                            className={`flex size-4 items-center justify-center rounded-full border ${
                              attendance === opt.v
                                ? 'border-champagne bg-champagne'
                                : 'border-cream/40'
                            }`}
                            aria-hidden="true"
                          >
                            {attendance === opt.v && (
                              <Check className="size-3 text-white" />
                            )}
                          </span>
                          {opt.label}
                        </label>
                      ))}
                    </div>
                  </fieldset>

                  <AnimatePresence>
                    {attendance === 'yes' && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        className="space-y-6 overflow-hidden"
                      >
                        {!IS_RECEPTION && (
                          <fieldset>
                            <legend className={labelClass}>Which functions will you attend</legend>
                            <p className="mb-3 -mt-1 text-xs text-cream/45">Select all that apply.</p>
                            <div className="grid grid-cols-1 gap-3">
                              {FUNCTIONS.map((option) => {
                                const checked = functions.has(option)
                                return (
                                <label
                                  key={option}
                                  className={`flex cursor-pointer items-center gap-3 rounded-xl border px-4 py-3 text-sm transition-colors ${
                                    checked
                                      ? 'border-champagne/60 bg-champagne/10 text-cream'
                                      : 'border-cream/15 bg-cream/5 text-cream/70 hover:border-cream/30'
                                  }`}
                                >
                                  <input
                                    type="checkbox"
                                    name="functions"
                                    value={option}
                                    checked={checked}
                                    onChange={() => toggleFunction(option)}
                                    className="sr-only"
                                  />
                                  <span
                                    className={`flex size-4 items-center justify-center rounded border ${
                                      checked
                                        ? 'border-champagne bg-champagne'
                                        : 'border-cream/40'
                                    }`}
                                    aria-hidden="true"
                                  >
                                    {checked && (
                                      <Check className="size-3 text-white" />
                                    )}
                                  </span>
                                  {FUNCTION_LABELS[option]}
                                </label>
                                )
                              })}
                            </div>
                          </fieldset>
                        )}

                        <div>
                          <label className={labelClass}>Number of Guests</label>
                          <div className="flex gap-3">
                            {[1, 2].map((n) => (
                              <button
                                key={n}
                                type="button"
                                onClick={() => setGuests(n)}
                                className={`flex-1 rounded-xl border px-4 py-3 text-sm transition-colors ${
                                  guests === n
                                    ? 'border-champagne/60 bg-champagne/10 text-cream'
                                    : 'border-cream/15 bg-cream/5 text-cream/70 hover:border-cream/30'
                                }`}
                              >
                                {n === 1 ? 'Just me' : 'Me + Family'}
                              </button>
                            ))}
                          </div>
                        </div>

                        {!IS_RECEPTION && (
                          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                            <div>
                              <label htmlFor="arrivalDate" className={labelClass}>
                                Arrival Date
                              </label>
                              <input
                                id="arrivalDate"
                                name="arrivalDate"
                                type="date"
                                required
                                className={inputClass}
                              />
                            </div>
                            <div>
                              <label htmlFor="arrivalTime" className={labelClass}>
                                Arrival Time
                              </label>
                              <input
                                id="arrivalTime"
                                name="arrivalTime"
                                type="time"
                                required
                                className={inputClass}
                              />
                            </div>
                          </div>
                        )}
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {error && (
                    <p role="alert" className="text-center text-sm text-red-300">
                      {error}
                    </p>
                  )}

                  <button
                    type="submit"
                    disabled={submitting}
                    className="diya-glow w-full rounded-xl bg-champagne py-3.5 text-sm font-semibold text-white transition-transform hover:scale-[1.01] active:scale-[0.99] disabled:cursor-wait disabled:opacity-60"
                  >
                    {submitting
                      ? 'Sending…'
                      : attendance === 'yes'
                        ? 'Count me in'
                        : 'Send response'}
                  </button>
                </motion.form>
              )}
            </AnimatePresence>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
