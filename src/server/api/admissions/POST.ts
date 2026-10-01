import type { Request, Response } from 'express';
import { db } from '../../db/client.js';
import { admissionsEnquiries } from '../../db/schema.js';
import { sendEmail } from '@/server/email';
import { getSecret } from '#airo/secrets';

export default async function handler(req: Request, res: Response) {
  try {
    const { parentName, childName, childAge, grade, phone, email, source } = req.body;

    if (!parentName || !childName || !childAge || !grade || !phone || !email || !source) {
      return res.status(400).json({ message: 'Please fill in all required fields.' });
    }

    // Save to database
    await db.insert(admissionsEnquiries).values({
      parentName,
      childName,
      childAge,
      grade,
      phone,
      email,
      source,
    });

    // Send email alert
    const recipient = getSecret('NOTIFICATION_RECIPIENT_EMAIL') as string | undefined;
    if (recipient) {
      try {
        await sendEmail({
          fromName: 'The Trium School',
          to: recipient,
          subject: `New Admissions Enquiry — ${childName} (${grade})`,
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
              <p style="color: #888; font-size: 13px;">View all enquiries at <a href="https://triumschool.in/admin/enquiries" style="color: #1B2A6B;">triumschool.in/admin/enquiries</a></p>
            </div>
          `,
          text: `New Admissions Enquiry\n\nParent: ${parentName}\nChild: ${childName}\nAge: ${childAge}\nGrade: ${grade}\nPhone: ${phone}\nEmail: ${email}\nSource: ${source}`,
        });
      } catch (emailErr) {
        console.error('admissions.email.failed', emailErr);
      }
    } else {
      console.error('admissions.email.recipient_unset');
    }

    return res.status(201).json({ ok: true, message: 'Enquiry received. We will contact you shortly.' });
  } catch (error) {
    console.error('admissions.post.error', error);
    return res.status(500).json({ message: 'Something went wrong. Please try again.' });
  }
}
