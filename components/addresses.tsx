'use client'

import Image from 'next/image'
import { MapPin } from 'lucide-react'
import { Reveal } from '@/components/reveal'
import { BASE_PATH } from '@/lib/base-path'
import { MAPS } from '@/lib/wedding'

type Address = {
  name: string
  lines: string[]
  mapsUrl: string
}

const ADDRESSES: Address[] = [
  {
    name: 'Sharma Residence',
    lines: [
      '269, Ward-17, Panch Rasta Supela,',
      'Bhilai (C.G.)',
    ],
    mapsUrl: MAPS.brideHome,
  },
  {
    name: 'Jharokha - The Wedding Palace',
    lines: [
      'Near Durg Bypass, NH - 06,',
      'Pushpak Nagar, Bhilai (C.G.)',
    ],
    mapsUrl: MAPS.mainVenue,
  },
]

function AddressCard({ address }: { address: Address }) {
  return (
    <div className="invitation-card glass flex h-full flex-col items-center rounded-2xl p-6 text-center sm:p-8">
      <p className="font-serif text-2xl text-champagne sm:text-3xl">{address.name}</p>
      <div className="mt-3 flex-1 space-y-0.5 text-sm leading-relaxed text-cream/80 sm:text-base">
        {address.lines.map((line) => (
          <p key={line}>{line}</p>
        ))}
      </div>
      <a
        href={address.mapsUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-5 inline-flex items-center gap-2 rounded-full border border-champagne/40 px-4 py-2 text-xs font-medium tracking-wide text-champagne transition-colors hover:border-champagne/70 hover:bg-champagne/10"
      >
        <MapPin className="h-4 w-4" />
        View on Google Maps
      </a>
    </div>
  )
}

export function Addresses() {
  return (
    <section
      id="addresses"
      className="wedding-section section-rose relative px-2.5 py-10 sm:px-6 sm:py-20"
    >
      <div className="invitation-page-panel mx-auto max-w-4xl">
        <Reveal>
          <div className="flex flex-col items-center gap-10 text-center">
            {/* Header: icon centered, "Addresses" below */}
            <div className="flex flex-col items-center gap-[10px]">
              <Image
                src={`${BASE_PATH}/addresses.png?v=2`}
                alt="Addresses"
                width={320}
                height={320}
                className="mx-auto h-36 w-auto object-contain sm:h-[10.8rem]"
                priority={false}
              />
              <h2 className="font-serif text-4xl font-semibold text-champagne sm:text-5xl">
                Addresses
              </h2>
            </div>

            <div className="grid w-full items-stretch gap-6 sm:grid-cols-2">
              {ADDRESSES.map((address, i) => (
                <Reveal key={address.name} delay={i * 0.1} className="h-full">
                  <AddressCard address={address} />
                </Reveal>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
