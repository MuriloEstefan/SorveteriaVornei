"use client";

import { ArrowLeft, ShoppingBag } from "lucide-react";
import { Produto, ItemCarrinho } from "@/types/pedidos";
import { toast } from "react-toastify";
import { buscarConfigSobremesa } from "../../data/sobremesasConfig";
import { useMontagemSobremesa } from "../../hooks/useMontagemSobremesa";
import GrupoOpcoes from "../GrupoOpcoes";
import { useIngredientesDisponiveis } from "../../hooks/useIngredientesDisponiveis";

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
    const { disponibilidadePorNome } = useIngredientesDisponiveis();

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

    const precoFinal = produto.preco_unitario + totalExtra;

    const tentarAdicionar = () => {
        if (config) {
            for (const grupo of config.grupos) {
                // Checagem 1: min/obrigatório do grupo
                if (grupo.obrigatorio && totalPorGrupo(grupo) < grupo.min) {
                    toast.error(
                        `Escolha ${grupo.min > 1 ? `${grupo.min} opções` : "1 opção"} em "${grupo.titulo}".`,
                        { position: "top-center", autoClose: 2500 }
                    );
                    return;
                }

                // Checagem 2: nenhuma opção selecionada pode estar esgotada
                for (const opcao of grupo.opcoes) {
                    const selecionado = (quantidades[opcao.nome] || 0) > 0;
                    const disponivel = disponibilidadePorNome[opcao.nome] ?? true;
                    if (selecionado && !disponivel) {
                        toast.error(`"${opcao.nome}" esgotou. Escolha outra opção.`, {
                            position: "top-center",
                            autoClose: 2500,
                        });
                        return;
                    }
                }
            }
        }

        adicionarAoCarrinho({
            categoria: "Sobremesas",
            nome: produto.nome,
            preco_unitario: precoFinal,
            quantidade: 1,
            subtotal: precoFinal * 1,
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
            <div className="bg-[#2e1740] w-[90%] max-w-md max-h-[85vh] rounded-2xl relative flex flex-col">

                <div className="sticky top-0 z-10 flex items-center gap-3 bg-[#2e1740] border-b border-white/5 px-4 py-4 rounded-t-2xl">
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
                            disponibilidadePorNome={disponibilidadePorNome}
                            selecionarUnico={selecionarUnico}
                            aumentar={aumentar}
                            diminuir={diminuir}
                        />
                    ))}
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
                            R$ {precoFinal.toFixed(2).replace(".", ",")}
                        </span>
                    </button>
                </div>
            </div>
        </div>
    );
}