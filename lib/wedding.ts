import { BASE_PATH } from '@/lib/base-path'

// Google Maps links (shared across event venues)
export const MAPS = {
  groomHome: 'https://maps.app.goo.gl/nhMPZHmJdr8KFt377', // Anand Bhoomi, Raipur
  mainVenue: 'https://maps.app.goo.gl/smVBdhKWKrtFXKJn9', // Jharokha, Bhilai
  brideHome: 'https://maps.app.goo.gl/3VaQVTD1D6X6RdKz9', // 269, Ward-17, Panch Rasta Supela, Bhilai (C.G.)
}

// Version D - bride-side, parents' edition, English. Bride (Mansi) listed first.
export const WEDDING = {
  couple: ['Mansi', 'Mayank'] as const,
  coupleHi: ['मानसी', 'मयंक'] as const,
  dateLabel: 'December 10 - 12, 2026',
  location: 'Raipur & Bhilai, Chhattisgarh',
  venue: 'Jharokha - The Wedding Palace',
  venueAddress: 'Near Durg Bypass, NH - 06, Pushpak Nagar, Bhilai (C.G.)',
  // First celebration - used for the hero countdown (local ISO, IST)
  date: new Date('2026-12-10T07:00:00+05:30'),
  mapsUrl: MAPS.mainVenue,
  musicUrl: 'https://music.youtube.com/watch?v=Het4pXDENBI&si=Q5SzqQqMNPfFrXeB',
  inviteLineHi: 'सादर आमंत्रण',
}

export const IS_RECEPTION = process.env.NEXT_PUBLIC_SITE === 'reception'

export const RECEPTION = {
  dateLabel: 'December 12, 2026',
  location: 'Bhilai, Chhattisgarh',
  venue: 'Jharokha - The Wedding Palace',
  venueAddress: 'Near Durg Bypass, NH - 06, Pushpak Nagar, Bhilai (C.G.)',
  date: new Date('2026-12-12T13:00:00+05:30'),
  mapsUrl: MAPS.mainVenue,
  inviteLine: 'we cordially invite you to our wedding',
}

export type EventKind = 'puja' | 'mehndi' | 'tilak' | 'haldi' | 'sangeet' | 'baraat' | 'bhoj' | 'vivah'

export type ScheduleItem = {
  title: string
  kind: EventKind
  time: string
  start: Date
  durationMinutes: number
  venue: string
  address: string
  description: string
  note?: string
  calendarLocation?: string
  mapsUrl?: string
  art?: string
}

export type ScheduleDay = {
  label: string
  dateLabel: string
  events: ScheduleItem[]
  separated?: boolean
}

const SUPELA = 'Sharma Residence'
const SUPELA_FULL = '269, Ward-17, Panch Rasta Supela, Bhilai (C.G.)'
const JHAROKHA = 'Jharokha - The Wedding Palace'
const JHAROKHA_FULL = 'Jharokha - The Wedding Palace, Near Durg Bypass, NH - 06, Pushpak Nagar, Bhilai (C.G.)'

