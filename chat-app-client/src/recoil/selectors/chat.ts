import { userSelectedChatId } from "./../atoms/chat/index";
import { selector } from "recoil";
import {
  allChatsAtom,
  createChatAtom,
  createGroupChat,
  updateGroupNameAtom,
  userMessagesAtom,
  userSendMessage,
} from "../atoms/chat";

export const searchUserSelector = selector({
  key: "allChatsState",
  get: async ({ get }: any) => {
    return get(allChatsAtom);
  },
  set: ({ set }, updatedValue) => {
    set(allChatsAtom, updatedValue);
  },
});

export const userMessagesSelector = selector({
  key: "messagesState",
  get: async ({ get }: any) => {
    return get(userMessagesAtom);
  },
  set: ({ set }, updatedValue) => {
    set(userMessagesAtom, updatedValue);
  },
});

export const sendMessageSelector = selector({
  key: "sendMessagesState",
  get: async ({ get }: any) => {
    return get(userSendMessage);
  },
  set: ({ get, set }, updatedValue) => {
    // get all the user and push latest message

    set(userSendMessage, updatedValue);
  },
});

export const createChatSelector = selector({
  key: "createChatState",
  get: async ({ get }: any) => {
    return get(createChatAtom);
  },
  set: ({ set }, updatedValue) => {
    set(createChatAtom, updatedValue);
  },
});

export const createGroupChatSelector = selector({
  key: "createGroupChatState",
  get: async ({ get }: any) => {
    return get(createGroupChat);
  },
  set: ({ set }, updatedValue) => {
    set(createGroupChat, updatedValue);
  },
});

export const updateGroupNameSelector = selector({
  key: "updateGroupNameState",
  get: async ({ get }: any) => {
    return get(updateGroupNameAtom);
  },
  set: ({ get, set }, payload) => {
    if (payload.status === "logading") {
      set(updateGroupNameAtom, {
        loading: true,
        error: "",
        groupNameData: {},
      });
    } else if (payload.status === "success") {
      // update chatlist

      let chatListData = get(allChatsAtom);

      let chatList = chatListData?.chats?.map((item: any) => {
        if (item._id == payload.data?._id) {
          return payload.data;
        } else {
          return item;
        }
      });

      set(allChatsAtom, { ...chatListData, chats: chatList });

      set(updateGroupNameAtom, {
        loading: false,
        error: "",
        groupNameData: payload.data,
      });
    } else {
      set(updateGroupNameAtom, {
        loading: false,
        error: payload.error,
        groupNameData: {},
      });
    }
  },
});
