const userExist = (user) => {
  if (!user) {
    const error = new Error("User does not exist.");
    error.statusCode = 422;
    throw error;
  }
};

const nameSurnamePresent = (name, surname) => {
  if (name === "" || surname === "") {
    const error = new Error("Name and Surname are required.");
    error.statusCode = 422;
    throw error;
  }
};

const validEmail = (email) => {
  const rePatternWithOneAt = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!rePatternWithOneAt.test(email)) {
    const error = new Error("Please enter a valid email.");
    error.statusCode = 422;
    throw error;
  }
};

const engPotTokenLimitRespected = (engPotToken) => {
  if (engPotToken > 150) {
    const error = new Error("Maximum engPotToken is 150.");
    error.statusCode = 422;
    throw error;
  }
};

const revertedStudent = (user, status) => {
  if (user.engPotInfo.status === "student" && status !== "student") {
    return true;
  }
};

const revertedTeacher = (user, status) => {
  if (user.engPotInfo.status === "teacher" && status !== "teacher") {
    return true;
  }
};

const IDsPresent = (studentId, teacherId) => {
  if (studentId === "" || teacherId === "") {
    const error = new Error("Both Student and Teacher IDs are required.");
    error.statusCode = 422;
    throw error;
  }
};

const teacherStudentRelationExist = async (
  TeacherStudentModel,
  studentId,
  teacherId
) => {
  const teacherStudent = await TeacherStudentModel.findOne({
    teacherId,
    studentId,
  });
  if (teacherStudent) {
    const error = new Error(
      "The student has already been assigned to the teacher."
    );
    error.statusCode = 422;
    throw error;
  }
};

const studentHasTeacher = (student) => {
  if (student.engPotInfo.hasTeacher === true) {
    const error = new Error("Student has already a teacher.");
    error.statusCode = 422;
    throw error;
  }
};

const isRegularUserAccount = (user) => {
  if (
    user.engPotInfo.status === "teacher" ||
    user.engPotInfo.status === "student" ||
    user.engPotInfo.status === "admin"
  ) {
    const error = new Error(
      "Only regular users can be deleted. Change the account status first."
    );
    error.statusCode = 422;
    throw error;
  }
};

const contactInfoPresent = (name, body) => {
  if(!name || !body) {
    const error = new Error("User name and subject are required.");
    error.statusCode = 422;
    throw error;
  }
}

const checkIf = {
  userExist,
  nameSurnamePresent,
  validEmail,
  engPotTokenLimitRespected,
  revertedStudent,
  revertedTeacher,
  IDsPresent,
  teacherStudentRelationExist,
  studentHasTeacher,
  isRegularUserAccount,
  contactInfoPresent,
};

export default checkIf;
