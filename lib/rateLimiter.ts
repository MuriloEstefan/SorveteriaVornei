import { pool } from "./db"; // ajusta pro caminho real do seu arquivo do pool

const MAX_TENTATIVAS = 5;
const BLOQUEIO_MINUTOS = 3;

export async function verificarBloqueio(ip: string) {
    const resultado = await pool.query(
        "SELECT tentativas, bloqueado_ate FROM tentativas_login WHERE ip = $1",
        [ip]
    );

    const registro = resultado.rows[0];
    if (!registro) return { bloqueado: false };

    const agora = new Date();
    const bloqueadoAte = registro.bloqueado_ate ? new Date(registro.bloqueado_ate) : null;

    if (bloqueadoAte && agora < bloqueadoAte) {
        const segundosRestantes = Math.ceil((bloqueadoAte.getTime() - agora.getTime()) / 1000);
        return { bloqueado: true, segundosRestantes };
    }

    return { bloqueado: false };
}

export async function registrarTentativaFalha(ip: string) {
    const resultado = await pool.query(
        "SELECT tentativas FROM tentativas_login WHERE ip = $1",
        [ip]
    );

    const tentativasAtuais = (resultado.rows[0]?.tentativas ?? 0) + 1;

    if (tentativasAtuais >= MAX_TENTATIVAS) {
        const bloqueadoAte = new Date(Date.now() + BLOQUEIO_MINUTOS * 60 * 1000);

        await pool.query(
            `INSERT INTO tentativas_login (ip, tentativas, bloqueado_ate)
             VALUES ($1, $2, $3)
             ON CONFLICT (ip) DO UPDATE
             SET tentativas = $2, bloqueado_ate = $3`,
            [ip, tentativasAtuais, bloqueadoAte]
        );
    } else {
        await pool.query(
            `INSERT INTO tentativas_login (ip, tentativas)
             VALUES ($1, $2)
             ON CONFLICT (ip) DO UPDATE
             SET tentativas = $2`,
            [ip, tentativasAtuais]
        );
    }
}

export async function resetarTentativas(ip: string) {
    await pool.query("DELETE FROM tentativas_login WHERE ip = $1", [ip]);
}