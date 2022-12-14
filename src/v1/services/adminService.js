import mongoose from "mongoose";
import User from "../../models/userModel.js";
import TeacherStudent from "../../models/teacherStudentModel.js";
import DeletedUser from "../../models/deletedUserModel.js";

import checkIf from "../../util/validation/admin/checkIf.js";
import preventDataLoss from "../../util/validation/admin/preventDataLoss.js";
import updatedUser from "../../util/validation/admin/updateUser.js";
import replaceQuotes from "../../util/validation/admin/replaceQuotes.js";
import {
  editUserInformation_mail,
  createTeacherStudent_mail_student,
  createTeacherStudent_mail_teacher,
  deleteTeacherStudent_mail_student,
  deleteTeacherStudent_mail_teacher,
  contactAdmins_mail,
} from "../../mail/custom/mails.js";

const editUserInformation = async (data) => {
  try {
    const { userId, adminId } = data;
    const { name, surname, emailInfo } = data.personalInfo;
    const { email } = emailInfo;
    const { status, studentPlan, studentLevel } = data.engPotInfo;
    const {
      lessonsTaken,
      speakingLessonsTaken,
      engPotToken,
      lessonsEarned,
      lessonsCancelled,
      lessonsPostponed,
      lessonsGhosted,
      engPotCredits,
    } = data.engPotInfo.engPotDetails;

    checkIf.nameSurnamePresent(name, surname);

    checkIf.validEmail(email);

    checkIf.engPotTokenLimitRespected(engPotToken);

    const user = await User.findById(mongoose.Types.ObjectId(userId));

    const isRevertedStudent = checkIf.revertedStudent(user, status);
    if (isRevertedStudent) {
      const doesHaveTeacher = await TeacherStudent.findOne({
        studentId: userId,
      });

      if (doesHaveTeacher) {
        const error = new Error(
          "This student has a teacher, remove teacher first."
        );
        error.statusCode = 422;
        throw error;
      }
    }

    const isRevertedTeacher = checkIf.revertedTeacher(user, status);
    if (isRevertedTeacher) {
      const doesHaveStudent = await TeacherStudent.findOne({
        teacherId: userId,
      });

      if (doesHaveStudent) {
        const error = new Error(
          "This teacher has student(s), remove student(s) first."
        );
        error.statusCode = 422;
        throw error;
      }
    }

    preventDataLoss(data, user);
    updatedUser(data, user);

    await user.save();

    editUserInformation_mail({ user });

    // Handle Logging

    return { message: "User information has been updated" };
  } catch (error) {
    throw error;
  }
};

const deleteUser = async (userId) => {
  try {
    const user = await User.findById(userId);

    checkIf.userExist(user);

    checkIf.isRegularUserAccount(user);

    const userInformation = {
      personalInfo: user.personalInfo,
      engPotInfo: user.engPotInfo,
      deletedUserId: user._id,
    };

    const deletedUser = new DeletedUser(userInformation);

    await deletedUser.save();

    await user.remove();

    return { message: "User deleted successfully." };
  } catch (error) {
    throw error;
  }
};

const createTeacherStudent = async (studentId, teacherId) => {
  try {
    checkIf.IDsPresent(studentId, teacherId);

    checkIf.teacherStudentRelationExist(TeacherStudent, studentId, teacherId);

    const student = await User.findById(studentId);
    const teacher = await User.findById(teacherId);

    checkIf.studentHasTeacher(student);

    const teacherStudent = new TeacherStudent({
      teacherId,
      studentId,
    });

    await teacherStudent.save();

    student.engPotInfo.hasTeacher = true;

    await student.save();

    // Handle Logging
    createTeacherStudent_mail_student({ student, teacher });
    createTeacherStudent_mail_teacher({ teacher, student });

    return { message: "Student has been assigned to the teacher" };
  } catch (error) {
    throw error;
  }
};

const deleteTeacherStudent = async (studentId, teacherId) => {
  try {
    checkIf.IDsPresent(studentId, teacherId);

    await TeacherStudent.findOneAndRemove({
      teacherId: teacherId,
      studentId: studentId,
    });

    const student = await User.findById(studentId);
    const teacher = await User.findById(teacherId);

    student.engPotInfo.hasTeacher = false;

    await student.save();

    // Handle Logging
    deleteTeacherStudent_mail_student({ student, teacher });
    deleteTeacherStudent_mail_teacher({ teacher, student });

    return { message: "Teacher has been removed from student" };
  } catch (error) {
    throw error;
  }
};

const findTeacherByStudentId = async (studentId) => {
  try {
    checkIf.IDsPresent(studentId, "Dummy ID");

    const teacherStudent = await TeacherStudent.findOne({
      studentId,
    })
      .populate("teacherId")
      .exec();

    if (!teacherStudent) {
      return { message: "No assigned teacher." };
    } else {
      return {
        message: "Teacher has been found.",
        teacher: teacherStudent.teacherId,
      };
    }
  } catch (error) {
    throw error;
  }
};

const contactAdmins = async (name, email, body) => {
  try {
    checkIf.validEmail(email);

    checkIf.contactInfoPresent(name, body);

    name = replaceQuotes(name);
    body = replaceQuotes(body);

    contactAdmins_mail({ name, email, body });

    return {
      message:
        "Your request has been received. Our admins will contact you soon.",
    };
  } catch (error) {
    throw error;
  }
};

const services = {
  editUserInformation,
  deleteUser,
  createTeacherStudent,
  deleteTeacherStudent,
  findTeacherByStudentId,
  contactAdmins,
};

export default services;
