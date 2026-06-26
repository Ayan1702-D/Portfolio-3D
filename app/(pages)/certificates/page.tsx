"use client";

import { useState } from "react";
import { motion, Variants, AnimatePresence } from "framer-motion";
import { Award, BadgeCheck, ExternalLink, Trophy, Zap, ChevronDown } from "lucide-react";

interface Certificate {
  id: string;
  title: string;
  issuer: string;
  date: string;
  credentialId?: string;
  verifyUrl?: string;
  category: "data" | "ai" | "competition";
  icon: typeof Award;
  highlight?: string;
}

const CERTIFICATES: Certificate[] = [
  {
    id: "1",
    title: "Decoding Data: Insights & Impact through Analytics 2025-26",
    issuer: "IBM SkillsBuild",
    date: "July 5, 2025",
    credentialId: "PLAN-8A8FBB92E28B",
    category: "data",
    icon: BadgeCheck,
    highlight: "Analytics",
  },
  {
    id: "2",
    title: "Data Analysis with Python (DA0101EN)",
    issuer: "IBM SkillsBuild",
    date: "July 4, 2025",
    credentialId: "DA0101EN",
    verifyUrl:
      "https://courses.skillsbuild.skillsnetwork.site/certificates/33f062c142804deea20c4d09b57fd35e",
    category: "data",
    icon: BadgeCheck,
    highlight: "Python & Data",
  },
  {
    id: "3",
    title: "Big Data 101 (BD0101EN)",
    issuer: "IBM SkillsBuild",
    date: "July 5, 2025",
    credentialId: "BD0101EN",
    verifyUrl:
      "https://courses.skillsbuild.skillsnetwork.site/certificates/74001814158c4098b9075ae2da7e2925",
    category: "data",
    icon: BadgeCheck,
    highlight: "Big Data",
  },
  {
    id: "4",
    title: "Foundation Course on Green Skills and Artificial Intelligence",
    issuer: "Edunet Foundation × AICTE × Shell India",
    date: "March 2025",
    credentialId: "S4F25_147870",
    category: "ai",
    icon: Zap,
    highlight: "AI & Green Tech",
  },
  {
    id: "5",
    title: "CODE-A-THON 2026 — Finalist",
    issuer: "Vidyalankar Institute of Technology, Mumbai",
    date: "January 31, 2026",
    category: "competition",
    icon: Trophy,
    highlight: "ALGORHYTHM '26 Hackathon",
  },
];

const CATEGORY_META = {
  data: {
    label: "Data Analytics",
    badgeClass: "bg-blue-500/10 text-blue-400 border-blue-500/20",
    dotClass: "bg-blue-400",
  },
  ai: {
    label: "AI & Emerging Tech",
    badgeClass: "bg-violet-500/10 text-violet-400 border-violet-500/20",
    dotClass: "bg-violet-400",
  },
  competition: {
    label: "Hackathon",
    badgeClass: "bg-amber-500/10 text-amber-400 border-amber-500/20",
    dotClass: "bg-amber-400",
  },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut", delay: i * 0.08 },
  }),
};

