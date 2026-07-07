import type { ProjectContentFactory } from "@/lib/types";

const content: ProjectContentFactory = (locale) => {
  if (locale === "pt") {
    return {
      context: (
        <>
          <p>
            Neosrate é uma plataforma social estilo Reddit. Usuários criam
            comunidades (c/nome), publicam posts com texto, imagem ou vídeo,
            curtem, comentam e acompanham feed personalizado com as comunidades
            que seguem. Dashboard para editar perfil, foto, posts e comunidades.
            Interface dark com acento violeta/slate.
          </p>
          <p>
            O back-end (Spring Boot 3 + Java 21 + MySQL 8) implementa
            autenticação JWT stateless, upload de mídia para S3 com validação
            de tipo de arquivo, e deleção transacional explícita de usuários e
            comunidades.
          </p>
          <p>
            O front-end (React 18 + TypeScript + Vite) consome a API via Axios,
            gerencia auth em localStorage com verificação de expiração via{" "}
            <code>jwt-decode</code>, e implementa paginação server-side para
            posts e client-side para comentários.
          </p>
        </>
      ),
      decisions: [
        {
          title: "API · JWT stateless via OncePerRequestFilter",
          body: (
            <>
              <p>
                Cada request passa pelo <code>SecurityFilter</code> que extrai
                o token do header <code>Authorization</code>, valida assinatura
                HMAC256 via Auth0 SDK e injeta o <code>UserDetails</code> no{" "}
                <code>SecurityContext</code>. CSRF desabilitado — sem cookie de
                sessão. Token carrega <code>userId</code>, <code>username</code>{" "}
                e <code>email</code> como claims, sem roundtrip ao banco para
                identificar o caller.
              </p>
            </>
          ),
        },
        {
          title: "API · AWS S3 para todos os arquivos de mídia",
          body: (
            <>
              <p>
                Imagens de perfil, fotos de comunidade e mídia de posts vão
                direto para S3 — banco guarda só o <code>file_path</code>.{" "}
                <code>S3Service</code> valida tipo de arquivo (JPEG, PNG, GIF,
                MP4) antes do upload e usa naming com timestamp para evitar
                colisão. Novos usuários e comunidades recebem imagem padrão via
                cópia server-side no próprio S3, sem trafegar o arquivo.
              </p>
            </>
          ),
        },
        {
          title: "API · Delete manual via @Transactional no lugar de FK constraint",
          body: (
            <>
              <p>
                Deleção de usuário ou comunidade limpa todas as tabelas
                relacionadas (posts, comentários, likes, memberships, perfil)
                via chamadas sequenciais aos repositories dentro de um único{" "}
                <code>@Transactional</code>. A ordem é explícita e rastreável.
              </p>
            </>
          ),
        },
        {
          title: "Front · Auth via localStorage + jwt-decode",
          body: (
            <>
              <p>
                Auth vive em quatro chaves no <code>localStorage</code> (
                <code>authenticated</code>, <code>token</code>,{" "}
                <code>userId</code>, <code>username</code>). No carregamento da
                app, o token é decodificado com <code>jwt-decode</code> para
                checar expiração sem roundtrip ao servidor. Estado de
                autenticação propagado por props onde necessário.
              </p>
            </>
          ),
        },
        {
          title: "Front · Paginação server-side para posts, client-side para comentários",
          body: (
            <>
              <p>
                Posts usam paginação no servidor: <code>maxPerPage</code> cresce
                +10 a cada &ldquo;carregar mais&rdquo;, API retorna só o slice
                necessário. Comentários são fetched de uma vez e fatiados no
                cliente:{" "}
                <code>comments.filter(c =&gt; c.postId === id).slice(0, maxComments)</code>.
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
          Neosrate is a Reddit-style social platform. Users create communities
          (c/name), publish posts with text, image or video, like, comment and
          follow a personalized feed. Dashboard to edit profile, photo, posts
          and communities. Dark interface with violet/slate accent.
        </p>
        <p>
          The back-end (Spring Boot 3 + Java 21 + MySQL 8) implements stateless
          JWT auth, S3 media upload with file type validation, and explicit
          transactional deletion of users and communities.
        </p>
        <p>
          The front-end (React 18 + TypeScript + Vite) consumes the API via
          Axios, manages auth in localStorage with expiration check via{" "}
          <code>jwt-decode</code>, and implements server-side pagination for
          posts and client-side for comments.
        </p>
      </>
    ),
    decisions: [
      {
        title: "API · Stateless JWT via OncePerRequestFilter",
        body: (
          <>
            <p>
              Each request passes through <code>SecurityFilter</code>, which
              extracts the token from the <code>Authorization</code> header,
              validates the HMAC256 signature via Auth0 SDK and injects{" "}
              <code>UserDetails</code> into the <code>SecurityContext</code>.
              CSRF disabled — no session cookie. Token carries{" "}
              <code>userId</code>, <code>username</code> and{" "}
              <code>email</code> as claims, no DB roundtrip to identify the
              caller.
            </p>
          </>
        ),
      },
      {
        title: "API · AWS S3 for all media files",
        body: (
          <>
            <p>
              Profile images, community photos and post media go directly to
              S3 — database stores only the <code>file_path</code>.{" "}
              <code>S3Service</code> validates file type (JPEG, PNG, GIF, MP4)
              before upload and uses timestamp naming to avoid collision. New
              users and communities receive a default image via server-side
              copy within S3, without transferring the file.
            </p>
          </>
        ),
      },
      {
        title: "API · Manual delete via @Transactional instead of FK constraint",
        body: (
          <>
            <p>
              Deleting a user or community cleans all related tables (posts,
              comments, likes, memberships, profile) via sequential repository
              calls within a single <code>@Transactional</code>. The order is
              explicit and traceable.
            </p>
          </>
        ),
      },
      {
        title: "Front · Auth via localStorage + jwt-decode",
        body: (
          <>
            <p>
              Auth lives in four <code>localStorage</code> keys (
              <code>authenticated</code>, <code>token</code>,{" "}
              <code>userId</code>, <code>username</code>). On app load, the
              token is decoded with <code>jwt-decode</code> to check expiration
              without a server roundtrip. Auth state propagated via props where
              needed.
            </p>
          </>
        ),
      },
      {
        title: "Front · Server-side pagination for posts, client-side for comments",
        body: (
          <>
            <p>
              Posts use server pagination: <code>maxPerPage</code> grows +10
              per &ldquo;load more&rdquo;, API returns only the needed slice.
              Comments are fetched at once and sliced on the client:{" "}
              <code>comments.filter(c =&gt; c.postId === id).slice(0, maxComments)</code>.
            </p>
          </>
        ),
      },
    ],
  };
};

export default content;
