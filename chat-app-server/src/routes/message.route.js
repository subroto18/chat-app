const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();
const verifyJWT = require("../middlewares/auth.middleware");
const {
  sendMessages,
  allMessages,
} = require("../controllers/message.controller");
router.post("/send", verifyJWT, sendMessages);

router.get("/:chatId", verifyJWT, allMessages);

module.exports = router;
