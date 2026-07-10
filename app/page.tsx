import React from 'react'
import HeroSection from './components/hero/HeroSection'
import CaseStudiesSection from './components/sections/CaseStudiesSection'
import ServicesSection from './components/sections/ServicesSection'
import StorySection from './components/sections/StorySection'
import FaqSection from './components/sections/FaqSection'
import ClientLogo from './components/sections/ClientLogo'
import HeroBanner from './components/HeroBanner/HeroBanner'
import TeamSection from './components/TeamSection/TeamSection'

const page = () => {


  return (
    <>

      <HeroSection />
      <CaseStudiesSection />
      <ServicesSection />
      <StorySection />
      <ClientLogo />
      <HeroBanner />
      <TeamSection />
      <FaqSection />
    </>
  )
}

export default page
