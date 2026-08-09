import { bairrosPorCidade, opcoesCidade } from "./data/Bairros";

type Props = {
    cidade: string;
    onSelect: (valor: string) => void;
};

export default function SeletorCidade({ cidade, onSelect }: Props) {
    return (
        <div>
            <label className="text-white/50 text-xs font-medium block mb-2 px-1">
                Sua cidade <span className="text-red-400">*</span>
            </label>
            <div className="grid grid-cols-2 gap-2">
                {opcoesCidade.map((opcao) => {
                    const selecionado = cidade === opcao.valor;
                    return (
                        <button
                            key={opcao.valor}
                            type="button"
                            onClick={() => onSelect(opcao.valor)}
                            className={`
                                py-3 rounded-xl text-sm font-semibold transition border
                                ${selecionado
                                    ? "bg-purple-600 border-purple-500 text-white"
                                    : "bg-[#2b2340] border-transparent text-white/70 hover:bg-[#3a2f5c]"
                                }
                            `}
                        >
                            {opcao.label}
                        </button>
                    );
                })}
            </div>
        </div>
    );
}