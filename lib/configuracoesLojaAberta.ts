import { pool } from "@/lib/db";

export async function buscarLojaAberta(): Promise<boolean> {
    const resultado = await pool.query(
        `SELECT loja_aberta FROM configuracoes WHERE id = 1`
    );
    return resultado.rows[0]?.loja_aberta ?? true;
}

export async function alterarLojaAberta(aberta: boolean): Promise<void> {
    await pool.query(
        `UPDATE configuracoes SET loja_aberta = $1, atualizado_em = NOW() WHERE id = 1`,
        [aberta]
    );
}