import userService from "../services/userService.js";

const fetchUsers = async (req, res, next) => {
  try {
    const users = await userService.fetchUsers();

    res.status(200).json({ status: "OK", users: users });
  } catch (error) {
    next(error);
  }
};

const fetchUserById = async (req, res, next) => {
  try {
    const { userId } = req.params;

    const user = await userService.fetchUserById(userId);

    res.status(201).json({ status: "OK", ...user });
  } catch (error) {
    next(error);
  }
};

const createUser = async (req, res, next) => {
  try {
    const { name, surname, email, password, passwordConfirm } = req.body;

    const newUserInformation = {
      name,
      surname,
      email,
      password,
      passwordConfirm,
    };

    const createdUser = await userService.createUser(newUserInformation);

    res.status(201).json({ status: "OK", ...createdUser });
  } catch (error) {
    next(error);
  }
};

const verifyUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const verifiedUser = await userService.verifyUser(email, password);

    res.status(201).json({ status: "OK", ...verifiedUser });
  } catch (error) {
    next(error);
  }
};

const sendConfirmationCode = async (req, res, next) => {
  try {
    const { email } = req.body;

    const isSent = await userService.sendConfirmationCode(email);

    res.status(201).json({ status: "OK", ...isSent });
  } catch (error) {
    next(error);
  }
};

const confirmUserAccount = async (req, res, next) => {
  try {
    const { emailConfirmationCode } = req.params;

    const isConfirmed = userService.confirmUserAccount(emailConfirmationCode);

    res.status(201).json({ status: "OK", data: isConfirmed });
  } catch (error) {
    throw error;
  }
};

const requestNewPassword = async (req, res, next) => {
  try {
    const { email } = req.body;

    const isSent = await userService.requestNewPassword(email);

    res.status(201).json({ status: "OK", ...isSent });
  } catch (error) {
    throw error;
  }
};

const resetPassword = async (req, res, next) => {
  try {
    const { newPassword, newPasswordConfirm, resetToken } = req.body;

    const isReset = await userService.resetPassword(
      newPassword,
      newPasswordConfirm,
      resetToken
    );

    res.status(201).json({ status: "OK", ...isReset });
  } catch (error) {
    next(error);
  }
};

const changePersonalInformation = async (req, res, next) => {
  try {
    const { userId, newName, newSurname } = req.body;

    const isChanged = await userService.changePersonalInformation(
      userId,
      newName,
      newSurname
    );
    res.status(201).json({ status: "OK", ...isChanged });
  } catch (error) {
    next(error);
  }
};

const controllers = {
  fetchUsers,
  fetchUserById,
  createUser,
  verifyUser,
  sendConfirmationCode,
  confirmUserAccount,
  requestNewPassword,
  resetPassword,
  changePersonalInformation,
};

export default controllers;
