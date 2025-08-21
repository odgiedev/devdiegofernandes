"use client";

import { usePathname } from "next/navigation";

type Locale = "pt" | "en";
const LOCALES: readonly Locale[] = ["pt", "en"];

function isLocale(v: string): v is Locale {
  return (LOCALES as readonly string[]).includes(v);
}

export function LocaleToggle({
  locale,
  label,
}: {
  locale: Locale;
  label: string;
}) {
  const pathname = usePathname();
  const next: Locale = locale === "pt" ? "en" : "pt";

  function switchLocale() {
    const segments = pathname.split("/").filter(Boolean);
    if (segments[0] && isLocale(segments[0])) {
      segments[0] = next;
    } else {
      segments.unshift(next);
    }
    window.location.assign(`/${segments.join("/")}`);
  }

  return (
    <button
      type="button"
      onClick={switchLocale}
      aria-label={label}
      className="inline-flex h-9 min-w-9 items-center justify-center rounded-md border border-border px-2 text-xs font-medium uppercase tracking-wide hover:bg-subtle transition-colors"
    >
      {next}
    </button>
  );
}
