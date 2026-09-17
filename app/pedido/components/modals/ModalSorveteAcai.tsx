"use client";

import { useState } from "react";
import { ArrowLeft, ShoppingBag } from "lucide-react";
import { Props } from "@/types/pedidos";
import { toast } from "react-toastify";
import { sabores } from "../../data/sabores";
import { acompanhamentos } from "../../data/acompanhamentos";
import ListaItens from "../ListaItens";
import { useMontagemPedido } from "../../hooks/useMontagemPedido";
import { useIngredientesDisponiveis } from "../../hooks/useIngredientesDisponiveis";

export default function ModalSorveteAcai({pedido, fechar, adicionarAoCarrinho}: Props) {
    
    const { disponibilidadePorNome } = useIngredientesDisponiveis();

    const {
        quantidades,
        aumentar,
        diminuir,
        limparQuantidades
    } = useMontagemPedido(pedido!);

    const [avisos, setAvisos] = useState<string[]>([]);

    if (!pedido) return null;

    const fecharModal = () => {
        limparQuantidades();
        fechar();
    };

    const totalSabores = sabores.reduce(
        (acc, nome) => acc + (quantidades[nome] || 0), 0
    );
    const totalAcompanhamentos = acompanhamentos.reduce(
        (acc, nome) => acc + (quantidades[nome] || 0), 0
    );

    const finalizarPedido = () => {
        adicionarAoCarrinho({
            categoria: "Sorvete + Açaí",
            nome: `${pedido.nome}`,
            preco_unitario: pedido.preco_unitario,
            subtotal: pedido.preco_unitario,
            quantidade: 1,
            quantidades: quantidades
        });

        toast.success("Item adicionado ao carrinho!", {
            position: "top-center",
            autoClose: 2000,
        });

        limparQuantidades();
        fechar();
    };

    const tentarAdicionar = () => {
        if (totalSabores === 0) {
            toast.error("Escolha pelo menos 1 sabor antes de continuar.", {
                position: "top-center",
                autoClose: 2500,
            });
            return;
        }

        const novosAvisos: string[] = [];

        if (totalSabores < pedido.maxSabores) {
            novosAvisos.push(
                `Você pode escolher até ${pedido.maxSabores} sabores, mas selecionou apenas ${totalSabores}.`
            );
        }

        if (totalAcompanhamentos === 0) {
            novosAvisos.push("Você não escolheu nenhum acompanhamento.");
        } else if (totalAcompanhamentos < pedido.maxAcompanhamentos) {
            novosAvisos.push(
                `Você pode escolher até ${pedido.maxAcompanhamentos} acompanhamentos, mas selecionou apenas ${totalAcompanhamentos}.`
            );
        }

        if (novosAvisos.length > 0) {
            setAvisos(novosAvisos);
            return;
        }

        finalizarPedido();
    };

    return(
       <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
         <div className="bg-[#2e1740] w-[90%] max-w-md max-h-[85vh] rounded-2xl relative flex flex-col">

            <div className="sticky top-0 z-10 flex items-center gap-3 bg-[#2e1740] border-b border-white/5 px-4 py-4 rounded-t-2xl">
                <button
                    onClick={fecharModal}
                    className="
                        w-10 h-10 shrink-0
                        flex items-center justify-center
                        text-white bg-white/10
                        rounded-full
                        hover:bg-white/20
                        active:scale-90
                        transition
                        cursor-pointer
                    "
                >
                    <ArrowLeft size={22} />
                </button>

                <h1 className="text-white font-bold text-lg truncate">
                    {pedido.nome}
                </h1>
            </div>

            <div className="flex-1 overflow-y-auto px-4 pb-4">
                <ListaItens
                    titulo="Sabores"
                    lista={sabores}
                    tipo="sorvete"
                    quantidades={quantidades}
                    maxItens={pedido.maxSabores}
                    disponibilidadePorNome={disponibilidadePorNome}
                    aumentar={aumentar}
                    diminuir={diminuir}
                />

                <ListaItens
                    titulo="Acompanhamentos"
                    lista={acompanhamentos}
                    tipo="acompanhamento"
                    quantidades={quantidades}
                    maxItens={pedido.maxAcompanhamentos}
                    disponibilidadePorNome={disponibilidadePorNome}
                    aumentar={aumentar}
                    diminuir={diminuir}
                />
            </div>

            <div className="sticky bottom-0 bg-[#2e1740] border-t border-white/5 p-4 rounded-b-2xl">
                <button
                    onClick={tentarAdicionar}
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
                        R$ {pedido.preco_unitario.toFixed(2).replace(".", ",")}
                    </span>
                </button>
            </div>

            {avisos.length > 0 && (
                <div className="absolute inset-0 bg-black/70 rounded-2xl flex items-center justify-center p-6 z-20">
                    <div className="bg-[#3d1f52] rounded-2xl p-5 w-full max-w-sm border border-white/10">
                        <p className="text-white font-semibold text-base mb-2">
                            Pedido incompleto
                        </p>

                        <div className="space-y-1 mb-5">
                            {avisos.map((aviso, i) => (
                                <p key={i} className="text-white/60 text-sm">
                                    {aviso}
                                </p>
                            ))}
                        </div>

                        <p className="text-white/80 text-sm mb-4">
                            Deseja continuar mesmo assim?
                        </p>

                        <div className="flex gap-3">
                            <button
                                onClick={() => setAvisos([])}
                                className="
                                    flex-1 py-3 rounded-xl
                                    bg-white/10 hover:bg-white/20
                                    text-white text-sm font-semibold
                                    transition cursor-pointer
                                "
                            >
                                Não, voltar
                            </button>

                            <button
                                onClick={finalizarPedido}
                                className="
                                    flex-1 py-3 rounded-xl
                                    bg-[#8b2e9e] hover:bg-[#a83bc2]
                                    text-white text-sm font-semibold
                                    transition cursor-pointer
                                "
                            >
                                Sim, continuar
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    </div>
    )
}