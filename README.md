# Global Dental Hospital — Nanded, Maharashtra

A premium dental website with an iOS-inspired liquid glass aesthetic,
built with React, Vite, TypeScript, Tailwind CSS, Framer Motion, and
lucide-react.

## Features

- **Liquid glass design system** — frosted translucent surfaces,
  soft teal shadows, refined borders, elegant gradients, and a
  consistent mint/aqua palette with a Fraunces + Manrope type pairing.
- **Floating glass navbar** — a frosted pill that condenses on scroll,
  with a spring-animated mobile menu.
- **Premium hero** — staggered entrance choreography, ambient drifting
  orbs, spring-smoothed pointer tilt on the imagery panel, floating
  glass chips, and an animated underline flourish.
- **Tasteful motion with Framer Motion** — subtle entrance reveals,
  scroll-triggered fades, refined hover lifts, and gentle float loops.
  Every animation degrades to a clean static layout under
  `prefers-reduced-motion`.
- **Real dental imagery** — high-quality photos served from Unsplash
  (hero, about, and the CTA banner), lazy-loaded below the fold with
  the hero image preloaded for instant paint.
- **Working booking flow** — the appointment form validates inputs
  (Indian mobile pattern, date, required fields) and opens a pre-filled
  WhatsApp message to the clinic; call links use `tel:`.
- **Patient feedback** — the reviews section saves feedback to
  localStorage with validation, success notice, and delete support.
- **Performance** — no extra animation libraries; lucide-react icons
  are tree-shaken; images use async decoding; SEO meta + JSON-LD
  `Dentist` schema.

## Clinic details

- **Name:** Global Dental Hospital
- **Address:** Raj Mohammed Complex, Vivek Nagar Road, Nanded, Maharashtra 431605
- **Phone:** +91 90969 68440
- **Google rating:** 4.3/5

## Development

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
npm run preview
```

## Lint

```bash
npm run lint
```
