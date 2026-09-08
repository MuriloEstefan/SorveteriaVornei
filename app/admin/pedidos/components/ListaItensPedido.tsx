import { PedidoBanco } from "@/types/pedidos";
import { agruparItens } from "@/lib/agruparItens";

interface ListaItensPedidoProps {
    pedido: PedidoBanco
}

const ehAcai = (nome: string) => {
    return nome.endsWith("g");
};

// Categorias onde o item tem "sub-escolhas" (sabores, caldas, frutas, etc)
// que precisam ser detalhadas junto com o card.
function temDetalhes(categoria: string, nome: string) {
    return ehAcai(nome) || categoria === "Sobremesas" || categoria === "Açaí no Copo";
}

function nomeExibicao(categoria: string, nome: string) {
    if (categoria === "Milkshakes") {
        return `Milkshake de ${nome}`;
    }
    if (categoria === "Açaí no Copo") {
        const nomeSemPrefixo = nome.replace(/^Açaí\s*/i, "");
        return `Açaí no Copo ${nomeSemPrefixo}`;
    }
    return nome;
}

export default function ListaItensPedido({
    pedido,
}: ListaItensPedidoProps) {
    return(
         <div className="p-5">
            <p className="text-xs text-white/30 uppercase tracking-widest font-bold mb-3">
                Itens do Pedido
            </p>

            <div className="space-y-2">
                {agruparItens(pedido.itens).map((item, index) => (
                    <div key={index} className="bg-[#1f1933] rounded-xl p-3">
                        <div className="flex justify-between items-start mb-2">
                           <div className="flex items-center gap-2">
                                <p className="font-semibold text-sm text-white">
                                    {nomeExibicao(item.categoria, item.nome)}
                                </p>

                                {item.quantidade > 1 && (
                                    <span className="text-xs bg-purple-500/20 text-purple-300 px-2 py-0.5 rounded-full font-semibold">
                                        x{item.quantidade}
                                    </span>
                                )}
                            </div>
                            <p className="text-[#6ddc8b] text-sm font-bold">
                                R$ {Number(item.subtotal).toFixed(2).replace(".", ",")}
                            </p>
                        </div>
                        {temDetalhes(item.categoria, item.nome) && (
                            <div className="flex flex-wrap gap-1">
                                {Object.entries(item.quantidades)
                                    .filter(([_, qtd]) => Number(qtd) > 0)
                                    .map(([nome, qtd]) => (
                                        <span
                                            key={nome}
                                            className="text-xs bg-white/10 text-white/60 px-2 py-0.5 rounded-full"
                                        >
                                            {nome}
                                            {Number(qtd) > 1 && ` x${qtd}`}
                                        </span>
                                    ))}
                            </div>
                        )}
                    </div>
                ))}
            </div>

        </div>
    )
}