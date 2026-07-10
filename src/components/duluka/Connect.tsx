'use client';

import { motion } from "framer-motion";
import {
  MessageCircle,
  Github,
  Server,
  ArrowUpRight,
  Sparkles,
  Gamepad2,
  Boxes,
} from "lucide-react";
import { DISCORD_INVITE, GITHUB_PROFILE, SERVER } from "@/data/projects";

export default function Connect() {
  return (
    <section id="connect" className="relative overflow-hidden bg-gradient-to-b from-[#fde2e4]/30 to-[#e6e0f8]/40 py-20 lg:py-28">
      {/* Big aurora */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 h-[36rem] w-[36rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-br from-pink-300/30 via-purple-300/20 to-amber-200/20 blur-[80px]"
        animate={{ scale: [1, 1.1, 1], opacity: [0.7, 1, 0.7] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />
      <div className="absolute inset-0 duluka-dots-bg opacity-30" aria-hidden />

      <div className="relative mx-auto max-w-5xl px-6 lg:px-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-10"
        >
          <div className="lg:col-span-3">
            <div className="sticky top-24">
              <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-pink-500/70">
                §05
              </div>
              <div className="font-hand text-2xl text-pink-500 mt-1">ติดต่อ</div>
            </div>
          </div>
          <div className="lg:col-span-9">
            <h2 className="font-serif-display text-4xl sm:text-5xl lg:text-6xl font-black leading-[1.05] text-[#4a3b47]">
              มาอยู่
              <br />
              <span className="duluka-text-gradient italic">ด้วยกัน</span>{" "}
              <span className="duluka-wiggle inline-block">💖</span>
            </h2>
            <p className="mt-5 max-w-2xl text-base text-[#6b5d68] sm:text-lg">
              Discord สำหรับชุมชน · GitHub สำหรับซอร์สโค้ด · Minecraft สำหรับเล่น — เลือกเอาเลย!
            </p>
          </div>
        </motion.div>

        {/* Three CTA cards */}
        <div className="lg:ml-[25%] grid grid-cols-1 gap-5 md:grid-cols-3">
          {/* Discord */}
          <motion.a
            href={DISCORD_INVITE}
            target="_blank"
            rel="noreferrer"
            initial={{ opacity: 0, y: 30, rotate: -2 }}
            whileInView={{ opacity: 1, y: 0, rotate: -2 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6 }}
            whileHover={{ y: -6, rotate: 0 }}
            className="duluka-shine group relative overflow-hidden rounded-3xl border-2 border-pink-300 bg-white/80 p-7 backdrop-blur-sm transition-shadow hover:duluka-shadow-hover"
          >
            <div className="mb-5 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-pink-400 to-fuchsia-400 text-white shadow-md transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3">
              <MessageCircle className="h-7 w-7" />
            </div>
            <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-pink-500/70">
              💬 ชุมชน
            </div>
            <h3 className="mt-1 font-serif-display text-2xl font-black text-[#4a3b47]">Discord</h3>
            <p className="mt-2 text-sm leading-relaxed text-[#6b5d68]">
              กฎเซิร์ฟเวอร์, แชทเสียง, อัปเดตโปรเจกต์ แจ้งแอดมินได้ที่ @ScotcsDuluka
            </p>
            <div className="mt-5 inline-flex items-center gap-1 text-sm font-bold text-pink-600">
              เข้าร่วม
              <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
            </div>
            <div className="pointer-events-none absolute -bottom-8 -right-8 h-32 w-32 rounded-full bg-pink-300/30 blur-3xl" />
          </motion.a>

          {/* GitHub */}
          <motion.a
            href={GITHUB_PROFILE}
            target="_blank"
            rel="noreferrer"
            initial={{ opacity: 0, y: 30, rotate: 0 }}
            whileInView={{ opacity: 1, y: 0, rotate: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, delay: 0.08 }}
            whileHover={{ y: -6, rotate: 0 }}
            className="duluka-shine group relative overflow-hidden rounded-3xl border-2 border-purple-300 bg-white/80 p-7 backdrop-blur-sm transition-shadow hover:duluka-shadow-hover"
          >
            <div className="mb-5 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-purple-400 to-fuchsia-400 text-white shadow-md transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-3">
              <Github className="h-7 w-7" />
            </div>
            <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-purple-500/70">
              📂 ซอร์สโค้ด
            </div>
            <h3 className="mt-1 font-serif-display text-2xl font-black text-[#4a3b47]">GitHub</h3>
            <p className="mt-2 text-sm leading-relaxed text-[#6b5d68]">
              ทุก repository ภายใต้ ScotcsDuluka — เปิดซอร์ส, เปิด pull request
            </p>
            <div className="mt-5 inline-flex items-center gap-1 text-sm font-bold text-purple-600">
              ดูทั้งหมด
              <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
            </div>
          </motion.a>

          {/* Minecraft */}
          <motion.div
            initial={{ opacity: 0, y: 30, rotate: 2 }}
            whileInView={{ opacity: 1, y: 0, rotate: 2 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, delay: 0.16 }}
            whileHover={{ y: -6, rotate: 0 }}
            className="duluka-shine group relative overflow-hidden rounded-3xl border-2 border-amber-300 bg-white/80 p-7 backdrop-blur-sm transition-shadow hover:duluka-shadow-hover"
          >
            <div className="mb-5 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-amber-400 to-pink-400 text-white shadow-md transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3">
              <Server className="h-7 w-7" />
            </div>
            <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-amber-600/70">
              🎮 เซิร์ฟเวอร์
            </div>
            <h3 className="mt-1 font-serif-display text-2xl font-black text-[#4a3b47]">Minecraft</h3>
            <p className="mt-2 text-sm leading-relaxed text-[#6b5d68]">
              Java 1.21.11 + Bedrock Latest — ใช้ IP เดียวกัน
            </p>
            <div className="mt-3 rounded-xl border border-pink-200 bg-pink-50/60 p-2.5">
              <div className="font-mono text-xs text-pink-700">{SERVER.fullAddress}</div>
            </div>
            <a
              href="#server"
              className="mt-4 inline-flex items-center gap-1 text-sm font-bold text-amber-700"
            >
              คัดลอก IP
              <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
            </a>
            <div className="pointer-events-none absolute -bottom-8 -right-8 h-32 w-32 rounded-full bg-amber-300/30 blur-3xl" />
          </motion.div>
        </div>

        {/* Editions strip */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="lg:ml-[25%] mt-8 flex flex-wrap items-center justify-center gap-3 rounded-2xl border border-pink-200/60 bg-white/60 p-4 backdrop-blur-sm"
        >
          <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-[0.18em] text-pink-500/70">
            <Sparkles className="h-3 w-3" />
            Cross-play
          </span>
          <div className="h-4 w-px bg-pink-200" />
          <span className="inline-flex items-center gap-1.5 text-xs font-medium text-[#6b5d68]">
            <Gamepad2 className="h-3.5 w-3.5 text-pink-500" />
            Java 1.21.11
          </span>
          <span className="inline-flex items-center gap-1.5 text-xs font-medium text-[#6b5d68]">
            <Boxes className="h-3.5 w-3.5 text-purple-500" />
            Bedrock Latest
          </span>
        </motion.div>
      </div>
    </section>
  );
}
