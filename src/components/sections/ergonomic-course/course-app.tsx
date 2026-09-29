"use client";

import { useEffect, useState } from "react";
import { Award, Check, Clock, Laptop } from "lucide-react";
import type { CourseState } from "@/lib/free-course/db";
import { CourseIndex } from "./course-index";
import { StrainLab } from "./posture-diagram";
import { RegisterCard } from "./register-card";
import "./es-course.css";

export const TOKEN_KEY = "nifs-es-token";
type Auth = { token: string; state: CourseState };

const chips = [
  [Check, "100% FREE"],
  [Clock, "3 hours"],
  [Laptop, "Online"],
  [Award, "Certificate in 3 days"],
] as const;

export function CourseApp({ landing }: { landing: React.ReactNode }) {
  const [auth, setAuth] = useState<Auth | null>(null);

  useEffect(() => {
    let token: string | null = null;
    try { token = localStorage.getItem(TOKEN_KEY); } catch {}
    if (!token) return;
    const t = token;
    fetch("/api/free-course/state", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ token: t }) })
      .then((r) => (r.ok ? r.json() : null))
      .then((j) => {
        if (j?.state) setAuth({ token: t, state: j.state });
        else try { localStorage.removeItem(TOKEN_KEY); } catch {}
      })
      .catch(() => {});
  }, []);

  const login = (token: string, state: CourseState) => {
    try { localStorage.setItem(TOKEN_KEY, token); } catch {}
    setAuth({ token, state });
    window.scrollTo({ top: 0 });
  };
  const logout = () => {
    try { localStorage.removeItem(TOKEN_KEY); } catch {}
    setAuth(null);
  };

  return (
    <div className="es-root">
      {auth ? (
        <CourseIndex token={auth.token} state={auth.state} onState={(state) => setAuth({ token: auth.token, state })} onLogout={logout} />
      ) : (
        <>
          <section data-path-target="true" className="es-grain overflow-hidden border-b border-[var(--es-line)] bg-[var(--es-cream)] pt-32 pb-14 lg:pt-36 lg:pb-16">
            <div className="mx-auto grid max-w-7xl items-center gap-12 px-6 lg:grid-cols-[1.05fr_1fr] lg:gap-16 lg:px-10">
              <div>
                <span className="inline-flex items-center gap-2.5 bg-primary px-4 py-2 text-sm font-bold uppercase tracking-[0.22em] text-primary-foreground shadow-[4px_4px_0_0_var(--es-ink)]"><span className="h-2 w-2 animate-pulse rounded-full bg-white" aria-hidden /> Free course <span className="opacity-60">·</span> NIFS ES</span>
                <h1 className="font-display mt-5 text-[clamp(3rem,6.4vw,5.4rem)] italic leading-[0.98]">
                  Fit the task
                  <br />
                  to the <span className="text-primary">person.</span>
                </h1>
                <ul className="mt-5 flex flex-wrap gap-2">
                  {chips.map(([Icon, text]) => (
                    <li key={text} className={`inline-flex items-center gap-1.5 border px-3 py-1.5 text-sm font-medium ${text === "100% FREE" ? "border-primary bg-primary/10 font-bold text-primary" : "border-[var(--es-line)] bg-[var(--es-paper)]"}`}>
                      <Icon className="h-3.5 w-3.5 text-primary" aria-hidden /> {text}
                    </li>
                  ))}
                </ul>
                <div className="mt-6 max-w-xl">
                  <RegisterCard onAuthed={login} />
                </div>
              </div>
              <div className="lg:pl-4">
                <StrainLab />
              </div>
            </div>
          </section>
          {landing}
        </>
      )}
    </div>
  );
}
