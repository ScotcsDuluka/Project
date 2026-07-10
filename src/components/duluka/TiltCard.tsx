'use client';

import { useRef, useState, ReactNode } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

/**
 * Wraps children with a 3D tilt effect on hover.
 * Uses motion values + spring for smooth, GPU-accelerated transforms.
 * Disabled on touch devices (handled by hover state being inactive).
 */
export default function TiltCard({
  children,
  className = "",
  max = 6, // max degrees of tilt
  scale = 1.02, // hover scale
}: {
  children: ReactNode;
  className?: string;
  max?: number;
  scale?: number;
}) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [hovering, setHovering] = useState(false);

  // Mouse position in range [-0.5, 0.5]
  const mx = useMotionValue(0);
  const my = useMotionValue(0);

  // Smoothed spring versions
  const sx = useSpring(mx, { stiffness: 200, damping: 20 });
  const sy = useSpring(my, { stiffness: 200, damping: 20 });

  // Map to rotation degrees
  const rotateX = useTransform(sy, [-0.5, 0.5], [max, -max]);
  const rotateY = useTransform(sx, [-0.5, 0.5], [-max, max]);

  const onMove = (e: React.MouseEvent) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    mx.set(x);
    my.set(y);
  };

  const onEnter = () => setHovering(true);
  const onLeave = () => {
    setHovering(false);
    mx.set(0);
    my.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMove}
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
        transformPerspective: 1000,
      }}
      animate={{ scale: hovering ? scale : 1 }}
      transition={{ scale: { duration: 0.2 } }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
