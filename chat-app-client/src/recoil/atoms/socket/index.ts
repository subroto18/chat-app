import { atom } from "recoil";

export const socketInit = atom({
  key: "socketInit",
  default: false,
});

export const typingAtom = atom({
  key: "typing",
  default: false,
});

export const isTypingAtom = atom({
  key: "isTyping",
  default: false,
});
