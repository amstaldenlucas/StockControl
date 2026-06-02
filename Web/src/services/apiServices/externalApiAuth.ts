import { cookies } from "next/headers";
import { jwtDecode } from "jwt-decode";

const API_URL = process.env.BASE_URL_API!;
const SECRET = process.env.API_SECRET!;

const safetMarginToExpirationTokenInSeconds = 10;

async function setCookie(key: string, value: string) {
    const cookieStore = await cookies();
    cookieStore.set(key, value, {
        httpOnly: true,
        secure: false,
        sameSite: "lax",
        path: "/",
    });
}

async function getCookie(key: string): Promise<string | undefined> {
    const cookieStore = await cookies();

    return cookieStore.get(key)?.value;
}

async function login() {
    const res = await fetch(`${API_URL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ secret: SECRET }),
    });

    if (!res.ok) {
        console.log(await res.json())
        return false;
    }

    const data = await res.json();
    await setCookie("access_token", data.accessToken);
    await setCookie("refresh_token", data.refreshToken);
    return true;
}

async function refresh(refreshToken: string | undefined) {
    if (refreshToken == undefined) {
        return false;
    }

    const res = await fetch(`${API_URL}/auth/refresh`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ secret: refreshToken }),
    });

    if (!res.ok) {
        console.log(await res.json())
        return false;
    }

    const data = await res.json();
    
    await setCookie("access_token", data.accessToken);
    await setCookie("refresh_token", data.refreshToken);

    return true;
}

function CheckTokenValidation(token: string | undefined) {
    try {
        if (token == undefined)
            return false;

        const decoded = jwtDecode(token);
        const expirationTime = decoded.exp;

        // Se não houver claim 'exp', assumimos que não expira ou tratamos como erro
        if (!expirationTime)
            return false;

        // 2. Calcular o tempo atual em segundos
        const currentTime = Math.floor(Date.now());

        // 3. Comparar o tempo de expiração - margem de segurança, com o tempo atual
        // Se currentTime for maior que (expirationTime - safetyMarginSeconds), está expirado ou próximo
        return (expirationTime - safetMarginToExpirationTokenInSeconds) > currentTime;

    } catch (error) {
        console.error("Erro ao decodificar token, tratando como expirado:", error);
        return true; 
    }
}

async function ensureValidToken(forceNewAuth: boolean = false) {
    const accessToken = await getCookie("access_token");
    const refreshToken = await getCookie("refresh_token");
    const tokenValid = CheckTokenValidation(accessToken);
    
    if (!forceNewAuth && tokenValid) {
        console.log("Caiu aqui")
        return accessToken;
    }

    // se nao existe token, faz login
    if (!accessToken || !forceNewAuth) {
        const loginOk = await login();
        
        if (!loginOk) {
            console.log("Caiu aqui 2")
            return "Falha no login automático"
        }

        return await getCookie("access_token")
    }

    // se existe token e nao e valido, tenta refresh
    const refreshResult = await refresh(refreshToken);
    if(refreshResult) {
        console.log("Caiu aqui 3")
        return await getCookie("access_token")
    }
    
    return "Falha ao realizar refresh";
}

export const externalApi = {
  ensureValidToken
}