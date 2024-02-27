import authService from "../services/authService";
import { createContext, useContext, useState, ReactNode, useEffect } from "react";

interface AuthContextType {
    user: UserData | null;
    isAuthenticated: boolean;
    login: (username: string, password: string) => Promise<void>;
    signup: (
        username: string,
        first_name: string,
        last_name: string,
        password: string,
        email: string
    ) => Promise<void>;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<UserData | null>(null);

    useEffect(() => {
        const storedUserData = localStorage.getItem("userData");
        if (storedUserData) {
            setUser(JSON.parse(storedUserData));
        }
    }, []);

    const login = async (username: string, password: string) => {
        const userData = await authService.login(username, password);
        console.log(32, userData);
        localStorage.setItem("userData", JSON.stringify(userData));
        setUser(userData);
    };

    const signup = async (
        username: string,
        password: string,
        first_name: string,
        last_name: string,
        email: string
    ) => {
        const userData = await authService.signup(username, password, first_name, last_name, email);
        localStorage.setItem("userData", JSON.stringify(userData));
        setUser(userData);
    };

    const logout = async () => {
        await authService.logout();
        localStorage.removeItem("userData");
        setUser(null);
    };

    const value = {
        user,
        isAuthenticated: !!user,
        login,
        signup,
        logout,
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};
