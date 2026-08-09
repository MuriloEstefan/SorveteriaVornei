"use client";

import { PeriodoAtalho } from "../hooks/useFaturamento";

interface FiltroPeriodoProps {
    periodo: PeriodoAtalho;
    setPeriodo: (p: PeriodoAtalho) => void;

    dataInicioCustom: string;
    setDataInicioCustom: (v: string) => void;

    dataFimCustom: string;
    setDataFimCustom: (v: string) => void;
}

const atalhos: { label: string; valor: PeriodoAtalho }[] = [
    { label: "Hoje", valor: "hoje" },
    { label: "Semana", valor: "semana" },
    { label: "Mês", valor: "mes" },
];

export default function FiltroPeriodo({
    periodo,
    setPeriodo,
    dataInicioCustom,
    setDataInicioCustom,
    dataFimCustom,
    setDataFimCustom,
}: FiltroPeriodoProps) {
    return (
        <div className="flex flex-wrap items-center gap-3">

            {atalhos.map((atalho) => (
                <button
                    key={atalho.valor}
                    onClick={() => setPeriodo(atalho.valor)}
                    className={`
                        px-4 py-2 rounded-xl text-sm font-semibold transition
                        ${
                            periodo === atalho.valor
                                ? "bg-purple-600 text-white"
                                : "bg-white/5 text-white/60 hover:bg-white/10"
                        }
                    `}
                >
                    {atalho.label}
                </button>
            ))}

            <button
                onClick={() => setPeriodo("personalizado")}
                className={`
                    px-4 py-2 rounded-xl text-sm font-semibold transition
                    ${
                        periodo === "personalizado"
                            ? "bg-purple-600 text-white"
                            : "bg-white/5 text-white/60 hover:bg-white/10"
                    }
                `}
            >
                📅 Personalizado
            </button>

            {periodo === "personalizado" && (
                <div className="flex items-center gap-2">
                    <input
                        type="date"
                        value={dataInicioCustom}
                        onChange={(e) => setDataInicioCustom(e.target.value)}
                        className="bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-white text-sm outline-none"
                    />
                    <span className="text-white/40 text-sm">até</span>
                    <input
                        type="date"
                        value={dataFimCustom}
                        onChange={(e) => setDataFimCustom(e.target.value)}
                        className="bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-white text-sm outline-none"
                    />
                </div>
            )}

        </div>
    );
}