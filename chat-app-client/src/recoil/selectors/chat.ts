import { selector } from "recoil";
import { allChatsAtom, userMessagesAtom, userSendMessage } from "../atoms/chat";

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
  set: ({ set }, updatedValue) => {
    set(userSendMessage, updatedValue);
  },
});
