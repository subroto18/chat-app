import { atom } from "recoil";

// get all the chat list for loggedin user

export const allChatsAtom = atom({
  key: "chats",
  default: {
    chats: [],
    loading: false,
    error: "",
    infinateLoading: false,
  },
});

// for all the message for loggedin users
export const userMessagesAtom = atom({
  key: "message",
  default: {
    messages: [],
    loading: false,
    error: "",
    infinatLoading: false,
    selectedMessageId: "",
  },
});

// for selected chat id when click on any user

export const userSelectedChatId = atom({
  key: "selectedMessage",
  default: "",
});

// type text

export const userTextMessage = atom({
  key: "textMessage",
  default: "",
});

// message to send

export const userSendMessage = atom({
  key: "userSendMessage",
  default: {
    message: {},
    loading: false,
    error: "",
  },
});

// create chat if doesnt else get chat

export const createChatAtom = atom({
  key: "createChat",
  default: {
    chat: {},
    loading: false,
    error: "",
  },
});

// create group

export const createGroup = atom({
  key: "createGroup",
  default: {
    selectedUsers: [],
    groupName: "",
    step: 1,
  },
});
