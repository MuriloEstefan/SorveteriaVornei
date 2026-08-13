import { NextResponse } from "next/server";
import { atualizarDisponibilidadeIngrediente } from "@/app/admin/ingredientes/services/ingredientes";

export async function PATCH(
    req: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id: idParam } = await params;
        const id = Number(idParam);

        if (Number.isNaN(id)) {
            return NextResponse.json({ erro: "ID inválido" }, { status: 400 });
        }

        const { disponivel } = await req.json();

        if (typeof disponivel !== "boolean") {
            return NextResponse.json({ erro: "Valor inválido" }, { status: 400 });
        }

        await atualizarDisponibilidadeIngrediente(id, disponivel);
        return NextResponse.json({ sucesso: true });
    } catch (error) {
        console.error("Erro ao atualizar ingrediente:", error);
        return NextResponse.json({ erro: "Erro ao atualizar" }, { status: 500 });
    }
}