"use client";

import { useEffect, useState } from "react";
import {
    PedidoBanco,
    PedidoResumoHistorico,
    ResumoHistorico,
    StatusFiltroHistorico,
    PeriodoFiltroHistorico,
} from "@/types/pedidos";

export function useHistorico() {
    const [busca, setBusca] = useState("");
    const [status, setStatus] = useState<StatusFiltroHistorico>("todos");
    const [periodo, setPeriodo] = useState<PeriodoFiltroHistorico>("hoje");

    const [pedidos, setPedidos] = useState<PedidoResumoHistorico[]>([]);
    const [resumo, setResumo] = useState<ResumoHistorico>({
        finalizados: 0,
        cancelados: 0,
        faturamento: 0,
    });
    const [carregando, setCarregando] = useState(true);

    const [pedidoSelecionado, setPedidoSelecionado] = useState<PedidoBanco | null>(null);
    const [carregandoDetalhe, setCarregandoDetalhe] = useState(false);

    const buscarDados = async () => {
        setCarregando(true);

        const params = new URLSearchParams({ status, periodo });
        if (busca.trim()) params.set("busca", busca.trim());

        const resposta = await fetch(`/api/admin/historico?${params.toString()}`);
        const json = await resposta.json();

        setPedidos(json.pedidos ?? []);
        setResumo(json.resumo ?? { finalizados: 0, cancelados: 0, faturamento: 0 });
        setCarregando(false);
    };

    // busca só uma vez ao montar; o resto acontece pelo botão "Filtrar"
    useEffect(() => {
        buscarDados();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const abrirDetalhes = async (id: number) => {
        setCarregandoDetalhe(true);
        setPedidoSelecionado(null);

        const resposta = await fetch(`/api/admin/pedidos/${id}`);
        const json = await resposta.json();

        setPedidoSelecionado(json);
        setCarregandoDetalhe(false);
    };

    const fecharDetalhes = () => setPedidoSelecionado(null);

    return {
        busca, setBusca,
        status, setStatus,
        periodo, setPeriodo,
        pedidos, resumo, carregando,
        buscarDados,
        pedidoSelecionado, carregandoDetalhe, abrirDetalhes, fecharDetalhes,
    };
}