const User = require("../../models/user");

const nodemailerConfig = require("./nodeMailerConfig");
const customEmails = require("./customEmails");

const divideDateStringIntoUnitsObject = require("../teacherControllerUtilities/divideDateStringIntoUnitsObject");
const dayInTurkey = new Date().getDate();


const remindStudentOfLessons = (students) => {
    students.forEach(student => {
        student.date = divideDateStringIntoUnitsObject(student.date);
        const todayOrTomorrow = +student.date.day === dayInTurkey ? "today" : "tomorrow";

        nodemailerConfig.sendMail(
            "ssoydabas41@gmail.com",//student.email
            customEmails.nodemailerCustomEmails.student.lessonReminder.title(student),
            customEmails.nodemailerCustomEmails.student.lessonReminder.text(student, todayOrTomorrow),
        );
    });
};

const remindStudentOfSpeakingLessons = (students) => {
    students.forEach(student => {
        student.date = divideDateStringIntoUnitsObject(student.date);
        const todayOrTomorrow = +student.date.day === dayInTurkey ? "today" : "tomorrow";

        nodemailerConfig.sendMail(
            "ssoydabas41@gmail.com",//student.email
            customEmails.nodemailerCustomEmails.student.speakingLessonReminder.title(student),
            customEmails.nodemailerCustomEmails.student.speakingLessonReminder.text(student, todayOrTomorrow),
        );
    });
};

const remindStudentOfAssignments = (students) => {
    students.forEach(async student => {
        const studentInfo = await User.findById(student.studentId);
        student.studentName = studentInfo.personalInfo.name;

        nodemailerConfig.sendMail(
            "ssoydabas41@gmail.com",//studentInfo.personalInfo.emailInfo.email
            customEmails.nodemailerCustomEmails.student.assignmentReminder.title(student),
            customEmails.nodemailerCustomEmails.student.assignmentReminder.text(student),
        );
    });
};


const remindStudents = (students, reasonToSendMail) => {

    switch(reasonToSendMail) {
        case "lessons":
            remindStudentOfLessons(students);
            break
        case "speakingLessons":
            remindStudentOfSpeakingLessons(students);
            break
        case "assignments":
            remindStudentOfAssignments(students);
            break
    }

};

module.exports = remindStudents