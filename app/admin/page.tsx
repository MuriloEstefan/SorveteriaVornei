"use client";

import { usePedidos } from "./pedidos/hooks/usePedidos";
import CardPedido from "./pedidos/components/CardPedido";
import { useLojaStatus } from "./pedidos/hooks/useLojaStatus";
import ToggleLoja from "./pedidos/components/ToggleLoja";

const statusConfig: Record<string, { label: string; cor: string }> = {
    recebido:     { label: "Recebido",        cor: "bg-yellow-500/20 text-yellow-400 border border-yellow-500/30" },
    em_preparo:   { label: "Em Preparo",      cor: "bg-blue-500/20 text-blue-400 border border-blue-500/30" },
    saiu_entrega: { label: "Saiu p/ Entrega", cor: "bg-purple-500/20 text-purple-400 border border-purple-500/30" },
    entregue:     { label: "Entregue",        cor: "bg-green-500/20 text-green-400 border border-green-500/30" },
};


export default function AdminPage() {
    const {
        pedidos, 
        avancarStatus,
        cancelarPedido,
        marcarPago,
        proximoStatus 
    } = usePedidos();

    const { aberta, carregando, alternar } = useLojaStatus();

    return (
        <div className="text-white">

            {/* Cabeçalho */}
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-3xl font-black">Painel Admin</h1>
                    <p className="text-white/30 text-sm mt-1">{pedidos.length} pedidos</p>
                </div>

                <ToggleLoja aberta={aberta} carregando={carregando} onAlternar={alternar} />
            </div>

            {/* Lista de pedidos */}
            <div className="space-y-4">
                {pedidos.map((pedido) => (
                    <CardPedido
                        key={pedido.id}
                        pedido={pedido}
                        avancarStatus={avancarStatus}
                        cancelarPedido={cancelarPedido}
                        marcarPago={marcarPago}
                        proximoStatus={proximoStatus}
                        statusConfig={statusConfig}
                    />
                ))}
            </div>
        </div>
    );
}