"use client";

import Image from "next/image";
import { X, ShoppingBag } from "lucide-react";
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
                className="bg-[#331b48] rounded-t-3xl w-full max-w-md max-h-[90vh] overflow-y-auto animate-slide-up"
            >
                {/* Barrinha de arrastar */}
                <div className="flex justify-center pt-3">
                    <div className="w-12 h-1.5 rounded-full bg-white/15" />
                </div>

                <button
                    onClick={fechar}
                    className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full hover:bg-white/10 transition"
                >
                    <X size={18} className="text-white/60" />
                </button>

                {/* Foto em mancha orgânica + etiqueta */}
                <div className="relative flex justify-center pt-4 pb-2">
                    <div className="relative">
                        <div
                            className="w-40 h-40 bg-[#f6efd9] overflow-hidden -rotate-3 shadow-[0_12px_28px_-8px_rgba(139,46,158,0.55)]"
                            style={{ borderRadius: "42% 58% 63% 37% / 41% 44% 56% 59%" }}
                        >
                            <Image
                                src={produto.imagem}
                                alt={produto.nome}
                                width={280}
                                height={280}
                                className="w-full h-full object-cover rotate-3 scale-110"
                            />
                        </div>

                        <span className="absolute -bottom-2 -left-3 rotate-[-6deg] bg-[#f6efd9] text-[#5a2a72] text-xs font-semibold px-3 py-1 rounded-full shadow-md">
                            Milkshake
                        </span>
                    </div>
                </div>

                <div className="px-6 pb-6 pt-4">

                    {/* Nome + descrição, alinhado como rótulo */}
                    <div className="mb-6">
                        <h2
                            className="text-white text-3xl leading-tight"
                            style={{ fontFamily: "'Fredoka', ui-rounded, 'Segoe UI Rounded', sans-serif", fontWeight: 700 }}
                        >
                            {produto.nome}
                        </h2>
                        <p className="text-white/50 text-sm mt-2 leading-relaxed max-w-[38ch]">
                            {produto.descricao}
                        </p>
                    </div>

                    {/* Observação, estilo linha em vez de caixa */}
                    <div className="mb-6">
                        <label className="text-white/70 text-sm font-medium block mb-2">
                            Alguma observação?
                        </label>
                        <textarea
                            value={observacao}
                            onChange={(e) => setObservacao(e.target.value)}
                            placeholder="Ex: sem chantilly, mais chocolate..."
                            className="
                                w-full
                                h-20
                                bg-transparent
                                border-b border-white/15
                                py-2
                                resize-none
                                outline-none
                                text-white
                                text-sm
                                placeholder:text-white/25
                                focus:border-[#a83bc2]
                                transition-colors
                            "
                        />
                    </div>

                    {/* Quantidade */}
                    <div className="flex items-center justify-between mb-7">
                        <span className="text-white/70 font-medium text-sm">
                            Quantidade
                        </span>

                        <div className="flex items-center gap-5">
                            <button
                                onClick={diminuir}
                                className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/15 active:scale-90 text-white text-lg font-semibold transition"
                            >
                                −
                            </button>

                            <span
                                className="text-white w-6 text-center text-2xl tabular-nums"
                                style={{ fontFamily: "'Fredoka', ui-rounded, sans-serif", fontWeight: 600 }}
                            >
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

                    {/* CTA em pílula sólida */}
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
                            bg-[#8b2e9e]
                            hover:bg-[#a83bc2]
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
                        <span className="flex items-center gap-2 text-white font-semibold">
                            <ShoppingBag size={18} />
                            Adicionar
                        </span>
                        <span className="text-white font-bold">
                            R$ {precoTotal.toFixed(2).replace(".", ",")}
                        </span>
                    </button>

                </div>

            </div>
        </div>
    );
}