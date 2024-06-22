const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
const User = require("../models/user.model.js");
const verifyJWT = asyncHandler(async (req, res, next) => {
  try {
    const token =
      req.cookies?.accessToken ||
      req.header("Authorization")?.replace("Bearer ", "");

    const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

    const user = await User.findById(decodedToken?._id).select(
      "-password -refreshToken"
    );

    if (!user) {
      throw new Error(401, "Invalid Access Token");
    }

    req.user = user;

    next();
  } catch (error) {
    throw new Error(401, "Invalid Access Token");
  }
});

module.exports = verifyJWT;
