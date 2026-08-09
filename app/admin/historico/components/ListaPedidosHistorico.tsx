"use client";

import { PedidoResumoHistorico } from "@/types/pedidos";

interface ListaPedidosHistoricoProps {
    pedidos: PedidoResumoHistorico[];
    carregando: boolean;
    onSelecionar: (id: number) => void;
}

function formatarMoeda(valor: number) {
    return `R$ ${valor.toFixed(2).replace(".", ",")}`;
}

function formatarData(dataStr: string) {
    const data = new Date(dataStr);
    return data.toLocaleString("pt-BR", {
        day: "2-digit", month: "2-digit", year: "numeric",
        hour: "2-digit", minute: "2-digit",
    });
}

export default function ListaPedidosHistorico({
    pedidos, carregando, onSelecionar,
}: ListaPedidosHistoricoProps) {
    if (carregando) {
        return <p className="text-zinc-400">Carregando pedidos...</p>;
    }

    if (pedidos.length === 0) {
        return <p className="text-zinc-400">Nenhum pedido encontrado nesse período.</p>;
    }

    return (
        <section className="space-y-4">
            {pedidos.map((pedido) => {
                const finalizado = pedido.status === "entregue";

                return (
                    <div
                        key={pedido.id}
                        onClick={() => onSelecionar(pedido.id)}
                        className="rounded-xl bg-[#241C36] p-5 border border-zinc-800 cursor-pointer hover:brightness-110 transition"
                    >
                        <div className="flex items-center justify-between">
                            <div>
                                <h2 className="text-xl font-bold text-white">Pedido #{pedido.id}</h2>
                                <p className="text-zinc-400">{pedido.nome} {pedido.sobrenome}</p>
                                <p className="text-sm text-zinc-500">{formatarData(pedido.criado_em)}</p>
                            </div>

                            <div className="text-right">
                                <span
                                    className={`rounded-full px-3 py-1 text-sm font-medium ${
                                        finalizado
                                            ? "bg-green-500/20 text-green-400"
                                            : "bg-red-500/20 text-red-400"
                                    }`}
                                >
                                    {finalizado ? "Finalizado" : "Cancelado"}
                                </span>
                                <h2 className="mt-3 text-2xl font-bold text-emerald-400">
                                    {formatarMoeda(pedido.total)}
                                </h2>
                            </div>
                        </div>
                    </div>
                );
            })}
        </section>
    );
}