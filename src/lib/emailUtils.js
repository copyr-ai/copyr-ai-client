import nodemailer from 'nodemailer';

// Email templates
const getWaitlistEmail = (name, feedbackOption) => {
  const baseEmail = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f9fafb;">
      <div style="background-color: white; padding: 40px; border-radius: 12px; box-shadow: 0 4px 12px rgba(0,0,0,0.1);">
        <!-- Header -->
        <div style="text-align: center; margin-bottom: 40px;">
          <h1 style="color: #1f2937; font-size: 28px; margin: 0;">
            Welcome to copyr.ai
          </h1>
          <div style="width: 60px; height: 4px; background: linear-gradient(to right, #EC4899, #401BE3); margin: 20px auto;"></div>
        </div>

        <!-- Main Content -->
        <div style="color: #4b5563; line-height: 1.6; font-size: 16px;">
          <p>Hi,</p>
          
          <p>🎉 <strong>Congratulations!</strong> You've been successfully added to the copyr.ai waitlist.</p>
          
          <p>Thank you for taking the time to complete our survey. Your insights are invaluable in helping us build a tool that truly serves creators like you.</p>
          
          <div style="background-color: #f3f4f6; padding: 20px; border-radius: 8px; margin: 30px 0;">
            <h3 style="color: #1f2937; margin-top: 0;">What's Next?</h3>
            <ul style="margin: 0; padding-left: 20px;">
              <li>We'll keep you updated on our progress</li>
              <li>You'll be among the first to access copyr.ai when we launch</li>
              <li>Expect exclusive early-bird pricing and features</li>
            </ul>
          </div>
  `;

  const feedbackSection = feedbackOption === 'Yes, I\'d love to provide feedback' || feedbackOption === 'Maybe, depending on timing' ? `
          <div style="background-color: #fef3c7; border-left: 4px solid #f59e0b; padding: 20px; margin: 30px 0;">
            <h3 style="color: #92400e; margin-top: 0;">📅 Want to Share More Feedback?</h3>
            <p style="color: #92400e; margin-bottom: 15px;">Since you're interested in providing feedback, we'd love to chat with you!</p>
            <a href="${process.env.CALENDLY_LINK || 'https://calendly.com/hello-copyr/30min'}" 
               style="display: inline-block; background-color: #f59e0b; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: bold;">
              Schedule a 30-minute Call
            </a>
            <p style="color: #92400e; font-size: 14px; margin-top: 10px; margin-bottom: 0;">
              This is completely optional, but your insights would be incredibly valuable!
            </p>
          </div>
  ` : '';

  const footer = `
          <p>If you have any questions or just want to say hi, feel free to reply to this email. We'd love to hear from you!</p>
          
          <p>Best regards,<br>
          <strong>The copyr.ai Team</strong></p>
        </div>

        <!-- Footer -->
        <div style="margin-top: 40px; padding-top: 30px; border-top: 1px solid #e5e7eb; text-align: center;">
          <p style="color: #9ca3af; font-size: 14px; margin: 0;">
            © 2025 copyr.ai. All rights reserved.
          </p>
          <div style="margin-top: 20px;">
            <a href="https://linkedin.com/company/copyr-ai" style="text-decoration: none; margin: 0 10px;">
              <span style="color: #6b7280;">LinkedIn</span>
            </a>
            <a href="https://www.instagram.com/copyr.ai/" style="text-decoration: none; margin: 0 10px;">
              <span style="color: #6b7280;">Instagram</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  `;

  return baseEmail + feedbackSection + footer;
};

export async function sendWelcomeEmail(email, name, feedbackOption) {
  try {
    if (!email) {
      throw new Error('Email is required');
    }

    // Create nodemailer transporter
    const transporter = nodemailer.createTransporter({
      host: process.env.SMTP_HOST, // e.g., 'smtp.hostinger.com'
      port: process.env.SMTP_PORT || 587,
      secure: process.env.SMTP_PORT == 465, // true for 465, false for other ports
      auth: {
        user: process.env.SMTP_USER, // your email
        pass: process.env.SMTP_PASS, // your email password or app password
      },
    });

    // Email options
    const mailOptions = {
      from: `"copyr.ai Team" <${process.env.SMTP_USER}>`,
      to: email,
      subject: '🎉 Welcome to copyr.ai - You\'re on the waitlist!',
      html: getWaitlistEmail(name, feedbackOption),
      replyTo: 'hello@copyr.ai'
    };

    // Send email
    await transporter.sendMail(mailOptions);

    return { success: true, message: 'Email sent successfully' };

  } catch (error) {
    console.error('Email sending error:', error);
    return { success: false, message: 'Failed to send email', error: error.message };
  }
}