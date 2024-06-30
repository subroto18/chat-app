import { selector } from "recoil";

import { profileAtom } from "../atoms/profile";
import { LOGIN } from "../../service/auth";

interface credentialsType {
  email: string;
  password: string;
}

// api.js
export const loginAPI = async (crediential: credentialsType) => {
  try {
    const response = await LOGIN(crediential);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const profileSelector = selector<any>({
  key: "profileState",
  get: async ({ get }: any) => {
    return get(profileAtom);
  },
  set: ({ set }, updatedValue) => {
    set(profileAtom, updatedValue);
  },
});
