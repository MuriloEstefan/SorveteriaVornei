"use client"; 

import Header from "./components/Header"
import Catalogo from "./components/Catalogo"

export default function PagePedido() {
  return (
    <main className="min-h-screen bg-[var(--cor-fundo)] text-white px-4 py-5">
      <Header titulo="Monte seu Pedido"></Header>
      <Catalogo></Catalogo>
    </main>
  );
}