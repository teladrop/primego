import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { site } from "@/lib/site";
import "./globals.css";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

const BASE = "https://www.westmarkservicesltd.com";

export const metadata: Metadata = {
  metadataBase: new URL(BASE),
  title: {
    default: `${site.legalName} | Integrated Industrial Cleaning & Facility Management`,
    template: `%s | ${site.name}`,
  },
  description: site.description,
  keywords: [
    "industrial cleaning Nigeria",
    "facility management Lagos",
    "post-construction cleaning",
    "commercial cleaning Nigeria",
    "janitorial services Lagos",
    "WestMark Industrial Services",
    "cleaning company Nigeria",
    "facility management company",
  ],
  authors: [{ name: site.legalName, url: BASE }],
  creator: site.legalName,
  openGraph: {
    type: "website",
    locale: "en_NG",
    url: BASE,
    siteName: site.legalName,
    title: `${site.legalName} | Integrated Industrial Cleaning & Facility Management`,
    description: site.description,
    images: [
      {
        url: "/logo.png",
        width: 1200,
        height: 630,
        alt: site.legalName,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.legalName} | Integrated Industrial Cleaning & Facility Management`,
    description: site.description,
    images: ["/logo.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: BASE,
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${outfit.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col bg-background font-sans text-foreground">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
