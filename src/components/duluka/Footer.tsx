'use client';

import { Github, MessageCircle, ArrowUp } from "lucide-react";
import { DISCORD_INVITE, GITHUB_PROFILE, SERVER } from "@/data/projects";

const MARQUEE = [
  "Duluka Studio™",
  "ScotcsDuluka",
  "Open Source Forever",
  "GitHub",
  "Discord",
  "Minecraft",
  "Java + Bedrock",
  "TTML Lyrics",
  "Made in Thailand",
];

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="relative mt-auto bg-wx-ink text-wx-paper">
      {/* hazard strip */}
      <div className="wx-hazard h-3 w-full" aria-hidden />

      {/* marquee */}
      <div className="overflow-hidden border-b-2 border-wx-paper/20 py-3">
        <div className="wx-marquee-track wx-marquee-slow">
          {[0, 1].map((k) => (
            <span key={k} className="flex items-center">
              {MARQUEE.map((t) => (
                <span
                  key={`${k}-${t}`}
                  className="mx-5 inline-flex items-center gap-3 font-mono text-[11px] font-bold uppercase tracking-[0.3em] text-wx-paper/50"
                >
                  <span className="inline-block h-1.5 w-1.5 bg-wx-acid" />
                  {t}
                </span>
              ))}
            </span>
          ))}
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-10 lg:py-16">
        {/* Giant wordmark */}
        <div className="select-none overflow-hidden" aria-hidden>
          <div className="wx-stroke-paper whitespace-nowrap text-center font-display text-[18.5vw] font-black uppercase leading-[0.85]">
            Duluka
          </div>
        </div>

        {/* meta grid */}
        <div className="mt-10 grid grid-cols-1 gap-8 border-t-2 border-wx-paper/20 pt-8 md:grid-cols-4">
          <div className="md:col-span-2">
            <div className="flex items-center gap-3">
              <span className="flex h-10 w-10 rotate-3 items-center justify-center border-2 border-wx-acid bg-wx-acid font-display text-sm text-wx-ink">
                D!
              </span>
              <div className="leading-tight">
                <div className="font-display text-sm uppercase">
                  Duluka Studio<sup className="text-[8px]">™</sup>
                </div>
                <div className="font-mono text-[9px] uppercase tracking-[0.2em] text-wx-paper/40">
                  by ScotcsDuluka
                </div>
              </div>
            </div>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-wx-paper/60">
              สตูดิโอส่วนตัวของ ScotcsDuluka — ทำโปรเจกต์ที่อยากทำ เปิดซอร์สทุกตัว
              แบ่งปันความรู้และความสนุกให้ทุกคน
            </p>
            <div className="mt-5 flex gap-2">
              <a
                href={GITHUB_PROFILE}
                target="_blank"
                rel="noreferrer"
                aria-label="GitHub"
                className="flex h-10 w-10 items-center justify-center border-2 border-wx-paper/40 transition-colors hover:border-wx-acid hover:bg-wx-acid hover:text-wx-ink"
              >
                <Github className="h-4 w-4" />
              </a>
              <a
                href={DISCORD_INVITE}
                target="_blank"
                rel="noreferrer"
                aria-label="Discord"
                className="flex h-10 w-10 items-center justify-center border-2 border-wx-paper/40 transition-colors hover:border-wx-acid hover:bg-wx-acid hover:text-wx-ink"
              >
                <MessageCircle className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* Nav */}
          <div>
            <div className="mb-3 font-mono text-[10px] font-bold uppercase tracking-[0.25em] text-wx-paper/40">
              // NAVIGATE
            </div>
            <ul className="space-y-2 text-sm">
              {[
                { href: "#top", label: "Home" },
                { href: "#about", label: "About" },
                { href: "#projects", label: "Projects" },
                { href: "#server", label: "Server" },
                { href: "#rules", label: "Rules" },
                { href: "#connect", label: "Connect" },
              ].map((l) => (
                <li key={l.href}>
                  <a
                    href={l.href}
                    className="font-mono text-xs uppercase tracking-[0.15em] text-wx-paper/60 transition-colors hover:text-wx-acid"
                  >
                    → {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Server box */}
          <div>
            <div className="mb-3 font-mono text-[10px] font-bold uppercase tracking-[0.25em] text-wx-paper/40">
              // MC SERVER
            </div>
            <div className="border-2 border-wx-paper/30 p-4">
              <div className="font-mono text-[9px] uppercase tracking-[0.2em] text-wx-paper/40">
                Address
              </div>
              <div className="mt-0.5 break-all font-mono text-xs font-bold text-wx-acid">
                {SERVER.fullAddress}
              </div>
              <div className="mt-3 font-mono text-[9px] uppercase tracking-[0.2em] text-wx-paper/40">
                Versions
              </div>
              <div className="mt-0.5 text-xs text-wx-paper/70">
                Java {SERVER.java.replace("Java ", "")} · Bedrock Latest
              </div>
            </div>
          </div>
        </div>

        {/* bottom line */}
        <div className="mt-10 flex flex-col items-center justify-between gap-4 border-t-2 border-wx-paper/20 pt-6 sm:flex-row">
          <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-wx-paper/40">
            © {year} Duluka Studio — สร้างด้วยใจ ในประเทศไทย
          </div>
          <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-wx-paper/40">
            OPEN SOURCE FOREVER
          </div>
          <a
            href="#top"
            data-cursor="UP"
            className="inline-flex items-center gap-2 border-2 border-wx-paper/40 px-3 py-2 font-mono text-[10px] font-bold uppercase tracking-[0.2em] transition-colors hover:border-wx-acid hover:bg-wx-acid hover:text-wx-ink"
          >
            <ArrowUp className="h-3.5 w-3.5" /> BACK TO TOP
          </a>
        </div>
      </div>
    </footer>
  );
}
