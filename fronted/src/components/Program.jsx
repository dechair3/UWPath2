import Course from './Course'

const Program  = ({programObject}) => {
    const name = programObject.name
    const notes = programObject.notes
    const courses = programObject.courses
    return(
        <div>
            <p>Program Name: {name}</p>
            <p>Notes : {notes} </p>
            <p>Courses: </p>
            <Course courseObject={courses} />
        </div>
    )
}

export default Program