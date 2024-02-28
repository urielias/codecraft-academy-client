import api from "../services/api";
import authService from "../services/authService";
import { createContext, useContext, useState, ReactNode, useEffect } from "react";

interface AuthContextType {
    user: UserData | null;
    isAuthenticated: boolean;
    loading: boolean;
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
    const [loading, setLoading] = useState<boolean>(true);
    const [interceptorID, setInterceptorID] = useState<number>();

    useEffect(() => {
        const storedUserData = localStorage.getItem("userData");
        if (storedUserData) {
            setUser(JSON.parse(storedUserData));
        }
    }, []);

    useEffect(() => {
        setLoading(true);
        if (user && !interceptorID) {
            setInterceptorID(
                api.interceptors.request.use(
                    (config) => {
                        config.headers.Authorization = `Token ${user.token}`;
                        return config;
                    },
                    (error) => {
                        return Promise.reject(error);
                    }
                )
            );
        } else if (!user) {
            if (interceptorID) {
                api.interceptors.request.eject(interceptorID);
            }
        }
        setLoading(false);
    }, [user, interceptorID]);

    const login = async (username: string, password: string) => {
        const userData = await authService.login(username, password);
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
        loading,
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
