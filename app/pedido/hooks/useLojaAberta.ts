"use client";

import { useEffect, useState } from "react";

export function useLojaAberta() {
    const [aberta, setAberta] = useState(true);

    const buscarStatus = () => {
        fetch("/api/loja-status", { cache: "no-store" })
            .then((res) => res.json())
            .then((json) => setAberta(json.aberta))
            .catch(() => setAberta(true));
    };

    useEffect(() => {
        buscarStatus();
        const intervalo = setInterval(buscarStatus, 15000); // atualiza a cada 15s
        return () => clearInterval(intervalo);
    }, []);

    return aberta;
}