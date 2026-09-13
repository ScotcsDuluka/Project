'use client';

import { useState } from "react";
import { motion } from "framer-motion";
import * as Icons from "lucide-react";
import { MessageCircle, Languages } from "lucide-react";
import { RULE_GROUPS, PENALTIES, DISCORD_INVITE } from "@/data/projects";

type Lang = "th" | "en";

function LucideIcon({ name, className }: { name: string; className?: string }) {
  const C = (Icons as Record<string, React.ComponentType<{ className?: string }>>)[name] ?? Icons.Circle;
  return <C className={className} />;
}

export default function Rules() {
  const [lang, setLang] = useState<Lang>("th");

  return (
    <section id="rules" className="relative overflow-hidden border-b-2 border-wx-ink py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.5 }}
          className="mb-10"
        >
          <div className="mb-6 flex items-center gap-4">
            <span className="border-2 border-wx-ink bg-wx-ink px-3 py-1.5 font-mono text-[11px] font-bold tracking-[0.2em] text-wx-acid">
              §05
            </span>
            <span className="font-mono text-[11px] font-bold uppercase tracking-[0.3em]">
              SERVER RULES
            </span>
            <span className="h-0.5 flex-1 bg-wx-ink" />
            <span className="font-hand text-2xl">กฎ</span>
          </div>

          <div className="flex flex-wrap items-end justify-between gap-6">
            <h2 className="font-display text-5xl font-black uppercase leading-[0.9] sm:text-6xl lg:text-7xl">
              THE
              <br />
              <span className="wx-stroke">RULES</span>
            </h2>

            {/* Language toggle */}
            <div className="inline-flex items-center border-2 border-wx-ink bg-wx-paper2">
              <span className="flex h-full items-center border-r-2 border-wx-ink bg-wx-paper px-2.5">
                <Languages className="h-4 w-4" />
              </span>
              <button
                onClick={() => setLang("th")}
                className={`px-4 py-2.5 font-mono text-xs font-bold uppercase tracking-[0.15em] transition-colors ${
                  lang === "th" ? "bg-wx-ink text-wx-acid" : "hover:bg-wx-acid"
                }`}
              >
                ไทย
              </button>
              <button
                onClick={() => setLang("en")}
                className={`border-l-2 border-wx-ink px-4 py-2.5 font-mono text-xs font-bold uppercase tracking-[0.15em] transition-colors ${
                  lang === "en" ? "bg-wx-ink text-wx-acid" : "hover:bg-wx-acid"
                }`}
              >
                EN
              </button>
            </div>
          </div>
          <p className="mt-4 max-w-2xl text-sm text-wx-ink/60 sm:text-base">
            มาอยู่กันแบบสร้างสรรค์ &amp; สนุกไปด้วยกัน — กฎไม่กัด แค่ช่วยให้ทุกคนมีความสุข
          </p>
        </motion.div>

        {/* Rule groups */}
        <div className="space-y-8">
          {RULE_GROUPS.map((group, gi) => (
            <motion.div
              key={group.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, delay: gi * 0.06 }}
              className="border-2 border-wx-ink bg-wx-paper"
            >
              {/* group header */}
              <div className="flex items-center gap-3 border-b-2 border-wx-ink bg-wx-ink px-4 py-3 sm:px-6">
                <span className="flex h-7 w-7 shrink-0 items-center justify-center border-2 border-wx-acid/60 text-wx-acid">
                  <LucideIcon name={group.icon} className="h-4 w-4" />
                </span>
                <h3 className="font-display text-sm uppercase tracking-wide text-wx-acid sm:text-base">
                  {lang === "th" ? group.titleTh : group.titleEn}
                </h3>
                <span className="ml-auto font-mono text-[10px] uppercase tracking-[0.2em] text-wx-paper/40">
                  GROUP {String(gi + 1).padStart(2, "0")}
                </span>
              </div>

              {/* rules list */}
              <ul>
                {group.rules.map((rule, ri) => {
                  const detail = lang === "th" ? rule.detailTh : rule.detailEn;
                  const globalIdx =
                    RULE_GROUPS.slice(0, gi).reduce((n, g) => n + g.rules.length, 0) + ri;
                  return (
                    <li
                      key={rule.titleEn}
                      className={`group flex items-start gap-3 px-4 py-4 transition-colors hover:bg-wx-acid sm:gap-5 sm:px-6 ${
                        ri > 0 ? "border-t-2 border-wx-ink" : ""
                      }`}
                    >
                      <span className="shrink-0 font-mono text-sm font-bold text-wx-orange">
                        {String(globalIdx + 1).padStart(2, "0")}
                      </span>
                      <div className="min-w-0 flex-1">
                        <div className="flex flex-wrap items-baseline gap-2">
                          <span className="font-bold sm:text-lg">
                            {lang === "th" ? rule.titleTh : rule.titleEn}
                          </span>
                          {detail && (
                            <span className="text-sm text-wx-ink/60 sm:ml-auto sm:text-right">
                              {detail}
                            </span>
                          )}
                        </div>
                      </div>
                      <span className="hidden h-9 w-9 shrink-0 items-center justify-center border-2 border-wx-ink bg-wx-paper2 transition-colors group-hover:bg-wx-paper sm:flex">
                        <LucideIcon name={rule.icon} className="h-4 w-4" />
                      </span>
                    </li>
                  );
                })}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Penalties */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5 }}
          className="mt-12"
        >
          <div className="mb-4 flex items-center gap-3">
            <div className="wx-hazard-orange h-6 w-16" aria-hidden />
            <h3 className="font-display text-xl uppercase sm:text-2xl">
              {lang === "th" ? "บทลงโทษ" : "Penalties"}
            </h3>
            <span className="h-0.5 flex-1 bg-wx-ink" />
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            {PENALTIES.map((p, i) => (
              <motion.div
                key={p.level}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.45, delay: i * 0.08 }}
                whileHover={{ rotate: i === 1 ? 0 : i === 0 ? -1 : 1 }}
                className="border-2 border-wx-ink bg-wx-paper"
              >
                <div className="wx-hazard h-2 w-full" aria-hidden />
                <div className="p-5">
                  <div className="flex items-center justify-between">
                    <span
                      className={`h-7 w-7 border-2 border-wx-ink ${
                        p.level === "warn"
                          ? "bg-wx-acid"
                          : p.level === "mute"
                            ? "bg-wx-orange"
                            : "bg-[#e11d48]"
                      }`}
                      aria-hidden
                    />
                    <span className="font-display text-xs text-wx-orange">
                      LVL {i + 1}
                    </span>
                  </div>
                  <div className="mt-3 font-display text-base uppercase">
                    {lang === "th" ? p.titleTh : p.titleEn}
                  </div>
                  <div className="mt-1 text-sm leading-relaxed text-wx-ink/60">
                    {lang === "th" ? p.detailTh : p.detailEn}
                  </div>
                  {/* severity blocks */}
                  <div className="mt-4 flex gap-1.5">
                    {[0, 1, 2].map((idx) => (
                      <div
                        key={idx}
                        className={`h-2.5 flex-1 border border-wx-ink ${
                          idx <= i
                            ? idx === 0
                              ? "bg-wx-acid"
                              : idx === 1
                                ? "bg-wx-orange"
                                : "bg-wx-ink"
                            : "bg-wx-paper2"
                        }`}
                      />
                    ))}
                  </div>
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
          transition={{ duration: 0.5 }}
          className="mt-10 flex flex-col items-center justify-between gap-4 border-2 border-wx-ink bg-wx-acid p-6 sm:flex-row sm:p-8"
        >
          <div className="text-center sm:text-left">
            <div className="font-display text-lg uppercase sm:text-xl">
              {lang === "th"
                ? "มาอยู่กันแบบสร้างสรรค์ & สนุกไปด้วยกัน!"
                : "Let's create and have fun together!"}
            </div>
            <div className="mt-1 font-mono text-xs uppercase tracking-[0.12em] text-wx-ink/70">
              {lang === "th"
                ? "มีปัญหาแจ้งแอดมินได้ที่ @ScotcsDuluka"
                : "Contact admin at @ScotcsDuluka"}
            </div>
          </div>
          <a
            href={DISCORD_INVITE}
            target="_blank"
            rel="noreferrer"
            data-cursor="JOIN"
            className="wx-btn inline-flex shrink-0 items-center gap-2 border-wx-ink bg-wx-ink px-6 py-3.5 font-mono text-xs font-bold uppercase tracking-[0.15em] text-wx-acid"
          >
            <MessageCircle className="h-4 w-4" />
            {lang === "th" ? "เข้าร่วม Discord" : "Join Discord"}
          </a>
        </motion.div>
      </div>
    </section>
  );
}
