import { beforeEach, describe, expect, it, vi } from 'vitest';

const { createTransport, sendMail } = vi.hoisted(() => ({
  createTransport: vi.fn(),
  sendMail: vi.fn(),
}));

vi.mock('nodemailer', () => ({
  default: { createTransport },
}));

import { createNotificationEmail, getEmailDeliveryFailureMessage, sendNotificationEmail } from './email-smtp';

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

describe('createNotificationEmail', () => {
  it('creates a branded HTML email and a readable plain-text alternative', () => {
    const email = createNotificationEmail({
      title: 'New contact enquiry',
      preheader: 'A new enquiry from Alex.',
      intro: 'A new message was submitted.',
      details: [
        { label: 'Name', value: 'Alex Example' },
        { label: 'Email', value: 'alex@example.com' },
      ],
      message: { label: 'Message', value: 'Hello,\nI have a question.' },
    });

    expect(email.html).toContain('THE TRIUM SCHOOL');
    expect(email.html).toContain('background-color: #1b2a6b');
    expect(email.html).toContain('New contact enquiry');
    expect(email.html).toContain('white-space: pre-wrap');
    expect(email.html).toContain('Hello,\nI have a question.');
    expect(email.text).toContain('Name: Alex Example');
    expect(email.text).toContain('Message:\nHello,\nI have a question.');
  });

  it('escapes user-provided values in HTML', () => {
    const email = createNotificationEmail({
      title: '<script>bad()</script>',
      preheader: 'An enquiry from <Alex>.',
      intro: 'A new message & enquiry.',
      details: [{ label: 'Name', value: '<img src=x onerror=alert(1)>' }],
      message: { label: 'Message', value: '<b>unsafe</b>' },
    });

    expect(email.html).toContain('&lt;script&gt;bad()&lt;/script&gt;');
    expect(email.html).toContain('&lt;img src=x onerror=alert(1)&gt;');
    expect(email.html).toContain('&lt;b&gt;unsafe&lt;/b&gt;');
    expect(email.html).not.toContain('<img src=x');
    expect(email.html).not.toContain('<b>unsafe</b>');
  });
});
