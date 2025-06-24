// Dev Error
const devError = (err, res) => {
  return res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
    error: err,
    stack: err.stack,
  });
};

// Prod Error
const prodError = (err, res) => {
  if (err.isOperational) {
    return res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });
  } else {
    return res.status(500).json({
      status: "failed",
      message: "Something went wrong",
    });
  }
};

// Global Error middleware
export const globalErrorHandler = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";
  err.message = err.message || "Something went wrong";

  if (process.env.NODE_ENV === "development") {
    devError(err, res);
  } else {
    prodError(err, res);
  }
};