export const SCHEDULE: ScheduleDay[] = [
  {
    label: 'Pre-Wedding Rituals',
    dateLabel: '9th December, 2026',
    events: [
      {
        title: 'Sundar Kaand & Kirtan',
        kind: 'puja',
        art: 'event-1.png',
        time: '12:00 PM onwards',
        start: new Date('2026-12-09T12:00:00+05:30'),
        durationMinutes: 180,
        venue: 'Supela Residence',
        address: SUPELA,
        description: 'Sundar Kaand recitation and kirtan - the auspicious beginning, invoking blessings for the days ahead.',
        mapsUrl: MAPS.brideHome,
      },
    ],
  },
  {
    label: 'Colours of Celebration',
    dateLabel: '10th December, 2026',
    events: [
      {
        title: 'Mehndi',
        kind: 'mehndi',
        art: 'event-2.png',
        time: '12:00 PM onwards',
        start: new Date('2026-12-10T12:00:00+05:30'),
        durationMinutes: 240,
        venue: 'Supela Residence',
        address: SUPELA,
        description: 'Mehndi - intricate henna, music, and laughter as the celebrations unfold.',
        calendarLocation: SUPELA_FULL,
        mapsUrl: MAPS.brideHome,
      },
      {
        title: 'Jaaggo',
        // Purple theme (event-sangeet). EDIT ME: replace event-3.png with the
        // real Jaaggo artwork the user will supply (same filename, same folder).
        kind: 'sangeet',
        art: 'event-3.png',
        time: '7:00 PM onwards',
        start: new Date('2026-12-10T19:00:00+05:30'),
        durationMinutes: 240,
        venue: 'Supela Residence',
        address: SUPELA,
        description: 'Jaaggo - a joyful night of music, dholak, and dance ahead of the wedding.',
        calendarLocation: SUPELA_FULL,
        mapsUrl: MAPS.brideHome,
      },
    ],
  },
  {
    label: 'Festivities Continue',
    dateLabel: '11th December, 2026',
    events: [
      {
        title: 'Neg Tilak',
        kind: 'tilak',
        art: 'event-4.png',
        time: '9:00 AM onwards',
        start: new Date('2026-12-11T09:00:00+05:30'),
        durationMinutes: 180,
        venue: 'Jharokha - The Wedding Palace',
        address: JHAROKHA,
        description: 'Neg Tilak - rituals of welcome and the exchange of family blessings.',
        mapsUrl: MAPS.mainVenue,
      },
      {
        title: 'Haldi and Pool Party',
        kind: 'haldi',
        art: 'event-5.png',
        time: '1:00 PM onwards',
        start: new Date('2026-12-11T13:00:00+05:30'),
        durationMinutes: 180,
        venue: 'Jharokha - The Wedding Palace',
        address: JHAROKHA,
        description: 'Haldi - turmeric and golden warmth to bless the couple before the big day.',
        mapsUrl: MAPS.mainVenue,
      },
      {
        title: 'Engagement and Sangeet',
        kind: 'sangeet',
        art: 'event-6.png',
        time: '7:00 PM onwards',
        start: new Date('2026-12-11T19:00:00+05:30'),
        durationMinutes: 300,
        venue: 'Jharokha - The Wedding Palace',
        address: JHAROKHA,
        description: 'Sangeet - a night of music, dance, and celebration.',
        calendarLocation: JHAROKHA_FULL,
        mapsUrl: MAPS.mainVenue,
      },
    ],
  },
  {
    label: 'The Wedding',
    dateLabel: '12th December, 2026',
    events: [
      {
        title: 'Baraat Swagat',
        kind: 'baraat',
        art: 'event-7.png',
        time: '11:00 AM onwards',
        start: new Date('2026-12-12T11:00:00+05:30'),
        durationMinutes: 120,
        venue: 'Jharokha - The Wedding Palace',
        address: JHAROKHA,
        description: 'Baraat - the groom\u2019s grand procession, where the party begins.',
        mapsUrl: MAPS.mainVenue,
      },
      {
        title: 'Varmala and Reception',
        kind: 'bhoj',
        art: 'event-8.png',
        time: '1:00 PM onwards',
        start: new Date('2026-12-12T13:00:00+05:30'),
        durationMinutes: 240,
        venue: 'Jharokha - The Wedding Palace',
        address: JHAROKHA,
        description: 'Ashirwad ceremony and Preeti Bhoj - blessings for the couple, followed by a shared meal.',
        mapsUrl: MAPS.mainVenue,
      },
      {
        title: 'Panigrahan',
        kind: 'vivah',
        art: 'event-9.png',
        time: 'At the auspicious hour',
        start: new Date('2026-12-12T18:00:00+05:30'),
        durationMinutes: 180,
        venue: 'Jharokha - The Wedding Palace',
        address: JHAROKHA,
        description: 'Panigrahan - the sacred wedding vows, taken in the auspicious shubh lagna.',
        calendarLocation: JHAROKHA_FULL,
        mapsUrl: MAPS.mainVenue,
      },
    ],
  },
]

export const RECEPTION_SCHEDULE: ScheduleDay[] = SCHEDULE

export const PALETTE = [
  { name: 'Espresso', hex: '#3b2f27' },
  { name: 'Clay', hex: '#a9744f' },
  { name: 'Champagne', hex: '#e4c692' },
  { name: 'Cream', hex: '#f2ead9' },
  { name: 'Sage', hex: '#8a8b6f' },
]

export const DRESS_CARDS = [
  {
    title: 'Cocktail & Dancefloor Ready',
    body: 'Elevated but easy. Think flowing fabrics, tailored suits, and shoes you can actually move in.',
  },
  {
    title: 'Warm & Earthy Tones',
    body: 'Lean into the palette — espresso, clay, champagne, cream. Skip stark white and neon.',
  },
  {
    title: 'December Evenings Get Cool',
    body: 'Chhattisgarh winter nights turn crisp. Bring a beautiful layer you will not mind dancing in.',
  },
]

export type Moment = {
  src: string
  alt: string
  span?: 'row' | 'col'
}

export const MOMENTS: Moment[] = [
  { src: `${BASE_PATH}/moment-1.jpeg`, alt: 'Mansi & Mayank', span: 'row' },
  { src: `${BASE_PATH}/moment-2.jpeg`, alt: 'Mansi & Mayank' },
  { src: `${BASE_PATH}/moment-3.jpeg`, alt: 'Mansi & Mayank' },
  { src: `${BASE_PATH}/moment-4.jpeg`, alt: 'Mansi & Mayank', span: 'row' },
  { src: `${BASE_PATH}/moment-5.jpeg`, alt: 'Mansi & Mayank' },
  { src: `${BASE_PATH}/moment-6.jpeg`, alt: 'Mansi & Mayank' },
]
