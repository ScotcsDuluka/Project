'use client';

import { useEffect, useRef } from "react";

/**
 * Pastel particle field rendered on canvas.
 * Soft pink/lavender/peach dots drifting on a cream background.
 */
export default function StarField({
  density = 60,
  className = "",
}: {
  density?: number;
  className?: string;
}) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let raf = 0;
    let w = 0;
    let h = 0;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    type Star = {
      x: number;
      y: number;
      r: number;
      a: number;
      da: number;
      vx: number;
      vy: number;
      hue: number;
      sat: number;
      light: number;
    };

    let stars: Star[] = [];

    function makeStars() {
      const palette = [
        { hue: 345, sat: 85, light: 75 }, // pink
        { hue: 280, sat: 60, light: 80 }, // lavender
        { hue: 30, sat: 85, light: 75 }, // peach
        { hue: 160, sat: 50, light: 78 }, // mint
      ];
      stars = Array.from({ length: density }, () => {
        const p = palette[Math.floor(Math.random() * palette.length)];
        return {
          x: Math.random() * w,
          y: Math.random() * h,
          r: Math.random() * 2.4 + 0.8,
          a: Math.random() * 0.5 + 0.2,
          da: (Math.random() - 0.5) * 0.01,
          vx: (Math.random() - 0.5) * 0.18,
          vy: (Math.random() - 0.5) * 0.14,
          hue: p.hue,
          sat: p.sat,
          light: p.light,
        };
      });
    }

    function resize() {
      const rect = canvas.parentElement?.getBoundingClientRect();
      w = rect?.width ?? window.innerWidth;
      h = rect?.height ?? window.innerHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      makeStars();
    }

    function draw() {
      ctx.clearRect(0, 0, w, h);
      for (const s of stars) {
        s.a += s.da;
        if (s.a < 0.1 || s.a > 0.85) s.da *= -1;
        s.x += s.vx;
        s.y += s.vy;
        if (s.x < 0) s.x = w;
        if (s.x > w) s.x = 0;
        if (s.y < 0) s.y = h;
        if (s.y > h) s.y = 0;

        const grad = ctx.createRadialGradient(s.x, s.y, 0, s.x, s.y, s.r * 5);
        grad.addColorStop(0, `hsla(${s.hue}, ${s.sat}%, ${s.light}%, ${s.a})`);
        grad.addColorStop(1, `hsla(${s.hue}, ${s.sat}%, ${s.light}%, 0)`);
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r * 5, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = `hsla(${s.hue}, ${s.sat}%, ${s.light + 5}%, ${s.a + 0.2})`;
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fill();
      }
      if (!reduce) raf = requestAnimationFrame(draw);
    }

    resize();
    window.addEventListener("resize", resize);
    if (reduce) {
      draw();
      cancelAnimationFrame(raf);
    } else {
      raf = requestAnimationFrame(draw);
    }

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, [density]);

  return (
    <canvas
      ref={canvasRef}
      className={`pointer-events-none absolute inset-0 h-full w-full ${className}`}
      aria-hidden="true"
    />
  );
}
