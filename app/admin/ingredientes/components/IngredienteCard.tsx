"use client";

import { Ingrediente } from "@/types/ingredientes";

interface IngredienteCardProps {
    ingrediente: Ingrediente;
    onToggle: () => void;
}

export default function IngredienteCard({ ingrediente, onToggle }: IngredienteCardProps) {
    return (
        <div className="flex items-center justify-between bg-[#2b2340] rounded-xl px-4 py-3">
            <span className="text-white text-sm">{ingrediente.nome}</span>

            <button
                onClick={onToggle}
                className={`text-xs px-3 py-1.5 rounded-lg font-semibold transition cursor-pointer ${
                    ingrediente.disponivel
                        ? "bg-green-500/20 text-green-300 hover:bg-green-500/30"
                        : "bg-red-500/20 text-red-300 hover:bg-red-500/30"
                }`}
            >
                {ingrediente.disponivel ? "Disponível" : "Esgotado"}
            </button>
        </div>
    );
}