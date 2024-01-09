require('dotenv').config()
const {Program, Course} = require('./mongo.js')
const fs = require('fs')

courseHeadings = ["AFM", "ACTSC", "ASL", "ANTH", "APPLS", "AMATH", "ARABIC", "AE", "ARCH", "ARTS", "ARBUS", "AVIA", "BIOL", "BME", "BLKST", "BASE", "BUS", "BET", "CDNST", "CHE", "CHEM", "CHINA", "CMW", "CIVE", "CLAS", "COGSCI", "CO", "COMM", "COMMST", "CS", "CFM", "COOP", "CROAT", "CI", "DAC", "DUTCH", "EARTH", "EASIA", "ECON", "ECE", "ENGL", "EMLS", "ENVS", "ENBUS", "ERS", "ENVE", "FINE", "FR", "GSJ", "GENE", "GEOG", "GEOE", "GER", "GERON", "GBDA", "GRK", "HEALTH", "HHUM", "HIST", "HRM", "HRTS", "HUMSC", "INDENT", "INDG", "INDEV", "INTST", "ITAL", "ITALST", "JAPAN", "JS", "KIN", "INTEG", "KOREA", "LAT", "LS", "MGMT", "MSCI", "MNS", "MATBUS", "MATH", "MTHEL", "ME", "MTE", "MEDVL", "MENN", "MOHAWK", "MUSIC", "NE", "OPTOM", "PACS", "PHARM", "PHIL", "PHYS", "PLAN", "PSCI", "PORT", "PD", "PDARCH", "PDPHRM", "PSYCH", "HLTH", "PMATH", "REC", "RS", "RUSS", "REES", "SCI", "SCBUS", "SMF", "SDS", "SOCWK", "SWREN", "STV", "SOC", "SE", "SPAN", "STAT", "SI", "SFM", "SYDE", "THPERF", "UNIV", "VCULT", "WKRPT"]
baseFile = "Courses\\"

Program.deleteMany({}).then(() => console.log("Deleted All Program Entries"))
Course.deleteMany({}).then(() => console.log("Deleted All Course Entries"))

for(let i = 0; i < courseHeadings.length; i++){
    filePath = baseFile + courseHeadings[i] + ".json"
    fs.readFile(filePath, async (err, data) => {
        if(err){
            throw(err)
        }
        let program = JSON.parse(data)
        let courses = program.Courses
        courses = await courses.map(course => new Course({
                "courseCode": course.courseCode,
                "courseName": course.Name,
                "Desc": course.Desc,
                "Notes": course.Notes,
                "Consent": course.Consent,
                "Prereqs": course.Prereqs,
                "Coreqs": course.Coreqs,
                "Antireqs": course.Antireqs,
                "crosslisted": course.crosslisted,
                "online": course.online
        }))

        await courses.forEach(course => course.save())
        programObject = new Program({
            "name" : program.Name,
            "heading" : program.Heading,
            "notes" : program.Notes,
            "courses" : courses
        })
        await programObject.save()
        console.log("Saved ", courseHeadings[i])
        await new Promise(r => setTimeout(r, 5000));
    })

}