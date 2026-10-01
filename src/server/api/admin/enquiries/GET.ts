import type { Request, Response } from 'express';
import { db } from '../../../db/client.js';
import { admissionsEnquiries } from '../../../db/schema.js';
import { desc } from 'drizzle-orm';

export default async function handler(req: Request, res: Response) {
  try {
    const rows = await db
      .select()
      .from(admissionsEnquiries)
      .orderBy(desc(admissionsEnquiries.createdAt));
    return res.json(rows);
  } catch (error) {
    console.error('admin.enquiries.get.error', error);
    return res.status(500).json({ error: 'Failed to fetch enquiries' });
  }
}
