# Duluka Studio

เว็บไซต์รวมโปรเจกต์ของ **ScotcsDuluka** ตั้งแต่เครื่องมือบน Windows, ม็อด HyperOS, งานทดลองบนเว็บ, Minecraft ไปจนถึงไฟล์เนื้อเพลง TTML

ไม่ได้หมายความว่าทุกโปรเจกต์จะเสร็จสมบูรณ์หรือพร้อมใช้งานทั้งหมด บางงานยังอยู่ระหว่างพัฒนา และบาง repo ยังไม่มี README ให้ดูรายละเอียด ควรเปิดหน้า GitHub ของงานนั้นก่อนนำไปใช้

- เว็บไซต์: https://scotcsduluka.github.io/Project/
- GitHub: https://github.com/ScotcsDuluka
- Discord: https://discord.gg/t9yfWVFFaS

## เทคโนโลยี

- Next.js 16 และ React 19
- TypeScript
- Tailwind CSS 4
- Framer Motion
- Lucide React สำหรับไอคอน
- Prisma และ SQLite มี schema อยู่ใน `prisma/`

## รันในเครื่อง Windows

ต้องมี **Node.js 20.9 ขึ้นไป** และ npm

เปิด PowerShell แล้วรัน:

```powershell
Set-Location 'A:\Project'
npm ci
npm run dev
```

จากนั้นเปิด http://localhost:3000

หยุดเซิร์ฟเวอร์ด้วย `Ctrl+C` ในหน้าต่าง PowerShell ที่รันอยู่ ไม่ต้องลบ `.next` หรือโฟลเดอร์อื่นเพื่อปิดเว็บ

## คำสั่งที่ใช้บ่อย

| คำสั่ง | ใช้ทำอะไร |
| --- | --- |
| `npm run dev` | เปิดเว็บสำหรับพัฒนา |
| `npm run lint` | ตรวจโค้ดด้วย ESLint |
| `npm run build` | สร้าง Production build แบบ standalone |
| `npm run start` | รัน build ที่สร้างไว้แล้ว |
| `npm run build:static` | สร้างเว็บ static สำหรับ GitHub Pages ไปที่ `out/` |

คำสั่ง `npm run start` ใช้หลัง `npm run build` เท่านั้น ส่วน `npm run build:static` จะตั้งค่า `/Project` เป็น base path ให้โดยอัตโนมัติ ถ้าจะ build สำหรับโฮสต์อื่นให้กำหนด `NEXT_PUBLIC_BASE_PATH` ก่อนรัน

## แก้เนื้อหาเว็บตรงไหน

| อยากเปลี่ยน | ไฟล์ |
| --- | --- |
| ข้อมูลโปรเจกต์ คำอธิบาย ไลเซนส์ และกฎเซิร์ฟเวอร์ | `src/data/projects.manual.ts` |
| การรวมข้อมูลที่เขียนเองกับข้อมูลจาก GitHub | `src/data/projects.ts` |
| ข้อมูล GitHub ที่ระบบดึงอัตโนมัติ | `src/data/projects.auto.json` |
| หน้าแรกและการเรียงแต่ละ section | `src/app/page.tsx` |
| ข้อความและหน้าตาของแต่ละส่วน | `src/components/duluka/` |
| สี ฟอนต์ และเอฟเฟกต์ | `src/app/globals.css` |
| ฟอนต์และ metadata ของหน้าเว็บ | `src/app/layout.tsx` |
| รูปและไฟล์สาธารณะ | `public/` |

ข้อมูลใน `projects.manual.ts` เป็นข้อมูลที่ดูแลเอง ส่วน `projects.auto.json` สร้างโดยสคริปต์จาก GitHub API และอาจถูกเขียนทับในรอบถัดไป จึงไม่ควรแก้ไฟล์ JSON นั้นเพื่อใส่คำอธิบายถาวร

**เรื่องไลเซนส์:** อย่าสรุปว่าทุก repo ใช้ MIT เหมือนกัน ตรวจไฟล์ LICENSE ของ repo นั้นโดยตรงก่อนนำโค้ดไปใช้หรือแจกจ่ายต่อ

## โครงสร้างหลัก

```text
A:\Project
├── .github/workflows/
│   ├── deploy.yml              # Build และ Deploy ไป GitHub Pages
│   └── fetch-projects.yml      # อัปเดตข้อมูลโปรเจกต์จาก GitHub
├── examples/                  # ตัวอย่างแยกจากเว็บหลัก
├── prisma/
│   └── schema.prisma           # Prisma schema
├── public/                     # ไฟล์ที่ให้หน้าเว็บเรียกใช้
├── scripts/
│   ├── build-static.mjs        # ตั้งค่าสำหรับ static export
│   ├── copy-standalone-assets.mjs
│   └── fetch-projects.ts       # ดึง metadata ของ GitHub repos
├── src/
│   ├── app/                    # Next.js app, layout และ CSS
│   ├── components/duluka/      # section ของ Duluka Studio
│   └── data/                   # ข้อมูลโปรเจกต์และกฎเซิร์ฟเวอร์
├── next.config.ts
├── package.json
└── README.md
```

โค้ดใน `examples/` เป็นตัวอย่างแยก ไม่ได้ถูกรวมเป็นหน้าเว็บ และไม่อยู่ใน TypeScript check ของแอปหลัก

## GitHub Pages

Workflow ใน `.github/workflows/deploy.yml` ตั้งให้ทำงานเมื่อมี push ไปที่ branch `main` หรือสั่งรันด้วยมือจาก GitHub Actions โดยจะ build static site แล้วส่งโฟลเดอร์ `out/` ไปยัง GitHub Pages

URL ที่กำหนดไว้ในโปรเจกต์นี้คือ:

https://scotcsduluka.github.io/Project/

ถ้าเว็บยังไม่แสดง ให้ตรวจหน้า **Actions** ว่า workflow ล่าสุดสำเร็จหรือไม่ และตรวจ **Settings → Pages** ของ repository ว่า Source ใช้ GitHub Actions อยู่หรือยัง การมี workflow ในโค้ดอย่างเดียวไม่ได้ยืนยันว่า deploy สำเร็จแล้ว

Workflow `.github/workflows/fetch-projects.yml` ดึง metadata จาก GitHub ตามตารางเวลา และเมื่อมีการแก้ไฟล์ต้นทางที่กำหนดไว้ หลังอัปเดต `projects.auto.json` ระบบจะ commit ข้อมูลที่เปลี่ยนกลับเข้า branch `main`

## ก่อนแก้โปรเจกต์

- แก้คำอธิบายและข้อมูลที่ต้องดูแลต่อเนื่องใน `src/data/projects.manual.ts`
- อย่าเขียนทับข้อมูลที่ระบบสร้างอัตโนมัติโดยไม่ตรวจ workflow ที่ดูแลไฟล์นั้น
- ตรวจไฟล์ LICENSE ของแต่ละ repository แยกกัน
- รัน `npm run lint` และ build ที่เกี่ยวข้องก่อนส่งการเปลี่ยนแปลงขึ้น GitHub
- ไฟล์ environment ที่ขึ้นต้นด้วย `.env` ถูก ignore อยู่แล้ว อย่า commit secret หรือ token ขึ้น repository

---

ทำโดย ScotcsDuluka · Thailand
