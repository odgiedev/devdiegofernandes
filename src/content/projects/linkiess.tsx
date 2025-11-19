import type { ProjectContentFactory } from "@/lib/types";

const content: ProjectContentFactory = (locale) => {
  if (locale === "pt") {
    return {
      context: (
        <>
          <p>
            Linkiess é uma plataforma link-in-bio onde o usuário concentra todos
            os seus links em uma página pública personalizada. Após criar conta,
            cada usuário tem um perfil em <code>/{`{username}`}</code> e uma
            área privada de edição. O perfil é customizável: imagem de fundo,
            foto de perfil, descrição, cor do texto e cor das barras. Imagens
            são armazenadas na AWS S3.
          </p>
          <p>
            O back-end (NestJS 9 + Prisma 4.5 + PostgreSQL) implementa
            autenticação via Passport.js (Local + JWT), upload de imagem em
            dois estágios (disco → S3), proteção global com opt-out por
            decorator, e verificação de ownership por token.
          </p>
          <p>
            O front-end (React 18 + Redux Toolkit + Tailwind) gerencia auth e
            mensagens globais via Redux, verifica ownership do perfil
            decodificando o JWT no cliente, e usa um boolean trigger no estado
            local como mecanismo de re-fetch pós-mutação.
          </p>
        </>
      ),
      decisions: [
        {
          title: "Front · Redux Toolkit para auth + feedback global",
          body: (
            <>
              <p>
                Estado de autenticação (<code>isLogged</code>,{" "}
                <code>username</code>) vive no Redux persistido no{" "}
                <code>localStorage</code>. O mesmo store gerencia mensagens de
                sucesso/erro via <code>messageSlice</code> — sem lib de toast
                externa.
              </p>
            </>
          ),
        },
        {
          title: "Front · JWT decodificado no cliente antes de cada operação sensível",
          body: (
            <>
              <p>
                Antes de renderizar a tela de customização, o token é
                decodificado com <code>jwt-decode</code> e o username do payload
                é comparado com o da URL e com o do <code>localStorage</code>.
                Qualquer divergência loga o usuário e redireciona.
              </p>
            </>
          ),
        },
        {
          title: "Front · Boolean trigger como mecanismo de re-fetch pós-mutação",
          body: (
            <>
              <p>
                Ações de escrita (upload de imagem, editar link, mudar cor)
                invertem um booleano <code>trigger</code> no estado local. O{" "}
                <code>useEffect</code> da página depende desse valor — quando
                flipa, rebusca os dados do perfil.
              </p>
            </>
          ),
        },
        {
          title: "API · Upload em dois estágios: disco → S3",
          body: (
            <>
              <p>
                Multer salva o arquivo em <code>./uploads</code> (disco local).
                Após a escrita, <code>S3Storage.saveFile()</code> lê o buffer,
                faz <code>putObject</code> na bucket com <code>ACL public-read</code>{" "}
                e apaga o temp com <code>fs/promises unlink</code>. Multer exige
                destino síncrono no parse do multipart — o estágio local funciona
                como área de staging antes de persistir no object store.
              </p>
            </>
          ),
        },
        {
          title: "API · Guard global + @IsPublic() opt-out",
          body: (
            <>
              <p>
                <code>JwtAuthGuard</code> é aplicado globalmente no módulo raiz
                — todas as rotas são protegidas por padrão. Rotas públicas
                (criação de conta, leitura de perfil) recebem o decorator{" "}
                <code>@IsPublic()</code>, que seta metadata{" "}
                <code>isPublic: true</code>. O guard lê essa metadata antes de
                validar o token; se presente, deixa passar.
              </p>
            </>
          ),
        },
        {
          title: "API · Verificação de ownership via jwt_decode no service",
          body: (
            <>
              <p>
                Rotas de edição recebem o header <code>Authorization</code> e
                passam para <code>authorizationMiddleware()</code> no service,
                que usa <code>jwt_decode</code> para extrair o username do
                payload e compara com o <code>id_user</code> do recurso. Se
                divergir, lança 401. Guard valida assinatura + expiração via
                Passport; middleware valida se o dono do token é o dono do
                recurso.
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
          Linkiess is a link-in-bio platform where users concentrate all their
          links on a personalized public page. After signing up, each user has a
          profile at <code>/{`{username}`}</code> and a private editing area.
          The profile is customizable: background image, profile photo,
          description, text color and bar colors. Images are stored on AWS S3.
        </p>
        <p>
          The back-end (NestJS 9 + Prisma 4.5 + PostgreSQL) implements
          Passport.js auth (Local + JWT), two-stage image upload (disk → S3),
          global route protection with per-decorator opt-out, and token-based
          ownership verification.
        </p>
        <p>
          The front-end (React 18 + Redux Toolkit + Tailwind) manages auth and
          global messages via Redux, verifies profile ownership by decoding the
          JWT on the client, and uses a boolean trigger in local state as a
          re-fetch mechanism after mutations.
        </p>
      </>
    ),
    decisions: [
      {
        title: "Front · Redux Toolkit for auth + global feedback",
        body: (
          <>
            <p>
              Auth state (<code>isLogged</code>, <code>username</code>) lives
              in Redux persisted to <code>localStorage</code>. The same store
              manages success/error messages via <code>messageSlice</code> —
              no external toast library.
            </p>
          </>
        ),
      },
      {
        title: "Front · JWT decoded on the client before sensitive operations",
        body: (
          <>
            <p>
              Before rendering the customization screen, the token is decoded
              with <code>jwt-decode</code> and the payload&rsquo;s username is
              compared against the URL and <code>localStorage</code>. Any
              divergence logs out and redirects the user.
            </p>
          </>
        ),
      },
      {
        title: "Front · Boolean trigger as post-mutation re-fetch mechanism",
        body: (
          <>
            <p>
              Write actions (image upload, edit link, change color) toggle a
              boolean <code>trigger</code> in local state. The page&rsquo;s{" "}
              <code>useEffect</code> depends on this value — when it flips, it
              re-fetches the profile data.
            </p>
          </>
        ),
      },
      {
        title: "API · Two-stage upload: disk → S3",
        body: (
          <>
            <p>
              Multer saves the file to <code>./uploads</code> (local disk).
              After writing, <code>S3Storage.saveFile()</code> reads the
              buffer, puts the object in the bucket with{" "}
              <code>ACL public-read</code> and deletes the temp file via{" "}
              <code>fs/promises unlink</code>. Multer requires a synchronous
              destination at multipart parse time — the local stage acts as a
              staging area before persisting to object store.
            </p>
          </>
        ),
      },
      {
        title: "API · Global guard + @IsPublic() opt-out",
        body: (
          <>
            <p>
              <code>JwtAuthGuard</code> is applied globally in the root module
              — all routes are protected by default. Public routes (account
              creation, profile read) receive the <code>@IsPublic()</code>{" "}
              decorator, which sets <code>isPublic: true</code> metadata. The
              guard reads this metadata before validating the token; if
              present, it passes.
            </p>
          </>
        ),
      },
      {
        title: "API · Ownership verification via jwt_decode in the service",
        body: (
          <>
            <p>
              Edit routes receive the <code>Authorization</code> header and
              pass it to <code>authorizationMiddleware()</code> in the service,
              which uses <code>jwt_decode</code> to extract the payload
              username and compares it with the resource&rsquo;s{" "}
              <code>id_user</code>. On divergence, throws 401. The guard
              validates signature + expiration via Passport; the middleware
              validates that the token owner is the resource owner.
            </p>
          </>
        ),
      },
    ],
  };
};

export default content;
