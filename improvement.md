# Portfolio Improvement Analysis — Ayan Pathak
## Full Code Audit + Ready-to-Use Claude Prompts

---

## IMPROVEMENT 1 — Re-enable Page Transitions

**What's wrong:**
`PageTransition.tsx` has the full Framer Motion `AnimatePresence` implementation commented out and replaced with a plain `<div>`. Every page change is an instant hard-cut with zero animation, which kills the polished feel the rest of the site builds up.

**Why it was disabled:**
It likely caused a flash or layout jump when used with the Next.js App Router, which requires `"use client"` + a stable key. The fix is straightforward — not a removal.

**Ready-to-use prompt:**
```
You are working on my Next.js 15 App Router portfolio. The file `components/animations/PageTransition.tsx` currently has its Framer Motion animation commented out and replaced with a plain div. Re-enable smooth page transitions with these requirements:

1. Use Framer Motion's `AnimatePresence` with `mode="wait"`.
2. Use `usePathname()` from `next/navigation` as the key.
3. Animation: fade in from opacity 0 + slight Y translate (20px up), fade out to opacity 0 + Y (-10px). Duration 0.35s, ease "easeInOut".
4. Add a `prefers-reduced-motion` check — if the user has reduced motion enabled, skip the animation and just render children with no transition.
5. The wrapper div must have `className="w-full flex-grow flex flex-col"` to preserve layout.
6. Keep the old commented-out code removed cleanly.

The file lives at `components/animations/PageTransition.tsx`. Provide the full updated file.
```

---

## IMPROVEMENT 2 — `CustomCursor` Hidden on Mobile / Touch Devices

**What's wrong:**
`CustomCursor.tsx` renders unconditionally on all devices. On mobile/tablet (touch screens), there is no mouse pointer — the cursor div renders invisibly but still attaches `mousemove` and `mouseover` event listeners that waste memory and can cause subtle jank on low-end Android devices. There's also no `visibility: hidden` or `display: none` for touch-only sessions.

**Ready-to-use prompt:**
```
You are working on my Next.js 15 portfolio. The file `components/ui/CustomCursor.tsx` currently renders on all devices including mobile/touch screens where it serves no purpose.

Make the following improvements:
1. Add a `isTouchDevice` check using `window.matchMedia("(pointer: coarse)")` — if true, return null immediately and skip all event listeners.
2. Also add a `isVisible` state that starts as `false` and becomes `true` only after the first `mousemove` event — this prevents the cursor dot from flashing at position (0,0) before the user moves the mouse.
3. Apply `opacity-0` to the motion.div until `isVisible` is true, then transition to `opacity-100` smoothly.
4. Keep all existing spring physics (damping: 25, stiffness: 300, mass: 0.2) and hover scale behaviour intact.
5. Keep the `mix-blend-difference` effect.

Provide the full updated `CustomCursor.tsx` file.
```

---

## IMPROVEMENT 3 — Home Page Featured Projects Link to Wrong Place

**What's wrong:**
In `app/page.tsx`, each featured project card links to `/projects` (the listing page), not to the individual project. This means clicking a project card on the home page just navigates to the full projects list instead of opening that specific project's detail modal. This is a UX dead end — the user loses context.

```tsx
// Current — wrong
<Link key={project.id} href="/projects" ...>
```

**Ready-to-use prompt:**
```
You are working on my Next.js 15 portfolio's home page (`app/page.tsx`).

The "Featured Work" section near the bottom renders 3 project cards. Each card is a `<Link href="/projects">` — meaning all 3 cards link to the same page, which is just the projects listing. This is a poor UX.

Fix this by:
1. Change each card's `href` to `/projects?open=${project.id}` so the projects page knows which project to auto-open in the Dialog modal.
2. In `app/projects/page.tsx`, read the `open` query param using `useSearchParams()` from `next/navigation`.
3. On mount, if `open` param exists, find the matching project in `PROJECTS` by `id` and programmatically open its Dialog.
4. Use a `useState<string | null>(null)` called `openProjectId` to track which project dialog is open — lift this state up to the `Projects` component and pass it down to `ProjectCard`.
5. `ProjectCard` should accept an `isOpen` and `onOpenChange` prop and pass them to the shadcn `Dialog` component's `open` and `onOpenChange` props.
6. Wrap `useSearchParams()` in a `Suspense` boundary as required by Next.js App Router.

Preserve all existing flip-card CSS, star count SWR logic, and modal content. Provide both the updated `app/page.tsx` (featured section only) and full updated `app/projects/page.tsx`.
```

