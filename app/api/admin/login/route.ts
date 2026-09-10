import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { criarSessao } from "@/lib/sessao";
import { verificarBloqueio, registrarTentativaFalha, resetarTentativas } from "@/lib/rateLimiter";

export async function POST(req: Request) {
    const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "desconhecido";

    const statusBloqueio = await verificarBloqueio(ip);
    if (statusBloqueio.bloqueado) {
        return NextResponse.json(
            { erro: `Muitas tentativas. Tente novamente em ${statusBloqueio.segundosRestantes} segundos.` },
            { status: 429 }
        );
    }

    const { senha } = await req.json();

    const hashSalvo = process.env.ADMIN_PASSWORD_HASH!;
    const senhaCorreta = await bcrypt.compare(senha, hashSalvo);

    console.log('recebido:', senha, 'hash:', hashSalvo);

    if (!senhaCorreta) {
        await registrarTentativaFalha(ip);
        return NextResponse.json(
            { erro: "Senha incorreta" },
            { status: 401 }
        );
    }

    await resetarTentativas(ip);

    const token = await criarSessao();

    const resposta = NextResponse.json({ sucesso: true });

    resposta.cookies.set("sessao_admin", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 60 * 60 * 24 * 7, // 7 dias em segundos
        path: "/",
    });

    return resposta;
}