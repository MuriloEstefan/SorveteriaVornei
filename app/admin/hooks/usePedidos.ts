"use client";

import { useEffect, useState } from "react";
import { PedidoBanco } from "@/types/pedidos";

const STATUS_ATIVOS = ["recebido", "em_preparo", "saiu_entrega"];

export function usePedidos() {

    const [pedidos, setPedidos] = useState<PedidoBanco[]>([]);

    const proximoStatus: Record<string, string> = {
        recebido: "em_preparo",
        em_preparo: "saiu_entrega",
        saiu_entrega: "entregue",
    };

    const mensagemPorStatus: Record<string, string> = {
        em_preparo: "Olá! Seu pedido está sendo preparado. 👩‍🦰",
        saiu_entrega: "Olá! Seu pedido saiu para entrega. 🙏🙏",
    }

    const buscarPedidos = async () => {
        const resposta = await fetch("/api/admin/pedidos");
        const dados = await resposta.json();

        // Segurança extra: mesmo que a API mande tudo, aqui só deixa passar
        // pedidos que ainda estão "vivos" (precisam de alguma ação)
        const pedidosAtivos = dados.filter((p: PedidoBanco) =>
            STATUS_ATIVOS.includes(p.status)
        );

        setPedidos(pedidosAtivos);
    };

    useEffect(() => {
        buscarPedidos();
        const intervalo = setInterval(buscarPedidos, 10000);
        return () => clearInterval(intervalo);
    }, []);

    
    const abrirWhatsAppCliente = (telefone: string, novoStatus: string) => {
        const mensagem = mensagemPorStatus[novoStatus];
        if (!mensagem) return;

        const numeroLimpo = telefone.replace(/\D/g, "");
        const url = `https://wa.me/55${numeroLimpo}?text=${encodeURIComponent(mensagem)}`;
        window.open(url, "_blank");
    }

    const avancarStatus = async (id: number, statusAtual: string, telCliente: string) => {
        const novoStatus = proximoStatus[statusAtual];

        if (!novoStatus) return; //já está em "entregue", não avança mais

        await fetch(`/api/admin/pedidos/${id}`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ status: novoStatus })
        });

        abrirWhatsAppCliente(telCliente, novoStatus);

        buscarPedidos(); //atualiza a tela
    }

    const cancelarPedido = async (id: number, telCliente: string) => {
    const confirmar = window.confirm("Tem certeza que deseja cancelar esse pedido?");
    if (!confirmar) return;

    await fetch(`/api/admin/pedidos/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: "cancelado" })
    });

    buscarPedidos(); // atualiza a tela
}

    return {
        pedidos,
        avancarStatus,
        cancelarPedido,
        proximoStatus
    };
}