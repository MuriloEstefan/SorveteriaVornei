import { Clock } from "lucide-react";
import { TEMPO_ENTREGA_MINUTOS } from "@/lib/tempoEntrega";

export default function BadgeTempoEntrega() {
    return (
        <div className="flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold shrink-0 bg-white/10 text-white/70">
            <Clock size={12} />
            {TEMPO_ENTREGA_MINUTOS} min
        </div>
    );
}