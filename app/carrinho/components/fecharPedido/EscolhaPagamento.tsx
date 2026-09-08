"use client";

import { ArrowLeft, QrCode, CreditCard, Banknote, Check } from "lucide-react";
import { ItemCarrinho } from "@/types/pedidos";
import { toast } from "react-toastify";
import { finalizarPedido } from "@/components/services/finalizarPedido";
import { abrirWhatsApp } from "@/components/services/abrirWhatsApp";
import ConfirmacaoPix from "./ConfirmacaoPix";
import { TEMPO_ENTREGA_MINUTOS } from "@/lib/tempoEntrega";

type Props = {
    formaPagamento: string;
    setFormaPagamento: (forma: string) => void;

    trocoPara: string;
    setTrocoPara: (valor: string) => void;

    dadosCliente: {
        nome: string;
        sobrenome: string;
        telefone: string;
        observacao: string;
        colher: boolean;
    };

    tipoEntrega: string;
    rua: string;
    numero: string;
    bairro: string;
    complemento: string;
    cidade: string;
    frete: number;

    carrinho: ItemCarrinho[];

    totalPedidos: number;

    voltar: () => void;
    fecharModal: () => void;
    finalizarCompra: () => void;
};

const opcoesPagamento = [
    { nome: "PIX", icone: QrCode },
    { nome: "Cartão", icone: CreditCard },
    { nome: "Dinheiro", icone: Banknote },
];

function formatarMoeda(valor: number) {
    return `R$ ${valor.toFixed(2).replace(".", ",")}`;
}

export default function EscolhaPagamento({
    formaPagamento,
    setFormaPagamento,

    trocoPara,
    setTrocoPara,

    dadosCliente,

    tipoEntrega,
    rua,
    numero,
    bairro,
    complemento,
    cidade,
    frete,

    carrinho,
    totalPedidos,

    voltar,
    fecharModal,
    finalizarCompra,
}: Props) {
    const totalComFrete = totalPedidos + frete;

    const montarDadosPedido = () => ({
        cliente: dadosCliente,
        entrega: {
            tipo: tipoEntrega,
            rua,
            numero,
            bairro,
            complemento,
            cidade,
        },
        pagamento: {
            forma: formaPagamento,
            trocoPara,
        },
        pedidos: carrinho,
        frete,
        total: totalComFrete,
    });

    const confirmarEEnviar = async () => {
        const dadosPedido = montarDadosPedido();
        await finalizarPedido(dadosPedido);

        abrirWhatsApp(dadosPedido);
        toast.success("Pedido realizado com sucesso!");
        fecharModal();
        finalizarCompra();
    };

    const clicouFinalizarPedido = async () => {
        if (!formaPagamento) {
            toast.error("Escolha uma forma de pagamento.");
            return;
        }

        await confirmarEEnviar();
    };

    return (
    <div className="mt-5 space-y-6">

        <button
            onClick={voltar}
            className="flex items-center gap-2 text-white/70 hover:text-purple-400 transition text-sm"
        >
            <ArrowLeft size={18}/>
            Voltar
        </button>

        <div>
            <h2 className="text-xl font-bold text-white">
                Forma de pagamento
            </h2>
            <p className="text-white/40 text-sm mt-1">
                Escolha como você vai pagar
            </p>
        </div>

        <div className="space-y-3">
            {opcoesPagamento.map((opcao) => {
                const Icone = opcao.icone;
                const selecionado = formaPagamento === opcao.nome;

                return (
                    <button
                        key={opcao.nome}
                        onClick={() => setFormaPagamento(opcao.nome)}
                        className={`
                            w-full
                            flex
                            items-center
                            justify-between
                            rounded-2xl
                            p-4
                            border
                            transition
                            text-white

                            ${
                                selecionado
                                    ? "bg-purple-600/20 border-purple-500"
                                    : "bg-white/5 border-white/10 hover:bg-white/10"
                            }
                        `}
                    >
                        <div className="flex items-center gap-3">
                            <div className={`
                                w-10
                                h-10
                                rounded-full
                                flex
                                items-center
                                justify-center
                                transition

                                ${
                                    selecionado
                                        ? "bg-purple-600"
                                        : "bg-white/10"
                                }
                            `}>
                                <Icone size={18} className="text-white" />
                            </div>
                            <span className="font-semibold">
                                {opcao.nome}
                            </span>
                        </div>

                        {selecionado && (
                            <div className="w-6 h-6 rounded-full bg-purple-600 flex items-center justify-center">
                                <Check size={14} className="text-white" />
                            </div>
                        )}
                    </button>
                );
            })}
        </div>

        {formaPagamento === "Dinheiro" && (
            <div className="animate-fade-in">
                <label className="text-white/70 text-sm font-medium block mb-2">
                    Troco para quanto?
                </label>
                <input
                    type="number"
                    placeholder="Ex: 50,00"
                    value={trocoPara}
                    onChange={(e) => setTrocoPara(e.target.value)}
                    className="
                        w-full
                        bg-white/5
                        border border-white/10
                        rounded-xl
                        p-4
                        text-white
                        outline-none
                        placeholder:text-white/30
                        focus:border-purple-500/50
                        transition
                    "
                />
            </div>
        )}

        {formaPagamento === "PIX" && (
            <div className="animate-fade-in">
                <ConfirmacaoPix onConfirmar={confirmarEEnviar} />
            </div>
        )}

        <div className="bg-white/5 rounded-2xl p-4 space-y-2">
           {tipoEntrega === "entrega" && (
                <div className="flex justify-between text-sm text-white/60">
                    <span>Tempo estimado</span>
                    <span>{TEMPO_ENTREGA_MINUTOS} min</span>
                </div>
            )}

            <div className="flex justify-between text-sm text-white/60">
                <span>Subtotal</span>
                <span>{formatarMoeda(totalPedidos)}</span>
            </div>

            <div className="flex justify-between text-sm text-white/60">
                <span>Frete {tipoEntrega === "retirada" && "(retirada)"}</span>
                <span>{frete === 0 ? "Grátis" : formatarMoeda(frete)}</span>
            </div>

            <div className="h-px bg-white/10 my-1" />

            <div className="flex justify-between text-white font-bold text-lg">
                <span>Total</span>
                <span>{formatarMoeda(totalComFrete)}</span>
            </div>
        </div>

        {formaPagamento !== "PIX" && (
            <button
                onClick={clicouFinalizarPedido}
                className="
                    w-full
                    bg-green-600
                    hover:bg-green-500
                    active:scale-[0.98]
                    transition
                    py-4
                    rounded-2xl
                    font-bold
                    text-white
                    cursor-pointer
                "
            >
                Finalizar Pedido e Acompanhar pelo Whatsapp
            </button>
        )}

    </div>
    );
}