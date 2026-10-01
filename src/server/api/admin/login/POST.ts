import type { Request, Response } from 'express';
import { getSecret } from '#airo/secrets';

export default async function handler(req: Request, res: Response) {
  const { password } = req.body;
  const adminPassword = getSecret('ADMIN_PASSWORD');

  if (!adminPassword) {
    return res.status(500).json({ error: 'Admin password not configured' });
  }

  if (password !== adminPassword) {
    return res.status(401).json({ error: 'Incorrect password' });
  }

  // Set a simple session cookie
  res.cookie('admin_session', 'authenticated', {
    httpOnly: true,
    secure: false,
    sameSite: 'lax',
    maxAge: 1000 * 60 * 60 * 8, // 8 hours
    path: '/',
  });

  return res.json({ ok: true });
}
