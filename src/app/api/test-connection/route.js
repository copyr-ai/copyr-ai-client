import { google } from 'googleapis';

export async function GET() {
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
    
    // Try to read the sheet info (this requires minimal permissions)
    const response = await sheets.spreadsheets.get({
      spreadsheetId: process.env.GOOGLE_SHEET_ID,
    });

    return Response.json({ 
      success: true, 
      message: 'Google Sheets connection successful',
      sheetTitle: response.data.properties.title,
      serviceAccountEmail: process.env.GOOGLE_CLIENT_EMAIL
    });

  } catch (error) {
    console.error('Connection test error:', error);
    
    return Response.json({ 
      success: false, 
      message: 'Connection failed',
      error: error.message,
      serviceAccountEmail: process.env.GOOGLE_CLIENT_EMAIL,
      sheetId: process.env.GOOGLE_SHEET_ID
    }, { status: 500 });
  }
}
