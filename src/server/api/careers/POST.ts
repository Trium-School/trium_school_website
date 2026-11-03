import type { Request, Response } from 'express';
import { careersFormSchema } from '@/lib/form-validation';
import { createNotificationEmail, getEmailDeliveryFailureMessage, sendNotificationEmail } from '../../email-smtp.js';

export default async function handler(req: Request, res: Response) {
  const parsed = careersFormSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({ error: parsed.error.issues[0].message });
  }

  const { name, email, phone, position, experience, message } = parsed.data;
  const emailContent = createNotificationEmail({
    title: 'New careers application',
    preheader: `A new application for ${position}.`,
    intro: 'A candidate has submitted an application to join The Trium School.',
    details: [
      { label: 'Name', value: name },
      { label: 'Email', value: email },
      { label: 'Phone', value: phone || 'Not provided' },
      { label: 'Position', value: position },
      { label: 'Experience', value: experience || 'Not specified' },
    ],
    message: { label: 'Cover note', value: message },
  });

  try {
    await sendNotificationEmail({
      recipientEnv: 'CAREERS_NOTIFICATION_EMAIL',
      fallbackRecipientEnv: 'NOTIFICATION_RECIPIENT_EMAIL',
      smtpPrefix: 'CONTACT',
      fromName: 'Website Careers Form',
      subject: `[Website Careers Form] New Application — ${position.replace(/[\r\n]/g, ' ')}`,
      replyTo: email,
      html: emailContent.html,
      text: emailContent.text,
    });
  } catch (err) {
    console.error('careers.email.failed', err);
    return res.status(502).json({ error: getEmailDeliveryFailureMessage(err) });
  }

  return res.status(201).json({ ok: true });
}
