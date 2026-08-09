import { PedidoBanco } from "@/types/pedidos";

interface BotaoStatusProps {
    pedido: PedidoBanco;
    avancarStatus: (
        id: number,
        statusAtual: string,
        telefone: string
    ) => void;
    proximoStatus: Record<string, string>;
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
                                pedido.telefone
                            )
                        }
                         className="h-10 px-4 rounded-xl text-sm font-semibold bg-purple-600 hover:bg-purple-500 border border-transparent transition cursor-pointer"
                    >
                        {pedido.status === "recebido" && "Iniciar Preparo"}
                        {pedido.status === "em_preparo" && "Saiu pra Entrega"}
                        {pedido.status === "saiu_entrega" && "Finalizar Pedido"}
                    </button>
                
            )}
        </>
    );
}