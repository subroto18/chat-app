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

// for all the chat for loggedin users
export const userMessagesAtom = atom({
  key: "message",
  default: {
    messages: [],
    loading: false,
    error: "",
    infinatLoading: false,
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

/// group chat api creation

export const createGroupChat = atom({
  key: "createGroupChat",
  default: {
    groupChatData: {},
    loading: false,
    error: "",
  },
});

export const videoCallAtom = atom({
  key: "videoCall",
  default: {
    me: "",
    stream: null || {},
    caller: null || "",
    receivingCall: null || {},
    callerSignal: null || {},
    callAccepted: false,
    idToCall: null || {},
    callEnded: false,
    name: null,
  },
});

export const updateGroupNameAtom = atom({
  key: "updateGroupName",
  default: {
    groupNameData: {},
    loading: false,
    error: "",
  },
});

export const renameGroupAtom = atom({
  key: "renameGroup",
  default: "",
});

export const isRenameGroupAtom = atom({
  key: "isRenameGroup",
  default: false,
});

// when user click on any chat

export const selectedUsersAtom = atom({
  key: "selectedUser",
  default: [],
});

export const addUserToGroupAtom = atom({
  key: "addUserToGroup",
  default: [],
});

export const removeUserFromGroupAtom = atom({
  key: "isAddUserGroup",
  default: {
    loading: false,
    error: "",
  },
});

export const isAddUserGroupEnableAtom = atom({
  key: "isAddUserGroup",
  default: false,
});

export const selectedGroupAdminAtom = atom({
  key: "selectedGroupAdmin",
  default: {},
});
