import type { VercelRequest, VercelResponse } from '@vercel/node';
import { z } from 'zod';
import { fetchProff } from './_util';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'GET') return res.status(405).json({ error: 'Use GET' });

  try {
    const Q = z.object({
      q: z.string().min(2),
      page: z.coerce.number().int().min(1).default(1)
    });
    const { q, page } = Q.parse(req.query);

    // EKSEMPEL: justér til riktig path (f.eks. /procompany/search)
    const data = await fetchProff('/procompany/search', { q, page });

    res.status(200).json({ ok: true, query: q, page, data });
  } catch (e: any) {
    res.status(400).json({ ok: false, error: e.message });
  }
}
