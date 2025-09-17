import Link from "next/link";
import type { Locale, Dictionary } from "@/lib/i18n";

export function Hero({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  return (
    <section className="mx-auto w-full max-w-3xl px-6 py-20 sm:py-28">
      <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">
        {dict.hero.name}
      </h1>
      <p className="mt-4 max-w-xl text-lg text-muted">{dict.hero.tagline}</p>
      <div className="mt-8 flex items-center gap-5">
        <Link
          href={`/${locale}/projects`}
          className="inline-flex h-11 items-center rounded-md bg-fg px-5 text-sm font-medium text-bg hover:opacity-90 transition-opacity"
        >
          {dict.hero.viewProjects}
        </Link>
        <a
          href="#contact"
          className="text-sm font-medium text-muted hover:text-fg transition-colors"
        >
          {dict.hero.cta}
        </a>
      </div>
    </section>
  );
}
