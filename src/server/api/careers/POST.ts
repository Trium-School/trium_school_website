import type { Request, Response } from 'express';
import { sendEmail } from '../../email.js';
import { getSecret } from '#airo/secrets';

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

  const recipientRaw = getSecret('NOTIFICATION_RECIPIENT_EMAIL');
  const recipient = typeof recipientRaw === 'string' ? recipientRaw : undefined;
  if (recipient) {
    try {
      await sendEmail({
        to: recipient,
        subject: `New Career Application — ${position}`,
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
      console.error('Career application email failed (non-fatal):', err);
    }
  }

  return res.status(201).json({ ok: true });
}
