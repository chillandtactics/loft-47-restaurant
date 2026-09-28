---
version: alpha
name: LOFT 47
description: A dark editorial visual system for an original restaurant and event-venue template.
colors:
  primary: "#0E1013"
  canvas-deep: "#070809"
  surface: "#17191D"
  surface-soft: "#23252A"
  text-primary: "#F7F4EE"
  text-secondary: "#C9C5BE"
  text-muted: "#8D8982"
  gold: "#EABE77"
  gold-deep: "#9E8661"
  accent: "#EA2C2C"
  accent-strong: "#FE4114"
  on-accent: "#070809"
  warm-panel: "#F2EADE"
  on-warm-panel: "#151619"
  border: "#34363B"
  overlay: "rgba(7, 8, 9, 0.62)"
typography:
  display:
    fontFamily: Unbounded, Arial, sans-serif
    fontSize: 4.0625rem
    fontWeight: 400
    lineHeight: 1.11
    letterSpacing: -0.076em
  heading-lg:
    fontFamily: Unbounded, Arial, sans-serif
    fontSize: 3.25rem
    fontWeight: 400
    lineHeight: 1.12
    letterSpacing: -0.055em
  heading-md:
    fontFamily: Unbounded, Arial, sans-serif
    fontSize: 2rem
    fontWeight: 450
    lineHeight: 1.2
    letterSpacing: -0.035em
  body-lg:
    fontFamily: Manrope, Arial, sans-serif
    fontSize: 1.125rem
    fontWeight: 400
    lineHeight: 1.55
    letterSpacing: -0.01em
  body:
    fontFamily: Manrope, Arial, sans-serif
    fontSize: 1rem
    fontWeight: 400
    lineHeight: 1.55
    letterSpacing: -0.006em
  label:
    fontFamily: Manrope, Arial, sans-serif
    fontSize: 0.875rem
    fontWeight: 650
    lineHeight: 1.25
    letterSpacing: 0.03em
rounded:
  xs: 6px
  sm: 10px
  md: 16px
  pill: 999px
spacing:
  xs: 4px
  sm: 8px
  md: 16px
  lg: 24px
  xl: 40px
  2xl: 64px
  3xl: 96px
  4xl: 144px
components:
  page:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.text-primary}"
    typography: "{typography.body}"
  button-primary:
    backgroundColor: "{colors.accent}"
    textColor: "{colors.on-accent}"
    typography: "{typography.label}"
    rounded: "{rounded.sm}"
    padding: 18px 28px
    height: 60px
  button-primary-hover:
    backgroundColor: "{colors.accent-strong}"
    textColor: "{colors.on-accent}"
  button-secondary:
    backgroundColor: "{colors.surface-soft}"
    textColor: "{colors.text-primary}"
    typography: "{typography.label}"
    rounded: "{rounded.pill}"
    padding: 12px 20px
    height: 46px
  navigation:
    backgroundColor: "{colors.overlay}"
    textColor: "{colors.text-primary}"
    typography: "{typography.body}"
    height: 76px
  media-frame:
    backgroundColor: "{colors.surface-soft}"
    rounded: "{rounded.md}"
  body-copy:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.text-secondary}"
    typography: "{typography.body}"
  muted-copy:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.text-muted}"
    typography: "{typography.body}"
  gold-label:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.gold}"
    typography: "{typography.label}"
  gold-rule:
    backgroundColor: "{colors.gold-deep}"
    height: 1px
  divider:
    backgroundColor: "{colors.border}"
    height: 1px
  warm-panel:
    backgroundColor: "{colors.warm-panel}"
    textColor: "{colors.on-warm-panel}"
    rounded: "{rounded.md}"
    padding: 24px
  modal-backdrop:
    backgroundColor: "{colors.canvas-deep}"
  modal:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.text-primary}"
    rounded: "{rounded.md}"
    padding: 32px
---

## Overview

LOFT 47 is a fictional restaurant and event-space brand used to test whether a structured design contract can carry one visual system across a complete hospitality landing page. The language is dark, cinematic and architectural. Large geometric typography carries urgency while restrained gold signals hospitality and a single red-orange action color drives booking.

The page is a narrative marketing surface for people choosing a restaurant, private dinner or event venue. Photography must feel spatial and believable. It is not decoration and must never contain interface text, logos or watermarks.

Design settings: variance 8, motion 4, density 3. Desktop compositions are intentionally asymmetric. Layouts below 768px collapse to one column with stable reading order and no horizontal overflow.

## Colors

The whole page stays in one dark theme.

- `primary` is the primary background.
- `canvas-deep` is reserved for the hero overlay and modal backdrop.
- `text-primary` is used for display text and active controls.
- `text-secondary` supports body copy. `text-muted` is only for non-essential metadata.
- `gold` highlights one phrase, one rule or one small decorative surface at a time. It is not a second button color.
- `accent` and `accent-strong` are the only interactive accent family. They are used for the main booking action and its hover state.
- `warm-panel` may appear only as a small inset information surface. It must not turn an entire section into a light theme.
- Text and interactive controls must meet WCAG AA contrast. Hero text targets AAA where the photograph allows it.

## Typography

Unbounded is the display voice. Manrope is the reading and interface voice.

