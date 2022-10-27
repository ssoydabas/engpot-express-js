import scheduleService from "../services/scheduleService.js";

const fetchSchedule = async (req, res, next) => {
  try {
    const { userId } = req.query;

    const publicSchedule = await scheduleService.fetchSchedule(userId);

    res.send({ status: "OK", ...publicSchedule });
  } catch (error) {
    next(error);
  }
};

const updateSchedule_add = async (req, res, next) => {
  try {
    const { userId, event } = req.body;

    const isAdditionSuccessful = await scheduleService.updateSchedule_add(
      userId,
      event
    );

    res.send({ status: "OK", ...isAdditionSuccessful });
  } catch (error) {
    next(error);
  }
};

const updateSchedule_edit = async (req, res, next) => {
  try {
    const { userId, event } = req.body;

    const isEditingSuccessful = await scheduleService.updateSchedule_edit(
      userId,
      event
    );

    res.send({ status: "OK", ...isEditingSuccessful });
  } catch (error) {
    next(error);
  }
};

const updateSchedule_remove = async (req, res, next) => {
  try {
    const { userId, event } = req.body;

    const isRemovingSuccessful = await scheduleService.updateSchedule_remove(
      userId,
      event
    );

    res.send({ status: "OK", ...isRemovingSuccessful });
  } catch (error) {
    next(error);
  }
};

const controllers = {
  fetchSchedule,
  updateSchedule_add,
  updateSchedule_edit,
  updateSchedule_remove,
};

export default controllers;
