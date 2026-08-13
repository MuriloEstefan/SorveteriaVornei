import { NextResponse } from "next/server";
import { listarIngredientesAdmin } from "@/app/admin/ingredientes/services/ingredientes";

export async function GET() {
    try {
        const ingredientes = await listarIngredientesAdmin();
        return NextResponse.json(ingredientes);
    } catch (error) {
        console.error("Erro ao listar ingredientes:", error);
        return NextResponse.json({ erro: "Erro ao buscar ingredientes" }, { status: 500 });
    }
}