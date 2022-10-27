import studentService from "../services/studentService.js";

const fetchLessonHistory = async (req, res, next) => {
  try {
    const { studentId, teacherId } = req.query;

    const foundLessonHistory = await studentService.fetchLessonHistory(
      studentId,
      teacherId
    );

    res.send({ status: "OK", ...foundLessonHistory });
  } catch (error) {
    next(error);
  }
};

const fetchAssignmentHistory = async (req, res, next) => {
  try {
    const { studentId, teacherId } = req.query;

    const foundAssignmentHistory = await studentService.fetchAssignmentHistory(
      studentId,
      teacherId
    );

    res.send({ status: "OK", ...foundAssignmentHistory });
  } catch (error) {
    next(error);
  }
};

const fetchSingleAssignment = async (req, res, next) => {
  try {
    const { assignmentId } = req.params;

    const foundAssignment = await studentService.fetchSingleAssignment(
      assignmentId
    );

    res.send({ status: "OK", ...foundAssignment });
  } catch (error) {
    next(error);
  }
};

const completeSingleAssignment = async (req, res, next) => {
  try {
    const { studentId, assignmentId, assignmentTitle, assignmentAnswer } =
      req.body;

    const isCompleted = await studentService.completeSingleAssignment(
      studentId,
      assignmentId,
      assignmentTitle,
      assignmentAnswer
    );

    res.send({ status: "OK", ...isCompleted });
  } catch (error) {
    next(error);
  }
};

const controllers = {
  fetchLessonHistory,
  fetchAssignmentHistory,
  fetchSingleAssignment,
  completeSingleAssignment,
};

export default controllers;
