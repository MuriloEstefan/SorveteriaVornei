import { ItemCarrinho } from "@/types/pedidos";

export type ItemAgrupado = {
    categoria: string;
    nome: string;
    preco_unitario: number;
    subtotal: number;
    quantidade: number;
    quantidades: Record<string, number>;
    observacao?: string;
};

export function agruparItens(itens: ItemCarrinho[]): ItemAgrupado[] {
    const agrupados: Record<string, ItemAgrupado> = {};
    const resultado: ItemAgrupado[] = [];

    for (const item of itens) {

        // Sorvetes/Açaís continuam separados
        if (item.categoria !== "Milkshakes") {
            resultado.push({
                categoria: item.categoria,
                nome: item.nome,
                preco_unitario: item.preco_unitario,
                subtotal: item.preco_unitario * item.quantidade,
                quantidade: item.quantidade,
                quantidades: item.quantidades,
                observacao: item.observacao,
            });

            continue;
        }

        // Milkshakes iguais + mesma observação = mesmo grupo
        const chave = `${item.nome}-${item.observacao ?? ""}`;

        if (!agrupados[chave]) {
            agrupados[chave] = {
                categoria: item.categoria,
                nome: item.nome,
                preco_unitario: item.preco_unitario,
                subtotal: 0,
                quantidade: 0,
                quantidades: {},
                observacao: item.observacao,
            };
        }

        agrupados[chave].quantidade += item.quantidade;
        agrupados[chave].subtotal += item.preco_unitario * item.quantidade;
    }

    return [...resultado, ...Object.values(agrupados)];
}