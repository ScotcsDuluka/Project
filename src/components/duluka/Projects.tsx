'use client';

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import * as Icons from "lucide-react";
import {
  Github,
  ExternalLink,
  ArrowUpRight,
  X,
  Star,
  GitFork,
  AlertTriangle,
  Filter,
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

function LucideIcon({ name, className }: { name: string; className?: string }) {
  const C =
    (Icons as Record<string, React.ComponentType<{ className?: string }>>)[name] ??
    Icons.Circle;
  return <C className={className} />;
}

export default function Projects() {
  const [filter, setFilter] = useState<"All" | ProjectCategory>("All");
  const [selected, setSelected] = useState<ProjectRepo | null>(null);
  const [closing, setClosing] = useState(false);

  const closeModal = () => {
    // CSS fade + guaranteed unmount — no exit-animation machinery to hang
    setClosing(true);
    setTimeout(() => {
      setSelected(null);
      setClosing(false);
    }, 260);
  };

  const filtered = useMemo(() => {
    if (filter === "All") return PROJECTS;
    return PROJECTS.filter((p) => p.category === filter);
  }, [filter]);

  return (
    <section id="projects" className="relative overflow-hidden border-b-2 border-wx-ink py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.5 }}
          className="mb-10 flex flex-wrap items-end justify-between gap-6"
        >
          <div>
            <div className="mb-10 flex items-center gap-4">
              <span className="border-2 border-wx-ink bg-wx-ink px-3 py-1.5 font-mono text-[11px] font-bold tracking-[0.2em] text-wx-acid">
                §03
              </span>
              <span className="font-mono text-[11px] font-bold uppercase tracking-[0.3em]">
                PROJECT INDEX
              </span>
              <span className="h-0.5 w-24 bg-wx-ink lg:w-48" />
              <span className="font-hand text-2xl">โปรเจกต์</span>
            </div>
            <h2 className="font-display text-5xl font-black uppercase leading-[0.9] sm:text-6xl lg:text-7xl">
              {filtered.length} ×
              <br />
              <span className="wx-stroke">Repos</span>
            </h2>
            <p className="mt-4 max-w-xl text-sm text-wx-ink/60 sm:text-base">
              ทุก repo ของ ScotcsDuluka — คลิกแถวเพื่อดูรายละเอียด หรือกระโดดเข้า GitHub ตรงๆ
            </p>
          </div>

          <div className="wx-hazard-orange h-10 w-40 self-end sm:w-64" aria-hidden />
        </motion.div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.45 }}
          className="mb-0 flex flex-wrap items-center gap-2 border-2 border-wx-ink bg-wx-paper2 p-3"
        >
          <span className="mr-2 inline-flex items-center gap-1.5 font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-wx-ink/50">
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
                className={`inline-flex items-center gap-1.5 border-2 border-wx-ink px-3 py-1.5 font-mono text-[11px] font-bold uppercase tracking-[0.1em] transition-all ${
                  active
                    ? "bg-wx-ink text-wx-acid"
                    : "bg-wx-paper text-wx-ink hover:bg-wx-acid"
                }`}
              >
                {c}
                <span className={`px-1 ${active ? "text-wx-paper/60" : "text-wx-ink/40"}`}>
                  {count}
                </span>
              </button>
            );
          })}
        </motion.div>

        {/* Index rows */}
        <div className="border-x-2 border-b-2 border-wx-ink">
          {filtered.map((p, i) => {
            const reverse = i % 2 === 1;
            return (
              <motion.button
                key={p.slug}
                type="button"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, delay: i * 0.04 }}
                onClick={() => setSelected(p)}
                data-cursor="OPEN"
                className={`group block w-full border-t-2 border-wx-ink text-left transition-colors duration-150 ${
                  reverse ? "bg-wx-paper" : "bg-wx-paper"
                } hover:bg-wx-ink hover:text-wx-acid`}
              >
                  <div className="grid grid-cols-[auto_1fr_auto] items-center gap-3 px-4 py-5 sm:gap-6 sm:px-6 lg:grid-cols-[70px_1fr_1fr_auto_auto] lg:py-7">
                    {/* index */}
                    <span className="font-mono text-xs font-bold text-wx-ink/40 transition-colors group-hover:text-wx-acid/60">
                      /{String(i + 1).padStart(2, "0")}
                    </span>

                    {/* name */}
                    <span className="min-w-0">
                      <span className="block truncate font-display text-xl uppercase leading-tight sm:text-3xl lg:text-4xl">
                        {p.name}
                      </span>
                      <span className="block font-mono text-[10px] tracking-[0.08em] opacity-50">
                        {p.repo}
                      </span>
                    </span>

                    {/* category + status (desktop) */}
                    <span className="hidden lg:block">
                      <span className="inline-block border-2 border-current px-2 py-0.5 font-mono text-[10px] font-bold uppercase tracking-[0.15em]">
                        {p.category}
                      </span>
                      <span
                        className={`ml-2 inline-block px-2 py-0.5 font-mono text-[10px] font-bold uppercase tracking-[0.15em] ${
                          p.status === "Released"
                            ? "bg-current text-[var(--wx-paper)]"
                            : p.status === "Active Dev"
                              ? "bg-wx-orange text-wx-ink"
                              : "bg-wx-ink/15 text-current"
                        } ${p.status === "Released" ? "group-hover:bg-wx-acid group-hover:text-wx-ink" : ""}`}
                      >
                        {p.status}
                      </span>
                    </span>

                    {/* icon */}
                    <span className="hidden h-11 w-11 items-center justify-center border-2 border-current sm:flex">
                      <LucideIcon name={p.icon} className="h-5 w-5" />
                    </span>

                    {/* arrow */}
                    <span className="flex h-10 w-10 items-center justify-center border-2 border-current transition-transform duration-200 group-hover:rotate-45">
                      <ArrowUpRight className="h-5 w-5" />
                    </span>
                  </div>
                </motion.button>
              );
            })}

          {filtered.length === 0 && (
            <div className="border-t-2 border-wx-ink py-16 text-center">
              <div className="font-display text-2xl uppercase">NOTHING HERE</div>
              <div className="mt-2 font-hand text-xl text-wx-ink/50">ไม่มีโปรเจกต์ในหมวดนี้ 🤷</div>
            </div>
          )}
        </div>
      </div>

      {/* Detail modal */}
      {selected && (
        <div
          onClick={closeModal}
          data-cursor="CLOSE"
          className="fixed inset-0 z-[120] flex items-end justify-center bg-wx-ink/70 backdrop-blur-sm sm:items-center sm:p-6"
          style={{
            opacity: closing ? 0 : 1,
            transition: closing ? "opacity 0.25s ease" : "none",
          }}
        >
            <motion.div
              initial={{ y: 60, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              onClick={(e) => e.stopPropagation()}
              data-cursor="READ"
              className="relative max-h-[92svh] w-full max-w-2xl overflow-y-auto border-2 border-wx-ink bg-wx-paper sm:wx-shadow-lg"
            >
              <div className="wx-hazard h-2.5 w-full" />

              <div className="p-6 sm:p-8">
                <button
                  aria-label="Close"
                  onClick={closeModal}
                  className="absolute right-4 top-5 flex h-9 w-9 items-center justify-center border-2 border-wx-ink bg-wx-paper transition-colors hover:bg-wx-orange"
                >
                  <X className="h-4 w-4" />
                </button>

                {/* Header */}
                <div className="flex items-start gap-4 pr-12">
                  <div className="flex h-14 w-14 shrink-0 items-center justify-center border-2 border-wx-ink bg-wx-acid">
                    <LucideIcon name={selected.icon} className="h-7 w-7" />
                  </div>
                  <div>
                    <div className="flex flex-wrap items-center gap-2 font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-wx-ink/50">
                      <span className="bg-wx-ink px-1.5 py-0.5 text-wx-acid">
                        {selected.category}
                      </span>
                      <span>{selected.status}</span>
                    </div>
                    <h3 className="mt-1.5 font-display text-2xl uppercase leading-tight sm:text-3xl">
                      {selected.name}
                    </h3>
                    <div className="mt-0.5 font-mono text-xs text-wx-ink/50">{selected.repo}</div>
                  </div>
                </div>

                <p className="mt-6 border-l-4 border-wx-acid pl-4 text-base leading-relaxed sm:text-lg">
                  {selected.short}
                </p>

                {/* Bullets */}
                {selected.hasReadme && selected.bullets.length > 0 && (
                  <div className="mt-6">
                    <div className="mb-3 font-mono text-[10px] font-bold uppercase tracking-[0.25em] text-wx-ink/50">
                      // FROM README
                    </div>
                    <ul className="space-y-0">
                      {selected.bullets.map((b, i) => (
                        <li
                          key={i}
                          className="flex items-start gap-3 border-2 border-wx-ink bg-wx-paper p-3 leading-relaxed [&:not(:first-child)]:border-t-0"
                        >
                          <span className="font-mono text-xs font-bold text-wx-orange">
                            {String(i + 1).padStart(2, "0")}
                          </span>
                          <span className="text-sm">{b}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {!selected.hasReadme && (
                  <div className="mt-6 flex items-start gap-3 border-2 border-wx-ink bg-wx-paper2 p-4">
                    <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-wx-orange" />
                    <div className="text-sm">
                      Repo นี้ยังไม่มี README — ข้อมูลเพิ่มเติมอยู่ที่ GitHub โดยตรงเท่านั้น
                      (เราไม่เดาเนื้อหาแทน)
                    </div>
                  </div>
                )}

                {/* Tags */}
                {selected.tags.length > 0 && (
                  <div className="mt-6 flex flex-wrap gap-2">
                    {selected.tags.map((t) => (
                      <span
                        key={t}
                        className="border-2 border-wx-ink bg-wx-paper2 px-2.5 py-1 font-mono text-[10px] font-bold uppercase tracking-[0.1em]"
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
                    className="wx-btn inline-flex items-center gap-2 bg-wx-ink px-5 py-3 font-mono text-xs font-bold uppercase tracking-[0.15em] text-wx-acid"
                  >
                    <Github className="h-4 w-4" /> View on GitHub
                  </a>
                  {selected.homepage && (
                    <a
                      href={selected.homepage}
                      target="_blank"
                      rel="noreferrer"
                      className="wx-btn inline-flex items-center gap-2 border-wx-ink bg-wx-acid px-5 py-3 font-mono text-xs font-bold uppercase tracking-[0.15em]"
                    >
                      <ExternalLink className="h-4 w-4" /> Live Page
                    </a>
                  )}
                </div>

                {/* Live GitHub stats — merged from projects.auto.json */}
                {(selected.stars !== undefined ||
                  selected.forks !== undefined ||
                  selected.language ||
                  selected.updatedAt) && (
                  <div className="mt-6 grid grid-cols-2 border-2 border-wx-ink sm:grid-cols-4">
                    {selected.stars !== undefined && (
                      <div className="border-r-2 border-b-2 border-wx-ink px-3 py-2 sm:border-b-0">
                        <div className="font-mono text-[8px] uppercase tracking-[0.25em] text-wx-ink/50">
                          Stars
                        </div>
                        <div className="font-display text-sm">{selected.stars}</div>
                      </div>
                    )}
                    {selected.forks !== undefined && (
                      <div className="border-b-2 border-wx-ink px-3 py-2 sm:border-r-2 sm:border-b-0">
                        <div className="font-mono text-[8px] uppercase tracking-[0.25em] text-wx-ink/50">
                          Forks
                        </div>
                        <div className="font-display text-sm">{selected.forks}</div>
                      </div>
                    )}
                    {selected.language && (
                      <div className="border-r-2 border-wx-ink px-3 py-2">
                        <div className="font-mono text-[8px] uppercase tracking-[0.25em] text-wx-ink/50">
                          Lang
                        </div>
                        <div className="truncate font-display text-sm">{selected.language}</div>
                      </div>
                    )}
                    {selected.updatedAt && (
                      <div className="px-3 py-2">
                        <div className="font-mono text-[8px] uppercase tracking-[0.25em] text-wx-ink/50">
                          Updated
                        </div>
                        <div className="font-display text-sm">{selected.updatedAt.slice(0, 10)}</div>
                      </div>
                    )}
                  </div>
                )}

                <div className="mt-6 flex items-center gap-4 border-t-2 border-wx-ink pt-4 font-mono text-[10px] uppercase tracking-[0.18em] text-wx-ink/50">
                  <span className="inline-flex items-center gap-1">
                    <Star className="h-3 w-3" /> Open Source
                  </span>
                  <span className="inline-flex items-center gap-1">
                    <GitFork className="h-3 w-3" /> MIT License
                  </span>
                </div>
              </div>
            </motion.div>
        </div>
      )}
    </section>
  );
}
