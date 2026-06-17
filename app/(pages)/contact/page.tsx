"use client";

import { useRef, useState, Suspense } from "react";
import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import { OrbitControls, Stars } from "@react-three/drei";
import * as THREE from "three";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion } from "framer-motion";
// UPDATED: Removed Github and Linkedin from lucide-react
import { Send, MapPin, Loader2, Mail } from "lucide-react";
// UPDATED: Imported Github and Linkedin from react-icons
import { SiGithub } from "react-icons/si"; 
import { FaLinkedin } from "react-icons/fa";
import { toast } from "sonner";
import { PERSONAL_INFO } from "@/lib/constants";

// BUG FIX: InteractiveGlobe moved into its own component with Suspense wrapper.
// useLoader suspends the component; without Suspense the entire page crashes (black screen).
function GlobeModel() {
  const globeRef = useRef<THREE.Mesh>(null);

  const earthTexture = useLoader(
    THREE.TextureLoader,
    "https://raw.githubusercontent.com/mrdoob/three.js/master/examples/textures/planets/earth_atmos_2048.jpg"
  );

  // Mumbai: 18.9°N, 72.8°E
  const lat = 18.9;
  const lon = 72.8;
  const radius = 2;
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lon + 180) * (Math.PI / 180);
  const markerX = -(radius + 0.06) * Math.sin(phi) * Math.cos(theta);
  const markerY = (radius + 0.06) * Math.cos(phi);
  const markerZ = (radius + 0.06) * Math.sin(phi) * Math.sin(theta);

  useFrame((_, delta) => {
    if (globeRef.current) {
      globeRef.current.rotation.y += delta * 0.06;
    }
  });

  return (
    <group ref={globeRef}>
      <mesh>
        <sphereGeometry args={[radius, 64, 64]} />
        <meshStandardMaterial map={earthTexture} roughness={0.5} metalness={0.15} />
      </mesh>

      {/* Mumbai Marker */}
      <group position={[markerX, markerY, markerZ]}>
        <mesh>
          <sphereGeometry args={[0.07, 16, 16]} />
          <meshBasicMaterial color="#3b82f6" />
        </mesh>
        {/* Pulse ring */}
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <ringGeometry args={[0.1, 0.14, 32]} />
          <meshBasicMaterial color="#3b82f6" transparent opacity={0.5} side={THREE.DoubleSide} />
        </mesh>
      </group>
    </group>
  );
}

// Fallback shown while globe texture loads
function GlobeFallback() {
  return (
    <mesh>
      <sphereGeometry args={[2, 32, 32]} />
      <meshBasicMaterial color="#0f172a" wireframe />
    </mesh>
  );
}

// --- Form Schema ---
const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Enter a valid email address"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

type FormData = z.infer<typeof formSchema>;

const socialLinks = [
  {
    label: "GitHub",
    href: PERSONAL_INFO.github,
    icon: SiGithub, // UPDATED: Using react-icons component
    hoverClass: "hover:border-neutral-400 hover:text-white",
  },
  {
    label: "LinkedIn",
    href: PERSONAL_INFO.linkedin,
    icon: FaLinkedin, // UPDATED: Using react-icons component
    hoverClass: "hover:border-blue-500 hover:text-blue-400",
  },
  {
    label: "Email",
    href: `mailto:${PERSONAL_INFO.email}`,
    icon: Mail,
    hoverClass: "hover:border-green-500 hover:text-green-400",
  },
];

