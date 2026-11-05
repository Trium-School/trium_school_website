import type { Request, Response } from "express";

import { clearAdminSession } from "../../../admin-session.js";

export default async function handler(_req: Request, res: Response) {
  clearAdminSession(res);

  return res.status(200).json({
    ok: true,
    message: "Logged out successfully.",
  });
}
