"use client";

import { useIngredientesAdmin } from "../../ingredientes/hooks/useIngredientesAdmin";
import IngredienteCard from "../../ingredientes/components/IngredienteCard";

export default function IngredientesView() {
    const { ingredientes, carregando, alternarDisponibilidade } = useIngredientesAdmin();

    if (carregando) {
        return <p className="text-white/40 p-6">Carregando ingredientes...</p>;
    }

    const sabores = ingredientes.filter((i) => i.tipo === "sabor");
    const acompanhamentos = ingredientes.filter((i) => i.tipo === "acompanhamento");

    return (
        <div className="space-y-8">
            <div>
                <h2 className="text-white/50 text-sm uppercase tracking-widest font-bold mb-3">
                    Sabores
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {sabores.map((ing) => (
                        <IngredienteCard
                            key={ing.id}
                            ingrediente={ing}
                            onToggle={() => alternarDisponibilidade(ing.id, ing.disponivel)}
                        />
                    ))}
                </div>
            </div>

            <div>
                <h2 className="text-white/50 text-sm uppercase tracking-widest font-bold mb-3">
                    Acompanhamentos
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {acompanhamentos.map((ing) => (
                        <IngredienteCard
                            key={ing.id}
                            ingrediente={ing}
                            onToggle={() => alternarDisponibilidade(ing.id, ing.disponivel)}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}