import type { Request, Response } from "express";
import { careersFormSchema } from "@/lib/form-validation";
import { recordAndNotify } from "@/server/record-and-notify";
import { createNotificationEmail } from "../../email-smtp.js";

export default async function handler(req: Request, res: Response) {
  const parsed = careersFormSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({ error: parsed.error.issues[0].message });
  }

  const { name, email, phone, position, experience, message } = parsed.data;
  const emailContent = createNotificationEmail({
    title: "New careers application",
    preheader: `A new application for ${position}.`,
    intro: "A candidate has submitted an application to join The Trium School.",
    details: [
      { label: "Name", value: name },
      { label: "Email", value: email },
      { label: "Phone", value: phone || "Not provided" },
      { label: "Position", value: position },
      { label: "Experience", value: experience || "Not specified" },
    ],
    message: { label: "Cover note", value: message },
  });

  try {
    const result = await recordAndNotify({
      formType: "careers",
      name,
      email,
      phone,
      details: parsed.data,
      notification: {
        recipientEnv: "CAREERS_NOTIFICATION_EMAIL",
        fallbackRecipientEnv: "NOTIFICATION_RECIPIENT_EMAIL",
        smtpPrefix: "CAREERS",
        fromName: "Website Careers Form",
        subject: `New careers application — ${position}`,
        replyTo: email,
        html: emailContent.html,
        text: emailContent.text,
      },
    });

    return res.status(201).json(result);
  } catch (error) {
    console.error("careers.db.failed", error);
    return res.status(503).json({
      error: "Could not save your application. Please try again.",
    });
  }
}
