import { Check } from "lucide-react";
import { GrupoEscolha } from "@/types/sobremesas";

interface GrupoOpcoesProps {
    grupo: GrupoEscolha;
    quantidades: Record<string, number>;
    totalSelecionado: number;
    disponibilidadePorNome: Record<string, boolean>;
    selecionarUnico: (grupoChave: string, nome: string) => void;
    aumentar: (grupoChave: string, nome: string) => void;
    diminuir: (nome: string) => void;
}

export default function GrupoOpcoes({
    grupo,
    quantidades,
    totalSelecionado,
    disponibilidadePorNome,
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
                <div className="space-y-2">
                    {grupo.opcoes.map((opcao) => {
                        const selecionado = (quantidades[opcao.nome] || 0) > 0;
                        const disponivel = disponibilidadePorNome[opcao.nome] ?? true;
                        const bloqueado = !disponivel;

                        return (
                            <button
                                key={opcao.nome}
                                onClick={() => !bloqueado && selecionarUnico(grupo.chave, opcao.nome)}
                                disabled={bloqueado}
                                className={`
                                    w-full flex items-center justify-between
                                    px-4 py-3 rounded-2xl border transition text-left
                                    ${
                                        selecionado
                                            ? "bg-[#8b2e9e]/20 border-[#8b2e9e] text-white"
                                            : bloqueado
                                                ? "bg-[#3d1f52]/50 border-transparent text-white/30 opacity-40 cursor-not-allowed"
                                                : "bg-[#3d1f52] border-transparent text-white/90 hover:border-[#8b2e9e] hover:bg-[#5a2a72] cursor-pointer"
                                    }
                                `}
                            >
                                <span className="text-sm flex items-center gap-2">
                                    {opcao.nome}
                                    {!disponivel && (
                                        <span className="text-[10px] bg-red-500/20 text-red-300 px-1.5 py-0.5 rounded-full font-semibold">
                                            Esgotado
                                        </span>
                                    )}
                                    {opcao.precoAdicional ? (
                                        <span className="text-green-400 text-xs font-semibold">
                                            +R$ {opcao.precoAdicional.toFixed(2).replace(".", ",")}
                                        </span>
                                    ) : null}
                                </span>

                                <span
                                    className={`w-6 h-6 rounded-full border-2 flex items-center justify-center shrink-0 ${
                                        selecionado ? "bg-[#8b2e9e] border-[#8b2e9e]" : "border-white/20"
                                    }`}
                                >
                                    {selecionado && <Check size={14} className="text-white" />}
                                </span>
                            </button>
                        );
                    })}
                </div>
            ) : (
                <div className="space-y-2">
                    {grupo.opcoes.map((opcao) => {
                        const quantidade = quantidades[opcao.nome] || 0;
                        const selecionado = quantidade > 0;
                        const disponivel = disponibilidadePorNome[opcao.nome] ?? true;
                        const podeAumentar = totalSelecionado < grupo.max && disponivel;
                        const bloqueado = !disponivel;

                        return (
                            <div
                                key={opcao.nome}
                                className={`
                                    flex items-center justify-between
                                    px-4 py-3 rounded-2xl border transition
                                    ${
                                        selecionado
                                            ? "bg-[#5a2a72] border-[#8b2e9e]/40"
                                            : bloqueado
                                                ? "bg-[#3d1f52]/50 border-transparent opacity-40"
                                                : "bg-[#3d1f52] border-transparent"
                                    }
                                `}
                            >
                                <span className={`text-sm flex items-center gap-2 ${selecionado ? "text-white font-medium" : "text-white/90"}`}>
                                    {opcao.nome}
                                    {!disponivel && (
                                        <span className="text-[10px] bg-red-500/20 text-red-300 px-1.5 py-0.5 rounded-full font-semibold">
                                            Esgotado
                                        </span>
                                    )}
                                    {opcao.precoAdicional ? (
                                        <span className="text-green-400 text-xs font-semibold">
                                            +R$ {opcao.precoAdicional.toFixed(2).replace(".", ",")} cada
                                        </span>
                                    ) : null}
                                </span>

                                <div className="flex items-center gap-3 shrink-0">
                                    <button
                                        onClick={() => diminuir(opcao.nome)}
                                        disabled={quantidade === 0}
                                        className="w-9 h-9 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 active:scale-90 disabled:opacity-30 disabled:hover:bg-white/10 text-white text-lg font-semibold transition cursor-pointer disabled:cursor-not-allowed"
                                    >
                                        −
                                    </button>

                                    <span className="text-white w-4 text-center text-base font-semibold">
                                        {quantidade}
                                    </span>

                                    <button
                                        onClick={() => aumentar(grupo.chave, opcao.nome)}
                                        disabled={!podeAumentar}
                                        className="w-9 h-9 flex items-center justify-center rounded-full bg-[#8b2e9e]/20 hover:bg-[#8b2e9e]/30 active:scale-90 disabled:opacity-30 disabled:hover:bg-[#8b2e9e]/20 text-[#d9a8e8] text-lg font-semibold transition cursor-pointer disabled:cursor-not-allowed"
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