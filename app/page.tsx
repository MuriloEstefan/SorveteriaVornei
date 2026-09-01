import Header from "./home/components/Header";
import Hero from "@/app/home/components/Hero";
import Milkshakes from "@/app/home/components/Milkshakes";
import Localizacao from "@/app/home/components/Localizacao";
import Footer from "@/app/home/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-[var(--cor-fundo)] text-white px-4 py-4">
      <Header />
      <Hero />
      <Milkshakes />
      <Localizacao />
      <Footer />
    </main>
  );
}