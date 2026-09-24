import Link from "next/link";
import type { Dictionary, Locale } from "@/lib/i18n";
import { getFeatured, cardTags } from "@/lib/projects";

export function FeaturedProjects({
  locale,
  dict,
}: {
  locale: Locale;
  dict: Dictionary;
}) {
  const projects = getFeatured();
  const base = `/${locale}`;

  return (
    <section className="mx-auto w-full max-w-3xl px-6 py-12">
      <div className="flex items-baseline justify-between">
        <h2 className="text-2xl font-semibold tracking-tight">
          {dict.featured.title}
        </h2>
        <Link
          href={`${base}/projects`}
          className="text-sm text-muted hover:text-fg"
        >
          {dict.featured.viewAll} →
        </Link>
      </div>

      {projects.length === 0 ? (
        <p className="mt-6 text-muted">{dict.featured.empty}</p>
      ) : (
        <ul className="mt-8 grid gap-4 sm:grid-cols-2">
          {projects.map((p) => (
            <li key={p.slug} className="relative h-full">
              <Link
                href={`${base}/projects/${p.slug}`}
                className="flex h-full flex-col rounded-lg border border-border p-5 hover:border-fg/40 transition-colors"
              >
                <h3 className="font-medium pr-20">{p.title}</h3>
                <p className="mt-1 line-clamp-2 text-sm text-muted">
                  {p.tagline[locale]}
                </p>
                <ul className="mt-3 flex flex-wrap gap-1.5">
                  {cardTags(p).map((t) => (
                    <li
                      key={t}
                      className="rounded-full border border-border px-2 py-0.5 text-xs text-muted"
                    >
                      {t}
                    </li>
                  ))}
                </ul>
              </Link>
              {p.demo && (
                <a
                  href={p.demo}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${p.title} — ${dict.projects.demo}`}
                  className="absolute right-4 top-4 z-10 inline-flex items-center gap-1.5 rounded-full border border-emerald-500/40 bg-emerald-500/10 px-2.5 py-1 text-xs font-medium text-emerald-600 dark:text-emerald-400 hover:border-emerald-500/70 transition-colors"
                >
                  <span className="relative flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
                  </span>
                  {dict.projects.live}
                </a>
              )}
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
