import { NextRequest, NextResponse } from "next/server";
import { verificarSessao } from "@/lib/sessao";

export async function middleware(req: NextRequest) {
    // Deixa a própria página de login passar sem checagem
    if (req.nextUrl.pathname === "/admin/login") {
        return NextResponse.next();
    }

    const token = req.cookies.get("sessao_admin")?.value;
    const sessaoValida = token ? await verificarSessao(token) : false;

    if (!sessaoValida) {
        return NextResponse.redirect(new URL("/admin/login", req.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: ["/admin/:path*"],
};