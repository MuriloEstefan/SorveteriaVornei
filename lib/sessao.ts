import { SignJWT, jwtVerify } from "jose";

const secret = new TextEncoder().encode(process.env.SESSION_SECRET);

export async function criarSessao() {
    return await new SignJWT({ admin: true })
        .setProtectedHeader({ alg: "HS256" })
        .setExpirationTime("7d") // sessão dura 7 dias
        .sign(secret);
}

export async function verificarSessao(token: string) {
    try {
        const { payload } = await jwtVerify(token, secret);
        return payload.admin === true;
    } catch {
        return false; // token inválido, expirado ou adulterado
    }
}