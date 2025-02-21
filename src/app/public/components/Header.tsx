"use client"
import Link from "next/link"
import { useAuth } from "@/components/AuthProvider"

export default function Header() {
    const { user, logout } = useAuth()

    return (
        <header className="bg-white shadow-md">
            <div className="container mx-auto flex justify-between items-center py-4 px-6">
                <Link href="/" className="text-2xl font-bold text-blue-600">Patrones Hermosos</Link>
                <nav>
                <ul className="flex space-x-4">
                    <li><Link href="/participate" className="text-gray-700 hover:text-blue-600">Participate</Link></li>
                    <li><Link href="/collaborate" className="text-gray-700 hover:text-blue-600">Collaborate</Link></li>
                    <li><Link href="/public/forms_sede" className="text-gray-700 hover:text-blue-600">Host</Link></li>
                    {user ? (
                        <>
                            <li><Link href={user.role === "superuser" ? "/superuser" : "/representante"} className="text-gray-700 hover:text-blue-600">Dashboard</Link></li>
                            <li><button onClick={logout} className="text-red-600 hover:text-red-800">Logout</button></li>
                        </>
                        ) : (
                        <li><Link href="/public/login" className="text-gray-700 hover:text-blue-600">Login</Link></li>
                    )}
                </ul>
                </nav>
            </div>
        </header>
    )
}
