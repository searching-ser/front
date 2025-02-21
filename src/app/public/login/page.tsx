"use client"; // Ensure this runs on the client

import React, { useState } from "react";
import { useAuth } from "@/components/AuthProvider";

export default function LoginPage() {
    const { login } = useAuth();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(""); // Clear previous errors

        try {
            await login(email, password); // Call the login function from AuthProvider
        } catch (err) {
            setError("Invalid email or password."); // Handle errors
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-2xl font-bold text-center text-blue-600">Login</h2>
            {error && <p className="text-red-500 text-sm text-center mt-2">{error}</p>}
            <form onSubmit={handleSubmit} className="mt-4">
            <div>
                <label className="block text-sm font-medium text-gray-700">Email</label>
                <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1 p-2 w-full border rounded-lg focus:ring focus:ring-blue-300"
                required
                />
            </div>
            <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700">Password</label>
                <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-1 p-2 w-full border rounded-lg focus:ring focus:ring-blue-300"
                required
                />
            </div>
            <button
                type="submit"
                className="mt-4 w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
            >
                Login
            </button>
            </form>
        </div>
        </div>
    );
}
