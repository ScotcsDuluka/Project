'use client';

import { useEffect, useState, useCallback } from "react";
import { motion, useReducedMotion } from "framer-motion";

const STORAGE_KEY = "duluka-intro-weird-v2";

const BOOT_LINES = [
  "> BOOTING DULUKA WEIRD SYSTEMS™ v2.0 ...",
  "> MOUNTING /dev/vibes ................ OK",
  "> LOADING OPEN SOURCE PROJECTS ....... 10/10",
  "> CALIBRATING WEIRDNESS .............. 137%",
  "> ALL SYSTEMS STRANGE. READY.",
];

// SSR-safe: returns false on server, checks localStorage on client first render
function useInitialShow() {
  const [show, setShow] = useState(false);
  const [ready, setReady] = useState(false);
  useEffect(() => {
    try {
      const seen = localStorage.getItem(STORAGE_KEY);
      Promise.resolve().then(() => {
        if (!seen) setShow(true);
        setReady(true);
      });
    } catch {
      Promise.resolve().then(() => setReady(true));
    }
  }, []);
  return { show, setShow, ready };
}

export default function Intro() {
  const { show, setShow, ready } = useInitialShow();
  const reduce = useReducedMotion();
  const [lineCount, setLineCount] = useState(0);
  const [closing, setClosing] = useState(false);

  const dismiss = useCallback(() => {
    try {
      localStorage.setItem(STORAGE_KEY, "1");
    } catch {
      // ignore
    }
    // CSS fade + guaranteed unmount via timeout — no exit-animation machinery
    // that can hang when the tab is throttled (rAF suspended).
    setClosing(true);
    setTimeout(() => setShow(false), reduce ? 0 : 480);
  }, [setShow, reduce]);

  // Lock body scroll while intro is visible
  useEffect(() => {
    if (show && !closing) {
      const prev = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = prev;
      };
    }
  }, [show, closing]);

  // Type boot log lines
  useEffect(() => {
    if (!show || closing) return;
    if (lineCount >= BOOT_LINES.length) return;
    const t = setTimeout(() => setLineCount((c) => c + 1), reduce ? 60 : 380);
    return () => clearTimeout(t);
  }, [show, closing, lineCount, reduce]);

  // Auto-dismiss
  useEffect(() => {
    if (!show) return;
    const t = setTimeout(() => dismiss(), 6200);
    return () => clearTimeout(t);
  }, [show, dismiss]);

  if (!ready || !show) return null;

  const booted = lineCount >= BOOT_LINES.length;

  return (
    <div
      onClick={dismiss}
      data-cursor="SKIP"
      className="fixed inset-0 z-[200] flex cursor-pointer flex-col overflow-hidden bg-wx-ink"
      style={{
        opacity: closing ? 0 : 1,
        transition: closing ? "opacity 0.45s ease" : "none",
        pointerEvents: closing ? "none" : "auto",
      }}
    >
      {/* faint grid */}
      <div className="pointer-events-none absolute inset-0 opacity-[0.08]">
        <div className="wx-grid-bg h-full w-full" style={{ backgroundSize: "72px 72px" }} />
      </div>

      {/* top mono strip */}
      <div className="relative z-10 flex items-center justify-between border-b-2 border-wx-acid/30 px-4 py-2.5 font-mono text-[10px] uppercase tracking-[0.25em] text-wx-acid/60 sm:px-8">
        <span>DULUKA WEIRD SYSTEMS™</span>
        <span className="hidden sm:block">EST. FOREVER</span>
        <span className="wx-blink text-wx-acid">● REC</span>
      </div>

      {/* boot log */}
      <div className="relative z-10 flex flex-1 flex-col items-center justify-center px-6">
        <div className="w-full max-w-xl font-mono text-xs leading-7 text-wx-acid sm:text-sm">
          {BOOT_LINES.slice(0, lineCount).map((l, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.18 }}
              className={i === BOOT_LINES.length - 1 ? "mt-3 font-bold" : ""}
            >
              {l}
            </motion.div>
          ))}
          {!booted && <span className="wx-blink inline-block h-4 w-2.5 bg-wx-acid" />}
        </div>

        {/* Giant title reveal */}
        {booted && (
          <motion.div
            initial={reduce ? { opacity: 0 } : { opacity: 0, scale: 0.92, y: 24 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="mt-10 text-center"
          >
            <h1 className="font-display text-[16vw] font-black uppercase leading-[0.82] text-wx-acid sm:text-8xl lg:text-9xl">
              Duluka
              <br />
              <span className="wx-stroke-acid">Studio™</span>
            </h1>
            <p className="mx-auto mt-6 max-w-md font-mono text-[10px] uppercase tracking-[0.3em] text-wx-paper/60 sm:text-xs">
              สตูดิโอแปลกๆ ของ ScotcsDuluka — weird by design
            </p>
            <button
              onClick={(e) => {
                e.stopPropagation();
                dismiss();
              }}
              className="wx-btn mt-8 inline-flex items-center gap-2 border-wx-acid bg-wx-acid px-6 py-3 font-mono text-xs font-bold uppercase tracking-[0.2em] text-wx-ink"
            >
              Enter the weird →
            </button>
          </motion.div>
        )}
      </div>

      {/* bottom strip */}
      <div className="relative z-10 flex items-center justify-between border-t-2 border-wx-acid/30 px-4 py-2.5 font-mono text-[10px] uppercase tracking-[0.25em] text-wx-paper/40 sm:px-8">
        <span>คลิกที่ใดก็ได้เพื่อข้าม</span>
        <span>เห็นแค่ครั้งแรกเท่านั้น</span>
      </div>
    </div>
  );
}
