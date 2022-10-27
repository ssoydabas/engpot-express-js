const userExist = (user) => {
  if (!user) {
    const error = new Error("User cannot be found.");
    error.statusCode = 422;
    throw error;
  }
};

const scheduleExist = (publicSchedule) => {
  if (!publicSchedule) {
    const error = new Error(
      "User doesn't have a schedule. You can create one by visiting schedule path."
    );
    error.statusCode = 422;
    throw error;
  }
};

const eventInformationPresent = (event) => {
  if (!event.title) {
    const error = new Error("Student name is required.");
    error.statusCode = 422;
    throw error;
  }

  if (!event.start || !event.end) {
    const error = new Error("Starting and ending times are required.");
    error.statusCode = 422;
    throw error;
  }
};

const noLessonCollision = (publicSchedule, event) => {
  const checkEvent_before = new Date(event.start).getTime() - 3600000;
  const checkEvent_after = new Date(event.start).getTime() + 3600000;

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
};

const checkIf = {
  userExist,
  scheduleExist,
  eventInformationPresent,
  noLessonCollision,
};

export default checkIf;
