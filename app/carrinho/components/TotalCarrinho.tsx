import { ItemCarrinho } from "@/types/pedidos";
import FecharPedido from "./fecharPedido/FecharPedido";

interface TotalCarrinhoProps {
    carrinho: ItemCarrinho[];
    totalPedidos: number;
}

export default function TotalCarrinho({
    carrinho,
    totalPedidos,
}: TotalCarrinhoProps) {

    return (
        <div className="bg-[#2b2340] rounded-2xl p-5 shadow-lg mt-6">

            <div className="flex items-center justify-between">

                <span className="text-white/50 text-sm">
                    Total do carrinho
                </span>

                <span className="text-2xl font-bold text-white">
                    R$ {totalPedidos.toFixed(2).replace(".", ",")}
                </span>

            </div>

            <FecharPedido
                carrinho={carrinho}
                totalPedidos={totalPedidos}
            />

        </div>
    );

}