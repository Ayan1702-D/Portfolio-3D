import type { Metadata } from "next";

export function generateMetadata(): Metadata {
  return {
    title: "About",
    description: "Know about my journey as an AI/ML Engineer and my academic background.",
    alternates: {
      canonical: `${process.env.NEXT_PUBLIC_APP_URL}/about`,
    },
    openGraph: {
      title: "About | Ayan Pathak",
      description: "Know about my journey as an AI/ML Engineer and my academic background.",
      url: `${process.env.NEXT_PUBLIC_APP_URL}/about`,
    },
  };
}

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
