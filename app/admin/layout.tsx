import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "../globals.css";

const outfit = Outfit({ variable: "--font-outfit", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "WestMark Admin",
  robots: { index: false, follow: false },
};

// Admin pages are fully dynamic — no prerendering
export const dynamic = "force-dynamic";

export default function AdminRootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${outfit.variable} h-full antialiased`}>
      <body className="h-full bg-[#f4f6fa] font-sans text-foreground">
        {children}
      </body>
    </html>
  );
}
