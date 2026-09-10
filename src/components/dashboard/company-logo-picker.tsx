"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { addCompanyLogoAction } from "@/app/dashboard/jobs/actions";
import { Plus, Upload, X, Search, Check } from "lucide-react";

const FIELD =
  "w-full rounded-md border border-[var(--dash-border)] bg-white px-3 py-2 text-sm text-[var(--dash-text)] outline-none transition-colors placeholder:text-[var(--dash-text-muted)]/50 focus:border-[var(--dash-accent)] focus:ring-2 focus:ring-[var(--dash-accent-soft)]";

export type CompanyLogo = { id: number; name: string; logoUrl: string };

export function CompanyLogoPicker({
  logos: initialLogos,
  value,
  logoUrl,
  onChange,
}: {
  logos: CompanyLogo[];
  value: string;
  logoUrl: string;
  onChange: (name: string, logoUrl: string) => void;
}) {
  const [logos, setLogos] = useState(initialLogos);
  const [search, setSearch] = useState("");
  const [adding, setAdding] = useState(false);
  const [newLogoName, setNewLogoName] = useState("");
  const [newLogoFile, setNewLogoFile] = useState<File | null>(null);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return logos;
    return logos.filter((l) => l.name.toLowerCase().includes(q));
  }, [logos, search]);

  function selectLogo(logo: CompanyLogo) {
    onChange(logo.name, logo.logoUrl);
  }

  function clearSelection() {
    onChange("", "");
  }

  async function handleAddNewLogo() {
    if (!newLogoName.trim() || !newLogoFile) {
      setError("Enter a company name and choose a logo file.");
      return;
    }
    setSaving(true);
    setError(null);

    const fd = new FormData();
    fd.append("name", newLogoName.trim());
    fd.append("file", newLogoFile);

    const res = await addCompanyLogoAction(fd);
    setSaving(false);

    if (res.error || !res.name || !res.url) {
      setError(res.error || "Failed to save logo.");
      return;
    }

    const newEntry = { id: Date.now(), name: res.name, logoUrl: res.url };
    setLogos((prev) => [...prev.filter((l) => l.name !== res.name), newEntry]);
    onChange(res.name, res.url);
    setAdding(false);
    setNewLogoName("");
    setNewLogoFile(null);
  }

  return (
    <div className="rounded-lg border border-[var(--dash-border)] bg-white p-4">
      <div className="mb-3 flex items-center justify-between">
        <label className="text-xs font-medium text-[var(--dash-text-muted)]">
          Client Company Logo (Optional)
        </label>
        {value && (
          <div className="flex items-center gap-2 text-xs font-medium text-[var(--dash-accent)]">
            {logoUrl && (
              <div className="relative h-5 w-5 shrink-0 overflow-hidden rounded border border-[var(--dash-border)] bg-white">
                <Image src={logoUrl} alt={value} fill className="object-contain" />
              </div>
            )}
            Selected: {value}
            <button
              type="button"
              onClick={clearSelection}
              className="text-[var(--dash-text-muted)] hover:text-red-600"
              aria-label="Clear selection"
            >
              <X size={13} />
            </button>
          </div>
        )}
      </div>

      <div className="relative">
        <Search
          size={15}
          className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[var(--dash-text-muted)]"
        />
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search saved company logos..."
          className={`${FIELD} pl-9`}
        />
      </div>

      <div className="mt-3 grid grid-cols-3 gap-2 sm:grid-cols-4 md:grid-cols-6">
        {filtered.map((logo) => {
          const selected = logo.name === value;
          return (
            <button
              key={logo.id}
              type="button"
              onClick={() => selectLogo(logo)}
              className={`relative flex flex-col items-center gap-1.5 rounded-lg border p-2.5 transition-all hover:border-[var(--dash-accent)] ${
                selected
                  ? "border-[var(--dash-accent)] bg-[var(--dash-accent-soft)]"
                  : "border-[var(--dash-border)] bg-white"
              }`}
            >
              {selected && (
                <span className="absolute right-1 top-1 flex h-4 w-4 items-center justify-center rounded-full bg-[var(--dash-accent)] text-white">
                  <Check size={10} />
                </span>
              )}
              <div className="relative h-12 w-12 overflow-hidden rounded-md border border-[var(--dash-border)] bg-white">
                <Image src={logo.logoUrl} alt={logo.name} fill className="object-contain p-1" />
              </div>
              <span className="w-full truncate text-center text-[11px] font-medium text-[var(--dash-text)]">
                {logo.name}
              </span>
            </button>
          );
        })}

        {/* Add New Logo tile */}
        {!adding ? (
          <button
            type="button"
            onClick={() => {
              setAdding(true);
              setNewLogoName(search);
            }}
            className="flex flex-col items-center justify-center gap-1.5 rounded-lg border-2 border-dashed border-[var(--dash-border)] p-2.5 text-[var(--dash-text-muted)] transition-colors hover:border-[var(--dash-accent)] hover:text-[var(--dash-accent)]"
          >
            <div className="flex h-12 w-12 items-center justify-center">
              <Plus size={20} />
            </div>
            <span className="text-[11px] font-medium">Add New Logo</span>
          </button>
        ) : (
          <div className="col-span-full rounded-lg border border-[var(--dash-border)] bg-black/[0.02] p-3">
            <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
              <input
                value={newLogoName}
                onChange={(e) => setNewLogoName(e.target.value)}
                placeholder="Company name, e.g. AMNS"
                className={FIELD}
              />
              <label className="flex cursor-pointer items-center justify-between rounded-md border border-dashed border-[var(--dash-border)] px-3 py-2 text-xs hover:border-[var(--dash-accent)]">
                <span className="flex items-center gap-1.5 text-[var(--dash-text-muted)]">
                  <Upload size={13} />
                  {newLogoFile ? newLogoFile.name : "Choose logo image"}
                </span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => setNewLogoFile(e.target.files?.[0] ?? null)}
                  className="hidden"
                />
              </label>
            </div>
            {error && <p className="mt-2 text-[11px] text-red-600">{error}</p>}
            <div className="mt-2 flex gap-2">
              <button
                type="button"
                disabled={saving}
                onClick={handleAddNewLogo}
                className="flex-1 rounded-md bg-[var(--dash-accent)] px-3 py-1.5 text-xs font-medium text-white disabled:opacity-50 sm:flex-none"
              >
                {saving ? "Saving..." : "Save Logo"}
              </button>
              <button
                type="button"
                onClick={() => {
                  setAdding(false);
                  setNewLogoFile(null);
                  setNewLogoName("");
                  setError(null);
                }}
                className="rounded-md border border-[var(--dash-border)] px-3 py-1.5 text-xs"
              >
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
