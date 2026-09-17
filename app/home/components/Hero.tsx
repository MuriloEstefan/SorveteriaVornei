import Image from 'next/image';
import Link from 'next/link';

export default function Hero() {
    return (
        <section id="home" className="w-full min-h-[100svh] bg-transparent relative flex items-center overflow-hidden">

            {/* Fundo com imagem escurecida */}
            <div className="absolute inset-0">
                <Image
                    src="/imagens/Copo/CopoVorneiMenor.jpeg"
                    alt="Banner Vornei"
                    fill
                    priority
                    className="object-cover object-[68%_center] md:object-center opacity-50 md:opacity-20"
                />
                {/* gradiente de baixo pra fundir com próxima seção */}
                <div className="absolute inset-0 bg-gradient-to-b from-[#0e0818]/40 md:from-[#0e0818]/60 via-transparent to-[#0e0818]" />
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
                        <Link href={"/pedido"} className='w-full sm:w-auto'>
                            <button className="group relative bg-white/5 backdrop-blur-sm border border-white/10 hover:border-[#6ddc8b]/40 hover:bg-white/10 text-white text-base font-medium px-8 py-4 rounded-xl transition-all duration-300 w-full sm:w-auto overflow-hidden">
                                <span className="relative z-10 flex items-center justify-center gap-2">
                                    Ver Cardápio
                                    <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
                                </span>
                            </button>       
                        </Link>
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
        </section>
    );
}