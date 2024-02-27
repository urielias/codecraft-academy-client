import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

const login = async (username: string, password: string): Promise<UserData> => {
    try {
        const response = await axios.post<UserData>(API_URL + "login/", {
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
        const response = await axios.post<UserData>(API_URL + "signup/", {
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

const logout = async (): Promise<unknown> => {
    try {
        await axios.post(API_URL + "logout/");
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
