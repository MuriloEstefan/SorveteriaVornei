import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { verificarSessao } from "@/lib/sessao";
import {
    atualizarDisponibilidade,
    atualizarAtivo,
    atualizarPreco,
} from "@/app/admin/produtos/services/produtos";

export async function PATCH(
    req: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    // Confere se quem tá chamando essa rota está logado
    const cookieStore = await cookies();
    const token = cookieStore.get("sessao_admin")?.value;

    if (!token || !(await verificarSessao(token))) {
        return NextResponse.json(
            { erro: "Não autorizado" },
            { status: 401 }
        );
    }

    try {
        const { id } = await params;

        if (!id) {
            return NextResponse.json(
                { erro: "ID inválido" },
                { status: 400 }
            );
        }

        const body = await req.json();

        if (typeof body.disponivel === "boolean") {
            await atualizarDisponibilidade(id, body.disponivel);
        }

        if (typeof body.ativo === "boolean") {
            await atualizarAtivo(id, body.ativo);
        }

        if (typeof body.preco === "number") {
            await atualizarPreco(id, body.preco);
        }

        return NextResponse.json({ sucesso: true });
    } catch (error) {
        console.error("Erro ao atualizar produto:", error);
        return NextResponse.json(
            { erro: "Erro ao atualizar produto" },
            { status: 500 }
        );
    }
}