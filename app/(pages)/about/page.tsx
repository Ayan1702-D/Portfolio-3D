"use client";

import { useEffect, useRef, useMemo, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Html } from "@react-three/drei";
import { motion } from "framer-motion";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { Tilt } from "react-tilt";
import { Award, BadgeCheck, Briefcase, GraduationCap, MapPin, Trophy } from "lucide-react";
import * as THREE from "three";
import { SKILL_BARS } from "@/lib/constants";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const skills = ["Python", "TensorFlow", "PyTorch", "Keras", "OpenCV", "Django", "Docker", "SQL"];

const achievements = [
  {
    icon: Trophy,
    title: "Machine Learning Internship",
    issuer: "Aurionpro Solutions",
    detail:
      "Worked on model development, dataset analysis, and AI solution integration in an enterprise environment.",
  },
  {
    icon: BadgeCheck,
    title: "AI/ML Engineering Track",
    issuer: "LTCE Mumbai",
    detail:
      "Focused academic path across deep learning, computer vision, NLP, databases, and software engineering.",
  },
  {
    icon: Award,
    title: "Production Deployment Practice",
    issuer: "Docker, Vercel, GitHub",
    detail:
      "Built, containerized, and deployed a modern portfolio using Next.js, React Three Fiber, and CI-ready tooling.",
  },
];

function SkillSphere() {
  const groupRef = useRef<THREE.Group>(null);

  const skillPositions = useMemo(() => {
    const positions: THREE.Vector3[] = [];
    const phi = Math.PI * (3 - Math.sqrt(5));
    for (let i = 0; i < skills.length; i++) {
      const y = 1 - (i / (skills.length - 1)) * 2;
      const radiusAtY = Math.sqrt(1 - y * y);
      const theta = phi * i;
      const x = Math.cos(theta) * radiusAtY;
      const z = Math.sin(theta) * radiusAtY;
      positions.push(new THREE.Vector3(x * 2.5, y * 2.5, z * 2.5));
    }
    return positions;
  }, []);

  useFrame((_, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.25;
      groupRef.current.rotation.x += delta * 0.08;
    }
  });

  return (
    <group ref={groupRef}>
      <mesh>
        <sphereGeometry args={[2.5, 16, 16]} />
        <meshBasicMaterial color="#1a3a5c" transparent opacity={0.08} wireframe />
      </mesh>
      {skills.map((skill, i) => (
        <group key={skill} position={skillPositions[i]}>
          <Html center transform sprite distanceFactor={8}>
            <div className="px-3 py-1.5 bg-blue-950/80 backdrop-blur-md border border-blue-500/30 text-white text-xs font-semibold rounded-full whitespace-nowrap shadow-[0_0_12px_rgba(59,130,246,0.25)] hover:bg-blue-900/90 transition-colors cursor-default">
              {skill}
            </div>
          </Html>
        </group>
      ))}
    </group>
  );
}

// ── Dot indicator — 5 dots filled proportionally to level/20 ─────────────────
function DotIndicator({ level }: { level: number }) {
  const filled = Math.round(level / 20);
  return (
    <div className="flex items-center gap-1" aria-label={`${level} out of 100`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <span
          key={i}
          className={`w-2 h-2 rounded-full transition-colors ${
            i < filled ? "bg-blue-400" : "bg-neutral-700"
          }`}
        />
      ))}
    </div>
  );
}

// barVariants kept exactly as original
const barVariants = {
  hidden: { width: 0 },
  visible: (width: string) => ({
    width,
    transition: { duration: 1.1, ease: [0.25, 0.46, 0.45, 0.94] as const, delay: 0.1 },
  }),
};

const timeline = [
  {
    type: "work",
    icon: Briefcase,
    color: "text-blue-400",
    dotColor: "border-blue-500",
    period: "2024",
    title: "Machine Learning Intern",
    company: "Aurionpro Solutions",
    location: "Navi Mumbai, India",
    description:
      "Contributed to ML model development and optimization. Collaborated with senior engineers to analyse datasets, train algorithms, and integrate AI solutions into enterprise architectures.",
    isCard: true,
  },
  {
    type: "edu",
    icon: GraduationCap,
    color: "text-neutral-400",
    dotColor: "border-neutral-500",
    period: "2022 — 2027",
    title: "B.E. Computer Science (AI/ML)",
    company: "LTCE Mumbai",
    description: "Specializing in deep learning, computer vision, and NLP systems.",
    isCard: false,
  },
  {
    type: "edu",
    icon: GraduationCap,
    color: "text-neutral-600",
    dotColor: "border-neutral-700",
    period: "Prior Education",
    title: "HSC & SSC",
    company: "Higher & Secondary School Certificate",
    description: "",
    isCard: false,
  },
];

