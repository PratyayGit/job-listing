const errorHandler = (error, req, res, next) => {
    const statusCode = error.statusCode || 500;
    const message = error.message || "Something went wrong! Please try after some time.";
    return res.status(statusCode).json({
      success: false,
      statusCode,
      message,
    });
  };
  
  module.exports = {
    errorHandler,
  };
  