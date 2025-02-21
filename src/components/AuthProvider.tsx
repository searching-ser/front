"use client";
import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import API from "@/lib/api";
import { safeParse } from "valibot";
import { LoginResponseSchema } from "@/lib/schemas/login_schemas";
import { validationSchema } from "@/lib/schemas/validate_schemas";

// Type for user data
type UserType = {
    email: string;
    role: string;
};

// Type for authentication context
type AuthContextType = {
    user: UserType | null;
    login: (email: string, password: string) => Promise<void>;
    logout: () => void;
};

// Create authentication context
const AuthContext = createContext<AuthContextType | null>(null);

type AuthProviderProps = {
    children: ReactNode;
};

export default function AuthProvider({ children }: AuthProviderProps) {
    const [user, setUser] = useState<UserType | null>(null);
    const router = useRouter();
    const pathname = usePathname(); // ✅ Get current route

    // Function to read cookies
    const getCookie = (name: string) => {
        const match = document.cookie.match(`(^|;)\\s*${name}\\s*=\\s*([^;]+)`);
        return match ? decodeURIComponent(match[2]) : null;
    };

    // Validate token on first load
    useEffect(() => {
        const storedToken = getCookie("token");
        const storedRole = getCookie("role");
        const storedEmail = getCookie("email");

        if (storedToken && storedRole && storedEmail) {
            setUser({ email: storedEmail, role: storedRole });
            validateToken();
        }
    }, []);

    // ✅ Validate Token Without Auto-Logout
    const validateToken = async () => {
        try {
            const token = getCookie("token");
            if (!token) {
                console.warn("⚠ No token found.");
                return; // ✅ Do NOT log out, just return
            }

            const response = await API.post("/validate_token", {}, {
                headers: { Authorization: `Bearer ${token}` },
            });

            const result = safeParse(validationSchema, response.data);
            if (!result.success) {
                console.error("❌ Invalid API response:", result.issues);
                return; // ✅ Do NOT log out
            }

            // ✅ Update user state with validated role
            setUser({
                email: getCookie("email") || "",
                role: result.output.role,
            });

        } catch (error) {
            console.error("❌ Token validation failed:", error);

            // ✅ Only logout if user is already in a protected page
            if (pathname.startsWith("/superuser") || pathname.startsWith("/representante")) {
                logout();
            }
        }
    };

    // ✅ Login Function
    const login = async (email: string, password: string) => {
        try {
            const response = await API.post("/login", { email, password });
            const parsed = safeParse(LoginResponseSchema, response.data);

            if (!parsed.success) {
                console.error("❌ Invalid API response:", parsed.issues);
                return;
            }

            const { token, user } = parsed.output;

            // ✅ Store JWT & User Info in Cookies
            document.cookie = `token=${token}; path=/; Secure; SameSite=Strict`;
            document.cookie = `role=${user.role}; path=/; Secure; SameSite=Strict`;
            document.cookie = `email=${user.email}; path=/; Secure; SameSite=Strict`;

            // ✅ Set user state
            setUser({ email: user.email, role: user.role });

            // ✅ Redirect based on role
            router.push(user.role === "superuser" ? "/superuser" : "/representante");
        } catch (error: any) {
            console.error("❌ Login error:", error.response?.data?.message || "Something went wrong logging in");
        }
    };

    // ✅ Logout Function (Clears Cookies)
    const logout = () => {
        document.cookie = "token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
        document.cookie = "role=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
        document.cookie = "email=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";

        setUser(null);
        router.push("/public/login");
    };

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

// Custom hook for authentication
export function useAuth() {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("❌ useAuth must be used within an AuthProvider");
    }
    return context;
}