export default function About() {
  const timelineRef = useRef<HTMLDivElement>(null);
  const pathRef = useRef<SVGPathElement>(null);

  useEffect(() => {
    if (!pathRef.current || !timelineRef.current) return;
    const path = pathRef.current;
    const length = path.getTotalLength();
    gsap.set(path, { strokeDasharray: length, strokeDashoffset: length });
    const trigger = ScrollTrigger.create({
      trigger: timelineRef.current,
      start: "top 70%",
      end: "bottom 30%",
      scrub: 1.5,
      animation: gsap.to(path, { strokeDashoffset: 0, ease: "none" }),
    });
    return () => trigger.kill();
  }, []);

  return (
    <div className="min-h-screen bg-black text-white pt-32 pb-24 px-6 max-w-7xl mx-auto flex flex-col gap-28">

      {/* ── SECTION 1: Hero Bio ─────────────────────────────────────────── */}
      <section className="text-center max-w-3xl mx-auto">
        <p className="text-sm font-semibold tracking-[0.3em] uppercase text-blue-400 mb-4">About Me</p>
        <h1 className="text-5xl sm:text-6xl font-black tracking-tight mb-6 text-white">
          Engineering<br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-600">
            Intelligence.
          </span>
        </h1>
        <p className="text-neutral-400 text-lg leading-relaxed">
          I am an AI/ML engineering student dedicated to architecting systems that learn, adapt, and
          solve complex problems. My focus bridges deep learning theory with practical, scalable
          applications — from neural networks to efficient backend architectures.
        </p>
      </section>

      {/* ── SECTION 2: Skills ───────────────────────────────────────────── */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        {/* 3D Skill Sphere */}
        <div className="h-[420px] w-full relative rounded-2xl bg-neutral-900/20 border border-white/[0.06] overflow-hidden">
          <Canvas camera={{ position: [0, 0, 7], fov: 50 }} gl={{ antialias: false }} dpr={[1, 1.5]}>
            <ambientLight intensity={0.8} />
            <pointLight position={[5, 5, 5]} intensity={1} color="#3b82f6" />
            <Suspense fallback={null}>
              <SkillSphere />
            </Suspense>
          </Canvas>
          <div className="absolute bottom-4 left-0 w-full text-center text-xs text-neutral-600 pointer-events-none">
            Skills at a glance
          </div>
        </div>

        {/* ── Skill Bars ── */}
        <div className="flex flex-col gap-6">
          <h2 className="text-3xl font-bold text-white mb-2">Core Competencies</h2>

          {SKILL_BARS.map((skill) => (
            <div key={skill.name}>
              {/* Label row */}
              <div className="flex items-center justify-between mb-2">
                {/* Name with tooltip via title attribute — hover to see the note */}
                <span
                  className="text-neutral-300 font-medium text-sm cursor-help underline decoration-dotted decoration-neutral-600 underline-offset-4"
                  title={skill.note}
                >
                  {skill.name}
                </span>

                {/* Dot indicator instead of raw "90%" */}
                <DotIndicator level={skill.level} />
              </div>

              {/* Animated fill bar */}
              <div className="w-full h-1.5 bg-neutral-800/80 rounded-full overflow-hidden">
                <motion.div
                  custom={`${skill.level}%`}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-50px" }}
                  variants={barVariants}
                  className="h-full bg-gradient-to-r from-blue-600 to-blue-400 rounded-full"
                />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── SECTION 3: Certifications & Achievements ────────────────────── */}
      <section>
        <div className="max-w-3xl mb-10">
          <p className="text-sm font-semibold tracking-[0.3em] uppercase text-blue-400 mb-3">Proof Points</p>
          <h2 className="text-4xl font-bold text-white mb-4">Certifications &amp; Achievements</h2>
          <p className="text-neutral-500 leading-relaxed">
            A concise view of the academic, professional, and deployment milestones that support my AI/ML profile.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {achievements.map((item) => (
            <div
              key={item.title}
              className="rounded-2xl border border-white/[0.07] bg-neutral-900/50 p-6 hover:border-blue-500/30 transition-colors"
            >
              <div className="mb-5 flex size-11 items-center justify-center rounded-xl bg-blue-500/10 text-blue-400 border border-blue-500/20">
                <item.icon size={20} />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">{item.title}</h3>
              <p className="text-sm font-semibold text-blue-300 mb-3">{item.issuer}</p>
              <p className="text-sm leading-relaxed text-neutral-400">{item.detail}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── SECTION 4: Timeline ─────────────────────────────────────────── */}
      <section ref={timelineRef} className="relative grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-16">
        <div className="lg:sticky lg:top-32 h-fit">
          <p className="text-sm font-semibold tracking-[0.3em] uppercase text-blue-400 mb-3">Experience</p>
          <h2 className="text-4xl font-bold text-white mb-4">Journey &amp; Milestones</h2>
          <p className="text-neutral-500 leading-relaxed">
            The academic and professional milestones that shaped my technical foundation.
          </p>
        </div>

        <div className="relative pl-10 sm:pl-16">
          {/* Animated SVG line */}
          <svg
            className="absolute left-2 sm:left-6 top-2 w-[2px] pointer-events-none overflow-visible"
            style={{ height: "calc(100% - 16px)" }}
            preserveAspectRatio="none"
          >
            <path
              ref={pathRef}
              d="M 1 0 L 1 2000"
              fill="none"
              stroke="url(#lineGrad)"
              strokeWidth="2"
            />
            <defs>
              <linearGradient id="lineGrad" x1="0" y1="0" x2="0" y2="1" gradientUnits="objectBoundingBox">
                <stop offset="0%" stopColor="#3b82f6" />
                <stop offset="100%" stopColor="#1d4ed8" stopOpacity="0.3" />
              </linearGradient>
            </defs>
          </svg>

          <div className="flex flex-col gap-14">
            {timeline.map((item, idx) => (
              <div key={idx} className="relative">
                <div
                  className={`absolute -left-10 sm:-left-[3.5rem] top-1.5 w-3.5 h-3.5 bg-black border-2 ${item.dotColor} rounded-full z-10`}
                />

                {item.isCard ? (
                  <Tilt options={{ max: 10, scale: 1.01, speed: 400, glare: true, "max-glare": 0.1 }}>
                    <div className="bg-neutral-900/60 backdrop-blur-sm border border-neutral-800/80 p-7 rounded-2xl hover:border-blue-500/40 transition-colors group">
                      <div className={`flex items-center gap-2 mb-3 ${item.color} text-xs font-semibold tracking-widest uppercase`}>
                        <item.icon size={14} />
                        <span>Professional Experience</span>
                      </div>
                      <h3 className="text-xl font-bold text-white mb-1">{item.title}</h3>
                      <h4 className="text-neutral-300 mb-1">{item.company}</h4>
                      {"location" in item && item.location && (
                        <div className="flex items-center gap-1.5 text-neutral-500 text-sm mb-4">
                          <MapPin size={12} />
                          <span>{item.location}</span>
                        </div>
                      )}
                      <p className="text-neutral-400 text-sm leading-relaxed">{item.description}</p>
                    </div>
                  </Tilt>
                ) : (
                  <div>
                    <div className={`flex items-center gap-2 mb-2 ${item.color} text-xs font-semibold tracking-widest uppercase`}>
                      <item.icon size={14} />
                      <span>{item.period}</span>
                    </div>
                    <h3 className="text-lg font-bold text-white">{item.title}</h3>
                    <h4 className="text-neutral-400">{item.company}</h4>
                    {item.description && (
                      <p className="text-neutral-500 text-sm mt-1">{item.description}</p>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
// "use client";

// import { useEffect, useRef, useMemo, Suspense } from "react";
// import { Canvas, useFrame } from "@react-three/fiber";
// import { Html } from "@react-three/drei";
// import { motion } from "framer-motion";
// import gsap from "gsap";
// import ScrollTrigger from "gsap/ScrollTrigger";
// import { Tilt } from "react-tilt";
// import { Award, BadgeCheck, Briefcase, GraduationCap, MapPin, Trophy } from "lucide-react";
// import * as THREE from "three";
// import { SKILL_BARS } from "@/lib/constants"

// if (typeof window !== "undefined") {
//   gsap.registerPlugin(ScrollTrigger);
// }

// const skills = ["Python", "TensorFlow", "PyTorch", "Keras", "OpenCV", "Django", "Docker", "SQL"];

// const achievements = [
//   {
//     icon: Trophy,
//     title: "Machine Learning Internship",
//     issuer: "Aurionpro Solutions",
//     detail: "Worked on model development, dataset analysis, and AI solution integration in an enterprise environment.",
//   },
//   {
//     icon: BadgeCheck,
//     title: "AI/ML Engineering Track",
//     issuer: "LTCE Mumbai",
//     detail: "Focused academic path across deep learning, computer vision, NLP, databases, and software engineering.",
//   },
//   {
//     icon: Award,
//     title: "Production Deployment Practice",
//     issuer: "Docker, Vercel, GitHub",
//     detail: "Built, containerized, and deployed a modern portfolio using Next.js, React Three Fiber, and CI-ready tooling.",
//   },
// ];

// // BUG FIX: Removed OrbitControls from SkillSphere — was conflicting with useFrame rotation causing jitter.
// // The sphere rotates smoothly via useFrame only.
// function SkillSphere() {
//   const groupRef = useRef<THREE.Group>(null);

//   const skillPositions = useMemo(() => {
//     const positions: THREE.Vector3[] = [];
//     const phi = Math.PI * (3 - Math.sqrt(5));

//     for (let i = 0; i < skills.length; i++) {
//       const y = 1 - (i / (skills.length - 1)) * 2;
//       const radiusAtY = Math.sqrt(1 - y * y);
//       const theta = phi * i;
//       const x = Math.cos(theta) * radiusAtY;
//       const z = Math.sin(theta) * radiusAtY;
//       positions.push(new THREE.Vector3(x * 2.5, y * 2.5, z * 2.5));
//     }
//     return positions;
//   }, []);

//   function DotIndicator({ level }: { level: number }) {
//   // 5 dots; each dot represents 20 points of the 0-100 scale.
//   const filled = Math.round(level / 20);
//   return (
//     <div className="flex items-center gap-1" aria-label={`${level} out of 100`}>
//       {Array.from({ length: 5 }).map((_, i) => (
//         <span
//           key={i}
//           className={`w-2 h-2 rounded-full transition-colors ${
//             i < filled ? "bg-blue-400" : "bg-neutral-700"
//           }`}
//         />
//       ))}
//     </div>
//   );
// }

//   useFrame((_, delta) => {
//     if (groupRef.current) {
//       groupRef.current.rotation.y += delta * 0.25;
//       groupRef.current.rotation.x += delta * 0.08;
//     }
//   });

//   return (
//     <group ref={groupRef}>
//       {/* Subtle sphere wireframe for context */}
//       <mesh>
//         <sphereGeometry args={[2.5, 16, 16]} />
//         <meshBasicMaterial color="#1a3a5c" transparent opacity={0.08} wireframe />
//       </mesh>

//       {skills.map((skill, i) => (
//         <group key={skill} position={skillPositions[i]}>
//           <Html center transform sprite distanceFactor={8}>
//             <div className="px-3 py-1.5 bg-blue-950/80 backdrop-blur-md border border-blue-500/30 text-white text-xs font-semibold rounded-full whitespace-nowrap shadow-[0_0_12px_rgba(59,130,246,0.25)] hover:bg-blue-900/90 transition-colors cursor-default">
//               {skill}
//             </div>
//           </Html>
//         </group>
//       ))}
//     </group>
//   );
// }

// // BUG FIX: barVariants — custom type annotation added, was causing TypeScript error
// const barVariants = {
//   hidden: { width: 0 },
//   visible: (width: string) => ({
//     width,
//     transition: { duration: 1.1, ease: [0.25, 0.46, 0.45, 0.94] as const, delay: 0.1 },
//   }),
// };

// const timeline = [
//   {
//     type: "work",
//     icon: Briefcase,
//     color: "text-blue-400",
//     dotColor: "border-blue-500",
//     period: "2024",
//     title: "Machine Learning Intern",
//     company: "Aurionpro Solutions",
//     location: "Navi Mumbai, India",
//     description:
//       "Contributed to ML model development and optimization. Collaborated with senior engineers to analyze datasets, train algorithms, and integrate AI solutions into enterprise architectures.",
//     isCard: true,
//   },
//   {
//     type: "edu",
//     icon: GraduationCap,
//     color: "text-neutral-400",
//     dotColor: "border-neutral-500",
//     period: "2022 — 2027",
//     title: "B.E. Computer Science (AI/ML)",
//     company: "LTCE Mumbai",
//     description: "Specializing in deep learning, computer vision, and NLP systems.",
//     isCard: false,
//   },
//   {
//     type: "edu",
//     icon: GraduationCap,
//     color: "text-neutral-600",
//     dotColor: "border-neutral-700",
//     period: "Prior Education",
//     title: "HSC & SSC",
//     company: "Higher & Secondary School Certificate",
//     description: "",
//     isCard: false,
//   },
// ];

// export default function About() {
//   const timelineRef = useRef<HTMLDivElement>(null);
//   const pathRef = useRef<SVGPathElement>(null);

//   useEffect(() => {
//     if (!pathRef.current || !timelineRef.current) return;
//     const path = pathRef.current;
//     const length = path.getTotalLength();

//     gsap.set(path, { strokeDasharray: length, strokeDashoffset: length });

//     const trigger = ScrollTrigger.create({
//       trigger: timelineRef.current,
//       start: "top 70%",
//       end: "bottom 30%",
//       scrub: 1.5,
//       animation: gsap.to(path, { strokeDashoffset: 0, ease: "none" }),
//     });

//     return () => trigger.kill();
//   }, []);

//   return (
//     <div className="min-h-screen bg-black text-white pt-32 pb-24 px-6 max-w-7xl mx-auto flex flex-col gap-28">

//       {/* SECTION 1: Hero Bio */}
//       <section className="text-center max-w-3xl mx-auto">
//         <p className="text-sm font-semibold tracking-[0.3em] uppercase text-blue-400 mb-4">About Me</p>
//         <h1 className="text-5xl sm:text-6xl font-black tracking-tight mb-6 text-white">
//           Engineering<br />
//           <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-600">
//             Intelligence.
//           </span>
//         </h1>
//         <p className="text-neutral-400 text-lg leading-relaxed">
//           I am an AI/ML engineering student dedicated to architecting systems that learn, adapt, and solve complex problems.
//           My focus bridges deep learning theory with practical, scalable applications — from neural networks to efficient backend architectures.
//         </p>
//       </section>

//       {/* SECTION 2: Skills */}
      
//       <section className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
//         {/* 3D Skill Sphere — Suspense required for Html from drei */}
//         <div className="h-[420px] w-full relative rounded-2xl bg-neutral-900/20 border border-white/[0.06] overflow-hidden">
//           <Canvas camera={{ position: [0, 0, 7], fov: 50 }} gl={{ antialias: false }} dpr={[1, 1.5]}>
//             <ambientLight intensity={0.8} />
//             <pointLight position={[5, 5, 5]} intensity={1} color="#3b82f6" />
//             <Suspense fallback={null}>
//               <SkillSphere />
//             </Suspense>
//           </Canvas>
//           <div className="absolute bottom-4 left-0 w-full text-center text-xs text-neutral-600 pointer-events-none">
//             Skills at a glance
//           </div>
//         </div>
        

//         {/* Skill Bars */}
//         <div className="flex flex-col gap-6">
//           <h2 className="text-3xl font-bold text-white mb-2">Core Competencies</h2>
//           {[
//             { name: "Deep Learning (PyTorch / TensorFlow)", level: "90%" },
//             { name: "Computer Vision & OpenCV", level: "85%" },
//             { name: "NLP & Transformers", level: "80%" },
//             { name: "Backend Architecture (Django / Python)", level: "78%" },
//             { name: "MLOps & Docker", level: "72%" },
//           ].map((skill) => (
//             <div key={skill.name}>
//               <div className="flex justify-between text-sm mb-2">
//                 <span className="text-neutral-300 font-medium">{skill.name}</span>
//                 <span className="text-neutral-500">{skill.level}</span>
//               </div>
//               <div className="w-full h-1.5 bg-neutral-800/80 rounded-full overflow-hidden">
//                 <motion.div
//                   custom={skill.level}
//                   initial="hidden"
//                   whileInView="visible"
//                   viewport={{ once: true, margin: "-50px" }}
//                   variants={barVariants}
//                   className="h-full bg-gradient-to-r from-blue-600 to-blue-400 rounded-full"
//                 />
//               </div>
//             </div>
//           ))}
//         </div>
//       </section>

//       {/* SECTION 3: Certifications & Achievements */}
//       <section>
//         <div className="max-w-3xl mb-10">
//           <p className="text-sm font-semibold tracking-[0.3em] uppercase text-blue-400 mb-3">Proof Points</p>
//           <h2 className="text-4xl font-bold text-white mb-4">Certifications &amp; Achievements</h2>
//           <p className="text-neutral-500 leading-relaxed">
//             A concise view of the academic, professional, and deployment milestones that support my AI/ML profile.
//           </p>
//         </div>

//         <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
//           {achievements.map((item) => (
//             <div key={item.title} className="rounded-2xl border border-white/[0.07] bg-neutral-900/50 p-6 hover:border-blue-500/30 transition-colors">
//               <div className="mb-5 flex size-11 items-center justify-center rounded-xl bg-blue-500/10 text-blue-400 border border-blue-500/20">
//                 <item.icon size={20} />
//               </div>
//               <h3 className="text-lg font-bold text-white mb-2">{item.title}</h3>
//               <p className="text-sm font-semibold text-blue-300 mb-3">{item.issuer}</p>
//               <p className="text-sm leading-relaxed text-neutral-400">{item.detail}</p>
//             </div>
//           ))}
//         </div>
//       </section>

//       {/* SECTION 4: Timeline */}
//       <section ref={timelineRef} className="relative grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-16">
//         <div className="lg:sticky lg:top-32 h-fit">
//           <p className="text-sm font-semibold tracking-[0.3em] uppercase text-blue-400 mb-3">Experience</p>
//           <h2 className="text-4xl font-bold text-white mb-4">Journey &amp; Milestones</h2>
//           <p className="text-neutral-500 leading-relaxed">
//             The academic and professional milestones that shaped my technical foundation.
//           </p>
//         </div>

//         <div className="relative pl-10 sm:pl-16">
//           {/* Animated SVG Line */}
//           <svg
//             className="absolute left-2 sm:left-6 top-2 w-[2px] pointer-events-none overflow-visible"
//             style={{ height: "calc(100% - 16px)" }}
//             preserveAspectRatio="none"
//           >
//             <path
//               ref={pathRef}
//               d="M 1 0 L 1 2000"
//               fill="none"
//               stroke="url(#lineGrad)"
//               strokeWidth="2"
//             />
//             <defs>
//               <linearGradient id="lineGrad" x1="0" y1="0" x2="0" y2="1" gradientUnits="objectBoundingBox">
//                 <stop offset="0%" stopColor="#3b82f6" />
//                 <stop offset="100%" stopColor="#1d4ed8" stopOpacity="0.3" />
//               </linearGradient>
//             </defs>
//           </svg>

//           <div className="flex flex-col gap-14">
//             {timeline.map((item, idx) => (
//               <div key={idx} className="relative">
//                 {/* Dot on line */}
//                 <div
//                   className={`absolute -left-10 sm:-left-[3.5rem] top-1.5 w-3.5 h-3.5 bg-black border-2 ${item.dotColor} rounded-full z-10`}
//                 />

//                 {item.isCard ? (
//                   <Tilt
//                     options={{ max: 10, scale: 1.01, speed: 400, glare: true, "max-glare": 0.1 }}
//                   >
//                     <div className="bg-neutral-900/60 backdrop-blur-sm border border-neutral-800/80 p-7 rounded-2xl hover:border-blue-500/40 transition-colors group">
//                       <div className={`flex items-center gap-2 mb-3 ${item.color} text-xs font-semibold tracking-widest uppercase`}>
//                         <item.icon size={14} />
//                         <span>Professional Experience</span>
//                       </div>
//                       <h3 className="text-xl font-bold text-white mb-1">{item.title}</h3>
//                       <h4 className="text-neutral-300 mb-1">{item.company}</h4>
//                       {item.location && (
//                         <div className="flex items-center gap-1.5 text-neutral-500 text-sm mb-4">
//                           <MapPin size={12} />
//                           <span>{item.location}</span>
//                         </div>
//                       )}
//                       <p className="text-neutral-400 text-sm leading-relaxed">{item.description}</p>
//                     </div>
//                   </Tilt>
//                 ) : (
//                   <div>
//                     <div className={`flex items-center gap-2 mb-2 ${item.color} text-xs font-semibold tracking-widest uppercase`}>
//                       <item.icon size={14} />
//                       <span>{item.period}</span>
//                     </div>
//                     <h3 className="text-lg font-bold text-white">{item.title}</h3>
//                     <h4 className="text-neutral-400">{item.company}</h4>
//                     {item.description && (
//                       <p className="text-neutral-500 text-sm mt-1">{item.description}</p>
//                     )}
//                   </div>
//                 )}
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>
//     </div>
//   );
// }