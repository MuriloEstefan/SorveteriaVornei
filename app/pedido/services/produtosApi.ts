export async function buscarProdutosApi(categoria: string) {
    const url = `/api/produtos?categoria=${encodeURIComponent(categoria)}`;

    console.log("URL:", url);

    const resposta = await fetch(url);

    const dados = await resposta.json();

    console.log("Resposta:", dados);

    return dados;
}