import type { Metadata, Viewport } from 'next'
import { Cormorant_Garamond, Inter, Noto_Serif_Devanagari, Yatra_One } from 'next/font/google'
import { BASE_PATH } from '@/lib/base-path'
import './globals.css'

const serif = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-serif',
  display: 'swap',
})

const sans = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
})

// Devanagari body/invite text - Noto Serif Devanagari: robust conjunct shaping
// (half-forms like स्न, श्री render cleanly)
const devanagari = Noto_Serif_Devanagari({
  subsets: ['devanagari', 'latin'],
  weight: ['400', '500', '600'],
  variable: '--font-devanagari',
  display: 'swap',
})

// Devanagari decorative display - for the big calligraphic Hindi (names, मंगल परिणय)
const devanagariDisplay = Yatra_One({
  subsets: ['devanagari', 'latin'],
  weight: ['400'],
  variable: '--font-devanagari-display',
  display: 'swap',
})

const reception = process.env.NEXT_PUBLIC_SITE === 'reception'

export const metadata: Metadata = {
  metadataBase: new URL(`https://mayank-kumar-giri.github.io${BASE_PATH || '/mayank-weds-mansi'}/`),
  title: reception ? 'Mansi weds Mayank · Reception, Bhilai' : 'Mansi weds Mayank · Raipur & Bhilai',
  description: reception
    ? 'Join us for the reception of Mansi & Mayank - Jharokha - The Wedding Palace, Bhilai, December 12, 2026.'
    : 'Join us for the wedding of Mansi & Mayank - December 9 to 12, 2026, Raipur & Bhilai, Chhattisgarh.',
  generator: 'v0.app',
  openGraph: {
    title: reception ? 'Mansi weds Mayank · Reception, Bhilai' : 'Mansi weds Mayank · Raipur & Bhilai',
    description: reception
      ? 'Join us for the reception of Mansi & Mayank - Jharokha - The Wedding Palace, Bhilai, December 12, 2026.'
      : 'Join us for the wedding of Mansi & Mayank - December 9 to 12, 2026, Raipur & Bhilai, Chhattisgarh.',
    images: [`${BASE_PATH}/indian-wedding-hero-centered.png`],
    type: 'website',
  },
  icons: {
    icon: [
      { url: `${BASE_PATH}/icon-light-32x32.png`, media: '(prefers-color-scheme: light)' },
      { url: `${BASE_PATH}/icon-dark-32x32.png`, media: '(prefers-color-scheme: dark)' },
      { url: `${BASE_PATH}/icon.svg`, type: 'image/svg+xml' },
    ],
    apple: `${BASE_PATH}/apple-icon.png`,
  },
}

export const viewport: Viewport = {
  colorScheme: 'light',
  themeColor: '#f7f0e2',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${serif.variable} ${sans.variable} ${devanagari.variable} ${devanagariDisplay.variable} light`}>
      <body className="antialiased">{children}</body>
    </html>
  )
}
