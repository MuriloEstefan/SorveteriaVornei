import { pool } from "@/lib/db";

export async function listarProdutos(categoria?: string) {
  let resultado;

  if (categoria) {
    resultado = await pool.query(
      `
      SELECT *
      FROM produtos
      WHERE categoria = $1 AND ativo = true
      ORDER BY ordem ASC
      `,
      [categoria]
    );
  } else {
    resultado = await pool.query(`
      SELECT *
      FROM produtos
      WHERE ativo = true
      ORDER BY categoria, ordem ASC
    `);
  }

  return resultado.rows.map((produto) => ({
    id: produto.id,
    categoria: produto.categoria,
    nome: produto.nome,
    descricao: produto.descricao,
    imagem: produto.imagem,
    preco_unitario: Number(produto.preco),
    maxSabores: Number(produto.max_sabores),
    maxAcompanhamentos: Number(produto.max_acompanhamentos),
    disponivel: produto.disponivel,
  }));
}