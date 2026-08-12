import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { UrgencyBar } from "@/components/layout/urgency-bar";
import { WhatsAppButton } from "@/components/layout/whatsapp-button";
import { SmoothScrollProvider } from "@/components/motion/smooth-scroll-provider";
import { ScrollPathLine } from "@/components/ScrollPathLine";
import { HeroSceneWrapper } from "@/components/three/hero-scene-wrapper";
import { DevAnnotations } from "@/components/DevAnnotations";
import { CombinedGraphSchema } from "@/lib/seo/schema";

import Script from "next/script";

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
  title: {
    default: "NIFS India — Igniting Careers in Fire & Industrial Safety",
    template: "%s",
  },
  description:
    "National Institute of Fire and Safety (NIFS) — India's leading industrial safety and fire engineering training institute. NSDC & Skill India approved, ISO 9001:2015 certified, 45,000+ placements, placements with Adani, L&T, ITC, Amazon and more.",
  keywords: [
    "fire and safety course",
    "safety officer course",
    "diploma in fire safety",
    "fire safety course fees",
    "industrial safety course",
    "safety officer salary",
    "fire safety course after 12th",
    "NSDC approved fire safety",
    "best fire safety institute India",
  ],
  authors: [{ name: "NIFS India" }],
  creator: "NIFS India",
  metadataBase: new URL("https://nifsindia.net"),
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://nifsindia.net",
    siteName: "NIFS India",
    title: "NIFS India — Fire & Industrial Safety Training Institute",
    description:
      "25+ years of excellence. 70+ centers. 45,000+ alumni. NSDC approved fire and safety courses with 100% placement assistance.",
    images: [
      {
        url: "/images/og-default.jpg",
        width: 1200,
        height: 630,
        alt: "NIFS India — Fire & Safety Training",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "NIFS India — Fire & Industrial Safety Training",
    description:
      "India's leading fire safety institute. 25+ years, 70+ centers, 45,000+ alumni placed at Adani, L&T, Amazon.",
    images: ["/images/og-default.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: "/",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${playfair.variable} ${inter.variable} h-full antialiased`}
    >
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="sitemap" type="application/xml" href="/sitemap.xml" />
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-7N5V22GB89"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', 'G-7N5V22GB89');
          `}
        </Script>
      </head>
      <body className="min-h-full flex flex-col bg-background text-foreground font-sans">
        <a href="#main-content" className="skip-to-content">
          Skip to main content
        </a>
        <CombinedGraphSchema />
        <SmoothScrollProvider>
          <HeroSceneWrapper />
          <ScrollPathLine />
          <UrgencyBar />
          <SiteHeader />
          <main id="main-content" className="flex-1">
            {children}
          </main>
          <SiteFooter />
          <WhatsAppButton />
        </SmoothScrollProvider>
        <DevAnnotations />
      </body>
    </html>
  );
}
