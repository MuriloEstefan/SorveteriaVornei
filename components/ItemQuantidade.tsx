import { Sparkles } from "lucide-react";

interface ItemQuantidadeProps {
    nome: string;
    quantidade: number;
    tipo: "sorvete" | "acompanhamento";
    podeAumentar: boolean;
    disponivel: boolean; 
    lancamento?: boolean;
    aumentar: (nome: string, tipo: "sorvete" | "acompanhamento") => void;
    diminuir: (nome: string) => void;
}

export default function ItemQuantidade({
    nome, 
    quantidade,
    tipo, 
    podeAumentar,
    disponivel,
    lancamento = false,
    aumentar,
    diminuir,
}: ItemQuantidadeProps) {
    const selecionado = quantidade > 0;
    const bloqueadoPorLimite = !podeAumentar && !selecionado;
    const bloqueado = bloqueadoPorLimite || !disponivel;
    const destacar = lancamento && disponivel;

    return(
        <div
            className={`
            relative overflow-hidden
            flex items-center justify-between
            px-4 py-3
            rounded-2xl
            border
            transition
            ${
                selecionado
                    ? "bg-[#5a2a72] border-[#8b2e9e]/40"
                    : bloqueado
                        ? "bg-[#3d1f52]/50 border-transparent opacity-40"
                        : "bg-[#3d1f52] border-transparent hover:border-[#8b2e9e] hover:bg-[#5a2a72]"
            }
            ${
                destacar && !selecionado
                    ? "ring-1 ring-[#6ddc8b]/40 shadow-[0_0_18px_rgba(109,220,139,0.12)]"
                    : ""
            }
            `}
        >
            {destacar && (
                <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-[#6ddc8b] to-[#8b2e9e]" />
            )}

            <div className="flex flex-col gap-1 min-w-0">
                {destacar && (
                    <span className="inline-flex w-fit items-center gap-1 text-[10px] font-extrabold uppercase tracking-wider text-[#0e0818] bg-gradient-to-r from-[#6ddc8b] to-[#9be8b0] px-2 py-0.5 rounded-full shadow-[0_0_10px_rgba(109,220,139,0.4)]">
                        <Sparkles size={10} />
                        Lançamento
                    </span>
                )}

                <span className={`text-sm flex items-center gap-2 ${
                    selecionado ? "text-white font-medium" : bloqueado ? "text-white/30" : "text-white/90"
                }`}>
                    {nome}
                    {!disponivel && (
                        <span className="text-[10px] bg-red-500/20 text-red-300 px-1.5 py-0.5 rounded-full font-semibold">
                            Esgotado
                        </span>
                    )}
                </span>
            </div>

            <div className="flex items-center gap-3 shrink-0">
                <button
                    onClick={() => diminuir(nome)}
                    disabled={quantidade === 0}
                    className="w-10 h-10 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 active:scale-90 disabled:opacity-30 disabled:hover:bg-white/10 text-white text-lg font-semibold transition cursor-pointer disabled:cursor-not-allowed"
                >
                    −
                </button>

                <span className="text-white w-5 text-center text-base font-semibold">
                    {quantidade}
                </span>

                <button
                    onClick={() => aumentar(nome, tipo)}
                    disabled={!podeAumentar || !disponivel}
                    className="w-10 h-10 flex items-center justify-center rounded-full bg-[#8b2e9e]/20 hover:bg-[#8b2e9e]/30 active:scale-90 disabled:opacity-30 disabled:hover:bg-[#8b2e9e]/20 text-[#d9a8e8] text-lg font-semibold transition cursor-pointer disabled:cursor-not-allowed"
                >
                    +
                </button>
            </div>
        </div>
    );
}