'use client';

import { useEffect, useState } from "react";

/**
 * Soft glowing circle that follows the cursor on desktop.
 * Hidden on touch devices and reduced-motion mode.
 * Uses transform3d for GPU acceleration — single element, very cheap.
 */
export default function CursorGlow() {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    // Only enable on devices with fine pointer (mouse)
    const mq = window.matchMedia("(pointer: fine)");
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (!mq.matches || reduce.matches) return;

    let raf = 0;
    let targetX = -100;
    let targetY = -100;
    let curX = -100;
    let curY = -100;
    let active = true;

    const onMove = (e: MouseEvent) => {
      targetX = e.clientX;
      targetY = e.clientY;
    };

    const onLeave = () => {
      targetX = -100;
      targetY = -100;
    };

    const tick = () => {
      if (!active) return;
      // Lerp for smooth follow
      curX += (targetX - curX) * 0.15;
      curY += (targetY - curY) * 0.15;
      setPos({ x: curX, y: curY });
      raf = requestAnimationFrame(tick);
    };

    // Schedule enable + start loop outside synchronous effect body
    Promise.resolve().then(() => {
      setEnabled(true);
      raf = requestAnimationFrame(tick);
    });

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseleave", onLeave);

    return () => {
      active = false;
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseleave", onLeave);
      cancelAnimationFrame(raf);
    };
  }, []);

  if (!enabled) return null;

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed left-0 top-0 z-[55] h-[280px] w-[280px] rounded-full opacity-50 mix-blend-multiply"
      style={{
        transform: `translate3d(${pos.x - 140}px, ${pos.y - 140}px, 0)`,
        background:
          "radial-gradient(circle, rgba(255,143,171,0.35) 0%, rgba(184,164,212,0.18) 35%, transparent 70%)",
        transition: "opacity 0.3s ease",
      }}
    />
  );
}
