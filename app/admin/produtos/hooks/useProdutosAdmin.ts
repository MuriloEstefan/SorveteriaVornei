"use client";

import { useEffect, useState } from "react";
import { ProdutoAdmin } from "@/types/produto";

export function useProdutosAdmin() {
    const [produtos, setProdutos] = useState<ProdutoAdmin[]>([]);
    const [carregando, setCarregando] = useState(true);

    const buscarProdutos = async () => {
        setCarregando(true);
        const resposta = await fetch("/api/admin/produtos");
        const json = await resposta.json();
        setProdutos(json);
        setCarregando(false);
    };

    useEffect(() => {
        buscarProdutos();
    }, []);

    // Atualiza local (otimista) + envia pro backend
    const alternarDisponibilidade = async (id: number, disponivelAtual: boolean) => {
        const novoValor = !disponivelAtual;

        setProdutos((prev) =>
            prev.map((p) => (p.id === id ? { ...p, disponivel: novoValor } : p))
        );

        await fetch(`/api/admin/produtos/${id}`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ disponivel: novoValor }),
        });
    };

    const alternarAtivo = async (id: number, ativoAtual: boolean) => {
        const novoValor = !ativoAtual;

        setProdutos((prev) =>
            prev.map((p) => (p.id === id ? { ...p, ativo: novoValor } : p))
        );

        await fetch(`/api/admin/produtos/${id}`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ ativo: novoValor }),
        });
    };

    return {
        produtos,
        carregando,
        alternarDisponibilidade,
        alternarAtivo,
    };
}