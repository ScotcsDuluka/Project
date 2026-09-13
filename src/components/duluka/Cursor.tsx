'use client';

import { useEffect, useRef, useState } from "react";

/**
 * Weird Systems™ cursor follower — a small acid square that chases the
 * pointer and grows into a labelled chip over [data-cursor] targets.
 * Rendered only for fine pointers (mouse) with motion allowed.
 */
export default function Cursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const [label, setLabel] = useState<string | null>(null);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)").matches;
    const noMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || noMotion) return;
    setEnabled(true);
  }, []);

  useEffect(() => {
    if (!enabled) return;

    const pos = { x: -100, y: -100 };
    const target = { x: -100, y: -100 };
    let raf = 0;
    let visible = false;

    const onMove = (e: MouseEvent) => {
      target.x = e.clientX;
      target.y = e.clientY;
      if (!visible) {
        visible = true;
        pos.x = target.x;
        pos.y = target.y;
        if (dotRef.current) dotRef.current.style.opacity = "1";
      }
      const el = (e.target as Element | null)?.closest?.("[data-cursor]");
      setLabel(el ? el.getAttribute("data-cursor") || " " : null);
    };

    const tick = () => {
      pos.x += (target.x - pos.x) * 0.18;
      pos.y += (target.y - pos.y) * 0.18;
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${pos.x}px, ${pos.y}px, 0) translate(-50%, -50%)`;
      }
      raf = requestAnimationFrame(tick);
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    raf = requestAnimationFrame(tick);
    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf);
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <div
      ref={dotRef}
      aria-hidden
      className="pointer-events-none fixed left-0 top-0 z-[150] opacity-0 transition-opacity duration-300"
    >
      <div
        className={`flex -translate-x-1/2 -translate-y-1/2 items-center justify-center border-2 border-wx-ink transition-all duration-150 ${
          label
            ? "h-14 w-14 bg-wx-acid rotate-45"
            : "h-3.5 w-3.5 bg-wx-orange"
        }`}
      >
        {label && (
          <span className="-rotate-45 font-mono text-[9px] font-bold uppercase leading-none text-wx-ink">
            {label}
          </span>
        )}
      </div>
    </div>
  );
}
