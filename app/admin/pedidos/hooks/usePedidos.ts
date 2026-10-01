"use client";

import { useEffect, useState, useRef } from "react";
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
    const idsConhecidos = useRef<Set<string>>(new Set());
    const primeiraCarga = useRef(true);
    const audioRef = useRef<HTMLAudioElement | null>(null);

    const proximoStatus: Record<string, string> = {
        recebido: "em_preparo",
        em_preparo: "saiu_entrega",
        saiu_entrega: "entregue",
    };

    useEffect(() => {
        audioRef.current = new Audio("/sons/notificacao.mp3");
    }, []);

    const buscarPedidos = async () => {
        const resposta = await fetch("/api/admin/pedidos");
        const dados = await resposta.json();

        const pedidosAtivos = dados.filter((p: PedidoBanco) =>
            STATUS_ATIVOS.includes(p.status)
        );

        const idsAtuais = pedidosAtivos.map((p: PedidoBanco) => p.id);
        const temPedidoNovo = idsAtuais.some(
            (id: string) => !idsConhecidos.current.has(id)
        );

        console.log("DEBUG:", {
            idsAtuais,
            idsConhecidosAntes: Array.from(idsConhecidos.current),
            temPedidoNovo,
            primeiraCarga: primeiraCarga.current,
        });

        if (temPedidoNovo && !primeiraCarga.current) {
            console.log("Tentando tocar som...");
            audioRef.current?.play()
                .then(() => console.log("Som tocou!"))
                .catch((err) => console.log("Som bloqueado:", err));
        }

        idsConhecidos.current = new Set(idsAtuais);
        primeiraCarga.current = false;

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

    const avancarStatus = async (id: string, statusAtual: string, telCliente: string, tipoEntrega: string) => {
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

    const cancelarPedido = async (id: string, telCliente: string) => {
        const confirmar = window.confirm("Tem certeza que deseja cancelar esse pedido?");
        if (!confirmar) return;

        await fetch(`/api/admin/pedidos/${id}`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ status: "cancelado" })
        });

        buscarPedidos();
    }

    const marcarPago = async (id: string) => {
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