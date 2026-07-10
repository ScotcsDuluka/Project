'use client';

import { motion, useReducedMotion } from "framer-motion";
import { ChevronDown, Sparkles, ArrowDown, Star } from "lucide-react";
import StarField from "./StarField";

export default function Hero() {
  const reduce = useReducedMotion();

  return (
    <section
      id="top"
      className="relative min-h-[calc(100svh-57px)] lg:min-h-screen flex items-center overflow-hidden bg-gradient-to-br from-[#faf6f0] via-[#fde2e4]/30 to-[#e6e0f8]/30"
    >
      {/* Background */}
      <div className="absolute inset-0 duluka-dots-bg opacity-60" aria-hidden />
      <StarField density={25} />

      {/* Floating soft blobs — reduced to 2 with smaller blur for GPU */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute -top-24 -left-24 h-72 w-72 rounded-full bg-pink-300/25 blur-[60px]"
        animate={reduce ? undefined : { x: [0, 30, 0], y: [0, 20, 0] }}
        transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        aria-hidden
        className="pointer-events-none absolute -bottom-32 -right-32 h-80 w-80 rounded-full bg-purple-300/20 blur-[70px]"
        animate={reduce ? undefined : { x: [0, -25, 0], y: [0, -15, 0] }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="relative z-10 mx-auto w-full max-w-5xl px-6 py-20 lg:px-12 lg:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left: text */}
          <div className="lg:col-span-8">
            {/* Eyebrow */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="mb-6 flex items-center gap-3"
            >
              <span className="sticker">
                <Sparkles className="h-3 w-3 text-pink-500" />
                สตูดิโอส่วนตัว
              </span>
              <span className="font-hand text-lg text-pink-500/70">โปรเจกต์เปิดซอร์ส</span>
            </motion.div>

            {/* Big serif headline */}
            <h1 className="font-serif-display text-6xl sm:text-7xl lg:text-8xl font-black leading-[0.95] tracking-tight text-[#4a3b47]">
              <motion.span
                initial={{ opacity: 0, y: 30, filter: "blur(8px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                className="block"
              >
                Duluka
              </motion.span>
              <motion.span
                initial={{ opacity: 0, y: 30, filter: "blur(8px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
                className="block duluka-shimmer-text italic"
              >
                Studio.
              </motion.span>
            </h1>

            {/* Decorative line */}
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.8, delay: 0.7 }}
              className="mt-6 h-0.5 w-32 origin-left bg-gradient-to-r from-pink-400 to-transparent"
            />

            {/* Subhead */}
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.9, ease: "easeOut" }}
              className="mt-6 max-w-xl text-lg leading-relaxed text-[#6b5d68] sm:text-xl"
            >
              โปรเจกต์เปิดซอร์สหลากหลาย —{" "}
              <span className="font-serif-display italic text-[#4a3b47]">
                screen capture, Magisk mods, เว็บทดลอง, Minecraft server และ TTML lyrics
              </span>
              . ทั้งหมดอยู่บน GitHub ของ ScotcsDuluka.
            </motion.p>

            {/* Quick stats inline */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 1.1, ease: "easeOut" }}
              className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm"
            >
              {[
                { num: "10", label: "GitHub repos", emoji: "📂" },
                { num: "1.21", label: "Minecraft Java", emoji: "🎮" },
                { num: "TH/EN", label: "Bilingual", emoji: "🌍" },
              ].map((s, i) => (
                <div key={s.label} className="flex items-center gap-2">
                  {i > 0 && <span className="text-pink-300">•</span>}
                  <span className="text-lg">{s.emoji}</span>
                  <span className="font-serif-display text-xl font-bold text-[#4a3b47]">
                    {s.num}
                  </span>
                  <span className="text-[#6b5d68]/70">{s.label}</span>
                </div>
              ))}
            </motion.div>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 1.3, ease: "easeOut" }}
              className="mt-10 flex flex-wrap items-center gap-3"
            >
              <a
                href="#projects"
                className="duluka-shine group relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-gradient-to-r from-pink-400 via-fuchsia-400 to-purple-400 px-6 py-3 text-sm font-bold text-white shadow-lg transition-transform hover:scale-105"
              >
                <span className="text-base">🚀</span>
                ดูโปรเจกต์ทั้งหมด
              </a>
              <a
                href="#server"
                className="group inline-flex items-center gap-2 rounded-full border-2 border-pink-300 bg-white/70 px-6 py-3 text-sm font-bold text-[#4a3b47] backdrop-blur-sm transition-all hover:border-pink-400 hover:bg-white"
              >
                <span className="text-base">🎮</span>
                Minecraft Server
              </a>
            </motion.div>
          </div>

          {/* Right: decorative card */}
          <div className="hidden lg:block lg:col-span-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, rotate: -3 }}
              animate={{ opacity: 1, scale: 1, rotate: -3 }}
              transition={{ duration: 0.8, delay: 1.0 }}
              className="relative"
            >
              {/* Stacked decorative cards */}
              <div className="absolute inset-0 translate-x-3 translate-y-3 rotate-6 rounded-3xl bg-purple-200/50" />
              <div className="absolute inset-0 translate-x-1.5 translate-y-1.5 rotate-3 rounded-3xl bg-pink-200/60" />
              <div className="relative rounded-3xl border-2 border-pink-200 bg-white/80 p-6 backdrop-blur-sm duluka-shadow-card">
                {/* Card header */}
                <div className="mb-4 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="h-3 w-3 rounded-full bg-pink-300" />
                    <span className="h-3 w-3 rounded-full bg-purple-300" />
                    <span className="h-3 w-3 rounded-full bg-amber-300" />
                  </div>
                  <span className="font-hand text-sm text-pink-500/70">~/duluka</span>
                </div>
                {/* Card body */}
                <div className="font-mono text-xs leading-relaxed text-[#6b5d68]">
                  <div><span className="text-pink-500">$</span> whoami</div>
                  <div className="text-[#4a3b47]">ScotcsDuluka</div>
                  <div className="mt-2"><span className="text-pink-500">$</span> ls projects/</div>
                  <div>NVIDIA-Shadowplay/</div>
                  <div>Always-On-Display-Mods/</div>
                  <div>Lyrics-TTML/</div>
                  <div>MCDMods-Project-Plus/</div>
                  <div className="text-pink-500/70">...6 more</div>
                  <div className="mt-2 flex items-center gap-1">
                    <span className="text-pink-500">$</span>
                    <span className="inline-block h-3.5 w-1.5 animate-pulse bg-pink-400" />
                  </div>
                </div>
                {/* Card footer */}
                <div className="mt-4 pt-3 border-t border-pink-100 flex items-center gap-2">
                  <Star className="h-3 w-3 fill-amber-300 text-amber-300" />
                  <span className="text-[10px] uppercase tracking-wider text-[#6b5d68]/60">
                    Open Source · MIT
                  </span>
                </div>
              </div>

              {/* Floating sticker */}
              <motion.div
                animate={reduce ? undefined : { y: [0, -10, 0], rotate: [-8, -3, -8] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -right-6 -top-6 rounded-full bg-amber-300 px-3 py-1.5 text-xs font-black text-white shadow-lg"
              >
                ✨ NEW
              </motion.div>
            </motion.div>
          </div>
        </div>

        {/* Scroll hint */}
        <motion.a
          href="#about"
          aria-label="Scroll to About"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.8, duration: 0.8 }}
          className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 lg:block"
        >
          <motion.div
            animate={reduce ? undefined : { y: [0, 8, 0] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
            className="flex flex-col items-center gap-1 text-pink-500/60 hover:text-pink-500"
          >
            <span className="font-hand text-sm">เลื่อนลง</span>
            <ArrowDown className="h-4 w-4" />
          </motion.div>
        </motion.a>
      </div>
    </section>
  );
}
