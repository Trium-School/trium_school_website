import type { Request, Response } from "express";

import { isAdmin } from "../../../admin-session.js";
import { listSubmissions } from "../../../submissions-db.js";

export default async function handler(req: Request, res: Response) {
  res.setHeader("Cache-Control", "private, no-store");

  if (!isAdmin(req)) {
    return res.status(401).json({
      error: "Unauthorized. Please log in.",
    });
  }

  const requestedPage = Number.parseInt(String(req.query.page ?? "1"), 10);

  const page = Number.isFinite(requestedPage)
    ? Math.min(100000, Math.max(1, requestedPage))
    : 1;

  try {
    const data = await listSubmissions(page, 100);

    return res.status(200).json(data);
  } catch (error) {
    console.error(
      "admin.enquiries.error",
      error instanceof Error ? error.message : "Unknown",
    );

    return res.status(503).json({
      error: "Unable to retrieve submissions from the database.",
    });
  }
}
