import Image from "next/image";
import Link from "next/link";
import { Phone, MapPin, Mail, Clock } from "lucide-react";

export default function Footer() {
  return (
    <footer id="sobre" className="w-full bg-[var(--bg-base)] pt-12 pb-6 px-8 text-white">
      <div className="w-full px-6 md:px-16 grid grid-cols-1 md:grid-cols-3 gap-10 pb-10 border-b border-white/10">
        <div className="flex flex-col gap-4 text-center md:text-left">
          <div className="flex flex-col items-center text-center gap-3">
            <Image src="/imagens/Logo/LogoVorneiSemFundo.png" alt="Logo Vornei" width={90} height={90} />
            <div>
              <h3 className="font-[family-name:var(--font-display)] font-bold text-3xl">Vornei</h3>
              <p className="text-[var(--mint)] text-sm font-semibold">Sorveteria & Milkshakeria</p>
            </div>
          </div>
          <p className="text-gray-400 text-sm leading-relaxed max-w-xs mx-auto">
            Sorvetes e milkshakes feitos com amor, trazendo sabores únicos para Rafard e região.
          </p>
        </div>

        <div className="flex flex-col gap-4 text-center md:text-left">
          <h4 className="font-[family-name:var(--font-display)] font-bold text-lg text-[var(--mint)]">Contato</h4>
          <div className="flex flex-col gap-3 text-gray-400 text-sm">
            <a href="tel:+5519999999999" className="flex items-center justify-center md:justify-start gap-2 hover:text-[var(--mint)] transition">
              <Phone size={16} />
              (19) 99999-9999
            </a>
            <a href="mailto:vornei@email.com" className="flex items-center justify-center md:justify-start gap-2 hover:text-[var(--mint)] transition">
              <Mail size={16} />
              vornei@email.com
            </a>
            <a href="https://instagram.com/vornei.sorveteria.milkshakeria" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center md:justify-start gap-2 hover:text-[var(--mint)] transition">
              <span className="font-bold text-base leading-none">@</span>
              vornei.sorveteria.milkshakeria
            </a>
            <div className="flex items-start justify-center md:justify-start gap-2">
              <MapPin size={16} className="mt-0.5 shrink-0" />
              <span>R. Maurício Allain, 229 — Sala 3, Rafard SP, 13370-970</span>
            </div>
            <div className="flex items-start justify-center md:justify-start gap-2">
              <Clock size={16} className="mt-0.5 shrink-0" />
              <div className="flex flex-col text-left">
                <span>Seg: 13h–22h</span>
                <span>Ter a Qui: 11h–22h</span>
                <span>Sex a Dom: 11h–23h</span>
              </div>
            </div>
          </div>
        </div>

        <div className="hidden md:flex flex-col gap-4">
          <h4 className="font-[family-name:var(--font-display)] font-bold text-lg text-[var(--mint)]">Links Rápidos</h4>
          <div className="flex flex-col gap-2 text-gray-400 text-sm items-center md:items-start">
            <a href="#home" className="hover:text-[var(--mint)] hover:translate-x-1 transition-all">Home</a>
            <a href="#milkshakes" className="hover:text-[var(--mint)] hover:translate-x-1 transition-all">Cardápio</a>
            <a href="#sobre" className="hover:text-[var(--mint)] hover:translate-x-1 transition-all">Sobre nós</a>
            <a href="#contato" className="hover:text-[var(--mint)] hover:translate-x-1 transition-all">Contato</a>
            <Link href="/pedido" className="hover:text-[var(--mint)] hover:translate-x-1 transition-all">Fazer Pedido</Link>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-2 pt-6 text-gray-500 text-xs">
        <p>© 2026 Vornei — Todos os direitos reservados</p>
        <p>
          Desenvolvido por <span className="text-[var(--mint)] font-semibold">Murilo Estefano</span>
        </p>
      </div>
    </footer>
  );
}