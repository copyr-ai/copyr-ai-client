# Hostinger Deployment Guide for copyr.ai

## Step 1: Set up Email Service in Hostinger

1. **Login to Hostinger Control Panel**
2. **Go to Emails section**
3. **Create email account**: `hello@copyr.ai`
4. **Note down the email password** (you'll need this for SMTP_PASS)
5. **SMTP Settings for Hostinger:**
   - Host: `smtp.hostinger.com`
   - Port: `587`
   - Security: STARTTLS
   - Username: `hello@copyr.ai`
   - Password: Your email password

## Step 2: Install Dependencies

```bash
npm install nodemailer
```

## Step 3: Update Environment Variables

Update your `.env.local` with the email settings I've added above.

## Option A: Deploy as Static Site (Recommended for Hostinger Shared Hosting)

### 1. Configure Next.js for Static Export

Update `next.config.mjs`:

```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true
  }
};

export default nextConfig;
```

### 2. Update package.json scripts:

```json
{
  "scripts": {
    "build": "next build && next export",
    "export": "next export"
  }
}
```

### 3. Build and Deploy:

```bash
npm run build
```

This creates an `out` folder. Upload the contents to your Hostinger public_html folder.

## Option B: Deploy with Node.js (If Hostinger supports it)

### 1. Check if your Hostinger plan supports Node.js
- Business or Premium plans usually support Node.js
- Shared hosting might not support server-side APIs

### 2. If Node.js is supported:

```bash
npm run build
npm start
```

## Step 4: Alternative Email Solutions (If Hostinger email doesn't work)

### Use a Third-party Email Service

Update your environment variables to use services like:

**SendGrid:**
```bash
SMTP_HOST=smtp.sendgrid.net
SMTP_PORT=587
SMTP_USER=apikey
SMTP_PASS=your_sendgrid_api_key
```

**Mailgun:**
```bash
SMTP_HOST=smtp.mailgun.org
SMTP_PORT=587
SMTP_USER=your_mailgun_username
SMTP_PASS=your_mailgun_password
```

## Step 5: Domain Configuration

1. **Update DNS in Hostinger:**
   - Point your domain to Hostinger's servers
   - Set up A records and CNAME as needed

2. **SSL Certificate:**
   - Enable free SSL in Hostinger control panel

## Step 6: Testing

1. Upload your site
2. Test the survey form
3. Check if emails are being sent
4. Verify Google Sheets integration

## Troubleshooting

### If emails don't work:
1. Check SMTP credentials
2. Verify email account is active
3. Check Hostinger's email limits
4. Consider using SendGrid or Mailgun as fallback

### If API routes don't work:
1. Use static export mode
2. Consider upgrading to Business/VPS plan for Node.js support

## File Structure for Upload:
```
public_html/
├── _next/
├── images/
├── index.html
├── about/
├── features/
└── ... (all exported files)
```
