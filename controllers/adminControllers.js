import {
  emailValidation,
} from "../util/validation/validation.js";

import {
  preventDataLossDueToEmptyFieldsForNumericValues as preventDataLoss,
  updateOriginalUserWithUpdatedUser as editUserInfo,
} from "../util/validation/editUserValidation.js";

import User from "../models/user.js";
import TeacherStudent from "../models/teacherStudent.js";
import ErasedUser from "../models/erasedUser.js";
import StudentsFromEmailMe from "../models/studentsFromEmailMe.js"

import winston from "../util/winston/winston.js";
import { sendMail, emailMe } from "../util/nodeMailer/nodeMailerConfig.js";
import customEmails from "../util/nodeMailer/customEmails.js";

import mongoose from "mongoose";
import jwt from "jsonwebtoken";

export const get_fetchAllUsers = async (req, res, next) => {
  try {
    const { filter: filterForRequestedUsers } = req.params;

    let users = await User.find(); // Array

    if (filterForRequestedUsers === "all") {
      res.status(200).json({
        users,
      });
    } else if (filterForRequestedUsers === "students") {
      let students;
      students = users.filter((user) => {
        if (user.engPotInfo.status === "student") {
          return user;
        }
      });

      res.status(200).json({
        users: students,
      });
    }
  } catch (err) {
    next(err);
  }
};

export const get_fetchUser = async (req, res, next) => {
  try {
    const userId = req.params.userId;

    const user = await User.findById(userId);

    res.status(200).json({
      user,
    });
  } catch (err) {
    next(err);
  }
};

export const post_editUserInfo = async (req, res, next) => {
  try {
    const updatedUserInfo = { ...req.body };
    const { adminId } = req.body;
    
    if (
      updatedUserInfo.personalInfo.name === "" ||
      updatedUserInfo.personalInfo.surname === ""
    ) {
      const error = new Error("Name and Surname are required.");
      error.statusCode = 422;
      throw error;
    }
    if (!emailValidation(updatedUserInfo.personalInfo.emailInfo.email)) {
      const error = new Error("Email is not valid.");
      error.statusCode = 422;
      throw error;
    }
    if (updatedUserInfo.engPotInfo.engPotDetails.engPotToken > 150) {
      const error = new Error("Maximum engPotToken is 150.");
      error.statusCode = 422;
      throw error;
    }

    const user = await User.findById(mongoose.Types.ObjectId(updatedUserInfo.userId));
    const admin = await User.findById(mongoose.Types.ObjectId(adminId));

    if (
      user.engPotInfo.status === "student" &&
      updatedUserInfo.engPotInfo.status !== "student"
    ) {
      const doesHaveTeacher = await TeacherStudent.findOne({
        studentId: updatedUserInfo.userId,
      });

      if (doesHaveTeacher) {
        const error = new Error(
          "This student has a teacher, remove teacher first."
        );
        error.statusCode = 422;
        throw error;
      }
    }

    if (
      user.engPotInfo.status === "teacher" &&
      updatedUserInfo.engPotInfo.status !== "teacher"
    ) {
      const doesHaveStudent = await TeacherStudent.findOne({
        teacherId: updatedUserInfo.userId,
      });

      if (doesHaveStudent) {
        const error = new Error(
          "This teacher has student(s), remove student(s) first."
        );
        error.statusCode = 422;
        throw error;
      }
    }

    preventDataLoss(updatedUserInfo, user);
    editUserInfo(updatedUserInfo, user);

    await user.save();

    winston.userActivityLog(
      "Editing personal info",
      {
        from: {
          email: admin.personalInfo.emailInfo.email,
          id: admin._id,
        },
        to: {
          email: user.personalInfo.emailInfo.email,
          id: user._id,
        },
      },
      "Personal Information has been changed."
    );

    res.status(201).json({
      message: "User information has been updated",
    });

    sendMail(
      user.personalInfo.emailInfo.email,
      customEmails.admin.editPersonalInfo.title,
      customEmails.admin.editPersonalInfo.text
    );
  } catch (err) {
    next(err);
  }
};

export const post_assignStudentToTeacher = async (req, res, next) => {
  try {
    console.log("assignStudentToTeacher");
    const { studentId } = req.body;
    const { teacherId } = req.body;

    if (studentId === "") {
      const error = new Error("Student ID is required.");
      error.statusCode = 422;
      throw error;
    }
    if (teacherId === "") {
      const error = new Error("Teacher ID is required.");
      error.statusCode = 422;
      throw error;
    }

    const doesTeacherStudentRelationExist = await TeacherStudent.findOne({
      teacherId: teacherId,
      studentId: studentId,
    });

    if (!doesTeacherStudentRelationExist) {
      const teacherStudent = new TeacherStudent({
        teacherId: teacherId,
        studentId: studentId,
      });

      const student = await User.findById(studentId);
      const teacher = await User.findById(teacherId);

      if (student.engPotInfo.hasTeacher === true) {
        const error = new Error("Student has already a teacher.");
        error.statusCode = 422;
        throw error;
      }

      student.engPotInfo.hasTeacher = true;

      await student.save();

      await teacherStudent.save();

      winston.userActivityLog(
        "Assigning a student",
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
        "Student has been assigned to teacher."
      );

      res.status(201).json({
        message: "Student has been assigned to the teacher",
      });

      sendMail(
        teacher.personalInfo.emailInfo.email,
        customEmails.admin.assignStudent.forTeacher
          .title,
        customEmails.admin.assignStudent.forTeacher.text(
          student
        )
      );

      sendMail(
        student.personalInfo.emailInfo.email,
        customEmails.admin.assignStudent.forStudent
          .title,
        customEmails.admin.assignStudent.forStudent.text(
          teacher
        )
      );
    } else {
      const error = new Error(
        "The student has already been assigned to the teacher."
      );
      error.statusCode = 422;
      throw error;
    }
  } catch (err) {
    next(err);
  }
};

