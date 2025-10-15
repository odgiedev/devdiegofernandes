import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { ExternalLink, FileText } from "lucide-react";

function GitHubIcon({ size = 16 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden
    >
      <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.57.1.78-.25.78-.55 0-.27-.01-1.16-.02-2.11-3.2.69-3.87-1.37-3.87-1.37-.52-1.33-1.27-1.69-1.27-1.69-1.04-.71.08-.7.08-.7 1.15.08 1.76 1.18 1.76 1.18 1.02 1.76 2.69 1.25 3.34.96.1-.74.4-1.25.73-1.54-2.55-.29-5.24-1.28-5.24-5.7 0-1.26.45-2.29 1.18-3.1-.12-.29-.51-1.46.11-3.04 0 0 .96-.31 3.15 1.18.91-.25 1.89-.38 2.86-.38.97 0 1.95.13 2.86.38 2.19-1.49 3.15-1.18 3.15-1.18.62 1.58.23 2.75.11 3.04.74.81 1.18 1.84 1.18 3.1 0 4.43-2.69 5.41-5.26 5.69.41.36.78 1.06.78 2.13 0 1.54-.01 2.78-.01 3.16 0 .31.21.66.79.55C20.21 21.39 23.5 17.07 23.5 12 23.5 5.65 18.35.5 12 .5z" />
    </svg>
  );
}
import { locales, isLocale, getDictionary } from "@/lib/i18n";
import { projects, getProject } from "@/lib/projects";
import { projectContent } from "@/content/projects";

export function generateStaticParams() {
  const params: { locale: string; slug: string }[] = [];
  for (const locale of locales) {
    for (const p of projects) {
      params.push({ locale, slug: p.slug });
    }
  }
  return params;
}

export async function generateMetadata({
  params,
}: PageProps<"/[locale]/projects/[slug]">): Promise<Metadata> {
  const { locale, slug } = await params;
  if (!isLocale(locale)) return {};
  const p = getProject(slug);
  if (!p) return {};
  return { title: p.title, description: p.tagline[locale] };
}

