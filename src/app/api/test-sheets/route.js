import { google } from 'googleapis';

export async function GET(request) {
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
      scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    });

    const authClient = await auth.getClient();
    const sheets = google.sheets({ version: 'v4', auth: authClient });
    
    // Test: Try to read sheet properties
    const sheetInfo = await sheets.spreadsheets.get({
      spreadsheetId: process.env.GOOGLE_SHEET_ID,
    });

    // Also test if we can read/write to the sheet
    const testRead = await sheets.spreadsheets.values.get({
      spreadsheetId: process.env.GOOGLE_SHEET_ID,
      range: 'Sheet1!A1:L1',
    });

    return Response.json({ 
      success: true, 
      message: 'Google Sheets API connection successful',
      sheetTitle: sheetInfo.data.properties.title,
      testData: testRead.data.values || []
    });

  } catch (error) {
    console.error('Google Sheets test error:', error);
    
    return Response.json({ 
      success: false, 
      message: 'Google Sheets API connection failed',
      error: error.message,
      details: error.response?.data || 'No additional details'
    }, { status: 500 });
  }
}
