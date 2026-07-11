'use client';

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import * as Icons from "lucide-react";
import { ShieldAlert, ScrollText, MessageCircle, Languages } from "lucide-react";
import { RULE_GROUPS, PENALTIES, DISCORD_INVITE } from "@/data/projects";

type Lang = "th" | "en";

function LucideIcon({ name, className }: { name: string; className?: string }) {
  const C = (Icons as Record<string, React.ComponentType<{ className?: string }>>)[name] ?? Icons.Circle;
  return <C className={className} />;
}

export default function Rules() {
  const [lang, setLang] = useState<Lang>("th");

  // Flatten all rules for editorial numbered list
  const allRules = RULE_GROUPS.flatMap((g) =>
    g.rules.map((r) => ({ ...r, groupEmoji: g.emoji, groupTitleTh: g.titleTh, groupTitleEn: g.titleEn }))
  );

  return (
    <section id="rules" className="relative overflow-hidden bg-[#fde2e4]/20 py-20 lg:py-28">
      <div className="pointer-events-none absolute left-0 top-1/3 h-72 w-72 rounded-full bg-purple-200/30 blur-[60px]" />

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
                §03
              </div>
              <div className="font-hand text-2xl text-pink-500 mt-1">กฎเซิร์ฟเวอร์</div>
            </div>
          </div>
          <div className="lg:col-span-9">
            <h2 className="font-serif-display text-4xl sm:text-5xl lg:text-6xl font-black leading-[1.05] text-[#4a3b47]">
              <span className="duluka-text-gradient italic">Server Rules</span>
            </h2>
            <p className="mt-5 max-w-2xl text-base text-[#6b5d68] sm:text-lg">
              มาอยู่กันแบบสร้างสรรค์ &amp; สนุกไปด้วยกัน
            </p>

            {/* Language toggle */}
            <div className="mt-6 inline-flex items-center gap-2 rounded-full border-2 border-pink-200 bg-white/70 p-1 backdrop-blur-sm">
              <Languages className="ml-2 h-3.5 w-3.5 text-pink-500" />
              <button
                onClick={() => setLang("th")}
                className={`relative z-10 rounded-full px-4 py-1.5 text-sm font-bold transition-colors ${
                  lang === "th"
                    ? "bg-gradient-to-r from-pink-400 to-fuchsia-400 text-white shadow-sm"
                    : "text-[#6b5d68]"
                }`}
              >
                ไทย
              </button>
              <button
                onClick={() => setLang("en")}
                className={`relative z-10 rounded-full px-4 py-1.5 text-sm font-bold transition-colors ${
                  lang === "en"
                    ? "bg-gradient-to-r from-pink-400 to-fuchsia-400 text-white shadow-sm"
                    : "text-[#6b5d68]"
                }`}
              >
                EN
              </button>
            </div>
          </div>
        </motion.div>

        {/* Rules — editorial numbered list */}
        <div className="lg:ml-[25%]">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6 }}
            className="space-y-3"
          >
            <AnimatePresence mode="popLayout">
              {allRules.map((rule, i) => (
                <motion.div
                  key={rule.titleEn}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.05 }}
                  whileHover={{ x: 4 }}
                  className="group flex items-start gap-4 rounded-2xl border border-pink-200/50 bg-white/70 p-4 backdrop-blur-sm transition-shadow hover:duluka-shadow-card sm:p-5"
                >
                  {/* Number */}
                  <div className="shrink-0">
                    <div className="editorial-number text-3xl">
                      {String(i + 1).padStart(2, "0")}
                    </div>
                  </div>
                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-base">{rule.groupEmoji}</span>
                      <h3 className="font-serif-display text-base font-bold text-[#4a3b47] sm:text-lg">
                        {lang === "th" ? rule.titleTh : rule.titleEn}
                      </h3>
                      <span className="hidden sm:inline text-[10px] uppercase tracking-[0.16em] text-[#6b5d68]/50">
                        {lang === "th" ? rule.groupTitleTh : rule.groupTitleEn}
                      </span>
                    </div>
                    {(lang === "th" ? rule.detailTh : rule.detailEn) && (
                      <p className="mt-1 text-sm text-[#6b5d68] leading-relaxed">
                        {lang === "th" ? rule.detailTh : rule.detailEn}
                      </p>
                    )}
                  </div>
                  {/* Icon */}
                  <div className="shrink-0 inline-flex h-9 w-9 items-center justify-center rounded-xl bg-pink-100 text-pink-500 ring-1 ring-pink-200">
                    <LucideIcon name={rule.icon} className="h-4 w-4" />
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>

          {/* Penalties */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6 }}
            className="mt-10"
          >
            <div className="mb-4 flex items-center gap-2">
              <ShieldAlert className="h-5 w-5 text-rose-400" />
              <span className="font-serif-display text-lg font-bold text-[#4a3b47]">
                ⚠️ {lang === "th" ? "บทลงโทษ" : "Penalties"}
              </span>
            </div>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
              {PENALTIES.map((p, i) => (
                <motion.div
                  key={p.level}
                  initial={{ opacity: 0, scale: 0.95, rotate: -2 }}
                  whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.5, delay: i * 0.08 }}
                  whileHover={{ y: -4, rotate: 1 }}
                  className={`relative overflow-hidden rounded-2xl border bg-white/80 p-5 backdrop-blur-sm duluka-shadow-card`}
                  style={{
                    borderColor:
                      p.level === "warn"
                        ? "rgba(251, 191, 36, 0.4)"
                        : p.level === "mute"
                        ? "rgba(249, 115, 22, 0.4)"
                        : "rgba(244, 63, 94, 0.4)",
                  }}
                >
                  <div className="text-3xl">{p.emoji}</div>
                  <div className="mt-2 font-serif-display text-base font-bold text-[#4a3b47]">
                    {lang === "th" ? p.titleTh : p.titleEn}
                  </div>
                  <div className="mt-1 text-xs leading-relaxed text-[#6b5d68]">
                    {lang === "th" ? p.detailTh : p.detailEn}
                  </div>
                  {/* Severity dots */}
                  <div className="mt-3 flex gap-1.5">
                    {[0, 1, 2].map((idx) => (
                      <div
                        key={idx}
                        className={`h-2 w-2 rounded-full ${
                          idx <= i
                            ? p.level === "warn"
                              ? "bg-amber-400"
                              : p.level === "mute"
                              ? "bg-orange-400"
                              : "bg-rose-500"
                            : "bg-pink-100"
                        }`}
                      />
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* CTA bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6 }}
            className="mt-10 flex flex-col items-center justify-between gap-4 rounded-3xl border-2 border-pink-200 bg-gradient-to-r from-pink-100/70 via-fuchsia-50/50 to-purple-100/70 p-6 sm:flex-row sm:p-8"
          >
            <div className="text-center sm:text-left">
              <div className="font-serif-display text-xl font-bold text-[#4a3b47]">
                {lang === "th"
                  ? "✨ มาอยู่กันแบบสร้างสรรค์ & สนุกไปด้วยกัน! 💖"
                  : "✨ Let's create and have fun together! 💖"}
              </div>
              <div className="mt-1 text-sm text-[#6b5d68]">
                {lang === "th"
                  ? "💬 มีปัญหาแจ้งแอดมินได้ที่ @ScotcsDuluka"
                  : "💬 Contact admin at @ScotcsDuluka"}
              </div>
            </div>
            <a
              href={DISCORD_INVITE}
              target="_blank"
              rel="noreferrer"
              className="duluka-shine group inline-flex shrink-0 items-center gap-2 overflow-hidden rounded-full bg-gradient-to-r from-pink-400 to-fuchsia-400 px-5 py-3 text-sm font-bold text-white shadow-md transition-transform hover:scale-105"
            >
              <MessageCircle className="h-4 w-4" />
              {lang === "th" ? "Discord" : "Join Discord"}
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
