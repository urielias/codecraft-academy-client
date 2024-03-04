import styling from "./home.module.css";
import { useEffect, useMemo, useState } from "react";
import { CoursePreview } from "../../components/course";
import courseService from "../../services/courseService";

const Home = () => {
    const [allCourses, setAllCourses] = useState<Array<CoursePreview>>([]);

    const [myCourses, otherCourses] = useMemo(() => {
        const myCourses = allCourses.filter((course) => course.enrolled);
        const otherCourses = allCourses.filter((course) => !course.enrolled);
        return [myCourses, otherCourses];
    }, [allCourses]);

    useEffect(() => {
        const get_courses = async () => {
            const courses = await courseService.get_all_courses();
            setAllCourses(courses);
        };

        get_courses();
    }, []);

    return (
        <div>
            <h2>My Courses</h2>
            <div className={styling.courseList}>
                {myCourses.map((course, index) => (
                    <CoursePreview key={`course_${index}`} course={course} />
                ))}
            </div>
            <h2>Other Courses</h2>
            <div className={styling.courseList}>
                {otherCourses.map((course, index) => (
                    <CoursePreview key={`course_${index}`} course={course} />
                ))}
            </div>
        </div>
    );
};

export default Home;
