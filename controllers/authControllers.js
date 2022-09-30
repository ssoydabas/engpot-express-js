import {
  emailValidation,
  passwordLengthValidator,
  passwordMatchValidator,
} from "../util/validation/validation.js";

import User from "../models/user.js";

import bcrypt from "bcrypt";
import crypto from "crypto";
import winston from "../util/winston/winston.js";
import jwt from "jsonwebtoken";
import { sendMail } from "../util/nodeMailer/nodeMailerConfig.js";
import customEmails from "../util/nodeMailer/customEmails.js";

export const post_login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      const error = new Error("Email and password are required.");
      error.statusCode = 422;
      throw error;
    }
    if (!emailValidation(email)) {
      const error = new Error("Email or password is invalid.");
      error.statusCode = 422;
      throw error;
    }

    const user = await User.findOne({ "personalInfo.emailInfo.email": email });

    if (!user) {
      const error = new Error("Email or password is invalid.");
      error.statusCode = 422;
      throw error;
    }
    if (!user.personalInfo.emailInfo.confirmed) {
      const error = new Error("Please confirm your account in your mailbox.");
      error.statusCode = 422;
      throw error;
    }

    const passwordMatch = await bcrypt.compare(
      password,
      user.personalInfo.passwordInfo.password
    );

    if (passwordMatch) {
      winston.userActivityLog(
        "Signing in",
        {
          to: {
            email: user.personalInfo.emailInfo.email,
            id: user._id,
          },
        },
        "User has signed in."
      );

      let authenticationToken;

      jwt.sign(
        { id: user._id, email: user.personalInfo.emailInfo.email, userStatus: user.engPotInfo.status },
        process.env.JWT_SECRET,
        { algorithm: "HS256", expiresIn: "8760hr" },
        (err, token) => {
          if (err) {
            console.log(err);
            next(err);
          }
          authenticationToken = token;

          res.status(200).json({
            authenticationToken,
            user,
          });
        }
      );
    } else if (!passwordMatch) {
      const error = new Error("Email or password is invalid.");
      error.statusCode = 422;
      throw error;
    }
  } catch (err) {
    next(err);
  }
};

export const post_signUp = async (req, res, next) => {
  try {
    const { name, surname, email, password, confirmPassword } = req.body;

    const user = await User.findOne({ "personalInfo.emailInfo.email": email });

    if (user) {
      const error = new Error("Email already exists.");
      error.statusCode = 422;
    }
    if (!name || !surname) {
      const error = new Error("Name and Surname are required.");
      error.statusCode = 422;
      throw error;
    }
    if (!emailValidation(email)) {
      const error = new Error("Please enter a valid email.");
      error.statusCode = 422;
      throw error;
    }
    if (!passwordMatchValidator(password, confirmPassword)) {
      const error = new Error("Passwords do not match.");
      error.statusCode = 422;
      throw error;
    }
    if (!passwordLengthValidator(password)) {
      const error = new Error("Password should be at least 6 characters.");
      error.statusCode = 422;
      throw error;
    }

    const hashedPassword = await bcrypt.hash(password, 12);
    const emailConfirmationCode = await crypto.randomBytes(32).toString("hex");

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

    winston.userActivityLog(
      "Signing up",
      {
        to: {
          email: newUser.personalInfo.emailInfo.email,
          id: newUser._id,
        },
      },
      "User has signed up."
    );

    res.status(201).json({
      message: "Please confirm your account in your email!",
    });

    sendMail(
      newUser.personalInfo.emailInfo.email,
      customEmails.auth.signUp.title,
      customEmails.auth.signUp.text(
        newUser,
        process.env.WEB_APP_URL,
        emailConfirmationCode
      ),
      true
    );
  } catch (err) {
    next(err);
  }
};

export const post_resendConfirmation = async (req, res, next) => {
  try {
    const { email } = req.body;

    if (!email) {
      const error = new Error("Email is required.");
      error.statusCode = 422;
      throw error;
    }

    const user = await User.findOne({ "personalInfo.emailInfo.email": email });

    if (!user) {
      const error = new Error("User has not been found, please sign up first!");
      error.statusCode = 422;
      throw error;
    }

    if (user.personalInfo.emailInfo.confirmed === false) {
      winston.userActivityLog(
        "Re-sending confirmation email.",
        {
          to: {
            email: user.personalInfo.emailInfo.email,
            id: user._id,
          },
        },
        "User has confirmed their account."
      );

      res.status(201).json({
        message: "Your confirmation email has been sent to your email.",
      });

      sendMail(
        user.personalInfo.emailInfo.email,
        customEmails.auth.signUp.title,
        customEmails.auth.signUp.text(
          user,
          process.env.WEB_APP_URL,
          user.personalInfo.emailInfo.emailConfirmationCode
        ),
        true
      );
    } else if (user.personalInfo.emailInfo.confirmed === true) {
      res.status(200).json({
        message: "Your email has already been confirmed.",
      });
    }
  } catch (err) {
    next(err);
  }
};

