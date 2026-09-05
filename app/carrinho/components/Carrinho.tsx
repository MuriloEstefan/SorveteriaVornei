"use client";

import { ItemCarrinho } from "@/types/pedidos";
import ListaCarrinho from "./ListaCarrinho"
import TotalCarrinho from "./TotalCarrinho";

type Props = {
    carrinho: ItemCarrinho[];
    removerItem: (index: number) => void;
    finalizarCompra: () => void;
};

export default function Carrinho({
    carrinho,
    removerItem,
    finalizarCompra,
}: Props) {

const totalPedidos = carrinho.reduce((total, item) => {
    return total + item.subtotal;
}, 0);

    return (
        <div className="mt-8 space-y-4">

            {carrinho.length === 0 ? (
                <div className="bg-[#2b2340] p-6 rounded-2xl text-center text-white/70">
                    Seu carrinho está vazio
                </div>
            ) : (

                <ListaCarrinho
                    carrinho={carrinho}
                    removerItem={removerItem}
                />

            )}

            <TotalCarrinho
                carrinho={carrinho}
                totalPedidos={totalPedidos}
                finalizarCompra={finalizarCompra}
            />

        </div>
    );
}