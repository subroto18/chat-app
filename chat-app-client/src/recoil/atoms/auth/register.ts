import { atom } from "recoil";

interface RegisterState {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export const registerAtom = atom<RegisterState>({
  key: "register",
  default: {
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  },
});
