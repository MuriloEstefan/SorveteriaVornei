export type OpcaoEscolha = {
    nome: string;
    precoAdicional?: number; // ex: Morango = +3
};

export type GrupoEscolha = {
    chave: string;       // identificador único do grupo (ex: "calda", "frutas")
    titulo: string;       // texto mostrado ("Calda", "Frutas"...)
    obrigatorio: boolean;
    min: number;
    max: number;
    opcoes: OpcaoEscolha[];
};

export type ConfigSobremesa = {
    nomeProduto: string; // precisa bater com o "nome" salvo no banco
    grupos: GrupoEscolha[];
};