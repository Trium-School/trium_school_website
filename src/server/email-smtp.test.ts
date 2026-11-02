import { beforeEach, describe, expect, it, vi } from 'vitest';

const { createTransport, sendMail } = vi.hoisted(() => ({
  createTransport: vi.fn(),
  sendMail: vi.fn(),
}));

vi.mock('nodemailer', () => ({
  default: { createTransport },
}));

import { getEmailDeliveryFailureMessage, sendNotificationEmail } from './email-smtp';

const envKeys = [
  'CONTACT_NOTIFICATION_EMAIL',
  'CONTACT_SMTP_HOST',
  'CONTACT_SMTP_PORT',
  'CONTACT_SMTP_SECURE',
  'CONTACT_SMTP_USER',
  'CONTACT_SMTP_PASSWORD',
];

describe('sendNotificationEmail', () => {
  beforeEach(() => {
    for (const key of envKeys) delete process.env[key];
    createTransport.mockReset().mockReturnValue({ sendMail });
    sendMail.mockReset().mockResolvedValue({});
  });

  it('sends through the configured SMTP account and preserves special password characters', async () => {
    process.env.CONTACT_NOTIFICATION_EMAIL = 'school@example.com';
    process.env.CONTACT_SMTP_HOST = 'smtp.hostinger.com';
    process.env.CONTACT_SMTP_PORT = '465';
    process.env.CONTACT_SMTP_SECURE = 'true';
    process.env.CONTACT_SMTP_USER = 'mailbox@example.com';
    process.env.CONTACT_SMTP_PASSWORD = 'password#with-special';

    await sendNotificationEmail({
      recipientEnv: 'CONTACT_NOTIFICATION_EMAIL',
      smtpPrefix: 'CONTACT',
      fromName: 'The Trium School',
      subject: 'New enquiry',
      html: '<p>Hello</p>',
      replyTo: 'sender@example.net',
    });

    expect(createTransport).toHaveBeenCalledWith(expect.objectContaining({
      host: 'smtp.hostinger.com',
      port: 465,
      secure: true,
      auth: { user: 'mailbox@example.com', pass: 'password#with-special' },
    }));
    expect(sendMail).toHaveBeenCalledWith(expect.objectContaining({
      from: { name: 'The Trium School', address: 'mailbox@example.com' },
      to: 'school@example.com',
      replyTo: 'sender@example.net',
      subject: 'New enquiry',
    }));
  });

  it('fails explicitly when the recipient is not configured', async () => {
    await expect(sendNotificationEmail({
      recipientEnv: 'CONTACT_NOTIFICATION_EMAIL',
      smtpPrefix: 'CONTACT',
      fromName: 'The Trium School',
      subject: 'New enquiry',
      html: '<p>Hello</p>',
    })).rejects.toThrow('Email recipient is not configured (CONTACT_NOTIFICATION_EMAIL)');

    expect(createTransport).not.toHaveBeenCalled();
  });

  it('explains SMTP authentication failures without exposing provider response details', () => {
    expect(getEmailDeliveryFailureMessage({ code: 'EAUTH', response: '535 secret diagnostic' })).toBe(
      'The email server rejected the SMTP login. Check that the configured username and password match an active mailbox on this email provider.',
    );
  });
});
