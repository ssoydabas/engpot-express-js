import User from "../../models/userModel.js";
import LessonHistory from "../../models/lessonHistoryModel.js";
import AssignmentHistory from "../../models/assignmentHistoryModel.js";
import TeacherStudent from "../../models/teacherStudentModel.js";

import checkIf from "../../util/validation/teacher/checkIf.js";
import replaceQuotes from "../../util/validation/teacher/replaceQuotes.js";
import updateStudentNextLesson from "../../util/validation/teacher/updateStudentNextLesson.js";
import finalizeLesson from "../../util/validation/teacher/finalizeLesson.js";

const engPotCreditsPerLesson = 10;

const studentsByTeacherId = async (teacherId) => {
  try {
    checkIf.studentIdPresent(teacherId);

    const foundStudents = await TeacherStudent.find({ teacherId })
      .populate("studentId")
      .exec();

    const students = [];
    foundStudents.forEach((student) => {
      students.push(student.studentId); // * StudentId is populated so it is student info
    });

    return { message: "Students have been found.", students };
  } catch (error) {
    throw error;
  }
};

const planLesson = async (data) => {
  try {
    let {
      studentId,
      teacherId,
      social,
      tense,
      structure,
      extra,
      date,
      time,
      timestamp,
    } = data;

    checkIf.atLeastOneFieldPresent(social, tense, structure, extra);

    social = replaceQuotes(social);
    tense = replaceQuotes(tense);
    structure = replaceQuotes(structure);
    extra = replaceQuotes(extra);

    checkIf.lessonDateTimePresent(date, time, timestamp);

    const student = await User.findById(studentId);

    checkIf.studentAlreadyHasPlannedLesson(student);

    checkIf.studentHasEnoughCredits(student, engPotCreditsPerLesson);

    updateStudentNextLesson(
      student,
      timestamp,
      social,
      tense,
      structure,
      extra
    );

    await student.save();

    // Handle Logging
    // Handle Mailing

    return { message: `Lesson has been planned.`, student };
  } catch (error) {
    throw error;
  }
};

const concludeLesson = async (data) => {
  try {
    let {
      studentId,
      teacherId,
      social,
      tense,
      structure,
      extra,
      status,
      date,
      time,
      timestamp,
    } = data;

    checkIf.atLeastOneFieldPresent(social, tense, structure, extra);

    social = replaceQuotes(social);
    tense = replaceQuotes(tense);
    structure = replaceQuotes(structure);
    extra = replaceQuotes(extra);

    checkIf.lessonDateTimePresent(date, time, timestamp);

    let student = await User.findById(studentId);

    const lessonHistory = new LessonHistory({
      studentId,
      teacherId,
      date: new Date(timestamp),
      subjects: {
        social,
        tense,
        structure,
        extra,
      },
      status,
    });

    student.engPotInfo.nextLesson.hasPlannedLesson = false;
    student.engPotInfo.nextLesson.date = null;
    student.engPotInfo.nextLesson.subjects = null;

    student = finalizeLesson(student, status);

    student.engPotInfo.speakingLesson.doesHaveSpeakingLesson = true;

    await student.save();

    await lessonHistory.save();

    // Handle Logging
    // Handle Mailing

    return { message: `Lesson has been concluded.`, student };
  } catch (error) {
    throw error;
  }
};

const assignTask = async (data) => {
  try {
    let {
      teacherId,
      studentId,
      assignmentTitle,
      assignmentInstructions,
      assignmentDeadline,
      timestamp,
    } = data;

    checkIf.assignmentInformationPresent(
      assignmentTitle,
      assignmentInstructions,
      assignmentDeadline
    );

    assignmentTitle = replaceQuotes(assignmentTitle);
    assignmentInstructions = replaceQuotes(assignmentInstructions);

    const newAssignment = new AssignmentHistory({
      studentId,
      teacherId,
      assignmentInfo: {
        title: assignmentTitle,
        instructions: assignmentInstructions,
        deadline: new Date(timestamp),
      },
    });

    await newAssignment.save();

    const student = await User.findById(studentId);

    // Handle Logging
    // Handle Mailing

    return { message: "Assignment has been added to the student.", student };
  } catch (error) {
    throw error;
  }
};

const markTask = async (data) => {
  try {
    let { assignmentId, givenMark, teacherNote } = data;

    checkIf.isMarkInformationPresent(assignmentId, givenMark, teacherNote);

    teacherNote = replaceQuotes(teacherNote);

    const assignment = await AssignmentHistory.findById(assignmentId);

    assignment.teacherInfo.mark = givenMark;
    assignment.teacherInfo.teacherNote = teacherNote;

    await assignment.save();

    const student = await User.findById(assignment.studentId);

    return { message: `You have successfully marked the assignment.`, student };
  } catch (error) {
    throw error;
  }
};

const services = {
  studentsByTeacherId,
  planLesson,
  concludeLesson,
  assignTask,
  markTask,
};

export default services;
