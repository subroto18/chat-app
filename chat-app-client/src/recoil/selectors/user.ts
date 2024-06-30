import { selector } from "recoil";

import { searchUserAtom } from "../atoms/user";

export const searchUserSelector = selector<any>({
  key: "searchUserState",
  get: async ({ get }: any) => {
    return get(searchUserAtom);
  },
  set: ({ set }, updatedValue) => {
    set(searchUserAtom, updatedValue);
  },
});
