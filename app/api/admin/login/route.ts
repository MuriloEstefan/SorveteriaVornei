import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { criarSessao } from "@/lib/sessao";

export async function POST(req: Request) {
    const { senha } = await req.json();

    const hashSalvo = process.env.ADMIN_PASSWORD_HASH!;
    const senhaCorreta = await bcrypt.compare(senha, hashSalvo);

    if (!senhaCorreta) {
        return NextResponse.json(
            { erro: "Senha incorreta" },
            { status: 401 }
        );
    }

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