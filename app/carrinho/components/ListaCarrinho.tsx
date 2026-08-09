import { ItemCarrinho } from "@/types/pedidos";
import { agruparItens } from "@/lib/agruparItens";
import CardCarrinho from "./CardCarrinho";

interface ListaCarrinhoProps {
    carrinho: ItemCarrinho[];
    removerItem: (index: number) => void;
}

export default function ListaCarrinho({
    carrinho,
    removerItem,
}: ListaCarrinhoProps) {

    return (
        <>
            {agruparItens(carrinho).map((item, index) => (
                <CardCarrinho
                    key={index}
                    item={item}
                    index={index}
                    removerItem={removerItem}
                />
            ))}
        </>
    );
}