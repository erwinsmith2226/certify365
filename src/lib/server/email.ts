import { Resend } from 'resend';
import { env } from '$env/dynamic/private';

const resend = env.RESEND_API_KEY ? new Resend(env.RESEND_API_KEY) : null;

// Defaults for public env vars if not set
const APP_NAME = 'Certify365';
const APP_URL = env.PUBLIC_APP_URL || 'http://localhost:5173';

interface SendEmailOptions {
	to: string | string[];
	subject: string;
	html: string;
	text?: string;
	replyTo?: string;
}

export async function sendEmail(options: SendEmailOptions): Promise<{ success: boolean; error?: string }> {
	if (!resend) {
		console.warn('Email not configured - RESEND_API_KEY missing');
		return { success: false, error: 'Email service not configured' };
	}

	try {
		const { error } = await resend.emails.send({
			from: env.EMAIL_FROM || `${APP_NAME} <noreply@certify365.com>`,
			to: Array.isArray(options.to) ? options.to : [options.to],
			subject: options.subject,
			html: options.html,
			text: options.text,
			replyTo: options.replyTo
		});

		if (error) {
			console.error('Failed to send email:', error);
			return { success: false, error: error.message };
		}

		return { success: true };
	} catch (err) {
		console.error('Email error:', err);
		return { success: false, error: err instanceof Error ? err.message : 'Unknown error' };
	}
}

// ===========================================
// Email Templates
// ===========================================

export function welcomeEmail(userName: string, organizationName: string): { subject: string; html: string } {
	return {
		subject: `Welcome to ${APP_NAME}!`,
		html: `
<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #333; }
    .container { max-width: 600px; margin: 0 auto; padding: 20px; }
    .header { background: linear-gradient(135deg, #0a0e1a 0%, #141b2d 100%); padding: 30px; text-align: center; border-radius: 8px 8px 0 0; }
    .header h1 { color: #00d4ff; margin: 0; }
    .content { background: #f9fafb; padding: 30px; border-radius: 0 0 8px 8px; }
    .button { display: inline-block; background: #00d4ff; color: #0a0e1a; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: 600; }
    .footer { text-align: center; margin-top: 20px; color: #666; font-size: 14px; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>🎓 ${APP_NAME}</h1>
    </div>
    <div class="content">
      <h2>Welcome, ${userName}!</h2>
      <p>You've been added to <strong>${organizationName}</strong> on ${APP_NAME}.</p>
      <p>Get started by:</p>
      <ul>
        <li>Exploring your assigned courses</li>
        <li>Setting up your profile</li>
        <li>Checking out the learning paths</li>
      </ul>
      <p style="text-align: center; margin-top: 30px;">
        <a href="${APP_URL}/dashboard" class="button">Go to Dashboard</a>
      </p>
    </div>
    <div class="footer">
      <p>© ${new Date().getFullYear()} ${APP_NAME}. All rights reserved.</p>
    </div>
  </div>
</body>
</html>`
	};
}

export function courseEnrollmentEmail(
	userName: string,
	courseName: string,
	dueDate?: Date
): { subject: string; html: string } {
	return {
		subject: `You've been enrolled in: ${courseName}`,
		html: `
<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #333; }
    .container { max-width: 600px; margin: 0 auto; padding: 20px; }
    .header { background: linear-gradient(135deg, #0a0e1a 0%, #141b2d 100%); padding: 30px; text-align: center; border-radius: 8px 8px 0 0; }
    .header h1 { color: #00d4ff; margin: 0; font-size: 20px; }
    .content { background: #f9fafb; padding: 30px; border-radius: 0 0 8px 8px; }
    .course-card { background: white; border: 1px solid #e5e7eb; border-radius: 8px; padding: 20px; margin: 20px 0; }
    .button { display: inline-block; background: #00d4ff; color: #0a0e1a; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: 600; }
    .due-date { background: #fef3c7; color: #92400e; padding: 8px 12px; border-radius: 4px; display: inline-block; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>📚 New Course Assignment</h1>
    </div>
    <div class="content">
      <p>Hi ${userName},</p>
      <p>You've been enrolled in a new course:</p>
      <div class="course-card">
        <h3 style="margin-top: 0;">${courseName}</h3>
        ${dueDate ? `<p class="due-date">📅 Due: ${dueDate.toLocaleDateString()}</p>` : ''}
      </div>
      <p style="text-align: center; margin-top: 30px;">
        <a href="${APP_URL}/courses" class="button">Start Learning</a>
      </p>
    </div>
  </div>
</body>
</html>`
	};
}

