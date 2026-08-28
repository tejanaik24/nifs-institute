import type { Metadata } from "next";
import Link from "next/link";
import { Home, BookOpen, MapPin, Phone } from "lucide-react";

export const metadata: Metadata = {
  title: "Page Not Found | NIFS India",
  description: "The page you are looking for could not be found. Explore NIFS India's fire and safety courses, centers, and admissions.",
};

export default function NotFound() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-6 pt-32 pb-20">
      <div className="mx-auto max-w-2xl text-center">
        <span className="text-xs font-semibold uppercase tracking-widest text-primary">404 — Page Not Found</span>
        <h1 className="font-display mt-4 text-5xl italic leading-tight">
          This page doesn&apos;t exist
        </h1>
        <p className="mt-6 text-lg text-muted-foreground">
          The page you&apos;re looking for may have moved or the URL may be incorrect. Here&apos;s where you can go instead:
        </p>

        <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Link href="/" className="border border-border p-5 text-left hover:border-primary transition-colors">
            <Home className="h-5 w-5 text-primary" />
            <p className="mt-3 font-medium">Home</p>
            <p className="mt-1 text-sm text-muted-foreground">Return to the NIFS homepage</p>
          </Link>
          <Link href="/courses" className="border border-border p-5 text-left hover:border-primary transition-colors">
            <BookOpen className="h-5 w-5 text-primary" />
            <p className="mt-3 font-medium">Courses</p>
            <p className="mt-1 text-sm text-muted-foreground">Browse fire & safety courses</p>
          </Link>
          <Link href="/centers" className="border border-border p-5 text-left hover:border-primary transition-colors">
            <MapPin className="h-5 w-5 text-primary" />
            <p className="mt-3 font-medium">Find a Center</p>
            <p className="mt-1 text-sm text-muted-foreground">70+ centers across India</p>
          </Link>
          <Link href="/admissions" className="border border-border p-5 text-left hover:border-primary transition-colors">
            <Phone className="h-5 w-5 text-primary" />
            <p className="mt-3 font-medium">Contact Admissions</p>
            <p className="mt-1 text-sm text-muted-foreground">+91-8374-340-999</p>
          </Link>
        </div>

        <div className="mt-10">
          <Link href="/" className="bg-primary px-7 py-3.5 text-sm font-medium text-primary-foreground">
            Back to Home
          </Link>
        </div>
      </div>
    </main>
  );
}
