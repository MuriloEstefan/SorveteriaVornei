"use client";

import Image from "next/image";
import { X } from "lucide-react";
import { useState } from "react";
import { ItemCarrinho, Produto } from "@/types/pedidos";
import BotaoAdicionarCarrinho from "../BotaoAdicionarAoCarrinho";
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

    const aumentar = () => {
        setQuantidade((q) => q + 1);
    };

    const diminuir = () => {
        setQuantidade((q) => Math.max(1, q - 1));
    };

    if (!produto) return null;

    const precoTotal = produto.preco_unitario * quantidade;

    return (
        <div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-end justify-center z-50"
            onClick={fechar}
        >
            <div
                onClick={(e) => e.stopPropagation()}
                className="bg-[#241b38] rounded-t-3xl w-full max-w-md max-h-[90vh] overflow-y-auto animate-slide-up"
            >
                {/* Barrinha de arrastar */}
                <div className="flex justify-center pt-3">
                    <div className="w-12 h-1.5 rounded-full bg-white/20" />
                </div>

                {/* Botão fechar */}
                <div className="flex justify-end px-5 pt-2">
                    <button
                        onClick={fechar}
                        className="w-9 h-9 flex items-center justify-center rounded-full bg-white/5 hover:bg-white/10 transition"
                    >
                        <X size={18} className="text-white/70" />
                    </button>
                </div>

                {/* Imagem com fundo destacado */}
             {/* Imagem com fundo destacado */}
                <div className="flex justify-center -mt-2 mb-4">
                    <div className="w-36 h-36 rounded-full bg-gradient-to-br from-purple-600/30 to-purple-900/30 overflow-hidden ring-1 ring-white/10">
                        <Image
                            src={produto.imagem}
                            alt={produto.nome}
                            width={280}
                            height={280}
                            className="w-full h-full object-cover scale-100"
                        />
                    </div>
                </div>

                <div className="px-6 pb-6">

                    {/* Nome + descrição */}
                    <div className="text-center mb-6">
                        <h2 className="text-2xl font-bold text-white">
                            {produto.nome}
                        </h2>
                        <p className="text-white/50 text-sm mt-2 leading-relaxed">
                            {produto.descricao}
                        </p>
                    </div>

                    {/* Observação */}
                    <div className="mb-5">
                        <label className="text-white/80 text-sm font-semibold block mb-2">
                            Observações
                        </label>

                        <textarea
                            value={observacao}
                            onChange={(e) => setObservacao(e.target.value)}
                            placeholder="Ex: Sem chantilly..."
                            className="
                                w-full
                                h-24
                                rounded-xl
                                bg-white/5
                                border border-white/10
                                p-3
                                resize-none
                                outline-none
                                text-white
                                text-sm
                                placeholder:text-white/30
                                focus:border-purple-500/50
                                transition
                            "
                        />
                    </div>

                    {/* Quantidade */}
                    <div className="flex items-center justify-between mb-6 bg-white/5 rounded-2xl px-4 py-3">

                        <span className="text-white/80 font-semibold text-sm">
                            Quantidade
                        </span>

                        <div className="flex items-center gap-4">

                            <button
                                onClick={diminuir}
                                className="
                                    w-9
                                    h-9
                                    rounded-full
                                    bg-white/10
                                    text-lg
                                    font-semibold
                                    text-white
                                    hover:bg-white/20
                                    active:scale-95
                                    transition
                                "
                            >
                                −
                            </button>

                            <span className="text-lg font-bold w-5 text-center text-white">
                                {quantidade}
                            </span>

                            <button
                                onClick={aumentar}
                                className="
                                    w-9
                                    h-9
                                    rounded-full
                                    bg-purple-600
                                    text-lg
                                    font-semibold
                                    text-white
                                    hover:bg-purple-500
                                    active:scale-95
                                    transition
                                "
                            >
                                +
                            </button>

                        </div>

                    </div>

                    <BotaoAdicionarCarrinho
                        onClick={() => {
                            adicionarAoCarrinho({
                                categoria: "Milkshakes",
                                nome: produto.nome,
                                preco_unitario: produto.preco_unitario,
                                quantidade,
                                subtotal: produto.preco_unitario * quantidade,
                                quantidades: {},
                                observacao,
                            });

                        toast.success("Item adicionado ao carrinho!", {
                            position: "top-center",
                            autoClose: 2000,
                        });

                            fechar();
                        }}
                        preco={precoTotal}
                        ativado={true}
                    />

                </div>

            </div>
        </div>
    );
}