---

## IMPROVEMENT 4 — No `og:image` / Social Preview Image

**What's wrong:**
The root `layout.tsx` defines Open Graph and Twitter card metadata but never sets an `images` property. Without an `og:image`, sharing the portfolio URL on LinkedIn, Twitter/X, WhatsApp, or Slack shows a blank card — a huge missed opportunity for an AI/ML job seeker whose portfolio link will be shared with recruiters.

**Ready-to-use prompt:**
```
You are working on my Next.js 15 portfolio. The root `app/layout.tsx` has Open Graph and Twitter metadata defined but is missing `og:image`, which means the portfolio looks blank when shared on LinkedIn or Twitter.

Do the following:
1. Create a dynamic OG image using Next.js's built-in `ImageResponse` at `app/og/route.tsx`. The image should be 1200×630px, dark background (#0a0a0a), display my name "Ayan Pathak" in large white Inter bold text, subtitle "AI / ML Engineer" in blue (#3b82f6), and a short tagline "Deep Learning · NLP · Full-Stack". Keep it clean and text-only — no external image fetching.
2. In the root `app/layout.tsx` metadata object, add:
   - `openGraph.images: [{ url: "/og", width: 1200, height: 630, alt: "Ayan Pathak — AI/ML Engineer" }]`
   - `twitter.images: ["/og"]`
   - `twitter.card: "summary_large_image"` (already set, confirm it stays)
3. The OG route must export `export const runtime = "edge"` for fast cold starts on Vercel.

Provide the full new `app/og/route.tsx` file and the updated metadata section of `app/layout.tsx`.
```

---

## IMPROVEMENT 5 — No `sitemap.xml` or `robots.txt`

**What's wrong:**
There is no `app/sitemap.ts` or `app/robots.ts`. Without these, Google and other search engines have no structured map of the site. For a portfolio targeting job recruiters who may Google "Ayan Pathak AI ML engineer", SEO is a direct career asset.

**Ready-to-use prompt:**
```
You are working on my Next.js 15 App Router portfolio. Add proper SEO infrastructure:

1. Create `app/sitemap.ts` — export a default function that returns a `MetadataRoute.Sitemap` array covering all 4 routes: `/`, `/about`, `/projects`, `/contact`. Use `process.env.NEXT_PUBLIC_APP_URL` as the base. Set `changeFrequency: "monthly"` and `priority: 1.0` for `/`, `0.8` for the rest.

2. Create `app/robots.ts` — export a default function returning `MetadataRoute.Robots` that allows all crawlers on all routes and sets `sitemap: process.env.NEXT_PUBLIC_APP_URL + "/sitemap.xml"`.

3. In the root `app/layout.tsx` metadata, add:
   - `metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL ?? "https://localhost:3000")`
   This is required for Next.js to resolve relative OG image URLs correctly.

Provide all three files in full.
```

---

## IMPROVEMENT 6 — Contact Form Uses Resend Test Domain (Emails Go to Spam)

**What's wrong:**
In `app/api/contact/route.ts`, the `from` address is hardcoded to `onboarding@resend.dev` — the Resend sandbox domain. Emails sent from this address are frequently filtered to spam by Gmail and Outlook. Any recruiter who fills out the contact form may never reach Ayan's inbox. The email also has no HTML body — plain `text:` only.

**Ready-to-use prompt:**
```
You are working on my Next.js 15 portfolio's contact API route at `app/api/contact/route.ts`.

Two problems to fix:
1. The `from` field uses `onboarding@resend.dev` (Resend sandbox). Replace this with an environment variable: `process.env.RESEND_FROM_EMAIL ?? "onboarding@resend.dev"` so I can set my verified domain sender in production without changing code.

2. The email only sends plain `text:`. Add a proper HTML email body using a simple inline-styled template. The HTML email should:
   - Have a dark-themed design (#0a0a0a background, white text, blue (#3b82f6) accents) matching the portfolio.
   - Show the sender's name prominently, their email as a clickable mailto link, and the message in a readable card.
   - Include a footer: "Sent via Ayan Pathak's Portfolio Contact Form".
   - Be fully inline-styled (no external CSS, no <style> tags) for email client compatibility.
   - Keep the existing `text:` field as a plain-text fallback alongside the new `html:` field.

3. Add a `rate limiting` comment block (no implementation needed) explaining where to add Upstash Redis rate limiting in future to prevent form spam.

Preserve all Zod validation, error handling, and the `force-dynamic` export. Provide the full updated `route.ts`.
```

