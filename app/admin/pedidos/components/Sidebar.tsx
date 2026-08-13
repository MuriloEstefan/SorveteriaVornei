"use client";

import Link from "next/link";
import { LayoutDashboard, ClipboardList, DollarSign, IceCream2, Menu, X, History } from "lucide-react";
import { useState } from "react";
import { usePathname } from "next/navigation";

export default function Sidebar() {
  const [aberto, setAberto] = useState(false);
  const pathname = usePathname();

  const links = [
  {
    nome: "Pedidos",
    href: "/admin",
    icon: ClipboardList,
  },
  {
    nome: "Histórico",
    href: "/admin/historico",
    icon: History,
  },
  {
    nome: "Faturamento",
    href: "/admin/faturamento",
    icon: DollarSign,
  },
  {
    nome: "Produtos & Ingredientes",
    href: "/admin/produtos",
    icon: IceCream2,
  },
];

  return (
    <>
      {/* Botão Hamburguer */}

      <button
        onClick={() => setAberto(true)}
        className="fixed top-5 left-5 z-50 rounded-lg bg-zinc-900 p-2 text-white hover:bg-zinc-800 hover:cursor-pointer"
      >
        <Menu size={24} />
      </button>

      {/* Fundo escuro */}

      {aberto && (
        <div
          className="fixed inset-0 bg-black/40 z-40"
          onClick={() => setAberto(false)}
        />
      )}

      {/* Sidebar */}

      <aside
        className={`fixed top-0 left-0 z-50 h-screen w-72 bg-zinc-950 border-r border-zinc-800 transform transition-transform duration-300 ${
          aberto ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between p-5 border-b border-zinc-800">
          <h2 className="text-xl font-bold text-white">
            Vornei Admin
          </h2>

          <button
            onClick={() => setAberto(false)}
            className="text-white hover:cursor-pointer"
          >
            <X />
          </button>
        </div>

        <nav className="mt-6 flex flex-col gap-2 px-3">
          {links.map((item) => {
            const Icon = item.icon;

            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setAberto(false)}
                className={`flex items-center gap-3 rounded-xl px-4 py-3 transition ${
                  pathname === item.href
                    ? "bg-violet-600 text-white"
                    : "text-zinc-400 hover:bg-zinc-900 hover:text-white"
                }`}
              >
                <Icon size={20} />
                {item.nome}
              </Link>
            );
          })}
        </nav>
      </aside>
    </>
  );
}