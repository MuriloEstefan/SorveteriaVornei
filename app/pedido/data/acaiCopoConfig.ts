import { ConfigSobremesa, OpcaoEscolha } from "@/types/sobremesas";

const saboresAcai: OpcaoEscolha[] = [
    { nome: "Açaí tradicional" },
    { nome: "Açaí com maracujá" },
    { nome: "Açaí com morango" },
    { nome: "Açaí com yogurt" },
];

const acompanhamentosAcai: OpcaoEscolha[] = [
    { nome: "Creme de avelã" },
    { nome: "Creme de leite Ninho" },
    { nome: "Creme de amendoim" },
    { nome: "Creme de maracujá" },
    { nome: "Creme de abacaxi ao vinho" },
    { nome: "Leite condensado" },
    { nome: "Calda de morango" },
    { nome: "Calda de chocolate" },
    { nome: "Leite em pó" },
    { nome: "Farofa de paçoca" },
    { nome: "Amendoim granulado" },
    { nome: "Granola" },
    { nome: "Confete" },
    { nome: "Sucrilhos" },
    { nome: "Nescau Ball" },
    { nome: "Flocos de Negresco" },
    { nome: "Morango" },
    { nome: "Banana" },
    { nome: "Uva" },
];

// IMPORTANTE: "nomeProduto" precisa ser IDÊNTICO ao campo "nome" cadastrado
// na tabela `produtos` pra cada tamanho, senão o buscarConfigAcai não acha.
export const acaiConfigs: ConfigSobremesa[] = [
    {
        nomeProduto: "Açaí 300ml (350g)",
        grupos: [
            {
                chave: "sabor",
                titulo: "Escolha seu açaí",
                obrigatorio: true,
                min: 1,
                max: 1,
                opcoes: saboresAcai,
            },
            {
                chave: "acompanhamentos",
                titulo: "Escolha seus acompanhamentos",
                obrigatorio: true,
                min: 2,
                max: 4,
                opcoes: acompanhamentosAcai,
            },
        ],
    },
    {
        nomeProduto: "Açaí 400ml (450g)",
        grupos: [
            {
                chave: "sabor",
                titulo: "Escolha seu açaí",
                obrigatorio: true,
                min: 1,
                max: 1,
                opcoes: saboresAcai,
            },
            {
                chave: "acompanhamentos",
                titulo: "Escolha seus acompanhamentos",
                obrigatorio: true,
                min: 2,
                max: 5,
                opcoes: acompanhamentosAcai,
            },
        ],
    },
    {
        nomeProduto: "Açaí 500ml (550g)",
        grupos: [
            {
                chave: "sabor",
                titulo: "Escolha seu açaí",
                obrigatorio: true,
                min: 1,
                max: 1,
                opcoes: saboresAcai,
            },
            {
                chave: "acompanhamentos",
                titulo: "Escolha seus acompanhamentos",
                obrigatorio: true,
                min: 2,
                max: 6,
                opcoes: acompanhamentosAcai,
            },
        ],
    },
];

export function buscarConfigAcai(nomeProduto: string): ConfigSobremesa | null {
    return acaiConfigs.find((c) => c.nomeProduto === nomeProduto) ?? null;
}