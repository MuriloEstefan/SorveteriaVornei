"use client";

import { ArrowLeft } from "lucide-react";
import { ItemCarrinho } from "@/types/pedidos";
import { toast } from "react-toastify";
import { finalizarPedido } from "@/components/services/finalizarPedido";
import { abrirWhatsApp } from "@/components/services/abrirWhatsApp";
import { agruparItens } from "@/lib/agruparItens";
import { useRouter } from "next/navigation";
import OpcoesPagamento from "./OpcoesPagamento";
import TrocoInput from "./TrocoInput";
import ResumoTotal from "./ResumoTotal";

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
    limparCarrinho: () => void;
};

function formatarMoeda(valor: number) {
    return `R$ ${valor.toFixed(2).replace(".", ",")}`;
}

export default function EscolhaPagamento({
    formaPagamento, setFormaPagamento,
    trocoPara, setTrocoPara,
    dadosCliente,
    tipoEntrega, rua, numero, bairro, complemento, cidade,
    frete,
    carrinho, totalPedidos,
    voltar, fecharModal, limparCarrinho,
}: Props) {
    const totalComFrete = totalPedidos + frete;
    const pedidosAgrupados = agruparItens(carrinho);
    const router = useRouter();

    async function handleFinalizar() {
        if (!formaPagamento) {
            toast.error("Escolha uma forma de pagamento.");
            return;
        }

        if (formaPagamento === "Dinheiro") {
            const valorTroco = Number(trocoPara);
            if (!trocoPara || valorTroco < totalComFrete) {
                toast.error(`O troco deve ser de pelo menos ${formatarMoeda(totalComFrete)}`);
                return;
            }
        }

        const dadosPedido = {
            cliente: dadosCliente,
            entrega: { tipo: tipoEntrega, rua, numero, bairro, complemento, cidade },
            pagamento: { forma: formaPagamento, trocoPara },
            pedidos: pedidosAgrupados,
            frete,
            total: totalComFrete,
        };

        try {
            await finalizarPedido(dadosPedido);
            localStorage.removeItem("carrinho");
            abrirWhatsApp(dadosPedido);
            toast.success("Pedido realizado com sucesso!");
            fecharModal();
            router.push("/pedido");
        } catch (erro) {
            console.error("Erro ao finalizar pedido:", erro);
            toast.error("Não foi possível realizar o pedido.");
        }
    }

    return (
        <div className="mt-5 space-y-6">

            <button
                onClick={voltar}
                className="flex items-center gap-2 text-white/70 hover:text-purple-400 transition text-sm"
            >
                <ArrowLeft size={18} />
                Voltar
            </button>

            <div>
                <h2 className="text-xl font-bold text-white">Forma de pagamento</h2>
                <p className="text-white/40 text-sm mt-1">Escolha como você vai pagar</p>
            </div>

            <OpcoesPagamento
                formaPagamento={formaPagamento}
                setFormaPagamento={setFormaPagamento}
            />

            {formaPagamento === "Dinheiro" && (
                <TrocoInput
                    trocoPara={trocoPara}
                    setTrocoPara={setTrocoPara}
                />
            )}

            <ResumoTotal
                totalPedidos={totalPedidos}
                frete={frete}
                tipoEntrega={tipoEntrega}
            />

            <button
                onClick={handleFinalizar}
                className="
                    w-full bg-green-600 hover:bg-green-500
                    active:scale-[0.98] transition py-4 rounded-2xl
                    font-bold text-white cursor-pointer
                "
            >
                Finalizar Pedido
            </button>

        </div>
    );
}