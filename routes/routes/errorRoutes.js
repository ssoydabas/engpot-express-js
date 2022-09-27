import Error from "../../models/logModels/error.js";
import winston from "../../util/winston/winston.js";

const logError = async (error) => {
  const errorMessage = `Error Status Code: ${
    error.statusCode ? error.statusCode : 500
  } ==> ${error.stack}`;

  winston.consoleLog(errorMessage);
  winston.errorLog(errorMessage);

  const newError = new Error({
    level: "error",
    errorStatusCode: error.statusCode ? error.statusCode : 500,
    errorMessage: error.stack,
  });

  await newError.save();
};

const sendResponse = (error, req, res, next) => {
  return res.status(error.statusCode ? error.statusCode : 500).json({
    errorMessage: error.message,
    responseStatus: error.statusCode ? error.statusCode : 500,
  });
};

const handleErrors = (error, req, res, next) => {
  logError(error);

  sendResponse(error, req, res, next);
};

export default handleErrors;