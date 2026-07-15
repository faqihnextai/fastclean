---
version: "alpha"
name: "Azulejo Português"
description: "Portuguese azulejo landing page. Ideal for landing pages, saas. AI-ready template."
colors:
  primary: "#003399"
  secondary: "#F5F5F0"
  tertiary: "#C9A84C"
  neutral: "#1A1A4E"
  surface: "#B7472A"
  accent: "#556B2F"
typography:
  h1:
    fontFamily: Playfair Display
    fontSize: 2.25rem
    fontWeight: 700
  body-md:
    fontFamily: Playfair Display
    fontSize: 1rem
    fontWeight: 400
  label-caps:
    fontFamily: Playfair Display
    fontSize: 0.75rem
    fontWeight: 500
components:
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.neutral}"
    padding: 12px
---

## Overview

Portuguese azulejo landing page. Ideal for landing pages, saas. AI-ready template. The azulejo didn't start Portuguese. It arrived through Moorish craftsmen in the 15th century — geometric, repetitive, hypnotic. But Portugal did what Portugal does: absorbed it, obsessed over it, made it entirely theirs. By the 17th century, blue-and-white tin-glazed tiles covered everything. Churches, train stations, ordinary apartment facades. The pattern became the architecture.

What makes azulejos fascinating for design systems is the underlying logic. Each tile is a module. Four tiles make a larger pattern. Sixteen tiles reveal the full composition. It's component thinking, centuries before we had the vocabulary for it. The Moors understood something we keep rediscovering: constraint breeds coherence.

Translating this to digital means respecting that modularity. A single element feels incomplete — intentionally so. The system only breathes when repeated, when tiled across surfaces. That's the tension worth preserving: individual restraint serving collective richness.

- Density: 5/10 — Balanced
- Variance: 4/10 — Moderate
- Motion: 4/10 — Subtle

- **Style:** Traditional, Ornamental, Mediterranean
- **Keywords:** azulejo, portuguese tiles, traditional, ornamental, mediterranean, cobalt blue, handpainted, ceramic, pattern-rich, cultural heritage
- **Era:** 16th-18th Century Portuguese Heritage
- **Light/Dark:** ✓ Full / ✗ No

## Colors

- **Cobalt Blue** (#003399) — Accent highlight, links and focus states
- **Tile White** (#F5F5F0) — Light surface, card backgrounds
- **Warm Gold** (#C9A84C) — Premium accent, decorative highlights
- **Deep Navy** (#1A1A4E) — Supporting palette color
- **Terracotta** (#B7472A) — Extended palette, decorative use
- **Olive Green** (#556B2F) — Success states, positive indicators
- **Sun Yellow** (#F4D03F) — Warning states, attention indicators
- **Cream** (#FFFFF0) — Secondary surface


## Typography

- **Display / Hero:** Playfair Display — Weight 700, tight tracking, used for headline impact
- **Body:** Playfair Display — Weight 400, 16px/1.6 line-height, max 72ch per line
- **UI Labels / Captions:** Playfair Display — 0.875rem, weight 500, slight letter-spacing
- **Monospace:** JetBrains Mono — Used for code, metadata, and technical values

Scale:
- Hero: clamp(2.5rem, 5vw, 4rem)
- H1: 2.25rem
- H2: 1.5rem
- Body: 1rem / 1.6
- Small: 0.875rem


## Layout

- **Grid:** CSS Grid primary. Max-width containment: 1280px centered with 1.5rem side padding.
- **Spacing rhythm:** Balanced. Base unit: 0.5rem (8px).
- **Section vertical gaps:** clamp(4rem, 8vw, 8rem).
- **Hero layout:** Split-screen (text left, visual right).
- **Feature sections:** Zig-zag alternating text+image rows. No 3-equal-columns.
- **Mobile collapse:** All multi-column layouts collapse below 768px. No horizontal overflow.
- **z-index contract:** base (0) / sticky-nav (100) / overlay (200) / modal (300) / toast (500).


## Elevation & Depth

Repeating tile patterns as backgrounds, hand-painted blue illustrations, ornamental dividers, ceramic texture overlays, intricate geometric borders, shadow depth on tiles, delicate scroll motifs, warm Mediterranean gradients

- **Physics:** Ease-out curves, 200-300ms duration. Smooth and predictable.
- **Entry animations:** Fade + translate-Y (16px → 0) over 420ms ease-out. Staggered cascades for lists: 80ms between items.
- **Hover states:** Subtle color shift + shadow adjustment over 200ms.
- **Page transitions:** Fade only (200ms).
- **Performance:** Only transform and opacity animated. No layout-triggering properties.


## Shapes

Base corner radius: 8px. See rounded tokens in front matter for the full scale.


## Components

- **Primary Button:** Subtly rounded (0.5rem) shape. Accent color fill. Hover: 8% darken + subtle lift shadow. Active: -1px translate tactile press. Font weight 600. No outer glows.
- **Secondary / Ghost Button:** Outline variant. 1.5px border in muted color. Text in primary color. Hover: subtle background fill.
- **Cards:** Subtly rounded (0.5rem) corners. Surface background. Subtle shadow (0 2px 12px rgba(0,0,0,0.06)). 1px border stroke.
- **Inputs:** Label above input. 1px border stroke. Focus ring: 2px accent color offset 2px. Error text below in semantic red. No floating labels.
- **Navigation:** Primary surface background. Active item: accent color indicator. Font weight 500 when active.
- **Skeletons:** Shimmer animation matching component dimensions. No circular spinners.
- **Empty States:** Icon-based composition with descriptive text and action button.


## Do's and Don'ts

- No emojis in UI — use icon system only (Lucide, Heroicons)
- No pure black (#000000) — use off-black or charcoal variants
- No oversaturated accent colors (saturation cap: 80%)
- No 3-column equal-width feature layouts — use zig-zag or asymmetric grid
- No `h-screen` — use `min-h-[100dvh]`
- No AI copywriting clichés: "Elevate", "Seamless", "Unleash", "Next-Gen"
- No broken external image links — use picsum.photos or inline SVG
- No generic lorem ipsum in demos

- Do Repeating tile patterns
- Do Hand-painted blue illustrations
- Do Ornamental dividers
- Do Ceramic texture overlays
- Do Intricate geometric borders
- Do Delicate scroll motifs


## Use Case

Landing pages, SaaS

<!-- Source: https://designmd.app/library/azulejo-portugues · designmd.app -->
