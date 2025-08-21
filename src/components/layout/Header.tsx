import Link from "next/link";
import type { Locale, Dictionary } from "@/lib/i18n";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { LocaleToggle } from "@/components/ui/LocaleToggle";

export function Header({
  locale,
  dict,
}: {
  locale: Locale;
  dict: Dictionary;
}) {
  const base = `/${locale}`;

  return (
    <header className="border-b border-border">
      <div className="mx-auto w-full max-w-3xl px-6 flex h-14 items-center justify-between gap-4">
        <Link
          href={base}
          className="font-semibold tracking-tight text-fg hover:opacity-80"
        >
          Diego
        </Link>
        <nav aria-label="Primary" className="flex items-center gap-1 text-sm">
          <Link
            href={`${base}/projects`}
            className="px-2 py-1 font-medium text-fg/70 hover:text-fg transition-colors"
          >
            {dict.nav.projects}
          </Link>
          <Link
            href={`${base}/about`}
            className="px-2 py-1 font-medium text-fg/70 hover:text-fg transition-colors"
          >
            {dict.nav.about}
          </Link>
          <span className="mx-2 h-5 w-px bg-border" aria-hidden />
          <LocaleToggle locale={locale} label={dict.localeToggle} />
          <ThemeToggle label={dict.themeToggle} />
        </nav>
      </div>
    </header>
  );
}
