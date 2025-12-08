import { NextResponse } from "next/server";
import { externalApi } from "@/services/apiServices/externalApiAuth"

const BASE_URL_API = process.env.BASE_URL_API!;

export const dynamic = "force-dynamic"

export async function GET(req: Request, ctx: { params: Promise<{ path: string[] }> }) {
  const { path } = await ctx.params;
  return handle(req, path.join("/"), "GET");
}

export async function POST(req: Request, ctx: { params: Promise<{ path: string[] }> }) {
  const { path } = await ctx.params;
  return handle(req, path.join("/"), "POST");
}

export async function PUT(req: Request, ctx: { params: Promise<{ path: string[] }> }) {
  const { path } = await ctx.params;
  return handle(req, path.join("/"), "PUT");
}

export async function DELETE(req: Request, ctx: { params: Promise<{ path: string[] }> }) {
  const { path } = await ctx.params;
  return handle(req, path.join("/"), "DELETE");
}

async function handle(req: Request, path: string, method: string) {
  const accessToken = await externalApi.ensureValidToken();

  let res = await forward(req, path, method, accessToken);

  if (res.status === 401) {
    const newToken = await externalApi.ensureValidToken(true)
    res = await forward(req, path, method, newToken);
  }

  // EVITA "Unexpected end of JSON input"
  const text = await res.text();
  const data = text ? JSON.parse(text) : null;

  return NextResponse.json(data, { status: res.status });
}

// async function forward(req: Request, path: string, method: string, token?: string) {
//     const headers: HeadersInit = {
//       "Content-Type": "application/json",
//     };

//     if (token) headers.Authorization = `Bearer ${token}`;

//     return fetch(`${BASE_URL_API}/${path}`, {
//       method,
//       headers,
//       body: method !== "GET" ? await req.text() : undefined,
//     });
// }

async function forward(req: Request, path: string, method: string, token?: string) {
  const headers: HeadersInit = {
    "Content-Type": "application/json",
  };

  if (token) headers.Authorization = `Bearer ${token}`;

  // ✅ Cria a URL de forma segura (sem erro de barra ou parse)
  const url = `${BASE_URL_API}/${path}`;

  return fetch(url, {
    method,
    headers,
    body: method !== "GET" ? await req.text() : undefined,
  });
}