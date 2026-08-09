"use client";

import { useState } from "react";

export function useFecharPedido() {

    const [aberto, setAberto] = useState(false);
    const [etapa, setEtapa] = useState(1);

    const [tipoEntrega, setTipoEntrega] = useState("");

    const [rua, setRua] = useState("");
    const [numero, setNumero] = useState("");
    const [bairro, setBairro] = useState("");
    const [complemento, setComplemento] = useState("");
    const [cidade, setCidade] = useState(""); 

    const [formaPagamento, setFormaPagamento] = useState("");
    const [trocoPara, setTrocoPara] = useState("");

    return {
        aberto,
        setAberto,

        etapa,
        setEtapa,

        tipoEntrega,
        setTipoEntrega,

        rua,
        setRua,

        numero,
        setNumero,

        bairro,
        setBairro,

        complemento,
        setComplemento,

        cidade,      
        setCidade,   

        formaPagamento,
        setFormaPagamento,

        trocoPara,
        setTrocoPara,
    };
}