const errorHandler = (error, req, res, next) => {
  console.log(error);
  return res.status(error.statusCode ? error.statusCode : 500).json({
    errorMessage: error.message,
    responseStatus: error.statusCode ? error.statusCode : 500,
  });
};

export default errorHandler;
