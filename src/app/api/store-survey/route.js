import { google } from 'googleapis';

export async function POST(request) {
  try {
    const surveyData = await request.json();
    
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
    
    // Prepare row data - include all survey data except the final feedback call
    const timestamp = new Date().toISOString();
    const row = [
      timestamp,                                                    // A: Timestamp
      surveyData.email || '',                                      // B: Email
      surveyData.role === 'Other' ? surveyData.otherRole : surveyData.role || '', // C: Role
      surveyData.copyrightFrequency || '',                         // D: Copyright Frequency
      surveyData.confidenceLevel?.[0] || '',                       // E: Confidence Level
      Array.isArray(surveyData.frustrations) ? surveyData.frustrations.join(', ') : '', // F: Frustrations
      Array.isArray(surveyData.currentTools) ? surveyData.currentTools.join(', ') : '', // G: Current Tools
      surveyData.monthlySpend || '',                               // H: Monthly Spend
      surveyData.databaseValue || '',                              // I: Database Value
      Array.isArray(surveyData.interestedFeatures) ? surveyData.interestedFeatures.join(', ') : '', // J: Interested Features
      surveyData.earlyAccessInterest || '',                       // K: Early Access Interest
      '',                                                          // L: Feedback Call (empty for now, will be updated later)
    ];

    // Add data to Google Sheet
    const result = await sheets.spreadsheets.values.append({
      spreadsheetId: process.env.GOOGLE_SHEET_ID,
      range: 'A:L', // Simplified range without sheet name
      valueInputOption: 'RAW',
      requestBody: {
        values: [row],
      },
    });

    // Get the row number that was just inserted
    const range = result.data.updates.updatedRange;
    const rowNumber = range.split('!')[1].split(':')[0].replace(/\D/g, '');

    // Return success response with row number for future updates
    return Response.json({ 
      success: true, 
      message: 'Survey data stored successfully',
      rowNumber: parseInt(rowNumber)
    });

  } catch (error) {
    console.error('Survey storage error:', error);
    
    return Response.json({ 
      success: false, 
      message: 'Failed to store survey data' 
    }, { status: 500 });
  }
}
