import { atom } from "recoil";

export const Atom = atom({
  key: "index",
  default: {
    activeAuthTab: "1", // for login page
  },
});
