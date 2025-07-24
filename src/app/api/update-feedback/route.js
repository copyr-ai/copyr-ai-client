import { google } from 'googleapis';
import { sendWelcomeEmail } from '@/lib/emailUtils';

export async function POST(request) {
  try {
    const { rowNumber, feedbackCall, email, name } = await request.json();
    
    if (!rowNumber || !feedbackCall) {
      return Response.json({ 
        success: false, 
        message: 'Row number and feedback call response are required' 
      }, { status: 400 });
    }

    // Google Sheets service account credentials
    const credentials = {
      type: "service_account",
      project_id: process.env.GOOGLE_PROJECT_ID,
      private_key_id: process.env.GOOGLE_PRIVATE_KEY_ID,
      private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
      client_email: process.env.GOOGLE_CLIENT_EMAIL,
      client_id: process.env.GOOGLE_CLIENT_ID,
      auth_uri: "https://accounts.google.com/o/oauth2/auth",
      token_uri: "https://oauth2.googleapis.com/token",
      auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
      client_x509_cert_url: process.env.GOOGLE_CLIENT_CERT_URL
    };

    // Initialize Google Sheets API
    const auth = new google.auth.GoogleAuth({
      credentials,
      scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    });

    const authClient = await auth.getClient();
    const sheets = google.sheets({ version: 'v4', auth: authClient });
    
    // Update the feedback call column (column L) for the specific row
    await sheets.spreadsheets.values.update({
      spreadsheetId: process.env.GOOGLE_SHEET_ID,
      range: `L${rowNumber}`, // Simplified range without sheet name
      valueInputOption: 'RAW',
      requestBody: {
        values: [[feedbackCall]],
      },
    });

    // Send welcome email after successful feedback update (survey completion)
    if (email) {
      try {
        const emailResult = await sendWelcomeEmail(email, name || '', feedbackCall);
        if (!emailResult.success) {
          console.warn('Email sending failed:', emailResult.message);
        } else {
          console.log('Welcome email sent successfully to:', email);
        }
      } catch (emailError) {
        console.warn('Email sending failed:', emailError);
        // Don't fail the whole request if email fails
      }
    }

    return Response.json({ 
      success: true, 
      message: 'Feedback call response updated successfully' 
    });

  } catch (error) {
    console.error('Feedback call update error:', error);
    
    return Response.json({ 
      success: false, 
      message: 'Failed to update feedback call response' 
    }, { status: 500 });
  }
}
