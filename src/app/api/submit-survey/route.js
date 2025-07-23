import { google } from 'googleapis';

export async function POST(request) {
  try {
    const surveyData = await request.json();
    
    // Google Sheets service account credentials (stored in environment variables)
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
      scopes: ['https://www.googleapis.com/spreadsheets'],
    });

    const sheets = google.sheets({ version: 'v4', auth });
    
    // Prepare row data
    const timestamp = new Date().toISOString();
    const row = [
      timestamp,
      surveyData.email || '',
      surveyData.name || '',
      surveyData.company || '',
      surveyData.role || '',
      surveyData.industry || '',
      surveyData.copyrightChallenges || '',
      surveyData.currentTools || '',
      surveyData.timeSpent || '',
      surveyData.painPoints || '',
      surveyData.mostImportantFeature || '',
      surveyData.willingnessToPay || '',
      JSON.stringify(surveyData) // Full data as backup
    ];

    // Add data to Google Sheet
    await sheets.spreadsheets.values.append({
      spreadsheetId: process.env.GOOGLE_SHEET_ID,
      range: 'Sheet1!A:M', // Adjust range as needed
      valueInputOption: 'RAW',
      requestBody: {
        values: [row],
      },
    });

    // Return success response (no sensitive data)
    return Response.json({ 
      success: true, 
      message: 'Survey submitted successfully' 
    });

  } catch (error) {
    console.error('Survey submission error:', error);
    
    // Return generic error (no sensitive details)
    return Response.json({ 
      success: false, 
      message: 'Failed to submit survey' 
    }, { status: 500 });
  }
}
