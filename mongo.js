const mongoose = require('mongoose')

mongoose.connect(process.env.MONGODB_URI)
.then(() => {
        console.log("Connected to database")
    }
)
.catch((error) => {
    console.log(error.message)  
    }
)

const courseSchema = new mongoose.Schema({
        courseCode : String,
        Name : String,
        Desc : String,
        Notes : String,
        Consent : String,
        Prereqs : String,
        Coreqs : String,
        Antireqs : String,
        crosslisted : String,
        online : Boolean
})

const programSchema = new mongoose.Schema({
    name : String,
    notes: String,
    courses: {
      type:  [courseSchema]
    }
})

const Course = mongoose.model('Course', courseSchema)
const Program = mongoose.model('Program', programSchema)

module.exports = {Program, Course}

