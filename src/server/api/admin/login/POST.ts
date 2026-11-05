import type { Request, Response } from "express";

import {
  createAdminSession,
  verifyAdminPassword,
} from "../../../admin-session.js";

export default async function handler(req: Request, res: Response) {
  res.setHeader("Cache-Control", "no-store");

  const password = req.body?.password;

  if (typeof password !== "string" || !password) {
    return res.status(400).json({
      error: "Password is required.",
    });
  }

  try {
    if (!verifyAdminPassword(password)) {
      return res.status(401).json({
        error: "Incorrect password.",
      });
    }

    createAdminSession(res);

    return res.status(200).json({
      ok: true,
      message: "Login successful.",
    });
  } catch (error) {
    console.error(
      "admin.login.error",
      error instanceof Error ? error.message : "Unknown",
    );

    return res.status(503).json({
      error: "Admin login is not configured.",
    });
  }
}
