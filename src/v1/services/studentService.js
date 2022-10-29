import User from "../../models/userModel.js";
import LessonHistory from "../../models/lessonHistoryModel.js";
import AssignmentHistory from "../../models/assignmentHistoryModel.js";

import checkIf from "../../util/validation/student/checkIf.js";
import replaceQuotes from "../../util/validation/student/replaceQuotes.js";
import { completeSingleAssignment_mail } from "../../mail/custom/mails.js";

const fetchLessonHistory = async (studentId, teacherId) => {
  try {
    let lessonHistory;

    if (studentId && teacherId) {
      lessonHistory = await LessonHistory.find({
        studentId,
        teacherId,
      });
    } else if (studentId && !teacherId) {
      lessonHistory = await LessonHistory.find({ studentId });
    } else {
      lessonHistory = await LessonHistory.find({ teacherId });
    }

    if (!lessonHistory) {
      return { lessonHistory: "No lesson history has been found." };
    }

    return { message: "Lesson History has been found.", lessonHistory };
  } catch (error) {
    throw error;
  }
};

const fetchAssignmentHistory = async (studentId, teacherId) => {
  try {
    let assignmentHistory;

    if (studentId && teacherId) {
      assignmentHistory = await AssignmentHistory.find({
        studentId,
        teacherId,
      });
    } else if (studentId && !teacherId) {
      assignmentHistory = await AssignmentHistory.find({ studentId });
    } else {
      assignmentHistory = await AssignmentHistory.find({ teacherId });
    }

    if (!assignmentHistory) {
      return { assignmentHistory: "No assignment history has been found." };
    }

    return { message: "Assignment History has been found.", assignmentHistory };
  } catch (error) {
    throw error;
  }
};

const fetchSingleAssignment = async (assignmentId) => {
  try {
    const assignment = await AssignmentHistory.findById(assignmentId);

    checkIf.assignmentExist(assignment);

    return { message: "Assignment has been found.", assignment };
  } catch (error) {
    throw error;
  }
};

const completeSingleAssignment = async (
  studentId,
  assignmentId,
  assignmentTitle,
  assignmentAnswer
) => {
  try {
    const { title, answer } = replaceQuotes(assignmentTitle, assignmentAnswer);

    const [assignment] = await AssignmentHistory.find({
      _id: assignmentId,
      studentId,
    })
      .populate("teacherId")
      .exec();

    checkIf.assignmentExist(assignment);

    assignment.studentInfo = {
      title,
      answer,
      answeredDate: new Date(), // todo check if Date.now() is needed or not
    };
    assignment.assignmentInfo.isDone = true;
    assignment.assignmentInfo.deadline > Date.now()
      ? (assignment.assignmentInfo.doneOnTime = true)
      : (assignment.assignmentInfo.doneOnTime = false);

    await assignment.save();

    const student = await User.findById(studentId);

    const teacher = await User.findById(assignment.teacherId);

    // Handle Logging
    completeSingleAssignment_mail({ teacher, student, assignment });

    return { message: `You have successfully sent your response.` };
  } catch (error) {
    throw error;
  }
};

const services = {
  fetchLessonHistory,
  fetchAssignmentHistory,
  fetchSingleAssignment,
  completeSingleAssignment,
};

export default services;
