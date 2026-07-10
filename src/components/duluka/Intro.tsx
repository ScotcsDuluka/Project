'use client';

import { useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import StarField from "./StarField";

const STORAGE_KEY = "duluka-intro-seen-v1";

// SSR-safe: returns false on server, checks localStorage on client first render
function useInitialShow() {
  const [show, setShow] = useState(false);
  const [ready, setReady] = useState(false);
  useEffect(() => {
    try {
      const seen = localStorage.getItem(STORAGE_KEY);
      // schedule state update outside the synchronous effect body
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

  const dismiss = useCallback(() => {
    try {
      localStorage.setItem(STORAGE_KEY, "1");
    } catch {
      // ignore
    }
    setShow(false);
  }, [setShow]);

  // Lock body scroll while intro is visible
  useEffect(() => {
    if (show) {
      const prev = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = prev;
      };
    }
  }, [show]);

  // Auto-dismiss after 5.5s (only if user hasn't dismissed)
  useEffect(() => {
    if (!show) return;
    const t = setTimeout(() => dismiss(), 5500);
    return () => clearTimeout(t);
  }, [show, dismiss]);

  // Don't render anything until we've checked localStorage
  if (!ready) return null;

  const titleWords = ["Duluka", "Studio"];

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.6, ease: "easeInOut" } }}
          onClick={dismiss}
          className="fixed inset-0 z-[200] flex cursor-pointer items-center justify-center overflow-hidden bg-gradient-to-br from-[#faf6f0] via-[#fde2e4]/40 to-[#e6e0f8]/50"
        >
          {/* Background */}
          <div className="absolute inset-0 duluka-dots-bg opacity-50" aria-hidden />
          <StarField density={30} />

          {/* Floating soft blobs — reduced to 2 with smaller blur for GPU */}
          <motion.div
            aria-hidden
            className="pointer-events-none absolute -top-32 -left-32 h-80 w-80 rounded-full bg-pink-300/25 blur-[70px]"
            animate={reduce ? undefined : { x: [0, 30, 0], y: [0, 20, 0] }}
            transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            aria-hidden
            className="pointer-events-none absolute -bottom-32 -right-32 h-96 w-96 rounded-full bg-purple-300/20 blur-[80px]"
            animate={reduce ? undefined : { x: [0, -25, 0], y: [0, -15, 0] }}
            transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
          />

          {/* Center content */}
          <div className="relative z-10 px-6 text-center">
            {/* Eyebrow */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mb-6 inline-flex items-center gap-2"
            >
              <span className="sticker">
                <Sparkles className="h-3 w-3 text-pink-500" />
                Present
              </span>
            </motion.div>

            {/* Big serif title */}
            <h1 className="font-serif-display text-6xl font-black leading-[0.95] tracking-tight text-[#4a3b47] sm:text-7xl md:text-8xl lg:text-9xl">
              {titleWords.map((w, i) => (
                <motion.span
                  key={w}
                  initial={{ opacity: 0, y: 40, filter: "blur(12px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  transition={{
                    duration: 0.9,
                    delay: 0.4 + i * 0.25,
                    ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
                  }}
                  className={`inline-block ${i === 0 ? "duluka-text-gradient" : "text-[#4a3b47] italic"}`}
                >
                  {w}
                  {i === 0 && <span className="inline-block">&nbsp;</span>}
                </motion.span>
              ))}
            </h1>

            {/* Decorative line */}
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.8, delay: 1.2 }}
              className="mx-auto mt-6 h-0.5 w-32 origin-center bg-gradient-to-r from-transparent via-pink-400 to-transparent"
            />

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 1.4 }}
              className="mx-auto mt-6 max-w-md text-base text-[#6b5d68] sm:text-lg"
            >
              สตูดิโอส่วนตัวของ{" "}
              <span className="font-hand text-xl text-pink-500">ScotcsDuluka</span>
              <br />
              โปรเจกต์เปิดซอร์สหลากหลาย — screen capture, Magisk mods, Minecraft & more
            </motion.p>

            {/* Progress bar */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4, delay: 1.8 }}
              className="mx-auto mt-10 h-1 w-48 overflow-hidden rounded-full bg-pink-100"
            >
              <motion.div
                initial={{ x: "-100%" }}
                animate={{ x: "0%" }}
                transition={{ duration: 4, ease: "linear", delay: 1.8 }}
                className="h-full w-full bg-gradient-to-r from-pink-400 via-fuchsia-400 to-purple-400"
              />
            </motion.div>

            {/* Click to enter */}
            <motion.button
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 2.2 }}
              onClick={(e) => {
                e.stopPropagation();
                dismiss();
              }}
              className="group mt-8 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-pink-400 to-fuchsia-400 px-6 py-3 text-sm font-bold text-white shadow-lg transition-transform hover:scale-105"
            >
              เข้าสู่เว็บ
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </motion.button>

            {/* Skip hint */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 2.6 }}
              className="mt-4 text-[10px] uppercase tracking-[0.2em] text-[#6b5d68]/50"
            >
              คลิกที่ใดก็ได้เพื่อข้าม · จะแสดงแค่ครั้งแรก
            </motion.div>
          </div>

          {/* Bottom corner branding */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 2.8 }}
            className="absolute bottom-6 left-1/2 -translate-x-1/2 text-center"
          >
            <div className="font-hand text-sm text-pink-500/60">
              made with 💖 by ScotcsDuluka
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
