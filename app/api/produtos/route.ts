import { NextRequest, NextResponse } from "next/server";
import { listarProdutos } from "@/services/produtos";

export async function GET(req: NextRequest) {
  try {
    const categoria = req.nextUrl.searchParams.get("categoria");

    const produtos = await listarProdutos(categoria ?? undefined);

    return NextResponse.json(produtos);
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { erro: "Erro ao buscar produtos" },
      { status: 500 }
    );
  }
}