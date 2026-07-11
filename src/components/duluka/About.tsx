'use client';

import { motion } from "framer-motion";
import { Code2, Boxes, Languages, User, Sparkles, Quote, Github, MessageCircle } from "lucide-react";
import { GITHUB_PROFILE, DISCORD_INVITE } from "@/data/projects";

const FACTS = [
  { icon: User, label: "Owner", value: "ScotcsDuluka" },
  { icon: Code2, label: "Languages", value: "VB.NET · C# · HTML · CSS · JS · TS" },
  { icon: Boxes, label: "Focus", value: "Screen capture · Magisk · Minecraft · TTML" },
  { icon: Languages, label: "Community", value: "ไทย / English" },
];

export default function About() {
  return (
    <section id="about" className="relative overflow-hidden bg-[#faf6f0] py-20 lg:py-28">
      {/* Soft backdrop */}
      <div className="pointer-events-none absolute right-0 top-0 h-72 w-72 rounded-full bg-purple-200/30 blur-[60px]" />

      <div className="relative mx-auto max-w-5xl px-6 lg:px-12">
        {/* Section header — editorial style */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-12"
        >
          <div className="lg:col-span-3">
            <div className="sticky top-24">
              <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-pink-500/70">
                §01
              </div>
              <div className="font-hand text-2xl text-pink-500 mt-1">เกี่ยวกับ</div>
            </div>
          </div>
          <div className="lg:col-span-9">
            <h2 className="font-serif-display text-4xl sm:text-5xl lg:text-6xl font-black leading-[1.05] text-[#4a3b47]">
              <span className="duluka-text-gradient">About</span>
              <br />
              Duluka Studio
            </h2>
          </div>
        </motion.div>

        {/* Body — magazine 2-column with drop cap */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-1 lg:grid-cols-12 gap-8"
        >
          <div className="lg:col-span-3 hidden lg:block" />
          <div className="lg:col-span-9">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <p className="drop-cap text-base leading-relaxed text-[#6b5d68] md:text-lg">
                ผมทำโปรเจกต์หลายอย่าง — screen capture, Magisk mods สำหรับ HyperOS,
                Minecraft server, TTML lyrics และอื่นๆ. ทุกอย่างเปิดซอร์สหมด อยู่บน GitHub.
              </p>
              <p className="text-base leading-relaxed text-[#6b5d68] md:text-lg">
                บางอันใช้งานจริง บางอันทดลอง บางอันก็เล็กๆ น้อยๆ.
                มีคำถามหรืออยากคุย แวะ Discord ได้เลย.
              </p>
            </div>

            {/* Pull quote */}
            <motion.blockquote
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="mt-10 rounded-3xl border border-pink-200/60 bg-gradient-to-br from-pink-50/80 to-purple-50/60 p-6 sm:p-8"
            >
              <Quote className="h-6 w-6 text-pink-400 mb-3" />
              <p className="pull-quote text-xl sm:text-2xl text-[#4a3b47] sm:text-left">
                บางทีก็อัดได้ บางทีก็ไม่… แล้วแต่ดวง 555555665
              </p>
              <footer className="mt-3 flex items-center gap-2 text-xs uppercase tracking-[0.16em] text-pink-500/70">
                <span className="h-px w-8 bg-pink-300" />
                ScotcsDuluka, NVIDIA ShadowPlay README
              </footer>
            </motion.blockquote>
          </div>
        </motion.div>

        {/* Facts grid */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
        >
          {FACTS.map((f, i) => (
            <motion.div
              key={f.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              whileHover={{ y: -4, rotate: -1 }}
              className="group relative overflow-hidden rounded-2xl border border-pink-200/60 bg-white/70 p-5 backdrop-blur-sm transition-shadow hover:duluka-shadow-card"
            >
              <div className="mb-3 flex items-center justify-between">
                <f.icon className="h-5 w-5 text-pink-500" />
                <span className="editorial-number text-sm">{String(i + 1).padStart(2, "0")}</span>
              </div>
              <div className="text-[10px] uppercase tracking-[0.18em] text-[#6b5d68]/50">
                {f.label}
              </div>
              <div className="mt-1 font-serif-display text-base font-bold text-[#4a3b47]">
                {f.value}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Quick links */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="mt-10 flex flex-wrap items-center justify-center gap-3"
        >
          <a
            href={GITHUB_PROFILE}
            target="_blank"
            rel="noreferrer"
            className="group inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-pink-400 to-fuchsia-400 px-5 py-2.5 text-sm font-bold text-white shadow-md transition-transform hover:scale-105"
          >
            <Github className="h-4 w-4" />
            GitHub
          </a>
          <a
            href={DISCORD_INVITE}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-full border-2 border-purple-300 bg-white/70 px-5 py-2.5 text-sm font-bold text-[#4a3b47] transition-all hover:border-purple-400 hover:bg-white"
          >
            <MessageCircle className="h-4 w-4" />
            Discord
          </a>
        </motion.div>
      </div>
    </section>
  );
}
