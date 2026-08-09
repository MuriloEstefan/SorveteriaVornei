"use client";

import { PedidoBanco } from "@/types/pedidos";
import ListaItensPedido from "@/app/admin/pedidos/components/ListaItensPedido";

interface ModalDetalhesPedidoProps {
    pedido: PedidoBanco | null;
    carregando: boolean;
    onFechar: () => void;
}

function formatarTipoEntrega(tipo: string) {
    if (tipo === "retirada") return "Retirada no local";
    if (tipo === "entrega") return "Entrega no endereço";
    return tipo;
}

function formatarCidade(cidade: string) {
    if (cidade === "rafard") return "Rafard";
    if (cidade === "capivari") return "Capivari";
    return cidade;
}

function formatarMoeda(valor: number | undefined) {
    console.log("formatarMoeda recebeu:", valor);

    if (valor === undefined || valor === null) {
        return "R$ 0,00";
    }

    return `R$ ${valor.toFixed(2).replace(".", ",")}`;
}

export default function ModalDetalhesPedido({
    pedido, carregando, onFechar,
}: ModalDetalhesPedidoProps) {
    if (!pedido && !carregando) return null;

    const subtotal = pedido ? pedido.total - (pedido.frete || 0) : 0;

    return (
        <div
            className="fixed inset-0 bg-black/60 flex items-center justify-center p-4 z-50"
            onClick={onFechar}
        >
            <div
                className="bg-[#1c1630] rounded-2xl max-w-lg w-full max-h-[85vh] overflow-y-auto"
                onClick={(e) => e.stopPropagation()}
            >
                {carregando || !pedido ? (
                    <p className="text-zinc-400 p-6">Carregando detalhes...</p>
                ) : (
                    <>
                        <div className="p-5 border-b border-white/5 flex items-center justify-between">
                            <div>
                                <h2 className="text-xl font-bold text-white">Pedido #{pedido.id}</h2>
                                <p className="text-zinc-400 text-sm">
                                    {pedido.nome} {pedido.sobrenome} · {pedido.telefone}
                                </p>
                            </div>
                            <button
                                onClick={onFechar}
                                className="text-zinc-400 hover:text-white text-2xl leading-none"
                            >
                                ×
                            </button>
                        </div>

                        <div className="p-5 space-y-2 text-sm text-zinc-300 border-b border-white/5">
                            <div className="flex items-center gap-2">
                                <span
                                    className={`text-xs font-semibold px-2 py-0.5 rounded-full ${
                                        pedido.tipo_entrega === "retirada"
                                            ? "bg-blue-500/20 text-blue-300"
                                            : "bg-purple-500/20 text-purple-300"
                                    }`}
                                >
                                    {formatarTipoEntrega(pedido.tipo_entrega)}
                                </span>
                            </div>

                            {pedido.tipo_entrega !== "retirada" && (
                                <>
                                    <p>
                                        <span className="text-zinc-500">Endereço:</span> {pedido.rua}, {pedido.numero} - {pedido.bairro}
                                        {pedido.complemento && ` (${pedido.complemento})`}
                                    </p>
                                    <p className="text-zinc-500 text-xs">
                                        {formatarCidade(pedido.cidade)}
                                    </p>
                                </>
                            )}

                            {pedido.observacao && (
                                <p><span className="text-zinc-500">Obs:</span> {pedido.observacao}</p>
                            )}
                        </div>

                        {/* Novo bloco: forma de pagamento */}
                        <div className="p-5 border-b border-white/5">
                            <p className="text-xs text-white/30 uppercase tracking-widest font-bold mb-3">
                                Pagamento
                            </p>
                            <div className="flex items-center justify-between text-sm">
                                <span className="text-zinc-300">{pedido.forma_pagamento}</span>
                                {pedido.forma_pagamento === "Dinheiro" && pedido.troco_para !== null && (
                                    <span className="text-zinc-400 text-xs">
                                        Troco para {formatarMoeda(pedido.troco_para)}
                                    </span>
                                )}
                            </div>
                        </div>

                        <ListaItensPedido pedido={pedido} />

                        {/* Bloco de total com breakdown do frete */}
                        <div className="p-5 border-t border-white/5 space-y-1">
                            <div className="flex justify-between text-sm text-zinc-400">
                                <span>Subtotal</span>
                                <span>{formatarMoeda(subtotal)}</span>
                            </div>

                            {pedido.tipo_entrega === "entrega" && (
                                <div className="flex justify-between text-sm text-zinc-400">
                                    <span>Frete</span>
                                    <span>{pedido.frete > 0 ? formatarMoeda(pedido.frete) : "Grátis"}</span>
                                </div>
                            )}

                            <div className="flex justify-between items-center pt-1">
                                <span className="text-zinc-400 text-sm">Total</span>
                                <span className="text-emerald-400 text-xl font-bold">
                                    {formatarMoeda(pedido.total)}
                                </span>
                            </div>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}