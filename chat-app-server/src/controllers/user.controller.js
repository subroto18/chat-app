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
    const isPassMatch = await user.isPasswordMatch(password);

    if (!user || !isPassMatch) {
      res.status(401).json({
        message: "Email or password not found",
      });
    }

    const { accessToken, refreshToken } = await generateAccessAndRefreshToken(
      user._id
    );

    const loggedInUser = await User.findById(user._id).select(
      "-password -refreshToken  -__v -createdAt -updatedAt"
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

  try {
    if (result.success) {
      const isEmailExist = await User.findOne({ email });
      const isNameExist = await User.findOne({ name });

      if (isEmailExist) {
        res.status(400).json({
          message: "Email is already exist",
        });
      } else if (isNameExist) {
        res.status(400).json({
          message: "User name is already exist, try unique",
        });
      }

      const user = await User.create({ name, email, password });

      if (user) {
        res.status(201).json({
          message: "Register Successfully",
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
  } catch (error) {
    res.send(error);
  }
});

const updateUser = asyncHandler(async (req, res) => {
  const { name, password, email, avatar, id } = req.body;

  try {
    const updates = {};
    if (name) updates.name = name;
    if (password) updates.password = password;
    if (email) updates.email = email;
    if (avatar) updates.avatar = avatar;

    if (Object.keys(updates).length === 0) {
      return res.status(400).send({ error: "No updates provided" });
    }

    const user = await User.create({ name, email, password });

    if (user) {
      res.status(201).json({
        message: "Register Successfully",
      });
    } else {
      res.status(500).json("Something went wrong while creating user");
    }
  } catch (error) {
    res.send(error);
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

const searchUserByNameOrEmailExceptLoggedInUser = asyncHandler(
  async (req, res) => {
    try {
      const keyword = req.query.q
        ? {
            $or: [
              {
                name: { $regex: new RegExp(`^${req.query.q}$`, "i") },
              },
              {
                email: req.query.q,
              },
            ],
          }
        : {};

      const users = await User.find(keyword)
        .find({
          _id: {
            $ne: req.user._id,
          },
        })
        .select("_id name email");

      res.status(200).send(users);
    } catch (error) {
      res.status(400).send("Something went wrong while searching users");
    }
  }
);

const getAllUsers = asyncHandler(async (req, res) => {
  // Define the limit and page number for pagination
  const { pageSize, pageNumber } = req.params;
  const limit = pageSize ? pageSize : 20;
  const page = pageNumber ? pageNumber : 0;

  // Calculate the offset based on the page number and limit
  const offset = (page - 1) * limit;

  // Retrieve users from the database with pagination

  try {
    const users = await User.find().select("name email");
    return res.send(users);
  } catch (error) {
    res.send("Something went wrong while fetching all users");
  }
});

const getLoggedInUser = asyncHandler((req, res) => {
  return res.json({
    user: {
      _id: req.user?._id,
      name: req.user?.name,
      email: req.user?.email,
    },
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

module.exports = {
  login,
  register,
  logout,
  searchUserByNameOrEmailExceptLoggedInUser,
  getAllUsers,
  getLoggedInUser,
};
