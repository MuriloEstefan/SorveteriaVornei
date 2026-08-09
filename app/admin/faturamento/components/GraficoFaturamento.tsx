"use client";

import { PontoGrafico } from "@/types/faturamento";
import {
    ResponsiveContainer,
    LineChart,
    Line,
    XAxis,
    YAxis,
    Tooltip,
    CartesianGrid,
} from "recharts";

interface GraficoFaturamentoProps {
    dados: PontoGrafico[];
}

function formatarDia(dataStr: string) {
    const data = new Date(dataStr);
    return data.toLocaleDateString("pt-BR", { day: "2-digit", month: "2-digit" });
}

function formatarMoeda(valor: number) {
    return `R$ ${valor.toFixed(2).replace(".", ",")}`;
}

export default function GraficoFaturamento({ dados }: GraficoFaturamentoProps) {

    const dadosFormatados = dados.map((ponto) => ({
        ...ponto,
        diaFormatado: formatarDia(ponto.dia),
    }));

    return (
        <div className="bg-[#2b2340] rounded-2xl border border-white/5 p-5">

            <h3 className="text-white font-semibold mb-4">
                Faturamento por dia
            </h3>

            {dados.length === 0 ? (
                <p className="text-white/40 text-sm py-10 text-center">
                    Nenhum pedido entregue nesse período.
                </p>
            ) : (
                <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={dadosFormatados}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" />
                            <XAxis
                                dataKey="diaFormatado"
                                stroke="#ffffff60"
                                fontSize={12}
                            />
                            <YAxis
                                stroke="#ffffff60"
                                fontSize={12}
                                tickFormatter={(valor) => `R$ ${valor}`}
                            />
                            <Tooltip
                                formatter={(valor: string | number | readonly (string | number)[] | undefined) => {
                                    const valorNumerico = Array.isArray(valor) ? Number(valor[0]) : Number(valor ?? 0);
                                    return formatarMoeda(valorNumerico);
                                }}
                                labelFormatter={(label) => `Dia ${label}`}
                                contentStyle={{
                                    backgroundColor: "#2b2340",
                                    border: "1px solid #ffffff20",
                                    borderRadius: "12px",
                                    color: "#fff",
                                }}
                            />
                            <Line
                                type="monotone"
                                dataKey="faturamento"
                                stroke="#a855f7"
                                strokeWidth={3}
                                dot={{ fill: "#a855f7", r: 4 }}
                            />
                        </LineChart>
                    </ResponsiveContainer>
                </div>
            )}

        </div>
    );
}