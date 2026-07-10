# Duluka Studio — เว็บไซต์

เว็บไซต์ Duluka Studio สร้างด้วย **Next.js 16 + TypeScript + Tailwind CSS 4 + framer-motion**
สไตล์ Editorial Pastel พร้อม sidebar navigation

## 📦 วิธีรันเอง (Local)

### ข้อกำหนดเบื้องต้น
1. **Node.js** 18+ → https://nodejs.org/
2. **Bun** (แนะนำ) → https://bun.sh/ หรือใช้ `npm` / `pnpm` แทนก็ได้

### ขั้นตอน
```bash
# 1. แตกไฟล์ zip แล้ว cd เข้าไป
cd duluka-studio

# 2. ติดตั้ง dependencies
bun install        # หรือ npm install

# 3. รัน dev server
bun run dev        # หรือ npm run dev

# 4. เปิดเบราว์เซอร์ → http://localhost:3000
```

---

## 🚀 Deploy บน GitHub Pages (แบบอัตโนมัติ — แนะนำ)

วิธีนี้จะทำให้เว็บออนไลน์ได้ฟรีที่ `https://scotcsduluka.github.io/duluka-studio`

### ขั้นตอนที่ 1: สร้าง repo บน GitHub
1. ไปที่ https://github.com/new
2. ตั้งชื่อ repo ว่า `duluka-studio` (ถ้าตั้งชื่ออื่น ต้องแก้ `NEXT_PUBLIC_BASE_PATH` ใน `.github/workflows/deploy.yml` ให้ตรงด้วย)
3. เลือก **Public**
4. กด **Create repository**

### ขั้นตอนที่ 2: push โค้ดขึ้น repo
```bash
cd duluka-studio
git init
git add .
git commit -m "feat: Duluka Studio website"
git branch -M main
git remote add origin https://github.com/ScotcsDuluka/duluka-studio.git
git push -u origin main
```

### ขั้นตอนที่ 3: เปิด GitHub Pages
1. ไปที่หน้า repo → แท็บ **Settings** → **Pages**
2. ส่วน **Build and deployment** → Source: เลือก **GitHub Actions**
3. กลับไปที่แท็บ **Actions** → จะเห็น workflow ชื่อ "Deploy to GitHub Pages" กำลังรัน
4. รอ 2-3 นาทีจน status เป็นเครื่องหมาย ✓ สีเขียว
5. เว็บออนไลน์แล้วที่ **https://scotcsduluka.github.io/duluka-studio** 🎉

### ขั้นตอนที่ 4: แก้ไขเนื้อหา
- แก้ไฟล์ในเครื่อง → commit → push → GitHub Actions จะ deploy ใหม่ให้อัตโนมัติ

### ถ้าตั้งชื่อ repo อื่น
แก้บรรทัดนี้ใน `.github/workflows/deploy.yml`:
```yaml
NEXT_PUBLIC_BASE_PATH: /ชื่อ-repo-ใหม่
```

### ถ้าอยากได้เป็นหน้าหลัก (scotcsduluka.github.io)
1. สร้าง repo ชื่อ `scotcsduluka.github.io` (ตรงชื่อ username)
2. ลบ `NEXT_PUBLIC_BASE_PATH` ออกจาก `.github/workflows/deploy.yml` ให้เหลือแค่:
```yaml
env:
  BUILD_STATIC: "true"
```
3. push ขึ้น repo → เว็บจะออนไลน์ที่ **https://scotcsduluka.github.io**

---

## 🔨 Build เป็น static site เอง (ถ้าไม่ใช้ GitHub Actions)

```bash
# Build สำหรับ repo ชื่อ duluka-studio
BUILD_STATIC=true NEXT_PUBLIC_BASE_PATH=/duluka-studio bun run next build

# Build สำหรับ root domain (scotcsduluka.github.io)
BUILD_STATIC=true bun run next build

# ผลลัพธ์จะอยู่ในโฟลเดอร์ out/
# อัปโหลดโฟลเดอร์ out/ ทั้งหมดขึ้น hosting ได้เลย
```

---

## ☁️ Deploy ที่อื่น (Vercel / Netlify / Cloudflare)