export default async function ProjectPage({
  params,
}: PageProps<"/[locale]/projects/[slug]">) {
  const { locale, slug } = await params;
  if (!isLocale(locale)) notFound();

  const p = getProject(slug);
  const factory = projectContent[slug];
  if (!p || !factory) notFound();

  const dict = await getDictionary(locale);
  const t = dict.projects;
  const content = factory(locale);

  return (
    <article className="mx-auto w-full max-w-3xl px-6 py-12">
      <Link
        href={`/${locale}/projects`}
        className="text-sm text-muted hover:text-fg"
      >
        {t.backToProjects}
      </Link>

      <header className="mt-6">
        <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
          {p.title}
        </h1>
        <p className="mt-2 text-lg text-muted">{p.tagline[locale]}</p>

        <div className="mt-5 space-y-3">
          {p.stack.map((group, gi) => (
            <div key={gi}>
              {group.label && (
                <p className="mb-1.5 text-xs uppercase tracking-wide text-muted">
                  {group.label[locale]}
                </p>
              )}
              <ul className="flex flex-wrap gap-2">
                {group.items.map((s) => (
                  <li
                    key={s}
                    className="rounded-full border border-border px-2.5 py-0.5 text-xs text-muted"
                  >
                    {s}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-6 flex flex-wrap gap-3">
          {p.demo && (
            <a
              href={p.demo}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-11 items-center gap-2 rounded-md bg-fg px-5 text-sm font-medium text-bg hover:opacity-90 transition-opacity"
            >
              <ExternalLink size={16} aria-hidden /> {t.demo}
            </a>
          )}
          {p.github && p.githubApi ? (
            <>
              <a
                href={p.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-11 items-center gap-2 rounded-md border border-border px-5 text-sm font-medium hover:bg-subtle transition-colors"
              >
                <GitHubIcon /> {t.githubFront}
              </a>
              <a
                href={p.githubApi}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-11 items-center gap-2 rounded-md border border-border px-5 text-sm font-medium hover:bg-subtle transition-colors"
              >
                <GitHubIcon /> {t.githubApi}
              </a>
            </>
          ) : p.github ? (
            <a
              href={p.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-11 items-center gap-2 rounded-md border border-border px-5 text-sm font-medium hover:bg-subtle transition-colors"
            >
              <GitHubIcon /> {t.github}
            </a>
          ) : null}
          {!p.github && p.readme && p.readmeApi ? (
            <>
              <a
                href={p.readme}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-11 items-center gap-2 rounded-md border border-border px-5 text-sm font-medium hover:bg-subtle transition-colors"
              >
                <FileText size={16} aria-hidden /> {t.readmeFront}
              </a>
              <a
                href={p.readmeApi}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-11 items-center gap-2 rounded-md border border-border px-5 text-sm font-medium hover:bg-subtle transition-colors"
              >
                <FileText size={16} aria-hidden /> {t.readmeApi}
              </a>
            </>
          ) : !p.github && p.readme ? (
            <a
              href={p.readme}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-11 items-center gap-2 rounded-md border border-border px-5 text-sm font-medium hover:bg-subtle transition-colors"
            >
              <FileText size={16} aria-hidden /> {t.readme}
            </a>
          ) : null}
        </div>
      </header>

      {p.media && (
        <figure className="relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] mt-10 w-screen px-0">
          <div className="mx-auto max-w-6xl">
            {p.media.type === "video" ? (
              <video
                src={p.media.src}
                autoPlay
                muted
                loop
                playsInline
                className="block w-full h-auto rounded-lg"
              />
            ) : (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={p.media.src}
                alt={p.media.alt[locale]}
                className="block w-full h-auto rounded-lg"
              />
            )}
            <p className="mt-2 text-center text-sm font-bold text-muted">
              {t.mediaHint}
            </p>
          </div>
        </figure>
      )}

      <section className="mt-12">
        <h2 className="text-xl font-semibold tracking-tight">
          {t.contextTitle}
        </h2>
        <div className="mt-4 space-y-4 text-fg/90 leading-relaxed [&_p]:text-fg/90">
          {content.context}
        </div>
      </section>

      <section className="mt-12">
        <h2 className="text-xl font-semibold tracking-tight">
          {t.decisionsTitle}
        </h2>
        <div className="mt-4 space-y-3">
          {content.decisions.map((d, i) => (
            <details
              key={d.title}
              open={i === 0}
              className="group rounded-lg border border-border bg-subtle/40 [&[open]]:bg-subtle"
            >
              <summary className="cursor-pointer list-none px-5 py-4 font-medium flex items-center justify-between gap-4">
                <span>{d.title}</span>
                <span
                  aria-hidden
                  className="text-muted transition-transform group-open:rotate-180"
                >
                  ▾
                </span>
              </summary>
              <div className="px-5 pb-5 space-y-3 text-fg/90 leading-relaxed [&_p]:text-fg/90">
                {d.body}
              </div>
            </details>
          ))}
        </div>
      </section>

      {p.github && p.githubApi && (() => {
        const frontRepo = p.github.split("/").pop()!;
        const apiRepo = p.githubApi.split("/").pop()!;
        const code = [
          `mkdir ${frontRepo}-local && cd ${frontRepo}-local`,
          ``,
          `git clone ${p.github}`,
          `git clone ${p.githubApi}`,
          ``,
          `cp ${frontRepo}/.env.example ${frontRepo}/.env`,
          `cp ${apiRepo}/.env.example ${apiRepo}/.env`,
          ``,
          `# Terminal 1 — API`,
          `cd ${apiRepo} && docker compose up`,
          ``,
          `# Terminal 2 — Front`,
          `cd ${frontRepo} && docker compose up`,
        ].join("\n");
        return (
          <section className="mt-12">
            <h2 className="text-xl font-semibold tracking-tight">{t.dockerTitle}</h2>
            <p className="mt-2 text-sm text-muted">{t.dockerDesc}</p>
            <pre className="mt-4 overflow-x-auto rounded-lg border border-border bg-subtle p-5 text-sm leading-relaxed">
              <code>{code}</code>
            </pre>
          </section>
        );
      })()}
    </article>
  );
}
