import Header from "./components/Header";
import Footer from "./components/Footer";
import { ReactNode } from "react";

type LayoutProps = {
    children: ReactNode
}

export default function layout({ children } : LayoutProps) {
    return (
        <div className="flex flex-col min-h-screen">
            <Header />
            <main className="flex-1 container mx-auto px-4 py-8">{children}</main>
            <Footer />
        </div>
    )
}
