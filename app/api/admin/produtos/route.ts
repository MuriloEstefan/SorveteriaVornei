import { NextResponse } from "next/server";
import { listarProdutos } from "@/app/admin/produtos/services/produtos";

export async function GET() {
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