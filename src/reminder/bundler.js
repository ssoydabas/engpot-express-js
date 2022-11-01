import nodeSchedule from "node-schedule";

import lessonReminder from "./lesson/lessonReminder.js";

import mail from "../mail/mail.js";

const reminders = () => {
  try {
    const job = nodeSchedule.scheduleJob("30 6 * * *", function () {
      lessonReminder();

      mail({
        recipient: "ssoydabas41@gmail.com",
        subject: "NODE SCHEDULE Fired!",
        html: "GERMANY 6:30 || TURKEY 8:30",
      });
    });
  } catch (error) {
    console.log(error);
  }
};

export default reminders;
