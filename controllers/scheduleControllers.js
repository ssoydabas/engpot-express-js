import User from "../models/user.js";

import PublicSchedule from "../models/scheduleModels/publicScheduleModel/publicSchedule.js";

export const get_fetchPublicSchedule = async (req, res, next) => {
  try {
    const { userId } = req.query;

    const user = await User.findById(userId);
    if (!user) {
      const error = new Error("User cannot be found.");
      error.statusCode = 422;
      throw error;
    }

    let publicSchedule = await PublicSchedule.findOne({ userId: userId });
    if (!publicSchedule) {
      publicSchedule = new PublicSchedule({
        userId: userId,
      });
    }

    res.status(200).json({
      publicSchedule,
    });
  } catch (err) {
    next(err);
  }
};

export const post_updatePublicSchedule = async (req, res, next) => {
  try {
    const { userId } = req.body;
    const { action } = req.body;
    const { event } = req.body;

    const user = await User.findById(userId);
    if (!user) {
      const error = new Error("User cannot be found.");
      error.statusCode = 422;
      throw error;
    }

    let publicSchedule = await PublicSchedule.findOne({ userId: userId });
    if (!publicSchedule) {
      publicSchedule = new PublicSchedule({
        userId: userId,
      });
    }

    const checkEvent_before = new Date(event.start).getTime() - 3600000;
    const checkEvent_after = new Date(event.start).getTime() + 3600000;

    if (action === "add") {
      if (publicSchedule.events.length > 0) {
        for (let e of publicSchedule.events) {
          const timestamp = new Date(e.start).getTime();
          if (
            e.id !== event.id &&
            timestamp > checkEvent_before &&
            timestamp < checkEvent_after
          ) {
            const error = new Error("Requested time is already occupied.");
            error.statusCode = 422;
            throw error;
          }
        }
      }
      const newEvent = { ...event, id: event.start };
      publicSchedule.events.push(newEvent);
    } else if (action === "dragDrop") {
      if (publicSchedule.events.length > 0) {
        for (let e of publicSchedule.events) {
          const timestamp = new Date(e.start).getTime();
          if (
            e.id !== event.id &&
            timestamp > checkEvent_before &&
            timestamp < checkEvent_after
          ) {
            const error = new Error("Requested time is already occupied.");
            error.statusCode = 422;
            throw error;
          }
        }

        const eventIndex = publicSchedule.events.findIndex(
          (e) => e.id === event.id
        );

        publicSchedule.events[eventIndex].start = event.start;
        publicSchedule.events[eventIndex].end = event.end;
        publicSchedule.events[eventIndex].id = event.start;

        publicSchedule.markModified("events");
      }
    } else if (action === "remove") {
      const eventIndex = publicSchedule.events.findIndex(
        (e) => e.id === event.id
      );
      publicSchedule.events.splice(eventIndex, 1);
    }

    await publicSchedule.save();

    res.status(200).json({
      message: "Your schedule has been updated.",
    });
  } catch (err) {
    next(err);
  }
};
