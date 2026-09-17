import { Categoria } from "../data/categorias";
import { Produto, ItemCarrinho } from "@/types/pedidos";
import { ChevronDown } from "lucide-react";
import ListaProdutos from "./ListaProdutos";

interface ListaCategoriasProps {
    categorias: Categoria[];
    categoriaSelecionada: string;
    setCategoriaSelecionada: (categoria: string) => void;
    setPedidoSelecionado: (pedido: Produto) => void;
    adicionarAoCarrinho: (item: ItemCarrinho) => void;
    produtos: Produto[];
    carregando: boolean; // NOVO
}

export default function ListaCategoria({
    categorias,
    categoriaSelecionada,
    setCategoriaSelecionada,
    setPedidoSelecionado,
    adicionarAoCarrinho,
    produtos,
    carregando, // NOVO
}: ListaCategoriasProps) {

    return (
        <div className="card-categorias space-y-4">
            {categorias.map((categoria) => (
                <div key={categoria.nome}>
                    <div
                        onClick={() => {
                            setCategoriaSelecionada(
                                categoriaSelecionada === categoria.nome ? "" : categoria.nome
                            )
                        }}
                        className="bg-[#3d1f52] rounded-2xl p-4 flex items-center justify-between shadow-lg cursor-pointer border border-transparent hover:border-[#8b2e9e] transition"
                    >
                        <div>
                            <h3 className="text-xl font-bold">{categoria.nome}</h3>
                            <p className="text-sm text-gray-300">{categoria.descricao}</p>
                        </div>

                        <div className="bg-[#5a2a72] p-3 rounded-full">
                            <ChevronDown
                                size={26}
                                className={`transition-transform duration-300 ${
                                    categoriaSelecionada === categoria.nome ? "rotate-180" : ""
                                }`}
                            />
                        </div>
                    </div>
                    {categoriaSelecionada === categoria.nome && (
                        <ListaProdutos
                            categoria={categoria.nome}
                            produtos={produtos}
                            adicionarAoCarrinho={adicionarAoCarrinho}
                            setPedidoSelecionado={setPedidoSelecionado}
                            carregando={carregando} // NOVO
                        />
                    )}
                </div>
            ))}
        </div>
    )
}