"use client";

import { useFaturamento } from "./hooks/useFaturamento";
import FiltroPeriodo from "./components/FiltroPeriodo";
import CardsResumo from "./components/CardsResumo";
import GraficoFaturamento from "./components/GraficoFaturamento";
import RankingProdutos from "./components/RankingProdutos";

export default function FaturamentoPage() {

    const {
        periodo,
        setPeriodo,
        dataInicioCustom,
        setDataInicioCustom,
        dataFimCustom,
        setDataFimCustom,
        dados,
        carregando,
    } = useFaturamento();

    return (
        <div className="text-white space-y-6">

            {/* Cabeçalho */}
            <div>
                <h1 className="text-3xl font-black">Faturamento</h1>
                <p className="text-white/30 text-sm mt-1">
                    Acompanhe as métricas da sorveteria
                </p>
            </div>

            {/* Filtro de período */}
            <FiltroPeriodo
                periodo={periodo}
                setPeriodo={setPeriodo}
                dataInicioCustom={dataInicioCustom}
                setDataInicioCustom={setDataInicioCustom}
                dataFimCustom={dataFimCustom}
                setDataFimCustom={setDataFimCustom}
            />

            {carregando || !dados ? (
                <p className="text-white/40 text-sm py-10 text-center">
                    Carregando dados...
                </p>
            ) : (
                <>
                    {/* Cards de resumo */}
                    <CardsResumo atual={dados.atual} anterior={dados.anterior} />

                    {/* Gráfico */}
                    <GraficoFaturamento dados={dados.porDia} />

                    {/* Ranking de produtos */}
                    <RankingProdutos produtos={dados.maisVendidos} />
                </>
            )}

        </div>
    );
}