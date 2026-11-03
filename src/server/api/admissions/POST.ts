import type { Request, Response } from 'express';
import { admissionsFormSchema } from '@/lib/form-validation';
import { createNotificationEmail, getEmailDeliveryFailureMessage, sendNotificationEmail } from '@/server/email-smtp';

export default async function handler(req: Request, res: Response) {
  const parsed = admissionsFormSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({ message: parsed.error.issues[0].message });
  }

  const { parentName, childName, childAge, grade, phone, email, source } = parsed.data;
  const emailContent = createNotificationEmail({
    title: 'New admissions enquiry',
    preheader: `A new admissions enquiry for ${childName}, applying for ${grade}.`,
    intro: 'A family has submitted an admissions enquiry through the school website.',
    details: [
      { label: 'Parent / guardian', value: parentName },
      { label: 'Child', value: childName },
      { label: 'Age', value: String(childAge) },
      { label: 'Applying for', value: grade },
      { label: 'Phone', value: phone },
      { label: 'Email', value: email },
      { label: 'How they found us', value: source },
    ],
  });

  try {
    await sendNotificationEmail({
      recipientEnv: 'ADMISSIONS_NOTIFICATION_EMAIL',
      fallbackRecipientEnv: 'NOTIFICATION_RECIPIENT_EMAIL',
      smtpPrefix: 'CONTACT',
      fromName: 'Website Admission Form',
      subject: `[Website Admission Form] New Enquiry — ${childName.replace(/[\r\n]/g, ' ')} (${grade})`,
      replyTo: email,
      html: emailContent.html,
      text: emailContent.text,
    });
  } catch (emailErr) {
    console.error('admissions.email.failed', emailErr);
    return res.status(502).json({ message: getEmailDeliveryFailureMessage(emailErr) });
  }

  return res.status(201).json({ ok: true, message: 'Enquiry received. We will contact you shortly.' });
}
