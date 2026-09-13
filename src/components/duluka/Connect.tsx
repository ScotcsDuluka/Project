'use client';

import { motion } from "framer-motion";
import { MessageCircle, Github, Gamepad2, ArrowUpRight } from "lucide-react";
import { DISCORD_INVITE, GITHUB_PROFILE, SERVER } from "@/data/projects";

const LINKS = [
  {
    label: "DISCORD",
    th: "คุยกันสนุกๆ",
    href: DISCORD_INVITE,
    icon: MessageCircle,
    cursor: "JOIN",
    external: true,
  },
  {
    label: "GITHUB",
    th: "ดูซอร์สโค้ดทุกตัว",
    href: GITHUB_PROFILE,
    icon: Github,
    cursor: "GIT",
    external: true,
  },
  {
    label: "MINECRAFT",
    th: `${SERVER.fullAddress}`,
    href: "#server",
    icon: Gamepad2,
    cursor: "MC",
    external: false,
  },
];

export default function Connect() {
  return (
    <section id="connect" className="relative overflow-hidden py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-10">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.5 }}
          className="mb-10 flex items-center gap-4"
        >
          <span className="border-2 border-wx-ink bg-wx-ink px-3 py-1.5 font-mono text-[11px] font-bold tracking-[0.2em] text-wx-acid">
            §06
          </span>
          <span className="font-mono text-[11px] font-bold uppercase tracking-[0.3em]">
            CONNECT
          </span>
          <span className="h-0.5 flex-1 bg-wx-ink" />
          <span className="font-hand text-2xl">ติดต่อ</span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.5 }}
          className="mb-10 max-w-4xl text-3xl font-black leading-[1.1] sm:text-4xl lg:text-6xl"
        >
          อยากคุย อยากเล่น อยากทำอะไรแปลกๆ{" "}
          <span className="wx-marker">ด้วยกัน?</span>
        </motion.h2>

        {/* Giant link rows */}
        <div className="border-2 border-wx-ink">
          {LINKS.map((l, i) => (
            <motion.a
              key={l.label}
              href={l.href}
              target={l.external ? "_blank" : undefined}
              rel={l.external ? "noreferrer" : undefined}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.4, delay: i * 0.06 }}
              data-cursor={l.cursor}
              className={`group flex items-center gap-4 px-4 py-6 transition-colors duration-150 hover:bg-wx-ink hover:text-wx-acid sm:gap-8 sm:px-8 sm:py-8 ${
                i > 0 ? "border-t-2 border-wx-ink" : ""
              }`}
            >
              <span className="font-mono text-xs font-bold text-wx-ink/40 transition-colors group-hover:text-wx-acid/60">
                0{i + 1}
              </span>
              <span className="flex h-12 w-12 shrink-0 items-center justify-center border-2 border-current sm:h-16 sm:w-16">
                <l.icon className="h-5 w-5 sm:h-7 sm:w-7" />
              </span>
              <span className="min-w-0 flex-1">
                <span className="block font-display text-3xl uppercase leading-none sm:text-5xl lg:text-6xl">
                  {l.label}
                </span>
                <span className="mt-1 block truncate font-mono text-[10px] tracking-[0.12em] text-wx-ink/50 transition-colors group-hover:text-wx-acid/60 sm:text-xs">
                  {l.th}
                </span>
              </span>
              <span className="flex h-11 w-11 shrink-0 items-center justify-center border-2 border-current transition-transform duration-200 group-hover:rotate-45 sm:h-14 sm:w-14">
                <ArrowUpRight className="h-5 w-5 sm:h-7 sm:w-7" />
              </span>
            </motion.a>
          ))}
        </div>

        <p className="mt-6 text-center font-hand text-xl text-wx-ink/50">
          ตอบช้าเพราะกำลังอัดหน้าจออยู่ (หรือกำลังเล่น Minecraft)
        </p>
      </div>
    </section>
  );
}
