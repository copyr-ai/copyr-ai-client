'use client'

import Image from "next/image"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"

export default function Navbar() {
  return (
    <motion.nav 
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="fixed top-6 left-1/2 transform -translate-x-1/2 z-50 bg-white/90 backdrop-blur-md rounded-full shadow-lg border border-gray-200"
    >
      <div className="flex items-center justify-between px-8 py-4">
        {/* Logo */}
        <div className="flex items-center">
          <Image
            src="/brand-copyr.ai-light.svg"
            alt="copyr.ai"
            width={120}
            height={36}
            className="h-10 w-auto sm:h-12 md:h-10 lg:h-8"
            priority
          />
        </div>

        {/* Navigation Links */}
        <div className="hidden md:flex items-center space-x-8 mx-12">
          <a href="#features" className="text-gray-600 hover:text-gray-900 font-medium transition-colors">Features</a>
          <a href="#about" className="text-gray-600 hover:text-gray-900 font-medium transition-colors">About</a>
          <a 
            href="https://linkedin.com/company/copyr-ai" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-gray-600 hover:text-gray-900 font-medium transition-colors"
          >
            Connect
          </a>
        </div>

        {/* CTA Button - Hidden on mobile */}
        <Button
          onClick={() => {
            const surveyContainer = document.getElementById('survey-container')
            if (surveyContainer) {
              surveyContainer.scrollIntoView({ 
                behavior: 'smooth', 
                block: 'center',
                inline: 'center'
              })
            }
          }}
          className="hidden md:block bg-gradient-to-r from-brand-pink to-brand-purple hover:from-brand-pink/90 hover:to-brand-purple/90 text-white font-medium px-6 py-2 rounded-full transition-all duration-300"
        >
          Join waitlist
        </Button>
      </div>
    </motion.nav>
  )
}
