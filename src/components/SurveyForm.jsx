'use client'

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Checkbox } from "@/components/ui/checkbox"
import { Slider } from "@/components/ui/slider"

export default function SurveyForm() {
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState({
    // Step 1: Role
    role: '',
    otherRole: '', // For "Other" option
    // Step 2: Copyright Frequency
    copyrightFrequency: '',
    // Step 3: Confidence Level
    confidenceLevel: [5],
    // Step 4: Frustrations
    frustrations: [],
    // Step 5: Current Tools
    currentTools: [],
    // Step 6: Monthly Spend
    monthlySpend: '',
    // Step 7: Database Value
    databaseValue: '',
    // Step 8: Feature Interest
    interestedFeatures: [],
    // Step 9: Early Access Interest
    earlyAccessInterest: '',
    // Step 10: Email
    email: '',
    // Step 11: Feedback Call
    feedbackCall: ''
  })

  const updateFormData = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const handleCheckboxChange = (field, value, checked) => {
    setFormData(prev => ({
      ...prev,
      [field]: checked 
        ? [...prev[field], value]
        : prev[field].filter(item => item !== value)
    }))
  }

  const nextStep = () => {
    if (currentStep < 11) {
      setCurrentStep(prev => prev + 1)
    }
  }

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1)
    }
  }

  const handleSubmit = async () => {
    // Temporarily bypass Google Sheets integration
    // TODO: Re-enable Google Sheets API when ready
    
    try {
      // Simulate successful submission
      console.log('Survey data (for development):', formData)
      
      // Show success message
      alert('🎉 Awesome! You have been added to the waitlist. We\'ll be in touch soon with exclusive early access!')
      
      // Reset form
      setCurrentStep(1)
      setFormData({
        role: '',
        otherRole: '',
        copyrightFrequency: '',
        confidenceLevel: [5],
        frustrations: [],
        currentTools: [],
        monthlySpend: '',
        databaseValue: '',
        interestedFeatures: [],
        earlyAccessInterest: '',
        email: '',
        feedbackCall: ''
      })
      
    } catch (error) {
      console.error('Error submitting survey:', error)
      alert('There was an error. Please try again.')
    }
    
    /* 
    // Original Google Sheets implementation (temporarily disabled)
    try {
      const response = await fetch('/api/submit-survey', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })
      
      const result = await response.json()
      
      if (response.ok && result.success) {
        alert('Thank you for joining our early access program! We\'ll be in touch soon.')
        setCurrentStep(1)
        setFormData({
          role: '',
          copyrightFrequency: '',
          confidenceLevel: [5],
          frustrations: [],
          currentTools: [],
          monthlySpend: '',
          databaseValue: '',
          interestedFeatures: [],
          earlyAccessInterest: '',
          email: '',
          feedbackCall: ''
        })
      } else {
        alert('There was an error. Please try again.')
      }
    } catch (error) {
      console.error('Error submitting survey:', error)
      alert('There was an error. Please try again.')
    }
    */
  }

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <motion.div
            key="step1"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-4"
          >
            <div className="text-center mb-4">
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-1">What is your current role?</h2>
              <p className="text-gray-600 text-xs sm:text-sm">Help us understand your background</p>
            </div>
            
            <RadioGroup value={formData.role} onValueChange={(value) => updateFormData('role', value)}>
              <div className="grid grid-cols-1 gap-2 max-w-3xl mx-auto">
                {[
                  'Creator (Artist, Writer, Musician)',
                  'Content Creator (YouTuber, Blogger, Influencer)',
                  'Legal Professional (Lawyer, Paralegal)',
                  'Researcher (Academic, Journalist)',
                  'Business Professional (Marketing, Publishing)',
                  'Student'
                ].map((role) => (
                  <motion.div 
                    key={role}
                    whileHover={{ scale: 1.01 }}
                    className="flex items-center space-x-3 p-2 sm:p-3 border rounded-lg hover:bg-gray-50 cursor-pointer"
                  >
                    <RadioGroupItem value={role} id={role} />
                    <Label htmlFor={role} className="cursor-pointer flex-1 text-xs sm:text-sm">{role}</Label>
                  </motion.div>
                ))}
                
                {/* Other option as input field */}
                <motion.div 
                  whileHover={{ scale: 1.01 }}
                  className="flex items-center space-x-3 p-2 sm:p-3 border rounded-lg hover:bg-gray-50 cursor-pointer"
                >
                  <RadioGroupItem value="Other" id="Other" />
                  {formData.role === 'Other' ? (
                    <Input
                      type="text"
                      value={formData.otherRole}
                      onChange={(e) => updateFormData('otherRole', e.target.value)}
                      placeholder="Please specify your role..."
                      className="flex-1 text-xs sm:text-sm h-6 border-0 bg-transparent p-0 focus:ring-0 focus:border-0 focus:outline-none focus-visible:ring-0 focus-visible:ring-offset-0 shadow-none"
                      style={{ boxShadow: 'none', border: 'none' }}
                      autoFocus
                    />
                  ) : (
                    <Label htmlFor="Other" className="cursor-pointer flex-1 text-xs sm:text-sm">Other</Label>
                  )}
                </motion.div>
              </div>
            </RadioGroup>
          </motion.div>
        )

      case 2:
        return (
          <motion.div
            key="step2"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-4"
          >
            <div className="text-center mb-4">
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-1">How often do you work with copyrighted content?</h2>
              <p className="text-gray-600 text-xs sm:text-sm">This helps us understand your use case</p>
            </div>
            
            <RadioGroup value={formData.copyrightFrequency} onValueChange={(value) => updateFormData('copyrightFrequency', value)}>
              <div className="grid grid-cols-1 gap-2 max-w-3xl mx-auto">
                {[
                  'Daily - It\'s a core part of my work',
                  'Weekly - Regularly but not constantly',
                  'Monthly - Occasionally for projects',
                  'Rarely - Only when specifically needed',
                  'Never - I don\'t work with copyrighted content'
                ].map((frequency) => (
                  <motion.div 
                    key={frequency}
                    whileHover={{ scale: 1.01 }}
                    className="flex items-center space-x-3 p-2 sm:p-3 border rounded-lg hover:bg-gray-50 cursor-pointer"
                  >
                    <RadioGroupItem value={frequency} id={frequency} />
                    <Label htmlFor={frequency} className="cursor-pointer flex-1 text-xs sm:text-sm leading-tight">{frequency}</Label>
                  </motion.div>
                ))}
              </div>
            </RadioGroup>
          </motion.div>
        )

      case 3:
        return (
          <motion.div
            key="step3"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            <div className="text-center mb-4">
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-1">How confident are you in determining copyright status?</h2>
              <p className="text-gray-600 text-xs sm:text-sm">Rate your confidence level</p>
            </div>
            
            <div className="max-w-md mx-auto">
              <div className="text-center mb-4">
                <span className="text-3xl sm:text-4xl font-bold text-[#EC4899]">{formData.confidenceLevel[0]}</span>
                <span className="text-lg sm:text-xl text-gray-400">/10</span>
              </div>
              <div className="px-4">
                <Slider
                  value={formData.confidenceLevel}
                  onValueChange={(value) => updateFormData('confidenceLevel', value)}
                  max={10}
                  min={1}
                  step={1}
                  className="w-full"
                />
                <div className="flex justify-between text-xs text-gray-500 mt-2">
                  <span>Not confident</span>
                  <span>Very confident</span>
                </div>
              </div>
            </div>
          </motion.div>
        )

      case 4:
        return (
          <motion.div
            key="step4"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-4"
          >
            <div className="text-center mb-4">
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-1">What frustrates you most about copyright?</h2>
              <p className="text-gray-600 text-xs sm:text-sm">Select all that apply</p>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-w-4xl mx-auto">
              {[
                'Unclear ownership information',
                'Time-consuming research process',
                'Risk of unintentional infringement',
                'High licensing costs',
                'Complex licensing terms',
                'Limited access to rights holders'
              ].map((frustration) => (
                <motion.div 
                  key={frustration}
                  whileHover={{ scale: 1.01 }}
                  className="flex items-center space-x-2 p-2 sm:p-3 border rounded-lg hover:bg-gray-50 cursor-pointer"
                >
                  <Checkbox
                    id={frustration}
                    checked={formData.frustrations.includes(frustration)}
                    onCheckedChange={(checked) => handleCheckboxChange('frustrations', frustration, checked)}
                  />
                  <Label htmlFor={frustration} className="cursor-pointer flex-1 text-xs sm:text-sm leading-tight">{frustration}</Label>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )

      case 5:
        return (
          <motion.div
            key="step5"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-4"
          >
            <div className="text-center mb-4">
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-1">What tools do you currently use for copyright research?</h2>
              <p className="text-gray-600 text-xs sm:text-sm">Select all that apply</p>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 max-w-4xl mx-auto">
              {[
                'Google/Manual web searches',
                'Copyright office databases',
                'Legal databases (Westlaw, LexisNexis)',
                'Stock photo/media platforms',
                'Creative Commons search',
                'Library archives',
                'Legal consultation',
                'None - I avoid copyrighted content',
                'Other'
              ].map((tool) => (
                <motion.div 
                  key={tool}
                  whileHover={{ scale: 1.01 }}
                  className="flex items-center space-x-2 p-2 border rounded-lg hover:bg-gray-50 cursor-pointer"
                >
                  <Checkbox
                    id={tool}
                    checked={formData.currentTools.includes(tool)}
                    onCheckedChange={(checked) => handleCheckboxChange('currentTools', tool, checked)}
                  />
                  <Label htmlFor={tool} className="cursor-pointer flex-1 text-xs sm:text-sm leading-tight">{tool}</Label>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )

      case 6:
        return (
          <motion.div
            key="step6"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-4"
          >
            <div className="text-center mb-4">
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-1">What do you typically spend monthly on copyright-related tools?</h2>
              <p className="text-gray-600 text-xs sm:text-sm">Include tools, services, and licensing costs</p>
            </div>
            
            <RadioGroup value={formData.monthlySpend} onValueChange={(value) => updateFormData('monthlySpend', value)}>
              <div className="grid grid-cols-1 gap-2 max-w-3xl mx-auto">
                {[
                  '$0 - I use only free resources',
                  '$1-50 - Basic tools and occasional licenses',
                  '$51-200 - Professional tools and regular licenses',
                  '$201-500 - Enterprise tools and frequent licensing',
                  '$500+ - Extensive licensing and specialized tools'
                ].map((spend) => (
                  <motion.div 
                    key={spend}
                    whileHover={{ scale: 1.01 }}
                    className="flex items-center space-x-3 p-2 sm:p-3 border rounded-lg hover:bg-gray-50 cursor-pointer"
                  >
                    <RadioGroupItem value={spend} id={spend} />
                    <Label htmlFor={spend} className="cursor-pointer flex-1 text-xs sm:text-sm">{spend}</Label>
                  </motion.div>
                ))}
              </div>
            </RadioGroup>
          </motion.div>
        )

      case 7:
        return (
          <motion.div
            key="step7"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-4"
          >
            <div className="text-center mb-4">
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-1">How valuable would a centralized copyright database be?</h2>
              <p className="text-gray-600 text-xs sm:text-sm">Think about your daily workflow</p>
            </div>
            
            <RadioGroup value={formData.databaseValue} onValueChange={(value) => updateFormData('databaseValue', value)}>
              <div className="grid grid-cols-1 gap-2 max-w-3xl mx-auto">
                {[
                  'Extremely valuable - Would transform my workflow',
                  'Very valuable - Would save significant time',
                  'Moderately valuable - Would be helpful',
                  'Somewhat valuable - Nice to have',
                  'Not valuable - Wouldn\'t change my process'
                ].map((value) => (
                  <motion.div 
                    key={value}
                    whileHover={{ scale: 1.01 }}
                    className="flex items-center space-x-3 p-2 sm:p-3 border rounded-lg hover:bg-gray-50 cursor-pointer"
                  >
                    <RadioGroupItem value={value} id={value} />
                    <Label htmlFor={value} className="cursor-pointer flex-1 text-xs sm:text-sm">{value}</Label>
                  </motion.div>
                ))}
              </div>
            </RadioGroup>
          </motion.div>
        )

      case 8:
        return (
          <motion.div
            key="step8"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-4"
          >
            <div className="text-center mb-4">
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-1">Which features interest you most?</h2>
              <p className="text-gray-600 text-xs sm:text-sm">Select up to 3 features • Selected: {formData.interestedFeatures.length}/3</p>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 max-w-4xl mx-auto">
              {[
                'Copyright status verification',
                'Public domain work discovery',
                'Rights holder contact information',
                'Licensing term explanations',
                'Usage rights calculator',
                'Automated compliance checking',
                'Integration with creative tools',
                'Legal document templates',
                'Expert consultation access'
              ].map((feature) => (
                <motion.div 
                  key={feature}
                  whileHover={{ scale: 1.01 }}
                  className="flex items-center space-x-2 p-2 border rounded-lg hover:bg-gray-50 cursor-pointer"
                >
                  <Checkbox
                    id={feature}
                    checked={formData.interestedFeatures.includes(feature)}
                    onCheckedChange={(checked) => {
                      if (checked && formData.interestedFeatures.length >= 3) {
                        return // Don't allow more than 3 selections
                      }
                      handleCheckboxChange('interestedFeatures', feature, checked)
                    }}
                    disabled={!formData.interestedFeatures.includes(feature) && formData.interestedFeatures.length >= 3}
                  />
                  <Label htmlFor={feature} className="cursor-pointer flex-1 text-xs sm:text-sm leading-tight">{feature}</Label>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )

      case 9:
        return (
          <motion.div
            key="step9"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-4"
          >
            <div className="text-center mb-4">
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-1">How interested are you in early access?</h2>
              <p className="text-gray-600 text-xs sm:text-sm">Shape the future with us!</p>
            </div>
            
            <RadioGroup value={formData.earlyAccessInterest} onValueChange={(value) => updateFormData('earlyAccessInterest', value)}>
              <div className="grid grid-cols-1 gap-2 max-w-3xl mx-auto">
                {[
                  { value: 'Very interested - I want to be first', emoji: '🚀', highlight: true },
                  { value: 'Interested - Keep me informed', emoji: '✨', highlight: false },
                  { value: 'Somewhat interested - Maybe later', emoji: '🤔', highlight: false },
                  { value: 'Just browsing - Not ready yet', emoji: '👀', highlight: false }
                ].map((interest) => (
                  <motion.div 
                    key={interest.value}
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                    className={`flex items-center space-x-3 p-2 sm:p-3 border rounded-lg hover:bg-gray-50 cursor-pointer transition-all ${
                      interest.highlight && (formData.earlyAccessInterest === '' || formData.earlyAccessInterest === interest.value)
                        ? 'border-[#EC4899] bg-gradient-to-r from-[#EC4899]/5 to-[#401BE3]/5' 
                        : 'border-gray-200'
                    } ${formData.earlyAccessInterest === interest.value ? 'ring-1 ring-[#EC4899] ring-opacity-50' : ''}`}
                  >
                    <RadioGroupItem value={interest.value} id={interest.value} />
                    <span className="text-lg">{interest.emoji}</span>
                    <Label htmlFor={interest.value} className="cursor-pointer flex-1 text-xs sm:text-sm font-medium">
                      {interest.value}
                    </Label>
                    {interest.highlight && (formData.earlyAccessInterest === '' || formData.earlyAccessInterest === interest.value) && (
                      <span className="text-xs text-[#EC4899] font-black">
                        ↑ <strong>TOP</strong>
                      </span>
                    )}
                  </motion.div>
                ))}
              </div>
            </RadioGroup>
          </motion.div>
        )

      case 10:
        return (
          <motion.div
            key="step10"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            <div className="text-center mb-6">
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-1">What's your email address?</h2>
              <p className="text-gray-600 text-xs sm:text-sm">Leave your email to be the first to try it, and for free!</p>
            </div>
            
            <div className="max-w-lg mx-auto">
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => updateFormData('email', e.target.value)}
                placeholder="your@email.com"
                className="text-sm sm:text-base p-2 sm:p-3 h-8 sm:h-10 text-center"
              />
            </div>
          </motion.div>
        )

      case 11:
        return (
          <motion.div
            key="step11"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-4"
          >
            <div className="text-center mb-4">
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-1">Would you join a feedback call?</h2>
              <p className="text-gray-600 text-xs sm:text-sm">Help us shape the product with your insights</p>
            </div>
            
            <RadioGroup value={formData.feedbackCall} onValueChange={(value) => updateFormData('feedbackCall', value)}>
              <div className="grid grid-cols-1 gap-2 max-w-3xl mx-auto">
                {[
                  'Yes, I\'d love to provide feedback',
                  'Maybe, depending on timing',
                  'No, but keep me updated on progress'
                ].map((option) => (
                  <motion.div 
                    key={option}
                    whileHover={{ scale: 1.01 }}
                    className="flex items-center space-x-3 p-2 sm:p-3 border rounded-lg hover:bg-gray-50 cursor-pointer"
                  >
                    <RadioGroupItem value={option} id={option} />
                    <Label htmlFor={option} className="cursor-pointer flex-1 text-xs sm:text-sm">{option}</Label>
                  </motion.div>
                ))}
              </div>
            </RadioGroup>
          </motion.div>
        )

      default:
        return null
    }
  }

  const isStepValid = () => {
    switch (currentStep) {
      case 1:
        return formData.role !== '' && (formData.role !== 'Other' || formData.otherRole.trim() !== '')
      case 2:
        return formData.copyrightFrequency !== ''
      case 3:
        return formData.confidenceLevel.length > 0
      case 4:
        return formData.frustrations.length > 0
      case 5:
        return formData.currentTools.length > 0
      case 6:
        return formData.monthlySpend !== ''
      case 7:
        return formData.databaseValue !== ''
      case 8:
        return formData.interestedFeatures.length > 0
      case 9:
        return formData.earlyAccessInterest !== ''
      case 10:
        return formData.email.trim() !== '' && formData.email.includes('@')
      case 11:
        return formData.feedbackCall !== ''
      default:
        return false
    }
  }

  return (
    <>
      <div className="h-[600px] bg-white p-3 sm:p-6 flex flex-col">
        {/* Progress indicator */}
        <div className="mb-4 sm:mb-6">
          <div className="flex justify-between items-center mb-2 sm:mb-3">
            <span className="text-xs font-medium text-gray-600">Step {currentStep} of 11</span>
            <span className="text-xs text-gray-500">{Math.round((currentStep / 11) * 100)}% complete</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-1.5">
            <div 
              className="bg-[#EC4899] h-1.5 rounded-full transition-all duration-300 ease-out"
              style={{ width: `${(currentStep / 11) * 100}%` }}
            ></div>
          </div>
        </div>

        {/* Form content */}
        <div className="flex-1 flex items-center justify-center overflow-hidden">
          <div className="w-full max-w-full px-2 sm:px-0">
            {renderStep()}
          </div>
        </div>

        {/* Navigation */}
        <div className="flex justify-between items-center pt-3 sm:pt-4">
          <Button
            onClick={prevStep}
            disabled={currentStep === 1}
            variant="outline"
            className="px-3 sm:px-4 text-xs sm:text-sm"
          >
            Back
          </Button>

          {currentStep < 11 ? (
            <Button
              onClick={nextStep}
              disabled={!isStepValid()}
              className="bg-[#EC4899] hover:bg-[#d63384] text-white px-3 sm:px-4 text-xs sm:text-sm"
            >
              Next
            </Button>
          ) : (
            <Button
              onClick={handleSubmit}
              disabled={!isStepValid()}
              className="bg-[#EC4899] hover:bg-[#d63384] text-white px-4 sm:px-6 text-xs sm:text-sm"
            >
              🚀 Join Early Access
            </Button>
          )}
        </div>
      </div>
    </>
  )
}
