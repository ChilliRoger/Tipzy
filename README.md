# Tipzy — Seamless UPI Tips

Tipzy is a B2B2C platform that enables UPI-based tipping for service workers in India via personalized QR badges. Venues onboard staff, print QR codes, and customers tip instantly. This repository contains a Next.js App Router implementation with mock storage and UPI processing for demo purposes.

## Features

- Venue and Staff dashboards with role gating
- Staff QR badges for instant tipping (mock flow)
- LocalStorage-backed mock auth, data seeding, and tip processing
- Responsive UI with accessible components (Headless UI)
- CSV export for staff details
- Dark mode friendly design (customizable via CSS variables)

## Tech Stack

- Framework: Next.js 15 (App Router, TypeScript)
- UI: Tailwind CSS 4, Headless UI, custom components
- State/Storage: Browser localStorage (mock), no backend
- Charts/QR: react-qr-code, qrcode
- Linting/Types: ESLint 9, TypeScript 5

## Live Deployment

- Production: deployed on Vercel

## Project Structure

```
/tipzy
  src/
    app/            # App Router pages (admin, login, signup, dashboards, etc.)
    components/     # UI, layout, and auth helpers
    lib/            # auth, storage, and mock UPI logic
    types/          # Shared TypeScript types
  public/           # Static assets
  eslint.config.mjs # ESLint configuration
  tsconfig.json     # TypeScript configuration
```

## Local Development

Prerequisites: Node 18+ and npm

```bash
npm ci
npm run dev
# App will be available at http://localhost:3000
```

Initial demo data is seeded automatically when visiting Login for the first time.

### Useful Scripts

- `npm run dev` – Start dev server
- `npm run build` – Production build
- `npm run start` – Start production server
- `npm run lint` – Run ESLint

## Configuration

This demo uses browser localStorage and does not require a backend or environment variables. If you extend it with a real backend:

- Add environment variables in `.env.local`
- Refer to them in the app via `process.env.*` or Next.js runtime configs

## Deployment (Vercel)

Using Vercel CLI:

```bash
# Install dependencies
npm ci

# Optional: link to Vercel project (will prompt or auto-detect)
npx vercel link

# Deploy to preview
npx vercel

# Deploy to production
npx vercel --prod
```

Build settings (auto-detected by Vercel):
- Install Command: npm ci
- Build Command: next build
- Output: Next.js default (serverless/app dir)

## Security & Notes

- All payment and UPI flows are mocked; do not use in production as-is.
- LocalStorage data is not secure and is for demo only.
- Add real authentication, server-side APIs, and database before production use.

## License

This project is provided for demonstration purposes. © Tipzy.
