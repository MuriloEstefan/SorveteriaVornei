import { PedidoBanco } from "@/types/pedidos";

interface BotaoPagoProps {
    pedido: PedidoBanco;
    marcarPago: (id: number) => void;
}

export default function BotaoPago({ pedido, marcarPago }: BotaoPagoProps) {
    // só aparece em pedidos por pix que ainda não foram confirmados
    if (pedido.forma_pagamento.toLowerCase() !== "pix" || pedido.pago) {
        return null;
    }

    return (
        <button
            onClick={() => marcarPago(pedido.id)}
            className="h-10 px-4 rounded-xl text-sm font-semibold bg-[#6ddc8b] text-[#0e0818] hover:bg-white border border-transparent transition cursor-pointer"
        >
            Confirmar Pagamento
        </button>
    );
}