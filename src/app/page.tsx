import React from 'react'
import { Hero } from '@/components/sections/Hero'
import { AboutSection } from '@/components/sections/AboutSection'
import { EventCategories } from '@/components/sections/EventCategories'
import { WhyChooseUs } from '@/components/sections/WhyChooseUs'
import { MenusSection } from '@/components/sections/MenusSection'
import { WorkProcess } from '@/components/sections/WorkProcess'
import { TeamSection } from '@/components/sections/TeamSection'
import { StatsSection } from '@/components/sections/StatsSection'
import { BlogSection } from '@/components/sections/BlogSection'
import { FooterCTA } from '@/components/sections/FooterCTA'

export default function Home() {
  return (
    <>
      <Hero />
      <AboutSection />
      <EventCategories />
      <WhyChooseUs />
      <MenusSection />
      <WorkProcess />
      <TeamSection />
      <StatsSection />
      <BlogSection />
      <FooterCTA />
    </>
  )
}
