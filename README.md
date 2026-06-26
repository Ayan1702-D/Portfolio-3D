# Ayan Pathak — AI/ML Engineer Portfolio

![Next.js](https://img.shields.io/badge/Next.js-16-black?style=for-the-badge&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=for-the-badge&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-v4-38bdf8?style=for-the-badge&logo=tailwindcss)
![Three.js](https://img.shields.io/badge/Three.js-R3F-black?style=for-the-badge&logo=three.js)
![Vercel](https://img.shields.io/badge/Deployed_on-Vercel-black?style=for-the-badge&logo=vercel)
![License](https://img.shields.io/badge/License-MIT-lightgrey?style=for-the-badge)

A production-ready, interactive portfolio for Ayan Pathak — AI/ML engineering student at LTCE Mumbai (graduating 2027). Built with Next.js 15 App Router, React Three Fiber, Framer Motion, and GSAP. Features a 3D neural network hero, animated skill sphere, interactive globe on the contact page, and a full contact pipeline via Resend.

**Live URL:** https://portfolio-3d-lyart-two.vercel.app/

---

## Features

**3D & Animation**
- Interactive neural network particle system on the hero (React Three Fiber + Three.js)
- Rotating 3D skill sphere on the About page using `@react-three/drei` HTML overlays
- Real Earth globe with a Mumbai location marker on the Contact page (TextureLoader + SolvePnP-style lat/lon mapping)
- GSAP ScrollTrigger-animated SVG timeline line on the About page
- GSAP staggered character reveal on the hero heading

**UI & Polish**
- Custom magnetic spring cursor with canvas/iframe flicker protection and touch-device bypass
- Flip-card project grid with back-face star counts loaded via SWR from the GitHub API
- Framer Motion `AnimatePresence` project filter with `popLayout` for smooth card reordering
- Scroll-to-top button with `prefers-reduced-motion` support
- Fully mobile-responsive certificates page with an accordion-based verification matrix on small screens
- Dark-themed OG image generated at `/og` via Next.js Edge ImageResponse (1200×630)

**Pages**
| Route | Description |
|---|---|
| `/` | Hero with 3D neural network, recruiter snapshot, featured projects |
| `/about` | 3D skill sphere, animated skill bars, GSAP timeline |
| `/projects` | Filterable flip-card grid with GitHub star counts and modal details |
| `/certificates` | IBM, Edunet/AICTE, and VIT hackathon credentials with verification links |
| `/contact` | Interactive Earth globe, social links, Resend-powered contact form |
| `/og` | Edge-rendered Open Graph image |

**Backend & Infrastructure**
- Contact form API route (`/api/contact`) using Resend with a fully dark-themed HTML email template and Zod validation
- Vercel Analytics event tracking for contact form submissions and project category filter clicks
- Vercel Speed Insights for Core Web Vitals monitoring
- `sitemap.xml` and `robots.txt` generated via Next.js Metadata Routes
- GitHub Actions CI: ESLint + `next build` on every push to `main`
- Docker and Docker Compose support via standalone Next.js output

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 16 (App Router) |
| Language | TypeScript 5 |
| Styling | Tailwind CSS v4, shadcn/ui (Radix Nova) |
| 3D / Canvas | Three.js, React Three Fiber, `@react-three/drei` |
| Animation | Framer Motion, GSAP + ScrollTrigger |
| Data Fetching | SWR (GitHub star counts) |
| Forms | React Hook Form + Zod |
| Email | Resend |
| Analytics | Vercel Analytics, Vercel Speed Insights |
| Deployment | Vercel (primary), Docker (self-host) |

---

## Project Structure

```
portfolio-3d/
├── app/
│   ├── (pages)/
│   │   ├── about/          # 3D sphere, skill bars, GSAP timeline
│   │   ├── certificates/   # IBM + AICTE + VIT credentials, mobile accordion
│   │   ├── contact/        # Globe, social links, Resend form
│   │   └── projects/       # Flip-card grid, SWR star counts, filter
│   ├── api/
│   │   └── contact/        # POST handler — Zod validation + Resend HTML email
│   ├── og/                 # Edge ImageResponse for OG social previews
│   ├── layout.tsx          # Root layout — Navbar, CustomCursor, Analytics
│   ├── page.tsx            # Home — neural network hero, recruiter snapshot
│   ├── notfound.tsx        # Custom 404 with CSS blob animation
│   ├── robots.ts           # Crawl rules + sitemap pointer
│   └── site.ts             # XML sitemap
├── components/
│   ├── animations/
│   │   └── PageTransition.tsx
│   ├── layout/
│   │   └── Navbar.tsx      # GSAP mobile drawer, Resume + Hire Me CTAs
│   └── ui/
│       ├── CustomCursor.tsx # Spring cursor, touch bypass, iframe fix
│       ├── ScrollToTop.tsx  # AnimatePresence fade, reduced-motion scroll
│       └── (shadcn components)
├── data/
│   └── projects.ts         # 6 real projects with status badges
├── lib/
│   ├── constants.ts        # PERSONAL_INFO, NAVIGATION, SKILL_BARS, HERO_STATS
│   └── utils.ts
├── public/
├── .github/workflows/ci.yml
├── Dockerfile
├── docker-compose.yml
├── next.config.ts
└── vercel.json
```

---

## Local Setup

### Prerequisites

- Node.js 20+
- npm

### 1. Clone

```bash
git clone https://github.com/Ayan1702-D/portfolio-3d.git
cd portfolio-3d
```

### 2. Install dependencies

```bash
npm install --legacy-peer-deps
```

> `--legacy-peer-deps` is required due to a peer dependency conflict between `react-tilt` and React 19.

### 3. Configure environment variables

Create a `.env.local` file in the project root:

```env
# Required — your public deployment URL (used for sitemap, OG image, metadata)
NEXT_PUBLIC_APP_URL=http://localhost:3000

# Required for the contact form
RESEND_API_KEY=re_your_api_key_here

# Optional — sender address from your verified Resend domain
# Falls back to onboarding@resend.dev (sandbox, may hit spam) if not set
RESEND_FROM_EMAIL=portfolio@yourdomain.com
```

Get a free Resend API key at [resend.com](https://resend.com).

### 4. Run the dev server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

---

## Deployment

### Vercel (recommended)

1. Push to GitHub and import the repo in the [Vercel dashboard](https://vercel.com/new).
2. Add the three environment variables (`NEXT_PUBLIC_APP_URL`, `RESEND_API_KEY`, `RESEND_FROM_EMAIL`) under **Project Settings → Environment Variables**.
3. Vercel auto-detects Next.js. No framework configuration needed — `vercel.json` handles security headers.

After deploy, update `NEXT_PUBLIC_APP_URL` to your live domain and redeploy so the sitemap, OG image, and canonical URLs resolve correctly.

### Docker (self-host)

```bash
# Build and run
docker compose up --build

# Or build manually
docker build -t portfolio-3d .
docker run -p 3000:3000 \
  -e NEXT_PUBLIC_APP_URL=http://localhost:3000 \
  -e RESEND_API_KEY=re_your_key \
  portfolio-3d
```

The Dockerfile uses a multi-stage build with a non-root `nextjs` user and the Next.js standalone output for minimal image size.

---

## Environment Variables Reference

| Variable | Required | Description |
|---|---|---|
| `NEXT_PUBLIC_APP_URL` | Yes | Full URL of the deployment, e.g. `https://ayanpathak.dev`. Used for metadata, sitemap, and OG image. |
| `RESEND_API_KEY` | Yes | API key from [resend.com](https://resend.com). Needed for the contact form to send email. |
| `RESEND_FROM_EMAIL` | No | Verified sender address. Defaults to `onboarding@resend.dev` (Resend sandbox — emails may go to spam). Set this in production. |

---

## CI/CD

GitHub Actions runs on every push and pull request to `main`:

1. **Checkout** the repository
2. **Setup Node.js 20** with npm cache
3. **Install dependencies** (`npm ci --legacy-peer-deps`)
4. **Run ESLint** (`npm run lint`)
5. **Build** (`npm run build`) with mock env vars so the build never fails due to missing secrets

The workflow file lives at `.github/workflows/ci.yml`.

---

## Key Design Decisions

**`--legacy-peer-deps` everywhere** — `react-tilt@1.0.2` declares a peer dependency on React 16–18. Since this project uses React 19, npm's strict peer resolution would block install. The flag is set in both `npm install` and the CI workflow.

**SWR for GitHub stars** — star counts are fetched client-side after hydration so the page never blocks on the GitHub API. Cards show an animated skeleton while loading and a `—` with a tooltip on error.

**Edge runtime for OG image** — `/app/og/route.tsx` exports `runtime = "edge"` so the ImageResponse generates at the CDN edge with near-zero cold start, avoiding a Lambda invocation for every link preview.

**`CustomCursor` iframe/canvas guard** — the cursor's `mouseover` handler skips `canvas` and `iframe` elements to prevent flicker caused by `getComputedStyle` being called on WebGL and YouTube contexts. It also uses `closest()` traversal so SVG icons inside `<a>` tags are correctly detected as interactive.

**Certificates accordion on mobile** — the four-column verification matrix table is unusable at 390px wide. On `sm:` breakpoints and above the standard table renders; below that, a Framer Motion accordion replaces it with one expandable row per credential.

---

## Projects Showcased

| Project | Category | Stack |
|---|---|---|
| Driver Drowsiness Monitoring System | Computer Vision | Python, OpenCV, Dlib |
| Autonomous Pothole Detection System | Computer Vision | YOLOv8, TFLite, Folium |
| Risk & Anomaly Management System (RAMS) | Machine Learning | Scikit-Learn, Django, PostgreSQL |
| FinSight AI — Banking Intelligence Suite | Agentic AI | Django, OpenRouter, Chart.js |
| Energy Consumption Forecasting | Deep Learning | TensorFlow, Keras, LSTM |
| Workbook Converter & Merger | Web | FastAPI, Pandas, OpenPyXL |

---

## Certifications

- IBM SkillsBuild — Decoding Data: Insights & Impact through Analytics 2025-26
- IBM SkillsBuild — Data Analysis with Python (DA0101EN)
- IBM SkillsBuild — Big Data 101 (BD0101EN)
- Edunet Foundation × AICTE × Shell India — Foundation Course on Green Skills and AI
- VIT Mumbai — CODE-A-THON 2026 Finalist (ALGORHYTHM '26)

---

## License

MIT © 2026 Ayan Pathak