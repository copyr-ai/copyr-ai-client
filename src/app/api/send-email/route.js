import { sendWelcomeEmail } from '@/lib/emailUtils';

export async function POST(request) {
  try {
    const { email, name, feedbackOption } = await request.json();

    if (!email) {
      return Response.json({ 
        success: false, 
        message: 'Email is required' 
      }, { status: 400 });
    }

    const result = await sendWelcomeEmail(email, name, feedbackOption);
    
    if (result.success) {
      return Response.json(result);
    } else {
      return Response.json(result, { status: 500 });
    }

  } catch (error) {
    console.error('Email API error:', error);
    
    return Response.json({ 
      success: false, 
      message: 'Failed to send email' 
    }, { status: 500 });
  }
}
