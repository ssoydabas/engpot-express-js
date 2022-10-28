import logErrors from "../../../log/winston.js";

const errorHandler = (error, req, res, next) => {
  logErrors(error);
  return res.status(error.statusCode ? error.statusCode : 500).json({
    errorMessage: error.message,
    responseStatus: error.statusCode ? error.statusCode : 500,
  });
};

export default errorHandler;
