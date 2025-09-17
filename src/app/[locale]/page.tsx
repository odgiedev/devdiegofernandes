import { notFound } from "next/navigation";
import { isLocale, getDictionary } from "@/lib/i18n";
import { Hero } from "@/components/sections/Hero";
import { FeaturedProjects } from "@/components/sections/FeaturedProjects";
import { Contact } from "@/components/sections/Contact";

export default async function HomePage({
  params,
}: PageProps<"/[locale]">) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const dict = await getDictionary(locale);

  return (
    <>
      <Hero locale={locale} dict={dict} />
      <FeaturedProjects locale={locale} dict={dict} />
      <Contact dict={dict} />
    </>
  );
}
