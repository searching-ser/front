import SuperuserHeader from "./components/Header";
import SuperuserFooter from "./components/Footer";

export default function SuperuserLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex flex-col min-h-screen">
            <SuperuserHeader />
            <main className="flex-1 container mx-auto px-4 py-8">{children}</main>
            <SuperuserFooter />
        </div>
    );
}