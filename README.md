# Fable E-Book Platform (`fable-ebook-clinetside`)

A modern, high-performance digital e-book marketplace and reader dashboard built with **Next.js 16 **, **React 19**, **HeroUI**, **Tailwind CSS v4**, and **MongoDB**. Fable provides a seamless publishing ecosystem for authors, a streamlined storefront and reader experience for book lovers, and a full administrative suite for platform governance.

---

## 🔗 Live URLs & Resources

* **Live Demo:** [https://fable-ebook.vercel.app](https://fable-ebook-clinetside-henna.vercel.app/) 
---

## 🎯 Purpose & Overview

The **Fable E-Book Platform** bridges the gap between independent authors and readers. It solves key challenges around digital rights, content discovery, and monetization by offering:

1. **Role-Based Workflows:** Distinct dashboard views, navigation, and permissions for Readers, Authors (Writers), and Platform Administrators.
2. **Author Self-Publishing:** Real-time manuscript submission, pricing configuration, cover upload integration, and metadata management.
3. **Frictionless Purchasing:** Stripe-backed instant checkout flow with double-purchase prevention and automated library provisioning.
4. **Digital Reading Hub:** Centralized digital bookshelf with immediate access to purchased manuscripts[cite: 1].

---

## 🌟 Key Features

### 👤 Authentication & Role-Based Access Control (RBAC)
* Powered by `better-auth` and `@better-auth/mongo-adapter` with secure session cookies and JWT support[cite: 1].
* Granular access control protecting writer-only publishing suites, reader libraries, and admin moderation centers[cite: 1].

### 📚 Author / Writer Management
* Add, edit, and safely manage original titles[cite: 1].
* Update book metadata (title, genre, price, status, descriptions) with automatic audit timestamping[cite: 1].
* Protected resource ownership: authors can only edit or delete their own inventory[cite: 1].

### 💳 Secure Purchases & Payment Processing
* Stripe integration via `@stripe/stripe-js` and `stripe` SDK for one-click digital checkout[cite: 1].
* Robust purchase verification that prevents double-buying and restricts unauthorized role purchases[cite: 1].

### 🎨 Modern UI / UX & Dynamic Animations
* Premium aesthetic designed with `@heroui/react` and Tailwind CSS v4[cite: 1].
* Fluid layout animations and tickers powered by `motion` (Framer Motion)[cite: 1].
* Real-time animated analytical counters using `react-countup`[cite: 1].
* Instant transactional alerts and error notifications via `react-hot-toast`[cite: 1].

---

## 🛠️ NPM Packages & Dependencies

Below is the complete breakdown of packages used across the project[cite: 1]:

### 📦 Production Dependencies

| Package | Version | Purpose |
| :--- | :--- | :--- |
| `next` | `^16.2.9` | React framework with App Router |
| `react` & `react-dom` | `19.2.4` | Latest React core rendering library[cite: 1] |
| `@heroui/react` | `^3.2.1` | Accessible, modern UI component library[cite: 1] |
| `@heroui/styles` | `^3.2.1` | Theme engine and style utilities for HeroUI[cite: 1] |
| `better-auth` | `^1.6.20` | Full-featured authentication framework[cite: 1] |
| `@better-auth/mongo-adapter` | `^1.6.20` | Native MongoDB adapter for Better Auth[cite: 1] |
| `mongodb` | `^7.3.0` | Official MongoDB Node.js database driver[cite: 1] |
| `stripe` | `^22.3.0` | Server-side Stripe API and Webhook handler[cite: 1] |
| `@stripe/stripe-js` | `^9.9.0` | Client-side Stripe Elements and checkout SDK[cite: 1] |
| `motion` | `^12.41.0` | Production-grade animation library (Framer Motion)[cite: 1] |
| `react-countup` | `^6.5.3` | Smooth numerical count-up dashboard animations[cite: 1] |
| `react-hot-toast` | `^2.6.0` | Lightweight, customizable notification toasts[cite: 1] |
| `lucide-react` & `lucide` | `^1.21.0` / `^1.3.0` | Modern SVG icons[cite: 1] |
| `react-icons` | `^5.6.0` | Supplemental icon pack[cite: 1] |
| `postcss` | `^8.5.16` | Tool for transforming styles with JS plugins[cite: 1] |

### 🛠️ Development Dependencies

| Package | Version | Purpose |
| :--- | :--- | :--- |
| `tailwindcss` | `^4.3.2` | Next-generation utility-first CSS framework[cite: 1] |
| `@tailwindcss/postcss` | `^4.3.2` | PostCSS integration plugin for Tailwind v4[cite: 1] |
| `babel-plugin-react-compiler` | `1.0.0` | Automatic memoization React compiler[cite: 1] |
| `eslint` & `eslint-config-next` | `^9` / `16.2.9` | Code linting and Next.js best practice rules[cite: 1] |

---

## 🚀 Getting Started

### 1. Prerequisites
* **Node.js**: `v20.x` or later[cite: 1]
* **MongoDB**: A running MongoDB instance or MongoDB Atlas connection URI[cite: 1]
* **Stripe Account**: Test API keys from Stripe Dashboard[cite: 1]

### 2. Installation

Clone the repository and install required packages[cite: 1]:

