import type { ProjectContentFactory } from "@/lib/types";

const content: ProjectContentFactory = (locale) => {
  if (locale === "pt") {
    return {
      context: (
        <>
          <p>
            Reservvo é uma plataforma de agendamento online para
            prestadores de serviço — barbearias, clínicas, estúdios, quadras.
            O sistema cobre cadastro de recursos, disponibilidade por dia da
            semana, link público para clientes agendarem e painel para o
            prestador gerenciar reservas.
          </p>
          <p>
            O back-end (Spring Boot 4 + Java 25 + Hibernate 7 + Postgres 17 +
            Redis 7) implementa paginação com eager loading, cache com
            invalidação coordenada, fila assíncrona (Redis Streams) com retry
            e DLQ, autenticação stateless por JWT, detecção de conflito via
            SQL, e emails transacionais via AWS SES.
          </p>
          <p>
            O front-end (Next.js 16 + React 19) implementa paginação com
            filtro, invalidação de cache por contexto via TanStack Query,
            fluxos com múltiplos papéis (cliente, prestador, ambos), e
            separação explícita entre estado de cliente (Zustand) e estado de
            servidor (TanStack Query).
          </p>
        </>
      ),
      decisions: [
        {
          title: "API · Redis Streams + DLQ no lugar de ApplicationEvent",
          body: (
            <>
              <p>
                Primeira versão usava <code>ApplicationEventPublisher</code> do
                Spring para disparar email após salvar reserva. Eventos vivem
                em memória — se o processo cai entre o <code>save()</code> e o
                envio, a notificação se perde. Sem retry e sem visibilidade.
              </p>
              <p>
                Migração para Redis Streams com consumer group. Producer
                publica no stream após persistir; consumer <code>@Async</code>{" "}
                envia via SES e dá <code>XACK</code>. Em falha, republica com{" "}
                <code>attempt + 1</code> até{" "}
                <code>MAX_RETRY_ATTEMPTS = 2</code>. Estourou, vai para Dead
                Letter Queue (<code>reservvo:notifications:dlq</code>) com
                timestamp e razão da falha.
              </p>
            </>
          ),
        },
        {
          title: "API · Paginação com JOIN FETCH + countQuery explícito",
          body: (
            <>
              <p>
                Listar reservas paginadas carrega{" "}
                <code>Reservation → Resource → Provider → User</code>. Sem
                JOIN FETCH, Hibernate gera N+1 — 1 query para{" "}
                <code>Reservation</code> e N para cada associação.
              </p>
              <p>
                <code>JOIN FETCH</code> em todas as associações +{" "}
                <code>DISTINCT</code> para desduplicar. Isso
                quebra o <code>count</code> automático do Spring Data em
                queries paginadas (count com fetch join falha). Solução:{" "}
                <code>countQuery</code> separado no <code>@Query</code>,
                ignorando os joins e contando só pelos filtros. Resultado: 2
                queries totais (data + count) com zero N+1.
              </p>
            </>
          ),
        },
        {
          title: "API · Cache de slots disponíveis com eviction coordenada",
          body: (
            <>
              <p>
                <code>GET /api/reservations/slots</code> é o endpoint mais
                chamado — cliente vê horários antes de reservar. A consulta
                busca <code>AvailabilityRule</code>, itera slots e chama{" "}
                <code>existsConflict</code> para cada um. Cache com{" "}
                <code>@Cacheable</code> no Redis, TTL 10 min.
              </p>
              <p>
                Na criação, <code>@CacheEvict</code> resolve direto (key vem
                do request). Em cancelamentos, a entidade já está carregada do
                banco e a annotation não resolve a key — eviction manual via{" "}
                <code>CacheManager.getCache(&quot;slots&quot;).evict(key)</code>
                . Em testes, cache é desabilitado via{" "}
                <code>spring.cache.type=none</code> e{" "}
                <code>@Profile(&quot;!test&quot;)</code> no{" "}
                <code>RedisConfig</code>.
              </p>
            </>
          ),
        },
        {
          title: "API · Scheduler que finaliza reservas expiradas",
          body: (
            <>
              <p>
                Uma reserva precisa virar <code>COMPLETED</code> quando seu
                horário termina — mas nenhum request acontece nesse instante.
                Depender do front pra disparar a transição é frágil (o usuário
                pode nunca voltar), e calcular no momento da leitura deixa o
                estado real inconsistente no banco.
              </p>
              <p>
                Job agendado com{" "}
                <code>@Scheduled(cron = &quot;0 0 */4 * * *&quot;)</code> roda a
                cada 4h e faz um <code>UPDATE</code> em lote (
                <code>markExpiredAsCompleted</code>) dentro de{" "}
                <code>@Transactional</code>, finalizando todas as reservas
                vencidas de uma vez — sem N+1 e sem cron externo, usando o{" "}
                <code>@EnableScheduling</code> do próprio Spring, com log da
                quantidade afetada.
              </p>
            </>
          ),
        },
        {
          title: "Front · Zustand pra estado de cliente, TanStack Query pra servidor",
          body: (
            <>
              <p>
                Zustand cuida de estado de cliente que precisa persistir entre
                páginas (token JWT, role, tema, sidebar). TanStack Query cuida
                de tudo que vem da API — cache, refetch automático, dedup de
                requests em flight,{" "}
                <code>placeholderData: keepPreviousData</code> para paginação
                suave.
              </p>
              <p>
                Componentes consomem hooks (
                <code>useProviderReservations</code>,{" "}
                <code>useReservationStats</code>), e a mutation correspondente
                invalida as queries relacionadas.
              </p>
            </>
          ),
        },
        {
          title: "Front · Invalidação de cache narrow por contexto",
          body: (
            <>
              <p>
                Primeira versão tinha{" "}
                <code>queryClient.invalidateQueries([&quot;slots&quot;])</code>{" "}
                em todas as mutations de reserva — qualquer criação ou
                cancelamento derrubava todos os slots cacheados, de qualquer
                recurso, em qualquer data.
              </p>
              <p>
                A correção foi passar contexto pela mutation. Ao cancelar, a
                mutation recebe <code>{`{ id, resourceId, date }`}</code> e
                invalida exatamente{" "}
                <code>[&quot;slots&quot;, resourceId, date]</code> além do
                prefixo <code>[&quot;reservations&quot;]</code>. Slots de
                outros recursos ficam intactos. Query keys hierárquicas desde
                o início:{" "}
                <code>[&quot;reservations&quot;, &quot;provider&quot;, page, size, status]</code>
                , <code>[&quot;slots&quot;, resourceId, date]</code>.
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
          Reservvo is an online booking platform for small service providers
          — barbershops, clinics, studios, sports courts. The system covers
          resource registration, availability per weekday, public booking
          link for clients and a provider dashboard.
        </p>
        <p>
          The back-end (Spring Boot 4 + Java 25 + Hibernate 7 + Postgres 17 +
          Redis 7) implements pagination with eager loading, cache with
          coordinated invalidation, async queue (Redis Streams) with retry
          and DLQ, stateless JWT auth, SQL conflict detection, and
          transactional email via AWS SES.
        </p>
        <p>
          The front-end (Next.js 16 + React 19) implements paginated
          filtering, context-based cache invalidation via TanStack Query,
          multi-role flows (client, provider, both), and explicit separation
          between client state (Zustand) and server state (TanStack Query).
        </p>
      </>
    ),
    decisions: [
      {
        title: "API · Redis Streams + DLQ instead of ApplicationEvent",
        body: (
          <>
            <p>
              First version used Spring&rsquo;s{" "}
              <code>ApplicationEventPublisher</code> to fire email after
              saving the booking. Events live in memory — if the process
              crashes between <code>save()</code> and send, the notification
              is lost. No retry, no visibility.
            </p>
            <p>
              Migrated to Redis Streams with a consumer group. Producer
              publishes to the stream after persisting; <code>@Async</code>{" "}
              consumer sends via SES and <code>XACK</code>s. On failure,
              republishes with <code>attempt + 1</code> until{" "}
              <code>MAX_RETRY_ATTEMPTS = 2</code>. Past that, goes to the
              Dead Letter Queue (<code>reservvo:notifications:dlq</code>)
              with timestamp and failure reason.
            </p>
          </>
        ),
      },
      {
        title: "API · Pagination with JOIN FETCH + explicit countQuery",
        body: (
          <>
            <p>
              Paginating reservations loads{" "}
              <code>Reservation → Resource → Provider → User</code>. Without
              JOIN FETCH, Hibernate generates N+1 — 1 query for{" "}
              <code>Reservation</code> and N for each association.
            </p>
            <p>
              <code>JOIN FETCH</code> on every association +{" "}
              <code>DISTINCT</code> to dedupe the cartesian. This breaks
              Spring Data&rsquo;s automatic <code>count</code> on paginated
              queries (count with fetch join fails). Fix: separate{" "}
              <code>countQuery</code> in <code>@Query</code>, ignoring joins
              and counting only by filters. Result: 2 total queries (data +
              count) with zero N+1.
            </p>
          </>
        ),
      },
      {
        title: "API · Slots cache with coordinated eviction",
        body: (
          <>
            <p>
              <code>GET /api/reservations/slots</code> is the most-called
              endpoint — clients see available times before booking. The
              computation fetches <code>AvailabilityRule</code>, iterates
              slots and calls <code>existsConflict</code> for each. Cached
              with <code>@Cacheable</code> on Redis, 10-minute TTL.
            </p>
            <p>
              On creation, <code>@CacheEvict</code> works directly (key comes
              from the request). On cancellations, the entity is already
              loaded from the DB and the annotation can&rsquo;t resolve the
              key — manual eviction via{" "}
              <code>CacheManager.getCache(&quot;slots&quot;).evict(key)</code>
              . In tests, cache is disabled via{" "}
              <code>spring.cache.type=none</code> and{" "}
              <code>@Profile(&quot;!test&quot;)</code> on{" "}
              <code>RedisConfig</code>.
            </p>
          </>
        ),
      },
      {
        title: "API · Scheduler that completes expired reservations",
        body: (
          <>
            <p>
              A reservation must become <code>COMPLETED</code> once its time
              slot ends — but no request happens at that exact moment. Relying
              on the front to trigger the transition is fragile (the user may
              never come back), and computing it at read time leaves the actual
              state inconsistent in the database.
            </p>
            <p>
              A scheduled job with{" "}
              <code>@Scheduled(cron = &quot;0 0 */4 * * *&quot;)</code> runs
              every 4h and performs a bulk <code>UPDATE</code> (
              <code>markExpiredAsCompleted</code>) inside{" "}
              <code>@Transactional</code>, completing all overdue reservations
              at once — no N+1 and no external cron, using Spring&apos;s own{" "}
              <code>@EnableScheduling</code>, logging the affected count.
            </p>
          </>
        ),
      },
      {
        title: "Front · Zustand for client state, TanStack Query for server state",
        body: (
          <>
            <p>
              Zustand handles client state that persists across pages (JWT
              token, role, theme, sidebar). TanStack Query handles everything
              from the API — cache, automatic refetch, in-flight dedup,{" "}
              <code>placeholderData: keepPreviousData</code> for smooth
              pagination.
            </p>
            <p>
              Components consume hooks (
              <code>useProviderReservations</code>,{" "}
              <code>useReservationStats</code>), and the matching mutation
              invalidates related queries.
            </p>
          </>
        ),
      },
      {
        title: "Front · Narrow cache invalidation by context",
        body: (
          <>
            <p>
              The first version had{" "}
              <code>queryClient.invalidateQueries([&quot;slots&quot;])</code>{" "}
              on every booking mutation — any create or cancel knocked out
              every cached slot, of every resource, on every date.
            </p>
            <p>
              The fix was passing context through the mutation. On cancel, the
              mutation receives <code>{`{ id, resourceId, date }`}</code> and
              invalidates exactly <code>[&quot;slots&quot;, resourceId, date]</code>{" "}
              plus the <code>[&quot;reservations&quot;]</code> prefix. Slots of
              other resources stay intact. Query keys hierarchical from the
              start:{" "}
              <code>[&quot;reservations&quot;, &quot;provider&quot;, page, size, status]</code>
              , <code>[&quot;slots&quot;, resourceId, date]</code>.
            </p>
          </>
        ),
      },
    ],
  };
};

export default content;
