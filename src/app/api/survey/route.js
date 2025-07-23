import { NextResponse } from 'next/server'

// This is a placeholder API route for the survey form
// In production, you would integrate this with FastAPI backend
export async function POST(request) {
  try {
    const formData = await request.json()
    
    // Validate required fields
    if (!formData.email) {
      return NextResponse.json(
        { error: 'Email is required' },
        { status: 400 }
      )
    }

    // Here you would typically:
    // 1. Send data to your FastAPI backend
    // 2. Store in Google Sheets via your backend
    // 3. Add email to waitlist
    
    console.log('Survey response received:', {
      email: formData.email,
      role: formData.role,
      contentFrequency: formData.contentFrequency,
      confidence: formData.confidence,
      frustrations: formData.frustrations,
      tools: formData.tools,
      monthlySpend: formData.monthlySpend,
      databaseValue: formData.databaseValue,
      features: formData.features,
      earlyAccessInterest: formData.earlyAccessInterest,
      feedbackCall: formData.feedbackCall,
      timestamp: new Date().toISOString()
    })

    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000))

    return NextResponse.json({ 
      success: true, 
      message: 'Survey response submitted successfully!' 
    })

  } catch (error) {
    console.error('Error processing survey:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