---

## IMPROVEMENT 7 — No Loading Skeleton / Suspense UI on Projects Page

**What's wrong:**
The projects page fetches GitHub star counts via SWR for each project card but shows `"—"` as a fallback with no visual indication that data is loading. More critically, there's no page-level loading state — the entire projects grid appears instantly but then star counts pop in asynchronously, causing layout shifts. There is also no `app/projects/loading.tsx` which means Next.js shows nothing during navigation to `/projects`.

**Ready-to-use prompt:**
```
You are working on my Next.js 15 portfolio's projects page.

Add proper loading states:

1. Create `app/projects/loading.tsx` — a skeleton loader that matches the real projects page layout:
   - Same header area with a pulsing gray bar in place of the title text.
   - 6 skeleton cards in a 3-column grid (matching the real grid). Each card: rounded-2xl, h-[400px], bg-neutral-900 with a shimmer animation using `animate-pulse`.
   - Use Tailwind only, no extra libraries.

2. In `app/projects/page.tsx`, update the `ProjectCard` component's star count display:
   - While SWR is loading (`!data && !error`), show a small animated pulse skeleton bar (w-8 h-3 bg-neutral-700 rounded animate-pulse) instead of the `"—"` fallback in the card back face.
   - Once loaded, show the actual star count with the Star icon as it does today.

3. In `app/projects/page.tsx`, add a `useSWR` error state: if `error` is truthy, show a small "★ —" with a tooltip `title="Could not load star count"` on the element.

Preserve all existing flip card logic, Dialog modal, AnimatePresence filtering, and category pills. Provide `app/projects/loading.tsx` (new file) and the updated star count section of `ProjectCard` in `app/projects/page.tsx`.
```

---

## IMPROVEMENT 8 — About Page Skill Bars Are Static Percentages (Not Data-Driven)

**What's wrong:**
In `app/about/page.tsx`, the skill bars are hardcoded inline arrays with made-up percentage strings like `"90%"`. They're not sourced from `@/lib/constants` or `@/data/`. This means updating skills requires editing page logic rather than data. The percentages also show no tooltip or context about what the % means, which can look vague to technical recruiters.

**Ready-to-use prompt:**
```
You are working on my Next.js 15 portfolio's about page (`app/about/page.tsx`).

Refactor the skill bars section:

1. Extract the skills data to `@/lib/constants.ts` as a new export:
```ts
export const SKILL_BARS = [
  { name: "Deep Learning (PyTorch / TensorFlow)", level: 90, note: "Primary framework — used in 4 of 6 projects" },
  { name: "Computer Vision & OpenCV", level: 85, note: "U-Net, YOLO, real-time detection" },
  { name: "NLP & Transformers", level: 80, note: "BERT fine-tuning, Hugging Face pipelines" },
  { name: "Backend Architecture (Django / Python)", level: 78, note: "REST APIs, Django ORM, FastAPI" },
  { name: "MLOps & Docker", level: 72, note: "Containerisation, CI pipelines, Vercel deploy" },
];
```

2. In `app/about/page.tsx`, import `SKILL_BARS` and map over it instead of the inline array.

3. Add a hover tooltip to each skill bar: on hover over the skill name, show a small popover/tooltip (use a `title` attribute for simplicity, or a custom Tailwind tooltip) that displays `skill.note`.

4. Replace the raw `"90%"` string display on the right with a filled dot indicator (e.g. 5 dots, filled proportionally to level/20) so it reads more visually than a raw number.

5. Keep all Framer Motion `barVariants` animation logic, `whileInView`, and `viewport` settings exactly as they are.

Provide the updated `SKILL_BARS` export for `lib/constants.ts` and the full updated skill bars section of `app/about/page.tsx`.
```

