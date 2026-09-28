# LOFT 47 restaurant template

Static premium restaurant and event-venue template driven by [`DESIGN.md`](DESIGN.md). The brand, business details, menu and contacts are fictional demo content.

## Included

- Full-screen restaurant hero with one booking intent.
- Restaurant story and decision-making facts.
- Keyboard-accessible demo menu tabs.
- Three dining and event formats.
- Image gallery with a focus-managed lightbox.
- Local booking modal that never sends data.
- Contact placeholders and a compact footer.
- Desktop and mobile layouts without a framework or analytics.

## Local preview

```powershell
npm install
npm run serve
```

Open `http://127.0.0.1:4173/`. The mobile QA frame is available at `http://127.0.0.1:4173/qa-mobile.html`.

## Validate and build

```powershell
npm run design:lint
npm run deploy:build
```

The static build is written to `dist/`. The official `@google/design.md@0.4.0` CLI is pinned as a development dependency. The wrapper also recognises the existing Codex tools installation on this computer so the current checkout can be validated before a clean `npm install`.

## Replace before real publication

1. Brand name, SEO title and description.
2. Hero, overview and three distinct gallery photographs.
3. Menu names, descriptions and prices.
4. Capacities, service claims and event formats.
5. Phone, email, address, opening hours and legal links.
6. Demo booking behavior with an approved form destination and privacy text.

The default form performs browser validation only. It does not create a reservation or make a network request.

## Bundled media

The repository includes six original generated venue images and the self-hosted Manrope and Unbounded variable fonts. Font license texts are stored next to the binaries in `assets/fonts/`. A fresh clone does not depend on the local Codex image or font cache.

All source files use relative asset URLs, so the site works from a domain root or a GitHub Pages repository subpath.

`.openai/hosting.json` is machine/project-specific and ignored by Git. Use `.openai/hosting.example.json` only as a schema reference.
