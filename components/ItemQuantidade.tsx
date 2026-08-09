interface ItemQuantidadeProps {
    nome: string;
    quantidade: number;
    tipo: "sorvete" | "acompanhamento";
    podeAumentar: boolean;
    aumentar: (nome: string, tipo: "sorvete" | "acompanhamento") => void;
    diminuir: (nome: string) => void;
}

export default function ItemQuantidade({
    nome, 
    quantidade,
    tipo, 
    podeAumentar,
    aumentar,
    diminuir,
}: ItemQuantidadeProps) {
    const selecionado = quantidade > 0;
    const bloqueado = !podeAumentar && !selecionado;

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
                    ? "bg-[#3a2f5c] border-purple-500/40"
                    : bloqueado
                        ? "bg-[#2b2340]/50 border-transparent opacity-40"
                        : "bg-[#2b2340] border-transparent hover:border-[#5b5470] hover:bg-[#3a2f5c]"
            }
            `}
        >
            <span className={`text-sm ${
                selecionado
                    ? "text-white font-medium"
                    : bloqueado
                        ? "text-white/30"
                        : "text-white/90"
            }`}>
                {nome}
            </span>

            <div className="flex items-center gap-3">
                <button
                    onClick={() => diminuir(nome)}
                    disabled={quantidade === 0}
                    className="
                        w-10 h-10
                        flex items-center justify-center
                        rounded-full
                        bg-white/10 hover:bg-white/20
                        active:scale-90
                        disabled:opacity-30 disabled:hover:bg-white/10
                        text-white text-lg font-semibold
                        transition
                        cursor-pointer disabled:cursor-not-allowed
                    "
                >
                    −
                </button>

                <span className="text-white w-5 text-center text-base font-semibold">
                    {quantidade}
                </span>

                <button
                    onClick={() => aumentar(nome, tipo)}
                    disabled={!podeAumentar}
                    className="
                        w-10 h-10
                        flex items-center justify-center
                        rounded-full
                        bg-purple-500/20 hover:bg-purple-500/30
                        active:scale-90
                        disabled:opacity-30 disabled:hover:bg-purple-500/20
                        text-purple-200 text-lg font-semibold
                        transition
                        cursor-pointer disabled:cursor-not-allowed
                    "
                >
                    +
                </button>
            </div>
        </div>
    );
}