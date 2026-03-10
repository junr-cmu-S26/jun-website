# Jun's Personal Website 🌊

> From the 黄海 to Silicon Valley — A story-driven personal website for a Software Engineer

**Live Demo:** [Deploy to Vercel →](#deployment)

---

## Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS + Custom CSS Variables
- **Animations:** CSS animations + `react-intersection-observer`
- **Backend:** Next.js API Routes
- **Database:** MongoDB Atlas (free tier)
- **Deployment:** Vercel

---

## Project Structure

```
src/
├── app/
│   ├── api/
│   │   ├── comments/route.ts    # GET/POST comments
│   │   └── questions/route.ts   # GET/POST questions
│   ├── globals.css              # Ocean theme + global styles
│   ├── layout.tsx               # Root layout with nav
│   └── page.tsx                 # Main page
├── components/
│   ├── sections/
│   │   ├── HeroSection.tsx      # Ocean animation hero
│   │   ├── ExperienceSection.tsx # Story-format internships
│   │   ├── ProjectsSection.tsx   # Engineering projects
│   │   ├── LeadershipSection.tsx # Impact & leadership
│   │   ├── BeyondSection.tsx     # Personal life
│   │   └── ConnectSection.tsx    # Comments + Q&A
│   └── ui/
│       ├── Navbar.tsx           # Top navigation
│       ├── NavDots.tsx          # Side section dots
│       └── ThemeProvider.tsx    # Dark/light mode
└── lib/
    ├── mongodb.ts               # DB connection
    └── models.ts                # Comment + Question schemas
```

---

## Quick Start (Local Development)

### 1. Prerequisites
- Node.js 18+
- npm or yarn
- MongoDB Atlas account (free)

### 2. Clone and Install

```bash
# After creating GitHub repo and pushing this code:
git clone https://github.com/YOUR_USERNAME/jun-website.git
cd jun-website
npm install
```

### 3. Set Up MongoDB Atlas (FREE)

1. Go to [mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas)
2. Create a FREE cluster (M0 Sandbox)
3. Create a database user (username + password)
4. Add IP address `0.0.0.0/0` to the allowlist (allows all IPs for Vercel)
5. Click "Connect" → "Connect your application" → Copy the connection string

### 4. Configure Environment Variables

```bash
cp .env.local.example .env.local
```

Edit `.env.local`:
```
MONGODB_URI=mongodb+srv://YOUR_USERNAME:YOUR_PASSWORD@cluster0.xxxxx.mongodb.net/jun-website?retryWrites=true&w=majority
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

### 5. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) 🎉

---

## Personalization Checklist

### Required: Update Your Info

**In `src/components/sections/HeroSection.tsx`:**
- [ ] Replace `https://linkedin.com/in/YOUR_LINK` with your LinkedIn URL
- [ ] Replace `YOUR_EMAIL@example.com` with your email

**In `src/components/sections/BeyondSection.tsx`:**
- [ ] Add your actual photos to `/public/images/` folder
- [ ] Update the gallery section to use `<Image>` components

**In `src/app/layout.tsx`:**
- [ ] Update the metadata description/title if needed

### Optional: Personalize Content
- The internship stories, project descriptions, and personal narrative are all ready to go
- Edit any section files in `src/components/sections/` to adjust content

---

## Deployment to Vercel (FREE)

### Step 1: Push to GitHub

```bash
# In the project folder:
git init
git add .
git commit -m "Initial commit: Jun's personal website"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/jun-website.git
git push -u origin main
```

### Step 2: Deploy to Vercel

1. Go to [vercel.com](https://vercel.com)
2. Sign in with GitHub
3. Click "New Project" → Import your `jun-website` repo
4. Under **Environment Variables**, add:
   - `MONGODB_URI` = your MongoDB connection string
5. Click **Deploy**

✅ Your site will be live at `https://jun-website.vercel.app` (or custom domain)

### Step 3: Custom Domain (Optional)

In Vercel dashboard → Settings → Domains → Add your domain

---

## Admin: Managing Comments & Questions

Currently, comments and questions are stored in MongoDB. To manage them:

1. Go to [cloud.mongodb.com](https://cloud.mongodb.com)
2. Navigate to your cluster → Browse Collections
3. Find the `jun-website` database
4. Edit/delete/pin comments in the `comments` collection
5. To pin a comment: set `pinned: true`
6. To make a Q&A public + add answer: set `isPublic: true` and fill in `answer`

---

## Features

- 🌊 **Ocean hero animation** — Animated SVG waves + canvas light rays + bubble particles
- 🌙 **Dark/Light mode** — Persisted to localStorage
- 📱 **Fully responsive** — Mobile-first design
- ✨ **Scroll animations** — Intersection Observer fade-ins
- 💬 **Live comments** — MongoDB-backed, real-time
- ❓ **Ask Me Anything** — Question submission with optional public Q&A display
- 🧭 **Side navigation dots** — Section tracking
- 🎯 **SEO optimized** — Metadata configured
- ⚡ **Fast** — Optimized fonts, minimal JS

---

## Gallery: Adding Your Photos

Add photos to `/public/images/` and update `BeyondSection.tsx`:

```tsx
// Replace placeholder divs with:
import Image from 'next/image'

<Image
  src="/images/family.jpg"
  alt="Family"
  width={400}
  height={400}
  className="aspect-square rounded-xl object-cover"
/>
```

---

Built with ❤️ — Jun Wang
