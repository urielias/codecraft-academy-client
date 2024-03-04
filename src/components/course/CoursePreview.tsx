import styling from "./course.module.css";

interface CoursePreviewProps {
    course: CoursePreview;
}

const CoursePreview = (props: CoursePreviewProps) => {
    const { course } = props;
    return (
        <div className={styling.coursePreview}>
            <div>
                <h2>{course.name}</h2>
                <p>Taught by: {course.teacher_name}</p>
            </div>
            <h5>Rating: {course.rating} / 10</h5>
            <h4>{course.description}</h4>
            {course.enrolled ? (
                <button className={styling.coursePreviewButton}>Continue</button>
            ) : (
                <button>Enroll</button>
            )}
        </div>
    );
};

export default CoursePreview;
