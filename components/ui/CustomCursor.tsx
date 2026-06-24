"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function CustomCursor() {
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  const springConfig = { damping: 25, stiffness: 300, mass: 0.2 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  useEffect(() => {
    // Return early on touch/coarse-pointer devices (phones, tablets).
    // matchMedia is checked inside useEffect so SSR is never touched.
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX - 16);
      cursorY.set(e.clientY - 16);

      // Reveal on the very first mouse movement so the dot never
      // flashes at (0, 0) before the user has moved the mouse.
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const isPointer =
        window.getComputedStyle(target).cursor === "pointer" ||
        target.tagName.toLowerCase() === "a" ||
        target.tagName.toLowerCase() === "button";
      setIsHovered(isPointer);
    };

    window.addEventListener("mousemove", moveCursor);
    window.addEventListener("mouseover", handleMouseOver);

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      window.removeEventListener("mouseover", handleMouseOver);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);                          // cursorX / cursorY are stable MotionValues

  // Nothing to render on touch devices — bail out after hooks so the
  // Rules of Hooks are satisfied (hooks are always called, return is after).
  // The early-return in useEffect already skips all listeners, so this
  // component becomes a true no-op on coarse-pointer screens.
  if (typeof window !== "undefined" &&
      window.matchMedia("(pointer: coarse)").matches) {
    return null;
  }

  return (
    <motion.div
      className="fixed top-0 left-0 w-8 h-8 bg-white/20 backdrop-blur-md border border-white/50 rounded-full pointer-events-none z-[9999] mix-blend-difference flex items-center justify-center"
      style={{
        x: cursorXSpring,
        y: cursorYSpring,
      }}
      animate={{
        scale: isHovered ? 1.5 : 1,
        backgroundColor: isHovered
          ? "rgba(255, 255, 255, 0.8)"
          : "rgba(255, 255, 255, 0.2)",
        opacity: isVisible ? 1 : 0,
      }}
      transition={{
        scale: { duration: 0.2 },
        backgroundColor: { duration: 0.2 },
        // Smooth fade-in on first appearance; instant fade-out never fires
        // because we only ever go false → true, never back.
        opacity: { duration: 0.3, ease: "easeOut" },
      }}
    />
  );
}