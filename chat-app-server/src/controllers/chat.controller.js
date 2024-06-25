const asyncHandler = require("express-async-handler");

const Chat = require("../models/chat.model");
const { request } = require("express");

const { createGroupValidator } = require("../validation/chat.validate");

const oneOnOneChat = asyncHandler(async (req, res) => {
  const { userId } = req.body;
  const loggedInUser = req.user._id;

  if (!userId) {
    return res.send(400, "UserId not found in request");
  }

  const chat = await Chat.find({
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
    .populate("latestMessage");

  return res.send(chat?.[0]);

  //   const isChatExist = await Chat.find({
  //     isGroupChat: false,
  //     $and: [
  //       { users: { $elemMatch: { $eq: loggedInUser } } },
  //       { users: { $elemMatch: { $eq: userId } } },
  //     ],
  //   })
  //     .populate("users", "-password -refreshToken")
  //     .populate("latestMessage");

  //   const createdChat = await Chat.create({
  //     chatName: "one-on-one",
  //     isGroupChat: false,
  //     users: [req.user._id, userId],
  //   });

  res.send(isChatExist);
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
        response = await UserActivation.populate(response, {
          path: "latestMessage.sender",
          select: "email name",
        });

        return res.status(200).send(response);
      });

    return res.status(200).send(chats);
  } catch (error) {
    res.status(400).send("Something went wrong while fetching user chat ");
  }
});

const createGroupChat = asyncHandler(async (req, res) => {
  const { chatName, users } = req.body;
  const result = createGroupValidator.safeParse({ groupName, users });
  try {
    if (result.success) {
      const updatedUsers = [...users, req.user._id]; // group will be created with requrest user and loggedin user

      const createdGroup = await Chat.create({
        chatName: chatName,
        users: updatedUsers,
        isGroupChat: true,
        groupAdmin: req.user._id,
      });

      if (createdGroup) {
        const groupInfo = await Chat.findById(createdGroup?._id)
          .populate("users", "name", "email")
          .populate("groupAdmin", "name");
        return res.status(200).send(groupInfo);
      } else {
        res.status(400).send("Something went wrong while creating group");
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
