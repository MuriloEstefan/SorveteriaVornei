"use client";

import Image from "next/image";
import { X } from "lucide-react";
import { useState } from "react";
import { ItemCarrinho, Produto } from "@/types/pedidos";
import { toast } from "react-toastify";

interface ModalMilkshakeProps {
    produto: Produto | null;
    fechar: () => void;
    adicionarAoCarrinho: (item: ItemCarrinho) => void;
}

export default function ModalMilkshake({
    produto,
    fechar,
    adicionarAoCarrinho,
}: ModalMilkshakeProps) {

    const [observacao, setObservacao] = useState("");
    const [quantidade, setQuantidade] = useState(1);

    const aumentar = () => setQuantidade((q) => q + 1);
    const diminuir = () => setQuantidade((q) => Math.max(1, q - 1));

    if (!produto) return null;

    const precoTotal = produto.preco_unitario * quantidade;

    return (
        <div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-end justify-center z-50"
            onClick={fechar}
        >
            <div
                onClick={(e) => e.stopPropagation()}
                className="bg-[#331b48] rounded-t-3xl w-full max-w-md max-h-[90vh] overflow-y-auto animate-slide-up relative"
            >
                {/* Barrinha de arrastar */}
                <div className="flex justify-center pt-3">
                    <div className="w-12 h-1.5 rounded-full bg-white/15" />
                </div>

                <button
                    onClick={fechar}
                    className="absolute top-4 right-4 w-9 h-9 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition"
                >
                    <X size={18} className="text-white/70" />
                </button>

                {/* Foto circular centralizada */}
                <div className="flex justify-center pt-8 pb-4">
                    <div className="w-44 h-44 rounded-full bg-white/5 overflow-hidden flex items-center justify-center">
                        <Image
                            src={produto.imagem}
                            alt={produto.nome}
                            width={200}
                            height={200}
                            className="w-full h-full object-cover"
                        />
                    </div>
                </div>

                <div className="px-6 pb-6">

                    {/* Nome + descrição, centralizados */}
                    <div className="mb-6 text-center">
                        <h2 className="text-white text-3xl font-bold leading-tight">
                            {produto.nome}
                        </h2>
                        <p className="text-white/50 text-sm mt-3 leading-relaxed">
                            {produto.descricao}
                        </p>
                    </div>

                    {/* Observação como caixa */}
                    <div className="mb-6">
                        <label className="text-white text-base font-semibold block mb-2">
                            Observações
                        </label>
                        <textarea
                            value={observacao}
                            onChange={(e) => setObservacao(e.target.value)}
                            placeholder="Ex: Sem chantilly..."
                            className="
                                w-full
                                h-24
                                bg-white/5
                                rounded-2xl
                                border border-white/10
                                p-4
                                resize-none
                                outline-none
                                text-white
                                text-sm
                                placeholder:text-white/30
                                focus:border-[#a83bc2]
                                transition-colors
                            "
                        />
                    </div>

                    {/* Quantidade */}
                    <div className="flex items-center justify-between bg-white/5 rounded-2xl px-5 py-4 mb-6">
                        <span className="text-white font-semibold text-base">
                            Quantidade
                        </span>

                        <div className="flex items-center gap-4">
                            <button
                                onClick={diminuir}
                                className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 active:scale-90 text-white text-lg font-semibold transition"
                            >
                                −
                            </button>

                            <span className="text-white w-6 text-center text-xl font-bold tabular-nums">
                                {quantidade}
                            </span>

                            <button
                                onClick={aumentar}
                                className="w-9 h-9 rounded-full bg-[#8b2e9e] hover:bg-[#a83bc2] active:scale-90 text-white text-lg font-semibold transition"
                            >
                                +
                            </button>
                        </div>
                    </div>

                    {/* CTA em pílula com gradiente */}
                    <button
                        onClick={() => {
                            adicionarAoCarrinho({
                                categoria: "Milkshakes",
                                nome: produto.nome,
                                preco_unitario: produto.preco_unitario,
                                quantidade,
                                subtotal: precoTotal,
                                quantidades: {},
                                observacao,
                            });

                            toast.success("Item adicionado ao carrinho!", {
                                position: "top-center",
                                autoClose: 2000,
                            });

                            fechar();
                        }}
                        className="
                            w-full
                            bg-gradient-to-r
                            from-[#8b2e9e]
                            to-[#a83bc2]
                            hover:opacity-90
                            active:scale-[0.98]
                            transition-all
                            rounded-full
                            py-4
                            px-6
                            flex
                            items-center
                            justify-between
                            cursor-pointer
                        "
                    >
                        <span className="text-white font-bold text-base">
                            Adicionar ao Carrinho
                        </span>
                        <span className="text-white font-bold text-base">
                            R$ {precoTotal.toFixed(2).replace(".", ",")}
                        </span>
                    </button>

                </div>

            </div>
        </div>
    );
}