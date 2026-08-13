"use client";

import { useEffect, useState } from "react";
import { Ingrediente } from "@/types/ingredientes";

export function useIngredientesDisponiveis() {
    const [ingredientes, setIngredientes] = useState<Ingrediente[]>([]);
    const [carregando, setCarregando] = useState(true);

    useEffect(() => {
        fetch("/api/ingredientes", { cache: "no-store" })
            .then((res) => res.json())
            .then((json) => setIngredientes(json))
            .finally(() => setCarregando(false));
    }, []);

    // Monta um "mapa rápido": nome -> disponível?
    const disponibilidadePorNome: Record<string, boolean> = {};
    ingredientes.forEach((i) => {
        disponibilidadePorNome[i.nome] = i.disponivel;
    });

    return { ingredientes, disponibilidadePorNome, carregando };
}