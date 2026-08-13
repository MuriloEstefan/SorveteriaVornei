"use client";

import { useState } from "react";
import ProdutosView from "./components/ProdutosView";
import IngredientesView from "./components/IngredientesView";

export default function ProdutosPage() {
    const [abaSelecionada, setAbaSelecionada] = useState<"produtos" | "ingredientes">("produtos");

    return (
        <div className="p-6">
            <h1 className="text-white text-xl font-bold mb-6">Produtos</h1>

            {/* Abas */}
            <div className="flex gap-2 mb-6 bg-white/5 rounded-xl p-1 w-fit">
                <button
                    onClick={() => setAbaSelecionada("produtos")}
                    className={`px-5 py-2 rounded-lg text-sm font-semibold transition hover: cursor-pointer ${
                        abaSelecionada === "produtos"
                            ? "bg-violet-600 text-white"
                            : "text-white/50 hover:text-white"
                    }`}
                >
                    Produtos
                </button>

                <button
                    onClick={() => setAbaSelecionada("ingredientes")}
                    className={`px-5 py-2 rounded-lg text-sm font-semibold transition hover: cursor-pointer ${
                        abaSelecionada === "ingredientes"
                            ? "bg-violet-600 text-white"
                            : "text-white/50 hover:text-white"
                    }`}
                >
                    Ingredientes
                </button>
            </div>

            {/* Conteúdo da aba selecionada */}
            {abaSelecionada === "produtos" && <ProdutosView />}
            {abaSelecionada === "ingredientes" && <IngredientesView />}
        </div>
    );
}