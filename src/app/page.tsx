import React from 'react'
import { getPageVisibility } from '@/lib/server-visibility'
import { Hero } from '@/components/sections/Hero'
import { EventCategories } from '@/components/sections/EventCategories'
import { AboutSection } from '@/components/sections/AboutSection'
import { HomeServices } from '@/components/sections/HomeServices'
import { WhyChooseUs } from '@/components/sections/WhyChooseUs'
import { HomePackages } from '@/components/sections/HomePackages'
import { HomeTestimonials } from '@/components/sections/HomeTestimonials'
import { HomeFAQ } from '@/components/sections/HomeFAQ'
import { FooterCTA } from '@/components/sections/FooterCTA'
import JsonLd from '@/components/seo/JsonLd'
import { generateHomePageSchemaGraph } from '@/lib/schemaGenerators'

export default function Home() {
  const pageVisibility = getPageVisibility()

  return (
    <>
      <JsonLd data={generateHomePageSchemaGraph()} />
      {/* 1. Hero */}
      <Hero visibility={pageVisibility} />

      {/* 2. About 11:11 Decor */}
      <AboutSection />

      {/* 3. What We Create (Event Categories) */}
      <EventCategories />

      {/* 4. Services Grid (All 10 Services) */}
      <HomeServices />

      {/* 5. Why Choose 11:11 Decor */}
      <WhyChooseUs />

      {/* 6. Packages Overview */}
      <HomePackages />

      {/* 7. Client Testimonials */}
      <HomeTestimonials />

      {/* 8. Homepage FAQ */}
      <HomeFAQ />

      {/* 9. Final CTA */}
      <FooterCTA />
    </>
  )
}
