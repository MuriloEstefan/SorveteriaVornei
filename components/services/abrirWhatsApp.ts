import { PedidoCompleto } from "@/types/pedidos";

export function abrirWhatsApp(dados: PedidoCompleto) {

    const subtotalPedido = dados.pedidos.reduce(
        (acc, item) => acc + item.subtotal,
        0
    );

    const frete = dados.total - subtotalPedido;

    const numero = "5519996865599"; // 55 + DDD + número

    // Monta os itens do carrinho
    const itens = dados.pedidos.map((item) => {

        // Pega só os ingredientes com quantidade > 0
        const ingredientes = Object.entries(item.quantidades || {})
            .filter(([_, qtd]) => Number(qtd) > 0)
            .map(([nome, qtd]) => `    • ${nome} x${qtd}`)
            .join("\n");

        const subtotal = item.preco_unitario * item.quantidade;

        const linhaPrincipal =
            item.categoria === "Milkshakes"
                ? `*Milkshake de ${item.nome}* x${item.quantidade} - R$ ${subtotal.toFixed(2).replace(".", ",")}`
                : `*${item.nome}* x${item.quantidade} - R$ ${subtotal.toFixed(2).replace(".", ",")}`;

        return ingredientes
            ? `${linhaPrincipal}\n${ingredientes}`
            : linhaPrincipal;

    }).join("\n\n");

    // Monta forma de pagamento
    const pagamento = `
    💳 *Pagamento:* ${dados.pagamento.forma}
    ${
        dados.pagamento.forma === "Dinheiro" && dados.pagamento.trocoPara
            ? `💵 *Troco para:* R$ ${Number(dados.pagamento.trocoPara)
                .toFixed(2)
                .replace(".", ",")}`
            : ""
    }
    `.trim();

    // Monta endereço se for entrega
    const endereco = dados.entrega.tipo === "entrega"
        ? `📍 *Endereço:* ${dados.entrega.rua}, ${dados.entrega.numero} - ${dados.entrega.bairro}${dados.entrega.complemento ? ` (${dados.entrega.complemento})` : ""}`
        : `🏪 *Retirada no local*`;

    // Monta observação se tiver
    const observacao = dados.cliente.observacao.trim()
        ? `📝 *Obs:* ${dados.cliente.observacao}`
        : "";

    // Monta a mensagem completa
    const mensagem = `
    🍦 *Novo Pedido - Vornei*

    👤 *Cliente:* ${dados.cliente.nome} ${dados.cliente.sobrenome}
    📞 *Telefone:* ${dados.cliente.telefone}
    🥄 *Colher:* ${dados.cliente.colher ? "Sim" : "Não"}

    ${endereco}

    *Itens do Pedido:*
    ${itens}

    ${observacao}

    ${pagamento}

    💵 *Resumo do Pedido*

    🍨 Subtotal: R$ ${subtotalPedido.toFixed(2).replace(".", ",")}
    🚚 Frete: ${
        frete === 0
            ? "Grátis"
            : `R$ ${frete.toFixed(2).replace(".", ",")}`
    }
    💰 *Total: R$ ${dados.total.toFixed(2).replace(".", ",")}*
    `.trim();

    const url = `https://wa.me/${numero}?text=${encodeURIComponent(mensagem)}`;

    window.location.href = url;
}