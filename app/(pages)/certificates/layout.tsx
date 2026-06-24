import type { Metadata } from "next";

export function generateMetadata(): Metadata {
  return {
    title: "Certifications",
    description:
      "Verified professional certifications and hackathon achievements by Ayan Pathak, covering data science, AI, and software engineering.",
    alternates: {
      canonical: `${process.env.NEXT_PUBLIC_APP_URL}/certificates`,
    },
    openGraph: {
      title: "Certifications | Ayan Pathak",
      description:
        "Verified professional certifications and hackathon achievements by Ayan Pathak.",
      url: `${process.env.NEXT_PUBLIC_APP_URL}/certificates`,
    },
  };
}

export default function CertificatesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}