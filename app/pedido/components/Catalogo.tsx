"use client";

import { ShoppingCart } from "lucide-react";
import { ItemCarrinho, Produto } from "@/types/pedidos";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import ListaCategoria from "./ListaCategorias";
import { categorias } from "../data/categorias";
import { buscarProdutosApi } from "../services/produtosApi";
import ModalMilkshake from "./modals/ModalMilkshake";
import ModalSobremesa from "./modals/ModalSobremesa";
import ModalSorveteAcai from "./modals/ModalSorveteAcai";
import ModalAcaiCopo from "./modals/ModalAcaiCopo";


export default function Catalogo() {
    const [produtos, setProdutos] = useState<Produto[]>([]);
    const [categoriaSelecionada, setCategoriaSelecionada] = useState("");
    const [pedidoSelecionado, setPedidoSelecionado] = useState<Produto | null>(null);
    const [carrinho, setCarrinho] = useState<ItemCarrinho[]>([]);
    const [tipoModal, setTipoModal] = useState<"sorvete" | "milkshake" | "sobremesa" | "acaiCopo" | null>(null);

    useEffect(() => {
        const carrinhoSalvo = sessionStorage.getItem("carrinho");


        if (carrinhoSalvo) {
            setCarrinho(JSON.parse(carrinhoSalvo));
        }
}, []);

    useEffect(() => {
        async function carregarProdutos() {
            if (!categoriaSelecionada) return;

            try {
                const dados = await buscarProdutosApi(categoriaSelecionada);
                console.log("Dados da API:", dados);
                setProdutos(dados);
            } catch (error) {
                console.error(error);
            }
        }

        carregarProdutos();
    }, [categoriaSelecionada]);

    useEffect(() => {
    console.log("Produtos:", produtos);
}, [produtos]);

 const adicionarAoCarrinho = (novoPedido: ItemCarrinho) => {
    const novoCarrinho = [...carrinho, novoPedido];
    setCarrinho(novoCarrinho);

    if (typeof window !== "undefined") { // proteção
        sessionStorage.setItem("carrinho", JSON.stringify(novoCarrinho));
    }
}

console.log("Produtos no state:", produtos);
const router = useRouter();
    return(
        <section className="mt-6 px-1 py-2">    
                <h2 className="text-lg font-semibold mb-4">Escolha sua categoria</h2>

                <ListaCategoria
                    categorias={categorias}
                    categoriaSelecionada={categoriaSelecionada}
                    setCategoriaSelecionada={setCategoriaSelecionada}
                    setPedidoSelecionado={(produto) => {

                        setPedidoSelecionado(produto);

                        if (categoriaSelecionada === "Sorvete + Açaí") {
                            setTipoModal("sorvete");
                        }

                        if (categoriaSelecionada === "Milkshakes") {
                            setTipoModal("milkshake");
                        }
                        if (categoriaSelecionada === "Sobremesas") {
                            setTipoModal("sobremesa");
                        }
                        if (categoriaSelecionada === "Açaí no Copo") {
                            setTipoModal("acaiCopo");
                        }
                    }}

                    adicionarAoCarrinho={adicionarAoCarrinho}
                    produtos={produtos}
                />

                {tipoModal === "sorvete" && (
                    <ModalSorveteAcai
                        pedido={pedidoSelecionado}
                        fechar={() => {
                            setPedidoSelecionado(null);
                            setTipoModal(null);
                        }}
                        adicionarAoCarrinho={adicionarAoCarrinho}
                    />
                )}
                {tipoModal === "milkshake" && (
                    <ModalMilkshake
                        produto={pedidoSelecionado}
                        fechar={() => {
                            setPedidoSelecionado(null);
                            setTipoModal(null);
                        }}
                        adicionarAoCarrinho={adicionarAoCarrinho}
                    />
                )}
                {tipoModal === "sobremesa" && (
                    <ModalSobremesa
                        produto={pedidoSelecionado}
                        fechar={() => {
                            setPedidoSelecionado(null);
                            setTipoModal(null);
                        }}
                        adicionarAoCarrinho={adicionarAoCarrinho}
                    />
                )}
                {tipoModal === "acaiCopo" && (
                    <ModalAcaiCopo
                        produto={pedidoSelecionado}
                        fechar={() => {
                            setPedidoSelecionado(null);
                            setTipoModal(null);
                        }}
                        adicionarAoCarrinho={adicionarAoCarrinho}
                    />
                )}

               <button
                    className="fixed bottom-5 left-1/2 -translate-x-1/2 bg-[#7c3aed] hover:bg-[#6d28d9] transition px-4 py-3 rounded-4xl shadow-2xl flex items-center gap-3 z-10"
                    onClick={() => router.push("/carrinho")}
                >
                    <div className="relative">
                        <ShoppingCart size={26} />

                        <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                            {carrinho.length}
                        </span>
                    </div>

                    <span className="font-semibold">
                        Meu Carrinho
                    </span>
                </button>              
              </section>
    )
}