import Course from './Course'

const Program  = ({programObject}) => {
    const name = programObject.name
    const notes = programObject.notes
    const courses = programObject.courses
    return(
        <div>

            <Course courseObject={courses} />
        </div>
    )
}

export default Program