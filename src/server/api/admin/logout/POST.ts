import type { Request, Response } from 'express';

export default async function handler(req: Request, res: Response) {
  res.clearCookie('admin_session');
  return res.json({ ok: true });
}
