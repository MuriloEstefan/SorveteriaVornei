import SeletorCidade from "./SeletorCidade";
import SeletorBairro from "./SeletorBairro";

interface FormEnderecoProps {
    rua: string;
    setRua: (rua: string) => void;

    numero: string;
    setNumero: (numero: string) => void;

    complemento: string;
    setComplemento: (complemento: string) => void;

    cidade: string;
    setCidade: (cidade: string) => void;

    bairro: string;
    setBairro: (bairro: string) => void;

    setFrete: (frete: number) => void;
}

export default function FormEndereco({
    rua, setRua,
    numero, setNumero,
    complemento, setComplemento,
    cidade, setCidade,
    bairro, setBairro,
    setFrete,
}: FormEnderecoProps) {

    function handleCidade(valor: string) {
        setCidade(valor);
        setBairro("");
        setFrete(0);
    }

    function handleBairro(label: string, frete: number) {
        setBairro(label);
        setFrete(frete);
    }

    return (
        <div className="mt-5 space-y-4">

            <SeletorCidade
                cidade={cidade}
                onSelect={handleCidade}
            />

            {cidade && (
                <SeletorBairro
                    cidade={cidade}
                    bairro={bairro}
                    onSelect={handleBairro}
                />
            )}

            <div>
                <label className="text-white/50 text-xs font-medium block mb-1.5 px-1">
                    Rua <span className="text-red-400">*</span>
                </label>
                <input
                    type="text"
                    placeholder="Rua"
                    value={rua}
                    onChange={(e) => setRua(e.target.value)}
                    className="w-full bg-[#3d1f52] rounded-xl p-3 outline-none text-white"
                />
            </div>

            <div>
                <label className="text-white/50 text-xs font-medium block mb-1.5 px-1">
                    Número <span className="text-red-400">*</span>
                </label>
                <input
                    type="text"
                    placeholder="Número"
                    value={numero}
                    onChange={(e) => setNumero(e.target.value)}
                    className="w-full bg-[#3d1f52] rounded-xl p-3 outline-none text-white"
                />
            </div>

            <div>
                <label className="text-white/50 text-xs font-medium block mb-1.5 px-1">
                    Complemento <span className="text-white/30">(opcional)</span>
                </label>
                <input
                    type="text"
                    placeholder="Complemento"
                    value={complemento}
                    onChange={(e) => setComplemento(e.target.value)}
                    className="w-full bg-[#3d1f52] rounded-xl p-3 outline-none text-white"
                />
            </div>

        </div>
    );
}