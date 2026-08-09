import { ConfigSobremesa, OpcaoEscolha } from "@/types/sobremesas";

const caldasCopo: OpcaoEscolha[] = [
    { nome: "Chocolate trufado ao leite" },
    { nome: "Chocolate trufado branco" },
    { nome: "Creme de avelã" },
    { nome: "Creme de leite Ninho" },
    { nome: "Creme de Ovomaltine" },
    { nome: "Creme de Ferrero Rocher" },
    { nome: "Creme de Kinder Bueno" },
];

const frutasCopo: OpcaoEscolha[] = [
    { nome: "Uva" },
    { nome: "Banana" },
    { nome: "Kiwi" },
    { nome: "Manga" },
    { nome: "Morango", precoAdicional: 3 },
];

export const sobremesasConfig: ConfigSobremesa[] = [
    {
        nomeProduto: "Fondue na Roleta",
        grupos: [
            {
                chave: "calda",
                titulo: "Calda",
                obrigatorio: true,
                min: 1,
                max: 2, // 👈 mudou (era 1) — agora permite repetir/2 caldas
                opcoes: [
                    { nome: "Chocolate trufado ao leite" },
                    { nome: "Chocolate trufado branco" },
                    { nome: "Creme de avelã" },
                    { nome: "Creme de leite Ninho" },
                    { nome: "Creme de Ovomaltine" },
                    { nome: "Creme de Ferrero Rocher" },
                    { nome: "Creme de cookies branco" },
                    { nome: "Creme de paçoquita" },
                    { nome: "Creme de Kinder Bueno" },
                ],
            },
            {
                chave: "acompanhamento",
                titulo: "Acompanhamentos",
                obrigatorio: true,
                min: 2,
                max: 3,
                opcoes: [
                    { nome: "Morango" },
                    { nome: "Uva" },
                    { nome: "Banana" },
                    { nome: "Kiwi" },
                    { nome: "Manga" },
                    { nome: "Brownie" },
                    { nome: "Marshmallow" },
                ],
            },
        ],
    },
    {
        nomeProduto: "Fondue no Copo de 300ml",
        grupos: [
            { chave: "calda", titulo: "Calda", obrigatorio: true, min: 1, max: 1, opcoes: caldasCopo },
            { chave: "frutas", titulo: "Frutas", obrigatorio: true, min: 1, max: 3, opcoes: frutasCopo },
        ],
    },
    {
        nomeProduto: "Fondue no Copo de 400ml",
        grupos: [
            { chave: "calda", titulo: "Calda", obrigatorio: true, min: 1, max: 1, opcoes: caldasCopo },
            { chave: "frutas", titulo: "Frutas", obrigatorio: true, min: 1, max: 3, opcoes: frutasCopo },
        ],
    },
    {
        nomeProduto: "Fondue no Copo de 500ml",
        grupos: [
            { chave: "calda", titulo: "Calda", obrigatorio: true, min: 2, max: 2, opcoes: caldasCopo }, // 👈 já era max:2, já funciona como contador
            { chave: "frutas", titulo: "Frutas", obrigatorio: true, min: 1, max: 4, opcoes: frutasCopo },
        ],
    },
    {
        nomeProduto: "Brownie com Sorvete",
        grupos: [
            {
                chave: "sorvete",
                titulo: "Sorvete",
                obrigatorio: true,
                min: 1,
                max: 1,
                opcoes: [
                    { nome: "Ninho" },
                    { nome: "Morango" },
                    { nome: "Chocolate Belga" },
                    { nome: "Oreo" },
                    { nome: "Ninho com Morango" },
                ],
            },
            {
                chave: "calda",
                titulo: "Calda",
                obrigatorio: true,
                min: 1,
                max: 1,
                opcoes: [
                    { nome: "Creme de avelã" },
                    { nome: "Chocolate ao leite" },
                    { nome: "Creme de leite Ninho" },
                ],
            },
        ],
    },
];

export function buscarConfigSobremesa(nomeProduto: string) {
    return sobremesasConfig.find((c) => c.nomeProduto === nomeProduto) ?? null;
}