import Confetti from "./components/Confetti";

const TABNEWS_URL = "https://www.tabnews.com.br";
const REVALIDATE_SECONDS = 60;
const FETCH_TIMEOUT_MS = 5000;

async function getTotalContents() {
  try {
    const response = await fetch(
      `${TABNEWS_URL}/api/v1/contents?page=1&per_page=1&strategy=new`,
      {
        next: { revalidate: REVALIDATE_SECONDS },
        signal: AbortSignal.timeout(FETCH_TIMEOUT_MS),
      },
    );
    if (!response.ok) return null;
    const total = Number(response.headers.get("x-pagination-total-rows"));
    return Number.isFinite(total) ? total : null;
  } catch {
    return null;
  }
}

export default async function Home() {
  const totalContents = await getTotalContents();

  return (
    <main
      style={{
        maxWidth: "720px",
        padding: "2rem",
        textAlign: "center",
      }}
    >
      <Confetti />
      <h1 style={{ fontSize: "3rem", margin: "0 0 1.5rem" }}>
        🚧 Em Construção 🚧
      </h1>
      <p style={{ fontSize: "1.25rem", lineHeight: 1.6, margin: "0 0 2rem" }}>
        Estamos neste exato momento reconstruindo o TabNews, um lugar na
        internet para quem trabalha com tecnologia e precisa consumir conteúdos
        com valor concreto.
      </p>
      <p style={{ fontSize: "1.1rem", margin: "0 0 1rem" }}>
        {totalContents !== null ? (
          <>
            Total de conteúdos publicados no TabNews:{" "}
            <strong>{totalContents.toLocaleString("pt-BR")}</strong>
          </>
        ) : (
          "Não foi possível carregar o total de conteúdos publicados no TabNews."
        )}
      </p>
      <a href={TABNEWS_URL} target="_blank" rel="noopener noreferrer">
        Acesse o TabNews oficial
      </a>
    </main>
  );
}
