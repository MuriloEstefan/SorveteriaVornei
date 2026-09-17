type Props = {
    trocoPara: string;
    setTrocoPara: (valor: string) => void;
};

export default function TrocoInput({ trocoPara, setTrocoPara }: Props) {
    return (
        <div className="animate-fade-in">
            <label className="text-white/70 text-sm font-medium block mb-2">
                Troco para quanto?
            </label>
            <input
                type="number"
                placeholder="Ex: 50,00"
                value={trocoPara}
                onChange={(e) => setTrocoPara(e.target.value)}
                className="
                    w-full bg-white/5 border border-white/10
                    rounded-xl p-4 text-white outline-none
                    placeholder:text-white/30 focus:border-[#8b2e9e]/50 transition
                "
            />
        </div>
    );
}