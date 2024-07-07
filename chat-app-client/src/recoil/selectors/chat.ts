import { selector } from "recoil";
import {
  allChatsAtom,
  createChatAtom,
  createGroupChat,
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
