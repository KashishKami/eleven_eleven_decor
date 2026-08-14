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

---

## Phase 3 — Menu & Event Pages

### W-301 — All Menus Page (`/menu`)

**Root cause:**  
Users who want to explore the full menu offering need a dedicated archive page with filterable categories.

**Goal:**  
A full menus listing page with: hero banner, category filter tabs, and a masonry/grid of all menu cards.

---

- [ ] **RED — E2E (`tests/e2e/menus-page.spec.ts`):**
  - [ ] Test: Navigate to `/menu` → assert page title is "Our Menu".
  - [ ] Test: Assert at least 4 menu cards rendered.
  - [ ] **Run — confirm RED.**

- [ ] **GREEN — Menus Page:**
  - [ ] [Route] Create `src/app/menu/page.tsx` with correct metadata export.
  - [ ] [Layout] Page hero banner + grid layout.
  - [ ] [SEO] `export const metadata: Metadata = { title: 'Our Menu | 1111 Decor', description: '...' }`.
  - [ ] Run E2E — **confirm GREEN.**

- [ ] **Verification chain:**
  - [ ] Visit `/menu` → page loads with all menus displayed.
  - [ ] ✅ Done.

---

### W-302 — Menu Detail Page (`/menus/[slug]`)

**Root cause:**  
Individual menu pages need to showcase the full details of a specific menu offering to help clients decide.

**Goal:**  
A dynamic route for each menu: hero image, menu title, description, item list with prices, photo gallery.

---

- [ ] **RED — E2E (`tests/e2e/menu-detail.spec.ts`):**
  - [ ] Test: Navigate to `/menus/corporate-menu` → assert heading contains "Corporate Menu".
  - [ ] Test: Assert `<meta name="description">` is not empty.
  - [ ] **Run — confirm RED.**

- [ ] **GREEN — Menu Detail:**
  - [ ] [Route] Create `src/app/menus/[slug]/page.tsx` with `generateStaticParams` and `generateMetadata`.
  - [ ] [Data] Extend `src/data/menus.ts` with full item data.
  - [ ] Run E2E — **confirm GREEN.**

- [ ] **Verification chain:**
  - [ ] Navigate to `/menus/catering-wedding` → full wedding menu details shown.
  - [ ] ✅ Done.

---

### W-303 — All Events Page + Event Detail Pages

**Root cause:**  
The Events section (Corporate, Weddings, Social Events, Parties) is a core conversion page where clients browse past work to build confidence in booking.

**Goal:**  
Events archive page with category filter. Individual event detail pages with image gallery, description, date, venue.

---

- [ ] **RED — E2E (`tests/e2e/events-page.spec.ts`):**
  - [ ] Test: Navigate to `/event` → assert event cards rendered.
  - [ ] Test: Filter by "Weddings" → assert only wedding events shown.
  - [ ] Navigate to `/events/weddings` → assert heading matches.
  - [ ] **Run — confirm RED.**

- [ ] **GREEN — Events Pages:**
  - [ ] [Routes] `src/app/event/page.tsx`, `src/app/events/[slug]/page.tsx`.
  - [ ] [Filter] Client-side category filter with GSAP stagger re-render animation.
  - [ ] [SEO] `generateMetadata` for each event detail page.
  - [ ] Run E2E — **confirm GREEN.**

- [ ] **Verification chain:**
  - [ ] Visit `/event` → all events shown → filter to Weddings → grid animates to show only wedding events.
  - [ ] ✅ Done.

---

## Phase 4 — About, Team & Venue Pages

### W-401 — About Us Page

**Root cause:**  
Potential clients who are on the fence about 1111 Decor will visit the About page to vet the company's story, values, and experience.

**Goal:**  
Full About Us page: hero banner, company story section, mission/vision stats, team highlights, and a CTA section.

---

- [ ] **RED — E2E (`tests/e2e/about-page.spec.ts`):**
  - [ ] Navigate to `/about-us` → assert `<h1>` exists.
  - [ ] Assert page `<title>` contains "About Us".
  - [ ] **Run — confirm RED.**

