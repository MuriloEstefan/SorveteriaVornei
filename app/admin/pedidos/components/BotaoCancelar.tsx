import { PedidoBanco } from "@/types/pedidos";

interface BotaoCancelarProps {
    pedido: PedidoBanco;
    cancelarPedido: (id: number, telCliente: string) => void;
}

export default function BotaoCancelar({
    pedido,
    cancelarPedido,
}: BotaoCancelarProps) {
    const podeCancelar = pedido.status !== "entregue" && pedido.status !== "cancelado";

    if (!podeCancelar) return null;

    return (
        <button
            onClick={() => cancelarPedido(pedido.id, pedido.telefone)}
            className="h-10 px-4 rounded-xl text-sm font-semibold bg-red-600/10 hover:bg-red-600/20 text-red-400 border border-red-600/30 transition cursor-pointer"
        >
            Cancelar
        </button>
    );
}