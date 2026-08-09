import { useState } from "react";
import { sabores } from "../data/sabores";
import { acompanhamentos } from "../data/acompanhamentos";
import { Produto } from "@/types/pedidos";

export function useMontagemPedido(pedido: Produto | null) {
    const [quantidades, setQuantidades] = 
        useState<Record<string, number>>({});

    const contarSelecionados = (lista: string[]) => {
        return lista.reduce((total, item) => {
            return total + (quantidades[item] || 0);
        }, 0);
    };

    const aumentar = (nome: string, tipo: "sorvete" | "acompanhamento") => {

        if (!pedido) return;

        const totalSabores = contarSelecionados(sabores);
        const totalAcompanhamentos = contarSelecionados(acompanhamentos);

        // Trava de segurança: o botão "+" já vem desabilitado na tela
        // quando o limite é atingido, então isso aqui é só uma garantia extra
        // (evita cliques "fantasmas" via teclado/acessibilidade, por exemplo).
        if (tipo === "sorvete" && totalSabores >= pedido.maxSabores) return;
        if (tipo === "acompanhamento" && totalAcompanhamentos >= pedido.maxAcompanhamentos) return;

        setQuantidades((prev) => ({
            ...prev,
            [nome]: (prev[nome] || 0) + 1
        }));
    };

    const diminuir = (nome: string) => {
        setQuantidades((prev) => ({
            ...prev,
            [nome]: Math.max((prev[nome] || 0) - 1, 0)
        }));
    };

    const limparQuantidades = () => {
        setQuantidades({});
    };

    return {
        quantidades,
        aumentar,
        diminuir,
        limparQuantidades
    };
}