---

## IMPROVEMENT 9 — No 404 Page

**What's wrong:**
There is no `app/not-found.tsx`. When a user navigates to any URL that doesn't exist (e.g. `/ayan`, `/blog`, a broken link), Next.js shows its default plain white 404 page — completely breaking the dark immersive experience and looking unpolished.

**Ready-to-use prompt:**
```
You are working on my Next.js 15 App Router portfolio. Create a custom 404 page at `app/not-found.tsx`.

Requirements:
1. Matches the existing dark aesthetic: black background, white text, blue (#3b82f6) accents, Inter font via `font-sans`.
2. A large "404" displayed with the same `text-transparent bg-clip-text bg-gradient-to-br from-white via-white to-neutral-400 font-black` style used on the home page hero name.
3. A short message: "This page doesn't exist." with a subline: "You may have followed a broken link or mistyped the URL."
4. Two buttons: "Go Home" (white, rounded-full, links to `/`) and "View Projects" (blue bg, rounded-full, links to `/projects`).
5. A subtle animated background: use a CSS `@keyframes` pulse on a radial gradient blob (blue, low opacity ~5%) centred on the page — no Three.js, pure CSS only so this page is lightweight.
6. The component must be a server component (no `"use client"`) since it has no interactivity.
7. Export proper metadata: `export const metadata = { title: "404 — Page Not Found" }`.

Provide the full `app/not-found.tsx` file.
```

---

## IMPROVEMENT 10 — `projects.ts` Uses Placeholder GitHub URLs & Demo Links

**What's wrong:**
Every project in `@/data/projects.ts` uses placeholder GitHub URLs pointing to other people's repos (pytorch/vision, huggingface/transformers, etc.) and `demoUrl: "https://demo.com"`. The SWR star count fetch will return stars for those foreign repos, not Ayan's. The demo link is a dead placeholder. This makes the portfolio look unfinished to any technical recruiter who hovers the GitHub buttons.

**Ready-to-use prompt:**
```
You are working on my portfolio's project data file at `data/projects.ts`.

The current PROJECTS array uses placeholder GitHub URLs (pointing to pytorch, huggingface, etc.) and demo URLs set to "https://demo.com". I need to update this to my real data.

My GitHub username is: [YOUR_GITHUB_USERNAME]
My real project repos are:
  - Neural Vision Classifier → github.com/[USERNAME]/neural-vision-classifier
  - Semantic Text Summarizer → github.com/[USERNAME]/semantic-text-summarizer
  - Autonomous Trading Agent → github.com/[USERNAME]/autonomous-trading-agent
  - Scalable Analytics Dashboard → github.com/[USERNAME]/analytics-dashboard
  - Medical Image Segmentation → github.com/[USERNAME]/medical-image-segmentation
  - LLM Orchestrator Framework → github.com/[USERNAME]/llm-orchestrator

(Replace [USERNAME] and repo names with my actual ones above)

For projects without a live demo, change `demoUrl` to an empty string `""` and update `app/projects/page.tsx`'s "Live Demo" button to be `disabled` (with `opacity-50 cursor-not-allowed` styling and no `href`) when `project.demoUrl === ""`.

Also add a new optional field to the `Project` interface: `status?: "live" | "wip" | "archived"` and display a small status badge on the card front (top-left corner, next to category) — "WIP" in amber, "Live" in green, "Archived" in neutral gray.

Provide the updated `data/projects.ts` and the modified `ProjectCard` component section of `app/projects/page.tsx`.
```

---

## IMPROVEMENT 11 — No Scroll-to-Top Button

**What's wrong:**
The home page has multiple long sections. Once a user scrolls deep, there is no way to get back to the top except manually scrolling. The about page's timeline is especially long. No `ScrollToTop` button exists anywhere in the codebase.

