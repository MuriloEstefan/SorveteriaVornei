import Header from "./home/components/Header";
import Hero from "@/app/home/components/Hero";
import Milkshakes from "@/app/home/components/Sabores";
import Localizacao from "@/app/home/components/Localizacao";
import Footer from "@/app/home/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-[var(--bg-base)]">
      <Header />
      <Hero />
      <Milkshakes />
      <Localizacao />
      <Footer />
    </main>
  );
}