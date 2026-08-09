"use client";

import Carrinho from "@/app/carrinho/components/Carrinho";
import Header from "../pedido/components/Header";
import { ItemCarrinho } from "@/types/pedidos";
import { useState, useEffect } from "react";

export default function PaginaCarrinho() {

   const [carrinho, setCarrinho] = useState<ItemCarrinho[]>([]);

    useEffect(() => {
        const carrinhoSalvo = localStorage.getItem("carrinho");
        if (carrinhoSalvo) {
             
            setCarrinho(JSON.parse(carrinhoSalvo));
        }
}, []); // roda só no cliente, depois da hidratação

    const removerItem = (index: number) => {

        const novoCarrinho = carrinho.filter((_, i) => i !== index);

        setCarrinho(novoCarrinho);

        localStorage.setItem(
            "carrinho",
            JSON.stringify(novoCarrinho)
        );
    };

    return (
        <main className="min-h-screen bg-[#140f1f] p-6">
            <Header titulo="Seu Carrinho" />

            <Carrinho
                carrinho={carrinho}
                removerItem={removerItem}
            />
        </main>
    );
}