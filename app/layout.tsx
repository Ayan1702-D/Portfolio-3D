import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { PERSONAL_INFO } from "@/lib/constants";
import Navbar from "@/components/layout/Navbar";
import CustomCursor from "@/components/ui/CustomCursor";
import PageTransition from "@/components/animations/PageTransition";
import { Providers } from "./providers";
import { Analytics } from "@vercel/analytics/next";
const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
export const metadata: Metadata = {
  title: {
    default: `${PERSONAL_INFO.name} | ${PERSONAL_INFO.role}`,
    template: `%s | ${PERSONAL_INFO.name}`,
  },
  description: `Portfolio of ${PERSONAL_INFO.name}, a ${PERSONAL_INFO.role} specializing in Deep Learning, NLP, and modern web architectures.`,
  keywords: ["AI/ML Engineer", "Next.js", "React Three Fiber", "Machine Learning", "Portfolio", "LTCE"],
  authors: [{ name: PERSONAL_INFO.name }],
  creator: PERSONAL_INFO.name,
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://yourdomain.com",
    title: `${PERSONAL_INFO.name} | ${PERSONAL_INFO.role}`,
    description: `Explore the AI/ML and full-stack projects built by ${PERSONAL_INFO.name}.`,
    siteName: `${PERSONAL_INFO.name} Portfolio`,
  },
  twitter: {
    card: "summary_large_image",
    title: `${PERSONAL_INFO.name} | ${PERSONAL_INFO.role}`,
    description: `Explore the AI/ML and full-stack projects built by ${PERSONAL_INFO.name}.`,
    creator: "@yourtwitterhandle",
  },
};
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} font-sans bg-black text-white antialiased overflow-x-hidden`}>
        <Providers>
          <CustomCursor />
          <Navbar />
          <main className="relative flex flex-col min-h-screen pt-20">
            <PageTransition>
              {children}
            </PageTransition>
          </main>
        </Providers>
        <Analytics />
      </body>
    </html>
  );
}
