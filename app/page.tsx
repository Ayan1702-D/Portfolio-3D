"use client";

import { useEffect, useRef, useState, useMemo, Suspense } from "react";
import Link from "next/link";
import * as THREE from "three";
import { Canvas, useFrame } from "@react-three/fiber";
import { Stars } from "@react-three/drei";
import gsap from "gsap";
import { ArrowRight, Briefcase, Code2, Download, MapPin, Star, GraduationCap, Mail, Rocket } from "lucide-react";
import { useInView } from "framer-motion";
import { PERSONAL_INFO, HERO_STATS } from "@/lib/constants";
import { PROJECTS } from "@/data/projects";

const ROLES = ["ML Engineer", "AI Developer", "Data Scientist"];

const focusAreas = [
  {
    icon: Code2,
    title: "Model Engineering",
    text: "Training, evaluation, and iteration across deep learning, NLP, and computer vision workflows.",
  },
  {
    icon: Rocket,
    title: "Product Delivery",
    text: "Turning experiments into usable apps with clean interfaces, APIs, Docker, and deployment-ready structure.",
  },
  {
    icon: Briefcase,
    title: "Team Fit",
    text: "Comfortable moving between research notes, implementation details, and practical business constraints.",
  },
];

const featuredProjects = PROJECTS.slice(0, 3);

function seededRandom(seed: number) {
  const x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
}

// ── 3D Neural Network ─────────────────────────────────────────────────────────
function NeuralNetwork() {
  const pointsRef = useRef<THREE.Points>(null);
  const linesRef  = useRef<THREE.LineSegments>(null);

  const { positions, linePositions } = useMemo(() => {
    const particleCount = 400;
    const maxDistance   = 1.5;
    const positionsArray = new Float32Array(particleCount * 3);
    const vectors: THREE.Vector3[] = [];

    for (let i = 0; i < particleCount; i++) {
      const x = (seededRandom(i * 3 + 1) - 0.5) * 20;
      const y = (seededRandom(i * 3 + 2) - 0.5) * 20;
      const z = (seededRandom(i * 3 + 3) - 0.5) * 20;
      positionsArray[i * 3]     = x;
      positionsArray[i * 3 + 1] = y;
      positionsArray[i * 3 + 2] = z;
      vectors.push(new THREE.Vector3(x, y, z));
    }

    const linesArray: number[] = [];
    for (let i = 0; i < particleCount; i++) {
      for (let j = i + 1; j < particleCount; j++) {
        if (vectors[i].distanceTo(vectors[j]) < maxDistance) {
          linesArray.push(
            vectors[i].x, vectors[i].y, vectors[i].z,
            vectors[j].x, vectors[j].y, vectors[j].z
          );
        }
      }
    }

    return {
      positions:     positionsArray,
      linePositions: new Float32Array(linesArray),
    };
  }, []);

  const rotationRef = useRef({ x: 0, y: 0 });

  useFrame((state, delta) => {
    const { pointer } = state;
    rotationRef.current.y += delta * 0.05;
    rotationRef.current.x += delta * 0.02;
    const finalX = rotationRef.current.x + (pointer.y * Math.PI) / 12 * 0.15;
    const finalY = rotationRef.current.y + (pointer.x * Math.PI) / 12 * 0.15;
    if (pointsRef.current) {
      pointsRef.current.rotation.x = finalX;
      pointsRef.current.rotation.y = finalY;
    }
    if (linesRef.current) {
      linesRef.current.rotation.x = finalX;
      linesRef.current.rotation.y = finalY;
    }
  });

  return (
    <group>
      <points ref={pointsRef}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        </bufferGeometry>
        <pointsMaterial size={0.04} color="#4ea8de" transparent opacity={0.85} sizeAttenuation />
      </points>
      <lineSegments ref={linesRef}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[linePositions, 3]} />
        </bufferGeometry>
        <lineBasicMaterial color="#5390d9" transparent opacity={0.2} />
      </lineSegments>
    </group>
  );
}

// ── Count-up animated stat ─────────────────────────────────────────────────────
function parseStatValue(value: string): { num: number; suffix: string } {
  const match = value.match(/^(\d+)(.*)$/);
  if (!match) return { num: 0, suffix: value };
  return { num: parseInt(match[1], 10), suffix: match[2] };
}