export const get_confirmAccount = async (req, res, next) => {
  try {
    const { emailConfirmationCode } = req.params;

    const user = await User.findOne({
      "personalInfo.emailInfo.emailConfirmationCode": emailConfirmationCode,
    });

    if (!user) {
      const error = new Error("User has not been found, please contact us!");
      error.statusCode = 422;
      throw error;
    } else {
      user.personalInfo.emailInfo.confirmed = true;
      await user.save();

      winston.userActivityLog(
        "Confirming sign up",
        {
          to: {
            email: user.personalInfo.emailInfo.email,
            id: user._id,
          },
        },
        "User has confirmed their account."
      );

      res.status(201).json({
        message: "You can sign in now.",
      });

      sendMail(
        user.personalInfo.emailInfo.email,
        customEmails.auth.confirmSignUp.title(user),
        customEmails.auth.confirmSignUp.text
      );

      sendMail(
        process.env.OAUTH_ADMIN_EMAIL,
        customEmails.auth.confirmSignUpAdminNotification.title(user),
        customEmails.auth.confirmSignUpAdminNotification.text
      );
    }
  } catch (err) {
    next(err);
  }
};

export const post_requestPasswordReset = async (req, res, next) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ "personalInfo.emailInfo.email": email });

    if (!user) {
      const error = new Error("No user with the given email.");
      error.statusCode = 422;
      throw error;
    }

    crypto.randomBytes(32, async (err, buffer) => {
      if (err) {
        winston.errorLog(err);
        next();
      }

      const generatedResetToken = buffer.toString("hex");

      user.personalInfo.passwordInfo.resetPasswordInfo.resetPasswordToken =
        generatedResetToken;
      user.personalInfo.passwordInfo.resetPasswordInfo.resetPasswordExpiration =
        Date.now() + 3600000;

      await user.save();

      sendMail(
        email,
        customEmails.auth.forgotPassword.title,
        customEmails.auth.forgotPassword.text(
          process.env.WEB_APP_URL,
          generatedResetToken
        )
      );

      winston.userActivityLog(
        "Requesting password token",
        {
          to: {
            email: user.personalInfo.emailInfo.email,
            id: user._id,
          },
        },
        "User has requested a password token."
      );

      res.status(200).json({
        message: "Your token has been sent to your email.",
      });
    });
  } catch (err) {
    next(err);
  }
};

export const post_resetPassword = async (req, res, next) => {
  try {
    const { newPassword } = req.body;
    const { confirmNewPassword } = req.body;
    const { resetToken } = req.body;

    const user = await User.findOne({
      "personalInfo.passwordInfo.resetPasswordInfo.resetPasswordToken":
        resetToken,
    });

    if (!user) {
      const error = new Error(
        "No user with the given token. Please try again, or contact us."
      );
      error.statusCode = 422;
      throw error;
    }
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
    if (!passwordLengthValidator(newPassword)) {
      const error = new Error("Password must be at least 6 character.");
      error.statusCode = 422;
      throw error;
    }
    if (newPassword !== confirmNewPassword) {
      const error = new Error("Passwords do not match.");
      error.statusCode = 422;
      throw error;
    }

    const hashedPassword = await bcrypt.hash(newPassword, 12);

    user.personalInfo.passwordInfo.resetPasswordInfo.resetPasswordToken = null;
    user.personalInfo.passwordInfo.resetPasswordInfo.resetPasswordExpiration =
      null;
    user.personalInfo.passwordInfo.password = hashedPassword;

    await user.save();

    winston.userActivityLog(
      "Resetting password",
      {
        to: {
          email: user.personalInfo.emailInfo.email,
          id: user._id,
        },
      },
      "User has changed password."
    );

    res.status(200).json({
      message: "You have successfully changed your  password.",
    });

    sendMail(
      user.personalInfo.emailInfo.email,
      customEmails.auth.resetPassword.title,
      customEmails.auth.resetPassword.text
    );
  } catch (err) {
    next(err);
  }
};