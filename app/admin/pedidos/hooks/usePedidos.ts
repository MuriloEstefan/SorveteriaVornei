"use client";

import { useEffect, useState } from "react";
import { PedidoBanco } from "@/types/pedidos";

const STATUS_ATIVOS = ["recebido", "em_preparo", "saiu_entrega"];

function montarMensagem(novoStatus: string, tipoEntrega: string): string | null {
    if (novoStatus === "em_preparo") {
        return "Olá! Seu pedido está sendo preparado. 👩‍🍳";
    }

    if (novoStatus === "saiu_entrega") {
        if (tipoEntrega === "retirada") {
            return "Olá! Seu pedido está pronto e já pode ser retirado. 🍦";
        }
        return "Olá! Seu pedido saiu para entrega. 🙏🙏";
    }

    return null;
}

export function usePedidos() {

    const [pedidos, setPedidos] = useState<PedidoBanco[]>([]);

    const proximoStatus: Record<string, string> = {
        recebido: "em_preparo",
        em_preparo: "saiu_entrega",
        saiu_entrega: "entregue",
    };

    const buscarPedidos = async () => {
        const resposta = await fetch("/api/admin/pedidos");
        const dados = await resposta.json();

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

    const abrirWhatsAppCliente = (telefone: string, novoStatus: string, tipoEntrega: string) => {
        const mensagem = montarMensagem(novoStatus, tipoEntrega);
        if (!mensagem) return;

        const numeroLimpo = telefone.replace(/\D/g, "");
        const url = `https://wa.me/55${numeroLimpo}?text=${encodeURIComponent(mensagem)}`;
        window.open(url, "_blank");
    }

    const avancarStatus = async (id: number, statusAtual: string, telCliente: string, tipoEntrega: string) => {
        const novoStatus = proximoStatus[statusAtual];

        if (!novoStatus) return;

        await fetch(`/api/admin/pedidos/${id}`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ status: novoStatus })
        });

        abrirWhatsAppCliente(telCliente, novoStatus, tipoEntrega);

        buscarPedidos();
    }

    const cancelarPedido = async (id: number, telCliente: string) => {
        const confirmar = window.confirm("Tem certeza que deseja cancelar esse pedido?");
        if (!confirmar) return;

        await fetch(`/api/admin/pedidos/${id}`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ status: "cancelado" })
        });

        buscarPedidos();
    }

    const marcarPago = async (id: number) => {
        await fetch(`/api/admin/pedidos/${id}`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ pago: true })
        });

        buscarPedidos();
    }

    return {
        pedidos,
        avancarStatus,
        cancelarPedido,
        marcarPago, 
        proximoStatus
    };
}