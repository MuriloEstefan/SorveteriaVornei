import { PedidoBanco } from "@/types/pedidos";
import { toast } from "react-toastify";

interface BotaoStatusProps {
    pedido: PedidoBanco;
    avancarStatus: (
        id: string,
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

function precisaConfirmarPagamento(pedido: PedidoBanco) {
    const formaPagamentoNormalizada = pedido.forma_pagamento?.toLowerCase();
    const estaPago = pedido.pago === true || String(pedido.pago) === "true";

    return (
       pedido.status === "saiu_entrega" &&
       formaPagamentoNormalizada === "pix" &&
       !estaPago
    );
}

export default function BotaoStatus({
    pedido,
    avancarStatus,
    proximoStatus,
}: BotaoStatusProps) {
    const bloqueado = precisaConfirmarPagamento(pedido);

    return (
        <>
            {proximoStatus[pedido.status] && (
                <button
                    onClick={() => {
                        if (bloqueado) {
                            toast.error("Confirme o pagamento do Pix antes de finalizar o pedido");
                            return;
                        }

                        avancarStatus(
                            pedido.id,
                            pedido.status,
                            pedido.telefone,
                            pedido.tipo_entrega
                        );
                    }}
                    disabled={bloqueado}
                    title={bloqueado ? "Confirme o pagamento antes de finalizar" : undefined}
                    className={`h-10 px-4 rounded-xl text-sm font-semibold border border-transparent transition ${
                        bloqueado
                            ? "bg-purple-600/30 text-white/40 cursor-not-allowed"
                            : "bg-purple-600 hover:bg-purple-500 cursor-pointer"
                    }`}
                >
                    {textoBotao(pedido)}
                </button>
            )}
        </>
    );
}