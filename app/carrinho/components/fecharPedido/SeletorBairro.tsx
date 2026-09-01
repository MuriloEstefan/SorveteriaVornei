"use client";

import { useState, useRef, useEffect } from "react";
import { ChevronDown } from "lucide-react";
import { bairrosPorCidade } from "./data/Bairros";

type Props = {
    cidade: string;
    bairro: string;
    onSelect: (label: string, frete: number) => void;
};

export default function SeletorBairro({ cidade, bairro, onSelect }: Props) {
    const [aberto, setAberto] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    const bairrosDisponiveis = bairrosPorCidade[cidade] ?? [];
    const bairroSelecionado = bairrosDisponiveis.find((b) => b.label === bairro);

    // Fecha o dropdown se o cliente clicar fora dele
    useEffect(() => {
        function aoClicarFora(event: MouseEvent) {
            if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
                setAberto(false);
            }
        }

        document.addEventListener("mousedown", aoClicarFora);
        return () => document.removeEventListener("mousedown", aoClicarFora);
    }, []);

    return (
        <div ref={containerRef} className="relative">
            <label className="text-white/50 text-xs font-medium block mb-2 px-1">
                Bairro <span className="text-red-400">*</span>
            </label>

            {/* Caixinha que mostra o bairro selecionado */}
            <button
                type="button"
                onClick={() => setAberto((v) => !v)}
                className="
                    w-full
                    flex
                    items-center
                    justify-between
                    py-3
                    px-4
                    rounded-xl
                    bg-[#2b2340]
                    border border-white/10
                    text-left
                    transition
                    hover:bg-[#3a2f5c]
                "
            >
                <div>
                    {bairroSelecionado ? (
                        <>
                            <span className="text-white text-sm font-medium">
                                {bairroSelecionado.label}
                            </span>
                            <span className="block text-xs text-white/50 mt-0.5">
                                Frete R$ {bairroSelecionado.frete.toFixed(2).replace(".", ",")}
                            </span>
                        </>
                    ) : (
                        <span className="text-white/40 text-sm">
                            Selecione seu bairro
                        </span>
                    )}
                </div>

                <ChevronDown
                    size={18}
                    className={`text-white/50 transition-transform ${aberto ? "rotate-180" : ""}`}
                />
            </button>

            {/* Lista de bairros, só aparece quando aberto */}
            {aberto && (
                <div
                    className="
                        absolute
                        z-20
                        mt-2
                        w-full
                        max-h-60
                        overflow-y-auto
                        bg-[#2b2340]
                        border border-white/10
                        rounded-xl
                        shadow-xl
                        p-1
                    "
                >
                    {bairrosDisponiveis.map((opcao) => {
                        const selecionado = bairro === opcao.label;

                        return (
                            <button
                                key={opcao.label}
                                type="button"
                                onClick={() => {
                                    onSelect(opcao.label, opcao.frete);
                                    setAberto(false);
                                }}
                                className={`
                                    w-full
                                    text-left
                                    py-2.5
                                    px-3
                                    rounded-lg
                                    text-sm
                                    font-medium
                                    transition
                                    ${
                                        selecionado
                                            ? "bg-purple-600 text-white"
                                            : "text-white/70 hover:bg-[#3a2f5c]"
                                    }
                                `}
                            >
                                {opcao.label}
                                <span className="block text-xs font-normal opacity-70 mt-0.5">
                                    Frete R$ {opcao.frete.toFixed(2).replace(".", ",")}
                                </span>
                            </button>
                        );
                    })}
                </div>
            )}
        </div>
    );
}