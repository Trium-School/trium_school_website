import type { Request, Response } from 'express';
import { admissionsFormSchema } from '@/lib/form-validation';
import { recordAndNotify } from "@/server/record-and-notify";
import { createNotificationEmail } from '@/server/email-smtp';

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
  const result = await recordAndNotify({
    formType: "admissions",
    name: parentName,
    email,
    phone,
    details: parsed.data,
    notification: {
      recipientEnv: "ADMISSIONS_NOTIFICATION_EMAIL",
      fallbackRecipientEnv: "NOTIFICATION_RECIPIENT_EMAIL",
      smtpPrefix: "CONTACT",
      fromName: "Website Admission Form",
      subject: `New admissions enquiry for ${childName} (${grade})`,
      replyTo: email,
      html: emailContent.html,
      text: emailContent.text,
    },
  });

  return res.status(201).json(result);
} catch (error) {
  console.error("admissions.db.failed", error);
  return res.status(503).json({
    message: "Could not save your enquiry. Please try again.",
  });
}
}
