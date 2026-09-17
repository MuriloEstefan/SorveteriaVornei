interface ItemQuantidadeProps {
    nome: string;
    quantidade: number;
    tipo: "sorvete" | "acompanhamento";
    podeAumentar: boolean;
    disponivel: boolean; 
    aumentar: (nome: string, tipo: "sorvete" | "acompanhamento") => void;
    diminuir: (nome: string) => void;
}

export default function ItemQuantidade({
    nome, 
    quantidade,
    tipo, 
    podeAumentar,
    disponivel,
    aumentar,
    diminuir,
}: ItemQuantidadeProps) {
    const selecionado = quantidade > 0;
    const bloqueadoPorLimite = !podeAumentar && !selecionado;
    const bloqueado = bloqueadoPorLimite || !disponivel;

    return(
        <div
            className={`
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
            `}
        >
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

            <div className="flex items-center gap-3">
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