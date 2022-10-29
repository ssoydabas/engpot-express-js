import mail from "../mail.js";

// User Service
export const createUser_mail = ({ user, emailConfirmationCode }) => {
  mail({
    recipient: user.personalInfo.emailInfo.email,
    subject: "Welcome to EngPot English!",
    html: `<h1>${user.personalInfo.name} ${user.personalInfo.surname}</h1>
    <h2>You have one more step to truly join our community. You need to click the link below to confirm your email.</h2>
    <h1>Link: <a href="${process.env.WEB_APP_URL}/user/confirmAccount/${emailConfirmationCode}">click here</a></h2>
    <p>If you think that there may be a mistake, please contact us.</p>
    <h3>EngPot English: engpotenglish@gmail.com</h3>
    `,
  });
};

export const sendConfirmationCode_mail = ({ user, emailConfirmationCode }) => {
  mail({
    recipient: user.personalInfo.emailInfo.email,
    subject: "Welcome to EngPot English!",
    html: `<h1>${user.personalInfo.name} ${user.personalInfo.surname}</h1>
        <h2>You have one more step to truly join our community. You need to click the link below to confirm your email.</h2>
        <h1>Link: <a href="${process.env.WEB_APP_URL}/v1/user/confirmAccount/${emailConfirmationCode}">click here</a></h2>
        <p>If you think that there may be a mistake, please contact us.</p>
        <h3>EngPot English: engpotenglish@gmail.com</h3>
        `,
  });
};

export const confirmUserAccount_mail = ({ user }) => {
  mail({
    recipient: process.env.OAUTH_ADMIN_EMAIL,
    subject: "A new EngPot'ter!",
    html: `<h1>${user.personalInfo.name} ${user.personalInfo.surname}</h1>`,
  });
};

export const requestNewPassword_mail = ({ email, generatedResetToken }) => {
  mail({
    recipient: email,
    subject: "You forgot your password?",
    html: `
        <h1>A reset token has been assigned to your account, please click the link below to renew your password.</h1>
        <h2>Click this <a href="${process.env.WEB_APP_URL}/user/resetPassword/${generatedResetToken}">link</a> to reset your password.</h2>
        <p>If you think that there may be a mistake, please contact us.</p>
        <h3>EngPot English: info.engpotenglish@gmail.com</h3>
        `,
  });
};

export const resetPassword_mail = ({ user }) => {
  mail({
    recipient: user.personalInfo.emailInfo.email,
    subject: "You have successfully changed your password!",
  });
};

// Admin Service
export const editUserInformation_mail = ({ user }) => {
  mail({
    recipient: user.personalInfo.emailInfo.email,
    subject: "Your account information has been updated!",
    html: "If you have made a payment recently, our admins have charged your account.",
  });
};

export const createTeacherStudent_mail_student = ({ student, teacher }) => {
  mail({
    recipient: student.personalInfo.emailInfo.email,
    subject: "You have a new teacher!",
    html: `<h1>${teacher.personalInfo.name} ${teacher.personalInfo.surname} has been assigned to your account as your teacher.</h1>
        <h2>You will receive emails when your teacher plans and concludes a lesson, assigns a new task, and grades your assignments.</h2>
    `,
  });
};

export const createTeacherStudent_mail_teacher = ({ teacher, student }) => {
  mail({
    recipient: teacher.personalInfo.emailInfo.email,
    subject: "You have a new student!",
    html: `<h1>${student.personalInfo.name} ${student.personalInfo.surname} has been assigned to your account as your student.</h1>
    <h2>You may start planning and concluding lessons as well as assigning new tasks.</h2>
        `,
  });
};

export const deleteTeacherStudent_mail_student = ({ student, teacher }) => {
  mail({
    recipient: student.personalInfo.emailInfo.email,
    subject: "You no longer have a teacher!",
    html: `<h1>${teacher.personalInfo.name} ${teacher.personalInfo.surname} is no longer your teacher.</h1> 
            <h2>If you believe that there is a mistake, please contact us on engpotenglish.com</h2>
        `,
  });
};

export const deleteTeacherStudent_mail_teacher = ({ teacher, student }) => {
  mail({
    // todo seems not to work
    recipient: teacher.personalInfo.emailInfo.email,
    subject: "Your student has been removed from your account!",
    html: `<h1>${student.personalInfo.name} ${student.personalInfo.surname} is no longer your student.</h1> 
            <h2>If you believe that there is a mistake, please contact us on engpotenglish.com</h2>
        `,
  });
};

export const contactAdmins_mail = ({}) => {}; // todo

// Teacher Service
export const planLesson_mail = ({ student, dateObject }) => {
  mail({
    recipient: student.personalInfo.emailInfo.email,
    subject: "You have a new lesson!",
    html: `
        <h1>The new lesson is at ${dateObject.hour}:${dateObject.minute} on ${dateObject.monthName} ${dateObject.day}</h1>
        <h2>Don't forget to be ready to learn 10 minutes before it.</h2>
        `,
  });
};

// todo Conclude for not done lessons

export const assignTask_mail = ({ student, assignment }) => {
  mail({
    recipient: student.personalInfo.emailInfo.email,
    subject: "You have a new assignment!",
    html: `<h1>Please do not forget to complete your assignment before the deadline.</h1>
        <h2>If you have further questions about your assignment, you should always feel free to ask your teacher.</h2>
        <h1>Assignment Title: ${assignment.assignmentInfo.title}</h1>
        `,
  });
};

export const markTask_mail = ({ student, teacher, assignment }) => {
  mail({
    recipient: student.personalInfo.emailInfo.email,
    subject: "Your assignment has been marked!",
    html: `<h1>${teacher.personalInfo.name} has checked your assignment.</h1>
        <h2>Exciting! Check it right away!</h2>
        <h1>Assignment Title: ${assignment.assignmentInfo.title}</h1>
        `,
  });
};

// Student Service
export const completeSingleAssignment_mail = ({
  teacher,
  student,
  assignment,
}) => {
  mail({
    recipient: teacher.personalInfo.emailInfo.email,
    subject: `${student.personalInfo.name} has completed an assignment!`,
    html: `<h1>Please do not forget to mark his/her assignment with a well-organized note.</h1>
        <h2>Assignment Title: ${assignment.assignmentInfo.title}</h2>
        `,
  });
};

