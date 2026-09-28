import Link from "next/link";

export const metadata = {
    title: "Política de Privacidade — Vornei",
    description: "Como a Vornei coleta, usa e protege seus dados pessoais.",
};

export default function PoliticaPrivacidade() {
    return (
        <main className="min-h-screen bg-[#0e0818] text-white px-6 py-16">
            <div className="max-w-3xl mx-auto flex flex-col gap-8">

                <div>
                    <Link
                        href="/"
                        className="text-[#6ddc8b] text-sm hover:underline"
                    >
                        ← Voltar para o início
                    </Link>
                    <h1 className="text-3xl md:text-4xl font-bold mt-4">
                        Política de Privacidade
                    </h1>
                    <p className="text-white/40 text-sm mt-2">
                        Última atualização: {new Date().toLocaleDateString("pt-BR", {
                            day: "numeric",
                            month: "long",
                            year: "numeric",
                        })}
                    </p>
                </div>

                <section className="flex flex-col gap-3">
                    <h2 className="text-xl font-semibold text-[#6ddc8b]">
                        1. Quais dados coletamos
                    </h2>
                    <p className="text-white/70 leading-relaxed">
                        Para processar seu pedido, coletamos: nome, sobrenome,
                        número de telefone e endereço de entrega (rua, número,
                        bairro, complemento e cidade). Esses dados são
                        fornecidos diretamente por você no momento da compra.
                    </p>
                </section>

                <section className="flex flex-col gap-3">
                    <h2 className="text-xl font-semibold text-[#6ddc8b]">
                        2. Para que usamos seus dados
                    </h2>
                    <p className="text-white/70 leading-relaxed">
                        Usamos essas informações exclusivamente para:
                    </p>
                    <ul className="list-disc list-inside text-white/70 leading-relaxed flex flex-col gap-1">
                        <li>Processar e confirmar seu pedido</li>
                        <li>Entrar em contato pelo WhatsApp sobre o status do pedido</li>
                        <li>Realizar a entrega no endereço informado</li>
                    </ul>
                </section>

                <section className="flex flex-col gap-3">
                    <h2 className="text-xl font-semibold text-[#6ddc8b]">
                        3. Compartilhamento de dados
                    </h2>
                    <p className="text-white/70 leading-relaxed">
                        Não vendemos, alugamos ou compartilhamos seus dados
                        pessoais com terceiros. Suas informações ficam
                        armazenadas de forma segura e são acessadas apenas
                        pela equipe responsável pelo preparo e entrega do seu
                        pedido.
                    </p>
                </section>

                <section className="flex flex-col gap-3">
                    <h2 className="text-xl font-semibold text-[#6ddc8b]">
                        4. Armazenamento e segurança
                    </h2>
                    <p className="text-white/70 leading-relaxed">
                        Seus dados são armazenados em servidores protegidos,
                        com acesso restrito à equipe autorizada. Adotamos
                        medidas técnicas para proteger essas informações
                        contra acesso não autorizado, perda ou uso indevido.
                    </p>
                </section>

                <section className="flex flex-col gap-3">
                    <h2 className="text-xl font-semibold text-[#6ddc8b]">
                        5. Seus direitos
                    </h2>
                    <p className="text-white/70 leading-relaxed">
                        De acordo com a Lei Geral de Proteção de Dados (LGPD),
                        você tem o direito de solicitar, a qualquer momento:
                    </p>
                    <ul className="list-disc list-inside text-white/70 leading-relaxed flex flex-col gap-1">
                        <li>Confirmação de que tratamos seus dados</li>
                        <li>Acesso aos dados que temos sobre você</li>
                        <li>Correção de dados incompletos ou desatualizados</li>
                        <li>Exclusão dos seus dados pessoais</li>
                    </ul>
                </section>

                <section className="flex flex-col gap-3">
                    <h2 className="text-xl font-semibold text-[#6ddc8b]">
                        6. Como exercer seus direitos
                    </h2>
                    <p className="text-white/70 leading-relaxed">
                        Para solicitar acesso, correção ou exclusão dos seus
                        dados, entre em contato conosco pelo WhatsApp ou
                        Instagram informados no rodapé do site. Atenderemos
                        sua solicitação dentro de um prazo razoável.
                    </p>
                </section>

                <section className="flex flex-col gap-3">
                    <h2 className="text-xl font-semibold text-[#6ddc8b]">
                        7. Retenção de dados
                    </h2>
                    <p className="text-white/70 leading-relaxed">
                        Mantemos seus dados apenas pelo tempo necessário para
                        cumprir as finalidades descritas nesta política, ou
                        conforme exigido por lei.
                    </p>
                </section>

                <section className="flex flex-col gap-3">
                    <h2 className="text-xl font-semibold text-[#6ddc8b]">
                        8. Alterações nesta política
                    </h2>
                    <p className="text-white/70 leading-relaxed">
                        Esta política pode ser atualizada periodicamente. A
                        data da última atualização estará sempre indicada no
                        topo desta página.
                    </p>
                </section>

            </div>
        </main>
    );
}