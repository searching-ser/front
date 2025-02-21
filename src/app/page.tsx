// app/page.tsx
import { redirect } from "next/navigation";

export default function HomePage() {
    redirect("/public"); // Automatically redirects to /public
}
