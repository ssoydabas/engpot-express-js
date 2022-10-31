import jwt from "jsonwebtoken";

export const isAuthenticated = async (req, res, next) => {
  try {
    const authenticationToken = req.get("Authorization").split(" ")[1];
    const user = jwt.verify(authenticationToken, process.env.JWT_SECRET);
    req.locals = { ...req.locals, user };
    next();
  } catch (error) {
    next(error);
  }
};

export const isTeacher = async (req, res, next) => {
  try {
    const authenticationToken = req.get("Authorization").split(" ")[1];
    const user = jwt.verify(authenticationToken, process.env.JWT_SECRET);

    if (user.userStatus !== "teacher" && user.userStatus !== "admin") {
      const error = new Error("Only teachers are allowed to reach this route.");
      error.statusCode = 422;
      throw error;
    }

    req.locals = { ...req.locals, user };

    next();
  } catch (error) {
    next(error);
  }
};

export const isStudent = async (req, res, next) => {
  try {
    const authenticationToken = req.get("Authorization").split(" ")[1];
    const user = jwt.verify(authenticationToken, process.env.JWT_SECRET);

    if (user.userStatus !== "student" && user.userStatus !== "admin") {
      const error = new Error("Only students are allowed to reach this route.");
      error.statusCode = 422;
      throw error;
    }

    req.locals = { ...req.locals, user };

    next();
  } catch (error) {
    next(error);
  }
};

export const isAdmin = async (req, res, next) => {
  try {
    const authenticationToken = req.get("Authorization").split(" ")[1];
    const user = jwt.verify(authenticationToken, process.env.JWT_SECRET);

    if (user.userStatus !== "admin") {
      const error = new Error("Only admins are allowed to reach this route.");
      error.statusCode = 422;
      throw error;
    }

    req.locals = { ...req.locals, user };

    next();
  } catch (error) {
    next(error);
  }
};
