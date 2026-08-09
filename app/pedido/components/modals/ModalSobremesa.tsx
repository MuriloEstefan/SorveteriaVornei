"use client";

import { ArrowLeft } from "lucide-react";
import { Produto, ItemCarrinho } from "@/types/pedidos";
import { toast } from "react-toastify";
import { buscarConfigSobremesa } from "../../data/sobremesasConfig";
import { useMontagemSobremesa } from "../../hooks/useMontagemSobremesa";
import GrupoOpcoes from "../GrupoOpcoes";
import BotaoAdicionarCarrinho from "../BotaoAdicionarAoCarrinho";

interface ModalSobremesaProps {
    produto: Produto | null;
    fechar: () => void;
    adicionarAoCarrinho: (item: ItemCarrinho) => void;
}

export default function ModalSobremesa({
    produto,
    fechar,
    adicionarAoCarrinho,
}: ModalSobremesaProps) {
    const config = produto ? buscarConfigSobremesa(produto.nome) : null;

    const {
        quantidades,
        selecionarUnico,
        aumentar,
        diminuir,
        limparQuantidades,
        totalPorGrupo,
        totalExtra,
    } = useMontagemSobremesa(config);

    if (!produto) return null;

    const fecharModal = () => {
        limparQuantidades();
        fechar();
    };

    const tentarAdicionar = () => {
        if (config) {
            for (const grupo of config.grupos) {
                if (grupo.obrigatorio && totalPorGrupo(grupo) < grupo.min) {
                    toast.error(
                        `Escolha ${grupo.min > 1 ? `${grupo.min} opções` : "1 opção"} em "${grupo.titulo}".`,
                        { position: "top-center", autoClose: 2500 }
                    );
                    return;
                }
            }
        }

        adicionarAoCarrinho({
            categoria: "Sobremesas",
            nome: produto.nome,
            preco_unitario: produto.preco_unitario + totalExtra,
            quantidade: 1,
            subtotal: (produto.preco_unitario + totalExtra) * 1,
            quantidades,
        });

        toast.success("Item adicionado ao carrinho!", {
            position: "top-center",
            autoClose: 2000,
        });

        limparQuantidades();
        fechar();
    };

    return (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
            <div className="bg-[#1f1933] w-[90%] max-w-md max-h-[85vh] rounded-2xl relative flex flex-col">

                <div className="sticky top-0 z-10 flex items-center gap-3 bg-[#1f1933] border-b border-white/5 px-4 py-4 rounded-t-2xl">
                    <button
                        onClick={fecharModal}
                        className="w-10 h-10 shrink-0 flex items-center justify-center text-white bg-white/10 rounded-full hover:bg-white/20 active:scale-90 transition cursor-pointer"
                    >
                        <ArrowLeft size={22} />
                    </button>

                    <h1 className="text-white font-bold text-lg truncate">
                        {produto.nome}
                    </h1>
                </div>

                <div className="flex-1 overflow-y-auto px-4 pb-4">
                    {config?.grupos.map((grupo) => (
                        <GrupoOpcoes
                            key={grupo.chave}
                            grupo={grupo}
                            quantidades={quantidades}
                            totalSelecionado={totalPorGrupo(grupo)}
                            selecionarUnico={selecionarUnico}
                            aumentar={aumentar}
                            diminuir={diminuir}
                        />
                    ))}
                </div>

                <div className="sticky bottom-0 bg-[#1f1933] border-t border-white/5 p-4 rounded-b-2xl">
                    <BotaoAdicionarCarrinho
                        onClick={tentarAdicionar}
                        preco={produto.preco_unitario + totalExtra}
                        ativado={true}
                    />
                </div>
            </div>
        </div>
    );
}