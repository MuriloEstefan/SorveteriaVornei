import Image from "next/image";
import Link from "next/link";

export default function Localizacao() {
    return (
        <section className="w-full pt-16 pb-0 flex flex-col items-center gap-10 px-6 overflow-hidden bg-gradient-to-b from-[#1f4d38] via-[#1a2e2a] to-[var(--bg-base)]">

            <div className="text-center">
                <p className="text-[#6ddc8b] font-semibold text-lg uppercase tracking-widest mb-2">
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
                <iframe
                    src="https://www.google.com/maps?q=R.+Maurício+Allain,+229,+Rafard+SP&output=embed"
                    className="w-full h-full border-0"
                    loading="lazy"
                />
            </div>

            {/* endereço em destaque */}
            <div className="flex flex-col items-center gap-2 text-center">
                <p className="text-[#6ddc8b] font-bold text-xl">
                    📍 Segunda Unidade em Rafard SP
                </p>
                <p className="text-gray-400 text-sm max-w-md leading-relaxed">
                    A Vornei Sorveteria e Milkshakeria foi criada com o propósito
                    de trazer algo novo e diferenciado para o mercado.
                </p>
            </div>

            {/* seção da primeira unidade */}
            <div className="flex flex-col items-center gap-4 text-center mt-4">
                <p className="text-white font-semibold text-lg">
                    Conheça nossa primeira unidade
                </p>

                <Link
                    href="https://www.instagram.com/vornei.lanches/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group"
                >
                    <div className="w-40 h-40 rounded-full overflow-hidden border-2 border-[#6ddc8b]/30 shadow-xl transition-transform duration-300 group-hover:scale-105 group-hover:border-[#6ddc8b]">
                        <Image
                            src="/imagens/Logo/LogoVornei.jfif"
                            alt="Vornei Lanchonete e Sorveteria"
                            width={160}
                            height={160}
                            className="object-cover w-full h-full"
                        />
                    </div>
                </Link>

                <p className="text-gray-400 text-sm">
                    @vornei.lanches no Instagram
                </p>
            </div>

            {/* ondinha puxando pro footer */}
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