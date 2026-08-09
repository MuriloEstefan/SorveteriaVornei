import FormEndereco from "./FormEndereco";

interface EscolhaEntregaProps {
    tipoEntrega: string;
    setTipoEntrega: (tipo: string) => void;

    rua: string;
    setRua: (rua: string) => void;

    numero: string;
    setNumero: (numero: string) => void;

    bairro: string;
    setBairro: (bairro: string) => void;

    complemento: string;
    setComplemento: (complemento: string) => void;

    cidade: string;              
    setCidade: (cidade: string) => void; 

    setFrete: (frete: number) => void; 
}

export default function EscolhaEntrega({
    tipoEntrega,
    setTipoEntrega,

    rua,
    setRua,

    numero,
    setNumero,

    bairro,
    setBairro,

    complemento,
    setComplemento,

    cidade,     
    setCidade,  
    
    setFrete,
}: EscolhaEntregaProps) {
    return (
        <>
            <div className="space-y-3">

                <button
                    onClick={() => setTipoEntrega("retirada")}
                    className={`
                        w-full
                        py-4
                        rounded-2xl
                        transition
                        text-white
                        cursor-pointer
                        border
                        ${
                            tipoEntrega === "retirada"
                                ? "bg-purple-600 border-purple-500"
                                : "bg-[#2b2340] border-transparent"
                        }
                    `}
                >
                    Retirada
                </button>

                <button
                    onClick={() => setTipoEntrega("entrega")}
                    className={`
                        w-full
                        py-4
                        rounded-2xl
                        transition
                        text-white
                        cursor-pointer
                        border
                        ${
                            tipoEntrega === "entrega"
                                ? "bg-purple-600 border-purple-500"
                                : "bg-[#2b2340] border-transparent"
                        }
                    `}
                >
                    Entrega
                </button>

            </div>

            {tipoEntrega === "entrega" && (
                <FormEndereco
                    rua={rua}
                    setRua={setRua}

                    numero={numero}
                    setNumero={setNumero}

                    bairro={bairro}
                    setBairro={setBairro}

                    complemento={complemento}
                    setComplemento={setComplemento}

                    cidade={cidade}     
                    setCidade={setCidade} 

                    setFrete={setFrete}
                />
            )}
        </>
    );
}