export const post_removeTeacherFromStudent = async (req, res, next) => {
  try {
    const { studentId } = req.body;
    const { teacherId } = req.body;

    if (studentId === "") {
      const error = new Error("Student ID is required.");
      error.statusCode = 422;
      throw error;
    }
    if (teacherId === "") {
      const error = new Error("Teacher ID is required.");
      error.statusCode = 422;
      throw error;
    }

    await TeacherStudent.findOneAndRemove({
      teacherId: teacherId,
      studentId: studentId,
    });

    const teacher = await User.findById(teacherId);

    const student = await User.findById(studentId);

    student.engPotInfo.hasTeacher = false;

    await student.save();

    winston.userActivityLog(
      "Removing a teacher",
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
      "Teacher has been removed from student."
    );

    res.status(201).json({
      message: "Teacher has been removed from student",
    });

    sendMail(
      teacher.personalInfo.emailInfo.email,
      customEmails.admin.removeTeacher.forTeacher.title,
      customEmails.admin.removeTeacher.forTeacher.text(
        student
      )
    );

    sendMail(
      student.personalInfo.emailInfo.email,
      customEmails.admin.removeTeacher.forStudent.title,
      customEmails.admin.removeTeacher.forStudent.text(
        teacher
      )
    );
  } catch (err) {
    next(err);
  }
};

export const post_deleteUser = async (req, res, next) => {
  try {
    const { adminId } = req.body;
    const { userId } = req.body;

    const admin = await User.findById(adminId);

    const user = await User.findById(userId);

    const erasedUser = new ErasedUser({
      personalInfo: {
        name: user.personalInfo.name,
        surname: user.personalInfo.surname,
        emailInfo: {
          email: user.personalInfo.emailInfo.email,
        },
      },
      engPotInfo: {
        status: user.engPotInfo.status,
        engPotDetails: {
          lessonsTaken: user.engPotInfo.lessonsTaken,
          engPotToken: user.engPotInfo.engPotToken,
          lessonsEarned: user.engPotInfo.lessonsEarned,
          lessonsCancelled: user.engPotInfo.lessonsCancelled,
          lessonsPostponed: user.engPotInfo.lessonsPostponed,
          lessonsGhosted: user.engPotInfo.lessonsGhosted,
        },
      },
    });

    await erasedUser.save();

    await user.remove();

    winston.userActivityLog(
      "Deleting a user",
      {
        from: {
          email: admin.personalInfo.emailInfo.email,
          id: admin._id,
        },
        to: {
          email: user.personalInfo.emailInfo.email,
          id: user._id,
        },
      },
      "User has been deleted."
    );

    res.status(201).json({
      message: "User has been deleted",
    });

    // todo test this
    sendMail(
      customEmails.admin.deleteUser.title,
      customEmails.admin.deleteUser.text
    );
  } catch (err) {
    next(err);
  }
};

export const get_findTeacherByStudentId = async (req, res, next) => {
  try {
    const { studentId } = req.params;

    const teacherStudent = await TeacherStudent.findOne({
      studentId: studentId,
    })
      .populate("teacherId")
      .exec();

    if (!teacherStudent) {
      return res.status(200).json({
        teacher: "No assigned teacher.",
      });
    } else {
      res.status(200).json({
        teacher: teacherStudent.teacherId, // todo test this
      });
    }
  } catch (err) {
    next(err);
  }
};

export const post_emailMe = async (res,req,next) => {
    try {

        const {givenEmail} = req.body;

        
        if (!emailValidation(givenEmail)) {
            const error = new Error("Please enter a valid email.");
            error.statusCode = 422;
            throw error;
        }

        const doesEmailAlreadyExist = await StudentsFromEmailMe.findOne({email: givenEmail});

        if (doesEmailAlreadyExist) {
            const error = new Error("Your email has already been put in our contact list, our admin will contact you soon.");
            error.statusCode = 422;
            throw error;
        }

        const studentsFromEmailMe = new StudentsFromEmailMe({email: givenEmail});

        await studentsFromEmailMe.save();

        res.status(200).json({
            message: "Our admin will contact you as soon as possible.",
        });

        // * Mail the admin(s)
        emailMe(givenEmail);
        
    } catch (err) {
        
        next(err);

    }
};
