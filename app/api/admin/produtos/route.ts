import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { verificarSessao } from "@/lib/sessao";
import { listarProdutos } from "@/app/admin/produtos/services/produtos";

export async function GET() {
    const cookieStore = await cookies();
    const token = cookieStore.get("sessao_admin")?.value;

    if (!token || !(await verificarSessao(token))) {
        return NextResponse.json({ erro: "Não autorizado" }, { status: 401 });
    }

    try {
        const produtos = await listarProdutos();
        return NextResponse.json(produtos);
    } catch (error) {
        console.error("Erro ao listar produtos:", error);
        return NextResponse.json(
            { erro: "Erro ao buscar produtos" },
            { status: 500 }
        );
    }
}