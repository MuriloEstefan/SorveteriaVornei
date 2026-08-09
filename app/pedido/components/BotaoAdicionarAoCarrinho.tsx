interface BotaoAdicionarCarrinhoProps {
    onClick: () => void;
    preco: number;
    ativado: boolean;
    texto?: string;
}

export default function BotaoAdicionarCarrinho({
    onClick,
    preco,
    ativado,
    texto = "Adicionar ao Carrinho",
}: BotaoAdicionarCarrinhoProps) {
    return (
        <button
            onClick={onClick}
            disabled={!ativado}
            className="
                w-full
                bg-gradient-to-r from-purple-600 to-purple-500
                hover:from-purple-500 hover:to-purple-400
                disabled:from-white/10
                disabled:to-white/10
                disabled:cursor-not-allowed
                active:scale-[0.98]
                transition-all
                duration-200
                rounded-2xl
                py-4
                px-6
                font-bold
                text-white
                flex
                items-center
                justify-between
                cursor-pointer
            "
        >
            <span>{texto}</span>
            <span>R$ {preco.toFixed(2).replace(".", ",")}</span>
        </button>
    );
}