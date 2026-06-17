// "use client";

// import { motion, AnimatePresence } from "framer-motion";
// import { usePathname } from "next/navigation";

// export default function PageTransition({ children }: { children: React.ReactNode }) {
//   const pathname = usePathname();

//   return (
//     <AnimatePresence mode="wait">
//       <motion.div
//         key={pathname}
//         initial={{ opacity: 0, y: 20 }}
//         animate={{ opacity: 1, y: 0 }}
//         exit={{ opacity: 0, y: -20 }}
//         transition={{ duration: 0.4, ease: "easeInOut" }}
//         className="w-full h-full flex-grow flex flex-col"
//       >
//         {children}
//       </motion.div>
//     </AnimatePresence>
//   );
// }

"use client";

import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";

// BUG FIX: Reduced transition duration and simplified animation.
// The previous exit/enter sequence with y offsets caused a visible black gap
// between pages (old page exits down, new page hasn't mounted yet = black frame).
// Using opacity-only fade is imperceptible but removes the black screen.
export default function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={pathname}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2, ease: "easeInOut" }}
        className="w-full flex-grow flex flex-col"
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}