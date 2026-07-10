'use client';

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import * as Icons from "lucide-react";
import {
  Github,
  ExternalLink,
  ChevronRight,
  Filter,
  AlertCircle,
  X,
  Star,
  GitFork,
} from "lucide-react";
import { PROJECTS, type ProjectRepo, type ProjectCategory } from "@/data/projects";

const CATEGORIES: ("All" | ProjectCategory)[] = [
  "All",
  "Capture",
  "Mobile Mod",
  "Web",
  "Media",
  "Minecraft",
  "Data",
  "Profile",
];

const STATUS_STYLE: Record<ProjectRepo["status"], { label: string; bg: string; text: string }> = {
  Released: {
    label: "Released",
    bg: "bg-emerald-100",
    text: "text-emerald-700",
  },
  "Active Dev": {
    label: "Active Dev",
    bg: "bg-pink-100",
    text: "text-pink-700",
  },
  "No README": {
    label: "No README",
    bg: "bg-purple-100",
    text: "text-purple-700",
  },
};

function LucideIcon({ name, className }: { name: string; className?: string }) {
  const C =
    (Icons as Record<string, React.ComponentType<{ className?: string }>>)[name] ??
    Icons.Circle;
  return <C className={className} />;
}

export default function Projects() {
  const [filter, setFilter] = useState<"All" | ProjectCategory>("All");
  const [selected, setSelected] = useState<ProjectRepo | null>(null);

  const filtered = useMemo(() => {
    if (filter === "All") return PROJECTS;
    return PROJECTS.filter((p) => p.category === filter);
  }, [filter]);

  // Make first project in filtered list span 2 cols (bento style)
  const isFeatured = (i: number) => i === 0;

  return (
    <section id="projects" className="relative overflow-hidden bg-[#faf6f0] py-20 lg:py-28">
      <div className="pointer-events-none absolute right-0 top-1/4 h-72 w-72 rounded-full bg-pink-200/30 blur-[120px]" />

      <div className="relative mx-auto max-w-6xl px-6 lg:px-12">
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
                §04
              </div>
              <div className="font-hand text-2xl text-pink-500 mt-1">โปรเจกต์</div>
            </div>
          </div>
          <div className="lg:col-span-9">
            <h2 className="font-serif-display text-4xl sm:text-5xl lg:text-6xl font-black leading-[1.05] text-[#4a3b47]">
              ทุก repo ของ
              <br />
              <span className="duluka-text-gradient italic">ScotcsDuluka</span>{" "}
              <span className="duluka-wiggle inline-block">📂</span>
            </h2>
            <p className="mt-5 max-w-2xl text-base text-[#6b5d68] sm:text-lg">
              10 repositories — คลิกการ์ดเพื่อดูรายละเอียด หรือเข้า GitHub โดยตรงได้เลย
            </p>
          </div>
        </motion.div>

        {/* Filter pills */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="lg:ml-[25%] mb-8 flex flex-wrap items-center gap-2"
        >
          <span className="mr-1 inline-flex items-center gap-1 text-[10px] uppercase tracking-[0.16em] text-[#6b5d68]/50">
            <Filter className="h-3 w-3" /> Filter
          </span>
          {CATEGORIES.map((c) => {
            const active = filter === c;
            const count = c === "All" ? PROJECTS.length : PROJECTS.filter((p) => p.category === c).length;
            if (c !== "All" && count === 0) return null;
            return (
              <button
                key={c}
                onClick={() => setFilter(c)}
                className={`inline-flex items-center gap-1.5 rounded-full border px-3.5 py-1.5 text-xs font-bold transition-all duration-300 ${
                  active
                    ? "border-transparent bg-gradient-to-r from-pink-400 to-fuchsia-400 text-white shadow-md"
                    : "border-pink-200 bg-white/70 text-[#6b5d68] hover:border-pink-300 hover:text-[#4a3b47]"
                }`}
              >
                {c}
                <span
                  className={`rounded-full px-1.5 text-[10px] ${
                    active ? "bg-white/25" : "bg-pink-100"
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </motion.div>

        {/* Bento grid */}
        <motion.div
          layout
          className="lg:ml-[25%] grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3"
        >
          <AnimatePresence mode="popLayout">
            {filtered.map((p, i) => {
              const featured = isFeatured(i) && filter !== "All" ? false : isFeatured(i) && filtered.length > 4;
              const status = STATUS_STYLE[p.status];
              return (
                <motion.article
                  key={p.slug}
                  layout
                  initial={{ opacity: 0, y: 30, scale: 0.96 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.5, delay: i * 0.05 }}
                  whileHover={{ y: -6, rotate: -0.5 }}
                  onClick={() => setSelected(p)}
                  className={`group relative flex cursor-pointer flex-col overflow-hidden rounded-3xl border-2 border-pink-200/60 bg-white/80 p-5 backdrop-blur-sm transition-all duration-300 hover:border-pink-300 hover:duluka-shadow-hover sm:p-6 ${
                    featured ? "sm:col-span-2 lg:col-span-2" : ""
                  }`}
                >
                  {/* Top row */}
                  <div className="mb-4 flex items-start justify-between">
                    <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-pink-100 to-purple-100 text-pink-600 ring-1 ring-pink-200 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3">
                      <LucideIcon name={p.icon} className="h-6 w-6" />
                    </div>
                    <span
                      className={`inline-flex items-center gap-1 rounded-full ${status.bg} ${status.text} px-2.5 py-0.5 text-[10px] font-bold`}
                    >
                      {status.label}
                    </span>
                  </div>

                  {/* Title + category */}
                  <div className="mb-1 flex items-center gap-2 text-[10px] uppercase tracking-[0.18em] text-[#6b5d68]/50">
                    <span className="h-1.5 w-1.5 rounded-full bg-pink-400" />
                    {p.category}
                  </div>
                  <h3 className="font-serif-display text-lg font-bold leading-tight text-[#4a3b47] sm:text-xl">
                    {p.name}
                  </h3>

                  {/* Short description */}
                  <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-[#6b5d68]">
                    {p.short}
                  </p>

                  {/* Tags */}
                  {p.tags.length > 0 && (
                    <div className="mt-4 flex flex-wrap gap-1.5">
                      {p.tags.slice(0, featured ? 5 : 3).map((t) => (
                        <span
                          key={t}
                          className="rounded-md border border-pink-200/70 bg-pink-50/70 px-2 py-0.5 text-[10px] font-medium text-[#6b5d68]"
                        >
                          {t}
                        </span>
                      ))}
                      {p.tags.length > (featured ? 5 : 3) && (
                        <span className="rounded-md border border-pink-200/70 bg-pink-50/70 px-2 py-0.5 text-[10px] font-medium text-pink-500">
                          +{p.tags.length - (featured ? 5 : 3)}
                        </span>
                      )}
                    </div>
                  )}

                  {/* Footer */}
                  <div className="mt-auto flex items-center justify-between pt-5">
                    <span className="inline-flex items-center gap-1 text-xs font-bold text-pink-600 transition-colors">
                      {p.hasReadme ? "ดูรายละเอียด" : "ดู repo"}
                      <ChevronRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                    </span>
                    <a
                      href={p.url}
                      target="_blank"
                      rel="noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      aria-label="Open GitHub repo"
                      className="inline-flex h-8 w-8 items-center justify-center rounded-lg border border-pink-200 bg-white/70 text-[#6b5d68] transition-all hover:scale-110 hover:border-pink-400 hover:text-pink-600"
                    >
                      <Github className="h-4 w-4" />
                    </a>
                  </div>

                  {/* Featured corner sticker */}
                  {featured && (
                    <motion.div
                      animate={{ rotate: [-8, -3, -8] }}
                      transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                      className="absolute -right-2 -top-2 rounded-full bg-amber-300 px-2.5 py-1 text-[10px] font-black text-white shadow-md"
                    >
                      ⭐ FEATURED
                    </motion.div>
                  )}
                </motion.article>
              );
            })}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Detail modal */}
      <AnimatePresence>
        {selected && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={() => setSelected(null)}
            className="fixed inset-0 z-[100] flex items-end justify-center bg-[#4a3b47]/40 p-0 backdrop-blur-md sm:items-center sm:p-4"
          >
            <motion.div
              initial={{ y: 60, scale: 0.97, opacity: 0 }}
              animate={{ y: 0, scale: 1, opacity: 1 }}
              exit={{ y: 40, scale: 0.97, opacity: 0 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-h-[92svh] w-full max-w-2xl overflow-y-auto rounded-t-3xl border-2 border-pink-200 bg-[#faf6f0]/98 backdrop-blur-2xl sm:rounded-3xl"
            >
              {/* Top stripe */}
              <div className="h-1.5 w-full bg-gradient-to-r from-pink-400 via-fuchsia-400 to-purple-400" />

              <div className="p-6 sm:p-8">
                {/* Close */}
                <button
                  aria-label="Close"
                  onClick={() => setSelected(null)}
                  className="absolute right-4 top-4 inline-flex h-9 w-9 items-center justify-center rounded-xl border border-pink-200 bg-white/80 text-[#6b5d68] transition-all hover:scale-110 hover:border-pink-400 hover:text-pink-600"
                >
                  <X className="h-4 w-4" />
                </button>

                {/* Header */}
                <div className="flex items-start gap-4 pr-10">
                  <div className="inline-flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-pink-100 to-purple-100 text-pink-600 ring-1 ring-pink-200">
                    <LucideIcon name={selected.icon} className="h-7 w-7" />
                  </div>
                  <div>
                    <div className="flex flex-wrap items-center gap-2 text-[10px] uppercase tracking-[0.18em] text-[#6b5d68]/50">
                      <span className="text-pink-600">{selected.category}</span>
                      <span className="text-[#6b5d68]/30">·</span>
                      <span>{STATUS_STYLE[selected.status].label}</span>
                    </div>
                    <h3 className="mt-1 font-serif-display text-2xl font-black leading-tight text-[#4a3b47] sm:text-3xl">
                      {selected.name}
                    </h3>
                    <div className="mt-1 font-mono text-xs text-[#6b5d68]/70">{selected.repo}</div>
                  </div>
                </div>

                {/* Short description */}
                <p className="mt-6 text-base leading-relaxed text-[#6b5d68] sm:text-lg">
                  {selected.short}
                </p>

                {/* Bullets */}
                {selected.hasReadme && selected.bullets.length > 0 && (
                  <div className="mt-6">
                    <div className="mb-3 flex items-center gap-2 text-[10px] uppercase tracking-[0.18em] text-pink-500/70">
                      <span className="h-px w-8 bg-pink-300" />
                      From README
                    </div>
                    <ul className="space-y-2">
                      {selected.bullets.map((b, i) => (
                        <motion.li
                          key={i}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.3, delay: 0.05 * i }}
                          className="flex items-start gap-3 rounded-xl border border-pink-100 bg-white/70 p-3"
                        >
                          <span className="editorial-number text-sm shrink-0">
                            {String(i + 1).padStart(2, "0")}
                          </span>
                          <span className="text-sm leading-relaxed text-[#6b5d68]">{b}</span>
                        </motion.li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* No README notice */}
                {!selected.hasReadme && (
                  <div className="mt-6 flex items-start gap-3 rounded-xl border border-amber-200 bg-amber-50/70 p-4">
                    <AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-amber-600" />
                    <div className="text-sm text-[#6b5d68]">
                      Repository นี้ยังไม่มี README — ดูรายละเอียดได้ที่ GitHub โดยตรง
                    </div>
                  </div>
                )}

                {/* Tags */}
                {selected.tags.length > 0 && (
                  <div className="mt-6 flex flex-wrap gap-2">
                    {selected.tags.map((t) => (
                      <span
                        key={t}
                        className="rounded-lg border border-pink-200 bg-pink-50 px-2.5 py-1 text-xs font-medium text-pink-700"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                )}

                {/* CTAs */}
                <div className="mt-8 flex flex-wrap gap-3">
                  <a
                    href={selected.url}
                    target="_blank"
                    rel="noreferrer"
                    className="duluka-shine group inline-flex items-center gap-2 overflow-hidden rounded-full bg-gradient-to-r from-pink-400 to-fuchsia-400 px-5 py-3 text-sm font-bold text-white shadow-md transition-transform hover:scale-105"
                  >
                    <Github className="h-4 w-4" />
                    View on GitHub
                  </a>
                  {selected.homepage && (
                    <a
                      href={selected.homepage}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-2 rounded-full border-2 border-purple-300 bg-white/70 px-5 py-3 text-sm font-bold text-[#4a3b47] transition-all hover:border-purple-400 hover:bg-white"
                    >
                      <ExternalLink className="h-4 w-4" />
                      Live Page
                    </a>
                  )}
                </div>

                {/* Footer mini-stats */}
                <div className="mt-6 pt-5 border-t border-pink-100 flex items-center gap-4 text-xs text-[#6b5d68]/60">
                  <span className="inline-flex items-center gap-1">
                    <Star className="h-3 w-3" /> Open Source
                  </span>
                  <span className="inline-flex items-center gap-1">
                    <GitFork className="h-3 w-3" /> MIT License
                  </span>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
