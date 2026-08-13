export type TipoIngrediente = "sabor" | "acompanhamento";

export type Ingrediente = {
    id: number;
    tipo: TipoIngrediente;
    nome: string;
    disponivel: boolean;
    criado_em: string;
};