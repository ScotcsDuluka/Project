'use client';

import { motion, useReducedMotion } from "framer-motion";
import { ArrowDown } from "lucide-react";
import { PROJECTS } from "@/data/projects";

const SPECS = [
  { k: "REPOS", v: String(PROJECTS.length), note: "all open source" },
  { k: "LICENSE", v: "MIT", note: "every repo" },
  { k: "MINECRAFT", v: "1.21", note: "java + bedrock" },
  { k: "LANG", v: "TH/EN", note: "bilingual" },
];

function RotatingBadge() {
  return (
    <div className="relative h-28 w-28 lg:h-36 lg:w-36" aria-hidden>
      <svg viewBox="0 0 100 100" className="wx-spin-slow h-full w-full">
        <defs>
          <path id="wx-circle" d="M 50,50 m -38,0 a 38,38 0 1,1 76,0 a 38,38 0 1,1 -76,0" />
        </defs>
        <text className="fill-wx-ink font-mono text-[8.5px] font-bold uppercase tracking-[0.18em]">
          <textPath href="#wx-circle">
            duluka studio ★ open source ★ est. forever ★
          </textPath>
        </text>
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="flex h-11 w-11 rotate-6 items-center justify-center border-2 border-wx-ink bg-wx-orange font-display text-lg text-wx-paper lg:h-14 lg:w-14">
          D!
        </span>
      </div>
    </div>
  );
}

export default function Hero() {
  const reduce = useReducedMotion();

  return (
    <section
      id="top"
      className="relative flex min-h-[calc(100svh-102px)] flex-col justify-between overflow-hidden border-b-2 border-wx-ink pt-10 lg:pt-14"
    >
      {/* blueprint grid backdrop */}
      <div className="wx-grid-lines pointer-events-none absolute inset-0" aria-hidden />
      {/* giant background word */}
      <div
        aria-hidden
        className="pointer-events-none absolute -right-6 top-6 select-none font-display text-[26vw] font-black uppercase leading-none text-wx-ink/[0.05] lg:text-[18vw]"
      >
        STUDIO
      </div>

      <div className="relative z-10 mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-10">
        {/* eyebrow */}
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="mb-6 flex flex-wrap items-center gap-3"
        >
          <span className="inline-flex rotate-[-2deg] items-center gap-2 border-2 border-wx-ink bg-wx-acid px-3 py-1.5 font-mono text-[10px] font-bold uppercase tracking-[0.2em]">
            ● สตูดิโอส่วนตัว — ยินดีต้อนรับ
          </span>
          <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-wx-ink/50">
            by ScotcsDuluka
          </span>
        </motion.div>

        {/* giant headline */}
        <h1 className="font-display font-black uppercase leading-[0.84]">
          <motion.span
            initial={reduce ? { opacity: 0 } : { opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="block text-[19vw] sm:text-[15vw] lg:text-[10.5rem]"
          >
            Duluka
          </motion.span>
          <motion.span
            initial={reduce ? { opacity: 0 } : { opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="block text-[19vw] sm:text-[15vw] lg:text-[10.5rem]"
          >
            <span className="wx-stroke">Studio</span>
            <span className="text-wx-orange">™</span>
          </motion.span>
        </h1>

        {/* subtitle */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.45 }}
          className="mt-8 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between"
        >
          <p className="max-w-xl text-lg leading-relaxed sm:text-xl">
            <span className="wx-marker font-bold">โปรเจกต์เปิดซอร์สหลากหลาย</span> —
            screen capture, Magisk mods, เว็บทดลอง, Minecraft server และ TTML lyrics
            ทั้งหมดอยู่บน <em className="font-serif-display italic">GitHub</em> ของ ScotcsDuluka.
          </p>
          <div className="hidden lg:block">
            <RotatingBadge />
          </div>
        </motion.div>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-8 flex flex-wrap items-center gap-3"
        >
          <a
            href="#projects"
            data-cursor="GO"
            className="wx-btn inline-flex items-center gap-2 bg-wx-acid px-6 py-3.5 font-mono text-xs font-bold uppercase tracking-[0.18em]"
          >
            ดูโปรเจกต์ทั้งหมด ↓
          </a>
          <a
            href="#server"
            data-cursor="MC"
            className="wx-btn inline-flex items-center gap-2 bg-wx-ink px-6 py-3.5 font-mono text-xs font-bold uppercase tracking-[0.18em] text-wx-paper"
          >
            Minecraft Server ▸
          </a>
        </motion.div>

        {/* spec strip */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-10 grid grid-cols-2 border-2 border-wx-ink bg-wx-paper sm:grid-cols-4"
        >
          {SPECS.map((s, i) => (
            <div
              key={s.k}
              className={`px-4 py-4 ${i < SPECS.length - 1 ? "sm:border-r-2" : ""} ${
                i % 2 === 0 ? "border-r-2 sm:border-r-2" : ""
              } ${i < 2 ? "border-b-2 sm:border-b-0" : ""}`}
            >
              <div className="font-mono text-[9px] uppercase tracking-[0.25em] text-wx-ink/50">
                {s.k}
              </div>
              <div className="font-display text-2xl lg:text-3xl">{s.v}</div>
              <div className="font-mono text-[9px] uppercase tracking-[0.12em] text-wx-ink/40">
                {s.note}
              </div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* bottom "break the limits" marquee */}
      <div className="relative z-10 mt-10 overflow-hidden border-t-2 border-wx-ink bg-wx-ink py-4">
        <div className="wx-marquee-track wx-marquee-slow">
          {[0, 1].map((n) => (
            <span key={n} className="flex items-center">
              {Array.from({ length: 4 }).map((_, i) => (
                <span
                  key={i}
                  className={`flex items-center whitespace-nowrap pr-10 font-display text-xl uppercase tracking-wide sm:text-2xl ${
                    i % 2 === 0 ? "text-wx-paper" : "wx-stroke-paper"
                  }`}
                >
                  Break the limits!{" "}
                  <span className="pl-6 text-wx-acid" aria-hidden>
                    ★
                  </span>
                </span>
              ))}
            </span>
          ))}
        </div>
      </div>

      {/* scroll hint */}
      <motion.a
        href="#about"
        aria-label="Scroll to About"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 0.6 }}
        className="absolute bottom-20 left-1/2 hidden -translate-x-1/2 lg:block"
      >
        <motion.div
          animate={reduce ? undefined : { y: [0, 6, 0] }}
          transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
          className="flex flex-col items-center gap-1 font-mono text-[10px] uppercase tracking-[0.3em] text-wx-ink/50"
        >
          <ArrowDown className="h-4 w-4" />
        </motion.div>
      </motion.a>
    </section>
  );
}
