'use client';

import { useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

const STORAGE_KEY = "duluka-intro-seen-v2";

export default function Intro() {
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

  const dismiss = useCallback(() => {
    try {
      localStorage.setItem(STORAGE_KEY, "1");
    } catch {
      // ignore
    }
    setShow(false);
  }, []);

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

  // Auto-dismiss after 4.5s (movie-style — short and clean)
  useEffect(() => {
    if (!show) return;
    const t = setTimeout(() => dismiss(), 4500);
    return () => clearTimeout(t);
  }, [show, dismiss]);

  if (!ready) return null;

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.8, ease: "easeInOut" } }}
          onClick={dismiss}
          className="fixed inset-0 z-[200] flex cursor-pointer items-center justify-center overflow-hidden bg-black"
        >
          {/* Cinematic letterbox bars (top + bottom) */}
          <motion.div
            initial={{ height: "50%" }}
            animate={{ height: "8%" }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
            className="absolute top-0 left-0 w-full bg-black z-10"
          />
          <motion.div
            initial={{ height: "50%" }}
            animate={{ height: "8%" }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
            className="absolute bottom-0 left-0 w-full bg-black z-10"
          />

          {/* Center content — minimal, movie-style */}
          <div className="relative z-20 px-6 text-center">
            {/* "Presents" — small caps, fades in first */}
            <motion.div
              initial={{ opacity: 0, letterSpacing: "0.5em" }}
              animate={{ opacity: 1, letterSpacing: "0.4em" }}
              transition={{ duration: 1.4, delay: 0.6, ease: "easeOut" }}
              className="text-[10px] sm:text-xs uppercase tracking-[0.4em] text-white/40 font-light"
            >
              presents
            </motion.div>

            {/* Studio name — fades in slow, big serif */}
            <motion.h1
              initial={{ opacity: 0, y: 20, filter: "blur(8px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ duration: 1.6, delay: 1.4, ease: [0.16, 1, 0.3, 1] }}
              className="mt-6 font-serif-display text-5xl font-black tracking-tight text-white sm:text-7xl md:text-8xl"
            >
              Duluka Studio
            </motion.h1>

            {/* Thin line — draws in after title */}
            <motion.div
              initial={{ scaleX: 0, opacity: 0 }}
              animate={{ scaleX: 1, opacity: 1 }}
              transition={{ duration: 1.2, delay: 2.4, ease: "easeOut" }}
              className="mx-auto mt-6 h-px w-24 origin-center bg-white/30"
            />
          </div>

          {/* Tiny skip hint — bottom corner, very subtle */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.3 }}
            transition={{ duration: 0.6, delay: 3 }}
            className="absolute bottom-12 left-1/2 -translate-x-1/2 z-20 text-[10px] uppercase tracking-[0.2em] text-white/40"
          >
            click to skip
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
