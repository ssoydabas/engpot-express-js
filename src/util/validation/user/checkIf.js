const validInformation = (newUserInformation) => {
  const { name, surname, email, password, passwordConfirm } =
    newUserInformation;

  if (!name || !surname) {
    const error = new Error("Name and Surname are required.");
    error.statusCode = 422;
    throw error;
  }
  const rePatternWithOneAt = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!rePatternWithOneAt.test(email)) {
    const error = new Error("Please enter a valid email.");
    error.statusCode = 422;
    throw error;
  }
  if (password.length < 6) {
    const error = new Error("Password should be at least 6 characters.");
    error.statusCode = 422;
    throw error;
  }
  if (password !== passwordConfirm) {
    const error = new Error("Passwords do not match.");
    error.statusCode = 422;
    throw error;
  }
};

const validEmail = (email) => {
  const rePatternWithOneAt = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email || !rePatternWithOneAt.test(email)) {
    const error = new Error("Please enter a valid email.");
    error.statusCode = 422;
    throw error;
  }
};

const validPassword = (password) => {
  if (password.length < 6) {
    const error = new Error("Password should be at least 6 characters.");
    error.statusCode = 422;
    throw error;
  }
};

const passwordsMatch = (password, passwordConfirm) => {
  if (password !== passwordConfirm) {
    const error = new Error("Passwords do not match.");
    error.statusCode = 422;
    throw error;
  }
};

const userExist = (user) => {
  if (user) {
    const error = new Error("Email already exists.");
    error.statusCode = 422;
    throw error;
  }
};

const userPresent = (user) => {
  if (!user) {
    const error = new Error("User has not been found, please sign up first!");
    error.statusCode = 422;
    throw error;
  }
};

const fetchUserSucceeded = (user) => {
  if (!user) {
    const error = new Error("No such user with the given Id.");
    error.statusCode = 422;
    throw error;
  }
};

const verificationInfoPresent = (email, password) => {
  if (!email || !password) {
    const error = new Error("Email and password are required.");
    error.statusCode = 422;
    throw error;
  }
};

const userFound = (user) => {
  if (!user) {
    const error = new Error("Email or password is invalid.");
    error.statusCode = 422;
    throw error;
  }
};

const userConfirmed = (user) => {
  if (!user.personalInfo.emailInfo.confirmed) {
    const error = new Error("Please confirm your account in your mailbox.");
    error.statusCode = 422;
    throw error;
  }
};

const passwordAccepted = (comparisonSuccessful) => {
  if (!comparisonSuccessful) {
    const error = new Error("Email or password is invalid.");
    error.statusCode = 422;
    throw error;
  }
};

const emailConfirmationCodeValid = (user) => {
  if (!user) {
    const error = new Error("Confirmation Code is invalid. Please contact us.");
    error.statusCode = 422;
    throw error;
  }
};

const resetTokenExpired = (user) => {
  if (
    user.personalInfo.passwordInfo.resetPasswordInfo.resetPasswordExpiration.getTime() <
    Date.now()
  ) {
    const error = new Error(
      "Token has expired, please try to request new token."
    );
    error.statusCode = 422;
    throw error;
  }
};

const nameSurnamePresent = (newName, newSurname) => {
  if (!newName || !newSurname) {
    const error = new Error("Both name and surname are required.");
    error.statusCode = 422;
    throw error;
  }
};

const checkIf = {
  validInformation,
  validEmail,
  validPassword,
  passwordsMatch,
  userExist,
  userPresent,
  fetchUserSucceeded,
  verificationInfoPresent,
  userFound,
  userConfirmed,
  passwordAccepted,
  emailConfirmationCodeValid,
  resetTokenExpired,
  nameSurnamePresent,
};

export default checkIf;
