import { pool } from "@/lib/db";
import { NextResponse } from "next/server";
import { buscarLojaAberta } from "@/lib/configuracoesLojaAberta"; 

export async function POST(req: Request) {

    // 👇 checa se a loja está aberta ANTES de processar qualquer coisa
    const lojaAberta = await buscarLojaAberta();

    if (!lojaAberta) {
        return NextResponse.json(
            { erro: "A loja está fechada no momento." },
            { status: 403 }
        );
    }

    const dados = await req.json();

    // Se não veio troco (PIX, Cartão, ou campo vazio), manda null pro banco
    const trocoPara = dados.pagamento.trocoPara
        ? Number(dados.pagamento.trocoPara)
        : null;

    const resultado = await pool.query(`
        INSERT INTO pedidos (
            nome,
            sobrenome,
            telefone,
            tipo_pedido,
            rua,
            numero,
            bairro,
            complemento,
            cidade,
            observacao,
            colher,
            forma_pagamento,
            troco_para,
            frete,
            total
        )
        VALUES (
            $1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15
        )
        RETURNING id
    `, [
        dados.cliente.nome,
        dados.cliente.sobrenome,
        dados.cliente.telefone,
        dados.entrega.tipo,
        dados.entrega.rua,
        dados.entrega.numero,
        dados.entrega.bairro,
        dados.entrega.complemento,
        dados.entrega.cidade,
        dados.cliente.observacao,
        dados.cliente.colher,
        dados.pagamento.forma,
        trocoPara,
        dados.frete,
        dados.total
    ]);

    const pedidoId = resultado.rows[0].id;

    console.log("Pedido criado:", pedidoId);

    for(const item of dados.pedidos) {
        const subtotal = item.preco_unitario * item.quantidade;

        await pool.query(
        `
        INSERT INTO itens_pedido (
            pedido_id,
            categoria,
            nome,
            quantidade,
            observacao,
            quantidades,
            preco_unitario,
            subtotal
        )
        VALUES (
            $1,$2,$3,$4,$5,$6,$7,$8
        )
        `,
        [
            pedidoId,
            item.categoria,
            item.nome,
            item.quantidade,
            item.observacao,
            JSON.stringify(item.quantidades),
            item.preco_unitario,
            subtotal
        ]
        );
    }

    return NextResponse.json({
        sucesso: true
    });
}