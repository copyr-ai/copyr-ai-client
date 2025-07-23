'use client'

import Layout from "@/components/Layout"
import Link from "next/link"
import { motion } from "framer-motion"

export default function About() {
  return (
    <Layout>
      <div className="pt-32 pb-20 px-4">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              About <span className="gradient-text-primary">copyr.ai</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Our mission is to make copyright research simple, accurate, and accessible for everyone.
            </p>
          </motion.div>

          {/* Story Section */}
          <motion.section
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mb-16"
          >
            <h2 className="text-3xl font-bold mb-8 text-center">Our Story</h2>
            <div className="prose prose-lg mx-auto text-gray-600">
              <p>
                The idea for copyr.ai came from a simple frustration: spending more time researching 
                whether content could be used legally than actually creating with it.
              </p>
              <p>
                As creators, designers, and content producers ourselves, we&apos;ve all been there, finding 
                the perfect image, video, or audio clip, only to get lost in a maze of copyright 
                databases, conflicting information, and unclear licensing terms.
              </p>
              <p>
                We realized that copyright shouldn&apos;t be a barrier to creativity. It should be a 
                clear, understandable system that helps creators work confidently while respecting 
                the rights of content owners.
              </p>
              <p>
                That&apos;s why we&apos;re building copyr.ai to bridge the gap between complex copyright law 
                and practical creative needs.
              </p>
            </div>
          </motion.section>

          {/* Mission Section */}
          <motion.section
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mb-16"
          >
            <div className="bg-gradient-to-br from-brand-pink/10 to-brand-purple/10 p-12 rounded-2xl">
              <h2 className="text-3xl font-bold mb-6 text-center">Our Mission</h2>
              <p className="text-xl text-gray-700 text-center max-w-3xl mx-auto leading-relaxed">
                To democratize access to accurate copyright information, empowering creators 
                worldwide to work confidently while respecting intellectual property rights.
              </p>
            </div>
          </motion.section>

          {/* Values Section */}
          <motion.section
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="mb-16"
          >
            <h2 className="text-3xl font-bold mb-12 text-center">Our Values</h2>
            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  title: "Accuracy First",
                  description: "We prioritize reliable, up-to-date information over speed, ensuring every search result you can trust."
                },
                {
                  title: "Creative Freedom",
                  description: "We believe copyright should enable creativity, not hinder it. Our tools are designed to say &apos;yes&apos; whenever legally possible."
                },
                {
                  title: "Transparency",
                  description: "No black boxes. We show you exactly where our information comes from and how confident we are in each result."
                }
              ].map((value, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.8 + index * 0.1 }}
                  className="text-center"
                >
                  <h3 className="text-xl font-semibold mb-4 text-gray-900">{value.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{value.description}</p>
                </motion.div>
              ))}
            </div>
          </motion.section>

          {/* Team Section */}
          <motion.section
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="text-center"
          >
            <h2 className="text-3xl font-bold mb-8">Join Our Journey</h2>
            <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
              We&apos;re a small but passionate team working to solve a big problem. 
              Want to be part of the solution?
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a 
                href="https://linkedin.com/company/copyr-ai" 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-gradient-to-r from-brand-pink to-brand-purple text-white px-8 py-3 rounded-full font-medium hover:opacity-90 transition-opacity"
              >
                Connect with us
              </a>
              <a 
                href="mailto:hello@copyr.ai"
                className="border border-gray-300 text-gray-700 px-8 py-3 rounded-full font-medium hover:bg-gray-50 transition-colors"
              >
                Get in touch
              </a>
            </div>
          </motion.section>
        </div>
      </div>
    </Layout>
  )
}
