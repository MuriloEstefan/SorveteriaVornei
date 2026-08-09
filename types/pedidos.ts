export type Produto = {
    nome: string;
    preco_unitario: number;
    imagem: string;
    descricao: string;
    maxSabores: number;
    maxAcompanhamentos: number;
    disponivel: boolean;
};

export type ItemCarrinho = {
    categoria: string;
    nome: string;
    preco_unitario: number;
    subtotal: number;
    quantidade: number;
    quantidades: Record<string, number>;
    observacao?: string;
};

export type DadosPedido = {
    nome: string;
    sobrenome: string;
    telefone: string;

    rua: string;
    numero: string;
    bairro: string;
    complemento: string;

    observacao: string;
    colher: boolean;

    tipoEntrega: string;

    formaPagamento: string;
    trocoPara: string;

    carrinho: ItemCarrinho[];

    total: number;
};

export type PedidoCompleto = {
    cliente: {
        nome: string;
        sobrenome: string;
        telefone: string;
        observacao: string;
        colher: boolean;
    };

    entrega: {
        tipo: string;
        rua: string;
        numero: string;
        bairro: string;
        complemento: string;
    };

    pagamento: {
        forma: string;
        trocoPara: string;
    };

    pedidos: ItemCarrinho[];

    total: number;
};

export type ItemPedidoBanco = {
    categoria: string;
    nome: string;
    preco_unitario: number;
    subtotal: number;
    quantidade: number;
    quantidades: Record<string, number>;
    observacao?: string;
};

export type PedidoBanco = {
    id: number;
    nome: string;
    sobrenome: string;
    telefone: string;
    tipo_entrega: string;
    rua: string;
    numero: string;
    bairro: string;
    complemento: string;
    cidade: string;   
    frete: number;    
    observacao: string;
    colher: boolean;
    forma_pagamento: string;      
    troco_para: number | null;
    total: number;
    status: string;
    criado_em: string;
    itens: ItemPedidoBanco[];
};

export type Props = {
    pedido: Produto | null;
    fechar: () => void;
    adicionarAoCarrinho: (novoPedido: ItemCarrinho) => void;
};

export type StatusFiltroHistorico = "todos" | "finalizado" | "cancelado";
export type PeriodoFiltroHistorico = "hoje" | "semana" | "mes" | "ano";

export type PedidoResumoHistorico = {
    id: number;
    nome: string;
    sobrenome: string;
    telefone: string;
    total: number;
    status: string;
    criado_em: string;
};

export type ResumoHistorico = {
    finalizados: number;
    cancelados: number;
    faturamento: number;
};
