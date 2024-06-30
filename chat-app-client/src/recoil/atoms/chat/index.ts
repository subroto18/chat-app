import { atom } from "recoil";
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
