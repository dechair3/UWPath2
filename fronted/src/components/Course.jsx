
const Course = ({courseObject}) => {
    const courseList = courseObject.map(course => <li>{course.courseName}</li>)
    return(
        <ul>{courseList}</ul>
    )
}

export default Course