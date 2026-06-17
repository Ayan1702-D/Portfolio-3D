import type { Metadata } from "next";

export function generateMetadata(): Metadata {
  return {
    title: "Contact",
    description: "Get in touch for collaborations, roles, or deep learning projects.",
    alternates: {
      canonical: `${process.env.NEXT_PUBLIC_APP_URL}/contact`,
    },
    openGraph: {
      title: "Contact | Ayan Pathak",
      description: "Get in touch for collaborations, roles, or deep learning projects.",
      url: `${process.env.NEXT_PUBLIC_APP_URL}/contact`,
    },
  };
}

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}