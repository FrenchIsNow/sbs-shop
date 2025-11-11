# SBS Shop - E-Bike Coming Soon

A modern Next.js coming soon page with countdown timer and lead capture integration.

## Features

- Countdown timer to launch date
- Responsive design with Tailwind CSS
- Lead capture form with n8n integration
- Google Sheets automatic data storage
- Beautiful animations with Motion and OGL

## Environment Variables

Create a `.env.local` file in the root directory:

```bash
NEXT_PUBLIC_COUNTDOWN_DATE=2026-01-23T00:30:00
```

## Installation

```bash
pnpm install
```

## Development

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

## Build

```bash
pnpm build
pnpm start
```

## Deployment

This project is optimized for Vercel deployment.

### Environment Variables on Vercel

Add the following environment variable:
- `NEXT_PUBLIC_COUNTDOWN_DATE`: Your launch date in ISO format

## Tech Stack

- Next.js 15.2.3
- React 19
- Tailwind CSS 4
- Motion (Framer Motion)
- OGL (WebGL library)
- n8n webhook integration
- Google Sheets

## Lead Management

Leads are automatically captured via n8n webhook and stored in Google Sheets. See `N8N_SETUP.md` for configuration details.


