'use client';

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Home,
  FolderGit2,
  Server,
  ScrollText,
  Sparkles,
  Github,
  MessageCircle,
  Menu,
  X,
  Heart,
} from "lucide-react";
import { GITHUB_PROFILE, DISCORD_INVITE } from "@/data/projects";

const NAV_ITEMS = [
  { id: "top", label: "Home", labelTh: "หน้าแรก", icon: Home },
  { id: "about", label: "About", labelTh: "เกี่ยวกับ", icon: Sparkles },
  { id: "projects", label: "Projects", labelTh: "โปรเจกต์", icon: FolderGit2 },
  { id: "server", label: "Server", labelTh: "เซิร์ฟเวอร์", icon: Server },
  { id: "rules", label: "Rules", labelTh: "กฎ", icon: ScrollText },
];

export default function Sidebar() {
  const [active, setActive] = useState("top");
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const sections = NAV_ITEMS.map((n) => document.getElementById(n.id));
      const scrollY = window.scrollY + 120;
      for (let i = sections.length - 1; i >= 0; i--) {
        const sec = sections[i];
        if (sec && sec.offsetTop <= scrollY) {
          setActive(NAV_ITEMS[i].id);
          return;
        }
      }
      setActive("top");
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleClick = (id: string) => {
    setMobileOpen(false);
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <>
      {/* ===== Mobile top bar ===== */}
      <div className="lg:hidden sticky top-0 z-50 flex items-center justify-between bg-[#faf6f0]/90 backdrop-blur-xl border-b border-pink-200/40 px-4 py-3">
        <button
          onClick={() => handleClick("top")}
          className="font-serif-display text-base font-bold text-[#4a3b47] tracking-tight"
          aria-label="Scroll to top"
        >
          Duluka Studio
        </button>
        <button
          aria-label="Toggle menu"
          onClick={() => setMobileOpen((o) => !o)}
          className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-pink-200 bg-white/70 text-[#4a3b47]"
        >
          {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="lg:hidden fixed inset-x-0 top-[57px] z-40 bg-[#faf6f0]/97 backdrop-blur-xl border-b border-pink-200/40 p-4"
          >
            <nav className="flex flex-col gap-1">
              {NAV_ITEMS.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleClick(item.id)}
                  className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm font-medium transition-all ${
                    active === item.id
                      ? "bg-gradient-to-r from-pink-200/70 to-purple-200/50 text-[#4a3b47]"
                      : "text-[#6b5d68] hover:bg-pink-100/50"
                  }`}
                >
                  <item.icon className="h-4 w-4" />
                  <span className="font-serif-display">{item.label}</span>
                  <span className="ml-auto text-xs text-[#6b5d68]/60">{item.labelTh}</span>
                </button>
              ))}
            </nav>
            <div className="mt-3 flex gap-2">
              <a
                href={DISCORD_INVITE}
                target="_blank"
                rel="noreferrer"
                className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-pink-400 to-fuchsia-400 px-3 py-2.5 text-sm font-bold text-white shadow-md"
              >
                <MessageCircle className="h-4 w-4" />
                Discord
              </a>
              <a
                href={GITHUB_PROFILE}
                target="_blank"
                rel="noreferrer"
                className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-purple-200 bg-white/70 px-3 py-2.5 text-sm font-bold text-[#4a3b47]"
              >
                <Github className="h-4 w-4" />
                GitHub
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ===== Desktop sidebar ===== */}
      <aside className="hidden lg:flex fixed inset-y-0 left-0 z-40 w-64 flex-col border-r border-pink-200/40 bg-[#faf6f0]/80 backdrop-blur-xl">
        {/* Nav — starts at top, no logo block */}
        <nav className="flex-1 px-4 pt-8 pb-4">
          <div className="mb-3 px-3 text-[10px] font-bold uppercase tracking-[0.2em] text-[#6b5d68]/50">
            Navigate
          </div>
          <ul className="space-y-1">
            {NAV_ITEMS.map((item, i) => {
              const isActive = active === item.id;
              return (
                <li key={item.id}>
                  <button
                    onClick={() => handleClick(item.id)}
                    className={`group relative flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all duration-200 ${
                      isActive
                        ? "bg-white/80 text-[#4a3b47] shadow-sm"
                        : "text-[#6b5d68] hover:bg-white/50 hover:text-[#4a3b47]"
                    }`}
                  >
                    {isActive && (
                      <motion.span
                        layoutId="sidebar-active"
                        className="absolute left-0 top-1/2 h-7 w-1 -translate-y-1/2 rounded-r-full bg-gradient-to-b from-pink-400 to-purple-400"
                        transition={{ type: "spring", stiffness: 400, damping: 30 }}
                      />
                    )}
                    <item.icon
                      className={`h-4 w-4 transition-transform duration-200 ${
                        isActive ? "scale-110" : "group-hover:scale-110"
                      }`}
                    />
                    <span className="font-serif-display">{item.label}</span>
                    <span className="ml-auto font-hand text-xs text-[#6b5d68]/50">
                      {item.labelTh}
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Decorative quote */}
        <div className="px-6 py-4">
          <div className="rounded-2xl border border-pink-200/50 bg-gradient-to-br from-pink-100/60 to-purple-100/40 p-4">
            <div className="font-hand text-base text-[#4a3b47]">
              &ldquo;เน้นสนุก ไม่เน้นเอาชนะ&rdquo;
            </div>
            <div className="mt-1 text-[10px] uppercase tracking-[0.16em] text-pink-500/60">
              — Server Rules
            </div>
          </div>
        </div>

        {/* Connect buttons */}
        <div className="p-4 pt-0">
          <div className="mb-2 px-3 text-[10px] font-bold uppercase tracking-[0.2em] text-[#6b5d68]/50">
            Connect
          </div>
          <div className="flex gap-2">
            <a
              href={DISCORD_INVITE}
              target="_blank"
              rel="noreferrer"
              aria-label="Discord"
              className="group flex h-11 flex-1 items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-pink-400 to-fuchsia-400 text-white shadow-md transition-transform hover:scale-105"
            >
              <MessageCircle className="h-4 w-4" />
              <span className="text-xs font-bold">Discord</span>
            </a>
            <a
              href={GITHUB_PROFILE}
              target="_blank"
              rel="noreferrer"
              aria-label="GitHub"
              className="group flex h-11 w-11 items-center justify-center rounded-xl border border-purple-200 bg-white/70 text-[#4a3b47] transition-all hover:scale-105 hover:border-pink-300"
            >
              <Github className="h-4 w-4" />
            </a>
          </div>
        </div>

        {/* Footer line */}
        <div className="px-6 py-3 border-t border-pink-200/40">
          <div className="flex items-center gap-1.5 text-[10px] text-[#6b5d68]/60">
            <Heart className="h-3 w-3 fill-pink-400 text-pink-400" />
            <span>© {new Date().getFullYear()} Duluka Studio</span>
          </div>
        </div>
      </aside>
    </>
  );
}
