const customEmails = {
    admin: {
        editPersonalInfo: {
            title: `Your Account Information has been updated`,
            text: `
            <h1>An EngPot Admin has modified your account information.</h1>
            <h2>If you've recently made a payment, it is probable that your EngPot Credits have been added to your account.</h2>
            <p>If you think that there may be a mistake, please contact us.</p>
            <h3>EngPot English: info.engpotenglish@gmail.com</h3>
            `,
        },
        assignStudent: {
            forTeacher: {
                title: "You have a new student",
                text: (student) => {
                    return `
                    <h1>${student.personalInfo.name} ${student.personalInfo.surname} has been assigned to your account as your student.</h1>
                    <h2>You may start planning and concluding lessons as well as assigning new tasks.</h2>
                    <p>If you think that there may be a mistake, please contact us.</p>
                    <h3>EngPot English: info.engpotenglish@gmail.com</h3>
                    `
                    },
            },
            forStudent: {
                title: "You have a new teacher",
                text: (teacher) => {
                    return `
                    <h1>${teacher.personalInfo.name} ${teacher.personalInfo.surname} has been assigned to your account as your teacher.</h1>
                    <h2>You will receive emails when your teacher plans and concludes a lesson, assigns a new task, and grades your assignments.</h2>
                    <p>If you think that there may be a mistake, please contact us.</p>
                    <h3>EngPot English: info.engpotenglish@gmail.com</h3>
                    `
                },
            },
        },
        removeTeacher: {
            forTeacher: {
                title: "Your student has been removed",
                text: (student) => {
                    return `
                    <h1>${student.personalInfo.name} ${student.personalInfo.surname} has been removed from your account.</h1>
                    <h2>You are no longer able to interact with him/her.</h2>
                    <p>If you think that there may be a mistake, please contact us.</p>
                    <h3>EngPot English: info.engpotenglish@gmail.com</h3>
                    `
                },                
            },
            forStudent: {
                title: "Your teacher has been removed",
                text: (teacher) => {
                    return `
                    <h1>${teacher.personalInfo.name} ${teacher.personalInfo.surname} has been removed from your account.</h1>
                    <h2>He/She is no longer able to plan lessons with you.</h2>
                    <p>If you think that there may be a mistake, please contact us.</p>
                    <h3>EngPot English: info.engpotenglish@gmail.com</h3>
                    `
                },                
            }
        },
        deleteUser: {
            title: "Your account has been deleted",
            text: `
            <h1>You are no longer a member of EngPot English, however, your essential information, such as your EngPot Tokens and Lessons Taken, is safe with us, in case you want to come back anytime.</h1>
            <p>If you think that there may be a mistake, please contact us.</p>
            <h3>EngPot English: info.engpotenglish@gmail.com</h3>
            `,
        }
    },
    auth: {
        signUp: {
            title: "Welcome to EngPot English",
            text: (user, WEB_APP_URI, emailConfirmationCode) => {
                return `
                <h1>${user.personalInfo.name} ${user.personalInfo.surname}</h1>
                <h2>You have one more step to truly join our community. You need to click the link below to confirm your email.</h2>
                <h1>Link: <a href="${WEB_APP_URI}/userProfile/confirmYourAccount/${emailConfirmationCode}">click here</a></h2>
                <p>If you think that there may be a mistake, please contact us.</p>
                <h3>EngPot English: info.engpotenglish@gmail.com</h3>
                `
            },
        },
        confirmSignUp: {
            title: (user) => {
                return `Greetings ${user.personalInfo.name}!`
            },
            text: `
            <h1>It is official!</h1>
            <h2>Every EngPot English member is very important for us. You may study, play games, read articles, and do much more in EngPot English</h2>
            <h3>EngPot English: info.engpotenglish@gmail.com</h3>
            `,
        },
        confirmSignUpAdminNotification: {
            title: (user) => {
                return `${user.personalInfo.name} ${user.personalInfo.surname} has signed up!`;
            },
            text: `
            <h1>A new user!</h1>
            <h3>EngPot English: info.engpotenglish@gmail.com</h3>            
            `,
        },
        forgotPassword: {
            title: "You have made a request to change your password",
            text: (WEB_APP_URI, resetToken) => {
                return `
                <h1>A reset token has been assigned to your account, please click the link below to renew your password.</h1>
                <h2>Click this <a href="${WEB_APP_URI}/userProfile/resetPassword/${resetToken}">link</a> to reset your password.</h2>
                <p>If you think that there may be a mistake, please contact us.</p>
                <h3>EngPot English: info.engpotenglish@gmail.com</h3>
                `
            },
        },
        resetPassword: {
            title: "Your password change is successful",
            text: `
            <h1>You have successfully reset your password, you may use the new one now.</h1>
            <p>If you think that there may be a mistake, please contact us.</p>
            <h3>EngPot English: info.engpotenglish@gmail.com</h3>
            `
        }
    },
    student: {
        doAssignment: {
            title: "Your student has completed an assignment",
            text: (student) => {
                return `
                <h1>${student.personalInfo.name} ${student.personalInfo.surname} has sent you an answer for the assignment that you have assigned.</h1>
                <h2>Please do grade his/her assignment with a well-established note to support your student's education as much as possible.</h2>
                <p>If you think that there may be a mistake, please contact us.</p>
                <h3>EngPot English: info.engpotenglish@gmail.com</h3>
                `
            },
        },
        lessonReminder: {
            title: (student) => `Hi ${student.name}!`,
            text: (student, isToday) => `
                <h1>You have a lesson ${isToday ? "today" : "tomorrow"} at ${student.date.hour}:${student.date.minute}.</h1>
                <h2>Make sure you have everything ready for your lesson!</h2>
                <p>If you think that there may be a mistake, please contact us.</p>
                <h3>EngPot English: info.engpotenglish@gmail.com</h3>
                `,
        },
        speakingLessonReminder: {
            title: (student) => `Hi ${student.name}!`,
            text: (student, isToday) => `
                <h1>You have a speaking lesson ${isToday ? "today" : "tomorrow"} at ${student.date.hour}:${student.date.minute}.</h1>
                <h2>It is your time to speak, so speak up!</h2>
                <p>If you think that there may be a mistake, please contact us.</p>
                <h3>EngPot English: info.engpotenglish@gmail.com</h3>
                `,
        },
        assignmentReminder: {
            title: (student) => `Hi ${student.studentName}!`,
            text: (student) => `
                <h1>You have not done your assignment yet.</h1>
                <h2>Make sure you complete your assignment before its deadline!</h2>
                <h2>Assignment Title: ${student.assignmentTitle}</h2>
                <p>If you think that there may be a mistake, please contact us.</p>
                <h3>EngPot English: info.engpotenglish@gmail.com</h3>
                `,
        },
    },
    teacher: {
        planLesson: {
            title: "You have a new lesson",
            text: (teacher, plannedLessonDateObject, student) => {
                return `
                <h1>${teacher.personalInfo.name} ${teacher.personalInfo.surname} has planned a new lesson with you.</h1>
                <h2>Your lesson is at ${plannedLessonDateObject.hour}:${plannedLessonDateObject.minute} on ${plannedLessonDateObject.day}/${plannedLessonDateObject.month}/${plannedLessonDateObject.year}.</h2>
                <h2>Please be ready for your lesson at least 10 minutes prior to it.</h2>
                <p>If you think that there may be a mistake, please contact us.</p>
                <h3>EngPot English: info.engpotenglish@gmail.com</h3>
                `
            },
        },
        concludeLesson: {
            done: {
                title: "You have completed a lesson in EngPot English",
                text: (teacher) => {
                    return `
                    <h1>We hope that you have had a fantastic lesson with ${teacher.personalInfo.name} ${teacher.personalInfo.surname}</h1>
                    <h2>It is important not to forget revisiting your lessons regularly to improve faster.</h2>
                    <h2>Please let us know if there is anything that we can do to help your studies.</h2>
                    <p>If you think that there may be a mistake, please contact us.</p>
                    <h3>EngPot English: info.engpotenglish@gmail.com</h3>
                    `
                },
            },
            cancelled: {
                title: "You have cancelled a lesson",
                text: `
                <h1>We understand that you can't join your planned lesson, no problems.</h1>
                <h2>Your lesson has been cancelled, however, you should avoid cancelling lessons so that your teacher can focus on all his/her students properly.</h2>
                <p>If you think that there may be a mistake, please contact us.</p>
                <h3>EngPot English: info.engpotenglish@gmail.com</h3>
                `,
            },
            postponed: {
                title: "You have postponed a lesson",
                text: `
                <h1>We understand that you need to change the time of your lesson this week, no problems.</h1>
                <h2>Please note that you can postpone your lesson only once in a month if your teacher and you can agree on a suitable time in the same week.</h2>
                <p>If you think that there may be a mistake, please contact us.</p>
                <h3>EngPot English: info.engpotenglish@gmail.com</h3>
                `,
            },
            ghosted: {
                title: "You have ghosted a lesson",
                text: (teacher) => {
                    return `
                    <h1>We concern about you, however...</h1>
                    <h2>According to the rules in EngPot English, ${teacher.personalInfo.name} ${teacher.personalInfo.surname} has the right to drop you from his/her students after you don't attend your lesson without informing.</h2>
                    <h2>Please be aware of your lessons and your schedule.</h2>
                    <p>If you think that there may be a mistake, please contact us.</p>
                    <h3>EngPot English: info.engpotenglish@gmail.com</h3>
                    `
                },
            }
        },
        planSpeakingLesson: {
            title: "You have a new speaking lesson",
            text: (teacher, plannedSpeakingLessonDateObject, student) => {
                return `
                <h1>${teacher.personalInfo.name} ${teacher.personalInfo.surname} has planned a new lesson with you.</h1>
                <h2>Your lesson is at ${plannedSpeakingLessonDateObject.hour}:${plannedSpeakingLessonDateObject.minute} on ${plannedSpeakingLessonDateObject.day}/${plannedSpeakingLessonDateObject.month}/${plannedSpeakingLessonDateObject.year}.</h2>
                <h2>Please be ready for your lesson at least 10 minutes prior to it.</h2>
                <p>If you think that there may be a mistake, please contact us.</p>
                <h3>EngPot English: info.engpotenglish@gmail.com</h3>
                `
            },
        },
        concludeSpeakingLesson: {
            done: {
                title: "You have completed a speaking lesson in EngPot English",
                text: (teacher) => {
                    return `
                    <h1>We hope that you have had a fantastic speaking lesson with ${teacher.personalInfo.name} ${teacher.personalInfo.surname}</h1>
                    <h2>It is important not to forget revisiting your lessons regularly to improve faster.</h2>
                    <h2>Please let us know if there is anything that we can do to help your studies.</h2>
                    <p>If you think that there may be a mistake, please contact us.</p>
                    <h3>EngPot English: info.engpotenglish@gmail.com</h3>
                    `
                },
            },
            cancelled: {
                title: "You have cancelled a speaking lesson",
                text: `
                <h1>We understand that you can't join your planned lesson, no problems.</h1>
                <h2>Your lesson has been cancelled, however, you should avoid cancelling lessons so that your teacher can focus on all his/her students properly.</h2>
                <p>If you think that there may be a mistake, please contact us.</p>
                <h3>EngPot English: info.engpotenglish@gmail.com</h3>
                `,
            }
        },
        addAssignment: {
            title: "You have a new assignment",
            text: (teacher) => {
                return `
                <h1>${teacher.personalInfo.name} ${teacher.personalInfo.surname} has assigned you a new task.</h1>
                <h2>Please do not forget to complete your task before its deadline.</h2>
                <p>If you think that there may be a mistake, please contact us.</p>
                <h3>EngPot English: info.engpotenglish@gmail.com</h3>
                `
            },
        },
        markAssignment: {
            title: "Your assignment has been graded",
            text: (teacher, assignment) => {
                return `
                <h1>${teacher.personalInfo.name} ${teacher.personalInfo.surname} has graded one of your tasks.</h1>
                <h2>Assignment Title: ${assignment.assignmentInfo.title}</h2>
                <p>If you think that there may be a mistake, please contact us.</p>
                <h3>EngPot English: info.engpotenglish@gmail.com</h3>
                `
            },
        },
        lessonReminder: {
            title: (user) => `Hi ${user.name}!`,
            text: (user) => `
                <h1>You have a lesson ${isToday ? "today" : "tomorrow"} at ${user.nextLessonDate.hour}:${user.nextLessonDate.minute}.</h1>
                <h2></h2>
                <p>If you think that there may be a mistake, please contact us.</p>
                <h3>EngPot English: info.engpotenglish@gmail.com</h3>
                `,
        },
        speakingLessonReminder: {
            title: (user) => `Hi ${user.name}!`,
            text: (user) => `
                <h1></h1>
                <h2></h2>
                <p>If you think that there may be a mistake, please contact us.</p>
                <h3>EngPot English: info.engpotenglish@gmail.com</h3>
                `,
        },
        assignmentCheckReminder: {
            title: (user) => `Hi ${user.name}!`,
            text: (user) => `
                <h1></h1>
                <h2></h2>
                <p>If you think that there may be a mistake, please contact us.</p>
                <h3>EngPot English: info.engpotenglish@gmail.com</h3>
                `,
        },
    }
};

export default customEmails;