import { NextResponse } from "next/server";
import {
    atualizarDisponibilidade,
    atualizarAtivo,
    atualizarPreco,
} from "@/app/admin/produtos/services/produtos";

export async function PATCH(
    req: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id: idParam } = await params;
        const id = Number(idParam);

        if (Number.isNaN(id)) {
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