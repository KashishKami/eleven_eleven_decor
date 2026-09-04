import type { Metadata } from 'next'
import { Cormorant_Garamond, DM_Sans } from 'next/font/google'
import Script from 'next/script'
import { SmoothScrollProvider } from '@/components/providers/SmoothScrollProvider'
import { Navigation } from '@/components/layout/Navigation'
import { Footer } from '@/components/layout/Footer'
import JsonLd from '@/components/seo/JsonLd'
import { generateOrganizationSchema } from '@/lib/schemaGenerators'
import './globals.css'

const fontDisplay = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-display',
  display: 'swap',
})

const fontBody = DM_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-body',
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL('https://1111decor.com'),
  title: {
    default: '11:11 Decor | Event Management & Décor Studio',
    template: '%s | 11:11 Decor',
  },
  description:
    '11:11 Decor plans and decorates weddings, celebrations, and corporate events — from first concept to final detail. Request a custom quote today.',
  verification: {
    google: 'VDCFlV4Uj6z3yjOIiNWGsI4JhCm5CWFnlTZV8Lv7YWo',
  },
  alternates: {
    canonical: 'https://1111decor.com/',
  },
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: 'https://1111decor.com/',
    siteName: '11:11 Decor',
    title: '11:11 Decor | Event Management & Décor Studio',
    description:
      '11:11 Decor plans and decorates weddings, celebrations, and corporate events — from first concept to final detail. Request a custom quote today.',
    images: [
      {
        url: '/hero-banner.jpg',
        width: 1200,
        height: 630,
        alt: '11:11 Decor - Luxury Event Management & Décor Studio',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: '11:11 Decor | Event Management & Décor Studio',
    description:
      '11:11 Decor plans and decorates weddings, celebrations, and corporate events — from first concept to final detail.',
    images: ['/hero-banner.jpg'],
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${fontDisplay.variable} ${fontBody.variable}`}>
      <head>
        <JsonLd data={generateOrganizationSchema()} />
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-ZXHX187LF2"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-ZXHX187LF2');
          `}
        </Script>
      </head>
      <body>
        <SmoothScrollProvider>
          <Navigation />
          <main>{children}</main>
          <Footer />
        </SmoothScrollProvider>
      </body>
    </html>
  )
}

