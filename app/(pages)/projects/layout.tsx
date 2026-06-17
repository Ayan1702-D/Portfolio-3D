import type { Metadata } from "next";

export function generateMetadata(): Metadata {
  return {
    title: "Projects",
    description: "Explore my latest work in Computer Vision, NLP, and Agentic AI.",
    alternates: {
      canonical: `${process.env.NEXT_PUBLIC_APP_URL}/projects`,
    },
    openGraph: {
      title: "Projects | Ayan Pathak",
      description: "Explore my latest work in Computer Vision, NLP, and Agentic AI.",
      url: `${process.env.NEXT_PUBLIC_APP_URL}/projects`,
    },
  };
}

export default function ProjectsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}