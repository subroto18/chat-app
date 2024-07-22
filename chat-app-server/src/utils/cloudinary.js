const { v2 } = require("cloudinary");
const fs = require("fs");

v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadOnCloudinary = async (localFilePath) => {
  try {
    if (!localFilePath) return null;
    // upload the file on cloudinary

    const response = await v2.uploader.upload(localFilePath, {
      resource_type: "auto",
    });

    if (response?.url) {
      fs.unlinkSync(localFilePath); // remove locally saved temporary file
    }

    return response;
  } catch (error) {
    fs.unlinkSync(localFilePath); // remove locally saved temporary file
    return null;
  }
};

module.exports = { uploadOnCloudinary };
