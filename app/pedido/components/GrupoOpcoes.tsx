import { Check } from "lucide-react";
import { GrupoEscolha } from "@/types/sobremesas";

interface GrupoOpcoesProps {
    grupo: GrupoEscolha;
    quantidades: Record<string, number>;
    totalSelecionado: number;
    selecionarUnico: (grupoChave: string, nome: string) => void;
    aumentar: (grupoChave: string, nome: string) => void;
    diminuir: (nome: string) => void;
}

export default function GrupoOpcoes({
    grupo,
    quantidades,
    totalSelecionado,
    selecionarUnico,
    aumentar,
    diminuir,
}: GrupoOpcoesProps) {
    const selecaoUnica = grupo.max === 1;

    return (
        <div className="mt-8 space-y-3">
            <div className="flex items-center justify-between px-1">
                <div>
                    <h2 className="text-white font-semibold text-base">{grupo.titulo}</h2>
                    <p className="text-white/40 text-xs mt-0.5">
                        {selecaoUnica
                            ? "Escolha 1 opção"
                            : `Escolha até ${grupo.max} (pode repetir a mesma opção)`}
                    </p>
                </div>
                <span
                    className={`text-xs font-bold px-2 py-1 rounded-full shrink-0 ${
                        grupo.obrigatorio
                            ? "bg-red-500/15 text-red-300"
                            : "bg-white/10 text-white/50"
                    }`}
                >
                    {grupo.obrigatorio ? "Obrigatório" : "Opcional"}
                </span>
            </div>

            <div className="h-px bg-white/10" />

            {selecaoUnica ? (
                // Grupo de escolha única (ex: Calda) — igual antes, botão de rádio
                <div className="space-y-2">
                    {grupo.opcoes.map((opcao) => {
                        const selecionado = (quantidades[opcao.nome] || 0) > 0;
                        return (
                            <button
                                key={opcao.nome}
                                onClick={() => selecionarUnico(grupo.chave, opcao.nome)}
                                className={`
                                    w-full flex items-center justify-between
                                    px-4 py-3 rounded-2xl border transition text-left cursor-pointer
                                    ${
                                        selecionado
                                            ? "bg-purple-600/20 border-purple-500 text-white"
                                            : "bg-[#2b2340] border-transparent text-white/90 hover:border-[#5b5470] hover:bg-[#3a2f5c]"
                                    }
                                `}
                            >
                                <span className="text-sm">
                                    {opcao.nome}
                                    {opcao.precoAdicional ? (
                                        <span className="text-green-400 text-xs font-semibold ml-2">
                                            +R$ {opcao.precoAdicional.toFixed(2).replace(".", ",")}
                                        </span>
                                    ) : null}
                                </span>

                                <span
                                    className={`w-6 h-6 rounded-full border-2 flex items-center justify-center shrink-0 ${
                                        selecionado ? "bg-purple-500 border-purple-500" : "border-white/20"
                                    }`}
                                >
                                    {selecionado && <Check size={14} className="text-white" />}
                                </span>
                            </button>
                        );
                    })}
                </div>
            ) : (
                // Grupo com mais de 1 opção — contador +/-, permite repetir
                <div className="space-y-2">
                    {grupo.opcoes.map((opcao) => {
                        const quantidade = quantidades[opcao.nome] || 0;
                        const selecionado = quantidade > 0;
                        const podeAumentar = totalSelecionado < grupo.max;

                        return (
                            <div
                                key={opcao.nome}
                                className={`
                                    flex items-center justify-between
                                    px-4 py-3 rounded-2xl border transition
                                    ${
                                        selecionado
                                            ? "bg-[#3a2f5c] border-purple-500/40"
                                            : "bg-[#2b2340] border-transparent"
                                    }
                                `}
                            >
                                <span className={`text-sm ${selecionado ? "text-white font-medium" : "text-white/90"}`}>
                                    {opcao.nome}
                                    {opcao.precoAdicional ? (
                                        <span className="text-green-400 text-xs font-semibold ml-2">
                                            +R$ {opcao.precoAdicional.toFixed(2).replace(".", ",")} cada
                                        </span>
                                    ) : null}
                                </span>

                                <div className="flex items-center gap-3 shrink-0">
                                    <button
                                        onClick={() => diminuir(opcao.nome)}
                                        disabled={quantidade === 0}
                                        className="
                                            w-9 h-9 flex items-center justify-center rounded-full
                                            bg-white/10 hover:bg-white/20 active:scale-90
                                            disabled:opacity-30 disabled:hover:bg-white/10
                                            text-white text-lg font-semibold transition
                                            cursor-pointer disabled:cursor-not-allowed
                                        "
                                    >
                                        −
                                    </button>

                                    <span className="text-white w-4 text-center text-base font-semibold">
                                        {quantidade}
                                    </span>

                                    <button
                                        onClick={() => aumentar(grupo.chave, opcao.nome)}
                                        disabled={!podeAumentar}
                                        className="
                                            w-9 h-9 flex items-center justify-center rounded-full
                                            bg-purple-500/20 hover:bg-purple-500/30 active:scale-90
                                            disabled:opacity-30 disabled:hover:bg-purple-500/20
                                            text-purple-200 text-lg font-semibold transition
                                            cursor-pointer disabled:cursor-not-allowed
                                        "
                                    >
                                        +
                                    </button>
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
}