import type { ProjectContentFactory } from "@/lib/types";

const content: ProjectContentFactory = (locale) => {
  if (locale === "pt") {
    return {
      context: (
        <>
          <p>
            Crypto Profit é uma ferramenta CLI para análise de oportunidade de
            compra em criptomoedas. O usuário acumula histórico de preços via
            comando e verifica se o preço atual está abaixo da média histórica.
          </p>
          <p>
            Dois comandos Artisan:{" "}
            <code>c:saveBidPriceOnDataBase</code> salva o preço atual da cripto
            no banco; <code>c:checkAvgBigPrice</code> busca o preço ao vivo,
            calcula a média das últimas 100 entradas salvas e exibe a
            comparação. Sem frontend, sem HTTP layer — CLI, projetado para
            rodar via cron.
          </p>
        </>
      ),
      decisions: [
        {
          title: "CLI como interface, sem controller",
          body: (
            <>
              <p>
                O app não expõe rota HTTP. A interface são comandos Artisan
                disparados via terminal ou cron job.
              </p>
            </>
          ),
        },
        {
          title: "Média calculada sobre histórico local, não em tempo real",
          body: (
            <>
              <p>
                <code>AvgBigPrice</code> busca as últimas 100 entradas salvas
                do par e calcula <code>avg()</code> na query. O dado ao vivo
                vem da Binance; o baseline de comparação vem do histórico
                acumulado localmente.
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
          Crypto Profit is a CLI tool for cryptocurrency buy opportunity
          analysis. Users accumulate price history via command and check
          whether the current price is below the historical average.
        </p>
        <p>
          Two Artisan commands:{" "}
          <code>c:saveBidPriceOnDataBase</code> saves the current crypto price
          to the database; <code>c:checkAvgBigPrice</code> fetches the live
          price, calculates the average of the last 100 saved entries and
          displays the comparison. No frontend, no HTTP layer — CLI only,
          designed to run via cron.
        </p>
      </>
    ),
    decisions: [
      {
        title: "CLI as interface, no controller",
        body: (
          <>
            <p>
              The app exposes no HTTP routes. The interface is Artisan commands
              triggered from terminal or cron job.
            </p>
          </>
        ),
      },
      {
        title: "Average calculated over local history, not in real time",
        body: (
          <>
            <p>
              <code>AvgBigPrice</code> fetches the last 100 saved entries for
              the pair and calculates <code>avg()</code> in the query. Live
              data comes from Binance; the comparison baseline comes from
              locally accumulated history.
            </p>
          </>
        ),
      },
    ],
  };
};

export default content;