### Vercel (แนะนำ — เจ้าของ Next.js)
1. สมัคร https://vercel.com
2. New Project → import repo จาก GitHub
3. Framework Preset: Next.js (auto-detect)
4. กด Deploy — เสร็จ! (ไม่ต้องตั้งค่าอะไร รองรับ Next.js แบบ native)

### Netlify
1. สมัคร https://netlify.com
2. ลากโฟลเดอร์ `out/` (หลัง build ด้วย `BUILD_STATIC=true bun run next build`) ไปวางในหน้า deploy

### Cloudflare Pages
1. สมัคร https://pages.cloudflare.com
2. Connect Git repo
3. Build command: `BUILD_STATIC=true bun run next build`
4. Build output directory: `out`

---

## 🎨 แก้ไขเนื้อหา

| อยากแก้ | แก้ที่ไฟล์ |
|--------|----------|
| ข้อมูลโปรเจกต์ / กฎ / ข้อมูล server | `src/data/projects.ts` |
| สี / ฟอนต์ / เอฟเฟกต์ | `src/app/globals.css` |
| ฟอนต์ที่ใช้ (Playfair / Caveat) | `src/app/layout.tsx` |
| ข้อความในแต่ละ section | `src/components/duluka/*.tsx` |
| ลิงก์ Discord / GitHub | `src/data/projects.ts` (`DISCORD_INVITE`, `GITHUB_PROFILE`) |
| โลโก้ / รูป | `public/` |

---

## 📁 โครงสร้างไฟล์

```
duluka-studio/
├── .github/workflows/
│   └── deploy.yml             ← GitHub Actions deploy อัตโนมัติ
├── public/
│   └── .nojekyll              ← สำคัญ! ทำให้ GitHub Pages ไม่ข้าม _next/
├── src/
│   ├── app/
│   │   ├── layout.tsx         ← ฟอนต์ + metadata
│   │   ├── page.tsx           ← เรียงทุก section
│   │   └── globals.css        ← สี pastel + ฟอนต์ editorial
│   ├── components/duluka/     ← 9 คอมโพเนนต์ของเว็บ
│   │   ├── Sidebar.tsx
│   │   ├── Hero.tsx
│   │   ├── About.tsx
│   │   ├── Projects.tsx
│   │   ├── ServerInfo.tsx
│   │   ├── Rules.tsx
│   │   ├── Connect.tsx
│   │   ├── Footer.tsx
│   │   └── StarField.tsx
│   └── data/projects.ts       ← ข้อมูลทั้งหมด
├── next.config.ts             ← config static export
├── package.json
└── README.md
```

---

## 🛠️ คำสั่งที่ใช้บ่อย

| คำสั่ง | คำอธิบาย |
|--------|----------|
| `bun run dev` | รัน dev server (http://localhost:3000) |
| `bun run lint` | ตรวจสอบคุณภาพโค้ด |
| `bun run build:static` | build เป็น static site (สำหรับ GitHub Pages) |
| `bun run next build` | build เวอร์ชัน production (standalone server) |

---

## ❓ ปัญหาที่อาจเจอ

| ปัญหา | วิธีแก้ |
|------|--------|
| `bun: command not found` | ติดตั้ง Bun จาก https://bun.sh หรือใช้ `npm` แทน |
| `port 3000 already in use` | รัน `bun run dev -- -p 3001` เพื่อใช้พอร์ตอื่น |
| หน้าขาว / error | ลบโฟลเดอร์ `.next` แล้วรัน `bun install && bun run dev` ใหม่ |
| ฟอนต์ไม่โหลด | ต้องเชื่อมต่ออินเทอร์เน็ต (โหลดจาก Google Fonts) |
| GitHub Pages 404 | ตรวจว่าไฟล์ `.nojekyll` อยู่ใน `public/` และเปิด Source เป็น "GitHub Actions" |
| Asset ไม่โหลดบน Pages | ตรวจ `NEXT_PUBLIC_BASE_PATH` ใน `deploy.yml` ตรงกับชื่อ repo ไหม |

---

## 📞 ติดต่อ

- GitHub: https://github.com/ScotcsDuluka
- Discord: https://discord.gg/t9yfWVFFaS

💖 Made by ScotcsDuluka
