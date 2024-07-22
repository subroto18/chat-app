const { uploadOnCloudinary } = require("../utils/cloudinary");

const asyncHandler = require("express-async-handler");

const uploadMedia = asyncHandler(async (req, res) => {
  const avatarLocalPath = req.files?.avatar?.[0]?.path;
  if (!avatarLocalPath) {
    res.status(400).json({
      message: "Avatar file is required",
    });
  } else {
    const avatar = await uploadOnCloudinary(avatarLocalPath);
    if (!avatar) {
      res.status(400).json({
        message: "Avatar file is required",
      });
    }
    res.status(200).json({
      url: avatar.url,
    });
  }
});

const deleteMedia = asyncHandler(async (req, res) => {});

module.exports = { uploadMedia, deleteMedia };
