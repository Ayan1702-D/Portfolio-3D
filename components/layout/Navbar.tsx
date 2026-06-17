// "use client";

// import { useState, useRef, useEffect } from "react";
// import Link from "next/link";
// import { usePathname } from "next/navigation";
// import { NAVIGATION, PERSONAL_INFO } from "@/lib/constants";
// import { Menu, X } from "lucide-react";
// import gsap from "gsap";
// import clsx from "clsx";

// export default function Navbar() {
//   const [isOpen, setIsOpen] = useState(false);
//   const pathname = usePathname();
//   const menuRef = useRef<HTMLDivElement>(null);

//   useEffect(() => {
//     if (isOpen) {
//       gsap.to(menuRef.current, { y: 0, opacity: 1, duration: 0.5, ease: "power4.out", display: "flex" });
//     } else {
//       gsap.to(menuRef.current, { y: "-100%", opacity: 0, duration: 0.4, ease: "power3.in", display: "none" });
//     }
//   }, [isOpen]);

//   // Close mobile menu on route change
//   useEffect(() => {
//     setIsOpen(false);
//   }, [pathname]);

//   return (
//     <header className="fixed top-0 left-0 w-full z-50 bg-black/40 backdrop-blur-lg border-b border-white/10">
//       <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
//         {/* Logo */}
//         <Link href="/" className="text-xl font-bold tracking-tighter text-white relative group">
//           {PERSONAL_INFO.name}<span className="text-blue-500">.</span>
//         </Link>

//         {/* Desktop Nav */}
//         <nav className="hidden md:flex gap-8">
//           {NAVIGATION.map((item) => (
//             <Link
//               key={item.name}
//               href={item.path}
//               className={clsx(
//                 "text-sm font-medium transition-colors hover:text-white",
//                 pathname === item.path ? "text-white" : "text-neutral-400"
//               )}
//             >
//               {item.name}
//             </Link>
//           ))}
//         </nav>

//         {/* Mobile Toggle */}
//         <button 
//           className="md:hidden text-white p-2"
//           onClick={() => setIsOpen(!isOpen)}
//         >
//           {isOpen ? <X size={24} /> : <Menu size={24} />}
//         </button>
//       </div>

//       {/* Mobile Menu Drawer */}
//       <div 
//         ref={menuRef}
//         className="fixed inset-0 top-20 bg-black/95 backdrop-blur-xl hidden flex-col items-center justify-center gap-8 -translate-y-full"
//       >
//         {NAVIGATION.map((item) => (
//           <Link
//             key={item.name}
//             href={item.path}
//             className={clsx(
//               "text-3xl font-bold tracking-tight",
//               pathname === item.path ? "text-blue-500" : "text-white"
//             )}
//           >
//             {item.name}
//           </Link>
//         ))}
//       </div>
//     </header>
//   );
// }

"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { NAVIGATION, PERSONAL_INFO } from "@/lib/constants";
import { Menu, X } from "lucide-react";
import gsap from "gsap";
import clsx from "clsx";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const menuRef = useRef<HTMLDivElement>(null);
  // BUG FIX: Track if GSAP has been initialized so we don't animate on first hidden state
  const initialized = useRef(false);

  useEffect(() => {
    if (!menuRef.current) return;

    if (!initialized.current) {
      // Set initial state without animation
      gsap.set(menuRef.current, { y: "-100%", opacity: 0 });
      initialized.current = true;
      return;
    }

    // BUG FIX: Removed `display` manipulation — was conflicting with the `hidden` class.
    // Now we use visibility via y transform + opacity only; the element is always in DOM.
    if (isOpen) {
      gsap.to(menuRef.current, {
        y: 0,
        opacity: 1,
        duration: 0.4,
        ease: "power3.out",
      });
    } else {
      gsap.to(menuRef.current, {
        y: "-100%",
        opacity: 0,
        duration: 0.3,
        ease: "power3.in",
      });
    }
  }, [isOpen]);

  // Close mobile menu on route change
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsOpen(false);
  }, [pathname]);

  // Close on ESC key
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) setIsOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isOpen]);

  return (
    <>
      <header className="fixed top-0 left-0 w-full z-50 bg-black/40 backdrop-blur-xl border-b border-white/[0.06]">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          {/* Logo */}
          <Link
            href="/"
            className="text-xl font-black tracking-tighter text-white group"
          >
            {PERSONAL_INFO.name}
            <span className="text-blue-500 group-hover:text-blue-400 transition-colors">.</span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1">
            {NAVIGATION.map((item) => (
              <Link
                key={item.name}
                href={item.path}
                className={clsx(
                  "relative px-4 py-2 text-sm font-medium rounded-full transition-all",
                  pathname === item.path
                    ? "text-white bg-white/10"
                    : "text-neutral-400 hover:text-white hover:bg-white/5"
                )}
              >
                {item.name}
                {pathname === item.path && (
                  <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-blue-500 rounded-full" />
                )}
              </Link>
            ))}
          </nav>

          {/* CTA + Mobile Toggle */}
          <div className="flex items-center gap-3">
            <Link
              href="/contact"
              className="hidden md:inline-flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white text-sm font-semibold rounded-full transition-colors"
            >
              Hire Me
            </Link>
            <button
              className="md:hidden text-white p-2 hover:bg-white/10 rounded-lg transition-colors"
              onClick={() => setIsOpen(!isOpen)}
              aria-label={isOpen ? "Close menu" : "Open menu"}
            >
              {isOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu — always in DOM, GSAP controls visibility via transform */}
      {/* BUG FIX: removed `hidden` class, used pointer-events-none when closed */}
      <div
        ref={menuRef}
        className={clsx(
          "fixed inset-0 top-20 bg-black/98 backdrop-blur-2xl z-40 flex flex-col items-center justify-center gap-6",
          !isOpen && "pointer-events-none"
        )}
        style={{ transform: "translateY(-100%)", opacity: 0 }}
      >
        {NAVIGATION.map((item) => (
          <Link
            key={item.name}
            href={item.path}
            onClick={() => setIsOpen(false)}
            className={clsx(
              "text-4xl font-black tracking-tight transition-colors",
              pathname === item.path ? "text-blue-400" : "text-white hover:text-blue-300"
            )}
          >
            {item.name}
          </Link>
        ))}
        <Link
          href="/contact"
          onClick={() => setIsOpen(false)}
          className="mt-4 px-8 py-3 bg-blue-600 text-white font-semibold rounded-full text-lg"
        >
          Hire Me
        </Link>
      </div>
    </>
  );
}