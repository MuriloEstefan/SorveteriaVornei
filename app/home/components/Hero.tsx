import Image from 'next/image';
import Link from 'next/link';

export default function Hero() {
    return (
        <section className="w-full min-h-[100svh] bg-transparent relative flex items-center overflow-hidden">

            {/* Fundo com imagem escurecida */}
            <div className="absolute inset-0">
                <Image
                    src="/imagens/CopoVorneiMenor.jpeg"
                    alt="Banner Vornei"
                    fill
                    priority
                    className="object-cover object-center opacity-20"
                />
                {/* gradiente de baixo pra fundir com próxima seção */}
                <div className="absolute inset-0 bg-gradient-to-b from-[#0e0818]/60 via-transparent to-[#0e0818]" />
            </div>

            {/* Conteúdo */}
            <div className="relative z-10 max-w-6xl mx-auto px-6 py-24 grid md:grid-cols-2 gap-12 items-center">

                {/* Texto */}
                <div className="flex flex-col gap-6">
                    <span className="text-[#6ddc8b] text-xs font-bold tracking-[0.3em] uppercase">
                        Sorveteria & Milkshakeria
                    </span>

                    <h1 className="text-5xl md:text-7xl font-black text-white leading-[1.05] tracking-tight">
                        Sabores que<br />
                        <span className="text-[#6ddc8b]">marcam</span><br />
                        memórias
                    </h1>

                    <p className="text-white/50 text-base md:text-lg max-w-sm leading-relaxed">
                        Sorvetes e Milkshakes feitos com ingredientes selecionados e muito amor.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-3 mt-2">
                        <Link href="/pedido">
                            <button className="bg-[#6ddc8b] hover:bg-white text-[#0e0818] font-bold text-base px-8 py-4 rounded-full transition-colors duration-200 w-full sm:w-auto">
                                Fazer Pedido
                            </button>
                        </Link>
                        <button className="border border-white/20 hover:border-white/50 text-white text-base font-medium px-8 py-4 rounded-full transition-colors duration-200 w-full sm:w-auto">
                            Ver Cardápio
                        </button>
                    </div>
                </div>

                {/* Imagem decorativa — só aparece no desktop */}
                <div className="hidden md:flex justify-center">
                    <div className="relative w-80 h-80">
                        <div className="absolute inset-0 rounded-full bg-[#6ddc8b]/10 blur-3xl" />
                        <Image
                            src="/imagens/Logo/LogoVorneiSemFundo.png"
                            alt="Vornei"
                            fill
                            className="object-contain drop-shadow-2xl"
                        />
                    </div>
                </div>
            </div>

            {/* Ondinha */}
            <div className="absolute bottom-0 left-0 w-full overflow-hidden">
                <svg viewBox="0 0 1440 60" xmlns="http://www.w3.org/2000/svg">
                    <path fill="#080f10" d="M0,30 C360,60 1080,0 1440,30 L1440,60 L0,60 Z" />
                </svg>
            </div>

        </section>
    );
}