function AnimatedStat({
  value,
  label,
  reducedMotion,
  inView,
}: {
  value: string;
  label: string;
  reducedMotion: boolean;
  inView: boolean;
}) {
  const { num, suffix } = parseStatValue(value);
  const isNumeric = !isNaN(num) && value !== suffix;
  const [displayed, setDisplayed] = useState(reducedMotion || !isNumeric ? num : 0);

  useEffect(() => {
    if (!inView || reducedMotion || !isNumeric) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setDisplayed(num);
      return;
    }
    const duration = 1200;
    const start    = performance.now();
    let raf: number;
    const tick = (now: number) => {
      const elapsed  = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased    = 1 - Math.pow(1 - progress, 2); // easeOut quad
      setDisplayed(Math.floor(eased * num));
      if (progress < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, reducedMotion, num, isNumeric]);

  return (
    <div className="text-center sm:text-left">
      <div className="text-2xl font-bold text-white">
        {isNumeric ? `${displayed}${suffix}` : value}
      </div>
      <div className="text-xs text-neutral-500 mt-0.5">{label}</div>
    </div>
  );
}

function HeroStats() {
  const statsRef = useRef<HTMLDivElement>(null);
  const inView   = useInView(statsRef, { once: true, margin: "-80px" });
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setReducedMotion(
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    );
  }, []);

  return (
    <div
      ref={statsRef}
      className="mt-14 flex items-center gap-8 justify-center sm:justify-start"
    >
      {HERO_STATS.map((stat) => (
        <AnimatedStat
          key={stat.label}
          value={stat.value}
          label={stat.label}
          reducedMotion={reducedMotion}
          inView={inView}
        />
      ))}
    </div>
  );
}