**Ready-to-use prompt:**
```
You are working on my Next.js 15 portfolio. Create a reusable `ScrollToTop` button component and add it to the root layout.

Requirements:
1. Create `components/ui/ScrollToTop.tsx` as a `"use client"` component.
2. It renders a fixed circular button at `bottom-8 right-8`, `z-40`.
3. The button is only visible when `window.scrollY > 400` — use a `useEffect` with a scroll listener and `useState` for `isVisible`.
4. Use Framer Motion `AnimatePresence` + `motion.button` to animate in (scale from 0, opacity 0) and out (scale to 0) smoothly.
5. On click, call `window.scrollTo({ top: 0, behavior: "smooth" })`.
6. Button style: `bg-blue-600 hover:bg-blue-500 text-white rounded-full p-3 shadow-lg shadow-blue-500/20`.
7. Icon: use `ArrowUp` from `lucide-react` (size 18).
8. Respect `prefers-reduced-motion`: if the user has it enabled, use `behavior: "instant"` instead of `"smooth"`.
9. Add it to `app/layout.tsx` inside `<Providers>`, after `<CustomCursor />`.

Provide the full new `components/ui/ScrollToTop.tsx` and the updated `app/layout.tsx`.
```

---

## IMPROVEMENT 12 — No Analytics (Zero Visibility into Recruiter Visits)

**What's wrong:**
There is no analytics integration. Ayan has no way to know if recruiters are visiting, which projects they click on, how far they scroll, or whether they submit the contact form. For a job-seeking portfolio, this data is extremely valuable.

**Ready-to-use prompt:**
```
You are working on my Next.js 15 App Router portfolio. Add Vercel Analytics and Vercel Speed Insights — both are free on the Vercel hobby plan and require zero configuration beyond installing and adding the components.

1. The packages to install are: `@vercel/analytics` and `@vercel/speed-insights`.

2. In `app/layout.tsx`, import `Analytics` from `@vercel/analytics/react` and `SpeedInsights` from `@vercel/speed-insights/next`. Place both components inside `<Providers>` at the very bottom, after all other children.

3. In `app/contact/page.tsx`, add a custom analytics event on successful form submission. After `toast.success(...)` fires, call:
   `import { track } from "@vercel/analytics"; track("contact_form_submitted");`
   This lets me see in the Vercel dashboard how many recruiters actually sent a message.

4. In `app/projects/page.tsx`, track category filter clicks:
   `track("project_filter", { category: category });`
   so I can see which project types recruiters are most interested in.

Provide the updated `app/layout.tsx`, the updated `app/contact/page.tsx` onSubmit handler, and the updated category filter button `onClick` in `app/projects/page.tsx`.
```

---

## IMPROVEMENT 13 — Hero Stats Are Hardcoded & Undersell the Work

**What's wrong:**
In `app/page.tsx`, the stats row shows:
- `"3+"` Years Learning
- `"6+"` Projects Built
- `"1"` Internship

These are hardcoded strings, not driven from constants. More importantly, "Years Learning" is a weak metric — recruiters care about output, not time spent. "1 Internship" with the number `1` draws attention to how few there are. Compare to stronger framings like "5 ML Models Deployed" or "2 Production Apps".

**Ready-to-use prompt:**
```
You are working on my Next.js 15 portfolio's home page (`app/page.tsx`).

The "Quick Stats" section below the hero CTAs currently shows hardcoded stats. Make two improvements:

1. Move stats to `lib/constants.ts` as a `HERO_STATS` export:
```ts
export const HERO_STATS = [
  { value: "6+", label: "Projects Shipped" },
  { value: "2", label: "Frameworks Mastered" },  // PyTorch + TF
  { value: "1", label: "Industry Internship" },
];
```
   Then map over `HERO_STATS` in the JSX instead of the inline array. This makes stats editable from one place.

2. Add a subtle count-up animation to each stat number when the section enters the viewport:
   - Use Framer Motion's `useInView` hook (ref on the stats container).
   - When `inView` becomes true, animate each numeric value from 0 to its final number over 1.2 seconds with an `easeOut` curve.
   - For values like `"6+"`, animate the number `6` and append `+` statically.
   - For non-numeric values, just fade them in.
   - Respect `prefers-reduced-motion`: skip the count-up if the media query matches.

Provide the updated `HERO_STATS` constant for `lib/constants.ts` and the updated stats section of `app/page.tsx`.
```

---

## IMPROVEMENT 14 — Graduation Year Inconsistency (2026 vs 2027)

