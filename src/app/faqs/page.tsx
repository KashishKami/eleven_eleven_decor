import React from 'react'
import type { Metadata } from 'next'
import { HomeFAQ } from '@/components/sections/HomeFAQ'
import { FooterCTA } from '@/components/sections/FooterCTA'
import JsonLd from '@/components/seo/JsonLd'

export const metadata: Metadata = {
  title: 'Frequently Asked Questions | 11:11 Decor',
  description: 'Answers to common questions about luxury event planning, wedding decoration, corporate galas, and venue staging by 11:11 Decor.',
  openGraph: {
    title: 'Frequently Asked Questions | 11:11 Decor',
    description: 'Answers to common questions about luxury event planning, wedding decoration, corporate galas, and venue staging by 11:11 Decor.',
    url: 'https://1111decor.com/faqs/',
    type: 'website',
  },
  alternates: {
    canonical: 'https://1111decor.com/faqs/',
  },
}

export default function FaqsPage() {
  const schemaData = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'What types of events does 11:11 Decor manage?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'We manage and decorate weddings, corporate galas, milestone birthdays, engagements, private dinners, and destination celebrations across Uttarakhand.',
        },
      },
      {
        '@type': 'Question',
        name: 'Do you provide complete event planning, or only decoration?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'We provide both. You can book us for end-to-end event planning and management, decoration services only, or a fully integrated package covering both.',
        },
      },
      {
        '@type': 'Question',
        name: 'Can we hire 11:11 Decor for decoration only?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes. If your venue, catering, and timeline are already set, our styling team can focus entirely on stage design, floral architecture, lighting, and ambient tablescapes.',
        },
      },
      {
        '@type': 'Question',
        name: 'Can we customize our event package?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Absolutely. Every event is unique. Our packages (Essential, Signature, Bespoke) serve as curated frameworks which we tailor to your specific venue, guest count, and creative vision.',
        },
      },
      {
        '@type': 'Question',
        name: 'How far in advance should we book?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'We recommend booking 4 to 8 months in advance for major weddings and corporate galas to secure premier dates, design custom fabrication sets, and reserve seasonal botanicals.',
        },
      },
      {
        '@type': 'Question',
        name: 'Do you manage corporate events as well as weddings?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes. We regularly execute corporate annual galas, executive summits, product launches, and award ceremonies with surgical stagecraft and precise audio-visual coordination.',
        },
      },
      {
        '@type': 'Question',
        name: 'Do you work outside Dehradun / Uttarakhand?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'While our studio is based in Dehradun, we frequently produce destination weddings and corporate retreats across Mussoorie, Rishikesh, Haridwar, Jim Corbett, and beyond.',
        },
      },
      {
        '@type': 'Question',
        name: 'How do we request a quote?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'You can submit our quick inquiry form on the Contact page or message us directly on WhatsApp (+91 74668 54475) with your event date, estimated guest count, and preferred venue.',
        },
      },
    ],
  }

  return (
    <div style={{ paddingTop: '80px', backgroundColor: '#121212', minHeight: '100vh' }}>
      <JsonLd data={schemaData} />
      <HomeFAQ />
      <FooterCTA />
    </div>
  )
}
