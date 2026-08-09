import { bairrosPorCidade } from "./data/Bairros";

type Props = {
    cidade: string;
    bairro: string;
    onSelect: (label: string, frete: number) => void;
};

export default function SeletorBairro({ cidade, bairro, onSelect }: Props) {
    const bairrosDisponiveis = bairrosPorCidade[cidade] ?? [];

    return (
        <div>
            <label className="text-white/50 text-xs font-medium block mb-2 px-1">
                Bairro <span className="text-red-400">*</span>
            </label>
            <div className="grid grid-cols-2 gap-2 max-h-52 overflow-y-auto pr-1">
                {bairrosDisponiveis.map((opcao) => {
                    const selecionado = bairro === opcao.label;
                    return (
                        <button
                            key={opcao.label}
                            type="button"
                            onClick={() => onSelect(opcao.label, opcao.frete)}
                            className={`
                                py-2.5 px-3 rounded-xl text-sm font-medium text-left
                                transition border leading-tight
                                ${selecionado
                                    ? "bg-purple-600 border-purple-500 text-white"
                                    : "bg-[#2b2340] border-transparent text-white/70 hover:bg-[#3a2f5c]"
                                }
                            `}
                        >
                            {opcao.label}
                            {selecionado && (
                                <span className="block text-xs font-normal opacity-70 mt-0.5">
                                    Frete R$ {opcao.frete.toFixed(2).replace(".", ",")}
                                </span>
                            )}
                        </button>
                    );
                })}
            </div>
        </div>
    );
}