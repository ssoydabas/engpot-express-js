const assignmentExist = (assignment) => {
  if (!assignment) {
    const error = new Error("No assignment found.");
    error.statusCode = 422;
    throw error;
  }
};

const assignmentInformationPresent = (title, answer) => {
  if (!title || !answer) {
    const error = new Error("Title and answer are required.");
    error.statusCode = 422;
    throw error;
  }
};

const checkIf = {
  assignmentExist,
  assignmentInformationPresent,
};

export default checkIf;
