function formatarMoeda(valor: number) {
    return `R$ ${valor.toFixed(2).replace(".", ",")}`;
}

type Props = {
    totalPedidos: number;
    frete: number;
    tipoEntrega: string;
};

export default function ResumoTotal({ totalPedidos, frete, tipoEntrega }: Props) {
    const totalComFrete = totalPedidos + frete;

    return (
        <div className="bg-white/5 rounded-2xl p-4 space-y-2">
            <div className="flex justify-between text-sm text-white/60">
                <span>Subtotal</span>
                <span>{formatarMoeda(totalPedidos)}</span>
            </div>

            <div className="flex justify-between text-sm text-white/60">
                <span>Frete {tipoEntrega === "retirada" && "(retirada)"}</span>
                <span>{frete === 0 ? "Grátis" : formatarMoeda(frete)}</span>
            </div>

            <div className="h-px bg-white/10 my-1" />

            <div className="flex justify-between text-white font-bold text-lg">
                <span>Total</span>
                <span>{formatarMoeda(totalComFrete)}</span>
            </div>
        </div>
    );
}