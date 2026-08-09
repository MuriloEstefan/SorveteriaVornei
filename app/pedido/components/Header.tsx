import Image from "next/image";
import Link from "next/link";
import { ShoppingCart } from "lucide-react";
import BadgeStatusLoja from "./BadgeStatusLoja";

type Props = {
    titulo: string;
}

export default function Header({ titulo }: Props) {
    return(
        <main className="w-full text-white px-1 ">

            <header className="bg-[#2b2340] rounded-2xl py-3 pr-4 flex items-center justify-between shadow-lg gap-2">
                <Link href="/pedido" className="flex items-center min-w-0 -ml-2">
                   <Image
                     src="/imagens/Logo/LogoVorneiSemFundo.png"
                     alt="Logo Vornei"
                     width={125}
                     height={110}
                    />

                    <div className="min-w-0">
                        <h1 className="text-lg font-bold leading-tight">
                            {titulo}
                        </h1>
                        <div className="mt-1">
                            <BadgeStatusLoja />
                        </div>
                    </div>
                </Link>

                <Link
                    href="/carrinho"
                    className="
                        bg-[#3a2f5c]
                        p-3
                        rounded-full
                        hover:bg-[#4b3d74]
                        transition-colors
                        duration-200
                        shrink-0
                    "
                >
                    <ShoppingCart size={24} />
                </Link>
            </header>

        </main>
    )
}