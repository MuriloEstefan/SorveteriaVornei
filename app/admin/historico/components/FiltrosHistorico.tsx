"use client";

import { StatusFiltroHistorico, PeriodoFiltroHistorico } from "@/types/pedidos";

interface FiltrosHistoricoProps {
    busca: string;
    setBusca: (v: string) => void;
    status: StatusFiltroHistorico;
    setStatus: (v: StatusFiltroHistorico) => void;
    periodo: PeriodoFiltroHistorico;
    setPeriodo: (v: PeriodoFiltroHistorico) => void;
    onFiltrar: () => void;
}

export default function FiltrosHistorico({
    busca, setBusca, status, setStatus, periodo, setPeriodo, onFiltrar,
}: FiltrosHistoricoProps) {
    return (
        <section className="rounded-xl bg-[#241C36] p-5">
            <div className="grid gap-4 md:grid-cols-4">
                <input
                    type="text"
                    value={busca}
                    onChange={(e) => setBusca(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && onFiltrar()}
                    placeholder="Buscar por nome, telefone ou pedido..."
                    className="rounded-lg bg-[#302548] px-4 py-3 text-white outline-none"
                />

                <select
                    value={status}
                    onChange={(e) => setStatus(e.target.value as StatusFiltroHistorico)}
                    className="rounded-lg bg-[#302548] px-4 py-3 text-white outline-none"
                >
                    <option value="todos">Todos</option>
                    <option value="finalizado">Finalizados</option>
                    <option value="cancelado">Cancelados</option>
                </select>

                <select
                    value={periodo}
                    onChange={(e) => setPeriodo(e.target.value as PeriodoFiltroHistorico)}
                    className="rounded-lg bg-[#302548] px-4 py-3 text-white outline-none"
                >
                    <option value="hoje">Hoje</option>
                    <option value="semana">Semana</option>
                    <option value="mes">Mês</option>
                    <option value="ano">Ano</option>
                </select>

                <button
                    onClick={onFiltrar}
                    className="rounded-lg bg-violet-600 px-4 py-3 font-semibold text-white hover:bg-violet-700 transition"
                >
                    Filtrar
                </button>
            </div>
        </section>
    );
}