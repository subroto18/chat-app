import { selector } from "recoil";

import { loginAtom } from "../../atoms/auth/login";

export const loginSelector = selector({
  key: "loginState",
  get: ({ get }) => {
    const response = get(loginAtom);
    return response;
  },
  set: ({ set }, newValue) => {
    set(loginAtom, newValue);
  },
});
