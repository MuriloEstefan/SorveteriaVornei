import { PedidoCompleto } from "@/types/pedidos";

export async function finalizarPedido(dados: PedidoCompleto) {
    const resposta = await fetch("/api/pedidos", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(dados),
    });

    return await resposta.json();
}