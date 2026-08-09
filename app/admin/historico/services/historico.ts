import { pool } from "@/lib/db";

const TIMEZONE_OFFSET = "-03:00"; // horário de Brasília

// Mesmo padrão à prova de timezone que corrigimos no faturamento
function hojeNoBrasil(): string {
    const formatter = new Intl.DateTimeFormat("en-CA", {
        timeZone: "America/Sao_Paulo",
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
    });
    return formatter.format(new Date());
}

function adicionarDias(dataStr: string, dias: number): string {
    const data = new Date(`${dataStr}T00:00:00.000${TIMEZONE_OFFSET}`);
    data.setUTCDate(data.getUTCDate() + dias);
    return data.toISOString().slice(0, 10);
}

function calcularPeriodo(periodo: string) {
    const hoje = hojeNoBrasil();
    let inicioStr = hoje;

    if (periodo === "semana") inicioStr = adicionarDias(hoje, -6);
    else if (periodo === "mes") inicioStr = adicionarDias(hoje, -29);
    else if (periodo === "ano") inicioStr = adicionarDias(hoje, -364);
    // "hoje" -> inicioStr continua sendo hoje

    const inicio = new Date(`${inicioStr}T00:00:00.000${TIMEZONE_OFFSET}`);
    const fim = new Date(`${hoje}T23:59:59.999${TIMEZONE_OFFSET}`);
    return { inicio, fim };
}

function statusParaBanco(status: string): string[] {
    if (status === "finalizado") return ["entregue"];
    if (status === "cancelado") return ["cancelado"];
    return ["entregue", "cancelado"];
}

interface FiltrosHistorico {
    busca?: string;
    status: string;
    periodo: string;
}

export async function listarHistorico(filtros: FiltrosHistorico) {
    const { inicio, fim } = calcularPeriodo(filtros.periodo);
    const statusBanco = statusParaBanco(filtros.status);

    const condicoes = [`status = ANY($1)`, `criado_em BETWEEN $2 AND $3`];
    const params: unknown[] = [statusBanco, inicio, fim];

    if (filtros.busca && filtros.busca.trim()) {
        const termo = filtros.busca.trim();
        params.push(`%${termo}%`, termo);
        const idxLike = params.length - 1;
        const idxExato = params.length;
        condicoes.push(
            `(nome ILIKE $${idxLike} OR sobrenome ILIKE $${idxLike} OR telefone ILIKE $${idxLike} OR CAST(id AS TEXT) = $${idxExato})`
        );
    }

    const resultado = await pool.query(
        `
        SELECT id, nome, sobrenome, telefone, total, status, criado_em
        FROM pedidos
        WHERE ${condicoes.join(" AND ")}
        ORDER BY criado_em DESC
        `,
        params
    );

    return resultado.rows.map((p) => ({
        id: p.id,
        nome: p.nome,
        sobrenome: p.sobrenome,
        telefone: p.telefone,
        total: Number(p.total),
        status: p.status,
        criado_em: p.criado_em,
    }));
}

export async function buscarResumoHistorico(periodo: string) {
    const { inicio, fim } = calcularPeriodo(periodo);

    const resultado = await pool.query(
        `
        SELECT
            COUNT(*) FILTER (WHERE status = 'entregue') AS finalizados,
            COUNT(*) FILTER (WHERE status = 'cancelado') AS cancelados,
            COALESCE(SUM(total) FILTER (WHERE status = 'entregue'), 0) AS faturamento
        FROM pedidos
        WHERE status IN ('entregue', 'cancelado')
          AND criado_em BETWEEN $1 AND $2
        `,
        [inicio, fim]
    );

    const linha = resultado.rows[0];

    return {
        finalizados: Number(linha.finalizados),
        cancelados: Number(linha.cancelados),
        faturamento: Number(linha.faturamento),
    };
}