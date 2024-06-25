const express = require("express");
const router = express.Router();
const verifyJWT = require("../middlewares/auth.middleware");

const {
  oneOnOneChat,
  getChatByUserId,
  createGroupChat,
  renameGroup,
  addToGroup,
  removeFromGroup,
} = require("../controllers/chat.controller");

router.post("/", verifyJWT, oneOnOneChat);

router.get("/all-chat", verifyJWT, getChatByUserId); // fetch all chat by user id

router.post("/create-group-chat", verifyJWT, createGroupChat); // create group for chat

router.put("/rename-group", verifyJWT, renameGroup); // rename group name

router.put("/add-to-group", verifyJWT, addToGroup); // add user to group

router.put("/remove-from-group", verifyJWT, removeFromGroup); // remove user from group

module.exports = router;
