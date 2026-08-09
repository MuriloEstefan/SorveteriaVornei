import { pool } from "@/lib/db";

// Busca o total faturado, número de pedidos e ticket médio de um período
export async function buscarResumo(dataInicio: Date, dataFim: Date) {
    const resultado = await pool.query(
        `
        SELECT
            COALESCE(SUM(total), 0) AS faturamento,
            COUNT(*) AS numero_pedidos
        FROM pedidos
        WHERE status = 'entregue'
          AND criado_em BETWEEN $1 AND $2
        `,
        [dataInicio, dataFim]
    );

    const linha = resultado.rows[0];
    const faturamento = Number(linha.faturamento);
    const numeroPedidos = Number(linha.numero_pedidos);
    const ticketMedio = numeroPedidos > 0 ? faturamento / numeroPedidos : 0;

    return { faturamento, numeroPedidos, ticketMedio };
}

// Busca o faturamento agrupado por dia, pro gráfico
export async function buscarFaturamentoPorDia(dataInicio: Date, dataFim: Date) {
    const resultado = await pool.query(
        `
        SELECT
            DATE(criado_em) AS dia,
            SUM(total) AS faturamento
        FROM pedidos
        WHERE status = 'entregue'
          AND criado_em BETWEEN $1 AND $2
        GROUP BY DATE(criado_em)
        ORDER BY dia ASC
        `,
        [dataInicio, dataFim]
    );

    return resultado.rows.map((linha) => ({
        dia: linha.dia,
        faturamento: Number(linha.faturamento),
    }));
}

// Busca os produtos mais vendidos (por quantidade) no período
export async function buscarProdutosMaisVendidos(dataInicio: Date, dataFim: Date) {
    const resultado = await pool.query(
        `
        SELECT
            ip.nome,
            SUM(ip.quantidade) AS total_vendido
        FROM itens_pedido ip
        JOIN pedidos p ON p.id = ip.pedido_id
        WHERE p.status = 'entregue'
          AND p.criado_em BETWEEN $1 AND $2
        GROUP BY ip.nome
        ORDER BY total_vendido DESC
        LIMIT 5
        `,
        [dataInicio, dataFim]
    );

    return resultado.rows.map((linha) => ({
        nome: linha.nome,
        quantidade: Number(linha.total_vendido),
    }));
}