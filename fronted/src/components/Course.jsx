
const Course = ({courseObject}) => {
    const courseList = courseObject.map(course => <li key={course.courseCode}>{course.courseName}</li>)
    return(
        <ul>{courseList}</ul>
    )
}

export default Course