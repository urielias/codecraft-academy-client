import api from "./api";

const get_all_courses = async (): Promise<CoursePreview[]> => {
    try {
        const response = await api.get<CoursePreview[]>("/courses/");
        return response.data;
    } catch (error) {
        throw new Error("Failed to fetch courses");
    }
};

const get_course_detail = async (id: number): Promise<CourseDetail[]> => {
    try {
        const response = await api.get<CourseDetail[]>(`/course_detail/${id}/`);
        return response.data;
    } catch (error) {
        throw new Error("Failed to fetch course");
    }
};

export default {
    get_all_courses,
    get_course_detail,
};