// ── Main Page ──────────────────────────────────────────────────────────────────
export default function Home() {
  const textRef = useRef<HTMLHeadingElement>(null);
  const name    = "Ayan";

  const [currentRoleIndex, setCurrentRoleIndex] = useState(0);
  const [displayedText, setDisplayedText]       = useState("");
  const [isDeleting, setIsDeleting]             = useState(false);

  // GSAP staggered name reveal
  useEffect(() => {
    if (!textRef.current) return;
    const chars = textRef.current.querySelectorAll(".char");
    gsap.fromTo(
      chars,
      { opacity: 0, y: 40, rotateX: -90 },
      {
        opacity: 1,
        y: 0,
        rotateX: 0,
        stagger: 0.08,
        duration: 0.9,
        ease: "back.out(1.7)",
        delay: 0.3,
      }
    );
  }, []);

  // Typewriter effect
  useEffect(() => {
    const typingSpeed  = 100;
    const deletingSpeed = 50;
    const pauseTime    = 1800;
    const currentRole  = ROLES[currentRoleIndex];

    const handleType = () => {
      if (isDeleting) {
        const next = displayedText.slice(0, -1);
        setDisplayedText(next);
        if (next === "") {
          setIsDeleting(false);
          setCurrentRoleIndex((prev) => (prev + 1) % ROLES.length);
        }
      } else {
        const next = currentRole.slice(0, displayedText.length + 1);
        setDisplayedText(next);
        if (next === currentRole) {
          setTimeout(() => setIsDeleting(true), pauseTime);
          return;
        }
      }
    };

    const timer = setTimeout(handleType, isDeleting ? deletingSpeed : typingSpeed);
    return () => clearTimeout(timer);
  }, [displayedText, isDeleting, currentRoleIndex]);

  return (
    <div className="bg-black text-white">

      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <section className="relative w-full min-h-[calc(100vh-5rem)] overflow-hidden bg-black text-white">
        <div className="absolute inset-0 z-0 opacity-75">
          <Canvas
            camera={{ position: [0, 0, 8], fov: 60 }}
            gl={{ antialias: false, powerPreference: "high-performance" }}
            dpr={[1, 1.5]}
          >
            <ambientLight intensity={0.5} />
            <Suspense fallback={null}>
              <NeuralNetwork />
              <Stars radius={100} depth={50} count={2500} factor={4} saturation={0} fade speed={0.8} />
            </Suspense>
          </Canvas>
        </div>

        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center pointer-events-none px-6">
          <div className="max-w-4xl w-full text-center sm:text-left pointer-events-auto">
            <p className="text-sm font-semibold tracking-[0.3em] uppercase text-blue-400 mb-6 opacity-80">
              AI / ML Engineer
            </p>

            <h1
              ref={textRef}
              className="text-7xl sm:text-9xl font-black tracking-tighter mb-2 flex justify-center sm:justify-start"
              aria-label={name}
            >
              {name.split("").map((char, i) => (
                <span
                  key={i}
                  className="char inline-block text-transparent bg-clip-text bg-gradient-to-br from-white via-white to-neutral-400"
                  style={{ opacity: 0 }}
                >
                  {char}
                </span>
              ))}
              <span className="text-blue-500">.</span>
            </h1>

            <div className="h-10 sm:h-14 flex items-center justify-center sm:justify-start mb-10 mt-4">
              <p className="text-xl sm:text-3xl font-light text-neutral-400">
                I&apos;m{" "}
                <span className="font-semibold text-white">{displayedText}</span>
                <span className="animate-pulse text-blue-400">|</span>
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-4 justify-center sm:justify-start">
              <Link
                href="/projects"
                className="group relative inline-flex items-center gap-2 px-7 py-3.5 bg-white text-black font-semibold rounded-full overflow-hidden transition-all hover:scale-105 active:scale-95 hover:shadow-[0_0_30px_rgba(255,255,255,0.3)]"
              >
                <span>View Projects</span>
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </Link>

              <Link
                href="/certificates"
                className="group relative inline-flex items-center gap-2 px-7 py-3.5 bg-blue-900/20 text-blue-100 font-semibold rounded-full border border-blue-500/30 backdrop-blur-md overflow-hidden transition-all hover:scale-105 active:scale-95 hover:bg-blue-900/40 hover:shadow-[0_0_30px_rgba(59,130,246,0.2)]"
              >
                <span>View Certificates</span>
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </Link>

              <Link
                href="/contact"
                className="group relative inline-flex items-center gap-2 px-7 py-3.5 bg-transparent text-neutral-300 font-semibold rounded-full border border-neutral-700 overflow-hidden transition-all hover:scale-105 active:scale-95 hover:border-blue-500 hover:text-white hover:shadow-[0_0_20px_rgba(59,130,246,0.3)]"
              >
                <Mail size={16} />
                <span>Contact Me</span>
              </Link>

              <a
                href={PERSONAL_INFO.resumeUrl}
                download
                className="group inline-flex items-center gap-2 px-7 py-3.5 bg-blue-600 text-white font-semibold rounded-full hover:bg-blue-500 transition-all hover:scale-105 active:scale-95"
              >
                <Download size={16} />
                <span>Resume</span>
              </a>
            </div>

            {/* ── Animated stats ── */}
            <HeroStats />
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center opacity-40 animate-bounce pointer-events-none">
          <span className="text-xs uppercase tracking-widest mb-2 text-neutral-400">Scroll</span>
          <div className="w-[1px] h-10 bg-gradient-to-b from-white to-transparent" />
        </div>
      </section>

      {/* ── Info strip ───────────────────────────────────────────────────── */}
      <section className="border-y border-white/[0.06] bg-neutral-950/80">
        <div className="max-w-7xl mx-auto px-6 py-7 grid grid-cols-2 lg:grid-cols-4 gap-5">
          {[
            { icon: Briefcase,      label: "Experience",  value: "ML Intern at Aurionpro" },
            { icon: GraduationCap,  label: "Degree",      value: "B.E. CSE AI/ML, 2027" },
            { icon: Code2,          label: "Tools",       value: "Python, PyTorch, Next.js, Docker" },
            { icon: Rocket,         label: "Deployment",  value: "Vercel and Docker ready" },
          ].map((item) => (
            <div key={item.label} className="flex items-start gap-3">
              <div className="mt-0.5 flex size-9 items-center justify-center rounded-lg bg-blue-500/10 text-blue-400 border border-blue-500/20">
                <item.icon size={17} />
              </div>
              <div>
                <p className="text-xs uppercase tracking-widest text-neutral-500">{item.label}</p>
                <p className="mt-1 text-sm font-semibold text-white leading-snug">{item.value}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Recruiter snapshot ───────────────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-6 py-24 grid grid-cols-1 lg:grid-cols-[0.85fr_1.15fr] gap-12 items-start">
        <div>
          <p className="text-sm font-semibold tracking-[0.3em] uppercase text-blue-400 mb-3">Recruiter Snapshot</p>
          <h2 className="text-4xl sm:text-5xl font-black tracking-tight text-white mb-4">
            Quick signal for hiring teams.
          </h2>
          <p className="text-neutral-400 leading-relaxed max-w-xl">
            A focused view of what I am targeting, where I am based, and the strengths I can bring to AI/ML teams.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {[
            { icon: Briefcase,     label: "Availability", value: PERSONAL_INFO.availability },
            { icon: MapPin,         label: "Location",     value: PERSONAL_INFO.location },
            { icon: Star,     label: "Target Roles", value: PERSONAL_INFO.targetRoles.join(", ") },
            { icon: GraduationCap, label: "Graduation",   value: PERSONAL_INFO.graduationYear },
          ].map((item) => (
            <div key={item.label} className="rounded-xl border border-white/[0.07] bg-neutral-900/50 p-5">
              <div className="flex items-center gap-2 text-blue-400 mb-3">
                <item.icon size={16} />
                <span className="text-xs font-semibold uppercase tracking-widest">{item.label}</span>
              </div>
              <p className="text-white font-semibold leading-relaxed">{item.value}</p>
            </div>
          ))}

          <div className="sm:col-span-2 rounded-xl border border-white/[0.07] bg-neutral-900/50 p-5">
            <div className="flex items-center gap-2 text-blue-400 mb-4">
              <Code2 size={16} />
              <span className="text-xs font-semibold uppercase tracking-widest">Strongest Skills</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {PERSONAL_INFO.strongestSkills.map((skill) => (
                <span
                  key={skill}
                  className="px-3 py-1.5 rounded-lg bg-blue-500/10 text-blue-300 text-sm border border-blue-500/20"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Build direction ──────────────────────────────────────────────── */}
      <section className="border-y border-white/[0.06] bg-neutral-950">
        <div className="max-w-7xl mx-auto px-6 py-20 grid grid-cols-1 lg:grid-cols-[0.8fr_1.2fr] gap-12 items-start">
          <div>
            <p className="text-sm font-semibold tracking-[0.3em] uppercase text-blue-400 mb-3">Build Direction</p>
            <h2 className="text-4xl sm:text-5xl font-black tracking-tight text-white mb-4">
              Useful AI, shipped cleanly.
            </h2>
            <p className="text-neutral-400 leading-relaxed max-w-xl">
              I like projects where model quality, software reliability, and interface clarity all matter at the same time.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {focusAreas.map((area) => (
              <div key={area.title} className="rounded-xl border border-white/[0.07] bg-black/40 p-5">
                <div className="mb-5 flex size-10 items-center justify-center rounded-lg bg-blue-500/10 text-blue-400 border border-blue-500/20">
                  <area.icon size={18} />
                </div>
                <h3 className="text-white font-bold mb-2">{area.title}</h3>
                <p className="text-sm text-neutral-400 leading-relaxed">{area.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Featured projects ────────────────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-6 py-24">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-10">
          <div>
            <p className="text-sm font-semibold tracking-[0.3em] uppercase text-blue-400 mb-3">Featured Work</p>
            <h2 className="text-4xl sm:text-5xl font-black tracking-tight text-white">Selected project signals.</h2>
          </div>
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 text-sm font-semibold text-blue-300 hover:text-blue-200 transition-colors"
          >
            View all projects
            <ArrowRight size={16} />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {featuredProjects.map((project) => (
            <Link
              key={project.id}
              href="/projects"
              className="group rounded-xl border border-white/[0.07] bg-neutral-900/50 p-5 transition-colors hover:border-blue-500/40"
            >
              <div className="flex items-center justify-between gap-3 mb-5">
                <span className="text-xs font-semibold uppercase tracking-widest text-blue-300">
                  {project.category}
                </span>
                <ArrowRight
                  size={16}
                  className="text-neutral-600 transition-transform group-hover:translate-x-1 group-hover:text-blue-300"
                />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">{project.title}</h3>
              <p className="text-sm text-neutral-400 leading-relaxed mb-5">{project.description}</p>
              <div className="flex flex-wrap gap-1.5">
                {project.techStack.slice(0, 3).map((tech) => (
                  <span
                    key={tech}
                    className="px-2 py-1 rounded-md bg-blue-500/10 text-blue-300 text-xs border border-blue-500/20"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}