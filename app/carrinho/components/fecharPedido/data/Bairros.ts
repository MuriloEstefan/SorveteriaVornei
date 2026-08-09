export const opcoesCidade = [
    { valor: "capivari", label: "Capivari" },
    { valor: "rafard", label: "Rafard" },
];

export const bairrosPorCidade: Record<string, { label: string; frete: number }[]> = {
    capivari: [
        { label: "Bosque dos Pinheiros", frete: 8 },
        { label: "Cancian", frete: 8 },
        { label: "Catellani", frete: 8 },
        { label: "Centro", frete: 8 },
        { label: "Chacaras Pagotto", frete: 8 },
        { label: "Estação", frete: 8 },
        { label: "Jardim Branyl", frete: 8 },
        { label: "Jardim Elisa", frete: 8 },
        { label: "Jardim Morada do Sol", frete: 8 },
        { label: "Jardim São Marcos", frete: 8 },
        { label: "Lot Jardim Genova", frete: 8 },
        { label: "Padovani", frete: 8 },
        { label: "Porto Alegre", frete: 8 },
        { label: "Raia", frete: 8 },
        { label: "Ribeirão", frete: 8 },
        { label: "Rossi", frete: 8 },
        { label: "Santo Antonio", frete: 8 },
        { label: "Vila do Carmo", frete: 8 },
        { label: "Vila Fatima", frete: 8 },
        { label: "Vila Izildinha", frete: 8 },
        { label: "Vila Santa", frete: 8 },
    ],

    rafard: [
        { label: "Centro", frete: 5 },
        { label: "Conjunto Habitacional Lurdes Abel Guimarães", frete: 5 },
        { label: "Jardim Europa", frete: 5 },
        { label: "Jardim Residencial São Francisco", frete: 5 },
        { label: "Jardim São Carlos", frete: 5 },
        { label: "Popular de Rafard", frete: 5 },
        { label: "Residencial Diamante", frete: 5 },
    ],
};