**What's wrong:**
The About page timeline shows `"2022 — 2026"` for the B.E. degree, but the home page info bar hardcodes `"B.E. CSE AI/ML, 2027"`. These two values contradict each other. A recruiter who reads both will notice. The data is also split between a constants file and a hardcoded string in `page.tsx`.

**Ready-to-use prompt:**
```
You are working on my Next.js 15 portfolio. There is a data inconsistency: the About page timeline shows graduation "2022 — 2026" but the home page shows "B.E. CSE AI/ML, 2027".

Fix this by:
1. Decide on the correct graduation year and update `PERSONAL_INFO.graduationYear` in `lib/constants.ts` to the single source of truth (e.g. `"2026"`).
2. In `app/page.tsx`, the info bar currently has this hardcoded string: `"B.E. CSE AI/ML, 2027"`. Replace it with: `` `B.E. CSE AI/ML, ${PERSONAL_INFO.graduationYear}` `` so it always stays in sync with constants.
3. In `app/about/page.tsx`, the timeline entry for the B.E. has `period: "2022 — 2026"` hardcoded. Replace the end year with `PERSONAL_INFO.graduationYear` so it reads: `` `2022 — ${PERSONAL_INFO.graduationYear}` ``.

Provide the three updated snippets: `lib/constants.ts` (graduationYear), the info bar in `app/page.tsx`, and the timeline entry in `app/about/page.tsx`.
```

---

## IMPROVEMENT 15 — `CustomCursor` Breaks on Iframe / Canvas Elements

**What's wrong:**
The `handleMouseOver` function in `CustomCursor.tsx` checks `window.getComputedStyle(target).cursor` — but when the mouse enters a `<Canvas>` (Three.js) or `<iframe>` (YouTube embed in the projects modal), the event target becomes the iframe/canvas element. `getComputedStyle` on a canvas inside a WebGL context can return unexpected values or fail silently, causing the cursor to flicker or get stuck in hover state.

**Ready-to-use prompt:**
```
You are working on my Next.js 15 portfolio's `components/ui/CustomCursor.tsx`.

The cursor flickers when hovering over Three.js Canvas elements and YouTube iframes. Fix this:

1. In `handleMouseOver`, before calling `getComputedStyle`, add an early return for elements that should be ignored:
```ts
const tag = target.tagName.toLowerCase();
if (tag === "canvas" || tag === "iframe") {
  setIsHovered(false);
  return;
}
```

2. The current detection checks only the direct target element. Add `closest()` traversal so that clicking a child of an `<a>` or `<button>` (e.g. an SVG icon inside a link) still correctly sets `isHovered = true`:
```ts
const isInteractive =
  target.closest("a") !== null ||
  target.closest("button") !== null ||
  window.getComputedStyle(target).cursor === "pointer";
setIsHovered(isInteractive);
```

3. Add a `mouseleave` event on `document` that resets `isHovered` to `false` when the cursor leaves the browser window entirely (so the cursor dot doesn't stay in hovered state after the mouse exits).

Provide the full updated `CustomCursor.tsx`.
```

---

## Summary Table

| # | Improvement | Impact | Difficulty |
|---|---|---|---|
| 1 | Re-enable page transitions | Polish / UX | Easy |
| 2 | Hide cursor on mobile | Performance | Easy |
| 3 | Fix featured project links | UX / Conversion | Medium |
| 4 | Add OG image for social sharing | Career / SEO | Medium |
| 5 | Add sitemap + robots.txt | SEO | Easy |
| 6 | Fix contact email (spam → inbox) | Career / Critical | Easy |
| 7 | Projects loading skeleton | UX Polish | Medium |
| 8 | Data-driven skill bars | Maintainability | Easy |
| 9 | Custom 404 page | Polish | Easy |
| 10 | Fix placeholder GitHub/demo links | Credibility / Critical | Easy |
| 11 | Scroll-to-top button | UX | Easy |
| 12 | Add analytics | Career insight | Easy |
| 13 | Animate hero stats + move to constants | Polish | Medium |
| 14 | Fix graduation year inconsistency | Credibility | Easy |
| 15 | Fix cursor on Canvas/iframes | Bug fix | Easy |

**Start with #10, #6, and #14** — these are credibility issues that a recruiter will notice immediately. Then do #4 and #5 for career reach. Then polish with #1, #3, #7, and #11.