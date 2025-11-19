import type { ProjectContentFactory } from "@/lib/types";

const content: ProjectContentFactory = (locale) => {
  if (locale === "pt") {
    return {
      context: (
        <>
          <p>
            Trackrr é um sistema de gestão de despesas pessoais com controle de
            orçamento mensal por categoria. O usuário cadastra categorias,
            registra despesas e define um teto por categoria. O dashboard mostra
            gasto vs. orçamento em tempo real, sempre derivado a partir das
            despesas — nunca armazenado. Exportação em PDF (via{" "}
            <code>@react-pdf/renderer</code> no client) e CSV (sem lib,
            gerado em código direto).
          </p>
          <p>
            O back-end segue arquitetura em camadas estrita com Express 5,
            Prisma 7 e PostgreSQL. Valores monetários usam{" "}
            <code>Decimal(12,2)</code> serializado como string no JSON. Suíte de
            testes executa 79 testes em ~1 segundo com Prisma mockado, sem
            dependência de banco.
          </p>
          <p>
            O front-end usa Next.js 16 com TanStack Query para estado de
            servidor e Zustand exclusivamente para auth. Autenticação dual: JWT
            no header via interceptor Axios + cookie espelho para o middleware
            edge. Organização por feature, não por tipo de arquivo.
          </p>
        </>
      ),
      decisions: [
        {
          title: "API · Arquitetura em camadas estrita",
          body: (
            <>
              <p>
                A aplicação segue Routes → Controllers → Services →
                Repositories, com cada camada possuindo uma única
                responsabilidade. Controllers não acessam o Prisma, services
                não manipulam <code>req</code>/<code>res</code>, e repositories
                não contêm regras de negócio. Dependências fluem em uma única
                direção.
              </p>
              <p>
                Repositories podem ser mockados para testar services em
                isolamento; o Prisma client pode ser mockado para testar rotas
                end-to-end. Regras de negócio ficam nos services, validações
                nos schemas, e mudanças de persistência não vazam para o
                restante do sistema.
              </p>
            </>
          ),
        },
        {
          title: "API · Decimal para valores monetários",
          body: (
            <>
              <p>
                Todos os campos monetários usam <code>Decimal(12,2)</code> no
                Prisma e são serializados como string no JSON (
                <code>&ldquo;12.50&rdquo;</code> em vez de <code>12.5</code>).
                Evita problemas de precisão do IEEE 754 —{" "}
                <code>0.1 + 0.2 === 0.30000000000000004</code> em JavaScript —
                que acumulam erros em operações sobre orçamento.
              </p>
              <p>
                Serializar como string preserva a precisão até o consumidor,
                que pode optar pela representação adequada ao seu contexto
                (libs como <code>decimal.js</code> no front-end, BigInt para
                cálculos exatos, ou conversão para float quando precisão não é
                crítica).
              </p>
            </>
          ),
        },
        {
          title: "API · Estratégia de testes com Prisma mockado",
          body: (
            <>
              <p>
                A suíte (Vitest + Supertest) executa 79 testes em ~1 segundo
                sem dependência de banco em execução. O Prisma client é mockado
                via <code>vi.mock</code>, e cada teste configura explicitamente
                o comportamento dos métodos consumidos. Cobertura inclui rotas,
                middlewares, services, mappers — toda a stack acima da camada
                de persistência.
              </p>
              <p>
                Trade-off: bugs de SQL ou migrations quebradas não são
                detectados aqui. A camada complementar seria testes de
                repository contra Postgres real (testcontainers) no pipeline
                de CI.
              </p>
            </>
          ),
        },
        {
          title: "Front · Zustand para auth, TanStack Query para o resto",
          body: (
            <>
              <p>
                Estado de UI e estado de servidor são tratados por ferramentas
                distintas. Server state usa TanStack Query — cache,
                invalidação, refetch e dedup de requests em flight.
              </p>
              <p>
                Zustand entra só onde Query não cabe: o par{" "}
                <code>{`{ token, user }`}</code> da auth, que precisa ser
                síncrono, persistir em <code>localStorage</code> e ser lido
                fora de componente (interceptor do Axios). Server state e
                client state ficam em camadas distintas.
              </p>
            </>
          ),
        },
        {
          title: "Front · Arquitetura por feature, não por tipo",
          body: (
            <>
              <p>
                <code>features/expenses/</code> agrupa tudo da feature:{" "}
                <code>api.ts</code>, <code>hooks.ts</code>,{" "}
                <code>schemas.ts</code>, <code>types.ts</code>,{" "}
                <code>components/</code>. A pasta <code>app/</code> fica fina —
                cada página é composição desses hooks e components.
              </p>
              <p>
                Regra: features não importam umas das outras. Qualquer coisa
                transversal vai para <code>shared/</code>. O blast radius de
                qualquer mudança fica contido na pasta da feature.
              </p>
            </>
          ),
        },
        {
          title: "Front · PDF gerado no client, não no servidor e com lazy import",
          body: (
            <>
              <p>
                Caminho mais fácil seria adicionar Puppeteer/Playwright na API
                Express e renderizar PDF no back — pixel-perfect, qualquer CSS
                funciona, mas o custo seria muito alto.
              </p>
              <p>
                <code>@react-pdf/renderer</code> no client: componentes JSX
                viram PDF binário direto no navegador, sem rasterizar DOM (que
                é o que <code>html2canvas</code> faz, e fica pixelado). API
                fica desacoplada do formato — se amanhã precisar exportar para
                Excel ou Markdown, é só adicionar outro módulo em{" "}
                <code>features/export/</code>, sem mexer no back.
              </p>
            </>
          ),
        },
      ],
    };
  }

  return {
    context: (
      <>
        <p>
          Trackrr is a personal expense tracker with monthly budget control per
          category. Users register categories, log expenses and set a monthly
          cap per category. The dashboard shows spent vs. budget in real time,
          always derived from expenses — never stored. Export to PDF
          (via <code>@react-pdf/renderer</code> on the client) and CSV
          (no lib, generated in plain code).
        </p>
        <p>
          The back-end follows a strict layered architecture with Express 5,
          Prisma 7 and PostgreSQL. Monetary values use{" "}
          <code>Decimal(12,2)</code> serialized as string in JSON. The test
          suite runs 79 tests in ~1 second with Prisma mocked, no database
          dependency.
        </p>
        <p>
          The front-end uses Next.js 16 with TanStack Query for server state
          and Zustand exclusively for auth. Dual authentication: JWT in the
          header via Axios interceptor + mirror cookie for the edge middleware.
          Feature-based folder structure, not type-based.
        </p>
      </>
    ),
    decisions: [
      {
        title: "API · Strict layered architecture",
        body: (
          <>
            <p>
              The app follows Routes → Controllers → Services → Repositories,
              each layer with a single responsibility. Controllers never touch
              Prisma, services never manipulate <code>req</code>/
              <code>res</code>, and repositories hold no business rules.
              Dependencies flow in one direction.
            </p>
            <p>
              Repositories can be mocked to test services in isolation; the
              Prisma client can be mocked to test routes end-to-end. Business
              rules stay in services, validations in schemas, and persistence
              changes never leak out.
            </p>
          </>
        ),
      },
      {
        title: "API · Decimal for monetary values",
        body: (
          <>
            <p>
              All monetary fields use <code>Decimal(12,2)</code> in Prisma and
              are serialized as strings in JSON (
              <code>&ldquo;12.50&rdquo;</code> instead of <code>12.5</code>).
              This avoids IEEE 754 precision issues —{" "}
              <code>0.1 + 0.2 === 0.30000000000000004</code> in JS — which
              accumulate in budget operations.
            </p>
            <p>
              Serializing as string preserves precision until the consumer,
              which can choose the right representation for its context (libs
              like <code>decimal.js</code> on the front, BigInt for exact
              math, or float conversion when precision isn&rsquo;t critical).
            </p>
          </>
        ),
      },
      {
        title: "API · Testing strategy with Prisma mocked",
        body: (
          <>
            <p>
              The suite (Vitest + Supertest) runs 79 tests in ~1 second with
              no live database. The Prisma client is mocked via{" "}
              <code>vi.mock</code>, and each test explicitly configures the
              behavior of the consumed methods. Coverage includes routes,
              middlewares, services, mappers — the whole stack above
              persistence.
            </p>
            <p>
              Trade-off: SQL bugs or broken migrations aren&rsquo;t caught
              here. The complementary layer would be repository tests against
              real Postgres (testcontainers) in the CI pipeline.
            </p>
          </>
        ),
      },
      {
        title: "Front · Zustand for auth, TanStack Query for everything else",
        body: (
          <>
            <p>
              UI state and server state are handled by different tools. Server
              state uses TanStack Query — cache, invalidation, refetch and
              in-flight dedup.
            </p>
            <p>
              Zustand is used only where Query doesn&rsquo;t fit: the{" "}
              <code>{`{ token, user }`}</code> auth pair, which must be
              synchronous, persisted in <code>localStorage</code> and readable
              from outside-component code (Axios request interceptor). Server
              state and client state stay in distinct layers.
            </p>
          </>
        ),
      },
      {
        title: "Front · Feature-based architecture, not type-based",
        body: (
          <>
            <p>
              <code>features/expenses/</code> bundles everything for the
              feature: <code>api.ts</code>, <code>hooks.ts</code>,{" "}
              <code>schemas.ts</code>, <code>types.ts</code>,{" "}
              <code>components/</code>. The <code>app/</code> folder stays
              thin — each page is composition of these hooks and components.
            </p>
            <p>
              Rule: features don&rsquo;t import from one another. Anything
              cross-cutting goes to <code>shared/</code>. The blast radius of
              any change stays contained within the feature folder.
            </p>
          </>
        ),
      },
      {
        title: "Front · Client-side PDF generation with lazy import",
        body: (
          <>
            <p>
              The easier path would be adding Puppeteer/Playwright to the
              Express API and rendering PDFs on the back-end —
              pixel-perfect, any CSS works, but the cost would be too high.
            </p>
            <p>
              <code>@react-pdf/renderer</code> on the client: JSX components
              become PDF binary directly in the browser, without rasterizing
              the DOM (which is what <code>html2canvas</code> does, and it
              comes out pixelated). The API stays decoupled from the format
              — if tomorrow export to Excel or Markdown is needed, it&rsquo;s
              just another module in <code>features/export/</code>, without
              touching the back-end.
            </p>
          </>
        ),
      },
    ],
  };
};

export default content;
