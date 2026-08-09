"use client";

import { useLojaAberta } from "../hooks/useLojaAberta";

export default function BadgeStatusLoja() {
    const aberta = useLojaAberta();

    return (
        <div
            className={`
                flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold shrink-0
                ${
                    aberta
                        ? "bg-green-500/15 text-green-400"
                        : "bg-red-500/15 text-red-400"
                }
            `}
        >
            <span
                className={`w-1.5 h-1.5 rounded-full ${aberta ? "bg-green-400" : "bg-red-400"}`}
            />
            {aberta ? "Loja Aberta" : "Loja Fechada"}
        </div>
    );
}