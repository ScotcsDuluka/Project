'use client';

import { useState } from "react";
import { motion } from "framer-motion";
import { Copy, Check, Gamepad2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { SERVER } from "@/data/projects";

type Platform = "java" | "bedrock";

export default function ServerInfo() {
  const [platform, setPlatform] = useState<Platform>("java");
  const [copied, setCopied] = useState<"ip" | "port" | "full" | null>(null);
  const { toast } = useToast();

  const copy = async (which: "ip" | "port" | "full") => {
    const value =
      which === "ip" ? SERVER.ip : which === "port" ? SERVER.port : SERVER.fullAddress;
    try {
      await navigator.clipboard.writeText(value);
      setCopied(which);
      setTimeout(() => setCopied(null), 1600);
      toast({
        title: "คัดลอกแล้ว!",
        description: `${value} — เอาไปวางในเกมได้เลย`,
      });
    } catch {
      toast({ title: "คัดลอกไม่สำเร็จ", description: "ลอง copy เองดูนะ: " + value });
    }
  };

  return (
    <section
      id="server"
      className="relative overflow-hidden border-b-2 border-wx-ink bg-wx-ink py-20 text-wx-paper lg:py-28"
    >
      {/* faint grid on dark */}
      <div className="pointer-events-none absolute inset-0 opacity-[0.07]">
        <div
          className="wx-grid-bg h-full w-full"
          style={{
            backgroundImage:
              "linear-gradient(#ece7da 1px, transparent 1px), linear-gradient(90deg, #ece7da 1px, transparent 1px)",
          }}
        />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-10">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.5 }}
          className="mb-10 flex items-center gap-4"
        >
          <span className="border-2 border-wx-acid bg-wx-acid px-3 py-1.5 font-mono text-[11px] font-bold tracking-[0.2em] text-wx-ink">
            §04
          </span>
          <span className="font-mono text-[11px] font-bold uppercase tracking-[0.3em] text-wx-acid">
            SERVER
          </span>
          <span className="h-0.5 flex-1 bg-wx-acid/40" />
          <span className="font-hand text-2xl text-wx-paper/70">เซิร์ฟเวอร์</span>
        </motion.div>

        <div className="grid grid-cols-1 items-start gap-10 lg:grid-cols-12">
          {/* Left copy */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-6"
          >
            <h2 className="font-display text-5xl font-black uppercase leading-[0.9] sm:text-6xl lg:text-7xl">
              <span className="text-wx-acid">Minecraft</span>
              <br />
              <span className="wx-stroke-paper">Server</span>
            </h2>
            <p className="mt-6 max-w-lg text-base leading-relaxed text-wx-paper/70 sm:text-lg">
              เซิร์ฟเวอร์ส่วนตัว เปิดให้เพื่อนๆ ทุกคนเข้ามาเล่นได้ฟรี —{" "}
              <span className="text-wx-acid">ไม่ต้องลง mod ที่เครื่อง</span> server
              จัดการให้หมดแล้ว ก๊อปที่อยู่ด้านขวา วางในเกม แล้วเจอกัน
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Gamepad2 className="h-5 w-5 text-wx-acid" />
              <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-wx-paper/50">
                SURVIVAL · ฟรี · Java + Bedrock ที่เดียว
              </span>
            </div>
          </motion.div>

          {/* Right: ticket */}
          <motion.div
            initial={{ opacity: 0, y: 24, rotate: 1 }}
            whileInView={{ opacity: 1, y: 0, rotate: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="lg:col-span-6"
          >
            <div className="relative border-2 border-wx-paper bg-wx-paper text-wx-ink sm:rotate-1 sm:hover:rotate-0">
              {/* ticket stub top */}
              <div className="flex items-center justify-between border-b-2 border-dashed border-wx-ink/40 bg-wx-ink px-5 py-3 font-mono text-[10px] font-bold uppercase tracking-[0.25em] text-wx-acid">
                <span>ADMIT ONE PLAYER</span>
                <span className="wx-blink">● LIVE</span>
              </div>

              <div className="p-5 sm:p-7">
                {/* platform toggle */}
                <div className="mb-6 flex items-center gap-2">
                  {(["java", "bedrock"] as Platform[]).map((pf) => (
                    <button
                      key={pf}
                      onClick={() => setPlatform(pf)}
                      className={`border-2 border-wx-ink px-4 py-2 font-mono text-[11px] font-bold uppercase tracking-[0.15em] transition-colors ${
                        platform === pf
                          ? "bg-wx-ink text-wx-acid"
                          : "bg-wx-paper hover:bg-wx-acid"
                      }`}
                    >
                      {pf === "java" ? "Java 1.21.11" : "Bedrock Latest"}
                    </button>
                  ))}
                  <span className="ml-auto hidden font-mono text-[9px] uppercase tracking-[0.2em] text-wx-ink/40 sm:block">
                    เลือกเวอร์ชัน
                  </span>
                </div>

                {/* address row */}
                <div className="border-2 border-wx-ink">
                  <div className="border-b-2 border-wx-ink bg-wx-paper2 px-4 py-1.5 font-mono text-[9px] font-bold uppercase tracking-[0.25em] text-wx-ink/60">
                    SERVER ADDRESS
                  </div>
                  <button
                    onClick={() => copy("full")}
                    data-cursor="COPY"
                    className="group flex w-full items-center justify-between gap-3 px-4 py-4 text-left transition-colors hover:bg-wx-acid"
                  >
                    <span className="min-w-0 truncate font-mono text-sm font-bold sm:text-lg">
                      {SERVER.fullAddress}
                    </span>
                    {copied === "full" ? (
                      <Check className="h-5 w-5 shrink-0" />
                    ) : (
                      <Copy className="h-5 w-5 shrink-0 opacity-40 transition-opacity group-hover:opacity-100" />
                    )}
                  </button>
                </div>

                {/* ip / port */}
                <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div className="border-2 border-wx-ink">
                    <div className="border-b-2 border-wx-ink bg-wx-paper2 px-3 py-1.5 font-mono text-[9px] font-bold uppercase tracking-[0.25em] text-wx-ink/60">
                      IP
                    </div>
                    <button
                      onClick={() => copy("ip")}
                      data-cursor="COPY"
                      className="flex w-full items-center justify-between gap-2 px-3 py-3 text-left transition-colors hover:bg-wx-acid"
                    >
                      <span className="truncate font-mono text-xs font-bold sm:text-sm">
                        {SERVER.ip}
                      </span>
                      {copied === "ip" ? (
                        <Check className="h-4 w-4 shrink-0" />
                      ) : (
                        <Copy className="h-4 w-4 shrink-0 opacity-40" />
                      )}
                    </button>
                  </div>
                  <div className="border-2 border-wx-ink">
                    <div className="border-b-2 border-wx-ink bg-wx-paper2 px-3 py-1.5 font-mono text-[9px] font-bold uppercase tracking-[0.25em] text-wx-ink/60">
                      PORT
                    </div>
                    <button
                      onClick={() => copy("port")}
                      data-cursor="COPY"
                      className="flex w-full items-center justify-between gap-2 px-3 py-3 text-left transition-colors hover:bg-wx-acid"
                    >
                      <span className="font-mono text-xs font-bold sm:text-sm">
                        {SERVER.port}
                      </span>
                      {copied === "port" ? (
                        <Check className="h-4 w-4 shrink-0" />
                      ) : (
                        <Copy className="h-4 w-4 shrink-0 opacity-40" />
                      )}
                    </button>
                  </div>
                </div>

                {/* barcode footer */}
                <div className="mt-6 flex items-end justify-between gap-4">
                  <div>
                    <div className="font-mono text-[9px] uppercase tracking-[0.25em] text-wx-ink/50">
                      Serial
                    </div>
                    <div className="font-mono text-xs font-bold">
                      DULUKA-{SERVER.port}-{new Date().getFullYear()}
                    </div>
                  </div>
                  <div className="wx-barcode h-10 w-32" aria-hidden />
                </div>
              </div>

              {/* stub bottom */}
              <div className="flex items-center justify-between border-t-2 border-dashed border-wx-ink/40 px-5 py-3 font-mono text-[9px] uppercase tracking-[0.2em] text-wx-ink/50">
                <span>NO REFUNDS · NO MODS NEEDED</span>
                <span>VOID WHERE PROHIBITED</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
