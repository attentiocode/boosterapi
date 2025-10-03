# Booster API (Vercel)

Serverløse endpoints som proxier Proff-API til Webflow-frontenden.

## Endpoints
- GET `/api/health`
- GET `/api/proff/company/:orgnr`
- GET `/api/proff/search?q=...&page=1`

## Miljøvariabler (settes i Vercel)
- `PROFF_API_TOKEN` (påkrevd)
- `PROFF_API_BASE` (default: `https://api.proff.no`)
- `PROFF_TIMEOUT_MS` (default: 10000ms)
