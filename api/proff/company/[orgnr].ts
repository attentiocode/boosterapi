import type { VercelRequest, VercelResponse } from '@vercel/node';
import { z } from 'zod';
import { fetchProff } from '../../_util';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'GET') return res.status(405).json({ error: 'Use GET' });

  try {
    const Params = z.object({ orgnr: z.string().regex(/^\d{9}$/) });
    const { orgnr } = Params.parse(req.query);

    // EKSEMPEL: dobbeltsjekk eksakt sti i swaggeren
    const data = await fetchProff(`/registercompany/${orgnr}`);

    res.status(200).json({ ok: true, orgnr, data });
  } catch (e: any) {
    res.status(400).json({ ok: false, error: e.message ?? 'Unknown error' });
  }
}
