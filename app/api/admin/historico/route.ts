import { NextRequest, NextResponse } from "next/server";
import {
    listarHistorico,
    buscarResumoHistorico,
} from "@/app/admin/historico/services/historico";

export async function GET(req: NextRequest) {
    try {
        const { searchParams } = new URL(req.url);
        const busca = searchParams.get("busca") || undefined;
        const status = searchParams.get("status") || "todos";
        const periodo = searchParams.get("periodo") || "hoje";

        const [pedidos, resumo] = await Promise.all([
            listarHistorico({ busca, status, periodo }),
            buscarResumoHistorico(periodo),
        ]);

        return NextResponse.json({ pedidos, resumo });
    } catch (error) {
        console.error("Erro ao buscar histórico:", error);
        return NextResponse.json({ erro: "Erro ao buscar histórico" }, { status: 500 });
    }
}