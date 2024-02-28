import api from "./api";

const login = async (username: string, password: string): Promise<UserData> => {
    try {
        const response = await api.post<UserData>("/login/", {
            username,
            password,
        });
        return response.data;
    } catch (error) {
        throw new Error("Failed to login");
    }
};

const signup = async (
    username: string,
    first_name: string,
    last_name: string,
    password: string,
    email: string
): Promise<UserData> => {
    try {
        const response = await api.post<UserData>("/signup/", {
            email,
            username,
            password,
            last_name,
            first_name,
        });
        return response.data;
    } catch (error) {
        throw new Error("Failed to signup");
    }
};

const logout = async (): Promise<void> => {
    try {
        await api.post("/logout/");
        return;
    } catch (error) {
        throw new Error("Failed to logout");
    }
};

export default {
    login,
    signup,
    logout,
};
