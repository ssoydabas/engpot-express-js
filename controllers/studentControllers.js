import User from "../models/user.js";
import LessonHistory from "../models/studentModels/lessonHistory.js";
import Assignment from "../models/studentModels/assignment.js";

import winston from "../util/winston/winston.js";
import { sendMail } from "../util/nodeMailer/nodeMailerConfig.js";
import customEmails from "../util/nodeMailer/customEmails.js";

export const get_lessonHistory = async (req, res, next) => {
  try {
    // todo Remind yourself the query functionality
    const { studentId } = req.query;
    const { teacherId } = req.query;

    let lessonHistory;

    if (studentId && teacherId) {
      lessonHistory = await LessonHistory.find({
        studentId: studentId,
        teacherId: teacherId,
      });
    } else if (studentId && !teacherId) {
      lessonHistory = await LessonHistory.find({ studentId: studentId });
    } else {
      lessonHistory = await LessonHistory.find({ teacherId: teacherId });
    }

    if (!lessonHistory) {
      return res.status(200).json({
        lessonHistory: "No lesson history has been found.",
      });
    }

    res.status(200).json({
      lessonHistory,
    });
  } catch (err) {
    next(err);
  }
};

export const get_assignmentHistory = async (req, res, next) => {
  try {
    const { studentId } = req.query;
    const { teacherId } = req.query;

    let assignmentHistory;

    if (studentId && teacherId) {
      assignmentHistory = await Assignment.find({
        studentId: studentId,
        teacherId: teacherId,
      });
    } else if (studentId && !teacherId) {
      assignmentHistory = await Assignment.find({ studentId: studentId });
    } else {
      assignmentHistory = await Assignment.find({ teacherId: teacherId });
    }

    if (!assignmentHistory) {
      return res.status(200).json({
        assignmentHistory: "No assignment history has been found.",
      });
    }

    res.status(200).json({
      assignmentHistory,
    });
  } catch (err) {
    next(err);
  }
};

export const get_singleAssignmentHistory = async (req, res, next) => {
  try {
    const { assignmentId } = req.params;

    const assignment = await Assignment.findById(assignmentId);

    if (!assignment) {
      const error = new Error("No assignment found.");
      error.statusCode = 422;
      throw error;
    }

    res.status(200).json({
      assignment,
    });
  } catch (err) {
    next(err);
  }
};

export const post_doAssignment = async (req, res, next) => {
  try {
    const { studentId } = req.body;

    const { assignmentId } = req.body;

    let { assignmentTitle } = req.body;
    let { assignmentAnswer } = req.body;

    if (!assignmentTitle || !assignmentAnswer) {
      const error = new Error("Title and answer are required.");
      error.statusCode = 422;
      throw error;
    }

    assignmentTitle = assignmentTitle.replace(/\"/g, "'");
    assignmentAnswer = assignmentAnswer.replace(/\"/g, "'");

    const [assignment] = await Assignment.find({
      _id: assignmentId,
      studentId: studentId,
    })
      .populate("teacherId")
      .exec();

    if (!assignment) {
      const error = new Error("No assignment found.");
      error.statusCode = 422;
      throw error;
    }

    assignment.studentInfo = {
      title: assignmentTitle,
      answer: assignmentAnswer,
      answeredDate: new Date(), // todo check if Date.now() is needed or not
    };
    assignment.assignmentInfo.isDone = true;
    assignment.assignmentInfo.deadline > Date.now()
      ? (assignment.assignmentInfo.doneOnTime = true)
      : (assignment.assignmentInfo.doneOnTime = false);

    await assignment.save();

    const student = await User.findById(studentId);

    const teacher = await User.findById(assignment.teacherId);

    winston.userActivityLog(
      "Doing assignment",
      {
        from: {
          email: teacher.personalInfo.emailInfo.email,
          id: teacher._id,
        },
        to: {
          email: student.personalInfo.emailInfo.email,
          id: student._id,
        },
      },
      `Student has completed assignment. (Assignment Title: ${assignment.assignmentInfo.title} Assignment ID: ${assignment._id})`
    );

    res.status(201).json({
      message: `You have successfully sent your response.`,
    });

    sendMail(
      assignment.teacherId.personalInfo.emailInfo.email,
      customEmails.student.doAssignment.title,
      customEmails.student.doAssignment.text(student)
    );
  } catch (err) {
    next(err);
  }
};
