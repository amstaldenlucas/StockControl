type HttpMethod = "GET" | "POST" | "PUT" | "DELETE";

function getBaseUrl() {
  // Client → usa relativo
  if (typeof window !== "undefined") return "";

  // Server → monta absoluto
  return process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
}

export async function baseService<TResponse, TBody = unknown>(
  url: string,
  method: HttpMethod = "GET",
  body?: TBody
): Promise<TResponse> {
  const baseUrl = getBaseUrl();

  const resp = await fetch(`${baseUrl}/api/proxy${url}`, {
    method,
    headers: {
      "Content-Type": "application/json",
    },
    cache: "no-store",
    body: body ? JSON.stringify(body) : undefined,
  });

  const text = await resp.text();

  // Tenta converter resposta sempre
  let data: unknown = null;
  try {
    data = text ? JSON.parse(text) : null;
  } catch {
    data = text;
  }

  // Se deu erro HTTP, retorne a estrutura de erro da API
  if (!resp.ok) {
    throw data; // 👈 retorna { status, error }
  }

  return data as TResponse;
}
