"use client";

import { useEffect, useState } from "react";
import { Ingrediente } from "@/types/ingredientes";

export function useIngredientesAdmin() {
    const [ingredientes, setIngredientes] = useState<Ingrediente[]>([]);
    const [carregando, setCarregando] = useState(true);

    const buscarIngredientes = async () => {
        setCarregando(true);
        const resposta = await fetch("/api/admin/ingredientes", { cache: "no-store" });
        const json = await resposta.json();
        setIngredientes(json);
        setCarregando(false);
    };

    useEffect(() => {
        buscarIngredientes();
    }, []);

    const alternarDisponibilidade = async (id: string, disponivelAtual: boolean) => {
        const novoValor = !disponivelAtual;

        setIngredientes((prev) =>
            prev.map((i) => (i.id === id ? { ...i, disponivel: novoValor } : i))
        );

        try {
            const resposta = await fetch(`/api/admin/ingredientes/${id}`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ disponivel: novoValor }),
            });
            if (!resposta.ok) throw new Error("Falha ao atualizar");
        } catch (error) {
            console.error(error);
            setIngredientes((prev) =>
                prev.map((i) => (i.id === id ? { ...i, disponivel: disponivelAtual } : i))
            ); // reverte se falhar
        }
    };

    return { ingredientes, carregando, alternarDisponibilidade };
}