import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { criarSessao } from "@/lib/sessao";
import { verificarBloqueio, registrarTentativaFalha, resetarTentativas } from "@/lib/rateLimiter";

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export async function POST(req: Request) {
    const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "desconhecido";

    const statusBloqueio = await verificarBloqueio(ip);
    if (statusBloqueio.bloqueado) {
        return NextResponse.json(
            { erro: `Muitas tentativas. Tente novamente em ${statusBloqueio.segundosRestantes} segundos.` },
            { status: 429 }
        );
    }

    const { email, senha } = await req.json();

    const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password: senha,
    });

    if (error) {
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
        maxAge: 60 * 60 * 24 * 7,
        path: "/",
    });

    return resposta;
}