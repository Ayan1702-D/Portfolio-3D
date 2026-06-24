import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "404 — Page Not Found",
};

export default function NotFound() {
  return (
    <>
      {/*
        Inline <style> is the only way to use @keyframes in a server component
        without pulling in a CSS file or a client boundary. It is injected once
        into <head> by Next.js during SSR and reused on the client.
      */}
      <style>{`
        @keyframes blob-pulse {
          0%, 100% { transform: translate(-50%, -50%) scale(1);   opacity: 0.05; }
          50%       { transform: translate(-50%, -50%) scale(1.18); opacity: 0.09; }
        }
        .not-found-blob {
          position: absolute;
          top: 50%;
          left: 50%;
          width: 700px;
          height: 700px;
          border-radius: 50%;
          background: radial-gradient(circle, #3b82f6 0%, transparent 70%);
          animation: blob-pulse 6s ease-in-out infinite;
          pointer-events: none;
        }
        @media (prefers-reduced-motion: reduce) {
          .not-found-blob { animation: none; opacity: 0.05; }
        }
      `}</style>

      <div className="relative min-h-screen bg-black text-white flex flex-col items-center justify-center px-6 overflow-hidden">
        {/* Animated background blob — pure CSS, no JS */}
        <div className="not-found-blob" aria-hidden="true" />

        {/* Content */}
        <div className="relative z-10 flex flex-col items-center text-center max-w-xl">
          {/* Large gradient 404 */}
          <h1
            className="text-[clamp(6rem,20vw,11rem)] font-black leading-none tracking-tighter text-transparent bg-clip-text"
            style={{
              backgroundImage:
                "linear-gradient(135deg, #ffffff 0%, #ffffff 50%, #a3a3a3 100%)",
            }}
          >
            404
          </h1>

          {/* Blue accent divider */}
          <div className="w-12 h-1 rounded-full bg-blue-500 my-6" />

          {/* Heading */}
          <p className="text-2xl sm:text-3xl font-bold text-white mb-3">
            This page doesn&apos;t exist.
          </p>

          {/* Sub-copy */}
          <p className="text-neutral-400 text-base leading-relaxed mb-10">
            You may have followed a broken link or mistyped the URL.
          </p>

          {/* Action buttons */}
          <div className="flex flex-col sm:flex-row items-center gap-3">
            <Link
              href="/"
              className="inline-flex items-center px-7 py-3 bg-white text-black font-semibold rounded-full hover:bg-neutral-100 transition-colors"
            >
              Go Home
            </Link>
            <Link
              href="/projects"
              className="inline-flex items-center px-7 py-3 bg-blue-600 text-white font-semibold rounded-full hover:bg-blue-500 transition-colors"
            >
              View Projects
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}