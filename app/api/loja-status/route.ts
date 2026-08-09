import { NextResponse } from "next/server";
import { buscarLojaAberta, alterarLojaAberta } from "@/lib/configuracoesLojaAberta";

export const dynamic = "force-dynamic"; // 👈 novo: impede cache estático da rota

export async function GET() {
    try {
        const aberta = await buscarLojaAberta();
        return NextResponse.json({ aberta });
    } catch (error) {
        console.error("Erro ao buscar status da loja:", error);
        return NextResponse.json({ erro: "Erro ao buscar status" }, { status: 500 });
    }
}

export async function PATCH(req: Request) {
    try {
        const { aberta } = await req.json();

        if (typeof aberta !== "boolean") {
            return NextResponse.json({ erro: "Valor inválido" }, { status: 400 });
        }

        await alterarLojaAberta(aberta);
        return NextResponse.json({ sucesso: true, aberta });
    } catch (error) {
        console.error("Erro ao atualizar status da loja:", error);
        return NextResponse.json({ erro: "Erro ao atualizar status" }, { status: 500 });
    }
}