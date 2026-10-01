import type { Request, Response } from 'express';
import { sendEmail } from '@/server/email';
import { getSecret } from '#airo/secrets';

export default async function handler(req: Request, res: Response) {
  try {
    const { name, email, phone, subject, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({ error: 'Name, email, and message are required.' });
    }

    const recipient = getSecret('NOTIFICATION_RECIPIENT_EMAIL') as string | undefined;
    if (recipient) {
      try {
        await sendEmail({
          fromName: 'The Trium School Website',
          to: recipient,
          subject: `Website Enquiry${subject ? ` — ${subject}` : ''} from ${name}`,
          html: `
          <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 24px;">
            <h2 style="color: #1B2A6B; margin-bottom: 4px;">New Website Enquiry</h2>
            <p style="color: #666; margin-top: 0;">Submitted via the Contact page on triumschool.in</p>
            <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;" />
            <table style="width: 100%; border-collapse: collapse;">
              <tr><td style="padding: 8px 0; color: #888; width: 30%;">Name</td><td style="padding: 8px 0; font-weight: 600; color: #1B2A6B;">${name}</td></tr>
              <tr><td style="padding: 8px 0; color: #888;">Email</td><td style="padding: 8px 0;"><a href="mailto:${email}" style="color: #1B2A6B;">${email}</a></td></tr>
              ${phone ? `<tr><td style="padding: 8px 0; color: #888;">Phone</td><td style="padding: 8px 0;"><a href="tel:${phone}" style="color: #1B2A6B;">${phone}</a></td></tr>` : ''}
              ${subject ? `<tr><td style="padding: 8px 0; color: #888;">Subject</td><td style="padding: 8px 0;">${subject}</td></tr>` : ''}
            </table>
            <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;" />
            <p style="color: #888; font-size: 12px; margin-bottom: 6px;">Message:</p>
            <p style="color: #333; line-height: 1.6; white-space: pre-wrap;">${message}</p>
          </div>
        `,
        });
      } catch (emailErr) {
        // Log but don't fail the request — message is still received
        console.error('contact.email.failed', emailErr);
      }
    }

    return res.status(201).json({ ok: true });
  } catch (error) {
    console.error('contact.post.error', error);
    return res.status(500).json({ error: 'Failed to send message.' });
  }
}
