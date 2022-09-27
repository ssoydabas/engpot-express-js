import User from "../models/user.js";

import jwt from "jsonwebtoken";

export const routeProtection = async (req, res, next) => {
  try {
    const authenticationToken = req.get("Authorization").split(" ")[1];
    const protectionInformation = jwt.verify(authenticationToken, process.env.JWT_SECRET);

    req.locals = { ...req.locals, protectionInformation };
    next();
  } catch (err) {
    next(err);
  }
};

export const adminProtection = async (req, res, next) => {
  try {
    const authenticationToken = req.get("Authorization").split(" ")[1];
    const protectionInformation = jwt.verify(authenticationToken, process.env.JWT_SECRET);

    if (protectionInformation.userStatus !== "admin") {
      const error = new Error("Only admins are allowed to reach this route.");
      error.statusCode = 422;
      throw error;
    }

    req.locals = { ...req.locals, protectionInformation };
    next();
  } catch (err) {
    next(err);
  }
};

export const studentProtection = async (req, res, next) => {
  try {
    const authenticationToken = req.get("Authorization").split(" ")[1];
    const protectionInformation = jwt.verify(authenticationToken, process.env.JWT_SECRET);

    if (protectionInformation.userStatus !== "student") {
      const error = new Error("Only students are allowed to reach this route.");
      error.statusCode = 422;
      throw error;
    }

    req.locals = { ...req.locals, protectionInformation };
    next();
  } catch (err) {
    next(err);
  }
};

export const teacherProtection = async (req, res, next) => {
  try {
    const authenticationToken = req.get("Authorization").split(" ")[1];
    const protectionInformation = jwt.verify(authenticationToken, process.env.JWT_SECRET);

    if (protectionInformation.userStatus !== "teacher") {
      const error = new Error("Only teachers are allowed to reach this route.");
      error.statusCode = 422;
      throw error;
    }

    req.locals = { ...req.locals, protectionInformation };
    next();
  } catch (err) {
    next(err);
  }
};
