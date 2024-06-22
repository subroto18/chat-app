const asyncHandler = require("express-async-handler");

const notFound = asyncHandler((req, res, next) => {
  res.status(404).json({
    message:
      "Ohh you are lost, read the API documentation to find your way back home :)",
  });

  next();
});

module.exports = notFound;
