import { pool } from "@/lib/db";
import { ProdutoAdmin } from "@/types/produto";

export async function listarProdutos(): Promise<ProdutoAdmin[]> {
    const resultado = await pool.query(`
        SELECT id, categoria, nome, descricao, imagem, preco,
               max_sabores, max_acompanhamentos, disponivel, ativo, criado_em
        FROM produtos
        ORDER BY categoria, nome
    `);

    return resultado.rows.map((produto) => ({
        id: produto.id,
        categoria: produto.categoria,
        nome: produto.nome,
        descricao: produto.descricao,
        imagem: produto.imagem,
        preco: Number(produto.preco),
        max_sabores: Number(produto.max_sabores),
        max_acompanhamentos: Number(produto.max_acompanhamentos),
        disponivel: produto.disponivel,
        ativo: produto.ativo,
        criado_em: produto.criado_em,
    }));
}

export async function atualizarDisponibilidade(id: number, disponivel: boolean) {
    await pool.query(
        `UPDATE produtos SET disponivel = $1 WHERE id = $2`,
        [disponivel, id]
    );
}

export async function atualizarAtivo(id: number, ativo: boolean) {
    await pool.query(
        `UPDATE produtos SET ativo = $1 WHERE id = $2`,
        [ativo, id]
    );
}

export async function atualizarPreco(id: number, preco: number) {
    await pool.query(
        `UPDATE produtos SET preco = $1 WHERE id = $2`,
        [preco, id]
    )
}