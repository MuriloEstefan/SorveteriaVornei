"use client";

import { useEffect, useState } from "react";
import { DadosFaturamento } from "@/types/faturamento";

export type PeriodoAtalho = "hoje" | "semana" | "mes" | "personalizado";

export function useFaturamento() {

    const [periodo, setPeriodo] = useState<PeriodoAtalho>("hoje");
    const [dataInicioCustom, setDataInicioCustom] = useState("");
    const [dataFimCustom, setDataFimCustom] = useState("");

    const [dados, setDados] = useState<DadosFaturamento | null>(null);
    const [carregando, setCarregando] = useState(true);

    const buscarDados = async () => {
        setCarregando(true);

        const params = new URLSearchParams({ periodo });

        if (periodo === "personalizado" && dataInicioCustom && dataFimCustom) {
            params.set("inicio", dataInicioCustom);
            params.set("fim", dataFimCustom);
        }

        const resposta = await fetch(`/api/admin/faturamento?${params.toString()}`);
        const json = await resposta.json();

        setDados(json);
        setCarregando(false);
    };

    useEffect(() => {
        if (periodo === "personalizado" && (!dataInicioCustom || !dataFimCustom)) {
            return;
        }

        const timeoutId = setTimeout(() => {
            buscarDados();
        }, 0);

        return () => clearTimeout(timeoutId);
    }, [periodo, dataInicioCustom, dataFimCustom]);

    return {
        periodo,
        setPeriodo,
        dataInicioCustom,
        setDataInicioCustom,
        dataFimCustom,
        setDataFimCustom,
        dados,
        carregando,
    };
}