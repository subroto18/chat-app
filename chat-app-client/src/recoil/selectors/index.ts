// api.js

import { selector } from "recoil";
import { DrawerAtom } from "../atoms";

export const drawerSelector = selector({
  key: "sendMessagesState",
  get: async ({ get }: any) => {
    return get(DrawerAtom);
  },
  set: ({ get, set }, updatedValue) => {
    // get all the user and push latest message

    set(DrawerAtom, updatedValue);
  },
});
