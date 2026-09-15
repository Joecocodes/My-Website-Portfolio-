import type { Metadata, Viewport } from 'next'
import { Archivo, IBM_Plex_Mono } from 'next/font/google'
import { site } from '@/data/site'
import { SiteHeader } from '@/components/SiteHeader'
import { SiteFooter } from '@/components/SiteFooter'
import { SmoothScrollProvider } from '@/components/SmoothScrollProvider'
import { PageTransition } from '@/components/PageTransition'
import { CustomCursor } from '@/components/CustomCursor'
import './globals.css'

const archivo = Archivo({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  variable: '--font-archivo',
  display: 'swap',
  preload: true,
})

const plexMono = IBM_Plex_Mono({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-plex-mono',
  display: 'swap',
  preload: true,
})

export const metadata: Metadata = {
  title: {
    default: `${site.name} — ${site.role[0]}`,
    template: `%s — ${site.name}`,
  },
  description: site.statement,
  openGraph: {
    title: `${site.name} — ${site.role[0]}`,
    description: site.statement,
    type: 'website',
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#f4f4f0',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${archivo.variable} ${plexMono.variable}`}>
      <head>
        {/*
          Stamps `js` on <html> BEFORE first paint. Every pre-animation state in
          globals.css is scoped to html.js, so:
            - JS enabled  -> elements start hidden, GSAP reveals them
            - JS disabled -> class never lands, everything renders finished
          Running it inline in <head> (not in an effect) is what prevents a
          flash of the pre-animation state.
        */}
        <script
          dangerouslySetInnerHTML={{
            __html: `document.documentElement.classList.add('js')`,
          }}
        />
      </head>
      <body>
        <a href="#main" className="skip-link">
          Skip to content
        </a>

        <PageTransition />
        <CustomCursor />
        <SiteHeader />

        <SmoothScrollProvider>
          <main id="main">{children}</main>
          <SiteFooter />
        </SmoothScrollProvider>
      </body>
    </html>
  )
}
