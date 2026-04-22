# Portfólio — Diego Fernandes

> Portfólio pessoal (PT/EN) com estudos de caso técnicos dos meus projetos.


---

## Sobre

Site de portfólio construído com Next.js (App Router) e renderização estática. Cada projeto tem uma página própria com contexto, stack e as **decisões técnicas** por trás dele. O foco é demonstrar:

- Internacionalização (PT/EN) sem biblioteca externa, com rota por idioma e dicionários tipados
- Geração estática completa (SSG) — todas as páginas pré-renderizadas no build
- Imagem Open Graph dinâmica gerada por código (`next/og`)
- Tema claro/escuro sem flash (FOUC), via cookie + script inline
- Conteúdo dos projetos desacoplado da UI, em arquivos por idioma

## Stack

- **Next.js 16** (App Router) + **React 19**
- **TypeScript** (strict)
- **Tailwind CSS v4**
- `next/og` para Open Graph dinâmico
- `lucide-react` para ícones
- Deploy na **Vercel**

## Decisões técnicas

### i18n sem biblioteca
Em vez de uma lib de i18n, o idioma é um segmento de rota (`[locale]`) e o texto vem de dicionários JSON (`pt.json` / `en.json`) carregados por `getDictionary(locale)`. O tipo `Dictionary` é inferido do JSON, então qualquer chave usada na UI é checada pelo TypeScript. Menos dependência, tipagem de graça.

### Geração estática (SSG)
`generateStaticParams` produz as rotas dos dois idiomas e de cada projeto no build. Resultado: HTML estático servido pela CDN, sem runtime de servidor.

### Open Graph dinâmico
`opengraph-image.tsx` usa `ImageResponse` (`next/og`) para gerar o cartão de compartilhamento por idioma no build — sem precisar manter um PNG manual.

### Conteúdo dos projetos separado da UI
Cada projeto vive em `content/projects/<slug>.tsx`, retornando contexto e decisões técnicas em PT e EN. A lista e os metadados ficam em `lib/projects.ts`. Adicionar um projeto não toca em componente de página.

### Tema sem flash
Um script inline no `<head>` aplica a classe de tema (lido do cookie ou da preferência do sistema) antes da página pintar, evitando o flash de tema errado.

## Estrutura

```
src/
├── app/
│   ├── [locale]/
│   │   ├── layout.tsx           # metadata, hreflang, header/footer
│   │   ├── page.tsx             # home
│   │   ├── about/page.tsx
│   │   ├── projects/
│   │   │   ├── page.tsx         # lista
│   │   │   └── [slug]/page.tsx  # detalhe + decisões
│   │   └── opengraph-image.tsx  # OG dinâmica
│   ├── globals.css
│   └── icon.svg                 # favicon
├── components/
│   ├── layout/                  # Header, Footer
│   ├── sections/                # Hero, FeaturedProjects, Contact
│   └── ui/                      # ThemeToggle, LocaleToggle
├── content/projects/            # estudos de caso (pt/en) por projeto
└── lib/
    ├── i18n.ts                  # locales + getDictionary
    ├── dictionaries/            # pt.json, en.json
    ├── projects.ts              # lista + helpers
    └── types.ts
```