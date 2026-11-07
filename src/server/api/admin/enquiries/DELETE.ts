import type { Request, Response } from "express";
import { isAdmin } from "../../../admin-session.js";
import { deleteSubmissions } from "../../../submissions-db.js";

export default async function handler(req: Request, res: Response) {
  res.setHeader("Cache-Control", "no-store");

  if (!isAdmin(req)) {
    return res.status(401).json({
      error: "Please sign in as an administrator.",
    });
  }

  // Reject cross-site deletion requests.
  const origin = req.get("origin");
  const host = req.get("host");

  if (
    req.get("sec-fetch-site") === "cross-site" ||
    (origin && (!host || !sameOriginHost(origin, host)))
  ) {
    return res.status(403).json({
      error: "Cross-site requests are not permitted.",
    });
  }

  const ids: unknown = req.body?.ids;

  if (
    !Array.isArray(ids) ||
    ids.length < 1 ||
    ids.length > 100 ||
    ids.some(
      (id) => typeof id !== "number" || !Number.isSafeInteger(id) || id <= 0,
    ) ||
    new Set(ids).size !== ids.length
  ) {
    return res.status(400).json({
      error: "Provide 1 to 100 unique numeric submission IDs.",
    });
  }

  try {
    const deleted = await deleteSubmissions(ids as number[]);

    return res.status(200).json({
      ok: true,
      deleted,
    });
  } catch (error) {
    console.error("admin.enquiries.delete.failed", {
      code: error instanceof Error ? error.name : "UNKNOWN",
    });

    return res.status(503).json({
      error: "Could not delete submissions. Try again.",
    });
  }
}

function sameOriginHost(origin: string, host: string): boolean {
  try {
    return new URL(origin).host.toLowerCase() === host.toLowerCase();
  } catch {
    return false;
  }
}
