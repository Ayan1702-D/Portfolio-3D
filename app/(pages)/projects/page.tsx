"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import useSWR from "swr";
import { ExternalLink, Star, PlayCircle, ArrowUpRight } from "lucide-react";
import { SiGithub } from "react-icons/si";
import { track } from "@vercel/analytics";
import { PROJECTS, ProjectCategory, Project } from "@/data/projects";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogDescription,
} from "@/components/ui/dialog";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

const CATEGORIES: ProjectCategory[] = ["All", "NLP", "Computer Vision", "Agentic AI", "Web","Machine Learning","Deep Learning"];

// ── Status badge ─────────────────────────────────────────────────────────────

const STATUS_CONFIG = {
  live:     { label: "Live",     className: "bg-green-500/15 text-green-400 border-green-500/25",   dot: "bg-green-400"   },
  wip:      { label: "WIP",      className: "bg-amber-500/15 text-amber-400 border-amber-500/25",   dot: "bg-amber-400"   },
  archived: { label: "Archived", className: "bg-neutral-500/15 text-neutral-400 border-neutral-500/25", dot: "bg-neutral-400" },
};

function StatusBadge({ status }: { status?: "live" | "wip" | "archived" }) {
  if (!status) return null;
  const cfg = STATUS_CONFIG[status];
  return (
    <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold border ${cfg.className}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${cfg.dot}`} />
      {cfg.label}
    </span>
  );
}

// ── Star count with loading / error states ────────────────────────────────────

function StarCount({ data, error }: { data: Record<string, unknown> | undefined; error: unknown }) {
  const isLoading = !data && !error;

  if (isLoading) {
    return (
      <div className="flex items-center gap-1.5 text-yellow-400">
        <Star size={14} className="fill-yellow-400 shrink-0" />
        {/* Skeleton bar while SWR resolves */}
        <span className="w-8 h-3 bg-neutral-700 rounded animate-pulse inline-block" />
      </div>
    );
  }

  if (error) {
    return (
      <span
        className="flex items-center gap-1 text-neutral-500 text-sm"
        title="Could not load star count"
      >
        <Star size={14} />
        <span>—</span>
      </span>
    );
  }

  const stars = (data?.stargazers_count as number) ?? 0;
  return (
    <div className="flex items-center gap-1.5 text-yellow-400 text-sm font-medium">
      <Star size={14} className="fill-yellow-400" />
      <span>{stars > 0 ? stars.toLocaleString() : "—"}</span>
    </div>
  );
}

// ── Project card ──────────────────────────────────────────────────────────────

function ProjectCard({ project }: { project: Project }) {
  const repoPath = project.githubUrl.replace("https://github.com/", "");
  const { data, error } = useSWR(
    repoPath.includes("/") ? `https://api.github.com/repos/${repoPath}` : null,
    fetcher,
    { revalidateOnFocus: false }
  );

  const hasDemo = project.demoUrl !== "";

  return (
    <Dialog>
      <div className="group relative h-[400px] w-full [perspective:1000px]">
        <DialogTrigger asChild>
          <div className="absolute w-full h-full transition-all duration-700 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)] cursor-pointer rounded-2xl">

            {/* ── FRONT ── */}
            <div className="absolute inset-0 w-full h-full bg-neutral-900 border border-white/[0.07] rounded-2xl overflow-hidden [backface-visibility:hidden]">
              <div className="relative w-full h-[55%]">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover opacity-70 group-hover:opacity-90 transition-opacity duration-500"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-neutral-900/60" />
                {/* Status badge — top left */}
                <div className="absolute top-3 left-3">
                  <StatusBadge status={project.status} />
                </div>
                {/* Category — top right */}
                <div className="absolute top-3 right-3 bg-black/70 backdrop-blur-md px-2.5 py-1 rounded-full text-xs font-semibold border border-white/10 text-neutral-300">
                  {project.category}
                </div>
              </div>
              <div className="p-5">
                <h3 className="text-lg font-bold text-white mb-1.5">{project.title}</h3>
                <p className="text-neutral-400 text-sm line-clamp-2 leading-relaxed">{project.description}</p>
                <div className="flex flex-wrap gap-1.5 mt-4">
                  {project.techStack.slice(0, 3).map((tech) => (
                    <span key={tech} className="px-2 py-0.5 bg-neutral-800 text-neutral-400 text-xs rounded-md">
                      {tech}
                    </span>
                  ))}
                  {project.techStack.length > 3 && (
                    <span className="px-2 py-0.5 bg-neutral-800 text-neutral-500 text-xs rounded-md">
                      +{project.techStack.length - 3}
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* ── BACK ── */}
            <div className="absolute inset-0 w-full h-full bg-neutral-900 border border-blue-500/40 rounded-2xl p-6 flex flex-col justify-between [transform:rotateY(180deg)] [backface-visibility:hidden]">
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <h3 className="text-xl font-bold text-white">{project.title}</h3>
                  <StatusBadge status={project.status} />
                </div>
                <p className="text-neutral-300 text-sm leading-relaxed mb-4">{project.description}</p>
                <div className="flex flex-wrap gap-1.5">
                  {project.techStack.map((tech) => (
                    <span key={tech} className="px-2.5 py-1 bg-blue-500/10 text-blue-400 text-xs rounded-md border border-blue-500/20">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-white/[0.07]">
                {/* ── Star count — skeleton / error / value ── */}
                <StarCount data={data} error={error} />

                <div className="text-sm font-semibold text-blue-400 flex items-center gap-1">
                  Click to explore <ArrowUpRight size={14} />
                </div>
              </div>
            </div>
          </div>
        </DialogTrigger>
      </div>

      {/* ── Modal ── */}
      <DialogContent className="max-w-2xl bg-neutral-950 border-neutral-800/80 text-white">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold flex items-center gap-3 pr-8">
            {project.title}
            <span className="text-xs font-normal px-2.5 py-1 bg-neutral-800/80 rounded-full text-neutral-400 shrink-0">
              {project.category}
            </span>
            <StatusBadge status={project.status} />
          </DialogTitle>
          
          {/* Added DialogDescription with sr-only to hide it visually but fix the warning */}
          <DialogDescription className="sr-only">
            View full details, demo links, and the technology stack for the {project.title} project.
          </DialogDescription>
        </DialogHeader>

        <div className="mt-4 flex flex-col gap-5">
          {project.youtubeId ? (
            <div className="relative w-full aspect-video rounded-xl overflow-hidden border border-neutral-800">
              <iframe
                src={`https://www.youtube.com/embed/${project.youtubeId}`}
                title="Project Demo"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full"
              />
            </div>
          ) : (
            <div className="relative w-full aspect-video rounded-xl overflow-hidden border border-neutral-800">
              <Image src={project.image} alt={project.title} fill sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" priority className="object-cover opacity-50" />
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-2">
                <PlayCircle size={40} className="text-neutral-500" />
                <span className="text-sm text-neutral-500">Demo coming soon</span>
              </div>
            </div>
          )}

          <p className="text-neutral-300 text-sm leading-relaxed">{project.fullDetails}</p>

          <div className="flex flex-wrap gap-1.5">
            {project.techStack.map((tech) => (
              <span key={tech} className="px-2.5 py-1 bg-blue-500/10 text-blue-400 text-xs rounded-md border border-blue-500/20">
                {tech}
              </span>
            ))}
          </div>

          <div className="flex gap-3 pt-4 border-t border-neutral-800/60">
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2.5 bg-neutral-800 hover:bg-neutral-700 transition-colors rounded-xl text-sm font-medium"
            >
              <SiGithub size={16} /> Source Code
            </a>

            {hasDemo ? (
              <a
                href={project.demoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2.5 bg-blue-600 hover:bg-blue-500 transition-colors rounded-xl text-sm font-medium text-white"
              >
                <ExternalLink size={16} /> Live Demo
              </a>
            ) : (
              <span
                className="flex items-center gap-2 px-4 py-2.5 bg-neutral-800 rounded-xl text-sm font-medium text-neutral-500 opacity-50 cursor-not-allowed select-none"
                title="No live demo available"
              >
                <ExternalLink size={16} /> Live Demo
              </span>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

// ── Page ──────────────────────────────────────────────────────────────────────

export default function Projects() {
  const [activeCategory, setActiveCategory] = useState<ProjectCategory>("All");

  const filteredProjects = PROJECTS.filter((p) =>
    activeCategory === "All" ? true : p.category === activeCategory
  );

  return (
    <div className="min-h-screen pt-32 pb-24 px-6 max-w-7xl mx-auto">
      <div className="mb-12">
        <p className="text-sm font-semibold tracking-[0.3em] uppercase text-blue-400 mb-3">Portfolio</p>
        <h1 className="text-5xl sm:text-6xl font-black text-white mb-3 tracking-tight">
          Selected Works.
        </h1>
        <p className="text-neutral-500 text-lg mb-8 max-w-xl">
          Projects spanning computer vision, NLP, agentic AI, and full-stack web development.
        </p>

        <div className="flex flex-wrap gap-2">
          {CATEGORIES.map((category) => (
            <button
              key={category}
              onClick={() => {
                setActiveCategory(category);
                // Track which project categories recruiters are most interested in.
                track("project_filter", { category });
              }}
              className={`px-5 py-2 rounded-full text-sm font-semibold transition-all ${
                activeCategory === category
                  ? "bg-white text-black shadow-[0_0_20px_rgba(255,255,255,0.15)]"
                  : "bg-neutral-900 text-neutral-400 hover:bg-neutral-800 hover:text-white border border-neutral-800"
              }`}
            >
              {category}
              {activeCategory === category && (
                <span className="ml-2 text-xs text-neutral-500 font-normal">
                  {filteredProjects.length}
                </span>
              )}
            </button>
          ))}
        </div>
      </div>

      <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <AnimatePresence mode="popLayout">
          {filteredProjects.map((project) => (
            <motion.div
              key={project.id}
              layout
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.92 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
            >
              <ProjectCard project={project} />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {filteredProjects.length === 0 && (
        <div className="text-center py-20 text-neutral-600">
          No projects in this category yet.
        </div>
      )}
    </div>
  );
}