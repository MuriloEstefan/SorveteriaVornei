import { pool } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(
    req: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id: idParam } = await params;
        const id = Number(idParam);

        if (Number.isNaN(id)) {
            return NextResponse.json({ erro: "ID inválido" }, { status: 400 });
        }

        const resultado = await pool.query(
            `
            SELECT p.*,
                COALESCE(
                    json_agg(
                        json_build_object(
                            'nome', i.nome,
                            'preco_unitario', i.preco_unitario,
                            'subtotal', i.subtotal,
                            'quantidade', i.quantidade,
                            'quantidades', i.quantidades,
                            'categoria', i.categoria,
                            'observacao', i.observacao
                        )
                    ) FILTER (WHERE i.id IS NOT NULL), '[]'
                ) AS itens
            FROM pedidos p
            LEFT JOIN itens_pedido i ON i.pedido_id = p.id
            WHERE p.id = $1
            GROUP BY p.id
            `,
            [id]
        );

        if (resultado.rows.length === 0) {
            return NextResponse.json({ erro: "Pedido não encontrado" }, { status: 404 });
        }

        const p = resultado.rows[0];

        return NextResponse.json({
            id: p.id,
            nome: p.nome,
            sobrenome: p.sobrenome,
            telefone: p.telefone,
            tipo_entrega: p.tipo_pedido,
            rua: p.rua,
            numero: p.numero,
            bairro: p.bairro,
            complemento: p.complemento,
            cidade: p.cidade,
            frete: Number(p.frete ?? 0),
            forma_pagamento: p.forma_pagamento,
            troco_para: p.troco_para !== null ? Number(p.troco_para) : null,
            observacao: p.observacao,
            colher: p.colher,
            total: Number(p.total),
            status: p.status,
            criado_em: p.criado_em,
            itens: p.itens,
        });
    } catch (error) {
        console.error("Erro ao buscar pedido:", error);
        return NextResponse.json({ erro: "Erro ao buscar pedido" }, { status: 500 });
    }
}

export async function PATCH(
    req: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id: idParam } = await params;
        const id = Number(idParam);

        if (Number.isNaN(id)) {
            return NextResponse.json({ erro: "ID inválido" }, { status: 400 });
        }

        const body = await req.json();

        if (body.status !== undefined) {
            await pool.query(
                `UPDATE pedidos SET status = $1 WHERE id = $2`,
                [body.status, id]
            );
        }

        if (body.pago !== undefined) {
            await pool.query(
                `UPDATE pedidos SET pago = $1 WHERE id = $2`,
                [body.pago, id]
            );
        }

        return NextResponse.json({ sucesso: true });
    } catch (error) {
        console.error("Erro ao atualizar pedido:", error);
        return NextResponse.json({ erro: "Erro ao atualizar pedido" }, { status: 500 });
    }
}