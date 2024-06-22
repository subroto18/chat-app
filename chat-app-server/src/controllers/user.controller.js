const asyncHandler = require("express-async-handler");

const {
  registrationValidator,
  loginValidator,
} = require("../validation/user.validate");
const User = require("../models/user.model.js");

const login = asyncHandler(async (req, res) => {
  const { password, email } = req.body;

  const result = loginValidator.safeParse({ email, password });

  if (result.success) {
    const user = await User.findOne({ email });
    const isPassMatch = user.isPasswordMatch(password);
    if (!user || !isPassMatch) {
      res.status(401).json({
        message: "User not found",
      });
    }

    const { accessToken, refreshToken } = await generateAccessAndRefreshToken(
      user._id
    );

    const loggedInUser = await User.findById(user._id).select(
      "-password -refreshToken -_id -__v"
    );

    const options = {
      httpOnly: true,
      secure: true,
    };

    return res
      .status(200)
      .cookie("accessToken", accessToken, options)
      .cookie("refreshToken", refreshToken, options)
      .json({
        user: loggedInUser,
        accessToken,
        refreshToken,
        message: "User logged In Successfully",
      });
  } else {
    const formattedErrors = result.error.errors.map((err) => ({
      path: err.path.join("."),
      message: err.message,
    }));
    res.status(400).json({ errors: formattedErrors });
  }
});

const register = asyncHandler(async (req, res) => {
  const { name, password, email } = req.body;
  const result = registrationValidator.safeParse({ name, password, email });
  if (result.success) {
    const isUserExist = await User.findOne({ email });

    if (isUserExist) {
      res.status(400).json({
        message: "User is already exist",
      });
    }

    const user = await User.create({ name, email, password });

    if (user) {
      const { accessToken } = await generateAccessAndRefreshToken(user?._id); // after user create generate

      res.status(201).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        token: accessToken,
      });
    } else {
      res.status(500).json("Something went wrong while creating user");
    }
  } else {
    const formattedErrors = result.error.errors.map((err) => ({
      path: err.path.join("."),
      message: err.message,
    }));
    res.status(400).json({ errors: formattedErrors });
  }
});

const logout = asyncHandler(async (req, res) => {
  await User.findByIdAndUpdate(
    req.user._id,
    {
      $set: {
        refreshToken: undefined,
      },
    },
    {
      new: true,
    }
  );

  const options = {
    httpOnly: true,
    secure: true,
  };

  return res
    .status(200)
    .clearCookie("accessToken", options)
    .clearCookie("refreshToken", options)
    .json({
      message: "User logged out",
    });
});

const generateAccessAndRefreshToken = async (userId) => {
  try {
    const user = await User.findById(userId);
    const accessToken = user.generateAccessToken();
    const refreshToken = user.generateRefreshToken();

    user.refreshToken = refreshToken;

    await user.save({ validateBeforeSave: false });

    return { accessToken, refreshToken };
  } catch (error) {
    throw new Error(
      "Something went wrong while generating refresh and access token"
    );
  }
};

module.exports = { login, register, logout };
