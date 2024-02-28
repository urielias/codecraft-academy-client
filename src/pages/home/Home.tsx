import { useEffect, useState } from "react";
import courseService from "../../services/courseService";

const Home = () => {
    const [allCourses, setAllCourses] = useState<Array<CoursePreview>>([]);

    useEffect(() => {
        const get_courses = async () => {
            const courses = await courseService.get_all_courses();
            setAllCourses(courses);
        };

        get_courses();
    }, []);

    return (
        <div>
            Hi
            {allCourses.map((course, index) => (
                <div key={`course_${index}`}>{JSON.stringify(course)}</div>
            ))}
        </div>
    );
};

export default Home;
