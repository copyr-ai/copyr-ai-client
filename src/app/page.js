'use client'

import { useState } from "react"
import HeroSection from "@/components/HeroSection"
import SurveyForm from "@/components/SurveyForm"

export default function Home() {
  const handleCloseSurvey = () => {
    // You can add any logic here if needed when survey is closed
    console.log('Survey closed')
  }

  return (
    <div className="min-h-screen bg-white overflow-x-hidden">
      <HeroSection>
        {/* Survey Form - Always rendered inside MacBook screen */}
        <SurveyForm onClose={handleCloseSurvey} />
      </HeroSection>
    </div>
  )
}
