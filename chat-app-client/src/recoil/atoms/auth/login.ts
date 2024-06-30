import { atom } from "recoil";

interface LoginState {
  email: string;
  password: string;
  rememberPassword: boolean;
}

export const loginAtom = atom<LoginState>({
  key: "login",
  default: {
    email: "subroto@gmail.com",
    password: "12345",
    rememberPassword: false,
  },
});
