import { pool } from "@/lib/db";

export async function listarIngredientesAdmin() {
    const resultado = await pool.query(`
        SELECT id, tipo, nome, disponivel, criado_em
        FROM ingredientes
        ORDER BY tipo, nome
    `);
    return resultado.rows;
}

export async function atualizarDisponibilidadeIngrediente(id: number, disponivel: boolean) {
    await pool.query(
        `UPDATE ingredientes SET disponivel = $1 WHERE id = $2`,
        [disponivel, id]
    );
}