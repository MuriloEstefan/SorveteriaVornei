// lib/verificarAdmin.ts
import { cookies } from "next/headers";
import { verificarSessao } from "@/lib/sessao";
import { NextResponse } from "next/server";

export async function exigirAdmin() {
    const cookieStore = await cookies();
    const token = cookieStore.get("sessao_admin")?.value;

    if (!token || !(await verificarSessao(token))) {
        return NextResponse.json({ erro: "Não autorizado" }, { status: 401 });
    }

    return null;
}