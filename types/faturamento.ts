export interface ResumoFaturamento {
    faturamento: number;
    numeroPedidos: number;
    ticketMedio: number;
}

export interface PontoGrafico {
    dia: string;
    faturamento: number;
}

export interface ProdutoMaisVendido {
    nome: string;
    quantidade: number;
}

export interface DadosFaturamento {
    atual: ResumoFaturamento;
    anterior: ResumoFaturamento;
    porDia: PontoGrafico[];
    maisVendidos: ProdutoMaisVendido[];
}