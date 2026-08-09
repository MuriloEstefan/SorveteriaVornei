import { ResumoFaturamento } from "@/types/faturamento";
import { TrendingUp, TrendingDown } from "lucide-react";

interface CardsResumoProps {
    atual: ResumoFaturamento;
    anterior: ResumoFaturamento;
}

function calcularVariacao(atual: number, anterior: number) {
    if (anterior === 0) return atual > 0 ? 100 : 0;
    return ((atual - anterior) / anterior) * 100;
}

function Variacao({ valor }: { valor: number }) {
    const positivo = valor >= 0;
    const Icone = positivo ? TrendingUp : TrendingDown;

    return (
        <div className={`flex items-center gap-1 text-xs font-semibold ${positivo ? "text-green-400" : "text-red-400"}`}>
            <Icone size={14} />
            {Math.abs(valor).toFixed(0)}%
        </div>
    );
}

export default function CardsResumo({ atual, anterior }: CardsResumoProps) {

    const variacaoFaturamento = calcularVariacao(atual.faturamento, anterior.faturamento);
    const variacaoPedidos = calcularVariacao(atual.numeroPedidos, anterior.numeroPedidos);
    const variacaoTicket = calcularVariacao(atual.ticketMedio, anterior.ticketMedio);

    return (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">

            <div className="bg-[#2b2340] rounded-2xl border border-white/5 p-5">
                <p className="text-white/40 text-sm">Faturamento</p>
                <p className="text-2xl font-bold text-white mt-1">
                    R$ {atual.faturamento.toFixed(2).replace(".", ",")}
                </p>
                <div className="mt-2">
                    <Variacao valor={variacaoFaturamento} />
                </div>
            </div>

            <div className="bg-[#2b2340] rounded-2xl border border-white/5 p-5">
                <p className="text-white/40 text-sm">Nº de Pedidos</p>
                <p className="text-2xl font-bold text-white mt-1">
                    {atual.numeroPedidos}
                </p>
                <div className="mt-2">
                    <Variacao valor={variacaoPedidos} />
                </div>
            </div>

            <div className="bg-[#2b2340] rounded-2xl border border-white/5 p-5">
                <p className="text-white/40 text-sm">Ticket Médio</p>
                <p className="text-2xl font-bold text-white mt-1">
                    R$ {atual.ticketMedio.toFixed(2).replace(".", ",")}
                </p>
                <div className="mt-2">
                    <Variacao valor={variacaoTicket} />
                </div>
            </div>

        </div>
    );
}