export default function Localizacao() {
    return (
        // tom esverdeado escuro — transição suave vindo do Sorvetes
        <section className="w-full bg-[#0f1f0c] pt-16 pb-0 flex flex-col items-center gap-10 px-6 overflow-hidden">

            {/* mesmo padrão de título das outras seções */}
            <div className="text-center">
                <p className="text-[#8cdc6d] font-semibold text-lg uppercase tracking-widest mb-2">
                    Onde nos encontrar
                </p>
                <h2 className="text-5xl md:text-6xl font-extrabold text-white drop-shadow">
                    Nossa
                </h2>
                <h2 className="text-5xl md:text-6xl font-extrabold text-[#6ddc8b] drop-shadow">
                    Localização
                </h2>
            </div>

            {/* mapa com borda verde sutil */}
            <div className="w-full max-w-3xl h-[350px] rounded-2xl overflow-hidden shadow-2xl border border-[#6ddc8b]/30">
                {/* o /30 no final da cor significa 30% de opacidade
                    fica uma borda bem sutil, elegante */}
                <iframe
                    src="https://www.google.com/maps?q=R.+Maurício+Allain,+229,+Rafard+SP&output=embed"
                    className="w-full h-full border-0"
                    loading="lazy"
                />
            </div>

            {/* endereço em destaque */}
            <div className="flex flex-col items-center gap-2 text-center">
                <p className="text-[#6ddc8b] font-bold text-xl">
                    📍 Primeira Unidade em Rafard SP
                </p>
                <p className="text-gray-400 text-sm max-w-md leading-relaxed">
                    A Vornei Sorveteria e Milkshakeria foi criada com o propósito 
                    de trazer algo novo e diferenciado para o mercado.
                </p>
            </div>

            {/* ondinha puxando pro footer */}
   {/* troca a ondinha SVG por isso */}
<div
    className="w-full mt-8"
    style={{
        height: "80px",
        clipPath: "ellipse(55% 100% at 50% 100%)"
    }}
/>

        </section>
    );
}