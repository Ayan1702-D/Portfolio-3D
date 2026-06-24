"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function CustomCursor() {
  const [isHovered, setIsHovered]   = useState(false);
  const [isVisible, setIsVisible]   = useState(false);

  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  const springConfig   = { damping: 25, stiffness: 300, mass: 0.2 };
  const cursorXSpring  = useSpring(cursorX, springConfig);
  const cursorYSpring  = useSpring(cursorY, springConfig);

  useEffect(() => {
    // Skip entirely on touch / coarse-pointer devices (phones, tablets).
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX - 16);
      cursorY.set(e.clientY - 16);
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;

      // Ignore Three.js canvas and YouTube / demo iframes — getComputedStyle
      // on these elements causes flicker because their cursor resets on every
      // frame the WebGL context repaints.
      const tag = target.tagName.toLowerCase();
      if (tag === "canvas" || tag === "iframe") {
        setIsHovered(false);
        return;
      }

      // Walk up the DOM so children of <a> / <button> (e.g. SVG icons)
      // are correctly detected as interactive targets.
      const isInteractive =
        target.closest("a") !== null ||
        target.closest("button") !== null ||
        window.getComputedStyle(target).cursor === "pointer";

      setIsHovered(isInteractive);
    };

    // Reset hover state when the cursor leaves the browser window entirely.
    const handleMouseLeave = () => setIsHovered(false);

    window.addEventListener("mousemove",   moveCursor);
    window.addEventListener("mouseover",   handleMouseOver);
    document.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      window.removeEventListener("mousemove",   moveCursor);
      window.removeEventListener("mouseover",   handleMouseOver);
      document.removeEventListener("mouseleave", handleMouseLeave);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // cursorX / cursorY are stable MotionValues; isVisible set once

  // No DOM node needed on coarse-pointer screens.
  if (
    typeof window !== "undefined" &&
    window.matchMedia("(pointer: coarse)").matches
  ) {
    return null;
  }

  return (
    <motion.div
      className="fixed top-0 left-0 w-8 h-8 bg-white/20 backdrop-blur-md border border-white/50 rounded-full pointer-events-none z-[9999] mix-blend-difference flex items-center justify-center"
      style={{ x: cursorXSpring, y: cursorYSpring }}
      animate={{
        scale:           isHovered ? 1.5 : 1,
        backgroundColor: isHovered
          ? "rgba(255, 255, 255, 0.8)"
          : "rgba(255, 255, 255, 0.2)",
        opacity: isVisible ? 1 : 0,
      }}
      transition={{
        scale:           { duration: 0.2 },
        backgroundColor: { duration: 0.2 },
        opacity:         { duration: 0.3, ease: "easeOut" },
      }}
    />
  );
}