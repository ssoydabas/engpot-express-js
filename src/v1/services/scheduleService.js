import User from "../../models/userModel.js";
import PublicSchedule from "../../models/publicScheduleModel.js";

import checkIf from "../../util/validation/schedule/checkIf.js";

const fetchSchedule = async (userId) => {
  try {
    const user = await User.findById(userId);

    checkIf.userExist(user);

    let publicSchedule = await PublicSchedule.findOne({ userId });

    if (!publicSchedule) {
      publicSchedule = new PublicSchedule({
        userId,
      });

      await publicSchedule.save();
    }

    return { publicSchedule };
  } catch (error) {
    throw error;
  }
};

const updateSchedule_add = async (userId, event) => {
  try {
    const user = await User.findById(userId);

    checkIf.userExist(user);

    let publicSchedule = await PublicSchedule.findOne({ userId: userId });

    checkIf.scheduleExist(publicSchedule);

    checkIf.eventInformationPresent(event);

    checkIf.noLessonCollision(publicSchedule, event);

    const newEvent = { ...event, id: event.start };

    publicSchedule.events.push(newEvent);

    await publicSchedule.save();

    return { message: "You have added a lesson to your schedule." };
  } catch (error) {
    throw error;
  }
};

const updateSchedule_edit = async (userId, event) => {
  try {
    const user = await User.findById(userId);

    checkIf.userExist(user);

    let publicSchedule = await PublicSchedule.findOne({ userId: userId });

    checkIf.scheduleExist(publicSchedule);

    checkIf.eventInformationPresent(event);

    checkIf.noLessonCollision(publicSchedule, event);

    const eventIndex = publicSchedule.events.findIndex(
      (e) => e.id === event.id
    );

    publicSchedule.events[eventIndex].start = event.start;
    publicSchedule.events[eventIndex].end = event.end;
    publicSchedule.events[eventIndex].id = event.start;

    publicSchedule.markModified("events");

    await publicSchedule.save();

    return { message: "You have edited a lesson in your schedule." };
  } catch (error) {
    throw error;
  }
};

const updateSchedule_remove = async (userId, event) => {
  try {
    const user = await User.findById(userId);

    checkIf.userExist(user);

    let publicSchedule = await PublicSchedule.findOne({ userId: userId });

    checkIf.scheduleExist(publicSchedule);

    const eventIndex = publicSchedule.events.findIndex(
      (e) => e.id === event.id
    );

    publicSchedule.events.splice(eventIndex, 1);

    await publicSchedule.save();

    return { message: "You have removed a lesson from your schedule" };
  } catch (error) {
    throw error;
  }
};

const services = {
  fetchSchedule,
  updateSchedule_add,
  updateSchedule_edit,
  updateSchedule_remove,
};

export default services;
