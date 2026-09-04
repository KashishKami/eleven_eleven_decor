import React from 'react'
import { getPageVisibility } from '@/lib/server-visibility'
import { Hero } from '@/components/sections/Hero'
import { EventCategories } from '@/components/sections/EventCategories'
import { AboutSection } from '@/components/sections/AboutSection'
import { HomeServices } from '@/components/sections/HomeServices'
import { WhyChooseUs } from '@/components/sections/WhyChooseUs'
import { HomePortfolio } from '@/components/sections/HomePortfolio'
import { HomeVenues } from '@/components/sections/HomeVenues'
import { HomePackages } from '@/components/sections/HomePackages'
import { HomeTestimonials } from '@/components/sections/HomeTestimonials'
import { HomeGallery } from '@/components/sections/HomeGallery'
import { HomeFAQ } from '@/components/sections/HomeFAQ'
import { FooterCTA } from '@/components/sections/FooterCTA'

export default function Home() {
  const pageVisibility = getPageVisibility()

  return (
    <>
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

      {/* 6. Featured Portfolio (gated) */}
      {pageVisibility.portfolio && <HomePortfolio />}

      {/* 7. Venues Teaser (gated) */}
      {pageVisibility.venues && <HomeVenues />}

      {/* 9. Packages Overview */}
      <HomePackages />

      {/* 10. Client Testimonials */}
      <HomeTestimonials />

      {/* 11. Visual Gallery Preview (gated) */}
      {pageVisibility.gallery && <HomeGallery />}

      {/* 12. Homepage FAQ */}
      <HomeFAQ />

      {/* 13. Final CTA */}
      <FooterCTA />
    </>
  )
}
