# Ceylon Hiking Trails ⛰️🇱🇰

> **Discover the Trails. Explore Sri Lanka.**  
> A premium, modern digital platform dedicated to discovering, planning, navigating, and sharing authentic hiking trails across Sri Lanka's mountains, cloud forests, and waterfalls.

---

## 🌟 Overview

**Ceylon Hiking Trails** is an end-to-end, 3-tier full-stack application engineered specifically for Sri Lanka's outdoor adventure ecosystem. It consists of three decoupled, independent services:

1. **`frontend/`** — **Public Hiker Web App** (*Next.js App Router, Port 3000*)
2. **`admin/`** — **Standalone Admin Portal** (*Next.js App Router, Port 3001*)
3. **`backend/`** — **REST API Server & Database Store** (*Node.js, Express, Prisma ORM, Neon PostgreSQL, Port 5000*)

---

## 🏗️ Architecture & Tech Stack

```
Ceylon-Hiking-Trails/
├── backend/            # Express REST API & Prisma ORM (Port 5000)
├── frontend/           # Public Hiker Web Application (Port 3000)
└── admin/              # Standalone Admin Management Portal (Port 3001)
```

| Component | Stack / Technologies |
| :--- | :--- |
| **Backend REST API** | Node.js, Express, TypeScript, Prisma ORM, Neon PostgreSQL |
| **Frontend Web App** | Next.js 16 (App Router), TypeScript, Tailwind CSS, Lucide Icons, Framer Motion, Leaflet GIS |
| **Admin Portal** | Next.js 14 (App Router), TypeScript, Tailwind CSS, Lucide Icons |
| **Database** | Neon Cloud Serverless PostgreSQL (`postgresql://...`) |

---

## ✨ Features

### 🏕️ Public Hiker Application (`/frontend`)
- **Interactive Leaflet GIS Map**: Custom map rendering Sri Lanka's key hiking regions (Knuckles, Ella, Horton Plains, Adams Peak, Sinharaja).
- **Smart Trail Finder Quiz**: Interactive quiz recommending trails based on fitness level, duration, scenery preference, and group size.
- **Detailed Trail Pages**: Interactive elevation profiles, GPS track points, weather forecasts, gear recommendations, and Leave-No-Trace safety guidelines.
- **Community Reports**: Live trail condition updates (muddy, rain, leech warnings, path blocked) submitted by real hikers.
- **Verified Local Guides**: Directory of certified Sri Lankan trekking guides with direct contact info and verified badges.
- **Saved Collections**: Local storage and backend sync for bookmarking favorite trails.

### 🛡️ Admin Portal (`/admin`)
- **Analytics Dashboard**: Real-time stats showing total trails, active community reports, pending review queues, and verified guide counts.
- **Trail CRUD Operations**: Full modal interface to add, edit, and delete trails, sync elevation profiles, adjust difficulty levels, and update tags.
- **Condition Moderation**: Approve or dismiss community-submitted trail condition alerts.
- **Guide Verification**: Manage and verify local hiking guide applications.

### 🔌 REST API (`/backend`)
- `GET /api/health` — System health check.
- `GET /api/trails` — List all trails with filter parameters (`difficulty`, `category`, `location`, `search`).
- `GET /api/trails/:id` — Detailed single trail endpoint.
- `POST /api/trails` — Create a new trail (Admin).
- `PUT /api/trails/:id` — Update existing trail (Admin).
- `DELETE /api/trails/:id` — Delete a trail (Admin).
- `GET /api/conditions` — Fetch active community trail condition reports.
- `POST /api/conditions` — Submit a new condition report.
- `PUT /api/conditions/:id/approve` — Approve condition report (Admin).
- `GET /api/guides` — Fetch verified local guides.
- `POST /api/guides` — Register a new guide.
- `PUT /api/guides/:id/verify` — Toggle guide verification status (Admin).
- `GET /api/admin/stats` — Overall platform analytics summary.

---

## ⚡ Quick Start & Installation

### Prerequisites
- **Node.js**: v18.x or higher
- **npm**: v9.x or higher

---

### 1. Backend REST API Setup
```bash
cd backend
npm install

# Create environment file from example
cp .env.example .env

# Generate Prisma Client & Push Schema to Neon PostgreSQL
npx prisma db push

# Start Dev Server (Port 5000)
npm run dev
```

### 2. Frontend Hiker Web App Setup
```bash
cd frontend
npm install

# Create environment file from example
cp .env.example .env.local

# Start Dev Server (Port 3000)
npm run dev
```

### 3. Admin Portal Setup
```bash
cd admin
npm install

# Create environment file from example
cp .env.example .env.local

# Start Dev Server (Port 3001)
npm run dev
```

---

## ⚙️ Environment Variables

### `backend/.env`
```env
PORT=5000
NODE_ENV=development
DATABASE_URL="postgresql://neondb_owner:npg_byNw0x5CauGP@ep-hidden-silence-azqsp980-pooler.c-3.ap-southeast-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require"
```

### `frontend/.env.local`
```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

### `admin/.env.local`
```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

---

## 🛠️ Production Build Commands

To build all 3 services for production:

```bash
# Build Backend
cd backend && npm run build

# Build Frontend
cd ../frontend && npm run build

# Build Admin Portal
cd ../admin && npm run build
```

---

## 📄 License
This project is open-source under the MIT License. Made for Sri Lanka outdoor adventure. 🇱🇰 ⛰️
