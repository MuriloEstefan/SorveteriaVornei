"use client";

import { useEffect, useState } from "react";

export function useLojaStatus() {
    const [aberta, setAberta] = useState(true);
    const [carregando, setCarregando] = useState(true);

    const buscarStatus = async () => {
        const resposta = await fetch("/api/loja-status");
        const json = await resposta.json();
        setAberta(json.aberta);
        setCarregando(false);
    };

    useEffect(() => {
        buscarStatus();
    }, []);

    const alternar = async () => {
        const novoValor = !aberta;
        setAberta(novoValor); // otimista

        await fetch("/api/loja-status", {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ aberta: novoValor }),
        });
    };

    return { aberta, carregando, alternar };
}