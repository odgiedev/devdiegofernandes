import type { Project } from "./types";

export const projects: Project[] = [
  {
    slug: "trackrr",
    title: "Trackrr",
    highlights: ["Express 5", "Next.js 16", "PostgreSQL", "Prisma", "JWT", "Vitest"],
    tagline: {
      pt: "Gestão de despesas pessoais com orçamento mensal por categoria — API REST + front Next.js.",
      en: "Personal expense tracker with monthly budget per category — REST API + Next.js front.",
    },
    stack: [
      {
        label: { pt: "Back-end (API)", en: "Back-end (API)" },
        items: [
          "Express 5",
          "TypeScript",
          "Prisma 7",
          "PostgreSQL",
          "Zod",
          "JWT",
          "bcryptjs",
          "Pino",
          "Vitest",
          "Supertest",
        ],
      },
      {
        label: { pt: "Front-end", en: "Front-end" },
        items: [
          "Next.js 16",
          "React",
          "TypeScript",
          "TanStack Query",
          "Zustand",
          "Axios",
          "Zod",
        ],
      },
    ],
    role: { pt: "Full-stack", en: "Full-stack" },
    year: 2025,
    github: "https://github.com/odgiedev/trackrr",
    githubApi: "https://github.com/odgiedev/trackrr-api",
    media: {
      type: "video",
      src: "/projects/trackrr/hero.mp4",
      alt: {
        pt: "Demonstração do fluxo principal do Trackrr",
        en: "Trackrr main flow demo",
      },
    },
    featured: true,
    order: 3,
  },
  {
    slug: "byro",
    title: "Byro",
    highlights: ["Laravel 11", "React", "PostgreSQL", "Mercado Pago", "Docker", "Pest"],
    tagline: {
      pt: "E-commerce de eBooks — API Laravel + React, com checkout Mercado Pago.",
      en: "E-Book store — Laravel API + React, with Mercado Pago checkout.",
    },
    stack: [
      {
        label: { pt: "Back-end (API)", en: "Back-end (API)" },
        items: [
          "PHP 8.3",
          "Laravel 11",
          "PostgreSQL 16",
          "Sanctum",
          "HMAC-SHA256",
          "Mercado Pago SDK",
          "Scramble (OpenAPI 3.1)",
          "Pest 3",
        ],
      },
      {
        label: { pt: "Front-end", en: "Front-end" },
        items: [
          "React 18",
          "Vite 6",
          "React Router v7",
          "Tailwind v3",
          "Zustand",
          "Axios",
          "date-fns",
          "Mercado Pago SDK React",
        ],
      },
      {
        label: { pt: "Infra & Deploy", en: "Infra & Deploy" },
        items: ["Docker", "Docker Compose", "Nginx", "Caddy", "Hetzner VPS", "Vercel"],
      },
    ],
    role: { pt: "Full-stack", en: "Full-stack" },
    year: 2025,
    demo: "https://getbyro.store",
    readme: "https://gist.github.com/odgiedev/f47c1b935226e027e5dbf260e1f0f93d",
    readmeApi: "https://gist.github.com/odgiedev/a8d8769681a0f8bd351b77a075829d52",
    media: {
      type: "video",
      src: "/projects/byro/hero.mp4",
      alt: {
        pt: "Demonstração do fluxo de compra do Byro",
        en: "Byro purchase flow demo",
      },
    },
    featured: true,
    order: 2,
  },
  {
    slug: "reservvo",
    title: "Reservvo",
    highlights: ["Spring Boot 4", "Next.js 16", "PostgreSQL 17", "Redis", "Docker", "JUnit 5"],
    tagline: {
      pt: "Plataforma de agendamento online — API Spring Boot 4 + front Next.js 16, com fila Redis Streams e cache coordenado.",
      en: "Online booking platform — Spring Boot 4 API + Next.js 16 front, with Redis Streams queue and coordinated cache.",
    },
    stack: [
      {
        label: { pt: "Back-end (API)", en: "Back-end (API)" },
        items: [
          "Java 25",
          "Spring Boot 4",
          "Spring Security",
          "Spring Data JPA",
          "Hibernate 7",
          "PostgreSQL 17",
          "Redis 7 (Streams + cache)",
          "JJWT",
          "BCrypt",
          "AWS SES",
          "JUnit 5",
          "Mockito",
          "SpringDoc OpenAPI",
          "Maven",
        ],
      },
      {
        label: { pt: "Front-end", en: "Front-end" },
        items: [
          "Next.js 16",
          "React 19",
          "TypeScript",
          "Tailwind v4",
          "Zustand",
          "TanStack Query v5",
          "React Hook Form",
          "Zod",
          "Axios",
          "date-fns",
        ],
      },
      {
        label: { pt: "Infra & Deploy", en: "Infra & Deploy" },
        items: ["Docker (multi-stage)", "Docker Compose", "Caddy", "Hetzner VPS", "Vercel"],
      },
    ],
    role: { pt: "Full-stack", en: "Full-stack" },
    year: 2026,
    demo: "https://reservvo.cloud",
    readme: "https://gist.github.com/odgiedev/62b06263673797a18a28835b4801c67b",
    readmeApi: "https://gist.github.com/odgiedev/e6e1158892b3b1810d8a3a967ba19ac7",
    media: {
      type: "video",
      src: "/projects/reservvo/hero.mp4",
      alt: {
        pt: "Demonstração do fluxo de agendamento do Reservvo",
        en: "Reservvo booking flow demo",
      },
    },
    featured: true,
    order: 1,
  },
  {
    slug: "hackernews-plus",
    title: "Hacker News Plus",
    highlights: ["React 18", "TypeScript", "Vite", "React Router", "Bootstrap 5"],
    tagline: {
      pt: "Cliente web para o Hacker News — React + TypeScript, consumindo duas APIs públicas.",
      en: "Hacker News web client — React + TypeScript, consuming two public APIs.",
    },
    stack: [
      {
        items: [
          "React 18",
          "TypeScript",
          "Vite",
          "React Router DOM v6",
          "Axios",
          "Bootstrap 5",
          "React Bootstrap",
          "Phosphor Icons",
          "date-fns",
          "DOMPurify",
        ],
      },
    ],
    role: { pt: "Front-end", en: "Front-end" },
    year: 2024,
    github: "https://github.com/odgiedev/hackernews-plus",
    media: {
      type: "video",
      src: "/projects/hackernews-plus/hero.mp4",
      alt: {
        pt: "Demonstração do Hacker News Plus",
        en: "Hacker News Plus demo",
      },
    },
    featured: false,
    order: 7,
  },
  {
    slug: "neosrate",
    title: "Neosrate",
    highlights: ["Spring Boot 3", "React 18", "MySQL 8", "Spring Security", "AWS S3", "JWT"],
    tagline: {
      pt: "Plataforma social estilo Reddit — API Spring Boot + front React/TypeScript, com upload de mídia para S3.",
      en: "Reddit-style social platform — Spring Boot API + React/TypeScript front, with S3 media upload.",
    },
    stack: [
      {
        label: { pt: "Back-end (API)", en: "Back-end (API)" },
        items: [
          "Java 21",
          "Spring Boot 3",
          "Spring Security",
          "Spring Data JPA",
          "MySQL 8",
          "JWT (Auth0)",
          "BCrypt",
          "ModelMapper",
          "AWS S3 SDK",
        ],
      },
      {
        label: { pt: "Front-end", en: "Front-end" },
        items: [
          "React 18",
          "TypeScript",
          "Vite (SWC)",
          "React Router DOM 6",
          "Axios",
          "Tailwind CSS 3",
          "Phosphor React",
          "jwt-decode",
        ],
      },
    ],
    role: { pt: "Full-stack", en: "Full-stack" },
    year: 2023,
    github: "https://github.com/odgiedev/neosrate",
    githubApi: "https://github.com/odgiedev/neosrate-api",
    media: {
      type: "video",
      src: "/projects/neosrate/hero.mp4",
      alt: {
        pt: "Demonstração do Neosrate",
        en: "Neosrate demo",
      },
    },
    featured: false,
    order: 5,
  },
  {
    slug: "linkiess",
    title: "Linkiess",
    highlights: ["NestJS 9", "React 18", "PostgreSQL", "Prisma", "AWS S3", "JWT"],
    tagline: {
      pt: "Plataforma link-in-bio — API NestJS + front React, com customização de perfil e upload para S3.",
      en: "Link-in-bio platform — NestJS API + React front, with profile customization and S3 upload.",
    },
    stack: [
      {
        label: { pt: "Back-end (API)", en: "Back-end (API)" },
        items: [
          "NestJS 9",
          "TypeScript",
          "Prisma 4.5",
          "PostgreSQL",
          "Passport.js (Local + JWT)",
          "bcrypt",
          "Multer",
          "AWS S3 SDK",
          "class-validator",
        ],
      },
      {
        label: { pt: "Front-end", en: "Front-end" },
        items: [
          "React 18",
          "React Router DOM 6",
          "Redux Toolkit",
          "Axios",
          "Tailwind CSS 3",
          "jwt-decode",
          "React Icons",
        ],
      },
    ],
    role: { pt: "Full-stack", en: "Full-stack" },
    year: 2022,
    github: "https://github.com/odgiedev/linkiess",
    githubApi: "https://github.com/odgiedev/linkiess-api",
    media: {
      type: "video",
      src: "/projects/linkiess/hero.mp4",
      alt: {
        pt: "Demonstração do Linkiess",
        en: "Linkiess demo",
      },
    },
    featured: true,
    order: 4,
  },
  {
    slug: "crypto-profit",
    title: "Crypto Profit",
    highlights: ["Laravel 9", "PHP 8", "MySQL", "Binance API", "Artisan"],
    tagline: {
      pt: "Ferramenta CLI para análise de oportunidade em criptomoedas — Laravel Artisan + Binance API + MySQL.",
      en: "CLI tool for cryptocurrency buy opportunity analysis — Laravel Artisan + Binance API + MySQL.",
    },
    stack: [
      {
        items: [
          "PHP 8.0",
          "Laravel 9",
          "MySQL",
          "Binance Futures Testnet API",
          "Guzzle HTTP",
          "Laravel Artisan",
        ],
      },
    ],
    role: { pt: "Back-end", en: "Back-end" },
    year: 2022,
    github: "https://github.com/odgiedev/crypto-profit",
    media: {
      type: "video",
      src: "/projects/crypto-profit/hero.mp4",
      alt: {
        pt: "Demonstração Crypto Profit",
        en: "Crypto Profit demo",
      },
    },
    featured: false,
    order: 6,
  },
];

export function cardTags(p: Project): string[] {
  const tags = p.highlights ?? p.stack.map((g) => g.items[0]);
  return tags.slice(0, 6);
}

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

export function getFeatured(): Project[] {
  return projects.filter((p) => p.featured).sort((a, b) => a.order - b.order);
}

export function getAll(): Project[] {
  return [...projects].sort((a, b) => a.order - b.order);
}