export default function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(formSchema) });

  // BUG FIX: `catch (error)` — typed properly to avoid TypeScript strict error
  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!response.ok) throw new Error("Failed to send");

      toast.success("Message sent! I'll get back to you soon.");
      reset();
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Something went wrong. Please try again.";
      toast.error(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen pt-32 pb-24 px-6 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

      {/* Left: Globe & Info */}
      <div className="flex flex-col gap-8">
        <div>
          <p className="text-sm font-semibold tracking-[0.3em] uppercase text-blue-400 mb-3">Get In Touch</p>
          <h1 className="text-5xl font-black text-white mb-4">
            Let's Connect.
          </h1>
          <p className="text-neutral-400 text-lg leading-relaxed max-w-md">
            Whether you're discussing an AI role, a collaborative deep learning project, or just want to say hi — my inbox is open.
          </p>
        </div>

        {/* 3D Globe — BUG FIX: wrapped in Suspense; useLoader throws promise without it */}
        <div className="h-[380px] w-full relative rounded-2xl bg-neutral-900/20 border border-white/[0.06] overflow-hidden cursor-grab active:cursor-grabbing">
          <Canvas camera={{ position: [0, 0, 5.5], fov: 45 }} gl={{ antialias: true }} dpr={[1, 1.5]}>
            <ambientLight intensity={1.2} />
            <directionalLight position={[5, 3, 5]} intensity={2} />
            <Suspense fallback={<GlobeFallback />}>
              <GlobeModel />
            </Suspense>
            <Stars radius={80} depth={40} count={800} factor={3} fade speed={0.5} />
            <OrbitControls enableZoom={false} enablePan={false} autoRotate={false} />
          </Canvas>
          <div className="absolute bottom-4 left-4 flex items-center gap-2 text-xs font-semibold text-blue-400 bg-black/60 px-3 py-1.5 rounded-full backdrop-blur-md border border-blue-500/20">
            <MapPin size={12} /> Mumbai, India
          </div>
        </div>

        {/* Social Links */}
        <div className="flex items-center gap-3">
          {socialLinks.map((link) => (
            <motion.a
              key={link.label}
              whileHover={{ scale: 1.08, y: -2 }}
              whileTap={{ scale: 0.97 }}
              href={link.href}
              target={link.href.startsWith("http") ? "_blank" : undefined}
              rel="noopener noreferrer"
              aria-label={link.label}
              className={`p-3 bg-neutral-900/80 border border-neutral-800 rounded-full transition-all text-neutral-400 ${link.hoverClass}`}
            >
              <link.icon size={18} />
            </motion.a>
          ))}
        </div>

        {/* Contact info */}
        <div className="text-sm text-neutral-500">
          <span className="text-neutral-300 font-medium">Email: </span>
          <a href={`mailto:${PERSONAL_INFO.email}`} className="hover:text-blue-400 transition-colors">
            {PERSONAL_INFO.email}
          </a>
        </div>
      </div>

      {/* Right: Form */}
      <div className="bg-neutral-900/40 backdrop-blur-md border border-white/[0.07] p-8 sm:p-10 rounded-3xl">
        <h2 className="text-2xl font-bold text-white mb-1">Send a Message</h2>
        <p className="text-neutral-500 text-sm mb-8">I typically respond within 24 hours.</p>

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
          {/* Name */}
          <div className="flex flex-col gap-1.5">
            <label htmlFor="name" className="text-xs font-semibold uppercase tracking-widest text-neutral-500">Name</label>
            <input
              {...register("name")}
              id="name"
              className="bg-black/40 border border-neutral-800 focus:border-blue-500 rounded-xl px-4 py-3 text-white text-sm outline-none transition-colors placeholder:text-neutral-600"
              placeholder="Your name"
            />
            {errors.name && (
              <span className="text-red-400 text-xs mt-0.5">{errors.name.message}</span>
            )}
          </div>

          {/* Email */}
          <div className="flex flex-col gap-1.5">
            <label htmlFor="email" className="text-xs font-semibold uppercase tracking-widest text-neutral-500">Email</label>
            <input
              {...register("email")}
              id="email"
              type="email"
              className="bg-black/40 border border-neutral-800 focus:border-blue-500 rounded-xl px-4 py-3 text-white text-sm outline-none transition-colors placeholder:text-neutral-600"
              placeholder="you@example.com"
            />
            {errors.email && (
              <span className="text-red-400 text-xs mt-0.5">{errors.email.message}</span>
            )}
          </div>

          {/* Message */}
          <div className="flex flex-col gap-1.5">
            <label htmlFor="message" className="text-xs font-semibold uppercase tracking-widest text-neutral-500">Message</label>
            <textarea
              {...register("message")}
              id="message"
              rows={5}
              className="bg-black/40 border border-neutral-800 focus:border-blue-500 rounded-xl px-4 py-3 text-white text-sm outline-none transition-colors resize-none placeholder:text-neutral-600"
              placeholder="Tell me about your project or opportunity..."
            />
            {errors.message && (
              <span className="text-red-400 text-xs mt-0.5">{errors.message.message}</span>
            )}
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="mt-2 flex items-center justify-center gap-2 w-full bg-blue-600 hover:bg-blue-500 disabled:bg-neutral-800 disabled:text-neutral-500 text-white font-semibold py-3.5 rounded-xl transition-all disabled:cursor-not-allowed"
          >
            {isSubmitting ? (
              <>
                <Loader2 size={16} className="animate-spin" />
                Sending...
              </>
            ) : (
              <>
                Send Message
                <Send size={16} />
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}

// "use client";
// import { useRef, useState } from "react";
// import { Canvas, useFrame, useLoader } from "@react-three/fiber";
// import { OrbitControls, Stars } from "@react-three/drei";
// import * as THREE from "three";
// import { useForm } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { z } from "zod";
// import { motion } from "framer-motion";
// import { Send, MapPin, Loader2 } from "lucide-react";
// import { toast } from "sonner";
// import { PERSONAL_INFO } from "@/lib/constants";

// // --- 3D Globe Component ---
// function InteractiveGlobe() {
//   const globeRef = useRef<THREE.Mesh>(null);
  
//   // Reliable public CDN for Earth texture
//   const earthTexture = useLoader(
//     THREE.TextureLoader, 
//     "https://raw.githubusercontent.com/mrdoob/three.js/master/examples/textures/planets/earth_atmos_2048.jpg"
//   );

//   // Convert Lat/Lon to 3D Cartesian coordinates (Mumbai: 18.9°N, 72.8°E)
//   const lat = 18.9;
//   const lon = 72.8;
//   const radius = 2;
  
//   const phi = (90 - lat) * (Math.PI / 180);
//   const theta = (lon + 180) * (Math.PI / 180);

//   const markerX = -(radius + 0.05) * Math.sin(phi) * Math.cos(theta);
//   const markerY = (radius + 0.05) * Math.cos(phi);
//   const markerZ = (radius + 0.05) * Math.sin(phi) * Math.sin(theta);

//   useFrame((state, delta) => {
//     if (globeRef.current) {
//       // Increment rotation using delta time
//       globeRef.current.rotation.y += delta * 0.05;
//     }
//   });

//   return (
//     <group ref={globeRef}>
//       <mesh>
//         <sphereGeometry args={[radius, 64, 64]} />
//         <meshStandardMaterial map={earthTexture} roughness={0.6} metalness={0.1} />
//       </mesh>
      
//       {/* Mumbai Marker */}
//       <mesh position={[markerX, markerY, markerZ]}>
//         <sphereGeometry args={[0.08, 16, 16]} />
//         <meshBasicMaterial color="#3b82f6" />
//         {/* Glow effect */}
//         <mesh>
//           <sphereGeometry args={[0.12, 16, 16]} />
//           <meshBasicMaterial color="#3b82f6" transparent opacity={0.4} />
//         </mesh>
//       </mesh>
//     </group>
//   );
// }

// // --- Form Schema ---
// const formSchema = z.object({
//   name: z.string().min(2, "Name is required"),
//   email: z.string().email("Valid email is required"),
//   message: z.string().min(10, "Message must be at least 10 characters"),
// });

// type FormData = z.infer<typeof formSchema>;

// function GithubIcon() {
//   return (
//     <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
//       <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.02c3.14-.35 6.5-1.4 6.5-7.a5.66 5.66 0 0 0-1.66-4.08A5.23 5.23 0 0 0 18 2.13s-1.36-.45-4.5 1.73A15.3 15.3 0 0 0 12 3.5a15.3 15.3 0 0 0-3.5.38c-3.14-2.18-4.5-1.73-4.5-1.73a5.23 5.23 0 0 0 .16 4.75A5.66 5.66 0 0 0 3 8.98c0 5.6 3.36 6.65 6.5 7A4.8 4.8 0 0 0 8 19v3"></path>
//     </svg>
//   );
// }
// function LinkedinIcon() {
//   return (
//     <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
//       <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
//       <rect width="4" height="12" x="2" y="9"></rect>
//       <circle cx="4" cy="4" r="2"></circle>
//     </svg>
//   );
// }
// // --- Main Contact Page Component ---
// export default function Contact() {
//   const [isSubmitting, setIsSubmitting] = useState(false);

//   const {
//     register,
//     handleSubmit,
//     reset,
//     formState: { errors },
//   } = useForm<FormData>({
//     resolver: zodResolver(formSchema),
//   });

//   const onSubmit = async (data: FormData) => {
//     setIsSubmitting(true);
//     try {
//       const response = await fetch("/api/contact", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(data),
//       });

//       if (!response.ok) throw new Error("Failed to send message");

//       toast.success("Message sent successfully! I will get back to you soon.");
//       reset();
//     } catch (error) {
//       toast.error("Something went wrong. Please try again later.");
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   return (
//     <div className="min-h-screen pt-32 pb-20 px-6 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
      
//       {/* Left: 3D Globe & Info */}
//       <div className="flex flex-col h-full justify-between gap-10">
//         <div>
//           <h1 className="text-5xl font-bold mb-6">Let's Connect.</h1>
//           <p className="text-neutral-400 text-lg leading-relaxed max-w-md">
//             Whether you are discussing an AI role, a collaborative deep learning project, or just want to say hi, my inbox is open.
//           </p>
//         </div>

//         {/* 3D Globe Container */}
//         <div className="h-[400px] w-full relative rounded-2xl bg-neutral-900/30 border border-white/10 overflow-hidden cursor-grab active:cursor-grabbing">
//           <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
//             <ambientLight intensity={1.5} />
//             <directionalLight position={[5, 3, 5]} intensity={2} />
//             <InteractiveGlobe />
//             <Stars radius={100} depth={50} count={1000} factor={4} fade speed={1} />
//             <OrbitControls enableZoom={false} enablePan={false} />
//           </Canvas>
//           <div className="absolute bottom-4 left-4 flex items-center gap-2 text-xs font-semibold text-blue-400 bg-black/50 px-3 py-1.5 rounded-full backdrop-blur-md border border-white/10">
//             <MapPin size={14} /> Mumbai, India
//           </div>
//         </div>

//         {/* Social Links */}
//         <div className="flex items-center gap-6">
//           <motion.a 
//             whileHover={{ scale: 1.1, y: -2 }}
//             href={PERSONAL_INFO.github} 
//             target="_blank" 
//             className="p-3 bg-neutral-900 border border-neutral-800 rounded-full hover:border-white transition-colors flex items-center justify-center text-white"
//           >
//             <GithubIcon />
//           </motion.a>
//           <motion.a 
//             whileHover={{ scale: 1.1, y: -2 }}
//             href={PERSONAL_INFO.linkedin} 
//             target="_blank" 
//             className="p-3 bg-neutral-900 border border-neutral-800 rounded-full hover:border-blue-500 transition-colors flex items-center justify-center text-white"
//           >
//             <LinkedinIcon />
//           </motion.a>
//         </div>
//       </div>

//       {/* Right: Contact Form */}
//       <div className="bg-neutral-900/50 backdrop-blur-md border border-white/10 p-8 sm:p-12 rounded-3xl">
//         <h2 className="text-2xl font-bold mb-8">Send a Message</h2>
        
//         <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
//           {/* Name Field */}
//           <div className="flex flex-col gap-2">
//             <label htmlFor="name" className="text-sm font-medium text-neutral-400">Name</label>
//             <input 
//               {...register("name")}
//               id="name"
//               className="bg-black/50 border border-neutral-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition-colors"
//               placeholder="John Doe"
//             />
//             {errors.name && <span className="text-red-500 text-xs">{errors.name.message}</span>}
//           </div>

//           {/* Email Field */}
//           <div className="flex flex-col gap-2">
//             <label htmlFor="email" className="text-sm font-medium text-neutral-400">Email</label>
//             <input 
//               {...register("email")}
//               id="email"
//               type="email"
//               className="bg-black/50 border border-neutral-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition-colors"
//               placeholder="john@example.com"
//             />
//             {errors.email && <span className="text-red-500 text-xs">{errors.email.message}</span>}
//           </div>

//           {/* Message Field */}
//           <div className="flex flex-col gap-2">
//             <label htmlFor="message" className="text-sm font-medium text-neutral-400">Message</label>
//             <textarea 
//               {...register("message")}
//               id="message"
//               rows={5}
//               className="bg-black/50 border border-neutral-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition-colors resize-none"
//               placeholder="How can we collaborate?"
//             />
//             {errors.message && <span className="text-red-500 text-xs">{errors.message.message}</span>}
//           </div>

//           {/* Submit Button */}
//           <button 
//             type="submit"
//             disabled={isSubmitting}
//             className="mt-4 flex items-center justify-center gap-2 w-full bg-white text-black font-bold py-4 rounded-xl hover:bg-neutral-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
//           >
//             {isSubmitting ? (
//               <>
//                 <Loader2 size={18} className="animate-spin" />
//                 Sending...
//               </>
//             ) : (
//               <>
//                 Send Message <Send size={18} />
//               </>
//             )}
//           </button>
//         </form>
//       </div>

//     </div>
//   );
// }