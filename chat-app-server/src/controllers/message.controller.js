const mongoose = require("mongoose");
const asyncHandler = require("express-async-handler");
const User = require("../models/user.model");
const Message = require("../models/message.model");
const Chat = require("../models/chat.model");
const { createMessageValidator } = require("../validation/message.validate");

const sendMessages = asyncHandler(async (req, res) => {
  const { content, chatId } = req.body;
  const result = createMessageValidator.safeParse({ content, chatId });
  try {
    if (result.success) {
      const createdMessage = await Message.create({
        sender: req.user._id,
        content: content,
        chat: chatId,
      });

      if (createdMessage) {
        await Chat.findByIdAndUpdate(chatId, {
          latestMessage: createdMessage._id,
        });

        let messageInfo = await Message.findById(createdMessage)
          .populate("sender", "name email")
          .populate("chat");

        messageInfo = await User.populate(messageInfo, {
          path: "chat.users",
          select: "name email",
        });

        messageInfo = await Chat.populate(messageInfo, {
          path: "chat.latestMessage",
          select: "content",
        });

        return res.status(200).send(messageInfo);
      } else {
        res.status(400).send("Something went wrong while sending Message");
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

const allMessages = asyncHandler(async (req, res) => {
  try {
    const message = await Message.find({ chat: req.params.chatId })
      .populate("sender", "name email")
      .populate("chat");
    res.json(message);
  } catch (error) {
    res.status(404, "Something went wrong while fetching all messages");
  }
});

module.exports = { sendMessages, allMessages };
