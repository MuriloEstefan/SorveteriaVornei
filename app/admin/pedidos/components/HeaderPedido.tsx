import { PedidoBanco } from "@/types/pedidos"

interface HeaderPedidoProps {
    pedido: PedidoBanco;
    statusConfig: Record<
        string,
        {
            label: string;
            cor: string;
        }
    >;
}

export default function HeaderPedido({
    pedido,
    statusConfig,
}: HeaderPedidoProps) {
    return(
        <div className="flex items-center justify-between px-5 py-3 bg-[#221a35] border-b border-white/5">
            <div className="flex items-center gap-3">
                <span className="text-white/30 text-xs font-mono">#{pedido.id}</span>
                <span className={`text-xs font-bold px-3 py-1 rounded-full ${statusConfig[pedido.status]?.cor ?? "bg-white/10 text-white"}`}>
                    {statusConfig[pedido.status]?.label ?? pedido.status}
                    </span>
                <span className="text-white/70 text-xs">
                    {pedido.tipo_entrega === "entrega" ? "🛵 Entrega" : "🏪 Retirada"}
                </span>
            </div>

            <div className="text-right">
                <span className="text-[#6ddc8b] font-black text-lg block">
                    R$ {Number(pedido.total).toFixed(2).replace(".", ",")}
                </span>
                {pedido.tipo_entrega === "entrega" && pedido.frete > 0 && (
                    <span className="text-white/40 text-xs">
                        (frete R$ {pedido.frete.toFixed(2).replace(".", ",")})
                    </span>
                )}
            </div>
        </div>
    )

}