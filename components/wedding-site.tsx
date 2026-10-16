import { Hero } from '@/components/hero'
import { Families } from '@/components/families'
import { Aakanshi } from '@/components/aakanshi'
import { Addresses } from '@/components/addresses'
import { Moments } from '@/components/moments'
import { Schedule } from '@/components/schedule'
import { Rsvp } from '@/components/rsvp'
import { MusicPlayer } from '@/components/music-player'
import { PetalFall } from '@/components/petal-fall'
import { type Moment } from '@/lib/wedding'

export function WeddingSite({ moments }: { moments: Moment[] }) {
  return (
    <main className="relative overflow-x-hidden bg-[#f7f0e2]">
      <PetalFall />
      <Hero />
      <Families />
      <Schedule />
      <Addresses />
      <Moments moments={moments} />
      <Aakanshi />
      <Rsvp />

      <footer className="border-t border-[#a96949]/20 bg-[#efe3ce]/75 px-6 pb-28 pt-14 text-center sm:pb-14">
        <p className="font-serif text-sm tracking-[0.12em] text-champagne/70">
          Made with love, for the ones we love.
        </p>
      </footer>

      <MusicPlayer />
    </main>
  )
}
