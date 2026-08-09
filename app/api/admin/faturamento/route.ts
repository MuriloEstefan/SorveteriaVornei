import { NextResponse } from "next/server";
import {
    buscarResumo,
    buscarFaturamentoPorDia,
    buscarProdutosMaisVendidos,
} from "@/app/admin/faturamento/services/faturamento";

const TIMEZONE_OFFSET = "-03:00"; // horário de Brasília (sem horário de verão)

// Retorna a data de "hoje" no fuso de Brasília, no formato "YYYY-MM-DD",
// independente do fuso horário em que o servidor está rodando.
function hojeNoBrasil(): string {
    const agora = new Date();
    // Intl.DateTimeFormat com timeZone força a conversão pro fuso certo
    const formatter = new Intl.DateTimeFormat("en-CA", {
        timeZone: "America/Sao_Paulo",
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
    });
    return formatter.format(agora); // "en-CA" retorna no formato YYYY-MM-DD
}

// Soma/subtrai dias de uma data no formato "YYYY-MM-DD"
function adicionarDias(dataStr: string, dias: number): string {
    const data = new Date(`${dataStr}T00:00:00.000${TIMEZONE_OFFSET}`);
    data.setUTCDate(data.getUTCDate() + dias);
    return data.toISOString().slice(0, 10);
}

// Calcula o início/fim do período baseado no atalho escolhido (hoje, semana, mes)
function calcularPeriodo(periodo: string, inicioCustom?: string, fimCustom?: string) {
    if (periodo === "personalizado" && inicioCustom && fimCustom) {
        const inicio = new Date(`${inicioCustom}T00:00:00.000${TIMEZONE_OFFSET}`);
        const fim = new Date(`${fimCustom}T23:59:59.999${TIMEZONE_OFFSET}`);
        return { inicio, fim };
    }

    const hoje = hojeNoBrasil(); // ex: "2026-07-16"

    let inicioStr = hoje;
    if (periodo === "semana") {
        inicioStr = adicionarDias(hoje, -6); // últimos 7 dias, incluindo hoje
    } else if (periodo === "mes") {
        inicioStr = adicionarDias(hoje, -29); // últimos 30 dias
    }
    // se for "hoje", inicio continua sendo hoje mesmo

    const inicio = new Date(`${inicioStr}T00:00:00.000${TIMEZONE_OFFSET}`);
    const fim = new Date(`${hoje}T23:59:59.999${TIMEZONE_OFFSET}`);

    return { inicio, fim };
}

export async function GET(req: Request) {
    const { searchParams } = new URL(req.url);

    const periodo = searchParams.get("periodo") || "hoje";
    const inicioCustom = searchParams.get("inicio") || undefined;
    const fimCustom = searchParams.get("fim") || undefined;

    const { inicio, fim } = calcularPeriodo(periodo, inicioCustom, fimCustom);

    // Calcula o período anterior (mesmo tamanho de dias, logo antes do período atual)
    const duracaoMs = fim.getTime() - inicio.getTime();
    const fimAnterior = new Date(inicio.getTime() - 1);
    const inicioAnterior = new Date(fimAnterior.getTime() - duracaoMs);

    const [resumoAtual, resumoAnterior, porDia, maisVendidos] = await Promise.all([
        buscarResumo(inicio, fim),
        buscarResumo(inicioAnterior, fimAnterior),
        buscarFaturamentoPorDia(inicio, fim),
        buscarProdutosMaisVendidos(inicio, fim),
    ]);

    return NextResponse.json({
        atual: resumoAtual,
        anterior: resumoAnterior,
        porDia,
        maisVendidos,
    });
}