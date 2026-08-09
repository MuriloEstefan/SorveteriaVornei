import { ProdutoMaisVendido } from "@/types/faturamento";

interface RankingProdutosProps {
    produtos: ProdutoMaisVendido[];
}

export default function RankingProdutos({ produtos }: RankingProdutosProps) {

    const maiorQuantidade = produtos[0]?.quantidade || 1;

    return (
        <div className="bg-[#2b2340] rounded-2xl border border-white/5 p-5">

            <h3 className="text-white font-semibold mb-4">
                Produtos mais vendidos
            </h3>

            {produtos.length === 0 ? (
                <p className="text-white/40 text-sm py-10 text-center">
                    Nenhum produto vendido nesse período.
                </p>
            ) : (
                <div className="space-y-3">
                    {produtos.map((produto, index) => {
                        const porcentagem = (produto.quantidade / maiorQuantidade) * 100;

                        return (
                            <div key={produto.nome}>
                                <div className="flex items-center justify-between mb-1">
                                    <span className="text-white text-sm font-medium">
                                        {index + 1}. {produto.nome}
                                    </span>
                                    <span className="text-white/50 text-sm">
                                        {produto.quantidade} un.
                                    </span>
                                </div>
                                <div className="w-full h-2 bg-white/5 rounded-full overflow-hidden">
                                    <div
                                        className="h-full bg-purple-500 rounded-full transition-all"
                                        style={{ width: `${porcentagem}%` }}
                                    />
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}

        </div>
    );
}