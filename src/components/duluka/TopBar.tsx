'use client';

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Github, Menu, X, MessageCircle } from "lucide-react";
import { GITHUB_PROFILE, DISCORD_INVITE } from "@/data/projects";

const NAV_ITEMS = [
  { id: "top", num: "01", label: "HOME", th: "หน้าแรก" },
  { id: "about", num: "02", label: "ABOUT", th: "เกี่ยวกับ" },
  { id: "projects", num: "03", label: "PROJECTS", th: "โปรเจกต์" },
  { id: "server", num: "04", label: "SERVER", th: "เซิร์ฟเวอร์" },
  { id: "rules", num: "05", label: "RULES", th: "กฎ" },
  { id: "connect", num: "06", label: "CONNECT", th: "ติดต่อ" },
];

const TICKER =
  "OPEN SOURCE ★ สตูดิโอแปลกๆ ★ NO BORING WEBSITES ★ EST. FOREVER ★ MADE IN THAILAND ★ 100% WEIRD ★ ";

function useClock() {
  const [time, setTime] = useState("");
  useEffect(() => {
    const tick = () => {
      setTime(
        new Intl.DateTimeFormat("en-GB", {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: false,
          timeZone: "Asia/Bangkok",
        }).format(new Date())
      );
    };
    tick();
    const t = setInterval(tick, 1000);
    return () => clearInterval(t);
  }, []);
  return time;
}

export default function TopBar() {
  const [active, setActive] = useState("top");
  const [mobileOpen, setMobileOpen] = useState(false);
  const time = useClock();

  useEffect(() => {
    const onScroll = () => {
      const sections = NAV_ITEMS.map((n) => document.getElementById(n.id));
      const scrollY = window.scrollY + 140;
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
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-[60] border-b-2 border-wx-ink bg-wx-paper">
        {/* Ticker strip */}
        <div className="overflow-hidden border-b-2 border-wx-ink bg-wx-acid py-1">
          <div className="wx-marquee-track font-mono text-[10px] font-bold uppercase tracking-[0.22em] text-wx-ink">
            <span className="pr-2">{TICKER.repeat(3)}</span>
            <span className="pr-2">{TICKER.repeat(3)}</span>
          </div>
        </div>

        {/* Main bar */}
        <div className="flex h-14 items-center justify-between px-4 sm:px-6">
          {/* Logo */}
          <button
            onClick={() => handleClick("top")}
            className="group flex items-center gap-2.5"
            aria-label="Duluka Studio home"
            data-cursor="TOP"
          >
            <span className="flex h-9 w-9 rotate-3 items-center justify-center border-2 border-wx-ink bg-wx-ink font-display text-sm text-wx-acid transition-transform duration-200 group-hover:-rotate-6">
              D!
            </span>
            <span className="flex flex-col items-start leading-none">
              <span className="font-display text-sm uppercase tracking-tight">
                Duluka Studio<sup className="text-[8px]">™</sup>
              </span>
              <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-wx-ink/50">
                Weird Systems Division
              </span>
            </span>
          </button>

          {/* Desktop nav */}
          <nav className="hidden items-center gap-1 lg:flex" aria-label="Main">
            {NAV_ITEMS.map((item) => {
              const isActive = active === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleClick(item.id)}
                  className={`group relative px-3 py-2 font-mono text-[11px] font-bold uppercase tracking-[0.14em] transition-colors ${
                    isActive
                      ? "bg-wx-ink text-wx-acid"
                      : "text-wx-ink hover:bg-wx-ink hover:text-wx-acid"
                  }`}
                >
                  <span className="mr-1.5 opacity-50">{item.num}</span>
                  {item.label}
                </button>
              );
            })}
          </nav>

          {/* Right side */}
          <div className="flex items-center gap-2">
            <span className="hidden items-center gap-2 border-2 border-wx-ink bg-wx-paper2 px-2.5 py-1.5 font-mono text-[10px] font-bold tracking-[0.12em] md:inline-flex">
              <span className="inline-block h-1.5 w-1.5 animate-pulse bg-wx-orange" />
              BKK {time || "--:--:--"}
            </span>
            <a
              href={GITHUB_PROFILE}
              target="_blank"
              rel="noreferrer"
              aria-label="GitHub"
              data-cursor="GIT"
              className="flex h-9 w-9 items-center justify-center border-2 border-wx-ink bg-wx-paper text-wx-ink transition-colors hover:bg-wx-ink hover:text-wx-acid"
            >
              <Github className="h-4 w-4" />
            </a>
            <button
              aria-label="Toggle menu"
              onClick={() => setMobileOpen((o) => !o)}
              className="flex h-9 w-9 items-center justify-center border-2 border-wx-ink bg-wx-acid text-wx-ink lg:hidden"
            >
              {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile fullscreen menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: "-4%" }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: "-4%" }}
            transition={{ duration: 0.22 }}
            className="fixed inset-0 z-[55] flex flex-col bg-wx-acid lg:hidden"
          >
            <div className="wx-hazard h-3 w-full" />
            <nav className="flex flex-1 flex-col justify-center gap-1 px-6" aria-label="Mobile">
              {NAV_ITEMS.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleClick(item.id)}
                  className={`group flex items-baseline gap-3 border-b-2 border-wx-ink/15 py-3 text-left transition-transform hover:translate-x-2 ${
                    active === item.id ? "opacity-100" : "opacity-70"
                  }`}
                >
                  <span className="font-mono text-xs font-bold">{item.num}</span>
                  <span className="font-display text-4xl uppercase leading-none">{item.label}</span>
                  <span className="ml-auto font-mono text-[10px] uppercase tracking-[0.2em]">
                    {item.th}
                  </span>
                </button>
              ))}
            </nav>
            <div className="flex gap-2 border-t-2 border-wx-ink px-6 py-4">
              <a
                href={DISCORD_INVITE}
                target="_blank"
                rel="noreferrer"
                className="wx-btn flex flex-1 items-center justify-center gap-2 bg-wx-ink px-4 py-3 font-mono text-xs font-bold uppercase tracking-[0.15em] text-wx-acid"
              >
                <MessageCircle className="h-4 w-4" /> Discord
              </a>
              <a
                href={GITHUB_PROFILE}
                target="_blank"
                rel="noreferrer"
                className="wx-btn flex flex-1 items-center justify-center gap-2 border-wx-ink bg-wx-paper px-4 py-3 font-mono text-xs font-bold uppercase tracking-[0.15em]"
              >
                <Github className="h-4 w-4" /> GitHub
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
