import { toast } from "react-toastify";

interface AcoesModalProps {
    tipoEntrega: string;

    rua: string;
    numero: string;
    bairro: string;
    cidade: string;

    fecharModal: () => void;
    continuar: () => void;
}

export default function AcoesModal({
    tipoEntrega,
    rua,
    numero,
    bairro,
    cidade,
    fecharModal,
    continuar,
}: AcoesModalProps) {

    const validar = () => {

        if (
            tipoEntrega === "entrega" &&
            (!rua || !numero || !bairro || !cidade)
        ) {
            toast.error("Preencha todos os campos!");
            return;
        }

        continuar();
    };

    return (
        <div className="flex gap-3 mt-6">

            <button
                onClick={fecharModal}
                className="flex-1 bg-white/10 py-3 rounded-xl"
            >
                Cancelar
            </button>

            <button
                onClick={validar}
                className="flex-1 bg-green-600 py-3 rounded-xl font-semibold"
            >
                Continuar
            </button>

        </div>
    );
}