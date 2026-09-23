# Fable E-Book Platform (`fable-ebook-clinetside`)

A modern, high-performance digital e-book marketplace and reader dashboard built with **Next.js 16**, **React 19**, **HeroUI**, **Tailwind CSS v4**, and **MongoDB**. Fable provides a seamless publishing ecosystem for authors, a streamlined storefront and reader experience for book lovers, and a full administrative suite for platform governance.

---

## 🔗 Live URLs & Resources

* **Live Demo:** [https://fable-ebook-clinetside-henna.vercel.app](https://fable-ebook-clinetside-henna.vercel.app)
* **API Server:** Deployed separately as an Express/MongoDB backend

---

## 🎯 Purpose & Overview

The **Fable E-Book Platform** bridges the gap between independent authors and readers. It solves key challenges around digital rights, content discovery, and monetization by offering:

1. **Role-Based Workflows:** Distinct dashboard views, navigation, and permissions for Readers, Authors (Writers), and Platform Administrators.
2. **Author Self-Publishing:** Real-time manuscript submission, pricing configuration, cover upload integration, and metadata management.
3. **Frictionless Purchasing:** Stripe-backed instant checkout flow with double-purchase prevention and automated library provisioning.
4. **Digital Reading Hub:** Centralized digital bookshelf with immediate access to purchased manuscripts.
5. **Discovery Tools:** Server-driven search, genre filtering, sorting, and pagination across the catalog.

---

## 🌟 Key Features

### 👤 Authentication & Role-Based Access Control (RBAC)
* Powered by `better-auth` with secure session cookies and a JWT plugin for cross-service authentication.
* The Next.js app and the Express API are separate services; every write and sensitive read on the API is protected by JWT verification (`jose` + JWKS) and role-based middleware (`verifyToken`, `requireAdmin`, `requireWriter`, `verifyReader`).
* Granular access control protecting writer-only publishing suites, reader libraries, and admin moderation centers.

### 📚 Author / Writer Management
* Add, edit, and safely manage original titles.
* Update book metadata (title, genre, price, status, descriptions) with automatic audit timestamping.
* Protected resource ownership: writers can only edit or delete their own inventory; full content stays locked until purchase.

### 🔍 Search, Filter & Pagination
* Server-side, database-driven search by title/author, genre filtering, and price/date sorting.
* URL-synced filters (shareable, bookmarkable, survive refresh) with debounced input.
* Cursor-based pagination with MongoDB aggregation for accurate result counts.

### 💳 Secure Purchases & Payment Processing
* Stripe integration via `@stripe/stripe-js` and `stripe` SDK for one-click digital checkout.
* Server-verified pricing (never trusts client-submitted amounts), role-based purchase restrictions, and duplicate-purchase prevention enforced both client- and server-side.

### 🛠️ Admin Control Panel
* Manage Ebooks: publish/unpublish, delete, and moderate every title on the platform.
* Manage Users: change roles (reader/writer/admin) and remove accounts.
* Analytics Overview: total users, writers, ebooks sold, total revenue, and published/unpublished book counts via MongoDB aggregation pipelines.

### 🎨 Modern UI / UX & Dynamic Animations
* Premium aesthetic designed with `@heroui/react` and Tailwind CSS v4.
* Fluid layout animations and an auto-scrolling marquee for featured titles, powered by `motion` (Framer Motion) and `react-fast-marquee`.
* Instant transactional alerts and error notifications via `react-hot-toast`.
* Homepage sections for Featured Ebooks and Top Writers (ranked by sales via aggregation).

---

## 🛠️ NPM Packages & Dependencies

### 📦 Production Dependencies

| Package | Version | Purpose |
| :--- | :--- | :--- |
| `next` | `^16.2.9` | React framework with App Router |
| `react` & `react-dom` | `19.2.4` | React core rendering library |
| `@heroui/react` | `^3.2.1` | Accessible, modern UI component library |
| `@heroui/styles` | `^3.2.1` | Theme engine and style utilities for HeroUI |
| `better-auth` | `^1.6.20` | Full-featured authentication framework |
| `mongodb` | `^7.3.0` | Official MongoDB Node.js database driver |
| `stripe` | `^22.3.0` | Server-side Stripe API handler |
| `@stripe/stripe-js` | `^9.9.0` | Client-side Stripe checkout SDK |
| `motion` | `^12.41.0` | Animation library (Framer Motion) |
| `react-fast-marquee` | latest | Auto-scrolling carousel for featured ebooks |
| `react-hot-toast` | `^2.6.0` | Lightweight, customizable notification toasts |
| `react-icons` | `^5.6.0` | Icon pack (Feather icons used throughout) |
| `postcss` | `^8.5.16` | Tool for transforming styles with JS plugins |

### 🖥️ Backend (Express API server)

| Package | Purpose |
| :--- | :--- |
| `express` | HTTP server and routing |
| `mongodb` | Official MongoDB driver |
| `cors` | Cross-origin request handling |
| `dotenv` | Environment variable management |
| `jose` | JWT verification against the Next.js app's JWKS endpoint |

### 🛠️ Development Dependencies

| Package | Version | Purpose |
| :--- | :--- | :--- |
| `tailwindcss` | `^4.3.2` | Utility-first CSS framework |
| `@tailwindcss/postcss` | `^4.3.2` | PostCSS integration plugin for Tailwind v4 |
| `eslint` & `eslint-config-next` | `^9` / `16.2.9` | Code linting and Next.js best practice rules |

---

## 🚀 Getting Started

### 1. Prerequisites
* **Node.js**: `v20.x` or later
* **MongoDB**: A running MongoDB instance or MongoDB Atlas connection URI
* **Stripe Account**: Test API keys from the Stripe Dashboard

### 2. Installation

Clone the repository and install required packages:

\`\`\`bash
git clone https://github.com/thenoname09/fable-ebook-clinetside.git
cd fable-ebook-clinetside
npm install
\`\`\`

### 3. Environment Variables

Create a `.env` file with:

\`\`\`
BETTER_AUTH_SECRET=
BETTER_AUTH_URL=
NEXT_PUBLIC_BETTER_AUTH_URL=
NEXT_PUBLIC_BASE_URL=
MONGODB_URL=
NEXT_PUBLIC_IMGBB_API_KEY=
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=
STRIPE_SECRET_KEY=
\`\`\`

The separate Express API server requires its own `MONGODB_URL`, `PORT`, and `NEXT_APP_URL` (pointing back to this app's deployed URL, for JWT/JWKS verification).

### 4. Run locally

\`\`\`bash
npm run dev
\`\`\`