- [ ] **GREEN — About Page:**
  - [ ] [Route] `src/app/about-us/page.tsx`.
  - [ ] [SEO] Full metadata, OG tags, structured data (Organization schema).
  - [ ] Run E2E — **confirm GREEN.**

- [ ] **Verification chain:**
  - [ ] `/about-us` renders fully → animations fire on scroll.
  - [ ] ✅ Done.

---

### W-402 — Our Team Page + Venue Pages

**Root cause:**  
Dedicated team and venue pages provide depth for the brand and help with SEO (long-tail keywords).

**Goal:**  
`/our-team` page with full team grid. `/venue` archive + `/venues/[slug]` detail pages.

---

- [ ] **RED — E2E (`tests/e2e/team-page.spec.ts` + `venue-page.spec.ts`):**
  - [ ] `/our-team` → assert team member cards.
  - [ ] `/venue` → assert venue cards.
  - [ ] `/venues/decagon-silver-city` → assert venue name in heading.
  - [ ] **Run — confirm RED.**

- [ ] **GREEN — Team + Venue Pages:**
  - [ ] [Routes] `src/app/our-team/page.tsx`, `src/app/venue/page.tsx`, `src/app/venues/[slug]/page.tsx`.
  - [ ] Run E2E — **confirm GREEN.**

- [ ] **Verification chain:**
  - [ ] All routes render correctly with content and animations.
  - [ ] ✅ Done.

---

## Phase 5 — Gallery, FAQ, Contact & 404

### W-501 — Gallery Page

**Root cause:**  
A gallery of real event photos is often the deciding factor for luxury event clients — they want visual proof of quality.

**Goal:**  
A masonry/filterable gallery page. Filter by category (All, Corporate, Weddings, Parties, Social Events). Each image: lightbox on click (GSAP-powered custom lightbox — no heavy library dependency).

**Approach:**  
CSS masonry grid via `columns` property. Filter: GSAP `stagger` hide/show with `scale` and `opacity`. Lightbox: GSAP timeline for backdrop fade + image scale from thumbnail position to center.

---

- [ ] **RED — E2E (`tests/e2e/gallery.spec.ts`):**
  - [ ] Navigate to `/gallery` → assert images rendered.
  - [ ] Click a gallery image → assert lightbox modal opens.
  - [ ] Press Escape → assert lightbox closes.
  - [ ] **Run — confirm RED.**

- [ ] **GREEN — Gallery:**
  - [ ] [Route] `src/app/gallery/page.tsx`.
  - [ ] [Lightbox] Create `src/components/ui/Lightbox.tsx` with GSAP open/close animations.
  - [ ] [Filter] Client-side filter with GSAP stagger animation.
  - [ ] [Accessibility] Lightbox: `role="dialog"`, `aria-modal="true"`, focus trap, Escape to close.
  - [ ] Run E2E — **confirm GREEN.**

- [ ] **Verification chain:**
  - [ ] Click image → lightbox opens with scale animation → Escape closes it.
  - [ ] Filter works correctly with smooth animations.
  - [ ] ✅ Done.

---

### W-502 — FAQ, Contact & 404 Pages

**Root cause:**  
FAQ reduces support burden. Contact is the primary lead conversion page. 404 should guide users back to relevant content.

**Goal:**  
`/faqs` with accordion component (GSAP height animation). `/contact` with form (name, email, phone, event type, message) with validation. `/404` with animated "Page Not Found" and navigation CTA.

---

- [ ] **RED — E2E (`tests/e2e/contact.spec.ts`):**
  - [ ] `/faqs` → click first FAQ → assert answer panel expands.
  - [ ] `/contact` → submit empty form → assert validation errors shown.
  - [ ] `/contact` → fill form → submit → assert success message.
  - [ ] `/nonexistent-route` → assert 404 page renders.
  - [ ] **Run — confirm RED.**

