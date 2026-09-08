import { PedidoBanco } from "@/types/pedidos";

interface BotaoStatusProps {
    pedido: PedidoBanco;
    avancarStatus: (
        id: number,
        statusAtual: string,
        telefone: string,
        tipoEntrega: string
    ) => void;
    proximoStatus: Record<string, string>;
}

function textoBotao(pedido: PedidoBanco) {
    if (pedido.status === "recebido") {
        return "Iniciar Preparo";
    }

    if (pedido.status === "em_preparo") {
        return pedido.tipo_entrega === "retirada" ? "Pedido Pronto" : "Saiu pra Entrega";
    }

    if (pedido.status === "saiu_entrega") {
        return "Finalizar Pedido";
    }

    return "";
}

export default function BotaoStatus({
    pedido,
    avancarStatus,
    proximoStatus,
}: BotaoStatusProps) {
    return (
        <>
            {proximoStatus[pedido.status] && (
                <button
                    onClick={() =>
                        avancarStatus(
                            pedido.id,
                            pedido.status,
                            pedido.telefone,
                            pedido.tipo_entrega
                        )
                    }
                     className="h-10 px-4 rounded-xl text-sm font-semibold bg-purple-600 hover:bg-purple-500 border border-transparent transition cursor-pointer"
                >
                    {textoBotao(pedido)}
                </button>
            )}
        </>
    );
}