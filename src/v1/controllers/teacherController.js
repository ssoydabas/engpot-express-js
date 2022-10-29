import teacherService from "../services/teacherService.js";

const studentsByTeacherId = async (req, res, next) => {
  try {
    const { teacherId } = req.params;

    const foundStudents = await teacherService.studentsByTeacherId(teacherId);

    res.send({ status: "OK", ...foundStudents });
  } catch (error) {
    next(error);
  }
};

const planLesson = async (req, res, next) => {
  try {
    const isPlanningSuccessful = await teacherService.planLesson(req.body);

    res.send({ status: "OK", ...isPlanningSuccessful });
  } catch (error) {
    next(error);
  }
};

const concludeLesson = async (req, res, next) => {
  try {
    const isConcludingSuccessful = await teacherService.concludeLesson(
      req.body
    );

    res.send({ status: "OK", ...isConcludingSuccessful });
  } catch (error) {
    next(error);
  }
};

const assignTask = async (req, res, next) => {
  try {
    const isTaskAssigned = await teacherService.assignTask(req.body);

    res.send({ status: "OK", ...isTaskAssigned });
  } catch (error) {
    next(error);
  }
};

const markTask = async (req, res, next) => {
  try {
    const isTaskMarked = await teacherService.markTask(req.body);

    res.send({ status: "OK", ...isTaskMarked });
  } catch (error) {
    next(error);
  }
};

const controllers = {
  studentsByTeacherId,
  planLesson,
  concludeLesson,
  assignTask,
  markTask,
};

export default controllers;