- [ ] **GREEN — FAQ/Contact/404:**
  - [ ] [FAQ Accordion] GSAP `height: 0 → auto` animation with `clipPath` for smooth expand.
  - [ ] [Contact Form] React Hook Form + Zod validation. Server Action for submission.
  - [ ] [404] `src/app/not-found.tsx` with GSAP animated text reveal.
  - [ ] Run E2E — **confirm GREEN.**

- [ ] **Verification chain:**
  - [ ] FAQ accordion opens/closes smoothly.
  - [ ] Contact form validates and submits.
  - [ ] `/broken-url` shows 404 page.
  - [ ] ✅ Done.

---

## Phase 6 — Blog System

### W-601 — Blog Archive + Single Post

**Root cause:**  
Blog content drives organic SEO traffic. A well-structured blog with schema markup and proper metadata is critical for 1111 Decor's search visibility.

**Goal:**  
`/blog` with grid + list view toggle. `/blog/[slug]` with full article, author info, related posts, reading progress bar.

**Approach:**  
Use MDX for blog content (easily swappable for a CMS later). Reading progress: GSAP ScrollTrigger driving a top-bar `scaleX` from 0 to 1. Related posts: filter by matching tag/category from static data.

---

- [ ] **RED — E2E (`tests/e2e/blog.spec.ts`):**
  - [ ] `/blog` → assert 3 posts rendered in grid view.
  - [ ] Toggle to list view → assert list layout.
  - [ ] Click a post → navigate to `/blog/[slug]` → assert `<h1>` matches post title.
  - [ ] Assert `<meta name="description">` is present and non-empty.
  - [ ] **Run — confirm RED.**

- [ ] **GREEN — Blog:**
  - [ ] [MDX] Install `@next/mdx next-mdx-remote`. Create 3 sample posts in `src/data/posts/`.
  - [ ] [Archive] `src/app/blog/page.tsx` with grid/list toggle.
  - [ ] [Single] `src/app/blog/[slug]/page.tsx` with `generateMetadata` and JSON-LD BlogPosting schema.
  - [ ] [Reading Progress] GSAP ScrollTrigger + `scaleX` progress bar at top of viewport.
  - [ ] [SEO] Full Open Graph + Twitter Card metadata on each post.
  - [ ] Run E2E — **confirm GREEN.**

- [ ] **Verification chain:**
  - [ ] Blog archive renders → toggle between grid/list view.
  - [ ] Open a post → reading progress bar fills as you scroll.
  - [ ] View Page Source → confirm JSON-LD schema in `<head>`.
  - [ ] ✅ Done.

---

## Phase 7 — Alternative Home Pages (v2, v3, v4)

### W-701 — Home v2, v3, v4 Variants

**Root cause:**  
The Anika template ships with 4 home page variants with different layouts and hero treatments. These give 1111 Decor flexibility to present different aesthetics.

**Goal:**  
3 additional home page routes (`/home-2`, `/home-3`, `/home-4`) each with distinct hero layouts (video background, slider, split-screen) reusing shared section components.

---

- [ ] **RED — E2E (`tests/e2e/home-variants.spec.ts`):**
  - [ ] `/home-2` → assert unique hero variant renders.
  - [ ] `/home-3` → assert unique hero variant renders.
  - [ ] `/home-4` → assert unique hero variant renders.
  - [ ] **Run — confirm RED.**

- [ ] **GREEN — Home Variants:**
  - [ ] [Home 2] Video background hero with text overlay.
  - [ ] [Home 3] Split-screen hero (image left, text right).
  - [ ] [Home 4] Full-screen slider with multiple slides (GSAP autoplay).
  - [ ] Run E2E — **confirm GREEN.**

- [ ] **Verification chain:**
  - [ ] All 3 routes render with distinct hero experiences.
  - [ ] ✅ Done.

---

## Phase 8 — SEO Hardening & Performance

### W-801 — SEO Metadata & Structured Data

**Root cause:**  
Without proper SEO, 1111 Decor cannot be found by potential clients searching for event decoration services. This is the digital storefront's discoverability layer.

