import { router } from "expo-router";
import { createContext, useContext, useEffect, useState } from "react";

type User = {
    id: string;
    name: string;
};
type AuthContextType = {
    user: User | null;
    loading: boolean;
    login: (email: string, password: string) => Promise<void>;
    signup: (name: string, email: string, password: string) => Promise<void>;
    logout: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    // check login in first launch
    useEffect(() => {
        fetchUser();
    }, []);

    const fetchUser = async () => {
        try {
            const response = await fetch(
                "http://192.168.127.2:3000/api/v1/user/data",
                { credentials: "include" }
            );

            const result = await response.json();
            if (!response.ok) {
                throw new Error("Unauthorized or invalid user data");
            }
            setUser(result.data);
            router.replace("/(tabs)");
        } catch (error) {
            setUser(null);
            router.replace("/(auth)");
            console.log("error bang: ", error);
        } finally {
            setLoading(false);
        }
    };

    const login = async (email: string, password: string) => {
        const response = await fetch(
            "http://192.168.127.2:3000/api/v1/auth/login",
            {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                credentials: "include",
                body: JSON.stringify({ email, password }),
            }
        );

        const result = await response.json();

        if (!response.ok) {
            throw result;
        }
        await fetchUser();
    };

    const signup = async (name: string, email: string, password: string) => {
        const response = await fetch(
            "http://192.168.127.2:3000/api/v1/auth/signup",
            {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                credentials: "include",
                body: JSON.stringify({ name, email, password }),
            }
        );
        const result = await response.json();
        if (!response.ok) {
            throw result;
        }

        router.replace("/(auth)");
    };

    const logout = async () => {
        await fetch("http://192.168.127.2:3000/api/v1/auth/logout", {
            method: "POST",
            credentials: "include",
        });

        setUser(null);
        router.replace("/(auth)");
    };

    return (
        <AuthContext.Provider value={{ user, login, loading, logout, signup }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const ctx = useContext(AuthContext);
    if (!ctx) throw new Error("use auth must be used inside authprovider");
    return ctx;
};
