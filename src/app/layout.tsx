import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { SmoothScrollProvider } from "@/components/motion/smooth-scroll-provider";
import { ScrollPathLine } from "@/components/ScrollPathLine";
import { HeroSceneWrapper } from "@/components/three/hero-scene-wrapper";

const playfair = Playfair_Display({
  variable: "--font-display",
  subsets: ["latin"],
  style: ["italic", "normal"],
  weight: ["400", "500", "600", "700"],
});

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "NIFS India — Igniting Careers in Fire & Industrial Safety",
  description:
    "National Institute of Fire and Safety (NIFS) — India's leading industrial safety and fire engineering training institute. NSDC & Skill India approved, ISO 9001:2015 certified, 85+ centers, placements with Adani, L&T, ITC, Amazon and more.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={`${playfair.variable} ${inter.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground font-sans">
        <SmoothScrollProvider>
          <HeroSceneWrapper />
          <ScrollPathLine />
          <SiteHeader />
          <main className="flex-1">{children}</main>
          <SiteFooter />
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
