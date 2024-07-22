const express = require("express");
const router = express.Router();
const verifyJWT = require("../middlewares/auth.middleware");
const upload = require("../middlewares/multer.middleware");
const { uploadMedia } = require("../controllers/media.controller");

router.post(
  "/upload",
  verifyJWT,
  upload.fields([{ name: "avatar", maxCount: 1 }]),
  uploadMedia
);

module.exports = router;
