'use client'

import Image from 'next/image'
import { Reveal } from '@/components/reveal'
import { BASE_PATH } from '@/lib/base-path'

/**
 * Welcome / hosts section — replicates the printed invite's "swagat" page.
 * Version D: bride-side, English. Headers are English translations of the
 * Hindi originals (आकांक्षी = hosting/host family, स्वागतोत्सुक = eagerly
 * welcoming you, दर्शनाभिलाषी = looking forward to seeing you).
 */

const AAKANKSHI = ['Shivrani Devi & Braham Dutt Sharma', 'Jeevan & Shelly Sharma', 'Sanjeev & Rashmi Sharma']

const SWAGATOTSUK = [
  'Disha, Shivam, Shikha, Ishaan',
]

const DARSHANABHILASHI = [
  'Sharma family, Prabhakar family, Dutt family, Sangar family, Bhatnagar family',
]

function Group({ heading, lines }: { heading: string; lines: string[] }) {
  return (
    <div className="flex flex-col items-center text-center">
      <h2 className="font-serif text-4xl font-light text-champagne sm:text-5xl">
        {heading}
      </h2>
      <div className="mt-3 space-y-1 text-lg leading-relaxed text-cream/85 sm:text-xl">
        {lines.map((line) => (
          <p key={line}>{line}</p>
        ))}
      </div>
    </div>
  )
}

export function Aakanshi() {
  return (
    <section
      id="aakanshi"
      className="wedding-section section-saffron relative px-2.5 py-10 sm:px-6 sm:py-20"
    >
      <div className="invitation-page-panel mx-auto max-w-4xl">
        <Reveal>
          <div className="flex flex-col items-center gap-10 text-center">
            {/* Namaste / pranam icon */}
            <Image
              src={`${BASE_PATH}/pranam.png?v=3`}
              alt="Namaste"
              width={216}
              height={216}
              className="h-36 w-36 object-contain sm:h-[10.8rem] sm:w-[10.8rem]"
              priority={false}
            />

            <Group heading="Hosted with love by:" lines={AAKANKSHI} />
            <Group heading="Eager to welcome you:" lines={SWAGATOTSUK} />
            <Group heading="With best wishes:" lines={DARSHANABHILASHI} />
          </div>
        </Reveal>
      </div>
    </section>
  )
}
