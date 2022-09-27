export const emailValidation = (email) => {
  const rePatternWithOneAt = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return rePatternWithOneAt.test(email);
};

export const passwordMatchValidator = (password, confirmPassword) => {
  if (password === confirmPassword) {
    return true;
  } else {
    return false;
  }
};

export const passwordLengthValidator = (password) => {
  if (password.length < 6) {
    return false;
  } else {
    return true;
  }
};
