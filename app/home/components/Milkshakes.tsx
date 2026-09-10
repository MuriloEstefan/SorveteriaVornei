"use client";

import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Grid } from "swiper/modules";
import "swiper/css";
import "swiper/css/grid";

const saboresVornei = [
    { nome: "Oreo",               imagem: "/imagens/Milkshakes/MkOreo.png" },
    { nome: "Ovomaltine",         imagem: "/imagens/Milkshakes/MkOvomaltine.png" },
    { nome: "Kinder Bueno",       imagem: "/imagens/Milkshakes/MkKinder.png" },
    { nome: "Ferrero Roche",      imagem: "/imagens/Milkshakes/MkFerrero.png" },
    { nome: "Rafaello",           imagem: "/imagens/Milkshakes/MkRaffaelo.png" },
    { nome: "Charge",             imagem: "/imagens/Milkshakes/MkCharge.png" },
    { nome: "Mousse de Maracujá", imagem: "/imagens/Milkshakes/MkMaracuja.png" },
    { nome: "Paçoquita",          imagem: "/imagens/Milkshakes/MkPacoquita.png" },
    { nome: "Mousse de Abacaxi",  imagem: "/imagens/Milkshakes/MkAbacaxi.png" },
    { nome: "Sensação",           imagem: "/imagens/Milkshakes/MkSensacao.png" },
    { nome: "Pistache",           imagem: "/imagens/Milkshakes/MkPistache.png" },
    { nome: "Sonho de valsa",     imagem: "/imagens/Milkshakes/MkSonhoDeValsa.png" },
    { nome: "Cafe",           imagem: "/imagens/Milkshakes/MkCafe.png" },
    { nome: "Chocomenta",     imagem: "/imagens/Milkshakes/MkChocomenta.png" },
    { nome: "Confete",        imagem: "/imagens/Milkshakes/MkConfete.png" },
    { nome: "Cookies",        imagem: "/imagens/Milkshakes/MkCookies.png" },
    { nome: "Ninho",          imagem: "/imagens/Milkshakes/MkNinhoTrufado.png" },
    { nome: "Ninho Trufado",  imagem: "/imagens/Milkshakes/MkNinhoTrufado.png" },
    { nome: "Ouro Branco",    imagem: "/imagens/Milkshakes/MkOuroBranco.png" },
    { nome: "Charge",             imagem: "/imagens/Milkshakes/MkCharge.png" },
];

export default function Milkshakes() {
    return (
        <section id="milkshakes" className="w-full py-24 overflow-hidden bg-gradient-to-b from-[#0e0818] via-[#123024] to-[#1f4d38]">
            <div className="max-w-6xl mx-auto px-6">

                {/* Cabeçalho */}
                <div className="mb-14">
                    <p className="text-[#6ddc8b] text-xs font-bold tracking-[0.3em] uppercase mb-3">
                        Cardápio
                    </p>
                    <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
                        <h2 className="text-4xl md:text-6xl font-black text-white leading-tight">
                            Nossos Sabores<br />
                            <span className="text-[#6ddc8b]">de Milkshake</span>
                        </h2>
                    </div>
                </div>

                {/* Carrossel — sem setas, sem bolinhas, só desliza automático */}
                <Swiper
                    modules={[Autoplay, Grid]}
                    loop={true}
                    autoplay={{
                        delay: 2000,
                        disableOnInteraction: false,
                        pauseOnMouseEnter: true,
                    }}
                    grid={{
                        rows: 2,
                        fill: "row",
                    }}
                    spaceBetween={20}
                    slidesPerView={2}
                    breakpoints={{
                        640:  { slidesPerView: 3 },
                        1024: { slidesPerView: 4 },
                    }}
                >
                    {saboresVornei.map((sabor) => (
                        <SwiperSlide key={sabor.nome}>
                            <div
                                className="group flex flex-col items-center gap-3 cursor-pointer py-2"
                                // onClick={() => abrirModalSabor(sabor)} // TODO: modal de detalhes do sabor
                            >
                                <Image
                                    src={sabor.imagem}
                                    alt={sabor.nome}
                                    width={200}
                                    height={200}
                                    className="w-full h-auto object-contain group-hover:scale-105 transition-transform duration-300 drop-shadow-lg"
                                />
                                <span className="text-white/70 group-hover:text-[#6ddc8b] text-sm font-semibold text-center transition-colors">
                                    {sabor.nome}
                                </span>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>

            </div>
        </section>
    );
}