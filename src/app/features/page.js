'use client'

import Layout from "@/components/Layout"
import Link from "next/link"
import { motion } from "framer-motion"

export default function Features() {
  const features = [
    {
      icon: "🔍",
      title: "Instant Copyright Lookup",
      description: "Search any content and get immediate, accurate copyright status information from our comprehensive database.",
      details: [
        "Search by image, audio, video, or text",
        "Real-time database queries",
        "Confidence scores for each result",
        "Historical ownership tracking"
      ]
    },
    {
      icon: "📋",
      title: "Usage Rights Calculator",
      description: "Understand exactly what you can and can&apos;t do with any copyrighted material based on your specific use case.",
      details: [
        "Commercial vs. personal use analysis",
        "Geographic licensing restrictions",
        "Duration and scope limitations",
        "Fair use guidelines"
      ]
    },
    {
      icon: "🤝",
      title: "Rights Holder Connect",
      description: "Direct contact information and licensing pathways to get permissions quickly and legally.",
      details: [
        "Verified contact information",
        "Licensing fee estimates",
        "Standard licensing templates",
        "Negotiation guidance"
      ]
    },
    {
      icon: "⚡",
      title: "Real-time Verification",
      description: "Our AI continuously monitors copyright databases to ensure you have the most up-to-date information.",
      details: [
        "24/7 database monitoring",
        "Automatic status updates",
        "Change notifications",
        "Version tracking"
      ]
    },
    {
      icon: "🛡️",
      title: "Compliance Assurance",
      description: "Built-in safeguards and legal guidance to protect you from unintentional copyright infringement.",
      details: [
        "Risk assessment scoring",
        "Legal compliance checklists",
        "Documentation generation",
        "Audit trail maintenance"
      ]
    },
    {
      icon: "🔗",
      title: "Creative Tool Integration",
      description: "Seamlessly integrate with your favorite design and content creation tools for workflow efficiency.",
      details: [
        "Adobe Creative Suite plugin",
        "Browser extension",
        "API access for developers",
        "Bulk processing capabilities"
      ]
    }
  ]

  return (
    <Layout>
      <div className="pt-32 pb-20 px-4">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-20"
          >
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              <span className="gradient-text-primary">Features</span> that empower
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Everything you need to navigate copyright confidently, built with creators in mind.
            </p>
          </motion.div>

          {/* Features Grid */}
          <div className="space-y-20">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
                className={`grid lg:grid-cols-2 gap-12 items-center ${
                  index % 2 === 1 ? 'lg:grid-flow-col-dense' : ''
                }`}
              >
                {/* Content */}
                <div className={index % 2 === 1 ? 'lg:col-start-2' : ''}>
                  <div className="text-6xl mb-6">{feature.icon}</div>
                  <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900">
                    {feature.title}
                  </h2>
                  <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                    {feature.description}
                  </p>
                  <ul className="space-y-3">
                    {feature.details.map((detail, detailIndex) => (
                      <li key={detailIndex} className="flex items-start">
                        <svg className="w-5 h-5 text-brand-pink mt-1 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                        <span className="text-gray-700">{detail}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Visual */}
                <div className={index % 2 === 1 ? 'lg:col-start-1 lg:row-start-1' : ''}>
                  <div className="bg-gradient-to-br from-brand-pink/10 to-brand-purple/10 p-12 rounded-2xl">
                    <div className="aspect-square bg-white rounded-xl shadow-lg flex items-center justify-center">
                      <div className="text-8xl opacity-50">{feature.icon}</div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* CTA Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mt-32 bg-gradient-to-br from-brand-pink/10 to-brand-purple/10 p-16 rounded-3xl"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to experience <span className="gradient-text-primary">copyright clarity</span>?
            </h2>
            <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
              Join thousands of creators who are already using copyr.ai to work more confidently.
            </p>
            <Link 
              href="/#survey-container"
              className="inline-block bg-gradient-to-r from-brand-pink to-brand-purple text-white px-8 py-4 rounded-full font-medium text-lg hover:opacity-90 transition-opacity"
            >
              Join the waitlist
            </Link>
          </motion.div>
        </div>
      </div>
    </Layout>
  )
}
