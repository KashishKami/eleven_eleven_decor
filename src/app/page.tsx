import React from 'react'
import { Hero } from '@/components/sections/Hero'
import { EventCategories } from '@/components/sections/EventCategories'
import { AboutSection } from '@/components/sections/AboutSection'
import { HomeServices } from '@/components/sections/HomeServices'
import { WhyChooseUs } from '@/components/sections/WhyChooseUs'
import { HomePortfolio } from '@/components/sections/HomePortfolio'
import { WorkProcess } from '@/components/sections/WorkProcess'
import { HomeVenues } from '@/components/sections/HomeVenues'
import { HomePackages } from '@/components/sections/HomePackages'
import { HomeTestimonials } from '@/components/sections/HomeTestimonials'
import { HomeGallery } from '@/components/sections/HomeGallery'
import { HomeFAQ } from '@/components/sections/HomeFAQ'
import { FooterCTA } from '@/components/sections/FooterCTA'

export default function Home() {
  return (
    <>
      {/* 1. Hero */}
      <Hero />

      {/* 2. About 11:11 Decor */}
      <AboutSection />

      {/* 3. What We Create (Event Categories) */}
      <EventCategories />

      {/* 4. Services Grid (All 10 Services) */}
      <HomeServices />

      {/* 5. Why Choose 11:11 Decor */}
      <WhyChooseUs />

      {/* 6. Featured Portfolio */}
      <HomePortfolio />

      {/* 7. Event Process (4-step workflow) */}
      <WorkProcess />

      {/* 8. Venues Teaser */}
      <HomeVenues />

      {/* 9. Packages Overview */}
      <HomePackages />

      {/* 10. Client Testimonials */}
      <HomeTestimonials />

      {/* 11. Visual Gallery Preview */}
      <HomeGallery />

      {/* 12. Homepage FAQ */}
      <HomeFAQ />

      {/* 13. Final CTA */}
      <FooterCTA />
    </>
  )
}
