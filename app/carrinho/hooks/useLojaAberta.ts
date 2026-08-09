"use client";

import { useEffect, useState } from "react";

export function useLojaAberta() {
    const [aberta, setAberta] = useState(true);

    useEffect(() => {
        fetch("/api/loja-status")
            .then((res) => res.json())
            .then((json) => setAberta(json.aberta))
            .catch(() => setAberta(true)); // se der erro, não trava o cliente à toa
    }, []);

    return aberta;
}