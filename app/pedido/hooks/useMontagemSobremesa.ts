"use client";

import { useState } from "react";
import { ConfigSobremesa, GrupoEscolha } from "@/types/sobremesas";

export function useMontagemSobremesa(config: ConfigSobremesa | null) {
    const [quantidades, setQuantidades] = useState<Record<string, number>>({});

    const totalPorGrupo = (grupo: GrupoEscolha) =>
        grupo.opcoes.reduce((acc, op) => acc + (quantidades[op.nome] || 0), 0);

    // Grupos com max=1 funcionam como seleção única (rádio): escolher
    // uma opção nova desmarca automaticamente a anterior do mesmo grupo.
    const selecionarUnico = (grupoChave: string, nome: string) => {
        if (!config) return;
        const grupo = config.grupos.find((g) => g.chave === grupoChave);
        if (!grupo) return;

        setQuantidades((prev) => {
            const novo = { ...prev };
            grupo.opcoes.forEach((op) => { novo[op.nome] = 0; });
            novo[nome] = 1;
            return novo;
        });
    };

    // Grupos com max>1 funcionam como contador: pode repetir a mesma
    // opção várias vezes, respeitando o limite total do grupo.
    const aumentar = (grupoChave: string, nome: string) => {
        if (!config) return;
        const grupo = config.grupos.find((g) => g.chave === grupoChave);
        if (!grupo) return;

        const totalAtual = totalPorGrupo(grupo);
        if (totalAtual >= grupo.max) return;

        setQuantidades((prev) => ({
            ...prev,
            [nome]: (prev[nome] || 0) + 1,
        }));
    };

    const diminuir = (nome: string) => {
        setQuantidades((prev) => {
            const atual = prev[nome] || 0;
            if (atual <= 0) return prev;
            return { ...prev, [nome]: atual - 1 };
        });
    };

    const limparQuantidades = () => setQuantidades({});

    // Soma os preços extras, agora multiplicando pela quantidade
    // (ex: 3x Morango a +R$3 cada = +R$9)
    const totalExtra = config
        ? config.grupos.reduce((total, grupo) => {
              return (
                  total +
                  grupo.opcoes.reduce((acc, op) => {
                      const qtd = quantidades[op.nome] || 0;
                      return acc + qtd * (op.precoAdicional || 0);
                  }, 0)
              );
          }, 0)
        : 0;

    return {
        quantidades,
        selecionarUnico,
        aumentar,
        diminuir,
        limparQuantidades,
        totalPorGrupo,
        totalExtra,
    };
}