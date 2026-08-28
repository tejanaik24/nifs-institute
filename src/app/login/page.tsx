"use client";

import { useActionState } from "react";
import { login } from "./actions";

export default function LoginPage() {
  const [error, formAction, pending] = useActionState(login, null);

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#1C1917] px-4">
      <form
        action={formAction}
        className="w-full max-w-sm rounded-xl border border-white/10 bg-[#231F1B] p-8"
      >
        <h1 className="mb-6 font-mono text-xl tracking-wide text-white">NIFS Dashboard</h1>
        <label className="mb-1 block text-sm text-white/70">Email</label>
        <input
          name="email"
          type="email"
          required
          className="mb-4 w-full rounded-md border border-white/10 bg-black/30 px-3 py-2 text-white outline-none focus:border-[#A16207]"
        />
        <label className="mb-1 block text-sm text-white/70">Password</label>
        <input
          name="password"
          type="password"
          required
          className="mb-4 w-full rounded-md border border-white/10 bg-black/30 px-3 py-2 text-white outline-none focus:border-[#A16207]"
        />
        {error && <p className="mb-4 text-sm text-red-400">{error}</p>}
        <button
          type="submit"
          disabled={pending}
          className="w-full rounded-md bg-[#A16207] px-3 py-2 font-medium text-white transition-colors hover:bg-[#8a5406] disabled:opacity-60"
        >
          {pending ? "Signing in..." : "Sign in"}
        </button>
      </form>
    </main>
  );
}
