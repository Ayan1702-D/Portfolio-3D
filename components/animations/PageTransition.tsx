// "use client";

// import { usePathname } from "next/navigation";
// import { AnimatePresence, motion } from "framer-motion";
// import { useEffect, useState } from "react";

// export default function PageTransition({
//   children,
// }: {
//   children: React.ReactNode;
// }) {
//   const pathname = usePathname();

//   // Detect prefers-reduced-motion once on mount. We use state rather than
//   // reading the media query directly during render so SSR stays clean.
//   const [reducedMotion, setReducedMotion] = useState(false);
//   useEffect(() => {
//     setReducedMotion(
//       window.matchMedia("(prefers-reduced-motion: reduce)").matches
//     );
//   }, []);

//   // Reduced-motion users get a plain wrapper — no layout shift, no flicker.
//   if (reducedMotion) {
//     return (
//       <div className="w-full flex-grow flex flex-col">{children}</div>
//     );
//   }

//   return (
//     <AnimatePresence mode="wait">
//       <motion.div
//         key={pathname}
//         initial={{ opacity: 0, y: 20 }}
//         animate={{ opacity: 1, y: 0 }}
//         exit={{ opacity: 0, y: -10 }}
//         transition={{ duration: 0.35, ease: "easeInOut" }}
//         className="w-full flex-grow flex flex-col"
//       >
//         {children}
//       </motion.div>
//     </AnimatePresence>
//   );
// }
 "use client";

 export default function PageTransition({ children }: { children: React.ReactNode }) {
   return <div className="w-full flex-grow flex flex-col">{children}</div>;
 }
