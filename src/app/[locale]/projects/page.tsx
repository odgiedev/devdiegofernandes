import Link from "next/link";
import { notFound } from "next/navigation";
import { isLocale, getDictionary } from "@/lib/i18n";
import { getAll, cardTags } from "@/lib/projects";

function GitHubIcon({ size = 22 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.57.1.78-.25.78-.55 0-.27-.01-1.16-.02-2.11-3.2.69-3.87-1.37-3.87-1.37-.52-1.33-1.27-1.69-1.27-1.69-1.04-.71.08-.7.08-.7 1.15.08 1.76 1.18 1.76 1.18 1.02 1.76 2.69 1.25 3.34.96.1-.74.4-1.25.73-1.54-2.55-.29-5.24-1.28-5.24-5.7 0-1.26.45-2.29 1.18-3.1-.12-.29-.51-1.46.11-3.04 0 0 .96-.31 3.15 1.18.91-.25 1.89-.38 2.86-.38.97 0 1.95.13 2.86.38 2.19-1.49 3.15-1.18 3.15-1.18.62 1.58.23 2.75.11 3.04.74.81 1.18 1.84 1.18 3.1 0 4.43-2.69 5.41-5.26 5.69.41.36.78 1.06.78 2.13 0 1.54-.01 2.78-.01 3.16 0 .31.21.66.79.55C20.21 21.39 23.5 17.07 23.5 12 23.5 5.65 18.35.5 12 .5z" />
    </svg>
  );
}

export default async function ProjectsPage({
  params,
}: PageProps<"/[locale]/projects">) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const dict = await getDictionary(locale);
  const projects = getAll();
  const base = `/${locale}`;

  return (
    <section className="mx-auto w-full max-w-4xl px-6 py-16">
      <h1 className="text-3xl font-semibold tracking-tight">
        {dict.projects.title}
      </h1>

      {projects.length === 0 ? (
        <p className="mt-6 text-muted">{dict.projects.empty}</p>
      ) : (
        <ul className="mt-10 grid gap-5 sm:grid-cols-2">
          {projects.map((p) => {
            const tags = cardTags(p);
            return (
              <li key={p.slug} className="h-full">
                <Link
                  href={`${base}/projects/${p.slug}`}
                  className="group flex h-full flex-col overflow-hidden rounded-lg border border-border hover:border-fg/40 transition-colors"
                >
                  <div className="aspect-video overflow-hidden bg-subtle">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={`/projects/${p.slug}/hero.jpg`}
                      alt={p.title}
                      loading="lazy"
                      className="h-full w-full object-cover object-top transition-transform duration-300 group-hover:scale-[1.03]"
                    />
                  </div>
                  <div className="flex flex-1 flex-col p-5">
                    <h2 className="font-medium">{p.title}</h2>
                    <p className="mt-1 line-clamp-2 text-sm text-muted">
                      {p.tagline[locale]}
                    </p>
                    <ul className="mt-3 flex flex-wrap gap-1.5">
                      {tags.map((t) => (
                        <li
                          key={t}
                          className="rounded-full border border-border px-2 py-0.5 text-xs text-muted"
                        >
                          {t}
                        </li>
                      ))}
                    </ul>
                    <p className="mt-auto pt-3 text-xs uppercase tracking-wide text-muted">
                      {p.year} · {p.role[locale]}
                    </p>
                  </div>
                </Link>
              </li>
            );
          })}

          <li className="h-full">
            <a
              href="https://github.com/odgiedev"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex h-full flex-col items-center justify-center gap-2 rounded-lg border border-dashed border-border p-5 text-center hover:border-fg/40 hover:bg-subtle/40 transition-colors"
            >
              <span className="text-muted transition-colors group-hover:text-fg">
                <GitHubIcon />
              </span>
              <span className="font-medium">
                {dict.projects.viewAllOnGithub} →
              </span>
              <span className="text-xs uppercase tracking-wide text-muted">
                {dict.projects.reposCount}
              </span>
            </a>
          </li>
        </ul>
      )}
    </section>
  );
}
