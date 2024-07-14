const asyncHandler = require("express-async-handler");

const Chat = require("../models/chat.model");
const User = require("../models/user.model");
const { request } = require("express");

const { createGroupValidator } = require("../validation/chat.validate");

const oneOnOneChat = asyncHandler(async (req, res) => {
  const { userId } = req.body;
  const loggedInUser = req.user._id;

  if (!userId) {
    return res.send(400, "UserId not found in request");
  }

  let chat = await Chat.find({
    isGroupChat: false,
    $and: [
      {
        users: {
          $elemMatch: {
            $eq: loggedInUser,
          },
        },
      },
      {
        users: {
          $elemMatch: {
            $eq: userId,
          },
        },
      },
    ],
  })
    .populate("users", "name email")

    .populate("latestMessage", "_id sender content");

  chat = await User.populate(chat, {
    path: "latestMessage.sender",
    select: "name email",
  });

  if (chat.length > 0) {
    return res.send(chat[0]);
  } else {
    res.send("else");
    let chatData = {
      chatName: "unknown",
      isGroupChat: false,
      users: [loggedInUser, userId],
    };
    try {
      const createdChat = await Chat.create(chatData);

      if (createdChat) {
        const fullChat = await Chat.findOne({ _id: createdChat._id }).populate(
          "users",
          "name email"
        );
        res.status(200).send(fullChat);
      } else {
        res.status(400).json({
          message: "Something went wrong while creating chat",
        });
      }
    } catch (error) {
      res.status(error.status).json({
        message:
          error?.response?.data || "Something went wrong while creating chat",
      });
    }
  }
});

const getChatByUserId = asyncHandler(async (req, res) => {
  try {
    const { userId } = req.query;

    if (!userId) {
      return res.status(400).send("UserId not found");
    }

    const chats = await Chat.find({
      users: {
        $elemMatch: {
          $eq: userId,
        },
      },
    })
      .populate("users", "name email")
      .populate("groupAdmin", "name")
      .populate("latestMessage")
      .sort({ updatedAt: -1 })

      .then(async (response) => {
        response = await User.populate(response, {
          path: "latestMessage.sender",
          select: "email name",
        });

        return res.status(200).send(response);
      });

    return res.status(200).send(chats);
  } catch (error) {
    res.status(400).json({
      message: "Something went wrong while fetching user chat",
    });
  }
});

const createGroupChat = asyncHandler(async (req, res) => {
  const { groupName, users } = req.body;

  const result = createGroupValidator.safeParse({ groupName, users });

  try {
    if (result.success) {
      const updatedUsers = [...users, req.user._id]; // group will be created with requrest user and loggedin user

      const groupNameExist = findOne({
        name: groupName,
        users: { $elemMatch: { $eq: req.user._id } },
      });

      if (groupNameExist) {
        res.status(400).json({
          message: "Group is already exist, Try unique group name",
        });
        return;
      }

      const chatData = {
        chatName: groupName,
        users: updatedUsers,
        isGroupChat: true,
        groupAdmin: req.user._id,
      };

      const createdGroup = await Chat.create(chatData);

      if (createdGroup?._id) {
        const groupInfo = await Chat.findById(createdGroup?._id)
          .populate("users", "name email")
          .populate("groupAdmin", "name");

        return res.status(201).send(groupInfo);
      } else {
        res.status(400).json({
          message: "Something went wrong while creating group chat",
        });
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

const renameGroup = asyncHandler(async (req, res) => {
  const { chatId, chatName } = req.body;

  const updatedChatName = await Chat.findAndUpdate(
    chatId,
    {
      chatName,
    },
    {
      new: true,
    }
  )
    .populate("users", "name email")
    .populate("groupAdmin", "name");

  if (updatedChatName) {
    res.status(200).send(updatedChatName);
  } else {
    res.status(404).send("Something went wrong while renaming chat name");
  }
});

const addToGroup = asyncHandler(async (req, res) => {
  const { userId, chatId } = req.body;

  const response = await Chat.findAndUpdate(
    chatId,
    {
      $push: { users: userId },
    },
    {
      new: true,
    }
  )
    .populate("users", "name email")
    .populate("groupAdmin", "name");

  if (response) {
    return res.status(200).send(response);
  } else {
    return res
      .status(404)
      .send("Something went wrong while adding user to group");
  }
});

const removeFromGroup = asyncHandler(async (req, res) => {
  const { userId, chatId } = req.body;

  const response = Chat.findAndUpdate(
    chatId,
    {
      $push: { users: userId },
    },
    {
      new: true,
    }
  )
    .populate("users", "name email")
    .populate("groupAdmin", "name");

  if (response) {
    return res.status(200).send(response);
  } else {
    return res
      .status(404)
      .send("Something went wrong while removing user from group");
  }
});

module.exports = {
  oneOnOneChat,
  getChatByUserId,
  createGroupChat,
  removeFromGroup,
  addToGroup,
  renameGroup,
};
