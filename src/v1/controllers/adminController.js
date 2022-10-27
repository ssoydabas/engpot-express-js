import adminService from "../services/adminService.js";

const editUserInformation = async (req, res, next) => {
  try {
    const isUpdateSuccessful = await adminService.editUserInformation(req.body);

    res.send({ status: "OK", ...isUpdateSuccessful });
  } catch (error) {
    next(error);
  }
};

const createTeacherStudent = async (req, res, next) => {
  try {
    const { studentId, teacherId } = req.body;

    const isCreated = await adminService.createTeacherStudent(
      studentId,
      teacherId
    );

    res.send({ status: "OK", ...isCreated });
  } catch (error) {
    next(error);
  }
};

const deleteTeacherStudent = async (req, res, next) => {
  try {
    const { studentId, teacherId } = req.body;

    const isDeleted = await adminService.deleteTeacherStudent(studentId, teacherId);

    res.send({ status: "OK", ...isDeleted });
  } catch (error) {
    next(error);
  }
};

const findTeacherByStudentId = async (req, res, next) => {
  try {
    const { studentId } = req.params;

    const foundTeacher = await adminService.findTeacherByStudentId(studentId);

    res.send({ status: "OK", ...foundTeacher });
  } catch (error) {
    next(error);
  }
};

const contactAdmins = async (req, res, next) => {
  // ! Will be done
};

const controllers = {
  editUserInformation,
  createTeacherStudent,
  deleteTeacherStudent,
  findTeacherByStudentId,
  contactAdmins,
};

export default controllers;
