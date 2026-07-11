'use client';

import { useState } from "react";
import { motion } from "framer-motion";
import { Server, Copy, Check, Gamepad2, Boxes, Terminal, Sparkles, Wifi } from "lucide-react";
import { SERVER } from "@/data/projects";
import { useToast } from "@/hooks/use-toast";

type Platform = "java" | "bedrock";

export default function ServerInfo() {
  const [platform, setPlatform] = useState<Platform>("java");
  const [copied, setCopied] = useState<"ip" | "port" | "full" | null>(null);
  const { toast } = useToast();

  const copy = async (which: "ip" | "port" | "full") => {
    const value = which === "ip" ? SERVER.ip : which === "port" ? SERVER.port : SERVER.fullAddress;
    try {
      await navigator.clipboard.writeText(value);
    } catch {
      // ignore
    }
    setCopied(which);
    toast({ title: "Copied!", description: value });
    setTimeout(() => setCopied(null), 1800);
  };

  return (
    <section id="server" className="relative overflow-hidden bg-gradient-to-b from-[#faf6f0] to-[#fde2e4]/30 py-20 lg:py-28">
      {/* Backdrop */}
      <div className="pointer-events-none absolute left-1/4 top-0 h-72 w-72 rounded-full bg-pink-200/30 blur-[60px]" />
      <div className="absolute inset-0 duluka-dots-bg opacity-40" aria-hidden />

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
                §02
              </div>
              <div className="font-hand text-2xl text-pink-500 mt-1">เซิร์ฟเวอร์</div>
            </div>
          </div>
          <div className="lg:col-span-9">
            <h2 className="font-serif-display text-4xl sm:text-5xl lg:text-6xl font-black leading-[1.05] text-[#4a3b47]">
              <span className="duluka-text-gradient italic">Minecraft</span>
              <br />
              Server
            </h2>
            <p className="mt-5 max-w-2xl text-base text-[#6b5d68] sm:text-lg">
              Java 1.21.11 และ Bedrock Latest ใช้ IP เดียวกัน — เลือก edition แล้วกด copy ได้เลย
            </p>
          </div>
        </motion.div>

        {/* Platform toggle */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="lg:ml-[25%] flex max-w-sm"
        >
          <div className="relative inline-flex w-full rounded-full border-2 border-pink-200 bg-white/70 p-1 backdrop-blur-sm">
            <motion.span
              layout
              transition={{ type: "spring", stiffness: 400, damping: 35 }}
              className={`absolute inset-y-1 w-[calc(50%-4px)] rounded-full bg-gradient-to-r from-pink-400 to-fuchsia-400 shadow-md ${
                platform === "java" ? "left-1" : "left-[calc(50%+0px)]"
              }`}
            />
            <button
              onClick={() => setPlatform("java")}
              className={`relative z-10 flex flex-1 items-center justify-center gap-1.5 rounded-full px-4 py-2 text-sm font-bold transition-colors ${
                platform === "java" ? "text-white" : "text-[#6b5d68]"
              }`}
            >
              <Gamepad2 className="h-4 w-4" />
              Java
            </button>
            <button
              onClick={() => setPlatform("bedrock")}
              className={`relative z-10 flex flex-1 items-center justify-center gap-1.5 rounded-full px-4 py-2 text-sm font-bold transition-colors ${
                platform === "bedrock" ? "text-white" : "text-[#6b5d68]"
              }`}
            >
              <Boxes className="h-4 w-4" />
              Bedrock
            </button>
          </div>
        </motion.div>

        {/* Address card — editorial style */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7 }}
          className="lg:ml-[25%] mt-8 relative"
        >
          {/* Stacked paper effect */}
          <div className="absolute inset-0 translate-x-2 translate-y-2 rotate-1 rounded-3xl bg-purple-200/50" />
          <div className="absolute inset-0 translate-x-1 translate-y-1 rotate-0.5 rounded-3xl bg-pink-200/60" />

          <div className="relative rounded-3xl border-2 border-pink-200 bg-white/85 p-6 backdrop-blur-sm duluka-shadow-card sm:p-8">
            {/* Big address block */}
            <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <div className="mb-2 flex items-center gap-2">
                  <Wifi className="h-3.5 w-3.5 text-pink-500" />
                  <span className="text-[10px] uppercase tracking-[0.2em] text-pink-500/70">
                    {platform === "java" ? "Java Edition Address" : "Bedrock Edition Address"}
                  </span>
                </div>
                <div className="font-serif-display text-2xl font-black text-[#4a3b47] sm:text-3xl">
                  {SERVER.fullAddress}
                </div>
                <div className="mt-1 font-hand text-base text-pink-500/80">
                  {platform === "java" ? SERVER.java : SERVER.bedrock}
                </div>
              </div>
              <button
                onClick={() => copy("full")}
                className="duluka-shine group inline-flex shrink-0 items-center gap-2 overflow-hidden rounded-full bg-gradient-to-r from-pink-400 to-fuchsia-400 px-5 py-3 text-sm font-bold text-white shadow-md transition-transform hover:scale-105"
              >
                {copied === "full" ? (
                  <>
                    <Check className="h-4 w-4" /> Copied!
                  </>
                ) : (
                  <>
                    <Copy className="h-4 w-4 transition-transform group-hover:-translate-y-0.5" />
                    Copy
                  </>
                )}
              </button>
            </div>

            {/* IP & Port mini-cards */}
            <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
              <button
                onClick={() => copy("ip")}
                className="group flex items-center justify-between rounded-2xl border border-pink-200/70 bg-pink-50/60 px-4 py-3 text-left transition-all hover:border-pink-300 hover:bg-pink-100/60"
              >
                <div>
                  <div className="text-[10px] uppercase tracking-[0.18em] text-[#6b5d68]/60">IP</div>
                  <div className="mt-0.5 font-mono text-sm font-bold text-[#4a3b47]">{SERVER.ip}</div>
                </div>
                <div className="text-pink-500 transition-transform group-hover:scale-110">
                  {copied === "ip" ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                </div>
              </button>
              <button
                onClick={() => copy("port")}
                className="group flex items-center justify-between rounded-2xl border border-purple-200/70 bg-purple-50/60 px-4 py-3 text-left transition-all hover:border-purple-300 hover:bg-purple-100/60"
              >
                <div>
                  <div className="text-[10px] uppercase tracking-[0.18em] text-[#6b5d68]/60">Port</div>
                  <div className="mt-0.5 font-mono text-sm font-bold text-[#4a3b47]">{SERVER.port}</div>
                </div>
                <div className="text-purple-500 transition-transform group-hover:scale-110">
                  {copied === "port" ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                </div>
              </button>
            </div>

            {/* Quick connect steps */}
            <div className="mt-6 rounded-2xl border border-pink-100 bg-pink-50/40 p-4">
              <div className="mb-3 flex items-center gap-2">
                <Terminal className="h-3.5 w-3.5 text-pink-500" />
                <span className="text-[10px] uppercase tracking-[0.18em] text-pink-500/70">
                  Quick connect
                </span>
              </div>
              <ol className="space-y-2.5">
                {[
                  `เปิด Minecraft ${platform === "java" ? "Java 1.21.11" : "Bedrock (Latest)"}`,
                  platform === "java"
                    ? "Add Server แล้ววาง address ด้านบน"
                    : "Add Server โดยใส่ IP กับ Port แยกกัน",
                  "กด Join เข้าเล่นได้เลย",
                ].map((step, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="editorial-number text-base shrink-0">{i + 1}</span>
                    <span className="text-sm text-[#6b5d68] pt-1">{step}</span>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </motion.div>

        {/* Bottom info row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="lg:ml-[25%] mt-6 grid max-w-3xl grid-cols-1 gap-3 sm:grid-cols-3"
        >
          {[
            { icon: Server, label: "Editions", value: "Java + Bedrock", emoji: "🌐" },
            { icon: Sparkles, label: "Mods", value: "MCDMods Plus", emoji: "📦" },
            { icon: Wifi, label: "Status", value: "Community-run", emoji: "🟢" },
          ].map((s) => (
            <div
              key={s.label}
              className="flex items-center gap-3 rounded-2xl border border-pink-200/60 bg-white/60 px-4 py-3 backdrop-blur-sm"
            >
              <span className="text-xl">{s.emoji}</span>
              <div>
                <div className="text-[10px] uppercase tracking-[0.16em] text-[#6b5d68]/60">
                  {s.label}
                </div>
                <div className="text-sm font-bold text-[#4a3b47]">{s.value}</div>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
