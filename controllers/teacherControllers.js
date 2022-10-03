import {
  updateStudentNextLesson,
  divideDateStringIntoUnitsObject,
} from "../util/teacherControllersHelpers.js";

import User from "../models/user.js";
import TeacherStudent from "../models/teacherStudent.js";
import LessonHistory from "../models/studentModels/lessonHistory.js";
import Assignment from "../models/studentModels/assignment.js";

import PublicSchedule from "../models/scheduleModels/publicScheduleModel/publicSchedule.js";

import winston from "../util/winston/winston.js";
import { sendMail } from "../util/nodeMailer/nodeMailerConfig.js";
import customEmails from "../util/nodeMailer/customEmails.js";

const engPotCreditsPerMonth = 40;
const engPotCreditsPerLesson = 10;

export const get_studentsByTeacherId = async (req, res, next) => {
  try {
    const { teacherId } = req.params;

    const foundStudents = await TeacherStudent.find({ teacherId: teacherId })
      .populate("studentId")
      .exec();

    const students = [];
    foundStudents.forEach((student) => {
      students.push(student.studentId); // * StudentId is populated so it is student info
    });

    res.status(200).json({
      students,
    });
  } catch (err) {
    next(err);
  }
};

export const post_planLesson = async (req, res, next) => {
  try {
    const data = req.body;

    const { studentId } = data;

    const { teacherId } = data;

    const social = data.social.replace(/\"/g, "'");

    const tense = data.tense.replace(/\"/g, "'");
    const structure = data.structure.replace(/\"/g, "'");

    const extra = data.extra.replace(/\"/g, "'");

    const { date } = data;
    const { time } = data;
    const { timestamp } = data;

    if (!social && !tense && !structure && !extra) {
      const error = new Error("At least one field is required.");
      error.statusCode = 422;
      throw error;
    }
    if (!date || !time || !timestamp) {
      const error = new Error("Lesson date and time are required.");
      error.statusCode = 422;
      throw error;
    }

    const student = await User.findById(studentId);

    const teacher = await User.findById(teacherId);

    if (student.engPotInfo.nextLesson) {
      if (student.engPotInfo.nextLesson.hasPlannedLesson === true) {
        const error = new Error(
          "This student has already had a planned lesson."
        );
        error.statusCode = 422;
        throw error;
      }
    }

    if (
      student.engPotInfo.engPotDetails.engPotCredits < engPotCreditsPerLesson
    ) {
      const error = new Error(
        "The student's EngPot Credits is not enough to plan a lesson."
      );
      error.statusCode = 422;
      throw error;
    }

    let publicSchedule = await PublicSchedule.findOne({ userId: teacher._id });
    if (!publicSchedule) {
      publicSchedule = new PublicSchedule({
        userId: teacher._id,
      });
    }

    const checkEvent_before = new Date(timestamp).getTime() - 3600000;
    const checkEvent_after = new Date(timestamp).getTime() + 3600000; // Time the lesson ends

    if (publicSchedule.events.length > 0) {
      for (let e of publicSchedule.events) {
        const timestamp = new Date(e.start).getTime();
        if (timestamp > checkEvent_before && timestamp < checkEvent_after) {
          const error = new Error(
            "Requested time is already occupied in your schedule."
          );
          error.statusCode = 422;
          throw error;
        }
      }
    }
    const newEvent = {
      id: timestamp,
      start: timestamp,
      end: new Date(checkEvent_after),
      title: `${student.personalInfo.name} ${student.personalInfo.surname}`,
    };
    publicSchedule.events.push(newEvent);

    updateStudentNextLesson(
      student,
      timestamp,
      social,
      tense,
      structure,
      extra
    );

    await student.save();
    await publicSchedule.save();

    winston.userActivityLog(
      "Planning a lesson",
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
      "Teacher has planned a lesson for student."
    );

    res.status(201).json({
      message: `Lesson has been planned.`,
      student,
    });

    const plannedLessonDateObject = divideDateStringIntoUnitsObject(
      student.engPotInfo.nextLesson.date
    );

    sendMail(
      student.personalInfo.emailInfo.email,
      customEmails.teacher.planLesson.title,
      customEmails.teacher.planLesson.text(
        teacher,
        plannedLessonDateObject,
        student
      )
    );
  } catch (err) {
    next(err);
  }
};

export const post_concludeLesson = async (req, res, next) => {
  try {
    const data = req.body;

    const { studentId } = data;
    const { teacherId } = data;

    const social = data.social.replace(/\"/g, "'");

    const tense = data.tense.replace(/\"/g, "'");
    const structure = data.structure.replace(/\"/g, "'");

    const extra = data.extra.replace(/\"/g, "'");
    const { status } = data;

    const { date } = data;
    const { time } = data;
    const { timestamp } = data;

    if (!social && !tense && !structure && !extra) {
      const error = new Error("At least one field is required.");
      error.statusCode = 422;
      throw error;
    }
    if (!date || !time || !timestamp) {
      const error = new Error("Lesson date and time are required.");
      error.statusCode = 422;
      throw error;
    }

    const student = await User.findById(studentId);

    const teacher = await User.findById(teacherId);

    if (student.engPotInfo.nextLesson) {
      if (student.engPotInfo.nextLesson.hasPlannedLesson === false) {
        const error = new Error(
          "This student has not got any planned lesson to conclude."
        );
        error.statusCode = 422;
        throw error;
      }
    }

    const lessonHistory = new LessonHistory({
      studentId: studentId,
      teacherId: teacherId,
      date: new Date(timestamp),
      subjects: {
        social: social,
        tense: tense,
        structure: structure,
        extra: extra,
      },
      status: status,
    });

    student.engPotInfo.nextLesson.hasPlannedLesson = false;
    student.engPotInfo.nextLesson.date = null;
    student.engPotInfo.nextLesson.subjects = null;

    if (status === "done") {
      student.engPotInfo.engPotDetails.engPotCredits -= engPotCreditsPerLesson;

      student.engPotInfo.engPotDetails.lessonsTaken++;

      sendMail(
        student.personalInfo.emailInfo.email,
        customEmails.teacher.concludeLesson.done.title,
        customEmails.teacher.concludeLesson.done.text(teacher)
      );
    }

    if (status === "cancelled") {
      student.engPotInfo.engPotDetails.lessonsCancelled++;

      sendMail(
        student.personalInfo.emailInfo.email,
        customEmails.teacher.concludeLesson.cancelled.title,
        customEmails.teacher.concludeLesson.cancelled.text
      );
    }

    if (status === "postponed") {
      student.engPotInfo.engPotDetails.lessonsPostponed++;

      sendMail(
        student.personalInfo.emailInfo.email,
        customEmails.teacher.concludeLesson.postponed.title,
        customEmails.teacher.concludeLesson.postponed.text
      );
    }

    if (status === "ghosted") {
      student.engPotInfo.engPotDetails.lessonsGhosted++;

      sendMail(
        student.personalInfo.emailInfo.email,
        customEmails.teacher.concludeLesson.ghosted.title,
        customEmails.teacher.concludeLesson.ghosted.text(teacher)
      );
    }

    student.engPotInfo.speakingLesson.doesHaveSpeakingLesson = true;

    await student.save();

    await lessonHistory.save();

    winston.userActivityLog(
      "Concluding a lesson for student",
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
      "Teacher has concluded a lesson for student."
    );

    res.status(201).json({
      message: `Lesson has been concluded.`,
      student,
    });
  } catch (err) {
    next(err);
  }
};

export const post_planSpeakingLesson = async (req, res, next) => {
  try {
    const { teacherId } = req.body;
    const { studentId } = req.body;

    const { date } = req.body;
    const { time } = req.body;
    const { timestamp } = req.body;
    const { speakingSubjects } = req.body;

    if (!date || !time || !timestamp || !speakingSubjects) {
      const error = new Error("All fields are required.");
      error.statusCode = 422;
      throw error;
    }

    const student = await User.findById(studentId);

    student.engPotInfo.speakingLesson.doesHavePlannedSpeakingLesson = true;
    student.engPotInfo.speakingLesson.speakingSubjects = speakingSubjects;
    student.engPotInfo.speakingLesson.date = new Date(Date.UTC(timestamp));

    await student.save();

    const teacher = await User.findById(teacherId);

    winston.userActivityLog(
      "Planning a speaking lesson for student",
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
      "Teacher has planned a speaking lesson for student."
    );

    res.status(201).json({
      message: `Speaking Lesson has been planned.`,
    });

    const plannedSpeakingLessonDateObject = divideDateStringIntoUnitsObject(
      student.engPotInfo.speakingLesson.date
    );

    sendMail(
      student.personalInfo.emailInfo.email,
      customEmails.teacher.planLesson.title,
      customEmails.teacher.planLesson.text(
        teacher,
        plannedSpeakingLessonDateObject,
        student
      )
    );
  } catch (err) {
    next(err);
  }
};

export const post_concludeSpeakingLesson = async (req, res, next) => {
  try {
    const { teacherId } = req.body;
    const { studentId } = req.body;

    const { status } = req.body;

    const { date } = req.body;
    const { time } = req.body;
    const { timestamp } = req.body;
    const { speakingSubjects } = req.body;

    if (!date || !time || !timestamp || !speakingSubjects) {
      const error = new Error("All fields are required.");
      error.statusCode = 422;
      throw error;
    }

    const speakingLessonHistory = new SpeakingLesson({
      studentId: studentId,
      teacherId: teacherId,
      date: new Date(timestamp),
      subjects: speakingSubjects,
      status: status,
    });

    await speakingLessonHistory.save();

    const student = await User.findById(studentId);

    student.engPotInfo.speakingLesson.doesHaveSpeakingLesson = false;
    student.engPotInfo.speakingLesson.doesHavePlannedSpeakingLesson = false;

    const teacher = await User.findById(teacherId);

    winston.userActivityLog(
      "Concluding a speaking lesson for student",
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
      "Teacher has concluded a speaking lesson for student."
    );

    res.status(201).json({
      message: `Speaking lesson has been concluded.`,
    });

    if (status === "done") {
      student.engPotInfo.engPotDetails.speakingLessonsTaken++;

      sendMail(
        student.personalInfo.emailInfo.email,
        customEmails.teacher.concludeSpeakingLesson.done.title,
        customEmails.teacher.concludeSpeakingLesson.done.text(teacher)
      );
    } else if (status === "cancelled") {
      sendMail(
        student.personalInfo.emailInfo.email,
        customEmails.teacher.concludeSpeakingLesson.cancelled.title,
        customEmails.teacher.concludeSpeakingLesson.cancelled.text
      );
    }

    await student.save();
  } catch (err) {
    next(err);
  }
};

export const post_addAssignment = async (req, res, next) => {
  try {
    const data = req.body;

    const { teacherId } = data;
    const { studentId } = data;

    const assignmentTitle = data.assignmentTitle.replace(/\"/g, "'");
    const assignmentInstructions = data.assignmentInstructions.replace(
      /\"/g,
      "'"
    );
    const { assignmentDeadline } = data;
    const { timestamp } = data;

    if (!assignmentTitle || !assignmentInstructions) {
      const error = new Error("Assignment information is required.");
      error.statusCode = 422;
      throw error;
    }

    if (!assignmentDeadline) {
      const error = new Error("Assignment deadline is required.");
      error.statusCode = 422;
      throw error;
    }

    const newAssignment = new Assignment({
      studentId: studentId,
      teacherId: teacherId,
      assignmentInfo: {
        title: assignmentTitle,
        instructions: assignmentInstructions,
        deadline: new Date(timestamp),
      },
    });

    await newAssignment.save();

    const student = await User.findById(studentId);

    const teacher = await User.findById(teacherId);

    winston.userActivityLog(
      "Adding an assignment",
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
      `Teacher has added an assignment for student. (Assignment Title: ${newAssignment.assignmentInfo.title} Assignment ID: ${newAssignment._id})`
    );

    res.status(201).json({
      message: "Assignment has been added to the student.",
      student,
    });

    sendMail(
      student.personalInfo.emailInfo.email,
      customEmails.teacher.addAssignment.title,
      customEmails.teacher.addAssignment.text(teacher)
    );
  } catch (err) {
    next(err);
  }
};

export const post_markAssignment = async (req, res, next) => {
  try {
    const { assignmentId } = req.body;

    const { givenMark } = req.body;
    const teacherNote = req.body.teacherNote.replace(/\"/g, "'");

    if (!assignmentId) {
      const error = new Error(
        "Server error, we are working on the error, please try again later."
      );
      error.statusCode = 500;
      throw error;
    }

    if (!givenMark || !teacherNote || teacherNote === "") {
      const error = new Error("Both mark and teacher note are required.");
      error.statusCode = 422;
      throw error;
    }

    const assignment = await Assignment.findById(assignmentId);

    assignment.teacherInfo.mark = givenMark;
    assignment.teacherInfo.teacherNote = teacherNote;

    await assignment.save();

    const student = await User.findById(assignment.studentId);

    const teacher = await User.findById(assignment.teacherId);

    winston.userActivityLog(
      "Marking an assignment",
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
      `Teacher has marked an assignment. (Assignment Title: ${assignment.assignmentInfo.title} Assignment ID: ${assignment._id})`
    );

    res.status(201).json({
      message: `You have successfully marked the assignment.`,
      student,
    });

    sendMail(
      student.personalInfo.emailInfo.email,
      customEmails.teacher.markAssignment.title,
      customEmails.teacher.markAssignment.text(teacher, assignment)
    );
  } catch (err) {
    next(err);
  }
};
