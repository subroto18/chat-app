import { atom } from "recoil";
import { UserProfileInterface } from "../profile";

export interface SearchUserStateInterface {
  users: UserProfileInterface[];
  loading: boolean;
  error: string;
}

// search user

export const searchTextAtom = atom({
  key: "searchText",
  default: "",
});

export const isSearchVisibleAtom = atom({
  key: "isSearchVisible",
  default: false,
});

export const searchUserAtom = atom<SearchUserStateInterface>({
  key: "searchUser",
  default: {
    users: [
      {
        id: null,
        name: "",
        email: "",
      },
    ],

    loading: false,
    error: "",
  },
});
