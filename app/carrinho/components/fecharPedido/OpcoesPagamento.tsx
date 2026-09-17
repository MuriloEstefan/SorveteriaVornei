import { QrCode, CreditCard, Banknote, Check } from "lucide-react";

const opcoes = [
    { nome: "PIX", icone: QrCode },
    { nome: "Cartão", icone: CreditCard },
    { nome: "Dinheiro", icone: Banknote },
];

type Props = {
    formaPagamento: string;
    setFormaPagamento: (forma: string) => void;
};

export default function OpcoesPagamento({ formaPagamento, setFormaPagamento }: Props) {
    return (
        <div className="space-y-3">
            {opcoes.map((opcao) => {
                const Icone = opcao.icone;
                const selecionado = formaPagamento === opcao.nome;

                return (
                    <button
                        key={opcao.nome}
                        onClick={() => setFormaPagamento(opcao.nome)}
                        className={`
                            w-full flex items-center justify-between
                            rounded-2xl p-4 border transition text-white
                           ${selecionado
                                ? "bg-[#8b2e9e]/20 border-[#8b2e9e]"
                                : "bg-white/5 border-white/10 hover:bg-white/10"
                            }
                        `}
                    >
                        <div className="flex items-center gap-3">
                            <div className={`
                                w-10 h-10 rounded-full flex items-center justify-center transition
                                ${selecionado ? "bg-[#8b2e9e]" : "bg-white/10"}
                            `}>
                                <Icone size={18} className="text-white" />
                            </div>
                            <span className="font-semibold">{opcao.nome}</span>
                        </div>

                        {selecionado && (
                            <div className="w-6 h-6 rounded-full bg-[#8b2e9e] flex items-center justify-center">
                                <Check size={14} className="text-white" />
                            </div>
                        )}
                    </button>
                );
            })}
        </div>
    );
}