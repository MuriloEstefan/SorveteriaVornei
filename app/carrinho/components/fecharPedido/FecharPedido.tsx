"use client";

import DadosCliente from "./FormCliente";
import { ItemCarrinho } from "@/types/pedidos";
import { useFecharPedido } from "../../hooks/useFecharPedido";
import { useLojaAberta } from "../../hooks/useLojaAberta"; 
import { useState } from "react";
import EscolhaEntrega from "./EscolhaEntrega";
import AcoesModal from "./AcoesModal";
import Modal from "./Modal";
import ModalTitulo from "./ModalTitulo";
import EscolhaPagamento from "./EscolhaPagamento";
import { toast } from "react-toastify"; 

type Props = {
    carrinho: ItemCarrinho[];
    totalPedidos: number;
    finalizarCompra: () => void;
}

export default function FecharCarrinho({carrinho, totalPedidos, finalizarCompra}: Props) {
    const lojaAberta = useLojaAberta(); 

    const {
        aberto, setAberto,
        etapa, setEtapa,
        tipoEntrega, setTipoEntrega,
        rua, setRua,
        numero, setNumero,
        bairro, setBairro,
        complemento, setComplemento,
        cidade, setCidade,
        formaPagamento, setFormaPagamento,
        trocoPara, setTrocoPara,
    } = useFecharPedido();

    const [dadosCliente, setDadosCliente] = useState({
        nome: "",
        sobrenome: "",
        telefone: "",
        observacao: "",
        colher: false,
    });

    const [frete, setFrete] = useState(0);

    return (
        <>
            <button
                onClick={() => {
                    if (!lojaAberta) {
                        toast.error("A loja está fechada no momento. Volte mais tarde!");
                        return;
                    }
                    if (carrinho.length === 0 ) {
                        toast.error("Adicione pelo menos um item ao carrinho")
                        return;
                    }
                    setAberto(true);
                }}
                disabled={!lojaAberta}
                className={`
                w-full
                mt-5
                transition
                py-4
                rounded-2xl
                font-semibold
                text-white
                shadow-lg
                ${
                    lojaAberta
                        ? "bg-purple-600 hover:bg-purple-500 cursor-pointer"
                        : "bg-white/10 cursor-not-allowed opacity-60"
                }
                `}
            >
                {lojaAberta ? "Fechar Pedido" : "Loja Fechada no momento"}
            </button>

            {aberto && (
                <Modal>
                    <ModalTitulo></ModalTitulo>

                    {etapa === 1 && (
                        <>
                            <EscolhaEntrega
                                tipoEntrega={tipoEntrega}
                                setTipoEntrega={setTipoEntrega}
                                rua={rua}
                                setRua={setRua}
                                numero={numero}
                                setNumero={setNumero}
                                bairro={bairro}
                                setBairro={setBairro}
                                complemento={complemento}
                                setComplemento={setComplemento}
                                cidade={cidade}
                                setCidade={setCidade}
                                setFrete={setFrete} 
                            />

                            <AcoesModal
                                tipoEntrega={tipoEntrega}
                                rua={rua}
                                numero={numero}
                                bairro={bairro}
                                cidade={cidade}
                                fecharModal={() => setAberto(false)}
                                continuar={() => setEtapa(2)}
                            />
                        </>
                    )}

                    {etapa === 2 && (
                        <DadosCliente
                            voltar={() => setEtapa(1)}
                            continuar={(dados) => {
                                setDadosCliente(dados);
                                setEtapa(3);
                            }}
                        />
                    )}

                    {etapa === 3 && (
                        <EscolhaPagamento
                            formaPagamento={formaPagamento}
                            setFormaPagamento={setFormaPagamento}
                            trocoPara={trocoPara}
                            setTrocoPara={setTrocoPara}
                            dadosCliente={dadosCliente}
                            tipoEntrega={tipoEntrega}
                            rua={rua}
                            numero={numero}
                            bairro={bairro}
                            complemento={complemento}
                            cidade={cidade}
                            frete={frete} 
                            carrinho={carrinho}
                            totalPedidos={totalPedidos}
                            voltar={() => setEtapa(2)}
                            fecharModal={() => setAberto(false)}
                            finalizarCompra={finalizarCompra}
                        />
                    )}
                </Modal>
            )}
        </>
    );
}