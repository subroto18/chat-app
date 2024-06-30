import { atom } from "recoil";

export interface UserProfileInterface {
  id: number | null;
  name: string;
  email: string;
  // Add more properties as needed
}
export interface ProfileStateInterface {
  user: UserProfileInterface;
  loading: boolean;
  error: string;
  isAuthenticated: boolean | null;
}

export interface SearchUserStateInterface {
  user: UserProfileInterface;
  loading: boolean;
  error: string;
}

export const profileAtom = atom<ProfileStateInterface>({
  key: "profile",
  default: {
    user: {
      id: null,
      name: "",
      email: "",
    },
    loading: false,
    error: "",
    isAuthenticated: null,
  },
});