export function certificateIssuedEmail(
	userName: string,
	courseName: string,
	certificateUrl: string,
	verificationCode: string
): { subject: string; html: string } {
	return {
		subject: `🎉 Certificate Earned: ${courseName}`,
		html: `
<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #333; }
    .container { max-width: 600px; margin: 0 auto; padding: 20px; }
    .header { background: linear-gradient(135deg, #10b981 0%, #059669 100%); padding: 30px; text-align: center; border-radius: 8px 8px 0 0; }
    .header h1 { color: white; margin: 0; }
    .content { background: #f9fafb; padding: 30px; border-radius: 0 0 8px 8px; }
    .certificate-preview { background: white; border: 2px solid #10b981; border-radius: 8px; padding: 30px; margin: 20px 0; text-align: center; }
    .button { display: inline-block; background: #10b981; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: 600; margin: 5px; }
    .verification { background: #f3f4f6; padding: 12px; border-radius: 4px; font-family: monospace; margin-top: 20px; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>🏆 Congratulations!</h1>
    </div>
    <div class="content">
      <p>Hi ${userName},</p>
      <p>You've successfully completed <strong>${courseName}</strong> and earned your certificate!</p>
      <div class="certificate-preview">
        <h2 style="color: #10b981; margin-top: 0;">Certificate of Completion</h2>
        <p style="font-size: 18px;">${courseName}</p>
        <p style="color: #666;">Awarded to ${userName}</p>
      </div>
      <p style="text-align: center;">
        <a href="${certificateUrl}" class="button">View Certificate</a>
        <a href="${APP_URL}/verify/${verificationCode}" class="button" style="background: #6b7280;">Verify</a>
      </p>
      <div class="verification">
        <strong>Verification Code:</strong> ${verificationCode}
      </div>
    </div>
  </div>
</body>
</html>`
	};
}

export function courseReminderEmail(
	userName: string,
	courseName: string,
	daysRemaining: number
): { subject: string; html: string } {
	const urgency = daysRemaining <= 3 ? '🚨' : daysRemaining <= 7 ? '⏰' : '📅';
	return {
		subject: `${urgency} Reminder: ${courseName} due in ${daysRemaining} day${daysRemaining === 1 ? '' : 's'}`,
		html: `
<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #333; }
    .container { max-width: 600px; margin: 0 auto; padding: 20px; }
    .header { background: ${daysRemaining <= 3 ? '#ef4444' : '#f59e0b'}; padding: 20px; text-align: center; border-radius: 8px 8px 0 0; }
    .header h1 { color: white; margin: 0; font-size: 18px; }
    .content { background: #f9fafb; padding: 30px; border-radius: 0 0 8px 8px; }
    .button { display: inline-block; background: #00d4ff; color: #0a0e1a; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: 600; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>${urgency} Course Deadline Approaching</h1>
    </div>
    <div class="content">
      <p>Hi ${userName},</p>
      <p>This is a reminder that <strong>${courseName}</strong> is due in <strong>${daysRemaining} day${daysRemaining === 1 ? '' : 's'}</strong>.</p>
      <p>Don't miss your deadline — continue where you left off:</p>
      <p style="text-align: center; margin-top: 30px;">
        <a href="${APP_URL}/courses" class="button">Continue Course</a>
      </p>
    </div>
  </div>
</body>
</html>`
	};
}

export function isEmailConfigured(): boolean {
	return !!resend;
}
