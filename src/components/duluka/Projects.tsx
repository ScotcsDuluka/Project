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
  ArrowUpRight,
} from "lucide-react";
import { PROJECTS, type ProjectRepo, type ProjectCategory } from "@/data/projects";
import TiltCard from "./TiltCard";

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

  return (
    <section id="projects" className="relative overflow-hidden bg-[#faf6f0] py-20 lg:py-28">
      <div className="pointer-events-none absolute right-0 top-1/4 h-72 w-72 rounded-full bg-pink-200/30 blur-[60px]" />

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
              <span className="duluka-text-gradient italic">Projects</span>
            </h2>
            <p className="mt-5 max-w-2xl text-base text-[#6b5d68] sm:text-lg">
              {filtered.length} repos — click for details
            </p>
          </div>
        </motion.div>

        {/* Filter pills */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="lg:ml-[25%] mb-10 flex flex-wrap items-center gap-2"
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

        {/* Big horizontal project cards */}
        <motion.div layout className="lg:ml-[25%] space-y-6">
          <AnimatePresence mode="popLayout">
            {filtered.map((p, i) => {
              const status = STATUS_STYLE[p.status];
              const reverse = i % 2 === 1; // alternate layout
              return (
                <motion.div
                  key={p.slug}
                  layout
                  initial={{ opacity: 0, y: 40, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.5, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
                >
                <TiltCard max={3} scale={1.01}>
                <motion.article
                  onClick={() => setSelected(p)}
                  className="group relative grid grid-cols-1 overflow-hidden rounded-3xl border-2 border-pink-200/60 bg-white/80 backdrop-blur-sm transition-colors duration-300 hover:border-pink-300 hover:duluka-shadow-hover md:grid-cols-12"
                >
                  {/* LEFT: Visual block (large icon + status) */}
                  <div
                    className={`relative flex flex-col justify-between p-6 sm:p-8 md:col-span-4 ${
                      reverse ? "md:order-2" : "md:order-1"
                    } bg-gradient-to-br from-pink-100/80 via-fuchsia-50/60 to-purple-100/60`}
                  >
                    {/* decorative dots */}
                    <div className="pointer-events-none absolute inset-0 duluka-dots-bg opacity-30" />

                    {/* Top: status + index */}
                    <div className="relative flex items-start justify-between">
                      <span
                        className={`inline-flex items-center gap-1 rounded-full ${status.bg} ${status.text} px-2.5 py-1 text-[10px] font-bold`}
                      >
                        {status.label}
                      </span>
                      <span className="editorial-number text-2xl opacity-50">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                    </div>

                    {/* Center: big icon */}
                    <div className="relative my-6 flex items-center justify-center">
                      <motion.div
                        whileHover={{ rotate: 8, scale: 1.1 }}
                        className="inline-flex h-24 w-24 items-center justify-center rounded-3xl bg-white/80 text-pink-600 shadow-md ring-2 ring-pink-200 sm:h-28 sm:w-28 group-hover:duluka-glow-pulse"
                      >
                        <LucideIcon name={p.icon} className="h-12 w-12 sm:h-14 sm:w-14" />
                      </motion.div>
                    </div>

                    {/* Bottom: category + homepage link */}
                    <div className="relative flex items-end justify-between">
                      <div>
                        <div className="text-[10px] uppercase tracking-[0.18em] text-[#6b5d68]/60">
                          Category
                        </div>
                        <div className="font-serif-display text-sm font-bold text-[#4a3b47]">
                          {p.category}
                        </div>
                      </div>
                      {p.homepage && (
                        <a
                          href={p.homepage}
                          target="_blank"
                          rel="noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          aria-label="Open live page"
                          className="inline-flex h-9 w-9 items-center justify-center rounded-xl border border-pink-200 bg-white/80 text-pink-600 transition-all hover:scale-110 hover:border-pink-400"
                        >
                          <ExternalLink className="h-4 w-4" />
                        </a>
                      )}
                    </div>
                  </div>

                  {/* RIGHT: Content block */}
                  <div
                    className={`relative flex flex-col p-6 sm:p-8 md:col-span-8 ${
                      reverse ? "md:order-1" : "md:order-2"
                    }`}
                  >
                    {/* Repo name + GitHub button */}
                    <div className="mb-2 flex items-start justify-between gap-3">
                      <div className="min-w-0 flex-1">
                        <div className="font-mono text-xs text-[#6b5d68]/60">{p.repo}</div>
                        <h3 className="mt-1 font-serif-display text-2xl font-black leading-tight text-[#4a3b47] sm:text-3xl">
                          {p.name}
                        </h3>
                      </div>
                      <a
                        href={p.url}
                        target="_blank"
                        rel="noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        aria-label="Open GitHub repo"
                        className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-pink-200 bg-white/70 text-[#6b5d68] transition-all hover:scale-110 hover:border-pink-400 hover:text-pink-600"
                      >
                        <Github className="h-4 w-4" />
                      </a>
                    </div>

                    {/* Description */}
                    <p className="mt-2 text-sm leading-relaxed text-[#6b5d68] sm:text-base line-clamp-2">
                      {p.short}
                    </p>

                    {/* Feature preview (only if has readme) */}
                    {p.hasReadme && p.bullets.length > 0 && (
                      <ul className="mt-4 grid grid-cols-1 gap-1.5 sm:grid-cols-2">
                        {p.bullets.slice(0, 4).map((b, bi) => (
                          <li
                            key={bi}
                            className="flex items-start gap-2 text-xs text-[#6b5d68]"
                          >
                            <span className="mt-1 h-1 w-1 shrink-0 rounded-full bg-pink-400" />
                            <span className="line-clamp-1">{b}</span>
                          </li>
                        ))}
                      </ul>
                    )}

                    {/* No README notice inline */}
                    {!p.hasReadme && (
                      <div className="mt-4 inline-flex items-center gap-2 rounded-lg border border-amber-200 bg-amber-50/70 px-3 py-1.5 text-xs text-amber-700">
                        <AlertCircle className="h-3 w-3 shrink-0" />
                        No README yet — ดูที่ GitHub โดยตรง
                      </div>
                    )}

                    {/* Tags + CTA */}
                    <div className="mt-auto pt-5 flex flex-wrap items-end justify-between gap-3">
                      <div className="flex flex-wrap gap-1.5">
                        {p.tags.slice(0, 4).map((t) => (
                          <span
                            key={t}
                            className="rounded-md border border-pink-200/70 bg-pink-50/70 px-2 py-0.5 text-[10px] font-medium text-[#6b5d68]"
                          >
                            {t}
                          </span>
                        ))}
                        {p.tags.length > 4 && (
                          <span className="rounded-md border border-pink-200/70 bg-pink-50/70 px-2 py-0.5 text-[10px] font-medium text-pink-500">
                            +{p.tags.length - 4}
                          </span>
                        )}
                      </div>
                      <span className="inline-flex items-center gap-1 text-sm font-bold text-pink-600 transition-colors group-hover:text-pink-700">
                        {p.hasReadme ? "View details" : "View repo"}
                        <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                      </span>
                    </div>
                  </div>
                </motion.article>
                </TiltCard>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>

        {/* Empty state */}
        {filtered.length === 0 && (
          <div className="lg:ml-[25%] py-16 text-center">
            <div className="text-4xl mb-3">🔍</div>
            <div className="font-serif-display text-lg text-[#4a3b47]">
              No projects in this category
            </div>
          </div>
        )}
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
              className="relative max-h-[94svh] w-full max-w-5xl overflow-y-auto rounded-t-3xl border-2 border-pink-200 bg-[#faf6f0]/98 backdrop-blur-2xl sm:rounded-3xl sm:my-4"
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

                {/* Live GitHub Stats — auto-fetched */}
                {(selected.stars !== undefined ||
                  selected.forks !== undefined ||
                  selected.language ||
                  selected.pushedAt ||
                  selected.openIssues !== undefined) && (
                  <div className="mt-5 grid grid-cols-2 gap-2 sm:grid-cols-4">
                    {selected.stars !== undefined && (
                      <div className="rounded-xl border border-amber-200 bg-amber-50/50 p-2.5 text-center">
                        <div className="font-serif-display text-lg font-black text-[#4a3b47]">
                          {selected.stars}
                        </div>
                        <div className="text-[10px] uppercase tracking-[0.14em] text-amber-700/70">
                          ⭐ Stars
                        </div>
                      </div>
                    )}
                    {selected.forks !== undefined && (
                      <div className="rounded-xl border border-purple-200 bg-purple-50/50 p-2.5 text-center">
                        <div className="font-serif-display text-lg font-black text-[#4a3b47]">
                          {selected.forks}
                        </div>
                        <div className="text-[10px] uppercase tracking-[0.14em] text-purple-700/70">
                          🍴 Forks
                        </div>
                      </div>
                    )}
                    {selected.language && (
                      <div className="rounded-xl border border-pink-200 bg-pink-50/50 p-2.5 text-center">
                        <div className="font-serif-display text-sm font-bold text-[#4a3b47] truncate">
                          {selected.language}
                        </div>
                        <div className="text-[10px] uppercase tracking-[0.14em] text-pink-700/70">
                          💻 Lang
                        </div>
                      </div>
                    )}
                    {selected.pushedAt && (
                      <div className="rounded-xl border border-emerald-200 bg-emerald-50/50 p-2.5 text-center">
                        <div className="font-serif-display text-sm font-bold text-[#4a3b47]">
                          {new Date(selected.pushedAt).toLocaleDateString("en-US", {
                            month: "short",
                            day: "numeric",
                            year: "numeric",
                          })}
                        </div>
                        <div className="text-[10px] uppercase tracking-[0.14em] text-emerald-700/70">
                          📅 Updated
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {/* Bullets (Features Main) */}
                {selected.hasReadme && selected.bullets.length > 0 && (
                  <div className="mt-6">
                    <div className="mb-3 flex items-center gap-2 text-[10px] uppercase tracking-[0.18em] text-pink-500/70">
                      <span className="h-px w-8 bg-pink-300" />
                      Features Main
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

                {/* Tech Stack */}
                {selected.techStack && selected.techStack.length > 0 && (
                  <div className="mt-6">
                    <div className="mb-3 flex items-center gap-2 text-[10px] uppercase tracking-[0.18em] text-pink-500/70">
                      <span className="h-px w-8 bg-pink-300" />
                      Tech Stack
                    </div>
                    <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                      {selected.techStack.map((group) => (
                        <div
                          key={group.label}
                          className="rounded-xl border border-purple-100 bg-purple-50/40 p-3"
                        >
                          <div className="text-[10px] uppercase tracking-[0.16em] text-purple-600/70 mb-1">
                            {group.label}
                          </div>
                          <div className="flex flex-wrap gap-1">
                            {group.items.map((item) => (
                              <span
                                key={item}
                                className="rounded-md border border-purple-200/60 bg-white/70 px-1.5 py-0.5 text-[11px] font-medium text-[#4a3b47]"
                              >
                                {item}
                              </span>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Encoder status (NVIDIA-specific) */}
                {selected.encoderStatus && selected.encoderStatus.length > 0 && (
                  <div className="mt-6">
                    <div className="mb-3 flex items-center gap-2 text-[10px] uppercase tracking-[0.18em] text-pink-500/70">
                      <span className="h-px w-8 bg-pink-300" />
                      Encoder Status
                    </div>
                    <div className="grid grid-cols-1 gap-2 sm:grid-cols-3">
                      {selected.encoderStatus.map((enc) => (
                        <div
                          key={enc.name}
                          className={`flex items-center justify-between rounded-xl border p-3 ${
                            enc.ready
                              ? "border-emerald-200 bg-emerald-50/70"
                              : "border-pink-200 bg-pink-50/40"
                          }`}
                        >
                          <span className="font-mono text-xs font-bold text-[#4a3b47]">
                            {enc.name}
                          </span>
                          <span
                            className={`text-xs font-bold ${
                              enc.ready ? "text-emerald-600" : "text-[#6b5d68]/50"
                            }`}
                          >
                            {enc.ready ? "✓ Ready" : "Pending"}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Supported devices (HyperOS-specific) */}
                {selected.supportedDevices && selected.supportedDevices.length > 0 && (
                  <div className="mt-6">
                    <div className="mb-3 flex items-center gap-2 text-[10px] uppercase tracking-[0.18em] text-pink-500/70">
                      <span className="h-px w-8 bg-pink-300" />
                      Supported Devices / Versions
                    </div>
                    <ul className="space-y-1.5">
                      {selected.supportedDevices.map((d, i) => (
                        <li
                          key={i}
                          className="flex items-start gap-2 text-sm text-[#6b5d68]"
                        >
                          <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-400" />
                          {d}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Requirements */}
                {selected.requirements && selected.requirements.length > 0 && (
                  <div className="mt-6">
                    <div className="mb-3 flex items-center gap-2 text-[10px] uppercase tracking-[0.18em] text-amber-600/70">
                      <span className="h-px w-8 bg-amber-300" />
                      Requirements
                    </div>
                    <ul className="space-y-1.5">
                      {selected.requirements.map((r, i) => (
                        <li
                          key={i}
                          className="flex items-start gap-2 text-sm text-[#6b5d68]"
                        >
                          <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-amber-400" />
                          {r}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Install steps */}
                {selected.installSteps && selected.installSteps.length > 0 && (
                  <div className="mt-6">
                    <div className="mb-3 flex items-center gap-2 text-[10px] uppercase tracking-[0.18em] text-pink-500/70">
                      <span className="h-px w-8 bg-pink-300" />
                      Installation
                    </div>
                    <ol className="space-y-2">
                      {selected.installSteps.map((step, i) => (
                        <li
                          key={i}
                          className="flex items-start gap-3 rounded-xl border border-pink-100 bg-white/70 p-3"
                        >
                          <span className="editorial-number text-sm shrink-0">
                            {String(i + 1).padStart(2, "0")}
                          </span>
                          <span className="text-sm leading-relaxed text-[#6b5d68]">{step}</span>
                        </li>
                      ))}
                    </ol>
                  </div>
                )}

                {/* Usage examples */}
                {selected.usageExamples && selected.usageExamples.length > 0 && (
                  <div className="mt-6">
                    <div className="mb-3 flex items-center gap-2 text-[10px] uppercase tracking-[0.18em] text-pink-500/70">
                      <span className="h-px w-8 bg-pink-300" />
                      Usage
                    </div>
                    <ul className="space-y-1.5">
                      {selected.usageExamples.map((u, i) => (
                        <li
                          key={i}
                          className="flex items-start gap-2 text-sm text-[#6b5d68]"
                        >
                          <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-pink-400" />
                          {u}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Warnings */}
                {selected.warnings && selected.warnings.length > 0 && (
                  <div className="mt-6">
                    <div className="mb-3 flex items-center gap-2 text-[10px] uppercase tracking-[0.18em] text-rose-600/70">
                      <span className="h-px w-8 bg-rose-300" />
                      ⚠️ Warnings
                    </div>
                    <ul className="space-y-2">
                      {selected.warnings.map((w, i) => (
                        <li
                          key={i}
                          className="flex items-start gap-2 rounded-xl border border-rose-200 bg-rose-50/50 p-3 text-sm text-[#6b5d68]"
                        >
                          <span className="mt-0.5 shrink-0 text-rose-500">⚠️</span>
                          <span className="leading-relaxed">{w}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Third-party dependencies table */}
                {selected.dependencies && selected.dependencies.length > 0 && (
                  <div className="mt-6">
                    <div className="mb-3 flex items-center gap-2 text-[10px] uppercase tracking-[0.18em] text-pink-500/70">
                      <span className="h-px w-8 bg-pink-300" />
                      Third-Party Components
                    </div>
                    <div className="overflow-hidden rounded-xl border border-pink-100">
                      <table className="w-full text-xs">
                        <thead className="bg-pink-50/70 text-[10px] uppercase tracking-[0.16em] text-[#6b5d68]/70">
                          <tr>
                            <th className="px-3 py-2 text-left font-bold">Component</th>
                            <th className="px-3 py-2 text-left font-bold">License</th>
                            <th className="hidden sm:table-cell px-3 py-2 text-left font-bold">Author</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-pink-50">
                          {selected.dependencies.map((dep) => (
                            <tr key={dep.name} className="bg-white/40">
                              <td className="px-3 py-2">
                                <div className="font-mono font-bold text-[#4a3b47]">{dep.name}</div>
                                <div className="text-[10px] text-[#6b5d68]/60">{dep.source}</div>
                              </td>
                              <td className="px-3 py-2">
                                <span className="rounded-md border border-pink-200 bg-pink-50 px-1.5 py-0.5 font-mono text-[10px] text-pink-700">
                                  {dep.license}
                                </span>
                              </td>
                              <td className="hidden sm:table-cell px-3 py-2 text-[#6b5d68]">
                                {dep.author}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}

                {/* License */}
                {selected.license && (
                  <div className="mt-6 rounded-xl border border-emerald-200 bg-emerald-50/50 p-4">
                    <div className="mb-1 flex items-center gap-2 text-[10px] uppercase tracking-[0.16em] text-emerald-700/70">
                      <span className="h-px w-8 bg-emerald-300" />
                      License
                    </div>
                    <div className="font-serif-display text-lg font-bold text-[#4a3b47]">
                      {selected.license.name}
                    </div>
                    {selected.license.notice && (
                      <p className="mt-2 text-xs leading-relaxed text-[#6b5d68]">
                        {selected.license.notice}
                      </p>
                    )}
                  </div>
                )}

                {/* No README notice */}
                {!selected.hasReadme && (
                  <div className="mt-6 flex items-start gap-3 rounded-xl border border-amber-200 bg-amber-50/70 p-4">
                    <AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-amber-600" />
                    <div className="text-sm text-[#6b5d68]">
                      No README yet — see GitHub for details
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
