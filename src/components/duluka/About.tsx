'use client';

import { motion } from "framer-motion";
import { GITHUB_PROFILE, DISCORD_INVITE } from "@/data/projects";

const FACTS = [
  { num: "01", label: "OWNER", value: "ScotcsDuluka", note: "1 คน ทำทุกอย่างเอง" },
  { num: "02", label: "LANGUAGES", value: "VB.NET · C# · HTML · CSS · JS · TS", note: "ใช้ทำทุกโปรเจกต์" },
  { num: "03", label: "FOCUS", value: "Capture · Magisk · MC · TTML", note: "หลากหลายจนน่ากลัว" },
  { num: "04", label: "COMMUNITY", value: "ไทย / English", note: "bilingual เต็มตัว" },
];

function SectionTag({ num, th, en }: { num: string; th: string; en: string }) {
  return (
    <div className="mb-10 flex items-center gap-4">
      <span className="border-2 border-wx-ink bg-wx-ink px-3 py-1.5 font-mono text-[11px] font-bold tracking-[0.2em] text-wx-acid">
        {num}
      </span>
      <span className="font-mono text-[11px] font-bold uppercase tracking-[0.3em]">{en}</span>
      <span className="h-0.5 flex-1 bg-wx-ink" />
      <span className="font-hand text-2xl">{th}</span>
    </div>
  );
}

export default function About() {
  return (
    <section id="about" className="relative overflow-hidden border-b-2 border-wx-ink py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-10">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.5 }}
        >
          <SectionTag num="§02" en="MANIFESTO" th="เกี่ยวกับ" />
        </motion.div>

        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12">
          {/* Big statement */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-7"
          >
            <h2 className="text-3xl font-black leading-[1.15] sm:text-4xl lg:text-5xl">
              สตูดิโอนี้ทำของที่{" "}
              <span className="wx-marker">อยากทำจริงๆ</span> — บางตัวใหญ่ บางตัวเล็ก
              แต่ทุกชิ้นมีเรื่องเล่าของมัน และ{" "}
              <span className="border-2 border-wx-ink bg-wx-ink px-2 text-wx-acid">
                เปิดซอร์สหมด
              </span>{" "}
              เพราะเชื่อว่าแบ่งปันดีกว่าเก็บ
            </h2>

            <p className="mt-6 max-w-2xl text-base leading-relaxed text-wx-ink/70 sm:text-lg">
              ตั้งแต่อัดหน้าจอ, แก้ Always-On-Display บน HyperOS, เซิร์ฟเวอร์ Minecraft
              ที่เปิดให้เพื่อนๆ มาเล่น, ไปจนถึงไฟล์เนื้อเพลง TTML — ไม่มีแผนธุรกิจ
              ไม่มี roadmap มีแต่ความอยากรู้อยากลองกับเวลาว่าง
            </p>

            {/* Pull quote */}
            <motion.blockquote
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="mt-10 border-2 border-wx-ink bg-wx-paper2 p-6 sm:p-8"
            >
              <div className="flex items-start gap-4">
                <span className="font-display text-6xl leading-none text-wx-orange" aria-hidden>
                  &ldquo;
                </span>
                <div>
                  <p className="font-serif-display text-xl italic leading-snug sm:text-2xl">
                    บางทีก็อัดได้ บางทีก็ไม่… แล้วแต่ดวง 555555665
                  </p>
                  <footer className="mt-3 font-mono text-[10px] uppercase tracking-[0.2em] text-wx-ink/50">
                    — ScotcsDuluka, NVIDIA ShadowPlay README
                  </footer>
                </div>
              </div>
            </motion.blockquote>
          </motion.div>

          {/* Spec cards */}
          <div className="lg:col-span-5">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-1">
              {FACTS.map((f, i) => (
                <motion.div
                  key={f.label}
                  initial={{ opacity: 0, x: 24 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.45, delay: i * 0.07 }}
                  whileHover={i % 2 === 0 ? { rotate: -1 } : { rotate: 1 }}
                  className="group border-2 border-wx-ink bg-wx-paper p-4 transition-shadow hover:wx-shadow-sm"
                  data-cursor="OK"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-[9px] uppercase tracking-[0.25em] text-wx-ink/50">
                      {f.label}
                    </span>
                    <span className="font-display text-sm text-wx-orange">{f.num}</span>
                  </div>
                  <div className="mt-1 font-display text-base uppercase leading-tight sm:text-lg">
                    {f.value}
                  </div>
                  <div className="mt-1 font-hand text-base text-wx-ink/50">{f.note}</div>
                </motion.div>
              ))}
            </div>

            {/* Quick links */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="mt-6 flex flex-wrap gap-3"
            >
              <a
                href={GITHUB_PROFILE}
                target="_blank"
                rel="noreferrer"
                data-cursor="GIT"
                className="wx-btn inline-flex items-center gap-2 bg-wx-ink px-5 py-3 font-mono text-xs font-bold uppercase tracking-[0.15em] text-wx-paper"
              >
                ดู GitHub ↗
              </a>
              <a
                href={DISCORD_INVITE}
                target="_blank"
                rel="noreferrer"
                data-cursor="JOIN"
                className="wx-btn inline-flex items-center gap-2 border-wx-ink bg-wx-acid px-5 py-3 font-mono text-xs font-bold uppercase tracking-[0.15em]"
              >
                แวะ Discord ↗
              </a>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
