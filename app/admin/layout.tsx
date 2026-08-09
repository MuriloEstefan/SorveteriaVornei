import Sidebar from "./pedidos/components/Sidebar";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-[#0e0818]">
      <Sidebar />

      <main className="pt-20 px-8 pb-8">
        {children}
      </main>
    </div>
  );
}