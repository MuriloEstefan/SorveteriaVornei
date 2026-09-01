"use client";

import { useProdutosAdmin } from "../hooks/useProdutosAdmin";
import ProdutoCard from "./ProdutoCard";

export default function ProdutosView() {
    const { produtos, carregando, alternarDisponibilidade, alternarAtivo, atualizarPreco } =
        useProdutosAdmin();

    if (carregando) {
        return <p className="text-white/40 p-6">Carregando produtos...</p>;
    }

    const porCategoria = produtos.reduce<Record<string, typeof produtos>>((acc, p) => {
        if (!acc[p.categoria]) acc[p.categoria] = [];
        acc[p.categoria].push(p);
        return acc;
    }, {});

    return (
        <div className="space-y-8">
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
                                onSalvarPreco={(novoPreco) => atualizarPreco(produto.id, novoPreco)}
                            />
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );
}