- The desktop hero uses `display` at 65px with deliberately tight tracking. Limit it to two lines.
- Section headlines use `heading-lg` or `heading-md`. Do not place an uppercase eyebrow above every heading.
- Body copy uses `body-lg` for the hero and `body` elsewhere. Keep paragraphs under 65 characters per line.
- Buttons and compact navigation use `label`. Do not use all caps for long phrases.
- At widths below 768px, scale the hero to 2.35rem with line-height 1.12 and letter-spacing no tighter than -0.045em.
- Self-host font files when the page is implemented. Use `font-display: swap` and reserve dimensions to avoid layout shift.

## Layout

Use a maximum content width of 1240px with fluid horizontal padding from 20px on mobile to 48px on desktop.

The restaurant template contains six narrative sections. It keeps one editorial rhythm while identity, copy and photography remain original:

1. A full-bleed hero with navigation layered over a venue photograph. The large two-line statement uses a clean red rectangle behind its final phrase. Three concise restaurant advantages form a bottom strip. The primary action remains visible without scrolling at 720px viewport height.
2. A second full-bleed photographic section with the restaurant story, a large gold statement and four compact numbered facts.
3. A dark cuisine section combines one close editorial food photograph with a menu. Accessible tabs switch between dinner, sharing and non-alcoholic groups without navigation or a network request.
4. A quieter surface lists three hospitality formats with capacity and concise decision-making copy, then shows technical equipment integrated into the restaurant architecture.
5. A black gallery section uses three distinct photographs for overall interior, banquet seating and decor detail. It keeps one dominant landscape image, partial side images and compact gold text controls.
6. A booking and contacts section closes the page with one repeated action, configurable contact placeholders and a small footer.

Hero and overview media use `object-fit: cover` with stable aspect regions and explicit dark overlays. Reserve image dimensions before loading. The gallery keeps side images deliberately clipped within the viewport and must never create document-level horizontal overflow.

The photography set must feel like one fictional venue. Keep aged brick, black steel, warm amber light, blue-hour windows, natural wood and restrained seasonal greenery consistent between frames. The shot list includes one architectural wide view, one banquet arrangement, one table-detail frame, one food close-up and one equipment view. Photographs contain no text, logos, watermarks or recognisable details from a real venue.

Do not repeat the same split layout in consecutive sections. Do not add testimonials, client logos, a map or unsupported business claims to the base template.

## Elevation & Depth

Depth comes from photography, overlays and small shifts in surface tone, not floating cards or neon glow.

- Navigation may use a translucent `overlay` surface with a thin `border` edge.
- Media can use a soft shadow tinted toward `canvas-deep`.
- The modal sits above a 72 percent dark backdrop.
- Animate only opacity and transform. Entry transitions use a 500ms to 650ms ease-out curve and must stop under `prefers-reduced-motion: reduce`.

## Shapes

The shape system is restrained and consistent.

- Buttons use `rounded.sm`.
- Media and the modal use `rounded.md`.
- Pills are reserved for a real status or compact control. They are not decorative labels.
- Hero photography remains edge-to-edge and is never placed in a rounded card.
- Icons in the hero benefit strip use one thin-line geometric language and remain secondary to the copy.

## Components

### Navigation

The desktop navigation stays on one line and never exceeds 78px in height. It contains the LOFT 47 wordmark, five section links and one compact pill booking action. Mobile replaces the links with an accessible menu button and a full-width dark panel.

### Primary action

Use one intent everywhere: booking a table or event. Short labels may say "Забронировать"; the hero may clarify "Забронировать стол или зал". The default is `accent`; hover and active use `accent-strong`. The label must never wrap. Focus is a visible 2px `gold` outline with a 3px offset.

### Menu tabs

Tabs use text and a thin gold active rule, never pills. Left and right keyboard keys move through the tab list. Switching a group only changes visible demo content and never changes the URL.

### Hospitality formats

Formats are horizontal editorial rows rather than equal floating cards. Each row includes an index, title, compact description and capacity. Mobile keeps the index beside the title and moves capacity below the copy.

### Gallery

Gallery items are real raster photographs with meaningful alt text. Desktop keeps one dominant center image and side peeks; mobile preserves smaller side peeks instead of stacking the images. Navigation sits below the photographs rather than floating over them. Two visually explicit controls use the primary labels `Назад` and `Дальше`; the destination scene stays underneath as secondary context. Do not use arrow symbols or numeric pagination. Clicking a photograph opens a keyboard-accessible lightbox. Escape closes it and focus returns to the triggering image.

### Local booking modal

The prototype modal contains a short demonstration form and never sends data. It must say that validation is not a completed reservation. Validation stays in the browser. Escape, backdrop click and the close button dismiss it.

## Do's and Don'ts

### Do

- Keep LOFT 47 visibly original and fictional.
- Use the dark, gold and red hierarchy consistently across all sections.
- Generate venue photography as standalone assets without embedded text or interface chrome.
- Preserve negative space in the hero image for the headline.
- Verify desktop at 1280x720 and mobile at 390x844.
- Keep every interactive element keyboard accessible and show a visible focus state.

### Don't

- Do not import any reference brand's logo, copy, reviews, contacts, map, icons or photographs.
- Do not imitate a recognisable real interior.
- Do not use pure black or pure white.
- Do not add glass cards, purple glow, decorative status dots or three equal feature cards.
- Do not place labels over photographs.
- Do not use em dashes or en dashes in visible copy.
- Do not start image generation until this file passes the official Google linter.
