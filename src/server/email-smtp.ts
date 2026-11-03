import nodemailer from 'nodemailer';
import { getSecret } from '#airo/secrets';

type SendNotificationEmailInput = {
  recipientEnv: string;
  fallbackRecipientEnv?: string;
  smtpPrefix: string;
  fallbackSmtpPrefix?: string;
  fromName: string;
  subject: string;
  html: string;
  text?: string;
  replyTo?: string;
};

type SmtpConfig = {
  host: string;
  port: number;
  secure: boolean;
  user: string;
  password: string;
};

type NotificationEmailContent = {
  title: string;
  preheader: string;
  intro: string;
  details: Array<{ label: string; value: string }>;
  message?: { label: string; value: string };
};

export function escapeHtml(value: string): string {
  const entities: Record<string, string> = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;',
  };
  return value.replace(/[&<>"']/g, (character) => entities[character]);
}

export function createNotificationEmail(content: NotificationEmailContent): { html: string; text: string } {
  const detailRows = content.details.map(({ label, value }) => `
    <tr>
      <td style="width: 34%; padding: 13px 16px; border-bottom: 1px solid #e8ebf2; color: #64708a; font-size: 12px; font-weight: 600; letter-spacing: .04em; text-transform: uppercase; vertical-align: top;">${escapeHtml(label)}</td>
      <td style="padding: 13px 16px; border-bottom: 1px solid #e8ebf2; color: #1d273b; font-size: 14px; line-height: 1.55; overflow-wrap: anywhere;">${escapeHtml(value) || '—'}</td>
    </tr>
  `).join('');
  const messageBlock = content.message
    ? `
      <tr>
        <td style="padding: 20px 22px 8px; color: #64708a; font-size: 12px; font-weight: 600; letter-spacing: .05em; text-transform: uppercase;">${escapeHtml(content.message.label)}</td>
      </tr>
      <tr>
        <td style="padding: 0 22px 22px; color: #1d273b; font-size: 14px; line-height: 1.7; white-space: pre-wrap; overflow-wrap: anywhere;">${escapeHtml(content.message.value)}</td>
      </tr>
    `
    : '';
  const textDetails = content.details.map(({ label, value }) => `${label}: ${value || '—'}`).join('\n');
  const textMessage = content.message ? `\n\n${content.message.label}:\n${content.message.value}` : '';

  return {
    html: `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="color-scheme" content="light">
    <title>${escapeHtml(content.title)}</title>
  </head>
  <body style="margin: 0; padding: 0; background-color: #f3f5f9; color: #1d273b; font-family: Arial, Helvetica, sans-serif;">
    <div style="display: none; max-height: 0; overflow: hidden; opacity: 0; color: transparent;">${escapeHtml(content.preheader)}</div>
    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="background-color: #f3f5f9; padding: 32px 12px;">
      <tr>
        <td align="center">
          <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="max-width: 640px; background-color: #ffffff; border: 1px solid #e5e9f1; border-radius: 12px; overflow: hidden;">
            <tr>
              <td style="height: 6px; background-color: #d3a63b; font-size: 0; line-height: 0;">&nbsp;</td>
            </tr>
            <tr>
              <td style="padding: 27px 32px 24px; background-color: #1b2a6b;">
                <p style="margin: 0 0 8px; color: #f0c85e; font-size: 11px; font-weight: 700; letter-spacing: .16em; text-transform: uppercase;">THE TRIUM SCHOOL</p>
                <h1 style="margin: 0; color: #ffffff; font-size: 23px; line-height: 1.3; font-weight: 700;">${escapeHtml(content.title)}</h1>
                <p style="margin: 9px 0 0; color: #dce3fb; font-size: 14px; line-height: 1.6;">${escapeHtml(content.intro)}</p>
              </td>
            </tr>
            <tr>
              <td style="padding: 26px 32px 12px;">
                <p style="margin: 0 0 12px; color: #64708a; font-size: 12px; font-weight: 700; letter-spacing: .08em; text-transform: uppercase;">Submission details</p>
                <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="border: 1px solid #e8ebf2; border-radius: 8px; border-collapse: separate; border-spacing: 0;">
                  ${detailRows}
                </table>
              </td>
            </tr>
            ${content.message ? `<tr><td style="padding: 12px 32px 26px;"><table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="background-color: #f7f8fb; border: 1px solid #e8ebf2; border-radius: 8px;">${messageBlock}</table></td></tr>` : ''}
            <tr>
              <td style="padding: 18px 32px; border-top: 1px solid #e8ebf2; color: #778198; font-size: 12px; line-height: 1.6;">
                This notification was sent from the website contact form at <a href="https://triumschool.in" style="color: #1b2a6b; text-decoration: none;">triumschool.in</a>.
              </td>
            </tr>
          </table>
          <p style="margin: 16px 0 0; color: #8a93a6; font-size: 11px; line-height: 1.5;">The Trium School · Nashik, Maharashtra</p>
        </td>
      </tr>
    </table>
  </body>
</html>`,
    text: `${content.title}\nThe Trium School\n\n${content.intro}\n\nSubmission details\n${textDetails}${textMessage}\n\nThis notification was sent from the website at https://triumschool.in.`,
  };
}

export async function sendNotificationEmail(input: SendNotificationEmailInput): Promise<void> {
  const recipient =
    getStringSecret(input.recipientEnv) ??
    (input.fallbackRecipientEnv ? getStringSecret(input.fallbackRecipientEnv) : undefined);
  if (!recipient) {
    throw new Error(`Email recipient is not configured (${input.recipientEnv})`);
  }

  const smtp = getSmtpConfig(input.smtpPrefix, input.fallbackSmtpPrefix);
  const transporter = nodemailer.createTransport({
    host: smtp.host,
    port: smtp.port,
    secure: smtp.secure,
    auth: { user: smtp.user, pass: smtp.password },
    connectionTimeout: 15_000,
    greetingTimeout: 15_000,
    socketTimeout: 30_000,
  });

  await transporter.sendMail({
    from: { name: input.fromName, address: smtp.user },
    to: recipient,
    replyTo: input.replyTo,
    subject: input.subject,
    html: input.html,
    text: input.text,
  });
}

export function getEmailDeliveryFailureMessage(error: unknown): string {
  if (typeof error === 'object' && error !== null && 'code' in error) {
    const code = error.code;
    if (code === 'EAUTH') {
      return 'The email server rejected the SMTP login. Check that the configured username and password match an active mailbox on this email provider.';
    }
    if (code === 'ECONNECTION' || code === 'ETIMEDOUT' || code === 'ESOCKET' || code === 'ENOTFOUND') {
      return 'Could not connect to the email server. Check the SMTP host, port, and secure settings.';
    }
  }
  return 'The notification email could not be sent. Check the server logs and SMTP settings.';
}

function getSmtpConfig(prefix: string, fallbackPrefix?: string): SmtpConfig {
  const keys = ['HOST', 'PORT', 'SECURE', 'USER', 'PASSWORD'];
  let selectedPrefix = prefix;
  const primaryHasConfig = keys.some((key) => getSecret(`${prefix}_SMTP_${key}`) !== null);
  if (!primaryHasConfig && fallbackPrefix) selectedPrefix = fallbackPrefix;

  const host = getStringSecret(`${selectedPrefix}_SMTP_HOST`);
  const portValue = getStringSecret(`${selectedPrefix}_SMTP_PORT`);
  const user = getStringSecret(`${selectedPrefix}_SMTP_USER`);
  const password = getStringSecret(`${selectedPrefix}_SMTP_PASSWORD`, false);
  if (!host || !portValue || !user || !password) {
    throw new Error(`SMTP configuration is incomplete (${selectedPrefix}_SMTP_*)`);
  }

  const port = Number(portValue);
  if (!Number.isInteger(port) || port < 1 || port > 65_535) {
    throw new Error(`SMTP port is invalid (${selectedPrefix}_SMTP_PORT)`);
  }

  const secureValue = getStringSecret(`${selectedPrefix}_SMTP_SECURE`);
  let secure = port === 465;
  if (secureValue !== undefined) {
    if (secureValue.toLowerCase() === 'true') secure = true;
    else if (secureValue.toLowerCase() === 'false') secure = false;
    else throw new Error(`SMTP secure setting must be true or false (${selectedPrefix}_SMTP_SECURE)`);
  }

  return { host, port, secure, user, password };
}

function getStringSecret(name: string, trim = true): string | undefined {
  const value = getSecret(name);
  if (typeof value !== 'string') return undefined;
  const result = trim ? value.trim() : value;
  return result.length > 0 ? result : undefined;
}
