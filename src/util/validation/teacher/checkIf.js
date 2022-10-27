const studentIdPresent = (studentId) => {
  if (!studentId) {
    const error = new Error("Student ID is required.");
    error.statusCode = 422;
    throw error;
  }
};

const atLeastOneFieldPresent = (social, tense, structure, extra) => {
  if (!social && !tense && !structure && !extra) {
    const error = new Error("At least one field is required.");
    error.statusCode = 422;
    throw error;
  }
};

const lessonDateTimePresent = (date, time, timestamp) => {
  if (!date || !time || !timestamp) {
    const error = new Error("Lesson date and time are required.");
    error.statusCode = 422;
    throw error;
  }
};

const studentAlreadyHasPlannedLesson = (student) => {
  if (student.engPotInfo.nextLesson) {
    if (student.engPotInfo.nextLesson.hasPlannedLesson === true) {
      const error = new Error("This student has already had a planned lesson.");
      error.statusCode = 422;
      throw error;
    }
  }
};

const studentHasNoPlannedLesson = (student) => {
  if (student.engPotInfo.nextLesson) {
    if (student.engPotInfo.nextLesson.hasPlannedLesson === false) {
      const error = new Error(
        "This student has not got any planned lesson to conclude."
      );
      error.statusCode = 422;
      throw error;
    }
  }
};

const studentHasEnoughCredits = (student, engPotCreditsPerLesson) => {
  if (student.engPotInfo.engPotDetails.engPotCredits < engPotCreditsPerLesson) {
    const error = new Error(
      "The student's EngPot Credits is not enough to plan a lesson."
    );
    error.statusCode = 422;
    throw error;
  }
};

const assignmentInformationPresent = (
  assignmentTitle,
  assignmentInstructions,
  assignmentDeadline
) => {
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
};

const isMarkInformationPresent = (assignmentId, givenMark, teacherNote) => {
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
};

const checkIf = {
  studentIdPresent,
  atLeastOneFieldPresent,
  lessonDateTimePresent,
  studentAlreadyHasPlannedLesson,
  studentHasNoPlannedLesson,
  studentHasEnoughCredits,
  assignmentInformationPresent,
  isMarkInformationPresent,
};

export default checkIf;
