"use client";

import Image from "next/image";
import { useActionState } from "react";
import { login } from "./actions";

export default function LoginPage() {
  const [error, formAction, pending] = useActionState(login, null);

  return (
    <main className="flex min-h-screen items-center justify-center bg-[var(--dash-bg)] px-4">
      <form
        action={formAction}
        className="w-full max-w-sm rounded-xl border border-[var(--dash-border)] bg-[var(--dash-surface)] p-8 shadow-[var(--dash-gold-glow)]"
      >
        <div className="mb-6 flex items-center gap-3">
          <Image
            src="/images/nifs-logo-dashboard.png"
            alt="NIFS"
            width={40}
            height={40}
            className="h-10 w-10 object-contain"
          />
          <div>
            <h1 className="font-bold text-lg leading-tight text-[var(--dash-text)]">
              NIFS Dashboard
            </h1>
            <p className="text-xs text-[var(--dash-text-muted)]">
              Sign in to manage your site
            </p>
          </div>
        </div>

        <label className="mb-1 block text-sm font-medium text-[var(--dash-text)]">
          Username
        </label>
        <input
          name="username"
          type="text"
          autoComplete="username"
          required
          placeholder="Enter username"
          className="mb-4 w-full rounded-md border border-[var(--dash-border)] bg-white px-3 py-2 text-[var(--dash-text)] outline-none transition-colors placeholder:text-[var(--dash-text-muted)]/50 focus:border-[var(--dash-accent)] focus:ring-2 focus:ring-[var(--dash-accent-soft)]"
        />

        <label className="mb-1 block text-sm font-medium text-[var(--dash-text)]">
          Password
        </label>
        <input
          name="password"
          type="password"
          autoComplete="current-password"
          required
          placeholder="Enter password"
          className="mb-4 w-full rounded-md border border-[var(--dash-border)] bg-white px-3 py-2 text-[var(--dash-text)] outline-none transition-colors placeholder:text-[var(--dash-text-muted)]/50 focus:border-[var(--dash-accent)] focus:ring-2 focus:ring-[var(--dash-accent-soft)]"
        />

        {error && <p className="mb-4 text-sm text-red-600">{error}</p>}

        <button
          type="submit"
          disabled={pending}
          className="w-full rounded-md bg-[var(--dash-accent)] px-3 py-2 font-medium text-white transition-colors hover:bg-[var(--dash-accent-hover)] disabled:opacity-60 cursor-pointer"
        >
          {pending ? "Signing in..." : "Sign in"}
        </button>
      </form>
    </main>
  );
}
