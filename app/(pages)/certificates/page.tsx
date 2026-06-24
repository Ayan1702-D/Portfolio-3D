"use client";

import { motion, Variants } from "framer-motion";
import { Award, BadgeCheck, ExternalLink, Trophy, Zap } from "lucide-react";

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
    label: "Data & Analytics",
    accent: "blue",
    badgeClass: "bg-blue-500/10 text-blue-400 border-blue-500/20",
    dotClass: "bg-blue-400",
  },
  ai: {
    label: "AI & Emerging Tech",
    accent: "violet",
    badgeClass: "bg-violet-500/10 text-violet-400 border-violet-500/20",
    dotClass: "bg-violet-400",
  },
  competition: {
    label: "Hackathon",
    accent: "amber",
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

export default function Certificates() {
  return (
    <div className="min-h-screen bg-black text-white pt-32 pb-24 px-6 max-w-7xl mx-auto">
      {/* Page header */}
      <section className="mb-16">
        <p className="text-sm font-semibold tracking-[0.3em] uppercase text-blue-400 mb-3">
          Credentials
        </p>
        <h1 className="text-5xl sm:text-6xl font-black tracking-tight text-white mb-4">
          Certifications &amp; Awards.
        </h1>
        <p className="text-neutral-400 text-lg leading-relaxed max-w-2xl">
          Verified professional credentials, technical courses, and competitive
          achievements spanning data science, artificial intelligence, and
          software engineering.
        </p>
      </section>

      {/* Stats row */}
      <div className="grid grid-cols-3 gap-4 mb-16">
        {[
          { value: "3", label: "IBM Credentials" },
          { value: "1", label: "AI Certification" },
          { value: "1", label: "Hackathon Finalist" },
        ].map((stat) => (
          <div
            key={stat.label}
            className="rounded-xl border border-white/[0.07] bg-neutral-900/50 p-5 text-center"
          >
            <div className="text-3xl font-black text-white mb-1">{stat.value}</div>
            <div className="text-xs text-neutral-500 uppercase tracking-widest font-semibold">
              {stat.label}
            </div>
          </div>
        ))}
      </div>

      {/* Certificate cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
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
              className="group relative rounded-2xl border border-white/[0.07] bg-neutral-900/50 p-6 hover:border-blue-500/30 transition-colors"
            >
              {/* Top row */}
              <div className="flex items-start justify-between gap-4 mb-5">
                <div
                  className={`flex size-11 items-center justify-center rounded-xl border ${meta.badgeClass}`}
                >
                  <Icon size={20} />
                </div>

                {/* Category pill */}
                <span
                  className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold border ${meta.badgeClass}`}
                >
                  <span className={`w-1.5 h-1.5 rounded-full ${meta.dotClass}`} />
                  {meta.label}
                </span>
              </div>

              {/* Content */}
              <h3 className="text-base font-bold text-white mb-1 leading-snug">
                {cert.title}
              </h3>
              <p className="text-sm font-semibold text-blue-300 mb-3">{cert.issuer}</p>

              {cert.highlight && (
                <span className="inline-block mb-3 px-2.5 py-1 bg-white/5 border border-white/[0.07] rounded-lg text-xs text-neutral-400 font-medium">
                  {cert.highlight}
                </span>
              )}

              {/* Meta footer */}
              <div className="flex items-center justify-between pt-4 border-t border-white/[0.05] mt-2">
                <div className="text-xs text-neutral-500 space-y-0.5">
                  <div>{cert.date}</div>
                  {cert.credentialId && (
                    <div className="font-mono text-neutral-600">
                      ID: {cert.credentialId}
                    </div>
                  )}
                </div>

                {cert.verifyUrl && (
                  <a
                    href={cert.verifyUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-500/10 hover:bg-blue-500/20 border border-blue-500/20 text-blue-400 text-xs font-semibold transition-colors"
                  >
                    Verify <ExternalLink size={11} />
                  </a>
                )}
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Verification matrix table */}
      <section className="mt-20">
        <p className="text-sm font-semibold tracking-[0.3em] uppercase text-blue-400 mb-3">
          Quick Reference
        </p>
        <h2 className="text-3xl font-bold text-white mb-6">Verification Matrix</h2>

        <div className="rounded-2xl border border-white/[0.07] overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-white/[0.07] bg-neutral-900/80">
                  <th className="text-left px-5 py-3.5 text-xs font-semibold uppercase tracking-widest text-neutral-500">
                    Credential
                  </th>
                  <th className="text-left px-5 py-3.5 text-xs font-semibold uppercase tracking-widest text-neutral-500">
                    Issuer
                  </th>
                  <th className="text-left px-5 py-3.5 text-xs font-semibold uppercase tracking-widest text-neutral-500">
                    Date
                  </th>
                  <th className="text-left px-5 py-3.5 text-xs font-semibold uppercase tracking-widest text-neutral-500">
                    ID / Verify
                  </th>
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
                          className="inline-flex items-center gap-1 text-blue-400 hover:text-blue-300 transition-colors text-xs font-semibold"
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
      </section>
    </div>
  );
}