**Goal:**  
Every page has: unique `<title>`, `<meta name="description">`, Open Graph tags, Twitter Card tags. Homepage has Organization JSON-LD. Events/Menus have relevant structured data. XML sitemap and robots.txt generated.

---

- [ ] **RED — Unit (`tests/seo.test.ts`):**
  - [ ] Test: `generateMetadata({ params: { slug: 'corporate-menu' } })` → assert `title` contains "Corporate Menu | 1111 Decor".
  - [ ] Test: `generateMetadata` for homepage → assert `openGraph.images` is non-empty array.
  - [ ] **Run — confirm RED.**

- [ ] **GREEN — SEO:**
  - [ ] [Root Metadata] In `layout.tsx`: set `metadataBase`, `robots`, `openGraph` defaults.
  - [ ] [Sitemap] Create `src/app/sitemap.ts` returning all static + dynamic routes.
  - [ ] [Robots] Create `src/app/robots.ts`.
  - [ ] [JSON-LD] Create `src/components/seo/JsonLd.tsx` component. Add Organization schema to root layout. Add LocalBusiness schema.
  - [ ] [Each Page] Verify each route's `generateMetadata` exports correct, unique metadata.
  - [ ] Run unit tests — **confirm GREEN.**

- [ ] **Verification chain:**
  - [ ] View Page Source → `<title>` is correct and unique per page.
  - [ ] Run Lighthouse → SEO score ≥ 95.
  - [ ] Submit sitemap URL to Google Search Console (manual step).
  - [ ] ✅ Done.

---

### W-802 — Performance & Core Web Vitals

**Root cause:**  
Premium brands must deliver premium performance. Poor CWV scores damage both SEO rankings and user perception.

**Goal:**  
Lighthouse scores: Performance ≥ 90, Accessibility ≥ 95, Best Practices ≥ 95, SEO ≥ 95. All images use `next/image`. Fonts use `display: swap`. Critical CSS inlined.

---

- [ ] **RED — Performance Test:**
  - [ ] Run Lighthouse on `localhost:3000` → confirm Performance score is below target (it will be at this stage, confirming we need this work item).
  - [ ] **Run — confirm RED (score below 90).**

- [ ] **GREEN — Performance:**
  - [ ] [Images] Audit all `<img>` → replace with `next/image` with proper `sizes` and `priority` on LCP images.
  - [ ] [Fonts] Add `display: 'swap'` to all `next/font` calls.
  - [ ] [Code Split] Audit bundle with `@next/bundle-analyzer`. Split heavy GSAP imports to dynamic imports.
  - [ ] [Preload] Add `<link rel="preload">` for hero image.
  - [ ] [GSAP] Use `gsap.registerPlugin` only in client components. Tree-shake unused GSAP plugins.
  - [ ] Run Lighthouse again — **confirm GREEN (≥ 90).**

- [ ] **Verification chain:**
  - [ ] Lighthouse audit: Performance ≥ 90, Accessibility ≥ 95.
  - [ ] No layout shifts (CLS ≈ 0).
  - [ ] ✅ Done.

---

## Current Progress Tracker

| Phase | Status | Work Items |
|---|---|---|
| Phase 0 — Scaffolding | `[x]` Completed | W-001, W-002, W-003, W-004 |
| Phase 1 — Layout Shell | `[x]` Completed | W-101 |
| Phase 2 — Home Page | `[x]` Completed | W-201 through W-210 |
| Phase 3 — Menu & Events | `[ ]` Not Started | W-301, W-302, W-303 |
| Phase 4 — About & Venues | `[ ]` Not Started | W-401, W-402 |
| Phase 5 — Gallery & More | `[ ]` Not Started | W-501, W-502 |
| Phase 6 — Blog | `[ ]` Not Started | W-601 |
| Phase 7 — Home Variants | `[ ]` Not Started | W-701 |
| Phase 8 — SEO & Perf | `[ ]` Not Started | W-801, W-802 |

---

> **Note for content team:** All text content is placeholder data matching the Anika template. Replace with 1111 Decor brand copy and real images when available. All data is in `src/data/` files for easy replacement.
