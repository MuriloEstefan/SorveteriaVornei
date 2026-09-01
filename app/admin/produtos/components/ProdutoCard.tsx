"use client";

import Image from "next/image";
import { ProdutoAdmin } from "@/types/produto";
import { useState } from 'react';
import { toast } from "react-toastify";

interface ProdutoCardProps {
    produto: ProdutoAdmin;
    onToggleDisponivel: () => void;
    onToggleAtivo: () => void;
    onSalvarPreco: (novoPreco: number) => void;
}

export default function ProdutoCard({
    produto,
    onToggleDisponivel,
    onToggleAtivo,
    onSalvarPreco,
}: ProdutoCardProps) {
    const [editando, setEditando] = useState(false);
    const [novoPreco, setNovoPreco] = useState<string>("");

    const iniciarEdicao = () => {
        setNovoPreco(String(produto.preco));
        setEditando(true);
    };

    const salvar = () => {
        const valorConvertido = Number(novoPreco);

        if (Number.isNaN(valorConvertido) || valorConvertido <= 0) {
            alert("Digite um preço válido.");
            return;
        }

        onSalvarPreco(valorConvertido);
        setEditando(false);

        toast.success("Preço atualizado com sucesso!");
    };

    const cancelar = () => {
        setEditando(false);
    };

    return (
        <div
            className={`bg-[#2b2340] rounded-2xl border border-white/5 p-4 flex items-center gap-4 transition ${
                !produto.ativo ? "opacity-40" : ""
            }`}
        >
            {/* Imagem */}
            <div className="relative shrink-0 w-20 h-20 rounded-2xl bg-gradient-to-br from-[#3a2f5c] to-[#241c3d] p-1 ring-1 ring-white/10 shadow-lg shadow-black/20">
                <div className="relative w-full h-full rounded-xl overflow-hidden bg-white/5">
                    <Image
                        src={produto.imagem}
                        alt={produto.nome}
                        fill
                        sizes="80px"
                        quality={90}
                        className="object-cover"
                    />
                </div>

                {!produto.disponivel && produto.ativo && (
                    <div className="absolute inset-0 rounded-2xl bg-black/50 flex items-center justify-center">
                        <span className="text-[10px] font-bold text-red-300 uppercase tracking-wide">
                            Esgotado
                        </span>
                    </div>
                )}
            </div>

            <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                    <p className="font-semibold text-white truncate">{produto.nome}</p>
                    {!produto.disponivel && produto.ativo && (
                        <span className="text-xs bg-red-500/20 text-red-300 px-2 py-0.5 rounded-full font-semibold shrink-0">
                            Esgotado
                        </span>
                    )}
                    {!produto.ativo && (
                        <span className="text-xs bg-white/10 text-white/50 px-2 py-0.5 rounded-full font-semibold shrink-0">
                            Desativado
                        </span>
                    )}
                </div>

                {editando ? (
                    <div className="flex items-center gap-2 mt-1">
                        <span className="text-white/40 text-sm">R$</span>
                        <input
                            type="number"
                            step="0.01"
                            autoFocus
                            value={novoPreco}
                            onChange={(e) => setNovoPreco(e.target.value)}
                            className="w-20 bg-white/10 text-white text-sm rounded-lg px-2 py-1 outline-none border border-purple-500/50"
                        />
                        <button
                            onClick={salvar}
                            className="text-xs px-2 py-1 rounded-lg bg-green-500/20 text-green-300 hover:bg-green-500/30 transition"
                        >
                            Salvar
                        </button>
                        <button
                            onClick={cancelar}
                            className="text-xs px-2 py-1 rounded-lg bg-white/5 text-white/50 hover:bg-white/10 transition"
                        >
                            Cancelar
                        </button>
                    </div>
                ) : (
                    <div className="flex items-center gap-2 mt-0.5">
                        <p className="text-white/40 text-sm">
                            R$ {Number(produto.preco).toFixed(2).replace(".", ",")}
                        </p>
                        <button
                            onClick={iniciarEdicao}
                            className="text-[11px] px-2 py-0.5 rounded-md bg-white/5 text-white/40 hover:bg-white/10 hover:text-white/70 transition cursor-pointer"
                        >
                            Editar
                        </button>
                    </div>
                )}
            </div>

            <div className="flex flex-col gap-2 items-end shrink-0">
                <button
                    onClick={onToggleDisponivel}
                    disabled={!produto.ativo}
                    className={`text-xs px-3 py-1.5 rounded-lg font-semibold transition disabled:opacity-30 disabled:cursor-not-allowed ${
                        produto.disponivel
                            ? "bg-green-500/20 text-green-300 hover:bg-green-500/30"
                            : "bg-red-500/20 text-red-300 hover:bg-red-500/30"
                    }`}
                >
                    {produto.disponivel ? "Disponível" : "Esgotado"}
                </button>

                <button
                    onClick={onToggleAtivo}
                    className="text-xs px-3 py-1.5 rounded-lg font-semibold bg-white/5 text-white/50 hover:bg-white/10 transition"
                >
                    {produto.ativo ? "Desativar" : "Reativar"}
                </button>
            </div>
        </div>
    );
}