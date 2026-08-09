import Image from "next/image";
import { ItemCarrinho, Produto } from "@/types/pedidos";

interface ListaProdutosProps {
    categoria: string;
    produtos: Produto[];
    adicionarAoCarrinho: (item: ItemCarrinho) => void;
    setPedidoSelecionado: (pedido: Produto) => void;
}

export default function ListaProdutos({
    categoria,
    produtos,
    adicionarAoCarrinho,
    setPedidoSelecionado,
}: ListaProdutosProps) {
    return (
        <div className="mt-4 grid grid-cols-2 gap-3">
            {produtos.map((item: Produto) => {

                const esgotado = !item.disponivel;

                return (
                    <div
                        key={item.nome}
                        onClick={() => {
                            if (esgotado) return; // 👈 trava o clique
                            setPedidoSelecionado(item);
                        }}
                        className={`
                            bg-[#2b2340]
                            rounded-2xl
                            overflow-hidden
                            transition-all
                            duration-200
                            ${
                                esgotado
                                    ? "opacity-40 grayscale cursor-not-allowed"
                                    : "cursor-pointer hover:brightness-110"
                            }
                        `}
                    >
                        {/* Imagem */}
                        <div className="bg-[#3a2f5c] flex items-center justify-center py-4 px-3 relative">
                            <Image
                                src={item.imagem}
                                alt={item.nome}
                                width={90}
                                height={90}
                                className="w-20 h-20 object-cover rounded-full"
                            />

                            {esgotado && (
                                <span className="absolute top-2 right-2 bg-red-500/90 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                                    Esgotado
                                </span>
                            )}
                        </div>

                        {/* Informações */}
                        <div className="p-3">
                            <p className="text-white font-bold text-base mb-1">
                                {item.nome}
                            </p>

                            {categoria === "Sorvete + Açaí" && (
                                <p className="text-white/50 text-[11px] leading-snug mb-3">
                                    {item.maxSabores} sabores
                                    <br />
                                    {item.maxAcompanhamentos} acompanhamentos
                                </p>
                            )}

                            {categoria === "Milkshakes" && (
                                <p className="text-white/50 text-[11px] leading-snug mb-3">
                                    300ml
                                </p>
                            )}

                            <p className="text-white font-bold text-sm">
                                R$ {item.preco_unitario.toFixed(2).replace(".", ",")}
                            </p>
                        </div>
                    </div>
                );
            })}
        </div>
    );
}