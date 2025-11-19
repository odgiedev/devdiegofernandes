import type { ProjectContentFactory } from "@/lib/types";

const content: ProjectContentFactory = (locale) => {
  if (locale === "pt") {
    return {
      context: (
        <>
          <p>
            Byro é um e-commerce de eBooks em operação em{" "}
            <a
              href="https://e-byro.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              e-byro.com
            </a>
            . A plataforma cobre cadastro, autenticação por token, catálogo,
            carrinho, checkout via Mercado Pago e entrega do PDF por URL
            assinada.
          </p>
          <p>
            O back-end trata cenários comuns em integrações com gateways de
            pagamento: recebimento de webhooks fora de ordem, coexistência
            entre IPN legado e Webhooks v2, validação de assinatura HMAC
            sujeita ao parser nativo do PHP, e liberação idempotente do produto
            frente a múltiplas notificações para o mesmo pagamento.
          </p>
          <p>
            O front-end implementa integração com gateway (webhook, retorno e
            os três estados do Mercado Pago), estado persistente no cliente, e
            empacotamento Docker com fallback de SPA configurado no Nginx.
          </p>
        </>
      ),
      decisions: [
        {
          title: "API · Validação HMAC com defesa em profundidade",
          body: (
            <>
              <p>
                Mercado Pago assina webhooks via HMAC-SHA256 sobre um manifest
                do tipo{" "}
                <code>id:{`{paymentId}`};request-id:{`{xRequestId}`};ts:{`{ts}`};</code>
                . O <code>id</code> precisa vir da query string crua — o{" "}
                <code>parse_str()</code> do PHP converte <code>data.id</code>{" "}
                em <code>data_id</code> automaticamente. Parse manual do{" "}
                <code>QUERY_STRING</code> preserva o nome do parâmetro.
              </p>
              <p>
                O MP varia o formato do manifest entre topics e versões. A
                validação testa 6 variações contra a assinatura recebida usando{" "}
                <code>hash_equals</code> (comparação timing-safe). Se nenhuma
                bater, um <code>loose_mode</code> controlado por config loga e
                prossegue chamando a API do MP para confirmar via{" "}
                <code>access_token</code>. Em produção, fica desligado.
              </p>
            </>
          ),
        },
        {
          title: "API · Signed URLs em vez de download autenticado direto",
          body: (
            <>
              <p>
                Streamar o PDF direto da rota autenticada acopla o download ao
                token Sanctum e quebra se o usuário muda de aba, abre em outro
                device ou usa download manager. A solução é URL assinada de 30
                minutos via <code>URL::signedRoute</code>, embutindo{" "}
                <code>ebookId</code> e <code>userEmail</code>, validada pelo
                middleware <code>signed</code> do Laravel.
              </p>
              <p>
                Resultado: zero estado para gerenciar, expiração nativa, e nome
                de arquivo personalizado (
                <code>engenheiro_de_prompt_user.pdf</code>) gerado a partir do
                email embutido na URL.{" "}
                <code>trustProxies(at: &lsquo;*&rsquo;)</code> no{" "}
                <code>bootstrap/app.php</code> garante que, atrás de proxy ou
                load balancer, Laravel leia <code>X-Forwarded-*</code> e gere
                URL com host correto.
              </p>
            </>
          ),
        },
        {
          title: "API · Scramble no lugar de l5-swagger",
          body: (
            <>
              <p>
                <code>darkaonline/l5-swagger</code> exige anotações{" "}
                <code>#[OA\Post(...)]</code>,{" "}
                <code>#[OA\Property(...)]</code> em cada endpoint. A informação
                já vive no <code>routes/api.php</code>, no FormRequest e no
                return type — duplicar em atributos gerou ~250 linhas de
                boilerplate nos controllers.
              </p>
              <p>
                <code>dedoc/scramble</code> lê routes, FormRequests e return
                types automaticamente e gera OpenAPI 3.1 sem anotação. PHPDoc
                curto por endpoint cobre summary e <code>@response</code> para
                status codes não-óbvios (404/409). Documentação sincronizada
                com código, mesma UI Swagger em <code>/docs/api</code>.
              </p>
            </>
          ),
        },
        {
          title: "Front · Zustand + persist para o carrinho",
          body: (
            <>
              <p>
                Para um catálogo dinâmico, o
                carrinho precisou de estado global. Zustand resolve com store
                pequena (~25 linhas), seleção granular por hook (
                <code>useCartStore(s =&gt; s.items.length)</code> só
                re-renderiza quando contagem muda), e middleware{" "}
                <code>persist</code> para sincronização com{" "}
                <code>localStorage</code>.
              </p>
              <p>
                Carrinho sobrevive a reload e logout — comportamento esperado
                para visitante não autenticado que encheu carrinho antes de
                criar conta.
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
          Byro is a technical eBook store running in production at{" "}
          <a
            href="https://e-byro.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            e-byro.com
          </a>
          . The platform covers signup, token auth, catalog, cart, Mercado Pago
          checkout and PDF delivery via signed URL.
        </p>
        <p>
          The back-end handles common scenarios in payment gateway
          integrations: out-of-order webhooks, coexistence of legacy IPN and
          Webhooks v2, HMAC signature validation affected by PHP&rsquo;s native
          parser, and idempotent product release against multiple notifications
          for the same payment.
        </p>
        <p>
          The front-end implements gateway integration (webhook, return and
          Mercado Pago&rsquo;s three payment states), persistent client-side
          state, and Docker packaging with SPA fallback configured in Nginx.
          The stack is Vite, React and Tailwind, without TypeScript or
          form/fetching libraries.
        </p>
      </>
    ),
    decisions: [
      {
        title: "API · HMAC validation with defense in depth",
        body: (
          <>
            <p>
              Mercado Pago signs webhooks via HMAC-SHA256 over a manifest like{" "}
              <code>id:{`{paymentId}`};request-id:{`{xRequestId}`};ts:{`{ts}`};</code>
              . The <code>id</code> must come from the raw query string —
              PHP&rsquo;s <code>parse_str()</code> converts{" "}
              <code>data.id</code> to <code>data_id</code> automatically.
              Manual <code>QUERY_STRING</code> parsing preserves the parameter
              name.
            </p>
            <p>
              MP varies the manifest format across topics and versions.
              Validation tests 6 variations against the received signature
              using <code>hash_equals</code> (timing-safe comparison). If none
              match, a config-driven <code>loose_mode</code> logs and proceeds
              by calling the MP API to confirm via <code>access_token</code>.
              Off in production.
            </p>
          </>
        ),
      },
      {
        title: "API · Signed URLs instead of direct authenticated download",
        body: (
          <>
            <p>
              Streaming the PDF directly from the authenticated route couples
              the download to the Sanctum token and breaks if the user changes
              tabs, opens on another device, or uses a download manager. The
              solution is a 30-minute signed URL via{" "}
              <code>URL::signedRoute</code> embedding <code>ebookId</code> and{" "}
              <code>userEmail</code>, validated by Laravel&rsquo;s native{" "}
              <code>signed</code> middleware.
            </p>
            <p>
              Result: zero state to manage, native expiration, and personalized
              filename (<code>engenheiro_de_prompt_user.pdf</code>) generated
              from the email in the URL.{" "}
              <code>trustProxies(at: &lsquo;*&rsquo;)</code> in{" "}
              <code>bootstrap/app.php</code> ensures Laravel reads{" "}
              <code>X-Forwarded-*</code> behind a proxy or load balancer and
              generates URLs with the correct host.
            </p>
          </>
        ),
      },
      {
        title: "API · Scramble instead of l5-swagger",
        body: (
          <>
            <p>
              <code>darkaonline/l5-swagger</code> requires{" "}
              <code>#[OA\Post(...)]</code>,{" "}
              <code>#[OA\Property(...)]</code> attributes on every endpoint.
              The info already lives in <code>routes/api.php</code>, the
              FormRequest and the return type — duplicating in attributes added
              ~250 lines of boilerplate to controllers.
            </p>
            <p>
              <code>dedoc/scramble</code> reads routes, FormRequests and return
              types automatically and generates OpenAPI 3.1 with zero
              annotations. Short PHPDoc per endpoint covers summary and{" "}
              <code>@response</code> for non-obvious status codes (404/409).
              Docs always in sync with code, same Swagger UI at{" "}
              <code>/docs/api</code>.
            </p>
          </>
        ),
      },
      {
        title: "Front · Zustand + persist for the cart",
        body: (
          <>
            <p>
              With the migration from single product to dynamic catalog, the
              cart needed global state. Zustand solves it with a small store
              (~25 lines), granular selection per hook (
              <code>useCartStore(s =&gt; s.items.length)</code> only re-renders
              when count changes), and the <code>persist</code> middleware for{" "}
              <code>localStorage</code> sync.
            </p>
            <p>
              The cart survives reload and logout — expected behavior for an
              unauthenticated visitor who filled the cart before signing up.
            </p>
          </>
        ),
      },
      {
        title: "Front · Payment endpoint scalable via array of IDs",
        body: (
          <>
            <p>
              The original endpoint was{" "}
              <code>GET /payment/create/preference</code> for a single ebook.
              With the cart, it migrated to <code>POST</code> accepting{" "}
              <code>{`{ ebook_ids: [1, 3, 7] }`}</code>. The back-end builds
              the Mercado Pago <code>items[]</code> array dynamically, and the
              approval webhook iterates the IDs to associate every purchased
              ebook to the user in one transaction.
            </p>
            <p>
              The product page also sends the array (with a single ID) — same
              endpoint, same serialization, same webhook for direct purchase
              and cart.
            </p>
          </>
        ),
      },
      {
        title: "Front · Multi-stage Docker + Nginx serving the SPA",
        body: (
          <>
            <p>
              Multi-stage Dockerfile: <code>node:20-alpine</code> compiles the
              bundle, <code>nginx:alpine</code> serves <code>dist/</code>.
              Final image ~50 MB.
            </p>
            <p>
              The <code>nginx.conf</code> configures{" "}
              <code>try_files $uri $uri/ /index.html</code> for deep-linking
              (without it, <code>/profile</code> returns 404 on refresh),{" "}
              <code>Cache-Control immutable</code> on Vite-versioned assets,
              and <code>no-cache</code> on <code>index.html</code> so deploys
              reflect on the next request without manual invalidation.
            </p>
          </>
        ),
      },
    ],
  };
};

export default content;
