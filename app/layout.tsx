import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { PERSONAL_INFO } from "@/lib/constants";
import Navbar from "@/components/layout/Navbar";
import CustomCursor from "@/components/ui/CustomCursor";
import ScrollToTop from "@/components/ui/ScrollToTop";
import PageTransition from "@/components/animations/PageTransition";
import { Providers } from "./providers";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  // Required so Next.js can resolve relative OG image URLs (/og, /icons, etc.)
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_APP_URL ?? "https://localhost:3000"
  ),
  title: {
    default: `${PERSONAL_INFO.fullName} | ${PERSONAL_INFO.role}`,
    template: `%s | ${PERSONAL_INFO.fullName}`,
  },
  description: `Portfolio of ${PERSONAL_INFO.fullName}, a ${PERSONAL_INFO.role} specializing in Deep Learning, NLP, and modern web architectures.`,
  keywords: [
    "AI/ML Engineer",
    "Next.js",
    "React Three Fiber",
    "Machine Learning",
    "Portfolio",
    "LTCE",
    "Mumbai",
    "PyTorch",
    "TensorFlow",
  ],
  authors: [{ name: PERSONAL_INFO.fullName }],
  creator: PERSONAL_INFO.fullName,
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: process.env.NEXT_PUBLIC_APP_URL,
    title: `${PERSONAL_INFO.fullName} | ${PERSONAL_INFO.role}`,
    description: `Explore the AI/ML and full-stack projects built by ${PERSONAL_INFO.fullName}.`,
    siteName: `${PERSONAL_INFO.fullName} Portfolio`,
    images: [
      {
        url: "/og",
        width: 1200,
        height: 630,
        alt: "Ayan Pathak — AI/ML Engineer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${PERSONAL_INFO.fullName} | ${PERSONAL_INFO.role}`,
    description: `Explore the AI/ML and full-stack projects built by ${PERSONAL_INFO.fullName}.`,
    creator: "@yourtwitterhandle",
    images: ["/og"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.variable} font-sans bg-black text-white antialiased overflow-x-hidden`}
      >
        <Providers>
          <CustomCursor />
          <ScrollToTop />
          <Navbar />
          <main className="relative flex flex-col min-h-screen pt-20">
            <PageTransition>{children}</PageTransition>
          </main>
          {/* Vercel platform telemetry — zero config, free on hobby plan */}
          <Analytics />
          <SpeedInsights />
        </Providers>
      </body>
    </html>
  );
}
// import type { Metadata } from "next";
// import { Inter } from "next/font/google";
// import "./globals.css";
// import { PERSONAL_INFO } from "@/lib/constants";
// import Navbar from "@/components/layout/Navbar";
// import CustomCursor from "@/components/ui/CustomCursor";
// import ScrollToTop from "@/components/ui/ScrollToTop";
// import PageTransition from "@/components/animations/PageTransition";
// import { Providers } from "./providers";

// const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

// export const metadata: Metadata = {
//   title: {
//     default: `${PERSONAL_INFO.name} | ${PERSONAL_INFO.role}`,
//     template: `%s | ${PERSONAL_INFO.name}`,
//   },
//   description: `Portfolio of ${PERSONAL_INFO.name}, a ${PERSONAL_INFO.role} specializing in Deep Learning, NLP, and modern web architectures.`,
//   keywords: ["AI/ML Engineer", "Next.js", "React Three Fiber", "Machine Learning", "Portfolio", "LTCE"],
//   authors: [{ name: PERSONAL_INFO.name }],
//   creator: PERSONAL_INFO.name,
//   openGraph: {
//     type: "website",
//     locale: "en_IN",
//     url: "https://yourdomain.com",
//     title: `${PERSONAL_INFO.name} | ${PERSONAL_INFO.role}`,
//     description: `Explore the AI/ML and full-stack projects built by ${PERSONAL_INFO.name}.`,
//     siteName: `${PERSONAL_INFO.name} Portfolio`,
//   },
//   twitter: {
//     card: "summary_large_image",
//     title: `${PERSONAL_INFO.name} | ${PERSONAL_INFO.role}`,
//     description: `Explore the AI/ML and full-stack projects built by ${PERSONAL_INFO.name}.`,
//     creator: "@yourtwitterhandle",
//   },
// };

// export default function RootLayout({ children }: { children: React.ReactNode }) {
//   return (
//     <html lang="en" suppressHydrationWarning>
//       <body className={`${inter.variable} font-sans bg-black text-white antialiased overflow-x-hidden`}>
//         <Providers>
//           <CustomCursor />
//           <ScrollToTop />
//           <Navbar />
//           <main className="relative flex flex-col min-h-screen pt-20">
//             <PageTransition>
//               {children}
//             </PageTransition>
//           </main>
//         </Providers>
//       </body>
//     </html>
//   );
// }
