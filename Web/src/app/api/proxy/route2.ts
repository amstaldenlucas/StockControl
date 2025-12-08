import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const body = await req.json();
  const cookieStore = await cookies();

  let accessToken = cookieStore.get("access_token")?.value;
  let refreshToken = cookieStore.get("refresh_token")?.value;

  // 1) SE NÃO EXISTE TOKEN → LOGIN AUTOMÁTICO
  if (!accessToken) {
    const loginResponse = await fetch(
      `${process.env.NEXT_PUBLIC_API_AUTH_URL}/auth/login`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          secret: process.env.API_SECRET, // ✅ vem do .env
        }),
      }
    );

    if (!loginResponse.ok) {
      return NextResponse.json(
        { error: "Falha no login automático" },
        { status: 401 }
      );
    }

    const token = await loginResponse.json();
    console.log('token: ', token)
    accessToken = token.accessToken;
    refreshToken = token.refreshToken;

    cookieStore.set("access_token", token.accessToken);
    cookieStore.set("refresh_token", token.refreshTokens);
  }

  // 2) REQUEST NORMAL NA API
  let response = await fetch(`${process.env.DOTNET_API_URL}${body.url}`, {
    method: body.method || "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    body: body.data ? JSON.stringify(body.data) : null,
  });

  // 3) REFRESH AUTOMÁTICO SE TOKEN EXPIRAR
  if (response.status === 401 && refreshToken) {
    const refreshResponse = await fetch(
      `${process.env.NEXT_PUBLIC_API_AUTH_URL}/auth/refresh`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ refreshToken }),
      }
    );

    if (!refreshResponse.ok) {
      return NextResponse.json(
        { error: "Refresh token inválido" },
        { status: 401 }
      );
    }

    const newTokens = await refreshResponse.json();

    cookieStore.set("access_token", newTokens.accessToken);
    cookieStore.set("refresh_token", newTokens.refreshToken);

    // ✅ Refaz a request original
    response = await fetch(`${process.env.DOTNET_API_URL}${body.url}`, {
      method: body.method || "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${newTokens.accessToken}`,
      },
      body: body.data ? JSON.stringify(body.data) : null,
    });
  }

  try {
    const result = await response.json();
    return NextResponse.json(result);
} catch (e) {
    // Captura SyntaxError: Unexpected end of JSON input
    const responseText = await response.text();
    console.error("Erro de Parseamento JSON:", e, "Resposta recebida:", responseText);
    
    return NextResponse.json(
        { error: "Erro de parseamento JSON: A API retornou conteúdo inválido ou vazio.", response_text: responseText }, 
        { status: 500 }
    );
}
}
