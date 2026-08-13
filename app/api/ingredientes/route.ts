import { NextResponse } from "next/server";
import { pool } from "@/lib/db";

export const dynamic = "force-dynamic";

export async function GET() {
    try {
        const resultado = await pool.query(`
            SELECT id, tipo, nome, disponivel FROM ingredientes ORDER BY tipo, nome
        `);
        return NextResponse.json(resultado.rows);
    } catch (error) {
        console.error("Erro ao buscar ingredientes:", error);
        return NextResponse.json({ erro: "Erro ao buscar ingredientes" }, { status: 500 });
    }
}