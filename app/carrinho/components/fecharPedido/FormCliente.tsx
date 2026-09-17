"use client";

import { useState } from "react";
import { ArrowLeft, ShieldCheck } from "lucide-react";
import { toast } from "react-toastify";

type Props = {
    voltar: () => void;

    continuar: (dados: {
        nome: string;
        sobrenome: string;
        telefone: string;
        observacao: string;
        colher: boolean;
    }) => void;
};

export default function DadosCliente({ voltar, continuar }: Props) {

    const [nome, setNome] = useState("");
    const [sobrenome, setSobrenome] = useState("");
    const [telefone, setTelefone] = useState("");
    const [observacao, setObservacao] = useState("");
    const [colher, setColher] = useState(false);

    return (
        <div className="mt-5 space-y-4">

            <button
                onClick={voltar}
                className="mb-4 flex items-center gap-2 text-white hover:text-[#d9a8e8] transition cursor-pointer"
            >
                <ArrowLeft size={20} />
                Voltar
            </button>

            <div>
                <label className="text-white/50 text-xs font-medium block mb-1.5 px-1">
                    Nome <span className="text-red-400">*</span>
                </label>
                <input
                    type="text"
                    placeholder="Nome"
                    value={nome}
                    onChange={(e) => setNome(e.target.value)}
                    className="w-full bg-[#3d1f52] rounded-xl p-3 outline-none text-white"
                />
            </div>

            <div>
                <label className="text-white/50 text-xs font-medium block mb-1.5 px-1">
                    Sobrenome <span className="text-red-400">*</span>
                </label>
                <input
                    type="text"
                    placeholder="Sobrenome"
                    value={sobrenome}
                    onChange={(e) => setSobrenome(e.target.value)}
                    className="w-full bg-[#3d1f52] rounded-xl p-3 outline-none text-white"
                />
            </div>

            <div>
                <label className="text-white/50 text-xs font-medium block mb-1.5 px-1">
                    Telefone <span className="text-red-400">*</span>
                </label>
                <input
                    type="tel"
                    placeholder="Telefone"
                    value={telefone}
                    onChange={(e) => {
                        const valor = e.target.value;

                        if (valor !== "" && !/^\d+$/.test(valor)) {
                            toast.error("Informe um número válido. ", {
                                toastId: "telefone-invalido",
                            })
                            return;
                        }

                        if (valor.length > 11) return;

                        setTelefone(valor);
                    }}
                    className="w-full bg-[#3d1f52] rounded-xl p-3 outline-none text-white"
                />
            </div>

            <div>
                <label className="text-white/50 text-xs font-medium block mb-1.5 px-1">
                    Observações do pedido <span className="text-white/30">(opcional)</span>
                </label>
                <textarea
                    placeholder="Ex: sem açúcar, capricha na calda..."
                    value={observacao}
                    onChange={(e) => setObservacao(e.target.value)}
                    className="w-full h-28 resize-none bg-[#3d1f52] rounded-xl p-3 outline-none text-white"
                />
            </div>

            <div className="flex items-center justify-between bg-[#3d1f52] rounded-2xl p-4">
                <span className="text-white">Deseja colher?</span>
                <input
                    type="checkbox"
                    checked={colher}
                    onChange={(e) => setColher(e.target.checked)}
                    className="w-5 h-5"
                />
            </div>

            <div className="flex items-start gap-2 px-1 pt-1">
                <ShieldCheck size={14} className="text-white/40 shrink-0 mt-0.5" />
                <p className="text-white/40 text-xs leading-relaxed">
                    Seus dados são usados só para processar seu pedido e não são compartilhados com terceiros.
                </p>
            </div>

            <button
                onClick={() => {

                    if (!nome.trim() || !sobrenome.trim() || !telefone.trim()) {
                        toast.error("Preencha os campos obrigatorios!")
                        return;
                    }

                    if (telefone.length < 10) {
                        toast.error("Informe um telefone válido");
                        return;
                    }

                    continuar({
                        nome,
                        sobrenome,
                        telefone,
                        observacao,
                        colher,
                    });
                }}
                className="
                    w-full
                    bg-green-600
                    hover:bg-green-500
                    transition
                    py-4
                    rounded-2xl
                    font-semibold
                    text-white
                    mt-6
                    cursor-pointer
                "
            >
                Continuar
            </button>
        </div>
    );
}