import { PedidoBanco } from "@/types/pedidos"

interface DadosClienteProps {
    pedido: PedidoBanco;
}

function formatarCidade(cidade: string) {
    if (cidade === "rafard") return "Rafard";
    if (cidade === "capivari") return "Capivari";
    return cidade;
}

export default function DadosCliente({
    pedido,
}: DadosClienteProps) {
    return (
        <div className="p-5 space-y-3">
            <p className="text-xs text-white/30 uppercase tracking-widest font-bold mb-3">Cliente</p>
            <div>
                <p className="font-bold text-base">{pedido.nome} {pedido.sobrenome}</p>
                <p className="text-white/50 text-sm">{pedido.telefone}</p>
                <p className="text-white/40 text-xs mt-1">
                    Pedido às{" "}
                    {new Date(pedido.criado_em).toLocaleTimeString("pt-BR", {
                        hour: "2-digit",
                        minute: "2-digit",
                    })}
                </p>
            </div>
        
        {pedido.tipo_entrega === "entrega" && (
            <div className="bg-white/5 rounded-xl p-3">
                <p className="text-white/40 text-xs mb-1">Endereço</p>
                <p className="text-white/80 text-sm">{pedido.rua}, {pedido.numero}</p>
                <p className="text-white/80 text-sm">
                    {pedido.bairro}{pedido.complemento ? ` — ${pedido.complemento}` : ""}
                </p>
                <p className="text-white/50 text-xs mt-1">
                    {formatarCidade(pedido.cidade)}
                </p>
            </div>
        )}

        <div className="bg-white/5 rounded-xl p-3">
            <p className="text-white/40 text-xs mb-1">Pagamento</p>
            <p className="text-white/80 text-sm font-semibold">{pedido.forma_pagamento}</p>
            {pedido.troco_para != null && (
                <p className="text-white/50 text-xs mt-1">
                    Troco para R$ {pedido.troco_para.toFixed(2).replace(".", ",")}
                </p>
            )}
        </div>
        
            <div className="flex flex-wrap gap-2">
                {pedido.colher && (
                    <span className="text-xs bg-white/5 text-white/50 px-2 py-1 rounded-lg">🥄 Com colher</span>
                )}
                {pedido.observacao && (
                    <span className="text-xs bg-white/5 text-white/50 px-2 py-1 rounded-lg">📝 {pedido.observacao}</span>
                )}
            </div>
        </div>
    )
}