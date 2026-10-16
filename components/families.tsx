'use client'

import { Reveal } from '@/components/reveal'

/**
 * Invitation body — a single flowing page (not cards), mirroring the printed
 * invite: mangal shloka, address to guests, bride block, weds, groom block,
 * and the closing line. Version D: bride-side, English, bride (Mansi) first.
 */

const BRIDE = {
  honorific: 'Ayushmati',
  name: 'Mansi',
  tagline: '',
  lines: [
    'Granddaughter of Smt. Shivrani Devi & Shri Braham Dutt Sharma',
    'Daughter of Smt. Shelly Sharma & Shri Jeewan Kumar Sharma',
    'Supela, Bhilai (C.G.)',
  ],
}

const GROOM = {
  honorific: 'Ayushman',
  name: 'Mayank',
  tagline: '',
  lines: [
    'Grandson of Late Smt. Daymanti Devi & Late Shri Ramesh Chandra Giri',
    'Son of Smt. Indu Giri & Dr. Atul Kumar Giri',
    'Anand Bhoomi, Raipur (C.G.)',
  ],
}

function PersonBlock({ person }: { person: typeof BRIDE }) {
  return (
    <div className="flex flex-col items-center text-center">
      <p className="font-serif text-lg text-champagne sm:text-xl">
        {person.honorific}
      </p>
      <p
        className="font-serif mt-1 text-4xl font-light text-champagne sm:text-5xl"
      >
        {person.name}
      </p>
      {person.tagline && (
        <p className="mt-2 font-serif italic text-base text-cream/70 sm:text-lg">
          {person.tagline}
        </p>
      )}

      <div className="mt-4 space-y-1.5">
        {person.lines.map((line) => (
          <p
            key={line}
            className="text-sm leading-relaxed text-cream/80 sm:text-base"
          >
            {line}
          </p>
        ))}
      </div>
    </div>
  )
}

export function Families() {
  return (
    <section
      id="families"
      className="wedding-section section-rose relative px-2.5 py-10 sm:px-6 sm:py-20"
    >
      <div className="invitation-page-panel mx-auto max-w-4xl">
        <Reveal>
          <div className="flex flex-col items-center gap-8 text-center">
            {/* Mangal shloka — kept in Devanagari, never translated */}
            <div lang="hi" className="font-hindi space-y-1 text-sm leading-relaxed text-cream/75 sm:text-base">
              <p>मंगलं भगवान विष्णुः, मंगलं गरुड़ध्वजः।</p>
              <p>मंगलं पुण्डरीकाक्षः, मंगलाय तनो हरिः॥</p>
            </div>

            {/* Address to guests */}
            <div className="font-serif space-y-1 text-base leading-relaxed text-cream/80 sm:text-lg">
              <p>Dearest family and friends,</p>
              <p>by the boundless grace of the Almighty,</p>
            </div>

            {/* Bride */}
            <PersonBlock person={BRIDE} />

            {/* weds */}
            <p className="font-serif text-2xl font-light text-champagne sm:text-3xl">
              weds
            </p>

            {/* Groom */}
            <PersonBlock person={GROOM} />

            {/* Closing line */}
            <div className="font-serif space-y-1 text-base leading-relaxed text-cream/80 sm:text-lg">
              <p>we joyfully invite you and your family</p>
              <p>to celebrate this union with us.</p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
