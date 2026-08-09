"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react";

const navLinks = ["Home", "Sobre nós", "Contato"];

export default function Header() {
    const [menuAberto, setMenuAberto] = useState(false);

    return (
        <>
            <header className="sticky top-0 z-50 bg-[#0e0818]/90 backdrop-blur-md border-b border-white/5">
                <div className="max-w-6xl mx-auto px-2 py-4 flex items-center justify-between">

                    {/* Logo */}
                    <div className="flex items-center gap-3">
                        <Image
                            src="/imagens/Logo/LogoVorneiSemFundo.png"
                            alt="Logo Vornei"
                            width={158}
                            height={68}
                            className="rounded-full"
                        />
                        <div>
                            <p className="text-white font-bold text-lg leading-none tracking-tight">Vornei</p>
                            <p className="text-[#6ddc8b] text-[10px] font-medium tracking-widest uppercase mt-0.5">
                                Sorveteria & Milkshakeria
                            </p>
                        </div>
                    </div>

                    {/* Nav desktop */}
                    <nav className="hidden md:flex items-center gap-8">
                        {navLinks.map((link) => (
                            <a
                                key={link}
                                href="#"
                                className="text-white/60 hover:text-white text-lg font-medium transition-colors duration-200"
                            >
                                {link}
                            </a>
                        ))}
                        <Link href="/pedido">
                            <button className="bg-[#6ddc8b] text-[#0e0818] text-sm font-bold px-5 py-2 rounded-full hover:bg-white transition-colors duration-200 hover: cursor-pointer">
                                Fazer Pedido
                            </button>
                        </Link>
                    </nav>

                    {/* Botão hamburger mobile */}
                    <button
                        className="md:hidden text-white p-1"
                        onClick={() => setMenuAberto(!menuAberto)}
                    >
                        {menuAberto ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>
            </header>

            {/* Menu mobile */}
            {menuAberto && (
                <div className="fixed inset-0 z-40 bg-[#0e0818] flex flex-col items-center justify-center gap-8 md:hidden">
                    <button
                        className="absolute top-5 right-6 text-white"
                        onClick={() => setMenuAberto(false)}
                    >
                        <X size={28} />
                    </button>

                    {navLinks.map((link) => (
                        <a
                            key={link}
                            href="#"
                            onClick={() => setMenuAberto(false)}
                            className="text-white text-3xl font-bold hover:text-[#6ddc8b] transition-colors"
                        >
                            {link}
                        </a>
                    ))}

                    <Link href="/pedido" onClick={() => setMenuAberto(false)}>
                        <button className="mt-4 bg-[#6ddc8b] text-[#0e0818] font-bold text-lg px-10 py-4 rounded-full">
                            Fazer Pedido
                        </button>
                    </Link>
                </div>
            )}
        </>
    );
}