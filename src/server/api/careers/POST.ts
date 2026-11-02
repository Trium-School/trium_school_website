import type { Request, Response } from 'express';
import { getEmailDeliveryFailureMessage, sendNotificationEmail } from '../../email-smtp.js';

export default async function handler(req: Request, res: Response) {
  const { name, email, phone, position, experience, message } = req.body as {
    name?: string;
    email?: string;
    phone?: string;
    position?: string;
    experience?: string;
    message?: string;
  };

  if (!name || !email || !position || !message) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  try {
    await sendNotificationEmail({
      recipientEnv: 'CAREERS_NOTIFICATION_EMAIL',
      fallbackRecipientEnv: 'NOTIFICATION_RECIPIENT_EMAIL',
      smtpPrefix: 'CONTACT',
      fromName: 'The Trium School Careers',
      subject: `New Career Application — ${position}`,
      replyTo: email,
      html: `
          <h2>New Career Application</h2>
          <table style="border-collapse:collapse;width:100%">
            <tr><td style="padding:8px;font-weight:bold">Name</td><td style="padding:8px">${name}</td></tr>
            <tr><td style="padding:8px;font-weight:bold">Email</td><td style="padding:8px">${email}</td></tr>
            <tr><td style="padding:8px;font-weight:bold">Phone</td><td style="padding:8px">${phone || 'Not provided'}</td></tr>
            <tr><td style="padding:8px;font-weight:bold">Position</td><td style="padding:8px">${position}</td></tr>
            <tr><td style="padding:8px;font-weight:bold">Experience</td><td style="padding:8px">${experience || 'Not specified'}</td></tr>
            <tr><td style="padding:8px;font-weight:bold">Cover Note</td><td style="padding:8px">${message.replace(/\n/g, '<br>')}</td></tr>
          </table>
      `,
    });
  } catch (err) {
    console.error('careers.email.failed', err);
    return res.status(502).json({ error: getEmailDeliveryFailureMessage(err) });
  }

  return res.status(201).json({ ok: true });
}
