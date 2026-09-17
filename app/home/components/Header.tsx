"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react";

const navLinks = [
    { label: "Home", href: "#home" },
    { label: "Cardápio", href: "#milkshakes" },
    { label: "Sobre nós", href: "#sobre" },
];

export default function Header() {
    const [menuAberto, setMenuAberto] = useState(false);

    return (
        <>
             <header className="w-full z-50 bg-[#0e0818]">
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
                                key={link.label}
                                href={link.href}
                                className="text-white/60 hover:text-white text-lg font-medium transition-colors duration-200"
                            >
                                {link.label}
                            </a>
                        ))}
                        <Link href="/pedido">
                        <button className="group relative bg-gradient-to-r from-[#6ddc8b] to-[#4bc470] text-[#0e0818] text-sm font-bold px-6 py-2.5 rounded-xl shadow-[0_4px_20px_-4px_rgba(109,220,139,0.5)] transition-all duration-300 hover:shadow-[0_6px_28px_-4px_rgba(109,220,139,0.7)] hover:-translate-y-0.5 cursor-pointer overflow-hidden">
                            <span className="relative z-10 flex items-center gap-2">
                                Fazer Pedido
                                <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
                            </span>
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
                            key={link.label}
                            href={link.href}
                            onClick={() => setMenuAberto(false)}
                            className="text-white text-3xl font-bold hover:text-[#6ddc8b] transition-colors"
                        >
                            {link.label}
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