import { ImageResponse } from "next/og";
import { locales, isLocale } from "@/lib/i18n";

export const alt = "Diego Fernandes — Full-stack Developer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function Image({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const pt = isLocale(locale) && locale === "pt";
  const role = pt ? "Desenvolvedor Full-stack" : "Full-stack Developer";
  const stack = "Java · Spring Boot · Node · TypeScript · Next.js · PHP";

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          background: "#0a0a0a",
          color: "#ffffff",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ fontSize: 96, fontWeight: 700, letterSpacing: -2 }}>
          Diego Fernandes
        </div>
        <div style={{ marginTop: 16, fontSize: 44, color: "#a3a3a3" }}>
          {role}
        </div>
        <div style={{ marginTop: 48, fontSize: 30, color: "#ededed" }}>
          {stack}
        </div>
        <div style={{ marginTop: 56, fontSize: 26, color: "#737373" }}>
          devdiegofernandes.com
        </div>
      </div>
    ),
    { ...size },
  );
}
