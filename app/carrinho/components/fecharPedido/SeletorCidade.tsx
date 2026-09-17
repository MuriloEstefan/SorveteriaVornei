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
                                    ? "bg-[#8b2e9e] border-[#a83bc2] text-white"
                                    : "bg-[#3d1f52] border-transparent text-white/70 hover:bg-[#5a2a72]"
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