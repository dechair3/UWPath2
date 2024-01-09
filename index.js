require('dotenv').config()
const {Program, Course} = require('./mongo')
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')

const app = express()
const logger = morgan(':method :url :status :res[content-length] - :response-time ms')

app.use(express.json())
app.use(logger)
app.use(cors())

app.get('', async (req, res) => {
    const date = new Date()

    const len = await Program.countDocuments({})

    res.send(`Currently it is ${date}. This website stores information about ${len} programs/departments`)
})


app.get('/program/all', async (req, res) => {
    let courses = await Program.findOne({})
    res.json(courses)
})

app.get('/program/heading/:heading', async (req, res) =>{
    heading = req.params.heading
    details = await Program.findOne({'heading' : heading})
    res.json(details)
})

app.get('/program/name/:name', async (req, res) => {
    heading = req.params.name //Sanitzie Clientside
    if(heading.length < 3){
        return res.json(null)
    }
    let programs = await Program.find({})

    result = programs.filter(program => program.name.includes(heading))
    if(result == []){
        return res.json(null)
    }
    return res.json(result)
})

app.get('/course/coursecode/:coursecode', async (req, res) => {
    let courseCode = req.params.coursecode
  
    let courseList = await Course.find({'courseCode' : courseCode})
    if(courseList){
        return res.json(courseList)
    }
    else{
        return null
    }
})

app.get('/course/name/:coursename', async (req, res) => {
    let name = req.params.coursename.toLowerCase()
    if(name.length < 5){
        return res.json(null)
    }
    let courses = await Course.find({})
    result = courses.filter(course => course.courseName.toLowerCase().replace(/\s+/g, '').includes(name)) 
    return res.json(result)


})

const PORT = process.env.PORT

app.listen(PORT, () => {
    console.log(`Server running on ${PORT}`)
})