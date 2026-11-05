import mysql, {
  type Pool,
  type ResultSetHeader,
  type RowDataPacket,
} from "mysql2/promise";

export type FormType = "contact" | "admissions" | "careers";

export type EmailStatus = "pending" | "sent" | "failed";

export type Submission = {
  id: number;
  formType: FormType;
  name: string;
  email: string;
  phone: string;
  details: Record<string, unknown>;
  emailStatus: EmailStatus;
  emailErrorCode: string | null;
  createdAt: string;
};

let pool: Pool | undefined;
let schemaReady: Promise<void> | undefined;

// Database connection
function database(): Pool {
  if (pool) return pool;

  const host = process.env.DB_HOST;
  const user = process.env.DB_USER;
  const password = process.env.DB_PASSWORD ?? process.env.DB_PASS;

  const databaseName = process.env.DB_NAME;
  const port = Number(process.env.DB_PORT ?? 3306);

  if (
    !host ||
    !user ||
    !password ||
    !databaseName ||
    !Number.isInteger(port) ||
    port < 1 ||
    port > 65535
  ) {
    throw new Error(
      "DB_CONFIG_MISSING: Check your database environment variables",
    );
  }

  pool = mysql.createPool({
    host,
    port,
    user,
    password,
    database: databaseName,
    waitForConnections: true,
    connectionLimit: 5,
    connectTimeout: 10000,
  });

  return pool;
}

// Initialize table automatically
async function ready(): Promise<Pool> {
  const db = database();

  if (!schemaReady) {
    schemaReady = db
      .query(
        `
        CREATE TABLE IF NOT EXISTS website_form_submissions (
          id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
          form_type VARCHAR(20) NOT NULL,
          name VARCHAR(100) NOT NULL,
          email VARCHAR(254) NOT NULL,
          phone VARCHAR(20) NOT NULL DEFAULT '',
          details_json LONGTEXT NOT NULL,
          email_status VARCHAR(12) NOT NULL DEFAULT 'pending',
          email_error_code VARCHAR(64) NULL,
          created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
          INDEX idx_submission_date (created_at),
          INDEX idx_submission_type (form_type)
        ) ENGINE=InnoDB
          DEFAULT CHARSET=utf8mb4
          COLLATE=utf8mb4_unicode_ci
      `,
      )
      .then(() => undefined)
      .catch((error) => {
        schemaReady = undefined;
        throw error;
      });
  }

  await schemaReady;
  return db;
}

// Save a new submission
export async function saveSubmission(input: {
  formType: FormType;
  name: string;
  email: string;
  phone: string;
  details: Record<string, unknown>;
}): Promise<number> {
  const db = await ready();

  const [result] = await db.execute<ResultSetHeader>(
    `
    INSERT INTO website_form_submissions
    (form_type, name, email, phone, details_json, email_status)
    VALUES (?, ?, ?, ?, ?, 'pending')
    `,
    [
      input.formType,
      input.name,
      input.email,
      input.phone,
      JSON.stringify(input.details),
    ],
  );

  return result.insertId;
}

// Update email delivery status
export async function setSubmissionEmailStatus(
  id: number,
  status: EmailStatus,
  errorCode: string | null = null,
): Promise<void> {
  const db = await ready();

  await db.execute(
    `
    UPDATE website_form_submissions
    SET email_status = ?, email_error_code = ?
    WHERE id = ?
    `,
    [status, errorCode, id],
  );
}

// Fetch submissions for admin dashboard
export async function listSubmissions(
  page: number,
  limit = 100,
): Promise<{
  items: Submission[];
  total: number;
}> {
  const db = await ready();

  const safePage = Math.max(1, Math.floor(page) || 1);
  const safeLimit = Math.min(100, Math.max(1, Math.floor(limit) || 100));
  const offset = (safePage - 1) * safeLimit;

  const [rows] = await db.query<RowDataPacket[]>(
    `
    SELECT
      id,
      form_type,
      name,
      email,
      phone,
      details_json,
      email_status,
      email_error_code,
      created_at
    FROM website_form_submissions
    ORDER BY id DESC
    LIMIT ? OFFSET ?
    `,
    [safeLimit, offset],
  );

  const [counts] = await db.query<RowDataPacket[]>(
    "SELECT COUNT(*) AS total FROM website_form_submissions",
  );

  return {
    total: Number(counts[0]?.total ?? 0),
    items: rows.map((row) => ({
      id: Number(row.id),
      formType: row.form_type as FormType,
      name: String(row.name),
      email: String(row.email),
      phone: String(row.phone),
      details: parseDetails(row.details_json),
      emailStatus: row.email_status as EmailStatus,
      emailErrorCode: row.email_error_code
        ? String(row.email_error_code)
        : null,
      createdAt: new Date(row.created_at).toISOString(),
    })),
  };
}

// Parse saved JSON fields
function parseDetails(value: unknown): Record<string, unknown> {
  try {
    if (typeof value === "string") {
      return JSON.parse(value);
    }

    if (Buffer.isBuffer(value)) {
      return JSON.parse(value.toString("utf8"));
    }

    if (value && typeof value === "object") {
      return value as Record<string, unknown>;
    }
  } catch {
    return {};
  }

  return {};
}
