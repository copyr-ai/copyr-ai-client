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
  const [surveyRowNumber, setSurveyRowNumber] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [loadingStage, setLoadingStage] = useState(0) // 0: normal, 1: almost there, 2: bonus question
  const [showThankYou, setShowThankYou] = useState(false)
  const [isCopied, setIsCopied] = useState(false)
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

  const nextStep = async () => {
    if (currentStep < 11) {
      // If moving from step 10 to 11, store the survey data in Google Sheets
      if (currentStep === 10) {
        setIsLoading(true)
        setLoadingStage(1) // "Almost there..."
        
        // First stage delay
        setTimeout(() => {
          setLoadingStage(2) // "Bonus question coming up..."
        }, 1000)
        
        try {
          const response = await fetch('/api/store-survey', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
          })

          const result = await response.json()
          
          if (result.success) {
            setSurveyRowNumber(result.rowNumber)
            // Small delay before moving to next step for better UX
            setTimeout(() => {
              setCurrentStep(prev => prev + 1)
              setIsLoading(false)
              setLoadingStage(0)
            }, 800)
          } else {
            // alert ('Failed to save your survey data. Please try again.')
            setIsLoading(false)
            setLoadingStage(0)
          }
        } catch (error) {
          console.error('Error storing survey data:', error)
          // alert ('Network error. Please check your connection and try again.')
          setIsLoading(false)
          setLoadingStage(0)
        }
      } else {
        // Check if we need to show an interactive slide
        if (currentStep === 3) {
          // Show slide after confidence question
          setCurrentStep('slide1')
        } else if (currentStep === 6) {
          // Show slide after monthly spend question
          setCurrentStep('slide2')
        } else if (currentStep === 9) {
          // Show slide after early access question
          setCurrentStep('slide3')
        } else {
          setCurrentStep(prev => prev + 1)
        }
      }
    }
  }

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1)
    }
  }

  const handleSubmit = async () => {
    // Update the feedback call response in the Google Sheet
    if (!surveyRowNumber) {
      // alert ('Error: Survey data not found. Please restart the survey.')
      return
    }

    setIsLoading(true)
    try {
      const response = await fetch('/api/update-feedback', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          rowNumber: surveyRowNumber,
          feedbackCall: formData.feedbackCall
        }),
      })

      const result = await response.json()
      
      if (result.success) {
        // Show thank you screen
        setShowThankYou(true)
      } else {
        // alert ('Failed to complete your survey submission. Please try again.')
      }
      
    } catch (error) {
      console.error('Error updating feedback response:', error)
      // alert ('Network error. Please check your connection and try again.')
    } finally {
      setIsLoading(false)
    }
  }

  const resetForm = () => {
    setCurrentStep(1)
    setSurveyRowNumber(null)
    setShowThankYou(false)
    setIsLoading(false)
    setLoadingStage(0)
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
  }

  const ThankYouScreen = () => {
    const shareUrl = window.location.origin
    const linkedinPostText = `I just completed an interesting survey about copyright challenges in creative work. 

If you're a creator, content producer, or work with copyrighted materials, this quick survey could help shape the future of copyright protection tools.

Worth checking out if you've ever struggled with:
🔍 Finding copyright ownership info
⚖️ Understanding licensing terms  
🛡️ Avoiding accidental infringement
💡 Streamlining copyright research

Take the survey: ${shareUrl}

#Copyright #CreativeWork #IntellectualProperty #ContentCreation`
    
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center space-y-8 max-w-2xl mx-auto p-6"
      >
        {/* Logo and Success Animation */}
        <div className="space-y-4">
          <div className="flex justify-center mb-4">
            <img 
              src="/brand-copyr.ai-light.svg" 
              alt="CopyR.AI" 
              className="h-12 w-auto"
            />
          </div>
        </div>

        {/* Thank You Message */}
        <div className="space-y-4">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">
            Thank You!
          </h2>
          <div className="bg-gradient-to-r from-[#EC4899] to-[#401BE3] bg-clip-text text-transparent">
            <p className="text-xl font-semibold">
              You've been promoted to our exclusive early access list! 🚀
            </p>
          <p className="text-gray-600">
            We'll be in touch soon with your <strong>free early access</strong> with copyright protection tools.
          </p>
          </div>
        </div>

        {/* Share Section */}
        <div className="bg-gray-50 rounded-xl p-6 space-y-4">
          <h3 className="text-xl font-semibold text-gray-900">
            Know someone who needs copyright protection?
          </h3>
          <p className="text-sm text-gray-600 mb-4">
            Help other creators discover AI-powered copyright tools
          </p>
          
          {/* Share Buttons */}
          <div className="flex flex-col sm:flex-row justify-center gap-3">
            <Button
              onClick={async () => {
                if (navigator.share) {
                  try {
                    await navigator.share({
                      title: 'Copyright Survey - Help Shape AI-Powered Copyright Tools',
                      text: 'Take this quick survey about copyright challenges in creative work. Help shape the future of copyright protection tools!',
                      url: shareUrl
                    })
                  } catch (error) {
                    // User cancelled or error occurred, fallback to clipboard
                    navigator.clipboard.writeText(shareUrl)
                    // alert ('✅ Survey link copied to clipboard!\n\nShare it with anyone who works with copyrighted content.')
                  }
                } else {
                  // Fallback for browsers that don't support Web Share API
                  navigator.clipboard.writeText(shareUrl)
                  // alert ('✅ Survey link copied to clipboard!\n\nShare it with anyone who works with copyrighted content.')
                }
              }}
              className="bg-blue-700 hover:bg-blue-800 text-white flex items-center justify-center gap-2 px-6 py-3"
            >
              <span className="text-lg">📤</span>
              Share Survey
            </Button>
            
            <Button
              onClick={() => {
                navigator.clipboard.writeText(shareUrl)
                setIsCopied(true)
                setTimeout(() => {
                  setIsCopied(false)
                }, 2000)
              }}
              variant="outline"
              className="border-gray-300 hover:bg-gray-50 flex items-center justify-center gap-2 px-6 py-3"
            >
              <span className="text-lg">{isCopied ? '✅' : '🔗'}</span>
              {isCopied ? 'Copied!' : 'Copy Survey Link'}
            </Button>
          </div>
        </div>

        {/* Start Over Button */}
        <div className="pt-4">
          <Button
            onClick={resetForm}
            variant="outline"
            className="text-gray-600 hover:text-gray-800 border-gray-300"
          >
            Take Survey Again
          </Button>
        </div>
      </motion.div>
    )
  }

  const renderSlide = (slideNumber) => {
    const slides = {
      slide1: {
        title: "Great start!",
        subtitle: "You're helping shape the future of copyright clarity",
        description: "Now let's dive deeper into your specific challenges and needs",
        icon: "🚀",
        gradient: "from-blue-500 to-purple-600"
      },
      slide2: {
        title: "Perfect!",
        subtitle: "Understanding your investment helps us create better value",
        description: "Next, let's explore what features would be most valuable to you",
        icon: "💡",
        gradient: "from-green-500 to-teal-600"
      },
      slide3: {
        title: "Almost there!",
        subtitle: "Your insights are incredibly valuable to us",
        description: "Just a couple more questions and you'll be all set",
        icon: "🌟",
        gradient: "from-pink-500 to-rose-600"
      }
    }

    const slide = slides[slideNumber]
    
    return (
      <motion.div
        key={slideNumber}
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 1.1, y: -20 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="flex flex-col items-center justify-center h-full text-center space-y-8"
      >
        {/* Animated Icon */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, duration: 0.5, type: "spring", stiffness: 200 }}
          className={`text-6xl sm:text-7xl mb-4`}
        >
          {slide.icon}
        </motion.div>

        {/* Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="space-y-4 max-w-2xl mx-auto"
        >
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">
            {slide.title}
          </h2>
          
          <div className={`bg-gradient-to-r ${slide.gradient} bg-clip-text text-transparent`}>
            <p className="text-xl sm:text-2xl font-semibold">
              {slide.subtitle}
            </p>
          </div>
          
          <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
            {slide.description}
          </p>
        </motion.div>

        {/* Animated Continue Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.5 }}
        >
          <Button
            onClick={() => {
              if (slideNumber === 'slide1') setCurrentStep(4)
              else if (slideNumber === 'slide2') setCurrentStep(7)
              else if (slideNumber === 'slide3') setCurrentStep(10)
            }}
            className="bg-gradient-to-r from-[#EC4899] to-[#401BE3] hover:from-[#EC4899]/90 hover:to-[#401BE3]/90 text-white font-semibold px-8 py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
          >
            Continue ✨
          </Button>
        </motion.div>

        {/* Progress Dots */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.5 }}
          className="flex space-x-2"
        >
          {[1, 2, 3].map((dot) => (
            <div
              key={dot}
              className={`w-2 h-2 rounded-full transition-colors duration-300 ${
                (slideNumber === 'slide1' && dot === 1) ||
                (slideNumber === 'slide2' && dot === 2) ||
                (slideNumber === 'slide3' && dot === 3)
                  ? 'bg-[#EC4899]'
                  : 'bg-gray-300'
              }`}
            />
          ))}
        </motion.div>
      </motion.div>
    )
  }

  const renderStep = () => {
    // Handle interactive slides
    if (typeof currentStep === 'string' && currentStep.startsWith('slide')) {
      return renderSlide(currentStep)
    }

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
                  { text: 'Daily - It\'s a core part of my work', bold: 'Daily' },
                  { text: 'Weekly - Regularly but not constantly', bold: 'Weekly' },
                  { text: 'Monthly - Occasionally for projects', bold: 'Monthly' },
                  { text: 'Rarely - Only when specifically needed', bold: 'Rarely' },
                  { text: 'Never - I don\'t work with copyrighted content', bold: 'Never' }
                ].map((frequency) => (
                  <motion.div 
                    key={frequency.text}
                    whileHover={{ scale: 1.01 }}
                    className="flex items-center space-x-3 p-2 sm:p-3 border rounded-lg hover:bg-gray-50 cursor-pointer"
                  >
                    <RadioGroupItem value={frequency.text} id={frequency.text} />
                    <Label htmlFor={frequency.text} className="cursor-pointer flex-1 text-xs sm:text-sm leading-tight">
                      <span className="font-bold">{frequency.bold}</span>
                      {frequency.text.substring(frequency.bold.length)}
                    </Label>
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
                'None - I avoid copyrighted content'
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
              
              {/* Other option with input field */}
              <motion.div 
                whileHover={{ scale: 1.01 }}
                className="flex items-center space-x-2 p-2 border rounded-lg hover:bg-gray-50 cursor-pointer"
              >
                <Checkbox
                  id="Other"
                  checked={formData.currentTools.includes('Other') || formData.currentTools.some(tool => tool.startsWith('Other: '))}
                  onCheckedChange={(checked) => {
                    if (checked) {
                      handleCheckboxChange('currentTools', 'Other', true)
                    } else {
                      // Remove both "Other" and any "Other: ..." entries
                      setFormData(prev => ({
                        ...prev,
                        currentTools: prev.currentTools.filter(tool => tool !== 'Other' && !tool.startsWith('Other: '))
                      }))
                    }
                  }}
                />
                {formData.currentTools.includes('Other') || formData.currentTools.some(tool => tool.startsWith('Other: ')) ? (
                  <Input
                    type="text"
                    value={formData.currentTools.find(tool => tool.startsWith('Other: '))?.replace('Other: ', '') || ''}
                    onChange={(e) => {
                      const otherValue = e.target.value
                      setFormData(prev => ({
                        ...prev,
                        currentTools: [
                          ...prev.currentTools.filter(tool => tool !== 'Other' && !tool.startsWith('Other: ')),
                          otherValue ? `Other: ${otherValue}` : 'Other'
                        ]
                      }))
                    }}
                    placeholder="Please specify..."
                    className="flex-1 text-xs sm:text-sm h-6 border-0 bg-transparent p-0 focus:ring-0 focus:border-0 focus:outline-none focus-visible:ring-0 focus-visible:ring-offset-0 shadow-none"
                    style={{ boxShadow: 'none', border: 'none' }}
                    autoFocus
                  />
                ) : (
                  <Label htmlFor="Other" className="cursor-pointer flex-1 text-xs sm:text-sm leading-tight">Other</Label>
                )}
              </motion.div>
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
    // Slides are always valid (auto-advance)
    if (typeof currentStep === 'string' && currentStep.startsWith('slide')) {
      return true
    }

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
      {showThankYou ? (
        <div className="h-[600px] bg-white p-3 sm:p-6 flex items-center justify-center">
          <ThankYouScreen />
        </div>
      ) : (
        <div className="h-[600px] bg-white p-3 sm:p-6 flex flex-col">
          {/* Progress indicator */}
          <div className="mb-4 sm:mb-6">
            <div className="flex justify-between items-center mb-2 sm:mb-3">
              <span className="text-xs font-medium text-gray-600">
                {typeof currentStep === 'string' && currentStep.startsWith('slide') 
                  ? `Insight ${currentStep.replace('slide', '')}/3` 
                  : `Step ${currentStep} of 11`}
              </span>
              <span className="text-xs text-gray-500">
                {typeof currentStep === 'string' && currentStep.startsWith('slide')
                  ? 'Interactive insight'
                  : `${Math.round((currentStep / 11) * 100)}% complete`}
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-1.5">
            <div 
              className="bg-[#EC4899] h-1.5 rounded-full transition-all duration-300 ease-out"
              style={{ 
                width: typeof currentStep === 'string' && currentStep.startsWith('slide')
                  ? '50%' // Show 50% for slides
                  : `${(currentStep / 11) * 100}%` 
              }}
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
          {/* Hide back button on slides for cleaner experience */}
          {!(typeof currentStep === 'string' && currentStep.startsWith('slide')) && (
            <Button
              onClick={prevStep}
              disabled={currentStep === 1}
              variant="outline"
              className="px-3 sm:px-4 text-xs sm:text-sm"
            >
              Back
            </Button>
          )}
          
          {/* Add spacer when back button is hidden */}
          {typeof currentStep === 'string' && currentStep.startsWith('slide') && <div></div>}

          {/* Hide next button on slides since they have their own continue button */}
          {!(typeof currentStep === 'string' && currentStep.startsWith('slide')) && currentStep < 11 && (
            <Button
              onClick={nextStep}
              disabled={!isStepValid() || isLoading}
              className="bg-[#EC4899] hover:bg-[#d63384] text-white px-3 sm:px-4 text-xs sm:text-sm"
            >
              {isLoading && currentStep === 10 ? (
                <span className="flex items-center gap-2">
                  {loadingStage === 1 ? (
                    <>
                      <span className="animate-pulse">⏳</span>
                      Almost there...
                    </>
                  ) : loadingStage === 2 ? (
                    <>
                      <span className="animate-pulse">🎯</span>
                      Bonus question coming up...
                    </>
                  ) : (
                    'Next'
                  )}
                </span>
              ) : 'Next'}
            </Button>
          )}
          
          {currentStep === 11 && (
            <Button
              onClick={handleSubmit}
              disabled={!isStepValid() || isLoading}
              className="bg-[#EC4899] hover:bg-[#d63384] text-white px-4 sm:px-6 text-xs sm:text-sm"
            >
              {isLoading ? (
                <span className="flex items-center gap-2">
                  <span className="animate-spin">🎉</span>
                  Finalizing...
                </span>
              ) : '🚀 Join Early Access'}
            </Button>
          )}
        </div>
      </div>
      )}
    </>
  )
}
