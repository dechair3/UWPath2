from bs4 import BeautifulSoup
import requests

courseIndex = "https://ugradcalendar.uwaterloo.ca/page/Course-Descriptions-Index"
resp = requests.get(courseIndex)
soup = BeautifulSoup(resp.text, "lxml")
tableElement = soup.find_all("a")
for i in range(len(tableElement)):
    element = tableElement[i].get_text()
    if element.isupper() and len(element) > 1:
        tableElement[i] = element
    else:
        tableElement[i] = ""
with open("CourseHeadings.txt", "w") as f:
    for i in range(len(tableElement)):
        if(tableElement[i] == ""):
            pass
        else:
            f.write(tableElement[i])
            f.write("\n")
