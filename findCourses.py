from bs4 import BeautifulSoup
import requests
from unicodedata import normalize
baseCourseListings = "https://ugradcalendar.uwaterloo.ca/courses/"
courseHeadings = []
import json
import re


def findCommonName(soup):
    commonName = (soup.find('h2').text.lower()).strip()
    commonName = commonName.replace('\u00a0', ' ').strip()
    commonName = re.sub(' +', ' ', commonName)
    commonName = commonName.replace(' ', '')
    return commonName

def findNotes(soup):
    note = soup.find('ol')
    if(note):
        return note.text.strip()
    note = soup.find(class_='notes')
    if(note):
        return (soup.find('p').text).strip()
    else:
        return "None"
    
def findCourseCode(course):
    return course.find('a')['name']

def findCourseName(course):
    return course.find_all('strong')[1].text

def findCourseDesc(course):
    return course.find(class_ = 'divTableCell colspan-2').next_sibling.text

def findCourseNote(details):
    notes = details[0].text
    return notes if notes[0] == '[' else "None"

def findCourseConsent(details):
    for detail in details:
        detail = detail.text
        if("Consent" in detail):
            return detail
    return "None"

def findCoursePrereqs(details):
    for detail in details:
        detail = detail.text
        if("Prereq:" in detail):
            return detail
    return "None"

def findCourseCoreqs(details):
    for detail in details:
        detail = detail.text
        if("Coreq:" in detail):
            return detail
    return "None"

def findCourseAntireqs(details):
    for detail in details:
        detail = detail.text
        if("Antireq:" in detail):
            return detail
    return "None"

def findCrosslisting(details):
    for detail in details:
        detail = detail.text
        if("Crosslisted:" in detail):
            return detail
    return "None"

def findOnline(details):
    for detail in details:
        detail = detail.text
        if("Online" in detail):
            return True
    return False

def findCourses(soup, name):
    commonName = findCommonName(soup)
    notes = findNotes(soup)
    courses = soup.find_all('center')
    programDetails = {"Name" : commonName, "Notes" : notes, "Courses" : []}
    for course in courses:
        courseCode = findCourseCode(course)
        courseName = findCourseName(course)
        courseDesc = findCourseDesc(course)
        courseLogistics = course.find_all('em')
        courseNotes = findCourseNote(courseLogistics)
        courseConsent = findCourseConsent(courseLogistics)
        coursePrereqs = findCoursePrereqs(courseLogistics)
        courseCoreqs = findCourseCoreqs(courseLogistics)
        courseAntireqs = findCourseAntireqs(courseLogistics)
        crosslisted = findCrosslisting(courseLogistics)
        online = findOnline(courseLogistics)

        courseDetail = {
            'courseCode': courseCode,
            'Name': courseName,
            'Desc': courseDesc,
            'Notes': courseNotes,
            'Consent': courseConsent,
            'Prereqs': coursePrereqs,
            'Coreqs': courseCoreqs,
            'Antireqs': courseAntireqs,
            'crosslisted': crosslisted,
            'online': online
        }
        programDetails["Courses"].append(courseDetail)
    programDetails = json.dumps(programDetails, indent=4)
    with open(f"Courses\\{name}.json", "w") as f:
        f.write(programDetails)

with open("CourseHeadings.txt", "r") as f:
    courseHeadings = f.read().splitlines()

for i in range(len(courseHeadings)):
    print(courseHeadings[i])
    print(" ")
    link = baseCourseListings + courseHeadings[i]
    resp = requests.get(link)
    soup = BeautifulSoup(resp.text, "lxml")
    findCourses(soup, courseHeadings[i])
print("DONE!")