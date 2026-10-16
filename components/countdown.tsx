'use client'

import { useEffect, useState } from 'react'

function diff(target: Date) {
  const total = Math.max(0, target.getTime() - Date.now())
  const days = Math.floor(total / 86_400_000)
  const hours = Math.floor((total % 86_400_000) / 3_600_000)
  const minutes = Math.floor((total % 3_600_000) / 60_000)
  const seconds = Math.floor((total % 60_000) / 1000)
  return { days, hours, minutes, seconds }
}

export function Countdown({ target }: { target: Date }) {
  // Start null to keep server and first client render identical (no hydration shift).
  const [time, setTime] = useState<ReturnType<typeof diff> | null>(null)

  useEffect(() => {
    setTime(diff(target))
    const id = setInterval(() => setTime(diff(target)), 1000)
    return () => clearInterval(id)
  }, [target])

  const units = [
    { label: 'Days', value: time?.days },
    { label: 'Hours', value: time?.hours },
    { label: 'Minutes', value: time?.minutes },
    { label: 'Seconds', value: time?.seconds },
  ]

  return (
    <div className="flex items-stretch gap-1 sm:gap-1.5 min-[900px]:landscape:gap-3">
      {units.map((u) => (
        <div
          key={u.label}
          className="glass flex min-w-[36px] flex-col items-center rounded-md px-1 py-1 sm:min-w-[50px] sm:rounded-lg sm:px-1.5 sm:py-1.5 min-[900px]:landscape:min-w-[68px] min-[900px]:landscape:rounded-xl min-[900px]:landscape:px-3 min-[900px]:landscape:py-3"
        >
          <span
            className="font-serif text-base font-light tabular-nums text-cream sm:text-xl min-[900px]:landscape:text-3xl"
            aria-hidden={u.value === undefined}
          >
            {u.value === undefined ? '--' : String(u.value).padStart(2, '0')}
          </span>
          <span className="mt-0.5 text-[7px] font-medium uppercase tracking-[0.06em] text-cream/60 sm:text-[9px] sm:tracking-[0.14em] min-[900px]:landscape:mt-1 min-[900px]:landscape:text-[10px] min-[900px]:landscape:tracking-[0.22em]">
            {u.label}
          </span>
        </div>
      ))}
    </div>
  )
}
