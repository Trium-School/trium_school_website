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
