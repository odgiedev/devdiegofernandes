import { notFound } from "next/navigation";
import { isLocale, getDictionary } from "@/lib/i18n";
import { SOCIAL } from "@/lib/social";

export default async function AboutPage({
  params,
}: PageProps<"/[locale]/about">) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const dict = await getDictionary(locale);
  const a = dict.about;

  return (
    <section className="mx-auto w-full max-w-3xl px-6 py-16">
      <h1 className="text-3xl font-semibold tracking-tight">{a.title}</h1>
      <p className="mt-4 text-lg text-muted">{a.intro}</p>

      <h2 className="mt-12 text-xl font-semibold tracking-tight">
        {a.factsTitle}
      </h2>
      <dl className="mt-4 space-y-3">
        {a.facts.map((f) => (
          <div key={f.label} className="flex flex-col gap-0.5 sm:flex-row sm:gap-4">
            <dt className="shrink-0 sm:w-36 text-sm font-medium text-fg/70">
              {f.label}
            </dt>
            <dd className="text-muted">{f.value}</dd>
          </div>
        ))}
      </dl>

      <h2 className="mt-12 text-xl font-semibold tracking-tight">
        {a.stackTitle}
      </h2>
      <ul className="mt-4 space-y-2 text-muted">
        {a.stack.map((item) => (
          <li key={item} className="flex gap-2">
            <span aria-hidden className="text-fg/40">
              ▸
            </span>
            <span>{item}</span>
          </li>
        ))}
      </ul>

      <h2 className="mt-12 text-xl font-semibold tracking-tight">
        {a.interestsTitle}
      </h2>
      <ul className="mt-4 space-y-2 text-muted">
        {a.interests.map((item) => (
          <li key={item} className="flex gap-2">
            <span aria-hidden className="text-fg/40">
              ▸
            </span>
            <span>{item}</span>
          </li>
        ))}
      </ul>

      <div className="mt-12 rounded-lg border border-border p-6">
        <h2 className="text-xl font-semibold tracking-tight">{a.ctaTitle}</h2>

        <a
          href={`mailto:${SOCIAL.email}`}
          className="mt-4 inline-flex h-11 items-center rounded-md bg-fg px-5 text-sm font-medium text-bg hover:opacity-90 transition-opacity"
        >
          {SOCIAL.email}
        </a>
      </div>
    </section>
  );
}
