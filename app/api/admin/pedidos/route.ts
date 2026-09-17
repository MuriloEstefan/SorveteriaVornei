import { pool } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET() {

    // Busca só os pedidos que ainda precisam de alguma ação
    // (entregue/cancelado não aparecem mais aqui)
    const pedidos = await pool.query(`
        SELECT * FROM pedidos
        WHERE status IN ('recebido', 'em_preparo', 'saiu_entrega')
        ORDER BY criado_em DESC
    `);

    // Para cada pedido, busca os itens dele
    const pedidosComItens = await Promise.all(
        pedidos.rows.map(async (pedido) => {

            const itens = await pool.query(`
                SELECT * FROM itens_pedido
                WHERE pedido_id = $1
            `, [pedido.id]);

            return {
                id: pedido.id,
                numero_pedido: pedido.numero_pedido,
                nome: pedido.nome,
                sobrenome: pedido.sobrenome,
                telefone: pedido.telefone,
                tipo_entrega: pedido.tipo_pedido, 
                rua: pedido.rua,
                numero: pedido.numero,
                bairro: pedido.bairro,
                complemento: pedido.complemento,
                cidade: pedido.cidade,             
                frete: Number(pedido.frete ?? 0),  
                observacao: pedido.observacao,
                colher: pedido.colher,
                forma_pagamento: pedido.forma_pagamento,
                pago: pedido.pago,
                troco_para: pedido.troco_para === null
                    ? null
                    : Number(pedido.troco_para),
                total: Number(pedido.total),
                status: pedido.status,
                criado_em: pedido.criado_em,
                itens: itens.rows,
            };
        })
    );

    return NextResponse.json(pedidosComItens);
}