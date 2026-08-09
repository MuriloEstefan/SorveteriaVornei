"use client";

import { useProdutosAdmin } from "./hooks/useProdutosAdmin";
import ProdutoCard from "./components/ProdutoCard";

export default function ProdutosPage() {
    const { produtos, carregando, alternarDisponibilidade, alternarAtivo } =
        useProdutosAdmin();

    if (carregando) {
        return <p className="text-white/40 p-6">Carregando produtos...</p>;
    }

    // Agrupa por categoria, tipo groupby do pandas
    const porCategoria = produtos.reduce<Record<string, typeof produtos>>((acc, p) => {
        if (!acc[p.categoria]) acc[p.categoria] = [];
        acc[p.categoria].push(p);
        return acc;
    }, {});

    return (
        <div className="p-6 space-y-8">
            <h1 className="text-white text-xl font-bold">Produtos</h1>

            {Object.entries(porCategoria).map(([categoria, itens]) => (
                <div key={categoria}>
                    <h2 className="text-white/50 text-sm uppercase tracking-widest font-bold mb-3">
                        {categoria}
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {itens.map((produto) => (
                            <ProdutoCard
                                key={produto.id}
                                produto={produto}
                                onToggleDisponivel={() =>
                                    alternarDisponibilidade(produto.id, produto.disponivel)
                                }
                                onToggleAtivo={() => alternarAtivo(produto.id, produto.ativo)}
                            />
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );
}