export const PROFF_BASE = process.env.PROFF_API_BASE ?? 'https://api.proff.no';
const TOKEN = process.env.PROFF_API_TOKEN!;
const TIMEOUT_MS = Number(process.env.PROFF_TIMEOUT_MS ?? 10000);

function withTimeout<T>(p: Promise<T>, ms: number) {
  return new Promise<T>((resolve, reject) => {
    const id = setTimeout(() => reject(new Error('Timeout')), ms);
    p.then(v => { clearTimeout(id); resolve(v); }, e => { clearTimeout(id); reject(e); });
  });
}

export async function fetchProff(path: string, qs?: Record<string, string | number | boolean>) {
  if (!TOKEN) throw new Error('Missing PROFF_API_TOKEN');
  const url = new URL(PROFF_BASE + path);
  if (qs) Object.entries(qs).forEach(([k, v]) => url.searchParams.set(k, String(v)));
  const res = await withTimeout(fetch(url, {
    headers: {
      'Authorization': `Token ${TOKEN}`,
      'Accept': 'application/json',
      'User-Agent': 'Attentio-BoosterAPI/1.0'
    }
  }), TIMEOUT_MS);

  if (!res.ok) {
    const text = await res.text().catch(() => '');
    throw new Error(`Proff ${res.status}: ${text || res.statusText}`);
  }
  return res.json();
}
