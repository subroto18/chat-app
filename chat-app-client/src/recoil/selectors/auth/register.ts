import { selector } from "recoil";
import { registerAtom } from "../../atoms/auth/register";

export const loginSelector = selector({
  key: "registerState",
  get: ({ get }) => {
    const response = get(registerAtom);
    return response;
  },
  set: ({ set }, newValue) => {
    set(registerAtom, newValue);
  },
});
