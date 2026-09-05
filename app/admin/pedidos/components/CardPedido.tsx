import { PedidoBanco } from "@/types/pedidos";
import HeaderPedido from "./HeaderPedido";
import DadosCliente from "./DadosCliente";
import ListaItensPedido from "./ListaItensPedido";
import BotaoStatus from "./BotaoStatus";
import BotaoCancelar from "./BotaoCancelar";
import BotaoPago from "./BotaoPago";

interface CardPedidoProps {
    pedido: PedidoBanco;
    avancarStatus: (
        id: number,
        statusAtual: string,
        telefone: string
    ) => void;
    cancelarPedido: (id: number, telCliente: string) => void;
    marcarPago: (id: number) => void;
    proximoStatus: Record<string, string>;
    statusConfig: Record<
        string,
        {
            label: string;
            cor: string;
        }
    >;
}

export default function CardPedido({
    pedido,
    avancarStatus,
    cancelarPedido,
    marcarPago,
    proximoStatus,
    statusConfig,
}: CardPedidoProps) {
    return (
        <div className="bg-[#2b2340] rounded-2xl border border-white/5 overflow-hidden">

            <HeaderPedido
                pedido={pedido}
                statusConfig={statusConfig}
            />

            <div className="grid grid-cols-2 divide-x divide-white/5">

                <DadosCliente
                    pedido={pedido}
                />

                <ListaItensPedido
                    pedido={pedido}
                />

            </div>

            <div className="flex gap-3 px-5 py-3 border-t border-white/5">
                <BotaoStatus
                    pedido={pedido}
                    avancarStatus={avancarStatus}
                    proximoStatus={proximoStatus}
                />

                <BotaoPago 
                    pedido={pedido} 
                    marcarPago={marcarPago} 
                />

                <BotaoCancelar
                    pedido={pedido}
                    cancelarPedido={cancelarPedido}
                />
            </div>

        </div>
    );
}