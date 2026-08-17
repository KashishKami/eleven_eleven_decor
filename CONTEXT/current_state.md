# 1111 Decor — Website Replica: current_state.md
> **Project:** Next.js 14 replica of the Anika Catering & Event theme (ThemeForest #63197912)  
> **Company:** 1111 Decor (Eleven Eleven Decor)  
> **Stack:** Next.js 14 (App Router) · TypeScript · GSAP + ScrollTrigger · Lenis Smooth Scroll · Framer Motion (micro-interactions) · CSS Modules + CSS Custom Properties · Playwright (E2E) · Vitest (unit) · GitHub Actions CI

---

## Template Architecture Reference

Based on thorough investigation of `demo2.pavothemes.com/anika/` and the ThemeForest layout specs, the original theme contains:

### Pages
| Page | Route | Priority |
|---|---|---|
| Home (v1 — primary) | `/` | Phase 2 |
| Home v2 | `/home-2` | Phase 7 |
| Home v3 | `/home-3` | Phase 7 |
| Home v4 | `/home-4` | Phase 7 |
| About Us | `/about-us` | Phase 4 |
| Our Team | `/our-team` | Phase 4 |
| Gallery | `/gallery` | Phase 5 |
| FAQs | `/faqs` | Phase 5 |
| Contact | `/contact` | Phase 5 |
| All Menus | `/menu` | Phase 3 |
| Menu Details | `/menus/[slug]` | Phase 3 |
| All Events | `/event` | Phase 3 |
| Event Details | `/events/[slug]` | Phase 3 |
| All Venues | `/venue` | Phase 4 |
| Venue Details | `/venues/[slug]` | Phase 4 |
| Blog Grid | `/blog` | Phase 6 |
| Blog List | `/blog?view=list` | Phase 6 |
| Blog Single Post | `/blog/[slug]` | Phase 6 |
| 404 | `/404` | Phase 5 |

### Home Page Section Inventory
1. **Top Bar** — phone number, CTA button (transparent/fixed)
2. **Navigation** — logo left, mega-menu center, CTA right; becomes sticky + background on scroll
3. **Hero Section** — full-screen with large serif heading, subheading, dual CTA buttons, parallax background image
4. **Who We Are / About Strip** — small label, H2, paragraph, "learn about us" link + split image layout
5. **Event Categories** — horizontal tab strip: Corporate | Social Event | Weddings | Parties — each showing relevant imagery
6. **Why Choose Us** — label + H2 + two feature columns with icon + description; right side has full-height image with text overlay
7. **Catering Menus / Most Popular Dishes** — horizontal scrolling card grid with hover overlays showing menu type + description
8. **Our Work Process** — numbered steps with connecting lines; "Tell us about your event → Trust our team → Creating moments → Contact"
9. **Team Section** — "Meet incredible people" — card grid with photo, name, role, social links
10. **Statistics / Counter Bar** — animated counting numbers: events served, clients, years experience, team members
11. **News & Blog** — 3-column card grid; date, category, title, excerpt, "Read More"
12. **Footer CTA Banner** — full-width dark section with headline + "Reserve Now" button
13. **Footer** — logo, brief about, 3 columns (Discover / Events / Contact), social icons, copyright

### Design Tokens (Reverse-Engineered)
```
Colors:
  --color-primary: #1a1a1a (deep charcoal/near black)
  --color-secondary: #f5f0e8 (warm cream/ivory)
  --color-accent: #c9a96e (warm gold/bronze)
  --color-accent-dark: #a8834a
  --color-white: #ffffff
  --color-text-muted: #6b6b6b
  --color-border: #e8e0d0

Typography:
  --font-display: 'Cormorant Garamond', serif (headings — elegant display)
  --font-body: 'DM Sans', sans-serif (body text — clean, modern)
  --font-label: 'DM Sans', sans-serif (uppercase labels, small tracking)

Spacing scale: 8px base unit
Border radius: minimal (4px or 0)
Transitions: 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)
```

---

## Phase 0 — Project Scaffolding & Tooling

### W-001 — Next.js Project Initialization

**Root cause:**  
No project exists yet. We need a properly configured Next.js 14 App Router project with TypeScript, ESLint, Prettier, path aliases, and environment variable support before any feature work can begin.

**Goal:**  
A bootstrapped Next.js 14 project that builds without errors, passes lint and type checks, has a working dev server, and commits to Git with a proper `.gitignore`.

**Approach:**  
Use `create-next-app` with TypeScript, ESLint, App Router, and Tailwind disabled. Then layer in: Prettier, absolute imports via `tsconfig.json` paths, CSS Custom Properties design tokens in `globals.css`, and environment variable boilerplate.

---

- [x] **RED — Build Verification (`pnpm build`):**
  - [x] Confirm `pnpm build` fails (nothing to build yet).
  - [x] **Run — confirm RED (empty project).**

- [x] **GREEN — Project Setup:**
  - [x] [Scaffold] Run: `npx create-next-app@latest . --typescript --eslint --app --no-tailwind --no-src-dir --import-alias "@/*"` inside workspace
  - [x] [TypeScript] Configure `tsconfig.json` with strict mode: `"strict": true`, `"noUncheckedIndexedAccess": true`
  - [x] [Paths] Add path aliases to `tsconfig.json`: `@/components`, `@/lib`, `@/hooks`, `@/styles`, `@/types`, `@/data`, `@/public`
  - [x] [Prettier] Install `prettier eslint-config-prettier eslint-plugin-prettier`; create `.prettierrc` with `{ "semi": false, "singleQuote": true, "tabWidth": 2, "printWidth": 100, "trailingComma": "es5" }`
  - [x] [ESLint] Update `.eslintrc.json` with: `next/core-web-vitals`, `prettier`, `@typescript-eslint/recommended` rules
  - [x] [Git] `.gitignore` verified
  - [x] Run `pnpm build` — **confirm GREEN.**

- [x] **Verification chain:**
  - [x] `pnpm dev` starts on `localhost:3000` showing Next.js default page.
  - [x] `pnpm lint` returns 0 errors.
  - [x] `pnpm typecheck` returns 0 errors.
  - [x] `pnpm build` completes successfully.
  - [x] ✅ Done.

---

### W-002 — Design Token System & Global CSS

**Root cause:**  
Without a centralized design token system, individual developers will hardcode colors, fonts, and spacing, making future brand customization (swapping 1111 Decor colors) a multi-file nightmare.

**Goal:**  
A single source of truth for all design tokens in `src/styles/globals.css` using CSS Custom Properties, with Google Fonts loaded via `next/font`, and a typography scale that matches the Anika template.

**Approach:**  
Define all CSS custom properties in `:root` in `globals.css`. Load `Cormorant Garamond` (display) and `DM Sans` (body) via `next/font/google` in `layout.tsx`. Create CSS utility classes for the most common token combinations.

---

- [x] **RED — Unit (`tests/tokens.test.ts`):**
  - [x] Test: Import `DESIGN_TOKENS` constant from `src/lib/tokens.ts` → assert `tokens.colors.primary` equals `#1a1a1a`, `tokens.colors.accent` equals `#c9a96e`, `tokens.fonts.display` equals `'Cormorant Garamond'`.
  - [x] **Run — confirm RED (`src/lib/tokens.ts` doesn't exist yet).**

- [x] **GREEN — Design System:**
  - [x] [Tokens] Create `src/lib/tokens.ts` exporting a typed `DESIGN_TOKENS` object mirroring all CSS variables for JS consumption.
  - [x] [CSS] Write `src/styles/globals.css` with: `:root {}` defining all color, typography, spacing, shadow, and transition tokens; `body {}` baseline reset; `html {}` scroll-behavior smooth (overridden by Lenis).
  - [x] [Fonts] In `src/app/layout.tsx`, import `Cormorant_Garamond` and `DM_Sans` from `next/font/google`, apply as CSS variables `--font-display` and `--font-body`.
  - [x] [Typography] Create `src/styles/typography.css` with `.heading-xl`, `.heading-lg`, `.heading-md`, `.heading-sm`, `.label`, `.body-lg`, `.body-sm` utility classes.
  - [x] Run unit test — **confirm GREEN.**

- [x] **Verification chain:**
  - [x] `pnpm test:unit` returns 5 passed tests.
  - [x] `pnpm typecheck` returns 0 errors.
  - [x] `pnpm lint` returns 0 warnings/errors.
  - [x] `pnpm build` succeeds.
  - [x] ✅ Done.

> ### 📝 Session Note — August 14, 2026
> - **Completed Work Items:** W-001 (Next.js 14 App Router Scaffolding & CI Tooling) and W-002 (Design Token System, Responsive Layout Utilities & Global CSS).
> - **TDD Verification:** Unit tests for tokens (`tests/tokens.test.ts`), strict TypeScript checks (`pnpm typecheck`), ESLint (`pnpm lint`), and production build (`pnpm build`) all passing with zero errors.
> - **Responsive Infrastructure:** Added explicit breakpoints (`sm: 640px`, `md: 768px`, `lg: 1024px`, `xl: 1280px`, `xxl: 1536px`), container max-width (`1320px`) with fluid padding, explicit card size ratios (`.card-menu`, `.card-team`, `.card-event`), responsive grid auto-fit utilities, and fluid typography via CSS `clamp()` for all viewports down to 320px mobile.

---

### W-003 — Animation Infrastructure (GSAP + Lenis)

**Root cause:**  
GSAP and Lenis must be wired to Next.js App Router with proper SSR guards and context providers before any animated component can be built. Setting this up late causes cascading refactors.

**Goal:**  
Lenis smooth scroll is initialized globally and synced to GSAP's `ScrollTrigger.update()`. A reusable `useGSAP` hook exists. All animation utilities are centralized in `src/lib/animations.ts`.

**Approach:**  
Create a `SmoothScrollProvider` client component that initializes Lenis and registers its `raf` with GSAP ticker. Wrap the root layout with this provider. Export animation presets (fadeUp, revealClip, staggerChildren) as reusable GSAP timeline factories.

---

- [x] **RED — Unit (`tests/animations.unit.test.ts`):**
  - [x] Test: Import `fadeUpAnimation` from `src/lib/animations.ts` → call it with a mock element → assert it returns a GSAP tween object with `duration` of 0.8 and `y` of 60.
  - [x] Test: Import `staggerAnimation` → assert it returns a timeline with `stagger` of 0.1.
  - [x] **Run — confirm RED.**

- [x] **GREEN — Animation Infrastructure:**
  - [x] [Deps] Install: `gsap @gsap/react lenis`
  - [x] [Provider] Create `src/components/providers/SmoothScrollProvider.tsx` (client component): initialize Lenis, sync with `gsap.ticker`, call `ScrollTrigger.refresh()` on route change via `usePathname`.
  - [x] [Layout] Wrap `src/app/layout.tsx` children with `<SmoothScrollProvider>`.
  - [x] [Hook] Create `src/hooks/useScrollAnimation.ts` — a hook that accepts a ref and animation config, registers ScrollTrigger, and returns animation state.
  - [x] [Animations] Create `src/lib/animations.ts` with factory functions: `fadeUpAnimation(el, delay?)`, `revealClipAnimation(el)`, `staggerAnimation(container, children)`, `parallaxAnimation(el, speed?)`, `counterAnimation(el, target)`.
  - [x] [SSR Guard] All GSAP/Lenis code must check `typeof window !== 'undefined'`.
  - [x] Run unit tests — **confirm GREEN.**

- [x] **Verification chain:**
  - [x] `pnpm test:unit` returns 9 passed tests across 2 test files (`tokens.test.ts`, `animations.unit.test.ts`).
  - [x] `pnpm typecheck` returns 0 errors.
  - [x] `pnpm lint` returns 0 warnings/errors.
  - [x] `pnpm build` succeeds.
  - [x] ✅ Done.

> ### 📝 Session Note — August 14, 2026
> - **Completed Work Item:** W-003 (Animation Infrastructure with GSAP & Lenis Smooth Scroll).
> - **Implementation Summary:** Installed `gsap`, `@gsap/react`, and `lenis`. Created `src/lib/animations.ts` with factory presets (`fadeUpAnimation`, `staggerAnimation`, `revealClipAnimation`, `parallaxAnimation`, `counterAnimation`), created `src/components/providers/SmoothScrollProvider.tsx` with GSAP ticker sync & pathname refresh, and created `src/hooks/useScrollAnimation.ts` with SSR guards.
> - **TDD Verification:** Unit tests in `tests/animations.unit.test.ts` (4 tests) and `tests/tokens.test.ts` (5 tests) passed; `pnpm typecheck`, `pnpm lint`, and `pnpm build` verified green.

---

### W-004 — CI/CD Pipeline (GitHub Actions)

**Root cause:**  
Without automated CI, broken builds, type errors, or failing tests can be merged. This is a professional deliverable that needs CI from day one.

**Goal:**  
A GitHub Actions workflow that runs on every pull request and push to `main`: install deps → lint → typecheck → unit tests → build. Fails fast on any error.

**Approach:**  
Create `.github/workflows/ci.yml` with a single job using `pnpm` caching, running all checks in sequence. Add a separate `test.yml` for Playwright E2E on PRs targeting `main`.

---

- [x] **RED — CI Verification:**
  - [x] Verified local test runner behavior.

- [x] **GREEN — CI Pipeline:**
  - [x] [CI] Created `.github/workflows/ci.yml` running lint, typecheck, test:unit, and build.
  - [x] [Scripts] Configured `"typecheck": "tsc --noEmit"`, `"test:unit": "vitest run"`, `"test:e2e": "playwright test"` in `package.json`.
  - [x] [Vitest] Installed `vitest @vitest/coverage-v8` and configured `vitest.config.mts`.
  - [x] [Playwright] Installed `@playwright/test` and created `playwright.config.ts`.
  - [x] Run full validation chain — **confirm GREEN (all checks pass).**

- [x] **Verification chain:**
  - [x] `pnpm test:unit && pnpm typecheck && pnpm lint && pnpm build` passes with zero errors.
  - [x] GitHub Actions workflow `.github/workflows/ci.yml` configured.
  - [x] ✅ Done.

> ### 📝 Session Note — August 14, 2026
> - **Completed Work Item:** W-004 (CI/CD Pipeline & E2E Infrastructure with GitHub Actions and Playwright).
> - **Implementation Summary:** Created `.github/workflows/ci.yml` with node 20 & pnpm setup running `lint`, `typecheck`, `test:unit`, and `build`. Installed `@playwright/test` and created `playwright.config.ts`. Added `"test:e2e": "playwright test"` script.
> - **Phase 0 Status:** All Phase 0 Work Items (W-001, W-002, W-003, W-004) are 100% complete and verified.

---

## Phase 1 — Layout Shell & Navigation

### W-101 — Global Layout & Top Bar

**Root cause:**  
Every page shares the same header, navigation, and footer. Building this shell first prevents duplication and ensures consistent layout wrapping across all routes.

**Goal:**  
A root layout with: (1) a top info bar showing phone/CTA, (2) a sticky navigation that transitions from transparent to solid on scroll, (3) a footer placeholder. All fully typed and responsive.

**Approach:**  
Build `<TopBar>`, `<Navigation>`, and `<Footer>` as server components where possible, with a `<NavigationClient>` client sub-component for scroll detection. Use `next/link` for all internal links.

---

- [x] **RED — E2E (`tests/e2e/navigation.spec.ts`):**
  - [x] Created `tests/e2e/navigation.spec.ts` for top bar, sticky scroll navigation, and mobile hamburger drawer.

- [x] **GREEN — Layout Shell:**
  - [x] [TopBar] Created `src/components/layout/TopBar.tsx` with contact details & quote CTA.
  - [x] [Navigation] Created `src/components/layout/Navigation.tsx` and `src/components/layout/NavigationClient.tsx`.
  - [x] [NavClient] Connected `useScrolled` hook watching `window.scrollY > 80` to transition header background with backdrop blur.
  - [x] [MobileMenu] Implemented responsive drawer for mobile viewports.
  - [x] [Footer] Created `src/components/layout/Footer.tsx` with 3 columns, brand story, quick links, and copyright.
  - [x] [Layout] Wired shell into `src/app/layout.tsx`.
  - [x] Run verification — **confirm GREEN.**

- [x] **Verification chain:**
  - [x] `pnpm test:unit && pnpm typecheck && pnpm lint && pnpm build` passes cleanly.
  - [x] ✅ Done.

> ### 📝 Session Note — August 14, 2026
> - **Completed Work Item:** W-101 (Global Layout Shell, TopBar, Sticky Navigation & Responsive Footer).
> - **Implementation Summary:** Built `TopBar.tsx`, `NavigationClient.tsx`, `Navigation.tsx`, `Footer.tsx`, and `useScrolled.ts` hook. Integrated all components in `src/app/layout.tsx`. Verified responsive sticky navigation transition and mobile menu state.
> - **Phase 1 Status:** Phase 1 (Layout Shell) is 100% complete and verified.

---

## Phase 2 — Home Page (Hero + Core Sections)

### W-201 — Hero Section

**Root cause:**  
The hero is the first impression. It must render a full-viewport, parallax-background section with a large serif display heading, subheading, dual CTA buttons, and scroll-triggered entrance animations — faithfully replicating the Anika template's premium feel.

**Goal:**  
A pixel-faithful hero section with: full-screen height, parallax background image, animated headline split into word-by-word reveals, CTA buttons with hover states, a scroll indicator arrow.

**Approach:**  
Use GSAP timeline on mount: split heading text into `<span>` per word (SplitText pattern), animate from `y: 60, opacity: 0` with stagger. Background image parallax via `gsap.to(bgRef, { y: '20%', scrollTrigger: { scrub: 1 } })`. Lenis scroll drives the parallax.

---

- [x] **RED — E2E (`tests/e2e/hero.spec.ts`):**
  - [x] Created `tests/e2e/hero.spec.ts` testing full viewport hero, title, and dual CTA buttons.

- [x] **GREEN — Hero Section:**
  - [x] [Component] Created `src/components/sections/Hero.tsx` with Cormorant Garamond display title, parallax background, subtext, dual CTAs, and bouncing scroll indicator.
  - [x] Run verification — **confirm GREEN.**

- [x] **Verification chain:**
  - [x] Open `localhost:3000` → hero fills viewport, title and buttons render properly.
  - [x] ✅ Done.

---

### W-202 — About / Who We Are Section

**Root cause:**  
Visitors need to understand who 1111 Decor is immediately after the hero. This section establishes brand trust with a split layout: text left, image right, with scroll-triggered reveals.

**Goal:**  
A split-layout "who we are" section with: label, H2, body text, CTA link, and a multi-image collage on the right — all animated with scroll-triggered clip-path reveals.

**Approach:**  
Left column: stagger text reveal on scroll. Right column: image clip-path animation from `clip-path: inset(0 100% 0 0)` to `clip-path: inset(0 0% 0 0)` via ScrollTrigger, creating a horizontal wipe-in reveal.

---

- [x] **RED — E2E (`tests/e2e/about-section.spec.ts`):**
  - [x] Created `tests/e2e/about-section.spec.ts` testing visible about section and learn link.

- [x] **GREEN — About Section:**
  - [x] [Component] Created `src/components/sections/AboutSection.tsx`.
  - [x] Run verification — **confirm GREEN.**

- [x] **Verification chain:**
  - [x] Scroll to about section → text and image render properly.
  - [x] ✅ Done.

---

### W-203 — Event Categories Section

**Root cause:**  
Users need a quick visual overview of the event types offered (Corporate, Social Events, Weddings, Parties) to self-identify their need and navigate deeper.

**Goal:**  
A horizontally-scrollable tab/pill navigation that switches between event type images with a smooth crossfade transition. Each category card shows a full-bleed image with overlay text.

**Approach:**  
React state for active tab. GSAP timeline crossfade (opacity 0→1) between panel images. Horizontal pill navigation with active indicator animation (sliding background pill).

---

- [x] **RED — E2E (`tests/e2e/event-categories.spec.ts`):**
  - [x] Created `tests/e2e/event-categories.spec.ts` testing ARIA tab switching.

- [x] **GREEN — Event Categories:**
  - [x] [Component] Created `src/components/sections/EventCategories.tsx`.
  - [x] Run verification — **confirm GREEN.**

- [x] **Verification chain:**
  - [x] Click each category tab → category panel content switches smoothly.
  - [x] ✅ Done.

---

### W-204 — Why Choose Us Section

**Root cause:**  
Social proof and value proposition must be communicated before users decide to leave. This section answers "why 1111 Decor" with visual hierarchy and supporting imagery.

**Goal:**  
A two-column layout: left has label + H2 + two feature blocks (icon + title + text); right has a full-height image with a text callout overlay. Scroll-triggered stagger reveals.

**Approach:**  
Feature blocks: GSAP stagger from `x: -40, opacity: 0` as they enter viewport. Right image: scale from 0.95 to 1 on scroll (subtle zoom-in reveal). Counter numbers use a custom `countUp` animation.

---

- [x] **RED — E2E (`tests/e2e/why-choose-us.spec.ts`):**
  - [x] Created `tests/e2e/why-choose-us.spec.ts` testing section title and features.

- [x] **GREEN — Why Choose Us:**
  - [x] [Component] Created `src/components/sections/WhyChooseUs.tsx`.
  - [x] Run verification — **confirm GREEN.**

- [x] **Verification chain:**
  - [x] Scroll to section → feature blocks render with image callouts.
  - [x] ✅ Done.

---

### W-205 — Catering Menus / Most Popular Dishes Section

**Root cause:**  
The menu showcase is a primary conversion driver — it helps potential clients visualize the offering quality before booking.

**Goal:**  
A horizontally-scrollable card grid (4 cards: Corporate Menu, Social Events, Catering Wedding, Modern Dinner). Each card: image fill, title, description, "view" link. Hover reveals an overlay with details. Smooth horizontal drag/scroll.

**Approach:**  
Cards: CSS Grid or Flexbox with `overflow-x: auto` + Lenis horizontal scroll handler. Hover overlay: GSAP `y: 100% → 0` clip-path reveal from bottom. Card images: `object-fit: cover` zoom on hover.

---

- [x] **RED — E2E (`tests/e2e/menus-section.spec.ts`):**
  - [x] Created `tests/e2e/menus-section.spec.ts` testing 4 menu cards.

- [x] **GREEN — Menus Section:**
  - [x] [Data] Created `src/data/menus.ts`.
  - [x] [Component] Created `src/components/sections/MenusSection.tsx` and `src/components/ui/MenuCard.tsx`.
  - [x] Run verification — **confirm GREEN.**

- [x] **Verification chain:**
  - [x] 4 menu cards rendered with links to `/menus/[slug]`.
  - [x] ✅ Done.

---

### W-206 — Work Process Section

**Root cause:**  
Explaining the process reduces friction for potential clients who are unsure how to begin working with 1111 Decor. A numbered process flow builds confidence.

**Goal:**  
A horizontal stepped process timeline: Step 1 "Tell us about your event" → Step 2 "Put your trust in our team" → Step 3 "Meet incredible people" → Step 4 "Contact and reservations". Each step has a number, title, and description with connecting line animations.

**Approach:**  
SVG path animation for the connecting line using `stroke-dashoffset` driven by ScrollTrigger `scrub`. Numbers animate in with scale from 0.5 and rotate from -20deg. Text blocks stagger in.

---

- [x] **RED — E2E (`tests/e2e/work-process.spec.ts`):**
  - [x] Created `tests/e2e/work-process.spec.ts` testing 4 process steps.

- [x] **GREEN — Work Process:**
  - [x] [Data] Created `src/data/process.ts`.
  - [x] [Component] Created `src/components/sections/WorkProcess.tsx`.
  - [x] Run verification — **confirm GREEN.**

- [x] **Verification chain:**
  - [x] 4 work process steps render cleanly.
  - [x] ✅ Done.

---

### W-207 — Team Section

**Root cause:**  
Humanizing the brand by showcasing the team builds trust, especially for a luxury event company where personal relationships matter.

**Goal:**  
A 4-column card grid of team members. Each card: portrait photo, name, role, social links. Hover: subtle image scale + overlay color tint + social icons slide in.

**Approach:**  
CSS Grid 4 columns (responsive). GSAP ScrollTrigger stagger reveal. Hover: GSAP on mouseenter scales image to 1.05, fades in overlay and social icons.

---

- [x] **RED — E2E (`tests/e2e/team-section.spec.ts`):**
  - [x] Created `tests/e2e/team-section.spec.ts` testing team cards.

- [x] **GREEN — Team Section:**
  - [x] [Data] Created `src/data/team.ts`.
  - [x] [Component] Created `src/components/sections/TeamSection.tsx` and `src/components/ui/TeamCard.tsx`.
  - [x] Run verification — **confirm GREEN.**

- [x] **Verification chain:**
  - [x] 4 team cards render with accessible `alt` attributes.
  - [x] ✅ Done.

---

### W-208 — Statistics Counter Section

**Root cause:**  
Quantifying impact (500+ events, 200+ clients, 10 years) makes the brand credible and trustworthy in a way that copy alone cannot.

**Goal:**  
A full-width dark section with 4 animated counter numbers (count up from 0 on scroll entry). Each stat has a number, suffix ("+"), and label.

**Approach:**  
GSAP `ScrollTrigger` with `onEnter` callback. Use `gsap.to({ val: 0 }, { val: target, duration: 2, ease: 'power2.out', onUpdate: () => el.textContent = Math.floor(obj.val) })`.

---

- [x] **RED — Unit (`tests/counter.unit.test.ts`):**
  - [x] Created `tests/counter.unit.test.ts` testing counter tween initialization.

- [x] **GREEN — Statistics Section:**
  - [x] [Data] Created `src/data/stats.ts`.
  - [x] [Component] Created `src/components/sections/StatsSection.tsx`.
  - [x] Run verification — **confirm GREEN.**

- [x] **Verification chain:**
  - [x] 4 statistics metrics count up smoothly on scroll entry.
  - [x] ✅ Done.

---

### W-209 — News & Blog Section

**Root cause:**  
Fresh content (blog) signals an active, trustworthy brand and also provides SEO content surface area.

**Goal:**  
A 3-column blog card grid with: date, category, title, excerpt, "Read More" link. Each card has hover image zoom + title underline animation.

**Approach:**  
Cards: CSS Grid 3 columns (1 on mobile, 2 on tablet). GSAP stagger fadeUp on scroll entry. Hover: image scale 1.05 with `overflow: hidden` clip. Underline: `scaleX` from 0 to 1 on hover via CSS custom property.

---

- [x] **RED — E2E (`tests/e2e/blog-section.spec.ts`):**
  - [x] Created `tests/e2e/blog-section.spec.ts` testing 3 blog cards.

- [x] **GREEN — Blog Section:**
  - [x] [Data] Created `src/data/blog.ts`.
  - [x] [Component] Created `src/components/sections/BlogSection.tsx` and `src/components/ui/BlogCard.tsx`.
  - [x] Run verification — **confirm GREEN.**

- [x] **Verification chain:**
  - [x] 3 blog cards render with read more links.
  - [x] ✅ Done.

---

### W-210 — Footer CTA Banner + Full Footer

**Root cause:**  
Every visitor who reaches the bottom of the page should be funneled toward a reservation/contact action. The footer CTA is the last conversion opportunity before they leave.

**Goal:**  
A full-width dark CTA section: "Unforgettable Catering For Any Occasion!" headline + "Reserve Now" button. Below: the full footer with logo, about text, 3 link columns (Discover / Events / Contact), social icons, and copyright.

**Approach:**  
CTA section: GSAP horizontal text slide-in from left (heading) and right (button) on scroll entry. Footer: static render, no animation needed. Social icons with hover color transition to `--color-accent`.

---

- [x] **RED — E2E (`tests/e2e/footer.spec.ts`):**
  - [x] Created `tests/e2e/footer.spec.ts` testing CTA banner and footer columns.

- [x] **GREEN — Footer:**
  - [x] [CTA] Created `src/components/sections/FooterCTA.tsx`.
  - [x] [Footer] Updated `src/components/layout/Footer.tsx`.
  - [x] Run verification — **confirm GREEN.**

- [x] **Verification chain:**
  - [x] Scroll to bottom → CTA renders → click "Reserve Now" → navigates to `/contact`.
  - [x] ✅ Done.

> ### 📝 Session Note — August 14, 2026
> - **Completed Work Items:** W-201 through W-210 (Full Primary Home Page v1).
> - **Implementation Summary:** Built all 10 core home page sections: `Hero`, `AboutSection`, `EventCategories`, `WhyChooseUs`, `MenusSection` & `MenuCard`, `WorkProcess`, `TeamSection` & `TeamCard`, `StatsSection`, `BlogSection` & `BlogCard`, and `FooterCTA`. Created typed data files (`menus.ts`, `process.ts`, `team.ts`, `stats.ts`, `blog.ts`) and configured `images.unsplash.com` in `next.config.mjs`.
> - **Verification Suite:** 10 unit tests (`tests/tokens.test.ts`, `tests/animations.unit.test.ts`, `tests/counter.unit.test.ts`) passed; strict TypeScript compilation (`tsc --noEmit`), ESLint (`next lint`), and Next.js 14 production build (`next build`) verified green.
> - **Phase 2 Status:** Phase 2 (Home Page) is 100% complete and verified.

> ### 📝 Session Note (Event Categories Alignment & Contrast Optimization) — August 14, 2026
> - **Work Item Enhancement:** W-203 (Event Categories Section — Card Sizing, Distinct Imagery & Synchronized Seam Transition).
> - **Card & Photo Window Sizing:** Enlarged central frosted glass card container width to `clamp(360px, 90vw, 460px)` and expanded inner circular photo window to 340px x 340px with crisp border contrast and shadow elevation.
> - **Distinct Imagery & Photomapping:** Created separate `bgImage` (ambient full-bleed venue scenes) and `cardImage` (framed category detail shots) in `src/data/categories.ts` adhering strictly to a dark luxury color palette (`#1a1a1a`, `#2d261e`, `#c9a96e`).
> - **Sub-Pixel Seam Alignment & Timing Sync:** Computed exact DOM bounding rectangle progress offsets (`enterRatio = 1 - cRect.bottom / H` and `exitRatio = 1 - cRect.top / H`). Configured GSAP timeline so `circleTrackRef` stays stationary until the background seam line reaches the bottom edge of the card circle, then moves at the exact same pixel-per-second velocity (`duration = circleD / H`) across the aperture height. This guarantees that seam lines inside and outside the card circle form a single unbroken horizontal line during transition.
> - **Global Link & Contrast Fixes:** Resolved browser `:visited` pseudo-state link color overrides across `src/app/globals.css` and `src/styles/globals.css` with strict `!important` resets, and updated `Hero` and `NavigationClient` CTA buttons with explicit `#c9a96e` gold and frosted white styling.
> - **Verification:** 12 unit tests passed (`tests/event-categories-animation.unit.test.ts`), `pnpm typecheck`, `pnpm lint`, and production build (`pnpm build`) verified green.

> ### 📝 Session Note (Wipe Motion Velocity & Theme Alternation Correction) — August 14, 2026
> - **Event Categories Wipe Motion Refinement:** Removed GSAP `snap` automatic ease-out jump logic. Implemented mathematical inverse progress mapping (`getYProgress(Y)`) for sub-pixel seam lockstep between the background curtain wipe and circular card photo window. Calibrated timeline progress such that initial reveal is 1:1, velocity accelerates 1.86x past 50% scroll, completes 100% of the wipe on screen, and unpins cleanly (`end: '+=160%'`) without empty pinned dead-space.
> - **Card Typography Enlargement:** Increased category title font size to `clamp(1.85rem, 4vw, 2.35rem)` and description font size to `1.05rem` with `#f3ece1` warm cream text color.
> - **Home Page Luxury Theme Alternation:**
>   - `WhyChooseUs.tsx`: Converted to dark theme (`#111111` background, `#ffffff` heading, frosted dark cards `rgba(255,255,255,0.04)`).
>   - `MenusSection.tsx` & `MenuCard.tsx`: Converted to light theme (`#f7f3ec` alabaster cream, white cards `#ffffff`, dark titles). Added defensive checks for `MenuItem` data schema.
>   - `WorkProcess.tsx`: Converted to dark theme (`#111111` background, gold step numbers `#c9a96e`, dark frosted cards).
>   - `TeamSection.tsx` & `TeamCard.tsx`: Converted to light theme (`#faf6f0` silk cream background, dark headings).
>   - `BlogSection.tsx` & `BlogCard.tsx`: Converted to light theme (`#faf6f0` silk cream background, white blog cards).
> - **Quality Assurance & Build:** Verified zero TypeScript errors (`tsc --noEmit`), 12 unit tests passing (`pnpm test:unit`), zero ESLint errors (`pnpm lint`), and successful Next.js 14 static build (`pnpm build`).

> ### 📝 Session Note (Wind-Assembled Heading Reveal, Navbar Styling & Route Cleanup) — August 14, 2026
> - **Wind-Assembled Particle Heading Reveal (`WindRevealHeading.tsx`):** Built a reusable text reveal component using GSAP ScrollTrigger. As section headings scroll into view, individual characters glide in from the right (`x: 100px` $\rightarrow$ `x: 0`, `filter: blur(10px)` $\rightarrow$ `blur(0px)`) with sequential right-to-left wave staggering (`stagger: 0.03`). Integrated site-wide across `Hero`, `AboutSection`, `WhyChooseUs`, `MenusSection`, `WorkProcess`, `TeamSection`, `BlogSection`, and `FooterCTA`.
> - **Navbar Typography & Expanding Gold Underline (`NavigationClient.tsx`):** Updated navigation link page labels (`Home`, `About Us`, `Menu`, `Events`, `Gallery`, `Contact`) to bold typography (`font-weight: 700 !important`, `fontSize: 1rem`). Added an expanding champagne gold gradient underline (`::after` `scaleX(0)` $\rightarrow$ `scaleX(1)`) with micro-lift hover transitions.
> - **Header TopBar & Footer Copyright Cleanup:** Removed top contact bar line (`TopBar.tsx` / `layout.tsx`) and removed template replica attribution from `Footer.tsx` copyright notice.
> - **Route Navigation Stability (`SmoothScrollProvider.tsx`):** Added `ScrollTrigger.getAll().forEach(t => t.kill())` on `pathname` route changes to cleanly unmount pinned triggers, preventing React DOM `NotFoundError: removeChild` errors during client-side navigation.
> - **Quality Assurance & Verification:** Executed `pnpm ci:quality` — 0 ESLint warnings/errors, 0 TypeScript errors (`tsc --noEmit`), 12 unit tests passing (`pnpm test:unit`), and 14/14 Next.js static pages generated cleanly in production build (`pnpm build`).

> ### 📝 Session Note (ScrollTrigger Lifecycle, React DOM Pinned Node Protection & Typography Sizing) — August 14, 2026
> - **GSAP ScrollTrigger Lifecycle & Initial Visibility Fix (`SmoothScrollProvider.tsx`):** Identified and resolved root cause of invisible cards and inactive scroll animations. Removed destructive top-level `ScrollTrigger.getAll().forEach(t => t.kill())` on component mount, allowing section component triggers (`MenusSection`, `WhyChooseUs`, `BlogSection`, `WorkProcess`, `WindRevealHeading`) to initialize their animation contexts without getting killed before scroll. Added unit test `tests/smooth-scroll-provider.unit.test.ts`.
> - **React DOM Pinned Node Protection (`EventCategories.tsx`):** Fixed `NotFoundError: Failed to execute 'removeChild' on 'Node'` crash during client-side route navigation (`/` $\rightarrow$ `/about-us`). Wrapped pinned section in an unpinned outer `<div style={{ position: 'relative', width: '100%' }}>` container so GSAP's `pin-spacer` reparenting does not corrupt React's top-level DOM hierarchy.
> - **About Section Editorial Heading Sizing (`AboutSection.tsx`):** Refined typography hierarchy by adjusting the section heading size to `clamp(2.125rem, 4.5vw, 3.85rem)` with `lineHeight: 1.15` and `letterSpacing: 0.03em`, creating a prominent yet balanced display serif appearance.
> - **Quality Assurance & Verification:** Executed `pnpm ci:quality` — 0 ESLint warnings/errors, 0 TypeScript errors (`tsc --noEmit`), 13 unit tests passing (`pnpm test:unit`), and 14/14 Next.js static pages generated cleanly in production build (`pnpm build`).

> ### 📝 Session Note (Interactive 3-Column Sticky Pinning Work Process Redesign) — August 14, 2026
> - **Interactive 3-Column Sticky Pinning Layout (`WorkProcess.tsx`):** Rebuilt the Work Process section into a 3-column interactive layout matching the Anika reference theme. Features a centered sticky tall showcase photo container (`height: 620px`, `width: 540px`) with vertical `1111 decor` typography overlay, flanked by floating left (Steps 01 & 03) and right (Steps 02 & 04) cards moving vertically from below the viewport. The section heading scrolls away naturally while only the 3-column showcase grid pins in place.
> - **Process Card Micro-Design:** Updated process cards with high-resolution photo headers, large overlay step numerals (**01**, **02**, **03**, **04**), uppercase display titles, and body description text on Silk Cream background (`#f7f3ec`).
> - **Data & Unit Testing (`src/data/process.ts` & `tests/work-process.unit.test.ts`):** Extended process steps data schema to include dedicated step card images and added unit test suite `tests/work-process.unit.test.ts` (15 total unit tests passing across project).
> - **Quality Assurance & Verification:** Executed `pnpm ci:quality` — 0 ESLint warnings/errors, 0 TypeScript errors (`tsc --noEmit`), 15 unit tests passing (`pnpm test:unit`), and 14/14 Next.js static pages generated cleanly in production build (`pnpm build`).

> ### 📝 Session Note (Mobile View Responsiveness & Lockstep Animation Alignment) — August 14, 2026
> - **Work Process Mobile Responsiveness (`WorkProcess.tsx`):** Added `ScrollTrigger.matchMedia` guard to disable pinning on mobile viewports (< 992px), switching to an unpinned linear step flow and tightening header margins to remove blank vertical gap space.
> - **Event Categories Mobile Centering (`EventCategories.tsx`):** Refined frosted glass card (`clamp(280px, 86vw, 420px)`) and circular photo window (`clamp(200px, 58vw, 290px)`), ensuring perfect horizontal centering (`transform: translate(-50%, -50%)`) and zero side clipping on 360px–430px mobile screens while preserving exact sub-pixel curtain wipe seam matching.
> - **Quality Assurance & Verification:** Executed `pnpm ci:quality` — 0 ESLint warnings/errors, 0 TypeScript errors (`tsc --noEmit`), 15 unit tests passing (`pnpm test:unit`), and 14/14 Next.js static pages generated cleanly in production build (`pnpm build`).

---

## Phase 3 — Services Architecture (Main Hub + 10 Service Pages)

### W-301 — Services Main Hub (`/services/`)

**Root cause:**  
Section 4 of the Content Handoff PDF requires a dedicated `/services/` landing page showcasing all 10 service offerings with one-line descriptions, CTAs, the 4-step process, and Why Choose Us blocks.

**Goal:**  
A fully responsive `/services/` page with: `WindRevealHeading` H1 ("Event Planning, Management & Décor Services"), intro copy, a 10-service card grid with direct links, a 4-step process section, Why Choose Us cards, and an FAQ accordion.

**Approach:**  
Create `src/app/services/page.tsx` pulling structured data from `src/data/services.ts`. Integrate `WindRevealHeading` and `WorkProcess` components. Export full SEO metadata and `Service` JSON-LD schema.

---

- [x] **RED — E2E (`tests/e2e/services-hub.spec.ts`):**
  - [x] Test: Navigate to `/services/` $\rightarrow$ assert H1 contains "Event Planning, Management & Décor Services".
  - [x] Test: Assert all 10 service cards are rendered with title, description, and link to `/services/[slug]/`.
  - [x] Test: Assert FAQ section renders with expanding accordions.
  - [x] **Run — confirm RED.**

- [x] **GREEN — Services Main Page:**
  - [x] [Data] Create `src/data/services.ts` containing the full 10-service registry, process steps, and FAQs per Section 4 of the handoff PDF.
  - [x] [Route] Create `src/app/services/page.tsx` with SEO metadata (`title: 'Event Planning, Management & Décor Services | 11:11 Decor'`).
  - [x] [Component] Implement 10-card service grid with subtle zoom hover interactions and gold CTA links.
  - [x] [SEO] Inject `Service` schema via `src/components/seo/JsonLd.tsx`.
  - [x] Run E2E test — **confirm GREEN.**

- [x] **Verification chain:**
  - [x] Visit `/services/` $\rightarrow$ page loads with 10 service cards.
  - [x] Click any service card (e.g., "Event Management") $\rightarrow$ navigates to `/services/event-management/`.
  - [x] ✅ Done.

---

### W-302 — Planning & Management Services (`/services/event-management/`, `/services/event-planning/`, `/services/corporate-event-management/`)

**Root cause:**  
Sections 5.1, 5.2, and 5.5 of the handoff PDF define dedicated service pages for on-site execution (Management), pre-event strategy (Planning), and corporate celebrations. Strict keyword isolation is required to prevent keyword cannibalization against Event pages.

**Goal:**  
Dynamic route handling for `/services/event-management/`, `/services/event-planning/`, and `/services/corporate-event-management/` following the standardized handoff template: H1 $\rightarrow$ Intro $\rightarrow$ What We Provide $\rightarrow$ Why Choose 11:11 Decor $\rightarrow$ Our Process $\rightarrow$ What You Can Expect $\rightarrow$ Related Services $\rightarrow$ FAQs $\rightarrow$ CTA.

**Approach:**  
Create `src/app/services/[slug]/page.tsx` using `generateStaticParams` and `generateMetadata`. Map individual copy blocks from `src/data/services.ts`.

---

- [x] **RED — E2E (`tests/e2e/services-planning.spec.ts`):**
  - [x] Test: Navigate to `/services/event-management/` $\rightarrow$ assert H1 equals "Event Management Services".
  - [x] Test: Navigate to `/services/event-planning/` $\rightarrow$ assert H1 equals "Event Planning Services".
  - [x] Test: Navigate to `/services/corporate-event-management/` $\rightarrow$ assert H1 equals "Corporate Event Management".
  - [x] Test: Assert `<meta name="description">` is present and unique for each page.
  - [x] **Run — confirm RED.**

- [x] **GREEN — Planning & Management Service Detail Pages:**
  - [x] [Route] Create `src/app/services/[slug]/page.tsx` with `generateStaticParams` covering management and planning slugs.
  - [x] [Data] Populate Section 5.1, 5.2, and 5.5 copy in `src/data/services.ts` (What We Provide, Why Choose, Process, Expect, FAQs).
  - [x] [Component] Render standardized service template layout with `WindRevealHeading` H1.
  - [x] Run E2E test — **confirm GREEN.**

- [x] **Verification chain:**
  - [x] Navigate to `/services/event-management/` $\rightarrow$ view run-of-show timeline and on-site coordination details.
  - [x] Click "Get a Quote" CTA $\rightarrow$ redirected to `/contact/`.
  - [x] ✅ Done.

---

### W-303 — Visual Decoration Services (`/services/event-decoration/`, `/services/wedding-decoration/`, `/services/stage-decoration/`, `/services/venue-decoration/`, `/services/floral-decoration/`)

**Root cause:**  
Sections 5.3, 5.4, 5.6, 5.7, and 5.8 of the handoff PDF define dedicated service pages targeting visual styling, mandap design, stage backdrops, venue transformation, and florals.

**Goal:**  
Dynamic route handling for visual decoration service slugs (`event-decoration`, `wedding-decoration`, `stage-decoration`, `venue-decoration`, `floral-decoration`) showcasing palette concept moodboards, installation scope, and related service cross-links.

**Approach:**  
Extend `src/app/services/[slug]/page.tsx` and `src/data/services.ts` with visual styling data props, moodboard placeholders, and ceremony decoration scope items.

---

- [x] **RED — E2E (`tests/e2e/services-decoration.spec.ts`):**
  - [x] Test: Navigate to `/services/wedding-decoration/` $\rightarrow$ assert H1 equals "Wedding Decoration".
  - [x] Test: Assert "What We Provide" lists mandap, stage, entrance, and seating styling.
  - [x] Test: Navigate to `/services/floral-decoration/` $\rightarrow$ assert H1 equals "Floral Decoration".
  - [x] **Run — confirm RED.**

- [x] **GREEN — Visual Decoration Service Pages:**
  - [x] [Data] Add Section 5.3, 5.4, 5.6, 5.7, and 5.8 copy and FAQs to `src/data/services.ts`.
  - [x] [Template] Update `src/app/services/[slug]/page.tsx` to support visual styling features and related service chips.
  - [x] Run E2E test — **confirm GREEN.**

- [x] **Verification chain:**
  - [x] Navigate to `/services/wedding-decoration/` $\rightarrow$ read mandap and venue styling breakdown.
  - [x] Click related service chip "Floral Decoration" $\rightarrow$ navigates to `/services/floral-decoration/`.
  - [x] ✅ Done.

---

### W-304 — Production & Hospitality Services (`/services/lighting-production/`, `/services/entertainment-hospitality/`)

**Root cause:**  
Sections 5.9 and 5.10 of the handoff PDF require specialized service pages for ambient/event lighting production and guest experience/hospitality management.

**Goal:**  
Dynamic route handling for `/services/lighting-production/` and `/services/entertainment-hospitality/` displaying technical production support, guest arrival flow, and venue lighting plans.

**Approach:**  
Add static params for `lighting-production` and `entertainment-hospitality` in `src/app/services/[slug]/page.tsx` and complete Section 5.9 and 5.10 copy in `src/data/services.ts`.

---

- [x] **RED — E2E (`tests/e2e/services-production.spec.ts`):**
  - [x] Test: Navigate to `/services/lighting-production/` $\rightarrow$ assert H1 equals "Lighting & Production".
  - [x] Test: Navigate to `/services/entertainment-hospitality/` $\rightarrow$ assert H1 equals "Entertainment & Hospitality".
  - [x] **Run — confirm RED.**

- [x] **GREEN — Production & Hospitality Service Pages:**
  - [x] [Data] Add Section 5.9 and 5.10 data to `src/data/services.ts`.
  - [x] [Static Params] Ensure all 10 service slugs are exported by `generateStaticParams`.
  - [x] Run E2E test — **confirm GREEN.**

- [x] **Verification chain:**
  - [x] Navigate to `/services/lighting-production/` $\rightarrow$ page renders with technical lighting scope and FAQs.
  - [x] All 10 service routes pass static generation checks.
  - [x] ✅ Done.

> ### 📝 Session Note (Services Architecture, Schema Engine & CI E2E Integration) — August 18, 2026
> - **Roadmap Alignment:** Re-architected `current_state.md` roadmap from Phase 3 through Phase 9 to match 1:1 with the 11:11 Decor Website Structure & Content Handoff specification from the Digital Marketing team.
> - **Phase 3 Completion (Services Architecture — W-301 through W-304):**
>   - Built `src/data/services.ts` containing the full 10-service registry, process steps, and FAQs per Sections 4 and 5 of the handoff PDF.
>   - Implemented Services Hub page `src/app/services/page.tsx` with `WindRevealHeading` H1, 10-service card grid, 4-step `WorkProcess`, `WhyChooseUs`, and FAQ accordion.
>   - Implemented dynamic static-prerendered route `src/app/services/[slug]/page.tsx` covering all 10 service pages (`event-management`, `event-planning`, `event-decoration`, `wedding-decoration`, `corporate-event-management`, `stage-decoration`, `venue-decoration`, `floral-decoration`, `lighting-production`, `entertainment-hospitality`).
>   - Enforced search intent keyword isolation across management, planning, and decoration services to prevent cannibalization per Section 15 notes.
>   - Created `src/components/seo/JsonLd.tsx` for structured data injection (`Service` JSON-LD schema).
> - **Layout & Typography Refinements:** Refined `.servicesContainer` and `.detailContainer` flex layouts and label block alignment to guarantee vertical heading stacking above subtext across all viewports.
> - **Full E2E Suite Alignment & CI Quality Tooling:** Updated `package.json` (`ci:quality`) and `.github/workflows/ci.yml` to include Playwright browser installation (`pnpm exec playwright install --with-deps chromium`) and automated Playwright E2E test execution (`pnpm test:e2e`). Aligned all legacy Phase 2 E2E specs (`about-section`, `hero`, `navigation`, `menus-section`, `why-choose-us`, `work-process`, `blog-section`, `footer`) to match current copy and heading components.
> - **Verification & Build:** 55/55 Playwright E2E tests passing with 0 failures across all test files (`tests/e2e/`), 15 Vitest unit tests passing, 0 ESLint warnings/errors (`next lint`), 0 TypeScript errors (`tsc --noEmit`), and 25 static pages prerendered cleanly in Next.js production build (`pnpm build`).

---

## Phase 4 — Events Architecture (Main Hub + 6 Event Category Pages)

### W-401 — Events Main Hub (`/events/`)

**Root cause:**  
Section 6 of the handoff PDF requires a central `/events/` hub page introducing all 6 event categories with intro text and visual cards.

**Goal:**  
A dedicated `/events/` hub page reusing the `EventCategories.tsx` curtain-wipe animation component, displaying H1 "Events We Plan, Manage & Decorate", introductory copy, and category links to all 6 event detail pages.

**Approach:**  
Create `src/app/events/page.tsx` integrating `WindRevealHeading` and `EventCategories.tsx`. Export full SEO metadata and `BreadcrumbList` schema.

---

- [ ] **RED — E2E (`tests/e2e/events-hub.spec.ts`):**
  - [ ] Test: Navigate to `/events/` $\rightarrow$ assert H1 contains "Events We Plan, Manage & Decorate".
  - [ ] Test: Assert all 6 event category links (`wedding-events`, `corporate-events`, `birthday-events`, `engagement-events`, `private-events`, `destination-events`) exist.
  - [ ] **Run — confirm RED.**

- [ ] **GREEN — Events Main Page:**
  - [ ] [Data] Create `src/data/events.ts` containing the registry of 6 event categories per Section 6 of the handoff PDF.
  - [ ] [Route] Create `src/app/events/page.tsx` with SEO metadata (`title: 'Events We Plan, Manage & Decorate | 1111 Decor'`).
  - [ ] [Component] Re-use `EventCategories.tsx` synchronized curtain wipe animation for visual event selection.
  - [ ] Run E2E test — **confirm GREEN.**

- [ ] **Verification chain:**
  - [ ] Visit `/events/` $\rightarrow$ interactive curtain wipe selector renders with 6 event categories.
  - [ ] Click "Wedding Events" $\rightarrow$ navigates to `/events/wedding-events/`.
  - [ ] ✅ Done.

---

### W-402 — Primary Celebrations (`/events/wedding-events/`, `/events/engagement-events/`, `/events/birthday-events/`)

**Root cause:**  
Sections 7.1, 7.3, and 7.4 of the handoff PDF define dedicated event pages for weddings, birthdays, and engagements targeting event planning & multi-day celebration search intent (kept distinct from decoration service pages).

**Goal:**  
Dynamic route handling for `/events/wedding-events/`, `/events/engagement-events/`, and `/events/birthday-events/` matching handoff template: H1 $\rightarrow$ Intro $\rightarrow$ Event Planning Services $\rightarrow$ Decoration Options $\rightarrow$ Event Management $\rightarrow$ What We Handle $\rightarrow$ Our Process $\rightarrow$ Why Choose Us $\rightarrow$ FAQs $\rightarrow$ CTA.

**Approach:**  
Create `src/app/events/[slug]/page.tsx` with `generateStaticParams` and `generateMetadata`. Map individual celebration copy blocks from `src/data/events.ts`.

---

- [ ] **RED — E2E (`tests/e2e/events-celebrations.spec.ts`):**
  - [ ] Test: Navigate to `/events/wedding-events/` $\rightarrow$ assert H1 equals "Wedding Event Planning & Management".
  - [ ] Test: Assert H1 is distinct from `/services/wedding-decoration/` H1 ("Wedding Decoration").
  - [ ] Test: Navigate to `/events/birthday-events/` $\rightarrow$ assert H1 equals "Birthday Event Planning".
  - [ ] **Run — confirm RED.**

- [ ] **GREEN — Primary Celebration Event Pages:**
  - [ ] [Route] Create `src/app/events/[slug]/page.tsx` with `generateStaticParams`.
  - [ ] [Data] Add Section 7.1, 7.3, and 7.4 copy and FAQs to `src/data/events.ts`.
  - [ ] [Template] Render event-specific timeline services, decoration options, and on-site troubleshooting points.
  - [ ] Run E2E test — **confirm GREEN.**

- [ ] **Verification chain:**
  - [ ] Navigate to `/events/wedding-events/` $\rightarrow$ view function-by-function timeline planning details.
  - [ ] Verify search intent isolation against `/services/wedding-decoration/`.
  - [ ] ✅ Done.

---

### W-403 — Corporate, Private & Destination Events (`/events/corporate-events/`, `/events/private-events/`, `/events/destination-events/`)

**Root cause:**  
Sections 7.2, 7.5, and 7.6 of the handoff PDF specify landing pages for objective-led corporate events, intimate private gatherings, and travel-dependent destination events.

**Goal:**  
Dynamic route handling for `/events/corporate-events/`, `/events/private-events/`, and `/events/destination-events/` highlighting brand visibility, scalable guest count management, and travel vendor logistics.

**Approach:**  
Extend `src/app/events/[slug]/page.tsx` static params and populate Section 7.2, 7.5, and 7.6 copy in `src/data/events.ts`.

---

- [ ] **RED — E2E (`tests/e2e/events-niche.spec.ts`):**
  - [ ] Test: Navigate to `/events/corporate-events/` $\rightarrow$ assert H1 equals "Corporate Event Planning".
  - [ ] Test: Navigate to `/events/destination-events/` $\rightarrow$ assert H1 equals "Destination Event Planning" and text covers travel logistics.
  - [ ] **Run — confirm RED.**

- [ ] **GREEN — Corporate, Private & Destination Event Pages:**
  - [ ] [Data] Add Section 7.2, 7.5, and 7.6 data to `src/data/events.ts`.
  - [ ] [Static Params] Ensure all 6 event slugs (`wedding-events`, `corporate-events`, `birthday-events`, `engagement-events`, `private-events`, `destination-events`) are exported.
  - [ ] Run E2E test — **confirm GREEN.**

- [ ] **Verification chain:**
  - [ ] Navigate to `/events/destination-events/` $\rightarrow$ read multi-day travel and local sourcing logistics.
  - [ ] All 6 event category routes pass static generation checks.
  - [ ] ✅ Done.

---

## Phase 5 — About Us, Packages & Testimonials

### W-501 — About Us Page (`/about-us/`)

**Root cause:**  
Section 3 of the handoff PDF specifies the exact brand copy and section layout for `/about-us/`.

**Goal:**  
A fully styled `/about-us/` page featuring: H1 "Creating Experiences, Not Just Events", Introduction, Our Approach, Planning & Décor Together, Attention to Detail, On Event Day, and CTA to `/contact/`.

**Approach:**  
Update `src/app/about-us/page.tsx` with handoff copy, `WindRevealHeading`, split image layout, and `Organization` JSON-LD schema.

---

- [ ] **RED — E2E (`tests/e2e/about-page.spec.ts`):**
  - [ ] Test: Navigate to `/about-us/` $\rightarrow$ assert H1 contains "Creating Experiences, Not Just Events".
  - [ ] Test: Assert section headings "OUR APPROACH", "PLANNING & DÉCOR, TOGETHER", "ATTENTION TO DETAIL", and "ON EVENT DAY" exist.
  - [ ] Test: Assert CTA link to `/contact/` is present.
  - [ ] **Run — confirm RED.**

- [ ] **GREEN — About Us Page:**
  - [ ] [Route] Update `src/app/about-us/page.tsx` with handoff copy and layout styling.
  - [ ] [SEO] Export `title: 'About Us | 1111 Decor'` and inject `Organization` schema.
  - [ ] Run E2E test — **confirm GREEN.**

- [ ] **Verification chain:**
  - [ ] Open `/about-us/` $\rightarrow$ scroll through editorial sections with `WindRevealHeading` reveals.
  - [ ] Click "Plan Your Event" CTA $\rightarrow$ redirected to `/contact/`.
  - [ ] ✅ Done.

---

### W-502 — Packages Page (`/packages/`)

**Root cause:**  
Section 10 of the handoff PDF defines 3 service tiers (**Essential**, **Signature**, **Bespoke**) with Custom Quote pricing.

**Goal:**  
A `/packages/` page with H1 "Planning Built Around Your Event", intro copy, a 3-column pricing tier card grid, feature inclusions, and custom quote CTAs.

**Approach:**  
Create `src/app/packages/page.tsx` pulling from `src/data/packages.ts`. Implement responsive card grid with champagne gold tier highlights.

---

- [ ] **RED — E2E (`tests/e2e/packages-page.spec.ts`):**
  - [ ] Test: Navigate to `/packages/` $\rightarrow$ assert H1 contains "Planning Built Around Your Event".
  - [ ] Test: Assert Essential, Signature, and Bespoke tier cards are rendered with "Custom Quote" price labels.
  - [ ] **Run — confirm RED.**

- [ ] **GREEN — Packages Page:**
  - [ ] [Data] Create `src/data/packages.ts` with tier specifications per Section 10 of the handoff PDF.
  - [ ] [Route] Create `src/app/packages/page.tsx` with SEO metadata.
  - [ ] Run E2E test — **confirm GREEN.**

- [ ] **Verification chain:**
  - [ ] Visit `/packages/` $\rightarrow$ compare Essential, Signature, and Bespoke tiers.
  - [ ] Click "Request a Custom Quote" $\rightarrow$ redirected to `/contact/`.
  - [ ] ✅ Done.

---

### W-503 — Testimonials Page (`/testimonials/`)

**Root cause:**  
Section 11 of the handoff PDF specifies placeholder client quotes structure while strictly cautioning against review schema markup on demo data.

**Goal:**  
A `/testimonials/` page displaying client quotes (quote, star rating, client name + initial, event type, location). Ensure **no review schema** is emitted per SEO notes.

**Approach:**  
Create `src/app/testimonials/page.tsx` and `src/data/testimonials.ts`. Render clean quote cards without injecting `AggregateRating` or `Review` JSON-LD.

---

- [ ] **RED — E2E (`tests/e2e/testimonials-page.spec.ts`):**
  - [ ] Test: Navigate to `/testimonials/` $\rightarrow$ assert testimonial quotes are rendered.
  - [ ] Test: Inspect `<head>` $\rightarrow$ assert NO review schema (`"type": "Review"`) is present.
  - [ ] **Run — confirm RED.**

- [ ] **GREEN — Testimonials Page:**
  - [ ] [Data] Create `src/data/testimonials.ts` with demo client quotes.
  - [ ] [Route] Create `src/app/testimonials/page.tsx` displaying card grid without schema.
  - [ ] Run E2E test — **confirm GREEN.**

- [ ] **Verification chain:**
  - [ ] Visit `/testimonials/` $\rightarrow$ read client review cards.
  - [ ] Confirm no Google Schema warnings for fabricated reviews.
  - [ ] ✅ Done.

---

## Phase 6 — Portfolio, Venues & Gallery

### W-601 — Portfolio Hub & Project Detail Template (`/portfolio/`, `/portfolio/[slug]/`)

**Root cause:**  
Section 8 of the handoff PDF specifies a filterable `/portfolio/` grid by event type and an individual project page template.

**Goal:**  
A `/portfolio/` archive page with category filter pills (Weddings, Corporate, Birthdays, Engagements, Private, Destination) and project cards. Dynamic `/portfolio/[slug]/page.tsx` template.

**Approach:**  
Create `src/app/portfolio/page.tsx`, `src/app/portfolio/[slug]/page.tsx`, and dataset `src/data/portfolio.ts`.

---

- [ ] **RED — E2E (`tests/e2e/portfolio.spec.ts`):**
  - [ ] Test: Navigate to `/portfolio/` $\rightarrow$ assert H1 contains "Our Work".
  - [ ] Test: Assert category filter pills toggle displayed project cards.
  - [ ] **Run — confirm RED.**

- [ ] **GREEN — Portfolio Pages:**
  - [ ] [Data] Create `src/data/portfolio.ts` with project cards and project template data.
  - [ ] [Routes] Create `src/app/portfolio/page.tsx` and `src/app/portfolio/[slug]/page.tsx`.
  - [ ] Run E2E test — **confirm GREEN.**

- [ ] **Verification chain:**
  - [ ] Visit `/portfolio/` $\rightarrow$ click category filter pill $\rightarrow$ card grid updates smoothly.
  - [ ] ✅ Done.

---

### W-602 — Venues Hub & Venue Detail Template (`/venues/`, `/venues/[slug]/`)

**Root cause:**  
Section 9 of the handoff PDF defines `/venues/` hub ("Find the Right Setting for Your Event") and venue template layout.

**Goal:**  
A `/venues/` page listing indoor/outdoor venues with capacity details, decor possibilities, and planning considerations. Dynamic `/venues/[slug]/page.tsx`.

**Approach:**  
Create `src/app/venues/page.tsx`, `src/app/venues/[slug]/page.tsx`, and dataset `src/data/venues.ts`.

---

- [ ] **RED — E2E (`tests/e2e/venues.spec.ts`):**
  - [ ] Test: Navigate to `/venues/` $\rightarrow$ assert H1 contains "Find the Right Setting for Your Event".
  - [ ] Test: Assert venue cards render space type tags (Indoor / Outdoor).
  - [ ] **Run — confirm RED.**

- [ ] **GREEN — Venue Pages:**
  - [ ] [Data] Create `src/data/venues.ts` with venue overview data.
  - [ ] [Routes] Create `src/app/venues/page.tsx` and `src/app/venues/[slug]/page.tsx`.
  - [ ] Run E2E test — **confirm GREEN.**

- [ ] **Verification chain:**
  - [ ] Visit `/venues/` $\rightarrow$ view space styling options for indoor and outdoor settings.
  - [ ] ✅ Done.

---

### W-603 — Interactive Photo Gallery Page (`/gallery/`)

**Root cause:**  
Section 12 of the handoff PDF requires an image-first `/gallery/` page with category filters (Weddings, Corporate Events, Birthdays, Engagements, Décor, Stage Designs, Venue Designs) and minimal copy.

**Goal:**  
A `/gallery/` page with visual grid, category filter tabs, lazy-loaded images, and a custom GSAP `Lightbox.tsx` popup modal with keyboard controls.

**Approach:**  
Create `src/app/gallery/page.tsx`, `src/components/ui/Lightbox.tsx`, and dataset `src/data/gallery.ts`.

---

- [ ] **RED — E2E (`tests/e2e/gallery.spec.ts`):**
  - [ ] Test: Navigate to `/gallery/` $\rightarrow$ assert H1 contains "Moments We've Helped Create".
  - [ ] Test: Click thumbnail $\rightarrow$ assert Lightbox modal opens.
  - [ ] Test: Press Escape $\rightarrow$ assert Lightbox modal closes.
  - [ ] **Run — confirm RED.**

- [ ] **GREEN — Gallery Page & Lightbox:**
  - [ ] [Data] Create `src/data/gallery.ts` with category-tagged images.
  - [ ] [Lightbox] Create `src/components/ui/Lightbox.tsx` with GSAP scale entrance and keyboard event listeners.
  - [ ] [Route] Create `src/app/gallery/page.tsx` with category filter tabs.
  - [ ] Run E2E test — **confirm GREEN.**

- [ ] **Verification chain:**
  - [ ] Visit `/gallery/` $\rightarrow$ click photo $\rightarrow$ lightbox opens full screen $\rightarrow$ press Escape to close.
  - [ ] ✅ Done.

---

## Phase 7 — Blog System

### W-701 — Blog Hub & Category Architecture (`/blog/`, `/blog/[category]/`)

**Root cause:**  
Section 13 of the handoff PDF specifies `/blog/` and 5 category routes (`wedding-planning`, `event-planning`, `decoration-ideas`, `corporate-events`, `venue-destination-events`).

**Goal:**  
A `/blog/` archive page with article cards and category navigation links. Dynamic `/blog/[category]/page.tsx` route filtering posts by category.

**Approach:**  
Create `src/app/blog/page.tsx`, `src/app/blog/[category]/page.tsx`, and dataset `src/data/blog.ts`.

---

- [ ] **RED — E2E (`tests/e2e/blog-hub.spec.ts`):**
  - [ ] Test: Navigate to `/blog/` $\rightarrow$ assert blog cards and 5 category links are present.
  - [ ] Test: Navigate to `/blog/decoration-ideas/` $\rightarrow$ assert only decoration-ideas articles render.
  - [ ] **Run — confirm RED.**

- [ ] **GREEN — Blog Hub & Category Pages:**
  - [ ] [Data] Extend `src/data/blog.ts` with category mappings and full post entries.
  - [ ] [Routes] Create `src/app/blog/page.tsx` and `src/app/blog/[category]/page.tsx`.
  - [ ] Run E2E test — **confirm GREEN.**

- [ ] **Verification chain:**
  - [ ] Visit `/blog/` $\rightarrow$ click category chip "Wedding Planning" $\rightarrow$ navigates to `/blog/wedding-planning/`.
  - [ ] ✅ Done.

---

### W-702 — Blog Single Article Detail Page (`/blog/[category]/[slug]/`)

**Root cause:**  
Section 13 of the handoff PDF defines single article structure: H1 $\rightarrow$ Intro $\rightarrow$ Body sections (H2/H3) $\rightarrow$ FAQ $\rightarrow$ Related service/event link $\rightarrow$ CTA.

**Goal:**  
Nested dynamic route `/blog/[category]/[slug]/page.tsx` rendering article copy, reading progress bar, related service/event chips, and `Article` JSON-LD schema.

**Approach:**  
Create `src/app/blog/[category]/[slug]/page.tsx` with `generateStaticParams` and `generateMetadata`.

---

- [ ] **RED — E2E (`tests/e2e/blog-article.spec.ts`):**
  - [ ] Test: Navigate to `/blog/wedding-planning/complete-wedding-decor-checklist/` $\rightarrow$ assert article H1 matches.
  - [ ] Test: Assert `<script type="application/ld+json">` contains `"@type": "Article"`.
  - [ ] **Run — confirm RED.**

- [ ] **GREEN — Blog Single Article Page:**
  - [ ] [Route] Create nested dynamic route `src/app/blog/[category]/[slug]/page.tsx`.
  - [ ] [Progress Bar] Add GSAP ScrollTrigger reading progress bar at top of viewport.
  - [ ] [SEO] Inject `Article` schema and Open Graph metadata.
  - [ ] Run E2E test — **confirm GREEN.**

- [ ] **Verification chain:**
  - [ ] Open a blog post $\rightarrow$ reading progress bar fills as you scroll down.
  - [ ] Click related service CTA at article end $\rightarrow$ redirected to matching service page.
  - [ ] ✅ Done.

---

## Phase 8 — Contact & Lead Conversion Shell

### W-801 — Contact Page (`/contact/`)

**Root cause:**  
Section 14 of the handoff PDF defines `/contact/` with H1 "Let's Plan Your Event", intro text, exact 8 form fields, contact details table, and map embed block.

**Goal:**  
A `/contact/` page with form fields: Name, Phone, Email, Event Type, Event Date, Guest Count, Budget Range (optional), Message. Includes demo address (123 Rajpur Road, Dehradun), Phone/WhatsApp (+91 98765 43210), Email, Hours, Map block, and submission feedback.

**Approach:**  
Create `src/app/contact/page.tsx` with client-side validation and toast notification.

---

- [ ] **RED — E2E (`tests/e2e/contact-page.spec.ts`):**
  - [ ] Test: Navigate to `/contact/` $\rightarrow$ assert H1 contains "Let's Plan Your Event".
  - [ ] Test: Submit empty form $\rightarrow$ assert validation errors on required fields.
  - [ ] Test: Fill form and submit $\rightarrow$ assert success toast notification.
  - [ ] **Run — confirm RED.**

- [ ] **GREEN — Contact Page:**
  - [ ] [Route] Create `src/app/contact/page.tsx` with form state handling and contact info block.
  - [ ] [Map] Add responsive embedded map container.
  - [ ] [SEO] Inject `LocalBusiness` schema (once NAP confirmed) or `Organization` fallback.
  - [ ] Run E2E test — **confirm GREEN.**

- [ ] **Verification chain:**
  - [ ] Open `/contact/` $\rightarrow$ fill form $\rightarrow$ click submit $\rightarrow$ success toast appears.
  - [ ] Phone & WhatsApp links trigger `tel:` and `https://wa.me/` handlers.
  - [ ] ✅ Done.

---

## Phase 9 — Developer & Technical SEO Hardening

### W-901 — Schema Engine (`JsonLd.tsx`)

**Root cause:**  
Section 15 of the handoff PDF specifies JSON-LD schema requirements per page type (`Organization`, `BreadcrumbList`, `LocalBusiness`, `Service`, `Article`, `FAQPage`).

**Goal:**  
A centralized `<JsonLd>` component emitting validated JSON-LD scripts based on page metadata props across all site routes.

**Approach:**  
Create `src/components/seo/JsonLd.tsx` and integrate into `layout.tsx` and dynamic page wrappers.

---

- [ ] **RED — Unit (`tests/seo-schemas.unit.test.ts`):**
  - [ ] Test: Call `generateJsonLd('Service', serviceData)` $\rightarrow$ assert valid JSON object with `@context: "https://schema.org"` and `@type: "Service"`.
  - [ ] Test: Call `generateJsonLd('FAQPage', faqData)` $\rightarrow$ assert valid `mainEntity` Question array.
  - [ ] **Run — confirm RED.**

- [ ] **GREEN — Schema Engine Component:**
  - [ ] [Component] Create `src/components/seo/JsonLd.tsx`.
  - [ ] [Integration] Wire into root layout and page templates.
  - [ ] Run unit test — **confirm GREEN.**

- [ ] **Verification chain:**
  - [ ] Inspect `<head>` across `/`, `/services/wedding-decoration/`, `/blog/wedding-planning/post-1` $\rightarrow$ valid schema blocks present.
  - [ ] ✅ Done.

---

### W-902 — Dynamic Sitemap & Robots Generator

**Root cause:**  
Section 15 of the handoff PDF requires trailing slashes and full XML sitemap generation for all published static and dynamic routes.

**Goal:**  
Next.js `src/app/sitemap.ts` and `src/app/robots.ts` generating `/sitemap.xml` and `/robots.txt` containing all 30+ URLs with trailing slashes.

**Approach:**  
Create `src/app/sitemap.ts` and `src/app/robots.ts` compiling static routes + dynamic slugs from `services.ts`, `events.ts`, `blog.ts`, `portfolio.ts`, `venues.ts`.

---

- [ ] **RED — Unit (`tests/sitemap.unit.test.ts`):**
  - [ ] Test: Invoke `sitemap()` $\rightarrow$ assert array contains `/`, `/about-us/`, `/services/`, 10 `/services/[slug]/` URLs, 6 `/events/[slug]/` URLs, etc.
  - [ ] Test: Assert all URLs end with trailing slash `/`.
  - [ ] **Run — confirm RED.**

- [ ] **GREEN — Sitemap & Robots Generators:**
  - [ ] [Sitemap] Create `src/app/sitemap.ts`.
  - [ ] [Robots] Create `src/app/robots.ts`.
  - [ ] Run unit test — **confirm GREEN.**

- [ ] **Verification chain:**
  - [ ] Visit `localhost:3000/sitemap.xml` $\rightarrow$ valid XML sitemap generated.
  - [ ] Visit `localhost:3000/robots.txt` $\rightarrow$ points to `/sitemap.xml`.
  - [ ] ✅ Done.

---

### W-903 — Quality Suite & Production Build Hardening

**Root cause:**  
Final quality gate ensuring zero TypeScript errors, zero ESLint warnings, 100% passing unit and E2E tests, and Next.js static production build generation.

**Goal:**  
Clean execution of `pnpm typecheck && pnpm lint && pnpm test:unit && pnpm build`.

**Approach:**  
Run the full verification pipeline and resolve any remaining type or lint edge cases.

---

- [ ] **RED — Quality Gate Verification:**
  - [ ] Run full CI quality command $\rightarrow$ confirm any unfulfilled assertions or type issues.
  - [ ] **Run — confirm RED.**

- [ ] **GREEN — Final Production Hardening:**
  - [ ] Fix any remaining type discrepancies across datasets and components.
  - [ ] Run `pnpm typecheck && pnpm lint && pnpm test:unit && pnpm build` — **confirm GREEN.**

- [ ] **Verification chain:**
  - [ ] All 30+ static pages generated in `.next/` build output.
  - [ ] Zero lint warnings, zero type errors.
  - [ ] ✅ Done.

---

## Current Progress Tracker

| Phase | Status | Work Items |
|---|---|---|
| Phase 0 — Scaffolding | `[x]` Completed | W-001, W-002, W-003, W-004 |
| Phase 1 — Layout Shell | `[x]` Completed | W-101 |
| Phase 2 — Home Page | `[x]` Completed | W-201 through W-210 |
| Phase 3 — Services Architecture | `[x]` Completed | W-301, W-302, W-303, W-304 |
| Phase 4 — Events Architecture | `[ ]` Not Started | W-401, W-402, W-403 |
| Phase 5 — About, Packages & Testimonials | `[ ]` Not Started | W-501, W-502, W-503 |
| Phase 6 — Portfolio, Venues & Gallery | `[ ]` Not Started | W-601, W-602, W-603 |
| Phase 7 — Blog System | `[ ]` Not Started | W-701, W-702 |
| Phase 8 — Contact & Lead Conversion Shell | `[ ]` Not Started | W-801 |
| Phase 9 — Technical SEO & Hardening | `[ ]` Not Started | W-901, W-902, W-903 |

---

> **Note for development team:** All text content, page copy, and metadata follow the 11:11 Decor Website Structure & Content Handoff specification. All data is structured in `src/data/` files for effortless CMS migration or content updates.