// ── Accordion row — used only on mobile for the verification matrix ──────────
function AccordionRow({ cert, isLast }: { cert: Certificate; isLast: boolean }) {
  const [open, setOpen] = useState(false);
  const meta = CATEGORY_META[cert.category];

  return (
    <div className={`${!isLast ? "border-b border-white/[0.05]" : ""}`}>
      <button
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-start justify-between gap-3 px-4 py-4 text-left"
        aria-expanded={open}
      >
        <div className="flex-1 min-w-0">
          <p className="text-white text-sm font-semibold leading-snug line-clamp-2 mb-1">
            {cert.title}
          </p>
          <p className="text-neutral-500 text-xs">{cert.issuer.split("×")[0].trim()}</p>
        </div>
        <ChevronDown
          size={16}
          className={`shrink-0 mt-0.5 text-neutral-500 transition-transform duration-200 ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.22, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className="px-4 pb-4 flex flex-col gap-2.5">
              <div className="flex items-center justify-between gap-3 flex-wrap">
                <span
                  className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold border ${meta.badgeClass}`}
                >
                  <span className={`w-1.5 h-1.5 rounded-full ${meta.dotClass}`} />
                  {meta.label}
                </span>
                <span className="text-neutral-500 text-xs">{cert.date}</span>
              </div>

              {cert.credentialId && (
                <p className="text-neutral-600 text-xs font-mono">
                  ID: {cert.credentialId}
                </p>
              )}

              {cert.verifyUrl && (
                <a
                  href={cert.verifyUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="self-start inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-500/10 hover:bg-blue-500/20 border border-blue-500/20 text-blue-400 text-xs font-semibold transition-colors"
                >
                  Validate Authenticity <ExternalLink size={11} />
                </a>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function Certificates() {
  return (
    <div className="min-h-screen bg-black text-white pt-24 sm:pt-32 pb-20 sm:pb-24 px-4 sm:px-6 max-w-7xl mx-auto">

      {/* ── Page header ─────────────────────────────────────────────────── */}
      <section className="mb-10 sm:mb-16">
        <p className="text-xs sm:text-sm font-semibold tracking-[0.3em] uppercase text-blue-400 mb-3">
          Credentials
        </p>
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white mb-4 leading-tight">
          Certifications<br className="sm:hidden" />
          <span className="hidden sm:inline"> </span>&amp; Awards.
        </h1>
        <p className="text-neutral-400 text-base sm:text-lg leading-relaxed max-w-2xl">
          Verified professional credentials, technical courses, and competitive
          achievements spanning data science, artificial intelligence, and
          software engineering.
        </p>
      </section>

      {/* ── Stats row ───────────────────────────────────────────────────── */}
      {/* Mobile: 1-col stack  |  sm+: 3-col grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 mb-10 sm:mb-16">
        {[
          { value: "3", label: "IBM Credentials" },
          { value: "1", label: "AI Certification" },
          { value: "1", label: "Hackathon Finalist" },
        ].map((stat) => (
          <div
            key={stat.label}
            className="flex sm:flex-col items-center sm:items-center justify-between sm:justify-center
                       gap-3 rounded-xl border border-white/[0.07] bg-neutral-900/50
                       px-5 py-4 sm:p-5 sm:text-center"
          >
            <span className="text-sm font-semibold text-neutral-400 sm:order-last sm:text-xs sm:uppercase sm:tracking-widest sm:text-neutral-500 sm:mt-1">
              {stat.label}
            </span>
            <span className="text-3xl sm:text-3xl font-black text-white">
              {stat.value}
            </span>
          </div>
        ))}
      </div>

      {/* ── Certificate cards ────────────────────────────────────────────── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
        {CERTIFICATES.map((cert, i) => {
          const meta = CATEGORY_META[cert.category];
          const Icon = cert.icon;

          return (
            <motion.div
              key={cert.id}
              custom={i}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-60px" }}
              variants={cardVariants}
              className="group relative rounded-2xl border border-white/[0.07] bg-neutral-900/50
                         p-5 sm:p-6 hover:border-blue-500/30 transition-colors"
            >
              {/* Top row */}
              <div className="flex items-start justify-between gap-3 mb-4 sm:mb-5">
                <div
                  className={`flex size-10 sm:size-11 shrink-0 items-center justify-center
                              rounded-xl border ${meta.badgeClass}`}
                >
                  <Icon size={18} />
                </div>

                {/* Category pill */}
                <span
                  className={`inline-flex items-center gap-1.5 px-2 sm:px-2.5 py-1 rounded-full
                              text-[10px] sm:text-[11px] font-semibold border ${meta.badgeClass}`}
                >
                  <span className={`w-1.5 h-1.5 rounded-full ${meta.dotClass}`} />
                  <span className="hidden xs:inline">{meta.label}</span>
                  {/* Abbreviated on very narrow screens */}
                  <span className="xs:hidden">
                    {cert.category === "data"
                      ? "Data"
                      : cert.category === "ai"
                      ? "AI"
                      : "Hackathon"}
                  </span>
                </span>
              </div>

              {/* Content */}
              <h3 className="text-sm sm:text-base font-bold text-white mb-1 leading-snug">
                {cert.title}
              </h3>
              <p className="text-xs sm:text-sm font-semibold text-blue-300 mb-3">
                {cert.issuer}
              </p>

              {cert.highlight && (
                <span className="inline-block mb-3 px-2.5 py-1 bg-white/5 border border-white/[0.07]
                                 rounded-lg text-xs text-neutral-400 font-medium">
                  {cert.highlight}
                </span>
              )}

              {/* Meta footer */}
              <div className="flex items-end justify-between gap-3 pt-4
                              border-t border-white/[0.05] mt-2 flex-wrap">
                <div className="text-xs text-neutral-500 space-y-0.5 min-w-0">
                  <div>{cert.date}</div>
                  {cert.credentialId && (
                    <div className="font-mono text-neutral-600 truncate max-w-[180px] sm:max-w-none">
                      ID: {cert.credentialId}
                    </div>
                  )}
                </div>

                {cert.verifyUrl && (
                  <a
                    href={cert.verifyUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg
                               bg-blue-500/10 hover:bg-blue-500/20 border border-blue-500/20
                               text-blue-400 text-xs font-semibold transition-colors shrink-0"
                  >
                    Verify <ExternalLink size={11} />
                  </a>
                )}
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* ── Verification matrix ─────────────────────────────────────────── */}
      <section className="mt-16 sm:mt-20">
        <p className="text-xs sm:text-sm font-semibold tracking-[0.3em] uppercase text-blue-400 mb-3">
          Quick Reference
        </p>
        <h2 className="text-2xl sm:text-3xl font-bold text-white mb-5 sm:mb-6">
          Verification Matrix
        </h2>

        {/* Desktop table — hidden on mobile */}
        <div className="hidden sm:block rounded-2xl border border-white/[0.07] overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-white/[0.07] bg-neutral-900/80">
                  {["Credential", "Issuer", "Date", "ID / Verify"].map((h) => (
                    <th
                      key={h}
                      className="text-left px-5 py-3.5 text-xs font-semibold uppercase
                                 tracking-widest text-neutral-500"
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {CERTIFICATES.map((cert, i) => (
                  <tr
                    key={cert.id}
                    className={`border-b border-white/[0.04] hover:bg-white/[0.02] transition-colors ${
                      i === CERTIFICATES.length - 1 ? "border-b-0" : ""
                    }`}
                  >
                    <td className="px-5 py-4 text-white font-medium max-w-[220px]">
                      <span className="line-clamp-2">{cert.title}</span>
                    </td>
                    <td className="px-5 py-4 text-neutral-400 whitespace-nowrap">
                      {cert.issuer.split("×")[0].trim()}
                    </td>
                    <td className="px-5 py-4 text-neutral-500 whitespace-nowrap">
                      {cert.date}
                    </td>
                    <td className="px-5 py-4">
                      {cert.verifyUrl ? (
                        <a
                          href={cert.verifyUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 text-blue-400
                                     hover:text-blue-300 transition-colors text-xs font-semibold"
                        >
                          Validate <ExternalLink size={10} />
                        </a>
                      ) : cert.credentialId ? (
                        <span className="font-mono text-xs text-neutral-600">
                          {cert.credentialId}
                        </span>
                      ) : (
                        <span className="text-neutral-700 text-xs">—</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Mobile accordion — shown only on mobile */}
        <div className="sm:hidden rounded-2xl border border-white/[0.07] overflow-hidden bg-neutral-900/50">
          {CERTIFICATES.map((cert, i) => (
            <AccordionRow
              key={cert.id}
              cert={cert}
              isLast={i === CERTIFICATES.length - 1}
            />
          ))}
        </div>
      </section>
    </div>
  );
}