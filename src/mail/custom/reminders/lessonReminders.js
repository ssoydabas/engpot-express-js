import mail from "../../mail.js";

const reminderMails = (students) => {
  for (let student of students) {
    mail({
      recipient: student.email,
      subject: "Lesson Reminder!",
      html: `
            <h2>Hello ${student.name}</h2>
            <p>We would like to remind you about your lesson, your teacher will be waiting for you.</p>
            <h2>Your lesson is at ${student.dateObject.hour}:${student.dateObject.minute} on ${student.dateObject.monthName} ${student.dateObject.day}.</h2>
        `,
    });
  }
};

export default reminderMails;
