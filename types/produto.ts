// types/produto.ts
export type ProdutoAdmin = {
    id: number;
    categoria: string;
    nome: string;
    descricao: string;
    imagem: string;
    preco: number;
    max_sabores: number;
    max_acompanhamentos: number;
    disponivel: boolean;
    ativo: boolean;
    criado_em: string;
};