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

  if (!resp.ok) {
    const text = await resp.text();
    throw new Error(text || `Erro HTTP ${resp.status}`);
  }

  const dataResult = resp.json();
  return dataResult;
}