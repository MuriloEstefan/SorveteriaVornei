
{/**Este componente é responsável por mapear os sabores de acai/sorvetes e os acompanhamentos (itens dos produtos) */}
import ItemQuantidade from "../../../components/ItemQuantidade";

interface ListaItensProps {
    titulo: string;
    lista: string[];
    tipo: "sorvete" | "acompanhamento";

    quantidades: Record<string, number>;
    maxItens: number;

    aumentar: (
        nome: string,
        tipo: "sorvete" | "acompanhamento"
    ) => void;

    diminuir: (nome: string) => void;
}

export default function ListaItens({
    titulo,
    lista,
    tipo,
    quantidades,
    maxItens,
    aumentar,
    diminuir,
}: ListaItensProps) {
    const totalSelecionado = lista.reduce(
        (acc, nome) => acc + (quantidades[nome] || 0), 0
    );

    const podeAumentar = totalSelecionado < maxItens;

    return (
        <div className="mt-10 space-y-3">
            <div className="flex items-center justify-between px-1 mb-2">
                <h2 className="text-white font-semibold text-base">
                    {titulo}
                </h2>
                <span className="text-white/40 text-xs font-semibold">
                    {totalSelecionado}/{maxItens}
                </span>
            </div>

            <div className="h-px bg-white/10 mb-4"></div>

            {lista.map((item) => (
                <ItemQuantidade
                    key={item}
                    nome={item}
                    quantidade={quantidades[item] || 0}
                    tipo={tipo}
                    podeAumentar={podeAumentar}
                    aumentar={aumentar}
                    diminuir={diminuir}
                />
            ))}
        </div>
    );
}