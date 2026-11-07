# PERAPAT.W — Interactive Luxury Cyberpunk Bento-Grid Portfolio

> **Full-Stack Portfolio Website for Perapat Wanna (นาย พีรพัตน์ วันนา)**  
> 2nd Year Information and Communication Technology (ICT) Undergraduate @ Sripatum University (SPU, Bangkok) — Academic Year 2026  
> Student ID: `68026233` | GPAX: `3.67` (High Academic Standing / เกียรตินิยม)

---

## 🌟 Visual Theme & Design (Red, White & Gold)

- **Color Palette**:
  - **Deep Crimson Red** (`#DC2626` / `#EF4444`): High-energy cyberpunk focus, accent badges, borders, and ambient light.
  - **Sharp White** (`#FFFFFF`): High-contrast clean typography and modern frosted borders.
  - **Luxury Gold Accents** (`#D4AF37` / `#F59E0B`): Golden GPAX badge (`3.67`), awards, crown icons, and metallic highlights.
- **Background**: Dark charcoal/black grid-pattern matrix (`#050508`) with crimson and luxury gold ambient float glow orbs.
- **Bento Grid Architecture**: 60FPS hardware-accelerated conic laser neon rotating borders, smooth hover elevation, and responsive glassmorphism.
- **Bilingual Switcher**: Instant Thai (`TH`) and English (`EN`) localization across all components, badges, and modals.

---

## 🚀 Key Features & Sections

1. **Header & Navigation Bar**:
   - Brand Avatar thumbnail & Initials badge (`PW`)
   - Name: `PERAPAT.W`, Subtitle: `ICT Undergraduate @ SPU`
   - Active status tag: `ACTIVE` with pulsing neon indicator
   - Navigation links with smooth scroll: ภาพรวม (Overview), การศึกษา (Education), ประสบการณ์ (Experience), ผลงานสร้างสรรค์ (Projects), ใบรับรอง (Certifications)
   - Top Control Bar: **"แก้ไขล็อกอิน"** (Admin Mode Modal) and **"TH / EN"** language switcher

2. **Profile / Hero Bento Card**:
   - Name: นาย พีรพัตน์ วันนา (Perapat Wanna)
   - Badge: *Next-Gen Full-Stack & ICT Innovator*
   - Student Info: รหัสนักศึกษา 68026233 • สาขาสารสนเทศ ICT ชั้นปีที่ 2 (ปีการศึกษา 2026) • ม.ศรีปทุม (SPU)
   - Bio: Full-Stack & Cloud Architecture focus for 2026 internships
   - Floating Golden GPAX Badge: `GPAX 3.67`
   - Stat Cards (Right Bento Grid):
     1. Student ID: `68026233`
     2. GPAX: `3.67` (เกียรตินิยม / High Academic Standing)
     3. Institution: `SPU ศรีปทุม` (SPU Bangkok 2026)
     4. Availability: `พร้อมรับงานทันที` (Available Status 2026)

3. **Academic Profile Section**:
   - Current Status: `กำลังศึกษาชั้นปีที่ 2 • ปีการศึกษาปัจจุบัน 2026`
   - Major: สาขาสารสนเทศ (ICT - Information and Communication Technology)
   - Faculty: คณะเทคโนโลยีสารสนเทศ มหาวิทยาลัยศรีปทุม (SPU กรุงเทพฯ)
   - GPA Highlight Card: `3.67` (Gold Accent Text & Crown/Star Medal)
   - Core Competency tags: Web Architecture, Cloud Computing, Database Engineering, Cybersecurity, RESTful APIs

4. **Contact & Dynamic CRUD Sections**:
   - **Social Contact Channels**: Instagram, Facebook, Line, Direct Call, and Email. Admin modal to update all URLs and labels in real-time.
   - **Quick Notes (CRUD)**: Add, view, and delete quick target notes with live count.
   - **Practical Experience (CRUD)**: "+ เพิ่มประสบการณ์ใหม่" modal to manage roles, companies, duration, bullet achievements, and tech stack pills. Displays empty state when empty.
   - **Featured Projects (CRUD)**: Filter tabs by category (*ทั้งหมด*, *Full-Stack*, *Frontend*, *Backend*) with live dynamic counts. "+ เพิ่มผลงานใหม่" modal with image upload, demo link, and GitHub code link.
   - **Certifications (CRUD)**: "+ เพิ่มใบรับรองใหม่" modal to record certificates, issue date, issuer, credential ID, and preview PDF documents.

5. **Security & Admin Mode ("แก้ไขล็อกอิน")**:
   - Click "แก้ไขล็อกอิน" in the top bar
   - Default PIN: `spu2026`
   - Enables administrative CRUD privileges across all sections with instant UI feedback and toast alerts.

---

## 🛠️ Tech Stack & Architecture

- **Frontend**: Next.js 14 (App Router), React 18, Tailwind CSS, Lucide Icons, Framer Motion.
- **Backend**: Next.js Route Handlers (REST API).
- **ORM & Database**: Prisma ORM with SQLite (local zero-config) and PostgreSQL (production ready).
- **Containerization**: Dockerfile & docker-compose.yml included.
- **Standalone Ready**: Standalone zero-dependency `index.html` also provided for instant double-click viewing in any browser!

---

## 💻 Getting Started Locally

### 1. Run with Node.js
```bash
# Install dependencies
npm install

# Initialize Prisma Database & Seed default data
npx prisma db push
node prisma/seed.js

# Start local development server
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### 2. Run with Docker Compose
```bash
# Build and run Next.js app + PostgreSQL database
docker-compose up --build
```

### 3. Open Standalone HTML
Simply double-click `index.html` in Windows Explorer or open it in Google Chrome / Microsoft Edge.

---

## 🔐 Admin Access

- **PIN**: `spu2026`
- **Unlockable Actions**: Add/Edit/Delete Projects, Experiences, Certifications, Notes, and Social Links.
