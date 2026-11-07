
import {
  createHash,
  createHmac,
  randomBytes,
  timingSafeEqual,
} from "node:crypto";

import type { Request, Response } from "express";

const COOKIE_NAME = "trium_admin_session";
const SESSION_DURATION = 8 * 60 * 60 * 1000;

function getSessionSecret(): string {
  const secret = process.env.ADMIN_SESSION_SECRET;

  if (!secret || secret.length < 32) {
    throw new Error(
      "ADMIN_SESSION_SECRET must contain at least 32 characters"
    );
  }

  return secret;
}

function getCookieOptions() {
  return {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict" as const,
    path: "/",
  };
}

// Check the admin password using constant-time comparison.
export function verifyAdminPassword(
  password: string
): boolean {
  const expected = process.env.ADMIN_PASSWORD;

  if (!expected) {
    throw new Error("ADMIN_PASSWORD is not configured");
  }

  if (typeof password !== "string") {
    return false;
  }

  const submittedHash = createHash("sha256")
    .update(password)
    .digest();

  const expectedHash = createHash("sha256")
    .update(expected)
    .digest();

  return timingSafeEqual(submittedHash, expectedHash);
}

// Generate a signed login session.
export function createAdminSession(
  res: Response
): void {
  const expiresAt = Date.now() + SESSION_DURATION;

  const randomToken = randomBytes(16).toString("hex");

  const payload = `${expiresAt}.${randomToken}`;

  const signature = createHmac(
    "sha256",
    getSessionSecret()
  )
    .update(payload)
    .digest("hex");

  const token = `${payload}.${signature}`;

  res.cookie(COOKIE_NAME, token, {
    ...getCookieOptions(),
    maxAge: SESSION_DURATION,
  });
}

// Verify whether the request has a valid admin session.
export function isAdmin(req: Request): boolean {
  const token = req.cookies?.[COOKIE_NAME];

  if (typeof token !== "string") {
    return false;
  }

  const match =
    /^(\d{13})\.([a-f0-9]{32})\.([a-f0-9]{64})$/.exec(
      token
    );

  if (!match) {
    return false;
  }

  const [, expiry, randomToken, signature] = match;

  const expiresAt = Number(expiry);

  if (
    !Number.isFinite(expiresAt) ||
    expiresAt <= Date.now() ||
    expiresAt > Date.now() + SESSION_DURATION
  ) {
    return false;
  }

  try {
    const payload = `${expiry}.${randomToken}`;

    const expected = createHmac(
      "sha256",
      getSessionSecret()
    )
      .update(payload)
      .digest();

    const received = Buffer.from(signature, "hex");

    return (
      expected.length === received.length &&
      timingSafeEqual(expected, received)
    );
  } catch {
    return false;
  }
}

// Clear admin session on logout.
export function clearAdminSession(
  res: Response
): void {
  res.clearCookie(
    COOKIE_NAME,
    getCookieOptions()
  );
}
