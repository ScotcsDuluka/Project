'use client';

import { Github, MessageCircle, ArrowUp, Heart } from "lucide-react";
import { DISCORD_INVITE, GITHUB_PROFILE, SERVER } from "@/data/projects";

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="relative mt-auto border-t border-pink-200/60 bg-[#faf6f0]">
      {/* Marquee */}
      <div className="overflow-hidden border-b border-pink-100 py-3">
        <div className="duluka-marquee-track text-xs uppercase tracking-[0.3em] text-[#6b5d68]/40">
          {Array.from({ length: 2 }).map((_, k) => (
            <span key={k} className="flex">
              {[
                "Duluka Studio",
                "ScotcsDuluka",
                "Open Source",
                "GitHub",
                "Discord",
                "Minecraft",
                "Java + Bedrock",
                "TTML Lyrics",
              ].map((t) => (
                <span key={`${k}-${t}`} className="mx-6 inline-flex items-center gap-3">
                  <span className="h-1 w-1 rounded-full bg-pink-400" />
                  {t}
                </span>
              ))}
            </span>
          ))}
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-6 py-10 lg:px-12">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          {/* Brand */}
          <div className="md:col-span-2">
            <h3 className="font-serif-display text-2xl font-black text-[#4a3b47]">
              Duluka Studio
            </h3>
            <p className="mt-3 max-w-md text-sm leading-relaxed text-[#6b5d68]">
              โปรเจกต์เปิดซอร์สของ ScotcsDuluka — screen capture, Magisk mods,
              Minecraft server, TTML lyrics และอื่นๆ.
            </p>
            <div className="mt-5 flex items-center gap-3">
              <a
                href={GITHUB_PROFILE}
                target="_blank"
                rel="noreferrer"
                aria-label="GitHub"
                className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-pink-200 bg-white/70 text-[#6b5d68] transition-all hover:scale-110 hover:border-pink-400 hover:text-pink-600"
              >
                <Github className="h-4 w-4" />
              </a>
              <a
                href={DISCORD_INVITE}
                target="_blank"
                rel="noreferrer"
                aria-label="Discord"
                className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-pink-200 bg-white/70 text-[#6b5d68] transition-all hover:scale-110 hover:border-pink-400 hover:text-pink-600"
              >
                <MessageCircle className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* Links */}
          <div>
            <div className="mb-3 text-[10px] font-bold uppercase tracking-[0.18em] text-[#6b5d68]/50">
              Navigate
            </div>
            <ul className="space-y-2 text-sm">
              {[
                { href: "#top", label: "Home" },
                { href: "#about", label: "About" },
                { href: "#projects", label: "Projects" },
                { href: "#server", label: "Server" },
                { href: "#rules", label: "Rules" },
              ].map((l) => (
                <li key={l.href}>
                  <a
                    href={l.href}
                    className="text-[#6b5d68] transition-colors hover:text-pink-600"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Server info */}
          <div>
            <div className="mb-3 text-[10px] font-bold uppercase tracking-[0.18em] text-[#6b5d68]/50">
              Server
            </div>
            <div className="rounded-2xl border border-pink-200/60 bg-white/70 p-4">
              <div className="text-[10px] uppercase tracking-[0.16em] text-[#6b5d68]/50">
                Address
              </div>
              <div className="mt-1 font-mono text-xs text-pink-700">{SERVER.fullAddress}</div>
              <div className="mt-3 text-[10px] uppercase tracking-[0.16em] text-[#6b5d68]/50">
                Editions
              </div>
              <div className="mt-1 text-xs text-[#6b5d68]">Java 1.21.11 · Bedrock Latest</div>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-8 flex flex-col items-center justify-between gap-3 border-t border-pink-100 pt-5 sm:flex-row">
          <div className="flex items-center gap-1.5 text-xs text-[#6b5d68]/60">
            <Heart className="h-3 w-3 fill-pink-400 text-pink-400" />
            <span>© {year} Duluka Studio · ScotcsDuluka</span>
          </div>
          <a
            href="#top"
            className="inline-flex items-center gap-1.5 rounded-full border border-pink-200 bg-white/70 px-3 py-1.5 text-xs font-bold text-[#6b5d68] transition-all hover:border-pink-400 hover:text-pink-600"
          >
            <ArrowUp className="h-3.5 w-3.5" />
            Back to top
          </a>
        </div>
      </div>
    </footer>
  );
}
