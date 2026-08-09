"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Lock } from "lucide-react";
import { toast } from "react-toastify";

export default function LoginPage() {
    const [senha, setSenha] = useState("");
    const [carregando, setCarregando] = useState(false);
    const router = useRouter();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!senha) {
            toast.error("Digite a senha.");
            return;
        }

        setCarregando(true);

        try {
            const resposta = await fetch("/api/admin/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ senha }),
            });

            if (!resposta.ok) {
                toast.error("Senha incorreta.");
                setCarregando(false);
                return;
            }

            router.push("/admin");
            router.refresh();
        } catch {
            toast.error("Erro ao tentar fazer login. Tente novamente.");
            setCarregando(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#0e0818] flex items-center justify-center p-6">

            <div className="bg-[#2b2340] rounded-2xl border border-white/5 w-full max-w-sm p-8">

                <div className="flex justify-center mb-6">
                    <div className="w-14 h-14 rounded-full bg-purple-600/20 flex items-center justify-center">
                        <Lock size={24} className="text-purple-400" />
                    </div>
                </div>

                <h1 className="text-2xl font-bold text-white text-center">
                    Painel Admin
                </h1>
                <p className="text-white/40 text-sm text-center mt-1 mb-6">
                    Digite a senha para continuar
                </p>

                <form onSubmit={handleLogin} className="space-y-4">

                    <input
                        type="password"
                        value={senha}
                        onChange={(e) => setSenha(e.target.value)}
                        placeholder="Senha"
                        autoFocus
                        className="
                            w-full
                            bg-white/5
                            border border-white/10
                            rounded-xl
                            p-4
                            text-white
                            outline-none
                            placeholder:text-white/30
                            focus:border-purple-500/50
                            transition
                        "
                    />

                    <button
                        type="submit"
                        disabled={carregando}
                        className="
                            w-full
                            bg-purple-600
                            hover:bg-purple-500
                            active:scale-[0.98]
                            disabled:opacity-50
                            disabled:cursor-not-allowed
                            transition
                            py-4
                            rounded-xl
                            font-bold
                            text-white
                            cursor-pointer
                        "
                    >
                        {carregando ? "Entrando..." : "Entrar"}
                    </button>

                </form>

            </div>

        </div>
    );
}