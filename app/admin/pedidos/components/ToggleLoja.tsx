"use client";

interface ToggleLojaProps {
    aberta: boolean;
    carregando: boolean;
    onAlternar: () => void;
}

export default function ToggleLoja({ aberta, carregando, onAlternar }: ToggleLojaProps) {
    if (carregando) return null;

    return (
        <button
            onClick={onAlternar}
            className={`
                flex items-center gap-3 px-4 py-2.5 rounded-2xl border transition cursor-pointer
                ${
                    aberta
                        ? "bg-green-500/10 border-green-500/30 hover:bg-green-500/20"
                        : "bg-red-500/10 border-red-500/30 hover:bg-red-500/20"
                }
            `}
        >
            <span
                className={`
                    relative w-11 h-6 rounded-full transition-colors shrink-0
                    ${aberta ? "bg-green-500" : "bg-red-500"}
                `}
            >
                <span
                className={`
                    absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white transition-transform duration-300
                    ${aberta ? "translate-x-5" : "translate-x-0"}
                `}
            />
            </span>

            <span className={`text-sm font-bold ${aberta ? "text-green-400" : "text-red-400"}`}>
                {aberta ? "Loja Aberta" : "Loja Fechada"}
            </span>
        </button>
    );
}