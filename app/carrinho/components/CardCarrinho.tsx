import { Trash2 } from "lucide-react";
import { ItemCarrinho } from "@/types/pedidos";

interface CardCarrinhoProps {
    item: ItemCarrinho & {
        quantidade: number;
    };

    index: number;

    removerItem: (index: number) => void;
}

const ehAcai = (nome: string) => {
    return nome.endsWith("g");
};

function temDetalhes(categoria: string, nome: string) {
    return ehAcai(nome) || categoria === "Sobremesas" || categoria === "Açaí no Copo";
}

function nomeExibicao(categoria: string, nome: string) {
    if (categoria === "Milkshakes") {
        return `Milkshake de ${nome}`;
    }
    if (categoria === "Sorvete + Açaí") {
        return `Sorvete/Açaí ${nome}`;
    }
    if (categoria === "Açaí no Copo") {
        const nomeSemPrefixo = nome.replace(/^Açaí\s*/i, "");
        return `Açaí no Copo ${nomeSemPrefixo}`;
    }
    return nome;
}

export default function CardCarrinho({
    item,
    index,
    removerItem,
}: CardCarrinhoProps) {
    return (
        <div className="bg-[#2b2340] rounded-2xl p-4 shadow-lg">

            <h3 className="text-lg font-bold text-white">
                {nomeExibicao(item.categoria, item.nome)}

                {item.quantidade > 1 && ` x${item.quantidade}`}
            </h3>

            {temDetalhes(item.categoria, item.nome) && (
                <div className="mt-3 flex flex-wrap gap-1.5">
                    {Object.entries(item.quantidades)
                        .filter(([_, quantidade]) => quantidade > 0)
                        .map(([nome, quantidade]) => (
                            <span
                                key={nome}
                                className="text-xs bg-white/10 text-white/70 px-2.5 py-1 rounded-full"
                            >
                                {nome}
                                {quantidade > 1 && (
                                    <span className="text-purple-300 font-semibold"> x{quantidade}</span>
                                )}
                            </span>
                        ))}
                </div>
            )}
            {item.observacao && (
                <div className="mt-3 border-l-2 border-purple-500 pl-3">
                    <p className="text-xs font-semibold text-purple-300 uppercase">
                        Observação
                    </p>

                    <p className="text-sm text-white/80 italic">
                        {item.observacao}
                    </p>
                </div>
            )}

            <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between">

                <span className="text-white font-semibold text-lg">
                    R$ {item.subtotal.toFixed(2).replace(".", ",")}
                </span>

                <button
                    onClick={() => removerItem(index)}
                    className="
                    w-9
                    h-9
                    rounded-xl
                    bg-[#221a35]
                    hover:bg-red-500/10
                    border
                    border-white/5
                    hover:border-red-500/20
                    flex
                    items-center
                    justify-center
                    transition-all
                    duration-200
                    cursor-pointer
                    "
                >
                    <Trash2
                        size={16}
                        className="text-white/60 hover:text-red-400"
                    />
                </button>

            </div>

        </div>
    );
}