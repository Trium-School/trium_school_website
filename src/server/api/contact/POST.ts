import type { Request, Response } from 'express';
import { contactFormSchema } from '@/lib/form-validation';
import { recordAndNotify } from "@/server/record-and-notify";
import { createNotificationEmail } from '@/server/email-smtp';

export default async function handler(req: Request, res: Response) {
  const parsed = contactFormSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({ error: parsed.error.issues[0].message });
  }

  const { name, email, phone, subject, message } = parsed.data;
  const emailContent = createNotificationEmail({
    title: 'New contact enquiry',
    preheader: `A new website enquiry from ${name}.`,
    intro: 'A new message has been submitted through the Contact page.',
    details: [
      { label: 'Name', value: name },
      { label: 'Email', value: email },
      { label: 'Phone', value: phone || 'Not provided' },
      { label: 'Subject', value: subject || 'Not provided' },
    ],
    message: { label: 'Message', value: message },
  });


try {
  const result = await recordAndNotify({
    formType: "contact",
    name,
    email,
    phone,
    details: parsed.data,
    notification: {
      recipientEnv: "CONTACT_NOTIFICATION_EMAIL",
      fallbackRecipientEnv: "NOTIFICATION_RECIPIENT_EMAIL",
      smtpPrefix: "CONTACT",
      fromName: "Website Contact Form",
      subject: `New contact enquiry from ${name}`,
      replyTo: email,
      html: emailContent.html,
      text: emailContent.text,
    },
  });

  return res.status(201).json(result);
} catch (error) {
  console.error("contact.db.failed", error);
  return res.status(503).json({
    error: "Could not save your enquiry. Please try again.",
  });
}
}
