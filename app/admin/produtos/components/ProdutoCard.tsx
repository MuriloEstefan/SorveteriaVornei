"use client";

import Image from "next/image";
import { ProdutoAdmin } from "@/types/produto";

interface ProdutoCardProps {
    produto: ProdutoAdmin;
    onToggleDisponivel: () => void;
    onToggleAtivo: () => void;
}

export default function ProdutoCard({
    produto,
    onToggleDisponivel,
    onToggleAtivo,
}: ProdutoCardProps) {
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
                <p className="text-white/40 text-sm">
                    R$ {Number(produto.preco).toFixed(2).replace(".", ",")}
                </p>
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