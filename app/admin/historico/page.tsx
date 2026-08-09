"use client";

import { useHistorico } from "./hooks/useHistorico";
import CardsResumo from "./components/CardsResumo";
import FiltrosHistorico from "./components/FiltrosHistorico";
import ListaPedidosHistorico from "./components/ListaPedidosHistorico";
import ModalDetalhesPedido from "./components/ModalDetalhesPedido";

export default function HistoricoPage() {
    const {
        busca, setBusca,
        status, setStatus,
        periodo, setPeriodo,
        pedidos, resumo, carregando,
        buscarDados,
        pedidoSelecionado, carregandoDetalhe, abrirDetalhes, fecharDetalhes,
    } = useHistorico();

    return (
        <main className="space-y-8">
            <section>
                <h1 className="text-4xl font-bold text-white">Histórico de Pedidos</h1>
                <p className="mt-2 text-zinc-400">Consulte todos os pedidos finalizados e cancelados.</p>
            </section>

            <CardsResumo
                totalPedidos={resumo.finalizados + resumo.cancelados}
                finalizados={resumo.finalizados}
                cancelados={resumo.cancelados}
                faturamento={resumo.faturamento}
            />

            <FiltrosHistorico
                busca={busca}
                setBusca={setBusca}
                status={status}
                setStatus={setStatus}
                periodo={periodo}
                setPeriodo={setPeriodo}
                onFiltrar={buscarDados}
            />

            <ListaPedidosHistorico
                pedidos={pedidos}
                carregando={carregando}
                onSelecionar={abrirDetalhes}
            />

            <ModalDetalhesPedido
                pedido={pedidoSelecionado}
                carregando={carregandoDetalhe}
                onFechar={fecharDetalhes}
            />
        </main>
    );
}