import User from "../../models/userModel.js";
import bcrypt from "bcrypt";
import crypto from "crypto";
import jwt from "jsonwebtoken";

import checkIf from "../../util/validation/user/checkIf.js";

const fetchUsers = async () => {
  try {
    const users = await User.find();

    return users;
  } catch (error) {
    throw error;
  }
};

const fetchUserById = async (userId) => {
  try {
    const user = await User.findById(userId);

    checkIf.fetchUserSucceeded(user);

    return { user };
  } catch (error) {
    throw error;
  }
};

const createUser = async (newUserInformation) => {
  try {
    const { name, surname, email, password } = newUserInformation;

    checkIf.validInformation(newUserInformation);

    const user = await User.findOne({
      "personalInfo.emailInfo.email": email,
    });

    await checkIf.userExist(user);

    const hashedPassword = await bcrypt.hash(password, 12);
    const emailConfirmationCode = crypto.randomBytes(32).toString("hex");

    const newUser = new User({
      personalInfo: {
        name,
        surname,
        emailInfo: {
          email,
          emailConfirmationCode,
        },
        passwordInfo: {
          password: hashedPassword,
        },
      },
    });

    await newUser.save();

    // Handle Logging

    // Handle Mailing

    return {
      message:
        "User has been created successfully. Please confirm your account in your mailbox.",
      newUser,
    };
  } catch (error) {
    throw error;
  }
};

const verifyUser = async (email, password) => {
  try {
    checkIf.verificationInfoPresent(email, password);

    const user = await User.findOne({
      "personalInfo.emailInfo.email": email,
    });

    checkIf.userFound(user);
    checkIf.userConfirmed(user);

    const comparedPasswords = await bcrypt.compare(
      password,
      user.personalInfo.passwordInfo.password
    );
    checkIf.passwordAccepted(comparedPasswords);

    const jwtData = {
      data: {
        id: user._id,
        email: user.personalInfo.emailInfo.email,
        userStatus: user.engPotInfo.status,
      },
      options: { algorithm: "HS256", expiresIn: "8760hr" },
    };
    const authenticationToken = jwt.sign(
      jwtData.data,
      process.env.JWT_SECRET,
      jwtData.options
    );

    return { message: "User found.", user, authenticationToken };
  } catch (error) {
    throw error;
  }
};

const sendConfirmationCode = async (email) => {
  try {
    checkIf.validEmail(email);

    const user = await User.findOne({ "personalInfo.emailInfo.email": email });

    checkIf.userPresent(user);

    if (user.personalInfo.emailInfo.confirmed === false) {
      // sendMail(
      //   user.personalInfo.emailInfo.email,
      //   customEmails.auth.signUp.title,
      //   customEmails.auth.signUp.text(
      //     user,
      //     process.env.WEB_APP_URL,
      //     user.personalInfo.emailInfo.emailConfirmationCode
      //   ),
      //   true
      // );

      return {
        message: "Your confirmation email has been sent to your email.",
      };
    } else if (user.personalInfo.emailInfo.confirmed === true) {
      return { message: "Your email has already been confirmed." };
    }
  } catch (error) {
    throw error;
  }
};

const confirmUserAccount = async (emailConfirmationCode) => {
  try {
    const user = await User.findOne({
      "personalInfo.emailInfo.emailConfirmationCode": emailConfirmationCode,
    });

    checkIf.emailConfirmationCodeValid(user);

    user.personalInfo.emailInfo.confirmed = true;
    await user.save();

    return { message: "You can sign in now." };
  } catch (error) {
    throw error;
  }
};

const requestNewPassword = async (email) => {
  try {
    checkIf.validEmail(email);

    const user = await User.findOne({ "personalInfo.emailInfo.email": email });

    let generatedResetToken = crypto.randomBytes(32);
    generatedResetToken = generatedResetToken.toString("hex");

    user.personalInfo.passwordInfo.resetPasswordInfo.resetPasswordToken =
      generatedResetToken;
    user.personalInfo.passwordInfo.resetPasswordInfo.resetPasswordExpiration =
      Date.now() + 3600000;

    await user.save();

    // sendMail(
    //   email,
    //   customEmails.auth.forgotPassword.title,
    //   customEmails.auth.forgotPassword.text(
    //     process.env.WEB_APP_URL,
    //     generatedResetToken
    //   )
    // );

    // Handle Logging

    return { message: "Your token has been sent to your email." };
  } catch (error) {
    throw error;
  }
};

const resetPassword = async (newPassword, newPasswordConfirm, resetToken) => {
  try {
    const user = await User.findOne({
      "personalInfo.passwordInfo.resetPasswordInfo.resetPasswordToken":
        resetToken,
    });

    checkIf.userPresent(user);

    checkIf.resetTokenExpired(user);

    checkIf.validPassword(newPassword);

    checkIf.passwordsMatch(newPassword, newPasswordConfirm);

    const hashedPassword = await bcrypt.hash(newPassword, 12);

    user.personalInfo.passwordInfo.resetPasswordInfo.resetPasswordToken = null;
    user.personalInfo.passwordInfo.resetPasswordInfo.resetPasswordExpiration =
      null;
    user.personalInfo.passwordInfo.password = hashedPassword;

    await user.save();

    return { message: "You have successfully changed your  password." };
  } catch (error) {
    throw error;
  }
};

const changePersonalInformation = async (userId, newName, newSurname) => {
  try {
    checkIf.nameSurnamePresent(newName, newSurname);

    const user = await User.findById(userId);

    checkIf.userPresent(user);

    user.personalInfo.name = newName;
    user.personalInfo.surname = newSurname;

    await user.save();

    return { message: "You have successfully changed you name.", user };
  } catch (error) {
    throw error;
  }
};

const services = {
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

export default services;
