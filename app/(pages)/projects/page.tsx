"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import useSWR from "swr";
// UPDATED: Removed Github from lucide-react
import { ExternalLink, Star, PlayCircle, ArrowUpRight } from "lucide-react";
// UPDATED: Imported Github from react-icons
import { SiGithub } from "react-icons/si";
import { PROJECTS, ProjectCategory, Project } from "@/data/projects";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

const CATEGORIES: ProjectCategory[] = ["All", "NLP", "Computer Vision", "Agentic AI", "Web", "Machine Learning", "Deep Learning"];

function ProjectCard({ project }: { project: Project }) {
  const repoPath = project.githubUrl.replace("https://github.com/", "");
  const { data } = useSWR(
    repoPath.includes("/") ? `https://api.github.com/repos/${repoPath}` : null,
    fetcher,
    { revalidateOnFocus: false }
  );

  const stars: number = data?.stargazers_count ?? 0;

  return (
    <Dialog>
      <div className="group relative h-[400px] w-full [perspective:1000px]">
        <DialogTrigger asChild>
          <div className="absolute w-full h-full transition-all duration-700 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)] cursor-pointer rounded-2xl">

            {/* FRONT */}
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

            {/* BACK */}
            <div className="absolute inset-0 w-full h-full bg-neutral-900 border border-blue-500/40 rounded-2xl p-6 flex flex-col justify-between [transform:rotateY(180deg)] [backface-visibility:hidden]">
              <div>
                <h3 className="text-xl font-bold text-white mb-3">{project.title}</h3>
                <p className="text-neutral-300 text-sm leading-relaxed mb-4">{project.description}</p>
                <div className="flex flex-wrap gap-1.5">
                  {project.techStack.map((tech) => (
                    <span
                      key={tech}
                      className="px-2.5 py-1 bg-blue-500/10 text-blue-400 text-xs rounded-md border border-blue-500/20"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-white/[0.07]">
                <div className="flex items-center gap-1.5 text-yellow-400 text-sm font-medium">
                  <Star size={14} className="fill-yellow-400" />
                  <span>{stars > 0 ? stars.toLocaleString() : "—"}</span>
                </div>
                <div className="text-sm font-semibold text-blue-400 flex items-center gap-1">
                  Click to explore <ArrowUpRight size={14} />
                </div>
              </div>
            </div>
          </div>
        </DialogTrigger>
      </div>

      {/* Modal */}
      <DialogContent className="max-w-2xl bg-neutral-950 border-neutral-800/80 text-white">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold flex items-center gap-3 pr-8">
            {project.title}
            <span className="text-xs font-normal px-2.5 py-1 bg-neutral-800/80 rounded-full text-neutral-400 shrink-0">
              {project.category}
            </span>
          </DialogTitle>
        </DialogHeader>

        <div className="mt-4 flex flex-col gap-5">
          {/* Video / Image */}
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
              <Image src={project.image} alt={project.title} fill className="object-cover opacity-50" />
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-2">
                <PlayCircle size={40} className="text-neutral-500" />
                <span className="text-sm text-neutral-500">Demo coming soon</span>
              </div>
            </div>
          )}

          <p className="text-neutral-300 text-sm leading-relaxed">{project.fullDetails}</p>

          {/* Tech stack */}
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
              {/* UPDATED: Replaced lucide-react Github with react-icons SiGithub */}
              <SiGithub size={16} /> Source Code
            </a>
            <a
              href={project.demoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2.5 bg-blue-600 hover:bg-blue-500 transition-colors rounded-xl text-sm font-medium text-white"
            >
              <ExternalLink size={16} /> Live Demo
            </a>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default function Projects() {
  const [activeCategory, setActiveCategory] = useState<ProjectCategory>("All");

  const filteredProjects = PROJECTS.filter((p) =>
    activeCategory === "All" ? true : p.category === activeCategory
  );

  return (
    <div className="min-h-screen pt-32 pb-24 px-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-12">
        <p className="text-sm font-semibold tracking-[0.3em] uppercase text-blue-400 mb-3">Portfolio</p>
        <h1 className="text-5xl sm:text-6xl font-black text-white mb-3 tracking-tight">
          Selected Works.
        </h1>
        <p className="text-neutral-500 text-lg mb-8 max-w-xl">
          Projects spanning computer vision, NLP, agentic AI, and full-stack web development.
        </p>

        {/* Filter Pills */}
        <div className="flex flex-wrap gap-2">
          {CATEGORIES.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
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

      {/* Project Grid */}
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

// "use client";
// import { useState } from "react";
// import Image from "next/image";
// import { motion, AnimatePresence } from "framer-motion";
// import useSWR from "swr";
// import { ExternalLink, Star, PlayCircle } from "lucide-react";
// import { PROJECTS, ProjectCategory, Project } from "@/data/projects";
// import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

// // SWR Fetcher for GitHub API
// const fetcher = (url: string) => fetch(url).then((res) => res.json());

// const CATEGORIES: ProjectCategory[] = ["All", "NLP", "Computer Vision", "Agentic AI", "Web"];

// function GithubIcon() {
//   return (
//     <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
//       <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.02c3.14-.35 6.5-1.4 6.5-7.a5.66 5.66 0 0 0-1.66-4.08A5.23 5.23 0 0 0 18 2.13s-1.36-.45-4.5 1.73A15.3 15.3 0 0 0 12 3.5a15.3 15.3 0 0 0-3.5.38c-3.14-2.18-4.5-1.73-4.5-1.73a5.23 5.23 0 0 0 .16 4.75A5.66 5.66 0 0 0 3 8.98c0 5.6 3.36 6.65 6.5 7A4.8 4.8 0 0 0 8 19v3"></path>
//     </svg>
//   );
// }


// function ProjectCard({ project }: { project: Project }) {
//   // Extract owner/repo from URL for the API call
//   const repoPath = project.githubUrl.replace("https://github.com/", "");
//   const { data } = useSWR(
//     repoPath.includes("/") ? `https://api.github.com/repos/${repoPath}` : null,
//     fetcher
//   );
  
//   const stars = data?.stargazers_count || 0;

//   return (
//     <Dialog>
//       {/* 3D Flip Card Container */}
//       <div className="group relative h-[400px] w-full [perspective:1000px] cursor-pointer">
//         <DialogTrigger asChild>
//           <div className="absolute w-full h-full transition-all duration-700 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)] shadow-xl">
            
//             {/* FRONT OF CARD */}
//             <div className="absolute inset-0 w-full h-full bg-neutral-900 border border-white/10 rounded-2xl overflow-hidden [backface-visibility:hidden]">
//               <div className="relative w-full h-3/5">
//                 <Image 
//                   src={project.image} 
//                   alt={project.title} 
//                   fill 
//                   className="object-cover opacity-80 group-hover:opacity-100 transition-opacity"
//                 />
//                 <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-md px-3 py-1 rounded-full text-xs font-semibold border border-white/10 text-white">
//                   {project.category}
//                 </div>
//               </div>
//               <div className="p-6">
//                 <h3 className="text-xl font-bold text-white mb-2">{project.title}</h3>
//                 <p className="text-neutral-400 text-sm line-clamp-2">{project.description}</p>
//               </div>
//             </div>

//             {/* BACK OF CARD */}
//             <div className="absolute inset-0 w-full h-full bg-neutral-900 border border-blue-500/50 rounded-2xl p-6 flex flex-col justify-between [transform:rotateY(180deg)] [backface-visibility:hidden]">
//               <div>
//                 <h3 className="text-xl font-bold text-white mb-4">{project.title}</h3>
//                 <p className="text-neutral-300 text-sm leading-relaxed mb-4">{project.description}</p>
                
//                 <div className="flex flex-wrap gap-2 mb-4">
//                   {project.techStack.map((tech) => (
//                     <span key={tech} className="px-2 py-1 bg-blue-500/10 text-blue-400 text-xs rounded-md border border-blue-500/20">
//                       {tech}
//                     </span>
//                   ))}
//                 </div>
//               </div>

//               <div className="flex items-center justify-between mt-auto pt-4 border-t border-white/10">
//                 <div className="flex items-center gap-1 text-yellow-500 text-sm font-medium">
//                   <Star size={16} className="fill-yellow-500" />
//                   <span>{stars > 0 ? stars.toLocaleString() : "..."}</span>
//                 </div>
//                 <div className="text-sm font-semibold text-blue-400 flex items-center gap-1">
//                   Click for details <ExternalLink size={14} />
//                 </div>
//               </div>
//             </div>

//           </div>
//         </DialogTrigger>
//       </div>

//       {/* SHADCN DIALOG MODAL */}
//       <DialogContent className="max-w-2xl bg-neutral-950 border-neutral-800 text-white">
//         <DialogHeader>
//           <DialogTitle className="text-2xl font-bold flex items-center justify-between pr-6">
//             {project.title}
//             <span className="text-sm font-normal px-3 py-1 bg-neutral-800 rounded-full text-neutral-300">
//               {project.category}
//             </span>
//           </DialogTitle>
//         </DialogHeader>
        
//         <div className="mt-4 flex flex-col gap-6">
//           {project.youtubeId ? (
//             <div className="relative w-full aspect-video rounded-lg overflow-hidden border border-neutral-800">
//               <iframe
//                 src={`https://www.youtube.com/embed/${project.youtubeId}`}
//                 title="Project Demo"
//                 allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
//                 allowFullScreen
//                 className="w-full h-full"
//               />
//             </div>
//           ) : (
//             <div className="relative w-full aspect-video rounded-lg overflow-hidden border border-neutral-800 flex items-center justify-center bg-neutral-900">
//                <PlayCircle size={48} className="text-neutral-600 mb-2" />
//                <span className="absolute mt-16 text-sm text-neutral-500">Video Walkthrough Pending</span>
//             </div>
//           )}

//           <p className="text-neutral-300 leading-relaxed">
//             {project.fullDetails}
//           </p>

//           <div className="flex gap-4 pt-4 border-t border-neutral-800">
//             <a 
//               href={project.githubUrl} 
//               target="_blank" 
//               rel="noopener noreferrer"
//               className="flex items-center gap-2 px-4 py-2 bg-neutral-800 hover:bg-neutral-700 transition-colors rounded-md text-sm font-medium"
//             >
//               <GithubIcon/> Source Code
//             </a>
//             <a 
//               href={project.demoUrl} 
//               target="_blank" 
//               rel="noopener noreferrer"
//               className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-500 transition-colors rounded-md text-sm font-medium text-white"
//             >
//               <ExternalLink size={16} /> Live Demo
//             </a>
//           </div>
//         </div>
//       </DialogContent>
//     </Dialog>
//   );
// }

// export default function Projects() {
//   const [activeCategory, setActiveCategory] = useState<ProjectCategory>("All");

//   const filteredProjects = PROJECTS.filter((project) => 
//     activeCategory === "All" ? true : project.category === activeCategory
//   );

//   return (
//     <div className="min-h-screen pt-32 pb-20 px-6 max-w-7xl mx-auto flex flex-col">
//       <div className="mb-12">
//         <h1 className="text-5xl font-bold mb-6">Selected Works.</h1>
        
//         {/* Filter Bar */}
//         <div className="flex flex-wrap gap-3">
//           {CATEGORIES.map((category) => (
//             <button
//               key={category}
//               onClick={() => setActiveCategory(category)}
//               className={`px-5 py-2 rounded-full text-sm font-semibold transition-all ${
//                 activeCategory === category 
//                   ? "bg-white text-black" 
//                   : "bg-neutral-900 text-neutral-400 hover:bg-neutral-800 hover:text-white border border-transparent hover:border-neutral-700"
//               }`}
//             >
//               {category}
//             </button>
//           ))}
//         </div>
//       </div>

//       {/* Grid with AnimatePresence */}
//       <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
//         <AnimatePresence mode="popLayout">
//           {filteredProjects.map((project) => (
//             <motion.div
//               key={project.id}
//               layout
//               initial={{ opacity: 0, scale: 0.9 }}
//               animate={{ opacity: 1, scale: 1 }}
//               exit={{ opacity: 0, scale: 0.9 }}
//               transition={{ duration: 0.3, type: "spring", bounce: 0.3 }}
//             >
//               <ProjectCard project={project} />
//             </motion.div>
//           ))}
//         </AnimatePresence>
//       </motion.div>
//     </div>
//   );
// }