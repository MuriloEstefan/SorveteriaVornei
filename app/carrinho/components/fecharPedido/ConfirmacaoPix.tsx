"use client";

import { toast } from "react-toastify";
import { Copy, Check } from "lucide-react";
import { useState } from "react";
import Image from "next/image";
import { CHAVE_PIX, QR_CODE_PIX } from "@/lib/dadosPix";

interface ConfirmacaoPixProps {
    onConfirmar: () => void;
}

export default function ConfirmacaoPix({ onConfirmar }: ConfirmacaoPixProps) {
    const [copiado, setCopiado] = useState(false);

    const copiarChave = async () => {
        try {
            await navigator.clipboard.writeText(CHAVE_PIX);
        } catch {
            const textarea = document.createElement("textarea");
            textarea.value = CHAVE_PIX;
            textarea.style.position = "fixed";
            textarea.style.opacity = "0";
            document.body.appendChild(textarea);
            textarea.focus();
            textarea.select();

            try {
                document.execCommand("copy");
            } catch {
                toast.error("Não foi possível copiar. Copie manualmente: " + CHAVE_PIX);
                document.body.removeChild(textarea);
                return;
            }

            document.body.removeChild(textarea);
        }

        setCopiado(true);
        toast.success("Chave PIX copiada!");
        setTimeout(() => setCopiado(false), 2000);
    };

    return (
        <div className="text-center space-y-5">
            <div>
                <h2 className="text-lg font-bold text-white">Pague com PIX</h2>
                <p className="text-white/40 text-sm mt-1">
                    Escaneie o QR Code ou copie a chave abaixo
                </p>
            </div>

            <div className="bg-white rounded-2xl p-4 mx-auto w-fit">
                <Image
                    src={QR_CODE_PIX}
                    alt="QR Code PIX"
                    width={220}
                    height={220}
                    className="rounded-lg"
                />
            </div>

            <button
                onClick={copiarChave}
                className="
                    w-full flex items-center justify-between
                    bg-white/5 border border-white/10 rounded-xl p-4
                    text-left cursor-pointer hover:bg-white/10 transition
                "
            >
                <span className="text-white/80 text-sm truncate pr-3">{CHAVE_PIX}</span>
                {copiado ? (
                    <Check size={18} className="text-green-400 shrink-0" />
                ) : (
                    <Copy size={18} className="text-white/50 shrink-0" />
                )}
            </button>

            <button
                onClick={onConfirmar}
                className="
                    w-full bg-green-600 hover:bg-green-500 active:scale-[0.98]
                    transition py-4 rounded-2xl font-bold text-white cursor-pointer
                "
            >
                Enviar comprovante e acompanhar pelo WhatsApp
            </button>
        </div>
    );
}