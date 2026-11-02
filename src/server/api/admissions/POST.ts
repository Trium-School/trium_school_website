import type { Request, Response } from 'express';
import { getEmailDeliveryFailureMessage, sendNotificationEmail } from '@/server/email-smtp';

export default async function handler(req: Request, res: Response) {
  const { parentName, childName, childAge, grade, phone, email, source } = req.body;

  if (!parentName || !childName || !childAge || !grade || !phone || !email || !source) {
    return res.status(400).json({ message: 'Please fill in all required fields.' });
  }

  try {
    await sendNotificationEmail({
      recipientEnv: 'ADMISSIONS_NOTIFICATION_EMAIL',
      fallbackRecipientEnv: 'NOTIFICATION_RECIPIENT_EMAIL',
      smtpPrefix: 'CONTACT',
      fromName: 'The Trium School',
      subject: `New Admissions Enquiry — ${childName} (${grade})`,
      replyTo: email,
      html: `
            <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 24px;">
              <h2 style="color: #1B2A6B; margin-bottom: 4px;">New Admissions Enquiry</h2>
              <p style="color: #666; margin-top: 0;">Submitted via triumschool.in</p>
              <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;" />
              <table style="width: 100%; border-collapse: collapse;">
                <tr><td style="padding: 8px 0; color: #888; width: 40%;">Parent Name</td><td style="padding: 8px 0; font-weight: 600; color: #1B2A6B;">${parentName}</td></tr>
                <tr><td style="padding: 8px 0; color: #888;">Child Name</td><td style="padding: 8px 0; font-weight: 600; color: #1B2A6B;">${childName}</td></tr>
                <tr><td style="padding: 8px 0; color: #888;">Child Age</td><td style="padding: 8px 0;">${childAge}</td></tr>
                <tr><td style="padding: 8px 0; color: #888;">Grade Applying For</td><td style="padding: 8px 0;">${grade}</td></tr>
                <tr><td style="padding: 8px 0; color: #888;">Phone</td><td style="padding: 8px 0;">${phone}</td></tr>
                <tr><td style="padding: 8px 0; color: #888;">Email</td><td style="padding: 8px 0;">${email}</td></tr>
                <tr><td style="padding: 8px 0; color: #888;">How They Found Us</td><td style="padding: 8px 0;">${source}</td></tr>
              </table>
              <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;" />
            </div>
        `,
      text: `New Admissions Enquiry\n\nParent: ${parentName}\nChild: ${childName}\nAge: ${childAge}\nGrade: ${grade}\nPhone: ${phone}\nEmail: ${email}\nSource: ${source}`,
    });
  } catch (emailErr) {
    console.error('admissions.email.failed', emailErr);
    return res.status(502).json({ message: getEmailDeliveryFailureMessage(emailErr) });
  }

  return res.status(201).json({ ok: true, message: 'Enquiry received. We will contact you shortly.' });
}
