import api from "./api";

const get_students = async (): Promise<UserData[]> => {
    try {
        const response = await api.get<UserData[]>("/list_students/");
        return response.data;
    } catch (error) {
        throw new Error("Failed to fetch students");
    }
};

const get_teachers = async (): Promise<UserData[]> => {
    try {
        const response = await api.get<UserData[]>("/list_teachers/");
        return response.data;
    } catch (error) {
        throw new Error("Failed to fetch students");
    }
};

export default {
    get_students,
    get_teachers,
};
