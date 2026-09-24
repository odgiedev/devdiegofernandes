import type { ProjectContentFactory } from "@/lib/types";

const content: ProjectContentFactory = (locale) => {
  if (locale === "pt") {
    return {
      context: (
        <>
          <p>
            Baldu Raridades é um e-commerce de bonés e streetwear. A loja cobre
            catálogo, carrinho, cálculo de frete via Melhor Envio e checkout com
            PIX e cartão pelo Asaas, com página de acompanhamento do pedido.
          </p>
          <p>
            Sanity CMS atua como banco de dados e
            painel administrativo ao mesmo tempo. Produtos, pedidos e estoque
            vivem no Sanity; Route Handlers no servidor do Next encapsulam o que
            exige segredo — criação da cobrança no Asaas, cotação de frete,
            gravação do pedido e baixa de estoque.
          </p>
          <p>
            Dois webhooks fecham o ciclo: o do Sanity revalida o catálogo sob
            demanda a cada edição de produto, e o do Asaas reage aos eventos de
            pagamento (confirmação, vencimento, reembolso) confirmando ou
            cancelando o pedido e dando baixa no estoque de forma idempotente.
            Segredos ficam exclusivamente em Route Handlers — nunca no client.
          </p>
        </>
      ),
      decisions: [
        {
          title: "CMS · Sanity no lugar de back-end + banco de dados",
          body: (
            <>
              <p>
                Um e-commerce tradicional empilha API, banco (Postgres), admin
                autenticado, storage de imagens e CDN. Para uma loja de catálogo,
                isso é desenvolvimento e manutenção sem retorno.
              </p>
              <p>
                O Sanity entrega tudo de uma vez: schemas versionados em código,
                leitura via GROQ, e o Studio como painel para cadastro de
                produtos com fotos. O servidor que grava o pedido e baixa o estoque
                quando o webhook do Asaas confirma o pagamento.
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
          Baldu Raridades is a cap and streetwear e-commerce. The store covers
          catalog, cart, shipping rates via Melhor Envio and checkout with PIX
          and card through Asaas, plus an order tracking page.
        </p>
        <p>
          Sanity CMS acts as both database and
          admin panel. Products, orders and stock live in Sanity; Next.js Route
          Handlers wrap everything that requires secrets — Asaas charge
          creation, freight quotes, order persistence and stock decrement.
        </p>
        <p>
          Two webhooks close the loop: the Sanity one revalidates the catalog
          on demand after every product edit, and the Asaas one reacts to
          payment events (confirmation, overdue, refund) by confirming or
          cancelling the order and decrementing stock idempotently. Secrets
          live exclusively in Route Handlers — never on the client.
        </p>
      </>
    ),
    decisions: [
      {
        title: "CMS · Sanity instead of back-end + database",
        body: (
          <>
            <p>
              A traditional e-commerce stacks an API, a database (Postgres), an
              authenticated admin, image storage and a CDN. For a catalog store, that is development
              and maintenance cost with no return.
            </p>
            <p>
              Sanity delivers all of it at once: schemas versioned in code, GROQ reads, and the
              Studio as the panel where the client uploads products with photos
              . The server persists the order and decrements stock
              when the Asaas webhook confirms the payment. What the CMS
              shouldn&rsquo;t touch (checkout, webhooks, secrets) remains
              back-end, just inside Next instead of a separate project.
            </p>
          </>
        ),
      },
    ],
  };
};

export default content;
