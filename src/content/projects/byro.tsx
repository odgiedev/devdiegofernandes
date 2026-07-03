import type { ProjectContentFactory } from "@/lib/types";

const content: ProjectContentFactory = (locale) => {
  if (locale === "pt") {
    return {
      context: (
        <>
          <p>
            Byro é um e-commerce de eBooks.
            A plataforma cobre cadastro, autenticação por token, catálogo,
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
            os três estados do Mercado Pago).
          </p>
        </>
      ),
      decisions: [
        {
          title: "API · Validação HMAC com defesa em profundidade",
          body: (
            <>
              <p>
                O Mercado Pago assina cada webhook com HMAC-SHA256 sobre um
                manifest no formato{" "}
                <code>id:{`{paymentId}`};request-id:{`{xRequestId}`};ts:{`{ts}`};</code>
                . O <code>id</code> precisa vir da query string crua: o{" "}
                <code>parse_str()</code> do PHP renomeia <code>data.id</code> para{" "}
                <code>data_id</code> automaticamente, o que quebra a assinatura.
                Parse manual do <code>QUERY_STRING</code> preserva o nome do
                parâmetro.
              </p>
              <p>
                O formato do manifest varia entre topics e versões da API. A
                validação compara as variações possíveis com a assinatura
                recebida usando <code>hash_equals</code> (comparação timing-safe).
                Se nenhuma bate, um modo controlado por config registra o caso e
                confirma o pagamento direto na API do Mercado Pago via{" "}
                <code>access_token</code> — defesa em profundidade: o produto não
                é liberado sem confirmação, e uma variação de formato não prevista
                não derruba a venda.
              </p>
            </>
          ),
        },
        {
          title: "API · Signed URLs em vez de download autenticado direto",
          body: (
            <>
              <p>
                Servir o PDF direto de uma rota autenticada acopla o download ao
                token do Sanctum e quebra quando o usuário troca de aba, abre em
                outro dispositivo ou usa um gerenciador de download. A solução é
                uma URL assinada de 30 minutos (<code>URL::signedRoute</code>),
                que embute o <code>ebookId</code> e o e-mail do usuário e é
                validada pelo middleware <code>signed</code> do Laravel.
              </p>
              <p>
                Resultado: nenhum estado para gerenciar, expiração nativa e nome
                de arquivo personalizado gerado a partir do e-mail embutido na
                URL.
              </p>
            </>
          ),
        },
        {
          title: "API · Scramble no lugar de l5-swagger",
          body: (
            <>
              <p>
                Documentar a API em OpenAPI com{" "}
                <code>darkaonline/l5-swagger</code> exige anotações{" "}
                <code>#[OA\Post(...)]</code> e <code>#[OA\Property(...)]</code> em
                cada endpoint. Essa informação já vive no{" "}
                <code>routes/api.php</code>, no FormRequest e no return type —
                repetir tudo em atributos duplicaria a mesma definição em vários
                lugares e deixaria a documentação fácil de desatualizar.
              </p>
              <p>
                <code>dedoc/scramble</code> lê rotas, FormRequests e return types
                automaticamente e gera o OpenAPI 3.1 sem anotação. PHPDoc curto
                por endpoint cobre o resumo e os status menos óbvios (404/409). A
                documentação fica sempre sincronizada com o código, na mesma UI
                Swagger em <code>/docs/api</code>.
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
          Byro is a technical eBook store.
          The platform covers signup, token auth, catalog, cart, Mercado Pago
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
          Mercado Pago&rsquo;s three payment states).
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
              Result: zero state to manage, native expiration, and a
              personalized filename generated from the email embedded in the URL.
            </p>
          </>
        ),
      },
      {
        title: "API · Scramble instead of l5-swagger",
        body: (
          <>
            <p>
              Documenting the API in OpenAPI with{" "}
              <code>darkaonline/l5-swagger</code> requires{" "}
              <code>#[OA\Post(...)]</code> and{" "}
              <code>#[OA\Property(...)]</code> attributes on every endpoint. That
              information already lives in <code>routes/api.php</code>, the
              FormRequest and the return type — repeating it all in attributes
              would duplicate the same definition in several places and make the
              docs easy to fall out of sync.
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
    ],
  };
};

export default content;
