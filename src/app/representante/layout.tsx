import RepresentanteHeader from "./components/Header";
import RepresentanteFooter from "./components/Footer";

export default function RepresentanteLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex flex-col min-h-screen">
            <RepresentanteHeader />
            <main className="flex-1 container mx-auto px-4 py-8">{children}</main>
            <RepresentanteFooter />
        </div>
    );
}