import { google } from 'googleapis';

export async function POST(request) {
  try {
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
      scopes: ['https://www.googleapis.com/spreadsheets'],
    });

    const sheets = google.sheets({ version: 'v4', auth });
    
    // Check if sheet already has headers
    const existingData = await sheets.spreadsheets.values.get({
      spreadsheetId: process.env.GOOGLE_SHEET_ID,
      range: 'Sheet1!A1:L1',
    });

    if (existingData.data.values && existingData.data.values.length > 0) {
      return Response.json({ 
        success: true, 
        message: 'Headers already exist' 
      });
    }

    // Add headers
    const headers = [
      'Timestamp',
      'Email',
      'Role',
      'Copyright Frequency',
      'Confidence Level',
      'Frustrations',
      'Current Tools',
      'Monthly Spend',
      'Database Value',
      'Interested Features',
      'Early Access Interest',
      'Feedback Call'
    ];

    await sheets.spreadsheets.values.update({
      spreadsheetId: process.env.GOOGLE_SHEET_ID,
      range: 'Sheet1!A1:L1',
      valueInputOption: 'RAW',
      requestBody: {
        values: [headers],
      },
    });

    return Response.json({ 
      success: true, 
      message: 'Headers added successfully' 
    });

  } catch (error) {
    console.error('Setup headers error:', error);
    
    return Response.json({ 
      success: false, 
      message: 'Failed to setup headers' 
    }, { status: 500 });
  }
}
