interface CardsResumoProps {
    totalPedidos: number;
    finalizados: number;
    cancelados: number;
    faturamento: number;
}

function formatarMoeda(valor: number) {
    return `R$ ${valor.toFixed(2).replace(".", ",")}`;
}

export default function CardsResumo({
    totalPedidos,
    finalizados,
    cancelados,
    faturamento,
}: CardsResumoProps) {
    return (
        <section className="grid grid-cols-1 gap-4 md:grid-cols-4">
            <div className="rounded-xl bg-[#241C36] p-5">
                <p className="text-sm text-zinc-400">Pedidos</p>
                <h2 className="mt-2 text-3xl font-bold text-white">{totalPedidos}</h2>
            </div>

            <div className="rounded-xl bg-[#241C36] p-5">
                <p className="text-sm text-zinc-400">Finalizados</p>
                <h2 className="mt-2 text-3xl font-bold text-green-400">{finalizados}</h2>
            </div>

            <div className="rounded-xl bg-[#241C36] p-5">
                <p className="text-sm text-zinc-400">Cancelados</p>
                <h2 className="mt-2 text-3xl font-bold text-red-400">{cancelados}</h2>
            </div>

            <div className="rounded-xl bg-[#241C36] p-5">
                <p className="text-sm text-zinc-400">Faturamento</p>
                <h2 className="mt-2 text-3xl font-bold text-emerald-400">
                    {formatarMoeda(faturamento)}
                </h2>
            </div>
        </section>
    );
}