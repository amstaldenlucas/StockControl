type HttpMethod = "GET" | "POST" | "PUT" | "DELETE";

type ApiError = {
  status: number;
  message: string;
};

type ErrorResponse = {
  message?: string;
};

function getBaseUrl() {
  if (typeof window !== "undefined") return "";
  return process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
}

export async function baseService<TResponse, TBody = unknown>(
  url: string,
  method: HttpMethod = "GET",
  body?: TBody,
  options?: RequestInit
): Promise<TResponse> {
  const baseUrl = getBaseUrl();

  const resp = await fetch(`${baseUrl}/api/proxy${url}`, {
    method,
    headers: {
      "Content-Type": "application/json",
      ...(options?.headers || {}),
    },
    body: body ? JSON.stringify(body) : undefined,
    ...options,
  });

  const data: unknown = await resp.json().catch(() => null);

  if (!resp.ok) {
    const errorData = data as ErrorResponse | null;

    throw {
      status: resp.status,
      message: errorData?.message ?? "Erro inesperado",
    } as ApiError;
  }

  return data as TResponse;
}