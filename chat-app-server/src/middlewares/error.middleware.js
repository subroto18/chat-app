const asyncHandler = require("express-async-handler");

const error = asyncHandler((err, req, res, next) => {
  try {
    const errStatus = err?.statusCode || 500;
    const errMsg = err.message || "Something went wrong";
    res.status(errStatus).json({
      success: false,
      status: errStatus,
      message: errMsg,
      stack: process.env.NODE_ENV === "development" ? err.stack : {},
    });
  } catch (error) {
    // throw new Error("Stay Calm: Understanding and Resolving Server Downtime");
  }
});

module.exports = error;
