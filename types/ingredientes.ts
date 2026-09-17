export type TipoIngrediente = "sabor" | "acompanhamento";

export type Ingrediente = {
    id: string;
    tipo: TipoIngrediente;
    nome: string;
    disponivel: boolean;
    criado_em: string;
};