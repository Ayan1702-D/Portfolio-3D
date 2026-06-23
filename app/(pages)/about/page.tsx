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

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const skills = ["Python", "TensorFlow", "PyTorch", "Keras", "OpenCV", "Django", "Docker", "SQL"];

const achievements = [
  {
    icon: Trophy,
    title: "Machine Learning Internship",
    issuer: "Aurionpro Solutions",
    detail: "Worked on model development, dataset analysis, and AI solution integration in an enterprise environment.",
  },
  {
    icon: BadgeCheck,
    title: "AI/ML Engineering Track",
    issuer: "LTCE Mumbai",
    detail: "Focused academic path across deep learning, computer vision, NLP, databases, and software engineering.",
  },
  {
    icon: Award,
    title: "Production Deployment Practice",
    issuer: "Docker, Vercel, GitHub",
    detail: "Built, containerized, and deployed a modern portfolio using Next.js, React Three Fiber, and CI-ready tooling.",
  },
];

// BUG FIX: Removed OrbitControls from SkillSphere — was conflicting with useFrame rotation causing jitter.
// The sphere rotates smoothly via useFrame only.
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
      {/* Subtle sphere wireframe for context */}
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

// BUG FIX: barVariants — custom type annotation added, was causing TypeScript error
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
      "Contributed to ML model development and optimization. Collaborated with senior engineers to analyze datasets, train algorithms, and integrate AI solutions into enterprise architectures.",
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

      {/* SECTION 1: Hero Bio */}
      <section className="text-center max-w-3xl mx-auto">
        <p className="text-sm font-semibold tracking-[0.3em] uppercase text-blue-400 mb-4">About Me</p>
        <h1 className="text-5xl sm:text-6xl font-black tracking-tight mb-6 text-white">
          Engineering<br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-600">
            Intelligence.
          </span>
        </h1>
        <p className="text-neutral-400 text-lg leading-relaxed">
          I am an AI/ML engineering student dedicated to architecting systems that learn, adapt, and solve complex problems.
          My focus bridges deep learning theory with practical, scalable applications — from neural networks to efficient backend architectures.
        </p>
      </section>

      {/* SECTION 2: Skills */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        {/* 3D Skill Sphere — Suspense required for Html from drei */}
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

        {/* Skill Bars */}
        <div className="flex flex-col gap-6">
          <h2 className="text-3xl font-bold text-white mb-2">Core Competencies</h2>
          {[
            { name: "Deep Learning (PyTorch / TensorFlow)", level: "90%" },
            { name: "Computer Vision & OpenCV", level: "85%" },
            { name: "NLP & Transformers", level: "80%" },
            { name: "Backend Architecture (Django / Python)", level: "78%" },
            { name: "MLOps & Docker", level: "72%" },
          ].map((skill) => (
            <div key={skill.name}>
              <div className="flex justify-between text-sm mb-2">
                <span className="text-neutral-300 font-medium">{skill.name}</span>
                <span className="text-neutral-500">{skill.level}</span>
              </div>
              <div className="w-full h-1.5 bg-neutral-800/80 rounded-full overflow-hidden">
                <motion.div
                  custom={skill.level}
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

      {/* SECTION 3: Certifications & Achievements */}
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
            <div key={item.title} className="rounded-2xl border border-white/[0.07] bg-neutral-900/50 p-6 hover:border-blue-500/30 transition-colors">
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

      {/* SECTION 4: Timeline */}
      <section ref={timelineRef} className="relative grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-16">
        <div className="lg:sticky lg:top-32 h-fit">
          <p className="text-sm font-semibold tracking-[0.3em] uppercase text-blue-400 mb-3">Experience</p>
          <h2 className="text-4xl font-bold text-white mb-4">Journey &amp; Milestones</h2>
          <p className="text-neutral-500 leading-relaxed">
            The academic and professional milestones that shaped my technical foundation.
          </p>
        </div>

        <div className="relative pl-10 sm:pl-16">
          {/* Animated SVG Line */}
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
                {/* Dot on line */}
                <div
                  className={`absolute -left-10 sm:-left-[3.5rem] top-1.5 w-3.5 h-3.5 bg-black border-2 ${item.dotColor} rounded-full z-10`}
                />

                {item.isCard ? (
                  <Tilt
                    options={{ max: 10, scale: 1.01, speed: 400, glare: true, "max-glare": 0.1 }}
                  >
                    <div className="bg-neutral-900/60 backdrop-blur-sm border border-neutral-800/80 p-7 rounded-2xl hover:border-blue-500/40 transition-colors group">
                      <div className={`flex items-center gap-2 mb-3 ${item.color} text-xs font-semibold tracking-widest uppercase`}>
                        <item.icon size={14} />
                        <span>Professional Experience</span>
                      </div>
                      <h3 className="text-xl font-bold text-white mb-1">{item.title}</h3>
                      <h4 className="text-neutral-300 mb-1">{item.company}</h4>
                      {item.location && (
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
// import { useEffect, useRef, useMemo } from "react";
// import { Canvas, useFrame } from "@react-three/fiber";
// import { OrbitControls, Html } from "@react-three/drei";
// import { motion, Variants } from "framer-motion";
// import gsap from "gsap";
// import ScrollTrigger from "gsap/ScrollTrigger";
// import { Tilt } from "react-tilt";
// import { Briefcase, GraduationCap, MapPin } from "lucide-react";
// import * as THREE from "three";

// // Register GSAP ScrollTrigger
// if (typeof window !== "undefined") {
//   gsap.registerPlugin(ScrollTrigger);
// }

// // --- 3D Skill Sphere Component ---
// const skills = ["Python", "TensorFlow", "PyTorch", "Keras", "OpenCV", "Django", "Docker", "SQL"];

// function SkillSphere() {
//   const groupRef = useRef<THREE.Group>(null);

//   // Distribute skills evenly on a sphere using Fibonacci lattice
//   const skillPositions = useMemo(() => {
//     const positions: THREE.Vector3[] = [];
//     const phi = Math.PI * (3 - Math.sqrt(5)); // Golden angle

//     for (let i = 0; i < skills.length; i++) {
//       const y = 1 - (i / (skills.length - 1)) * 2; // y goes from 1 to -1
//       const radiusAtY = Math.sqrt(1 - y * y);
//       const theta = phi * i;

//       const x = Math.cos(theta) * radiusAtY;
//       const z = Math.sin(theta) * radiusAtY;

//       // Scale up the sphere radius
//       positions.push(new THREE.Vector3(x * 2.5, y * 2.5, z * 2.5));
//     }
//     return positions;
//   }, []);

//   useFrame((state, delta) => {
//     if (groupRef.current) {
//       // Increment rotation using delta time
//       groupRef.current.rotation.y += delta * 0.2;
//       groupRef.current.rotation.x += delta * 0.1;
//     }
//   });

//   return (
//     <group ref={groupRef}>
//       {skills.map((skill, i) => (
//         <group key={skill} position={skillPositions[i]}>
//           <Html center transform sprite>
//             <div className="px-3 py-1.5 bg-white/10 backdrop-blur-md border border-white/20 text-white text-sm font-semibold rounded-full whitespace-nowrap shadow-[0_0_15px_rgba(59,130,246,0.3)]">
//               {skill}
//             </div>
//           </Html>
//         </group>
//       ))}
//     </group>
//   );
// }

// // --- Main About Page Component ---
// export default function About() {
//   const timelineRef = useRef<HTMLDivElement>(null);
//   const pathRef = useRef<SVGPathElement>(null);

//   // GSAP Scroll-triggered SVG Line Draw
//   useEffect(() => {
//     if (!pathRef.current || !timelineRef.current) return;
    
//     const path = pathRef.current;
//     const length = path.getTotalLength();
    
//     // Set initial state
//     gsap.set(path, { strokeDasharray: length, strokeDashoffset: length });
    
//     // Animate on scroll
//     gsap.to(path, {
//       strokeDashoffset: 0,
//       ease: "none",
//       scrollTrigger: {
//         trigger: timelineRef.current,
//         start: "top center",
//         end: "bottom center",
//         scrub: 1,
//       }
//     });
//   }, []);

//   // Framer Motion variants for skill bars
//   const barVariants: Variants = {
//   hidden: { width: 0 },
//   visible: (width: string) => ({
//     width,
//     transition: { duration: 1, ease: "easeOut", delay: 0.2 }
//   })
// };

//   return (
//     <div className="min-h-screen bg-black text-white pt-32 pb-20 px-6 max-w-7xl mx-auto flex flex-col gap-32">
      
//       {/* SECTION 1: Bio & 3D Skills */}
//       <section className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
//         {/* Left: 3D Canvas */}
//         <div className="h-[400px] lg:h-[500px] w-full relative rounded-2xl bg-neutral-900/30 border border-white/10 overflow-hidden">
//           <Canvas camera={{ position: [0, 0, 6], fov: 50 }}>
//             <ambientLight intensity={0.5} />
//             <SkillSphere />
//             <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={1} />
//           </Canvas>
//           <div className="absolute bottom-4 left-0 w-full text-center text-xs text-neutral-500 pointer-events-none">
//             Drag to interact
//           </div>
//         </div>

//         {/* Right: Bio & Skill Bars */}
//         <div className="flex flex-col gap-8">
//           <div>
//             <h2 className="text-4xl font-bold mb-6 text-white">Engineering Intelligence.</h2>
//             <p className="text-neutral-300 leading-relaxed text-lg">
//               I am an AI/ML engineering student dedicated to architecting systems that learn, adapt, and solve complex problems. My focus bridges deep learning theories with practical, scalable applications—from neural networks to efficient backend architectures.
//             </p>
//           </div>

//           <div className="flex flex-col gap-5 mt-4">
//             {[
//               { name: "Deep Learning (PyTorch/TensorFlow)", level: "90%" },
//               { name: "Computer Vision & OpenCV", level: "85%" },
//               { name: "Backend Architecture (Django/Python)", level: "80%" },
//             ].map((skill) => (
//               <div key={skill.name}>
//                 <div className="flex justify-between text-sm mb-2 text-neutral-400">
//                   <span>{skill.name}</span>
//                 </div>
//                 <div className="w-full h-2 bg-neutral-800 rounded-full overflow-hidden">
//                   <motion.div
//                     custom={skill.level}
//                     initial="hidden"
//                     whileInView="visible"
//                     viewport={{ once: true }}
//                     variants={barVariants}
//                     className="h-full bg-blue-500 rounded-full shadow-[0_0_10px_rgba(59,130,246,0.5)]"
//                   />
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* SECTION 2: Timeline & Experience */}
//       <section ref={timelineRef} className="relative grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-16">
        
//         {/* Sticky Header */}
//         <div className="lg:sticky lg:top-32 h-fit">
//           <h2 className="text-4xl font-bold mb-4">Journey & Experience</h2>
//           <p className="text-neutral-400">The academic and professional milestones that shaped my technical foundation.</p>
//         </div>

//         {/* Timeline Content */}
//         <div className="relative pl-8 sm:pl-16">
//           {/* Animated SVG Line */}
//           <svg className="absolute left-0 sm:left-6 top-2 w-4 h-full pointer-events-none overflow-visible" preserveAspectRatio="none">
//             <path 
//               ref={pathRef}
//               d="M 2 0 L 2 1000" 
//               fill="none" 
//               stroke="#3b82f6" 
//               strokeWidth="2" 
//               className="drop-shadow-[0_0_8px_rgba(59,130,246,0.8)]"
//             />
//           </svg>

//           <div className="flex flex-col gap-16">
            
//             {/* Experience Card (Aurionpro) with react-tilt */}
//             <Tilt options={{ max: 15, scale: 1.02, speed: 400, glare: true, "max-glare": 0.2 }} className="relative z-10">
//               <div className="bg-neutral-900/50 backdrop-blur-sm border border-neutral-800 p-8 rounded-2xl relative overflow-hidden group hover:border-blue-500/50 transition-colors">
//                 <div className="absolute -left-12 sm:-left-20 top-8 w-4 h-4 bg-black border-2 border-blue-500 rounded-full z-20" />
                
//                 <div className="flex items-center gap-3 mb-4 text-blue-400">
//                   <Briefcase size={20} />
//                   <span className="font-semibold tracking-wider text-sm uppercase">Professional Experience</span>
//                 </div>
                
//                 <h3 className="text-2xl font-bold text-white mb-2">Machine Learning Intern</h3>
//                 <h4 className="text-lg text-neutral-300 mb-1">Aurionpro Solutions</h4>
//                 <div className="flex items-center gap-2 text-neutral-500 text-sm mb-6">
//                   <MapPin size={14} />
//                   <span>Navi Mumbai, India</span>
//                 </div>
                
//                 <p className="text-neutral-400 leading-relaxed">
//                   Contributed to the development and optimization of machine learning models. Collaborated with senior engineers to analyze datasets, train algorithms, and integrate AI solutions into enterprise architectures.
//                 </p>
//               </div>
//             </Tilt>

//             {/* Education Milestone (LTCE) */}
//             <div className="relative z-10">
//               <div className="absolute -left-12 sm:-left-20 top-2 w-4 h-4 bg-black border-2 border-neutral-500 rounded-full" />
//               <div className="flex items-center gap-3 mb-4 text-neutral-400">
//                 <GraduationCap size={20} />
//                 <span className="font-semibold tracking-wider text-sm uppercase">2022 — 2026</span>
//               </div>
//               <h3 className="text-xl font-bold text-white mb-1">B.E. Computer Science (AI/ML)</h3>
//               <h4 className="text-neutral-300">LTCE Mumbai</h4>
//             </div>

//             {/* Education Milestone (HSC/SSC) */}
//             <div className="relative z-10">
//               <div className="absolute -left-12 sm:-left-20 top-2 w-4 h-4 bg-black border-2 border-neutral-600 rounded-full" />
//               <div className="flex items-center gap-3 mb-4 text-neutral-500">
//                 <GraduationCap size={20} />
//                 <span className="font-semibold tracking-wider text-sm uppercase">Prior Education</span>
//               </div>
//               <h3 className="text-lg font-semibold text-neutral-200 mb-1">HSC & SSC</h3>
//               <h4 className="text-neutral-400">Higher Secondary & Secondary School Certificate</h4>
//             </div>

//           </div>
//         </div>
//       </section>

//     </div>
//   );
// }
