# Global Dental Hospital — Nanded, Maharashtra

A premium dental website with a scroll-driven storytelling experience, built
with React, Vite, TypeScript, Tailwind CSS, Framer Motion, and lucide-react.

## Features

- **Scroll-driven storytelling** — the Hero and About sections are pinned
  stages (`position: sticky`): the visual stays in place while the text
  crossfades through story beats on scroll, with progress dots, subtle
  scale, and a floating tooth image with spring-smoothed mouse parallax.
- **Bidirectional reveals** — every section fades and slides in on scroll
  down *and* replays on scroll up (`whileInView` with `once: false`).
- **iOS liquid aesthetic** — light-only glass surfaces, soft teal
  shadows, gradient pills, frosted navbar, generous whitespace.
- **Real dental imagery** — CC-licensed illustrations served from
  Wikimedia Commons (attributed in the footer), no heavy local assets.
- **Working booking flow** — the appointment form validates inputs
  (Indian mobile pattern, date, required fields) and opens a pre-filled
  WhatsApp message to the clinic; call links use `tel:`.
- **Motion with restraint** — all animation and the storytelling pinning
  degrade to a fully readable static layout under `prefers-reduced-motion`.
- **Performance** — no Three.js bundle; lucide-react icons are
  tree-shaken; images are lazy-loaded below the fold; SEO meta + JSON-LD
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
