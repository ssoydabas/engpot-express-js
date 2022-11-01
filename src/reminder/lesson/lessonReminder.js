import User from "../../models/userModel.js";

import mapStudentObject from "../util/mapStudentObject.js";

import reminderMails from "../../mail/custom/reminders/lessonReminders.js";

const lessonReminder = async () => {
  try {
    const date = new Date().getTime();
    const turkey_Offset = 180 * 60000; // +3 hours

    const timestamp_TR = new Date(date + turkey_Offset);
    const hourInTurkey = timestamp_TR.getUTCHours();
    const dayInTurkey = timestamp_TR.getUTCDay() - 1;
    const monthInTurkey = timestamp_TR.getUTCMonth() + 1;

    const morning = hourInTurkey <= 12 && hourInTurkey >= 7;
    const afternoon = hourInTurkey > 12;

    let students = await User.find({
      "engPotInfo.status": "student",
      "engPotInfo.nextLesson.hasPlannedLesson": "true",
    });
    students = mapStudentObject(students);

    if (morning) {
      students = students.filter((student) => {
        if (
          +student.dateObject.day === dayInTurkey &&
          +student.dateObject.month === monthInTurkey &&
          +student.dateObject.hour >= 12
        ) {
          return student;
        }
      });
    } else if (afternoon) {
      students = students.filter((student) => {
        if (
          (+student.dateObject.day === dayInTurkey + 1 &&
            +student.dateObject.month === monthInTurkey &&
            +student.dateObject.hour <= 12) ||
          (+student.dateObject.day === 1 &&
            +student.dateObject.month === monthInTurkey + 1 &&
            +student.dateObject.hour <= 12)
        ) {
          return student;
        }
      });
    }

    reminderMails(students);
  } catch (error) {
    console.log(error);
  }
};

export default lessonReminder;
